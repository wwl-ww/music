import { displayPitch, getTonic, naturalOffsets, spellNote } from '../../shared/formats/pitch.js';

const quarter = 960;
const simpleRoles = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11, 8: 12, 9: 14 };
const enharmonicNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const values = [1, 2, 4, 8, 16, 32, 64];
const duration = (value, modifier) => quarter * 4 / value * ({ '.': 1.5, t: 2 / 3 }[modifier] ?? 1);
const noteValues = values.flatMap(denominator => ['', '.', 't'].map(modifier => ({
  ticks: duration(denominator, modifier),
  denominator,
  effects: { '.': 'd', t: 'tu 3' }[modifier]
}))).filter(value => Number.isInteger(value.ticks)).sort((a, b) => b.ticks - a.ticks);
const subdivisions = new Map([[0, []]]);

function notateDuration(ticks) {
  if (subdivisions.has(ticks)) return subdivisions.get(ticks);
  for (const value of noteValues) {
    if (value.ticks > ticks) continue;
    const tail = notateDuration(ticks - value.ticks);
    if (!tail) continue;
    const parts = [value, ...tail];
    subdivisions.set(ticks, parts);
    return parts;
  }
  subdivisions.set(ticks, null);
  return null;
}

function rootFromDegree(key, degree, octave) {
  const [, accidental, digit] = /^([#b]?)([1-7])$/.exec(degree);
  const root = getTonic(key, octave);
  const index = Number(digit) - 1;
  const note = spellNote(root, index, root.tonicPitch + naturalOffsets[index] + ({ b: -1, '#': 1 }[accidental] ?? 0));
  return { ...getTonic(note.name, note.octave), name: note.name };
}

function readChord(code, key) {
  const [symbol, slash] = code.split('/');
  const [, root, rawQuality] = /^([#b]?[1-7])(.*)$/.exec(symbol);
  const quality = rawQuality.replace(/[(),]/g, '').replace('♭', 'b').replace('♯', '#');
  const minor = /^m(?!aj)/.test(quality);
  const diminished = /^(dim|o|°|ø)/.test(quality);
  const suspended = /sus([24])/.exec(quality);
  const intervals = new Map([[1, 0], [3, minor || diminished ? 3 : 4], [5, 7]]);
  if (suspended) {
    const role = Number(suspended[1]);
    intervals.delete(3);
    intervals.set(role, simpleRoles[role]);
  }
  if (diminished || quality.includes('b5')) intervals.set(5, 6);
  if (/aug|\+|#5/.test(quality)) intervals.set(5, 8);
  if (/(?:maj|M|△)7/.test(quality)) intervals.set(7, 11);
  else if (quality.includes('7') || /^(?:9|11|13)/.test(quality) || quality.includes('ø')) {
    intervals.set(7, (diminished && !quality.includes('ø') && !quality.includes('b5')) ? 9 : 10);
  }
  if (/^m?6/.test(quality)) intervals.set(6, 9);
  for (const [, accidental, degreeText] of quality.matchAll(/([b#]?)(9|11|13)/g)) {
    const role = Number(degreeText);
    intervals.set(role, { 9: 14, 11: 17, 13: 21 }[role] + ({ b: -1, '#': 1 }[accidental] ?? 0));
  }
  return {
    intervals,
    root: rootFromDegree(key, root, 4),
    bass: rootFromDegree(key, slash ?? root, 2),
    rootBass: rootFromDegree(key, root, 2)
  };
}

export function chordBars(bars, ticks) {
  let previous;
  return bars.map(bar => {
    if (!bar.trim()) return [{ code: previous, start: 0, continued: true }];
    const symbols = bar.trim().split(/\s+/);
    const events = symbols.map((symbol, index) => {
      const [code, onset] = symbol.split('@');
      const start = onset ? ticks * (Number(onset) - 1) / 4 : ticks * index / symbols.length;
      if (!Number.isInteger(start) || start < 0 || start >= ticks) throw new Error(`无效的和弦拍位 ${bar}`);
      return { code, start };
    });
    if (events[0].start > 0 && previous) events.unshift({ code: previous, start: 0, continued: true });
    if (events[0].start !== 0 || events.some((event, index) => index && event.start <= events[index - 1].start)) {
      throw new Error(`无效的和弦顺序 ${bar}`);
    }
    previous = events.at(-1).code;
    return events;
  });
}

function decodeRoles(token, chord) {
  if (token === '0') return [];
  const roles = token === 'c' ? [...chord.intervals.keys()].sort((a, b) => a - b).map(String)
    : token.match(/[1-9](?:\++|-+)?/g);
  if (!roles?.length) throw new Error(`无效的和弦音角色 ${token}`);
  return roles.map(value => ({
    role: Number.parseInt(value, 10), octave: (value.length - 1) * (value[1] === '-' ? -1 : 1)
  }));
}

function notesForRoles(token, chord, bass) {
  const pitches = decodeRoles(token, chord).map(({ role, octave }) => {
    const root = bass ? role === 1 ? chord.bass : chord.rootBass : chord.root;
    const offset = chord.intervals.get(role) ?? simpleRoles[role];
    const pitch = root.tonicPitch + offset + octave * 12;
    const note = spellNote(root, role - 1 + octave * 7, pitch);
    if (/^[A-G](?:bb|##|b|#)?$/.test(note.name)) return `${note.name}${note.octave}`;
    return `${enharmonicNames[pitch % 12]}${Math.floor(pitch / 12) - 1}`;
  });
  return [...new Set(pitches)];
}

function rhythmEvents(bar, length) {
  let start = 0;
  const events = bar.trim().split(/\s+/).map(token => {
    const [, role, tie, numerator, modifier] = /^([c0]|(?:[1-9](?:\++|-+)?)+)(~?):(1|2|4|8|16|32|64)([.t]?)$/.exec(token) ?? [];
    if (!role) throw new Error(`无效伴奏记号 ${token}`);
    const end = start + duration(Number(numerator), modifier);
    const event = { role, tie, start, end };
    start = end;
    return event;
  });
  if (start !== length) throw new Error(`小节时值 ${start}/${length} · ${bar}`);
  return events;
}

function writeBeat(pitches, ticks, chordLabel, previous = []) {
  const parts = notateDuration(ticks);
  if (!parts) throw new Error(`无法分解的音符时值 ${ticks}`);
  return parts.map((value, index) => {
    const notes = pitches.map(pitch => index || previous.includes(pitch) ? `${pitch}{t}` : pitch);
    const note = notes.length > 1 ? `(${notes.join(' ')})` : notes[0] ?? 'r';
    const effects = [value.effects, !index && chordLabel ? `ch "${chordLabel}"` : null].filter(Boolean);
    return `${note}.${value.denominator}${effects.length ? ` { ${effects.join(' ')} }` : ''}`;
  });
}

function writeBars(harmony, templates, length, bass) {
  const lines = templates?.map(bar => rhythmEvents(bar, length));
  let previous = [];
  return harmony.map((bar, measure) => {
    const attacks = bar.map(({ start }) => start);
    const rhythm = lines ? lines[measure % lines.length] : bar.map(({ start, continued }, index) => ({
      start, end: bar[index + 1]?.start ?? length, role: bass ? '1' : 'c', tie: continued
    }));
    const tokens = rhythm.flatMap(({ start, end, role, tie }) => {
      const edges = [start, ...attacks.filter(tick => tick > start && tick < end), end];
      return edges.slice(0, -1).flatMap((tick, index) => {
        const event = bar.findLast(({ start }) => start <= tick);
        const pitches = notesForRoles(role, event.chord, bass);
        const notes = writeBeat(pitches, edges[index + 1] - tick,
          !bass && !event.continued && event.start === tick ? event.code : undefined, !index && tie ? previous : []);
        previous = pitches;
        return notes;
      });
    });
    return tokens.join(' ');
  }).join(' | ');
}

function patternMeasureCount(pattern) {
  return Math.max(pattern.upper.length, pattern.bass.length, pattern.bassPedal?.length ?? 0);
}

export function describeHarmony(progression, key) {
  const length = quarter * 4;
  return chordBars(progression.bars, length).map(bar => bar.map(({ code, start, continued }, index) => {
    const { root, bass } = readChord(code, key);
    const suffix = code.split('/')[0].replace(/^[#b]?[1-7]/, '');
    return {
      degree: showChordDegree(code),
      chord: displayPitch(root.name) + showChordDegree(suffix),
      bass: displayPitch(bass.name),
      inversion: code.includes('/'),
      span: (bar[index + 1]?.start ?? length) - start,
      beat: start / quarter + 1,
      continued
    };
  }));
}

export function buildProgressionScore(pattern, progression, key, mode, notation = 'numbered') {
  const meter = mode === 'harmony' ? '4/4' : pattern.meter;
  const [numerator, denominator] = meter.split('/').map(Number);
  const length = duration(denominator) * numerator;
  const tonic = key.replace('♭', 'b').replace('♯', '#');
  const bars = mode === 'pattern'
    ? Array.from({ length: patternMeasureCount(pattern) }, () => '1')
    : progression.bars;
  const harmony = chordBars(bars, length).map(bar => bar.map(event => ({
    ...event, chord: readChord(event.code, tonic)
  })));
  const upper = writeBars(harmony, mode === 'harmony' ? null : pattern.upper, length, false);
  const bass = writeBars(harmony, mode === 'harmony' ? null : pattern.bass, length, true);
  const pedal = mode !== 'harmony' && pattern.bassPedal
    ? String.raw` || \voice ${writeBars(harmony, pattern.bassPedal, length, true)}` : '';
  const beatUnit = pattern.tempoUnit?.match(/^(\d+)(\.)?$/);
  const tempo = mode === 'harmony' ? 80 : Math.round(pattern.tempo * (beatUnit ? duration(Number(beatUnit[1]), beatUnit[2]) / quarter : 1));
  const timing = String.raw`\ks ${tonic} \ts (${numerator} ${denominator})`;
  const swing = mode !== 'harmony' && pattern.swing ? String.raw`\tf t8 ` : '';
  return {
    tempo,
    scoreNotation: String.raw`${timing} ${swing}${upper} || \staff { ${notation === 'staff' ? 'score' : 'numbered'} } \tuning (none) \clef F4 ${timing} ${bass}${pedal}`
  };
}

export function showChordDegree(symbol) {
  return symbol.replace(/[A-G][#b]|[#b]/g, displayPitch);
}
