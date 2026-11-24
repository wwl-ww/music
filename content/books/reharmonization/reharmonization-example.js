import { mountChordRevision } from '../../shared/formats/chord-revision.js';
import { getTonic, spellNote } from '../../shared/formats/pitch.js';

const signatures = ['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
const sonorities = {
  '': [[1, 0], [3, 4], [5, 7]],
  m: [[1, 0], [3, 3], [5, 7]],
  aug: [[1, 0], [3, 4], [5, 8]],
  dim: [[1, 0], [3, 3], [5, 6]],
  dim7: [[1, 0], [3, 3], [5, 6], [7, 9]],
  sus2: [[1, 0], [2, 2], [5, 7]],
  sus4: [[1, 0], [4, 5], [5, 7]],
  '7sus4': [[1, 0], [4, 5], [5, 7], [7, 10]],
  '7': [[1, 0], [3, 4], [5, 7], [7, 10]],
  maj7: [[1, 0], [3, 4], [5, 7], [7, 11]],
  m7: [[1, 0], [3, 3], [5, 7], [7, 10]],
  mmaj7: [[1, 0], [3, 3], [5, 7], [7, 11]],
  '6': [[1, 0], [3, 4], [5, 7], [6, 9]],
  m6: [[1, 0], [3, 3], [5, 7], [6, 9]]
};
const scale = { 2: 2, 4: 5, 5: 7, 6: 9, 9: 14, 11: 17, 13: 21 };
const pitchPattern = /^[A-G](?:bb|##|b|#)?[0-8]$/;
const valuePattern = /^(1|2|4|8|16|32)(\.)?$/;

function beats(value) {
  const match = valuePattern.exec(value);
  if (!match) throw new Error(`无效时值 ${value}`);
  return 4 / Number(match[1]) * (match[2] ? 1.5 : 1);
}

function pitch(note) {
  if (!pitchPattern.test(note)) throw new Error(`无效音高 ${note}`);
  return getTonic(note.slice(0, -1), Number(note.at(-1))).tonicPitch;
}

function chordNotes(symbol) {
  if (symbol === 'N.C.') return [];
  const [team, bass] = symbol.replaceAll('♭', 'b').replaceAll('♯', '#').split('/');
  const [, root, quality] = /^([A-G][b#]?)(.*)$/.exec(team) ?? [];
  if (!root || (bass && !/^[A-G][b#]?$/.test(bass))) throw new Error(`无效和弦 ${symbol}`);
  const base = quality.match(/^(7sus4|mmaj7|mMaj7|maj7|dim7|aug|dim|sus2|sus4|m7|m6|maj(?=9|11|13)|m|6|7)?/)[0];
  const suffix = quality.slice(base.length);
  const chordType = base === 'maj' ? 'maj7'
    : ['m', ''].includes(base) && /^(9|11|13)/.test(suffix) ? `${base}7` : base.toLowerCase();
  const degrees = new Map(sonorities[chordType]);
  const modifiers = suffix.replace(/[(),\s]/g, '');
  const tokens = modifiers.match(/(?:add)?[b#]?(?:13|11|9|6|5|4|2)/g) ?? [];
  if (tokens.join('') !== modifiers) throw new Error(`请显式填写 ${symbol} 的音高`);
  for (const token of tokens) {
    const [, accidental, degreeText] = /^(?:add)?([b#]?)(\d+)$/.exec(token);
    const degree = Number(degreeText);
    degrees.set(degree, scale[degree] + ({ b: -1, '#': 1 }[accidental] ?? 0));
  }
  const rootInfo = getTonic(root, 3);
  const bassNote = bass || root;
  const bassOctave = pitch(`${bassNote}2`) > 44 ? 1 : 2;
  return [`${bassNote}${bassOctave}`, ...[...degrees].map(([degree, semitones]) => {
    // A close voicing keeps the accompaniment away from the melody register.
    const octave = degree > 7 ? 1 : 0;
    const note = spellNote(rootInfo, degree - 1 - octave * 7, rootInfo.tonicPitch + semitones - octave * 12);
    return `${note.name}${note.octave}`;
  })];
}

function melodyBar(bar) {
  let length = 0;
  const tokens = typeof bar === 'string' ? bar.trim().split(/\s+/) : bar;
  const notation = tokens.map(token => {
    const [, note, value] = /^([^:.]+)[:.](\d+\.?)$/.exec(token) ?? [];
    if (note !== 'r') pitch(note ?? '');
    length += beats(value);
    return `${note}.${value.replace('.', '{d}')}`;
  });
  if (length !== 4) throw new Error(`旋律小节合计 ${length} 拍，应为 4 拍`);
  return notation.join(' ');
}

function harmonyBar(bar, previous) {
  let length = 0;
  const entries = Array.isArray(bar) ? bar : [bar];
  const events = entries.map(entry => {
    const [symbol, value = '1'] = typeof entry === 'string' ? entry.split(':') : [entry.symbol, String(entry.duration ?? 1)];
    const notes = typeof entry === 'string' || !entry.notes ? chordNotes(symbol) : entry.notes;
    const voices = [...notes].sort((a, b) => pitch(a) - pitch(b));
    for (const note of voices) pitch(note);
    const start = length;
    length += beats(value);
    const voicing = voices.join(' ');
    const sound = voices.length ? `(${voicing})` : 'r';
    const ties = typeof entry === 'string' ? [] : entry.tie ?? [];
    for (const note of ties) {
      if (!voices.includes(note) || !previous.voices.includes(note)) throw new Error(`${note} 的延音线缺少同音`);
    }
    const tiedSound = ties.length ? `(${voices.map(note => ties.includes(note) ? `${note}{t}` : note).join(' ')})` : sound;
    previous.voices = voices;
    const notation = `${tiedSound}.${value.replace('.', '{d}')}`;
    return { symbol, start, end: length, notation, voicing };
  });
  if (length !== 4) throw new Error(`和弦小节合计 ${length} 拍，应为 4 拍`);
  return events;
}

export function buildReharmExample({ melody, original, revised, revisedLabel = '重配', variants, keySignature = 0, tempo = 88, title = '同一旋律的和声对照' }) {
  const melodyNotation = melody.map(melodyBar).join(' | ');
  const key = typeof keySignature === 'number' ? signatures[keySignature + 7] : keySignature;
  const timing = String.raw`\ks ${key} \ts (4 4)`;
  const versions = [
    { label: '原和弦', harmony: original },
    { label: revisedLabel, harmony: revised },
    ...(variants ?? [])
  ].map(({ label, harmony }) => {
    if (harmony.length !== melody.length) throw new Error(`${label}的和弦和旋律小节数不同`);
    const previous = { voices: [] };
    const bars = harmony.map(bar => harmonyBar(bar, previous));
    const accompaniment = bars.map(bar => bar.map(({ notation }) => notation).join(' ')).join(' | ');
    const score = { scoreTracks: [
      { name: '旋律', program: 0, phrase: `${timing} ${melodyNotation}` },
      { name: '和声', program: 0, phrase: String.raw`${timing} \clef F4 ${accompaniment}` }
    ] };
    return { label, bars, score };
  });
  return { title, versions, tempo };
}

export function mountReharmExamples(examples) {
  for (const example of examples) {
    const container = document.getElementById(example.id);
    try {
      mountChordRevision(container, buildReharmExample(example));
    } catch (error) {
      console.error(`谱例 ${example.id}`, error);
      if (container) container.textContent = '谱例加载失败。';
    }
  }
}
