import { mountGuitarChordDiagrams } from '../../shared/formats/guitar-chord-diagram.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

function chord(pitches, name, length = 1) {
  return `(${pitches}).${length} { ch "${name}" }`;
}

function mount(id, steps, tempo = 90) {
  mountScoreWritingSteps(document.getElementById(id), { steps, score: { tempo } });
}

function sameRoot(id, chords) {
  mount(id, chords.map(([label, pitches, description]) => ({
    label, description, notes: chord(pitches, label)
  })));
}

sameRoot('rock-chord-seventh', [
  ['C', 'C4 E4 G4', 'C 是基准。C–E 为大三度，C–G 为纯五度。'],
  ['Cm', 'C4 Eb4 G4', '只把三音 E 降为 E♭，根音和五音不变。'],
  ['Cmaj7', 'C4 E4 G4 B4', '在 C 大三和弦上加入 B。B 比上方的 C 低半音。'],
  ['C7', 'C4 E4 G4 Bb4', '与 Cmaj7 比，七音由 B 降为 B♭。E 与 B♭ 相隔减五度。'],
  ['Cm7', 'C4 Eb4 G4 Bb4', 'Cm7 的 m 对应 E♭，7 对应 B♭。'],
  ['Cm(maj7)', 'C4 Eb4 G4 B4', 'Cm(maj7) 保留 E♭ 的小三度，同时使用 B 的大七度。']
]);

sameRoot('rock-chord-ninth', [
  ['Cadd9', 'C4 E4 G4 D5', 'Cadd9 保留三和弦，顶音 D 是附加的九音。'],
  ['C9', 'C4 E4 G4 Bb4 D5', '同样以 D 为最高音。加入 B♭ 后，C9 有了属七和弦的三全音。'],
  ['C7(♭9)', 'C4 E4 G4 Bb4 Db5', 'C9 的 D 降半音。D♭ 是降九音，E 和 B♭ 保持不变。'],
  ['C7(♯9)', 'C4 E4 G4 Bb4 D#5', 'C9 的 D 升半音。上方 D♯ 与 E♭ 等音，和弦内仍有大三音 E。']
]);

function twoStaves(upper, lower, key = 'C') {
  return {
    scoreTracks: [
      { name: '上声部', program: 0, phrase: `\\ks ${key} ${upper.join(' | ')}` },
      { name: '和弦', program: 0, phrase: `\\ks ${key} \\clef F4 ${lower.join(' | ')}` }
    ]
  };
}

const c = chord('C3 G3', 'C');
const csus = chord('C3 G3', 'Csus4');
const g7 = chord('G2 B2 D3', 'G7');
const g7WithF = chord('G2 D3 F3', 'G7');

mount('rock-chord-suspension', [
  {
    label: 'G7–Csus4–C',
    description: 'F 是 G7 的七音。换到 Csus4 时持续，换到 C 后下降到 E。',
    notes: twoStaves(['F4.1', 'F4{t}.1', 'E4.1'], [g7, csus, c])
  },
  {
    label: 'C–Csus4–C',
    description: '低音始终是 C，上声部由三音 E 上行至四音 F，再回到 E。',
    notes: twoStaves(['E4.1', 'F4.1', 'E4.1'], [c, csus, c])
  },
  {
    label: 'G7–G7sus4–G7',
    description: '七音 F 保留，上声部的三音 B 暂时由四音 C 取代。',
    notes: twoStaves(['B4.1', 'C5.1', 'B4.1'], [g7WithF, chord('G2 D3 F3', 'G7sus4'), g7WithF])
  }
]);

mountGuitarChordDiagrams(document.getElementById('rock-c-six-fingerings'), [
  { label: 'C6 · 保留五音', positions: [null, 3, 2, 2, 1, 3], degrees: [null, 'R', '3', '6', 'R', '5'] },
  { label: 'C6 · 省去五音', positions: [null, 3, 2, 2, 1, 0], degrees: [null, 'R', '3', '6', 'R', '3'] }
]);

const aMinor = chord('A2 E3 A3', 'Am');
const dMinor = chord('D3 A3 F4', 'Dm');
const e7 = chord('E3 B3 D4', 'E7');

mount('rock-chord-minor-dominant', [
  {
    label: 'Am–Em7–Am',
    description: 'Em7 的三音 G 至 A 相隔全音，D 下行二度到 C。',
    notes: twoStaves(
      ['(C4 A4).1', '(D4 G4).1', '(C4 A4).1'],
      [aMinor, chord('E3 B3', 'Em7'), aMinor],
      'Aminor'
    )
  },
  {
    label: 'Am–E7–Am',
    description: '三音变成 G♯，到 A 的距离缩为半音。D 到 C 的下行保持一致。',
    notes: twoStaves(
      ['(C4 A4).1', '(D4 G#4).1', '(C4 A4).1'],
      [aMinor, chord('E3 B3', 'E7'), aMinor],
      'Aminor'
    )
  },
  {
    label: 'C 大调中的 E7–Am',
    description: 'E7 到 Am 仍有 G♯–A。接下来的 Dm–G7–C 重建 C 的中心地位。',
    notes: twoStaves(
      ['E4.1', 'G#4.1', '(C4 A4).1', 'A4.1', '(F4 B4).1', '(E4 C5).1'],
      [c, e7, aMinor, dMinor, chord('G2 G3 D4', 'G7'), c]
    )
  }
]);
