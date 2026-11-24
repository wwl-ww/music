import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { mountScore } from '../../shared/formats/score.js';

export { bandSoundFont };

const meter = '\\ts (4 4)';
const stepsPerBar = 16;

export function pitchedTrack(name, program, bars, clef = '', tuning) {
  const setup = [meter, '\\ks C', clef && '\\clef ' + clef].filter(Boolean);
  return { name, program, tuning, phrase: [...setup, bars.join(' | ')].join(' ') };
}

export function chord(pitches, symbol) {
  return '(' + pitches + ').1 { ch "' + symbol + '" }';
}

export function hits(steps, strong = []) {
  return steps.map(step => ({ step, accent: strong.includes(step) }));
}

export function tone(step, length, pitch, dynamic = 'mf') {
  return { step, length, pitch, dynamic, accent: dynamic === 'f' };
}

function eventPhrase(events, bars, drumName) {
  const tokens = [];
  let cursor = 0;

  function span(length, pitches = [], dynamic) {
    let held = false;
    while (length) {
      const inBar = cursor % stepsPerBar;
      const width = [16, 8, 4, 2, 1].find(size => size <= Math.min(length, stepsPerBar - inBar));
      if (cursor && !inBar) tokens.push('|');
      const tones = pitches.map(pitch => pitch + (held ? '{t}' : ''));
      const note = tones.length > 1 ? '(' + tones.join(' ') + ')' : tones[0] ?? 'r';
      const effect = tones.length && !held && dynamic ? ' { dy ' + dynamic + ' }' : '';
      tokens.push(note + '.' + stepsPerBar / width + effect);
      held = true;
      cursor += width;
      length -= width;
    }
  }

  for (const { step, length = 1, pitch, dynamic, accent } of events) {
    if (step < cursor || step + length > bars * stepsPerBar) {
      throw new RangeError('Arrangement lane events must fit in the grid without overlap.');
    }
    const pitches = drumName ? [drumName] : Array.isArray(pitch) ? pitch : [pitch];
    span(step - cursor);
    span(length, pitches, dynamic ?? (accent ? 'f' : 'mf'));
  }
  span(bars * stepsPerBar - cursor);
  return tokens.join(' ');
}

function gridTrack({ label, program, midi, events }, bars) {
  if (midi === undefined) return pitchedTrack(label, program, [eventPhrase(events, bars)]);
  return {
    name: label,
    program: 'percussion',
    staffLines: 1,
    phrase: meter + ' \\clef neutral \\articulation (Strike ' + midi + ') ' + eventPhrase(events, bars, 'Strike')
  };
}

export function mountGridChoices(id, versions, { bars = 1, tempo = 102 } = {}) {
  const container = document.getElementById(id);
  const selector = container.querySelector('select');
  const cue = container.querySelector('.music-demo-cue');
  const figure = container.querySelector('[data-genre-playback]');
  const frame = container.querySelector('[data-genre-grid]');
  const active = () => versions[selector.value];
  const notes = () => ({ scoreTracks: active().rows.map(row => gridTrack(row, bars)) });
  const grid = mountArrangementGrid(frame, {
    beats: bars * 4,
    rows: active().rows,
    label: container.querySelector('h3').textContent
  });
  const player = mountScore(figure, {
    notes: notes(),
    tempo,
    notation: 'staff',
    notationVisible: false,
    soundFontUrl: bandSoundFont,
    onPlaybackPosition: grid.markTick
  });
  const describe = () => { cue.textContent = active().description; };

  selector.addEventListener('change', () => {
    grid.update(active().rows);
    describe();
    player.setNotes(notes());
  });
  describe();
}

export function mountScoreSelect(id, versions, tempo = 88) {
  const container = document.getElementById(id);
  const selector = container.querySelector('select');
  const cue = container.querySelector('.music-demo-cue');
  const active = () => versions[selector.value];
  const player = mountScore(container.querySelector('figure'), {
    notes: active().notes, tempo, notation: 'staff'
  });
  selector.addEventListener('change', () => {
    cue.textContent = active().description;
    player.setNotes(active().notes);
  });
  cue.textContent = active().description;
}
