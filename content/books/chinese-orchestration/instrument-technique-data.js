import { getTonic } from '../../shared/formats/pitch.js';

export const diziHoleLabels = ['1', '2', '3', '4', '5', '6'];
const holeState = { o: 'open', h: 'half', c: 'closed' };
const diziPositions = {
  A4: 'cccccc',
  B4: 'occccc',
  C5: 'ohcccc',
  'C#5': 'oocccc',
  D5: 'oooccc',
  E5: 'oooocc',
  'F#5': 'oooooc',
  G5: 'oooooh',
  'G#5': 'oooooo',
  A5: 'cccccc'
};

export const diziModes = {
  sol: {
    key: 'D',
    notes: 'A4 B4 C#5 D5 E5 F#5 G5 A5',
    syllables: 'sol la ti do re mi fa sol',
    description: '筒音 A4 作 sol，开前三孔得到的 D5 作 do。G5 作 fa，可用第六孔半孔取得。'
  },
  re: {
    key: 'G',
    notes: 'A4 B4 C5 D5 E5 F#5 G5 A5',
    syllables: 're mi fa sol la ti do re',
    description: '筒音 A4 改唱 re。C♯5 换成 C5，第二孔由全开改为半开。'
  },
  do: {
    key: 'A',
    notes: 'A4 B4 C#5 D5 E5 F#5 G#5 A5',
    syllables: 'do re mi fa sol la ti do',
    description: '筒音 A4 作 do。G5 换成 G♯5，第六孔由半开改为全开。'
  }
};

export function diziFingering(mode) {
  const { notes, syllables } = diziModes[mode];
  const names = syllables.split(' ');
  return notes.split(' ').map((note, index) => ({
    note,
    pitch: getTonic(note.slice(0, -1), Number(note.at(-1))).tonicPitch,
    syllable: names[index],
    holes: [...diziPositions[note]].map(position => holeState[position]),
    breath: note === 'A5' ? '超吹' : ''
  }));
}

export const zhengSoundExamples = [
  { technique: '空弦', position: 'F♯4 弦 · 码右', attack: 'F#4', description: '直接拨弦，音高保持在空弦音。' },
  { technique: '按音', position: 'F♯4 弦 · 码左按弦', attack: 'G4', description: '先压到目标音高再拨，起音直接是 G4。' },
  { technique: '上滑音', position: 'F♯4 弦 · 拨后按弦', attack: 'F#4', arrival: 'G4', description: '拨弦后才压弦，同一次起音的余音连续滑向 G4。' },
  { technique: '八度泛音', position: 'F♯4 弦 · 码右半弦', attack: 'F#5', description: '在振动弦长的一半轻触并拨弦，得到高八度泛音。' }
];

export const guqinSoundExamples = [
  { technique: '散音', position: '第六弦 · 空弦 C3', attack: 'C3', description: '直接拨空弦，起音结实。' },
  { technique: '按音', position: '第一弦 · 七徽按实', attack: 'C3', description: 'C2 弦的振动长度减半。按住后仍可移指，让余音连到别的音。' },
  { technique: '泛音', position: '第一弦 · 七徽轻触', attack: 'C3', description: '同在半弦处取高八度，起音轻清。' }
];
