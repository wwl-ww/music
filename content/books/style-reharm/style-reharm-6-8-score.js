import ensembleSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScore } from '../../shared/formats/score.js';

const duration = { 1: '.8', 2: '.4', 3: '.4 { d }', 4: '.2', 6: '.2 { d }', 8: '.1' };
const danceDrums = '(Kick Hat).8 { dy mp } Hat.8 (Kick Snare Hat).8 Hat.8 (Kick Hat).8 Hat.8 (Kick Snare Hat).8 Hat.8';

function note(pitches, length, label = '') {
  const pitch = Array.isArray(pitches) ? '(' + pitches.join(' ') + ')' : pitches;
  return pitch + duration[length] + (label ? ' { ch "' + label + '" }' : '');
}

export function chord(symbol, bass, voiced, length = 8) {
  return { symbol, bass, voiced: voiced.split(' '), length };
}

export function editBars(base, replacements) {
  return base.map((bar, index) => replacements[index + 1] ?? bar);
}

function texture(segment, feel) {
  const { symbol, bass, voiced, length } = segment;
  if (feel === 'guitar') {
    const guitar = [bass, ...voiced, ...voiced.slice(0, -1).reverse()];
    return Array.from({ length }, (_, index) => note(guitar[index % guitar.length], 1, index === 0 ? symbol : '')).join(' ');
  }
  if (feel === 'dance' && length >= 4) {
    const pairs = Array.from({ length: length / 2 }, (_, index) =>
      note('r', 1) + ' ' + note(voiced, 1, index === 0 ? symbol : ''));
    return pairs.join(' ');
  }
  return note(voiced, length, symbol);
}

export function arrangement(melody, harmony, { tempo, feel = 'piano', melodyProgram = 0, patterns = {}, summary }) {
  const track = (name, program, clef, bars) => ({
    name, program,
    phrase: String.raw`\clef ${clef} \ks C \ts (4 4) ${bars.join(' | ')}`
  });
  const accompaniment = harmony.map(bar => {
    const segments = Array.isArray(bar) ? bar : [bar];
    const length = segments.reduce((total, segment) => total + segment.length, 0);
    if (length !== 8) throw new RangeError('每个伴奏小节须共八个八分音符。');
    return segments;
  });
  if (melody.length !== accompaniment.length) throw new RangeError('旋律与和声小节数不一致。');
  const scoreTracks = [
    track('旋律', melodyProgram, 'G2', melody),
    track(feel === 'guitar' ? '原声吉他' : '和声', feel === 'guitar' ? 25 : feel === 'dance' ? 89 : 0,
      feel === 'guitar' ? 'F4' : 'G2', accompaniment.map((bar, index) =>
        patterns[index]?.upper ?? bar.map(segment => texture(segment, feel)).join(' ')))
  ];
  if (feel !== 'guitar') {
    scoreTracks.push(track('低音', feel === 'dance' ? 33 : 0, 'F4', accompaniment.map((bar, index) =>
      patterns[index]?.bass ?? bar.map(({ bass, length }) => {
      if (feel !== 'dance' || length < 4) return note(bass, length);
      return Array.from({ length: length / 2 }, () => note(bass, 1) + ' ' + note('r', 1)).join(' ');
    }).join(' '))));
  }
  if (feel === 'dance') {
    scoreTracks.push({
      name: '鼓组',
      program: 'percussion',
      playbackOnly: true,
      phrase: String.raw`\clef neutral \articulation (Kick 36) \articulation (Snare 38) \articulation (Hat 42) \ts (4 4) ${melody.map(() => danceDrums).join(' | ')}`
    });
  }
  return { notes: { scoreTracks }, tempo, summary };
}

export function mountReharmVersions(id, versions) {
  const container = document.getElementById(id);
  const select = container.querySelector('select');
  const cue = container.querySelector('.music-demo-cue');
  const initial = versions[select.value];
  cue.textContent = initial.summary;
  const player = mountScore(container.querySelector('figure'), {
    notation: 'staff', notes: initial.notes, tempo: initial.tempo, soundFontUrl: ensembleSoundFont
  });
  select.addEventListener('change', () => {
    const version = versions[select.value];
    cue.textContent = version.summary;
    player.setNotes(version.notes);
  });
}

export function baseChords(harmony) {
  const triads = {
    C: chord('C', 'C3', 'G3 C4 E4'),
    F: chord('F', 'F2', 'A3 C4 F4'),
    G: chord('G', 'G2', 'G3 B3 D4')
  };
  return harmony.map(symbol => triads[symbol]);
}
