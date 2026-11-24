import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { chord, pitchedTrack } from './genre-arrangement-foundation.js';

const families = [
  ['C · 大三和弦', 'C4 E4 G4', 'C', '大三音 E 决定 C 大三和弦的性质，G 是它的五音。'],
  ['Cm · 小三和弦', 'C4 Eb4 G4', 'Cm', '只把 E 降为 E♭，根音 C 和五音 G 保持。与大三和弦相比，惟一变化是三音。'],
  ['Csus4 · 挂四', 'C4 F4 G4', 'Csus4', 'F 代替 E，C 与 G 保持。此时没有能决定大小性质的三音。'],
  ['Cmaj7 · 大七和弦', 'C4 E4 G4 B4', 'Cmaj7', '保留大三和弦，加入距 C 大七度的 B。'],
  ['C7 · 属七和弦', 'C4 E4 G4 Bb4', 'C7', '七音从 B 降到 B♭，三音 E 保持。E 与 B♭ 构成减五度。'],
  ['Cmaj9 · 加入九音', 'C4 E4 G4 B4 D5', 'Cmaj9', '在 Cmaj7 上加入 D 作为九音，B 仍是大七音。']
];

mountScoreWritingSteps(document.getElementById('genre-chord-forms'), {
  steps: families.map(([label, pitches, symbol, description]) => ({
    label, description, notes: { scoreTracks: [pitchedTrack('钢琴', 0, [chord(pitches, symbol)])] }
  }))
});
