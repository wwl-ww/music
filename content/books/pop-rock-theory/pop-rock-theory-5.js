import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountFretboard } from '../../shared/formats/fretboard.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

function chord(pitches, symbol, duration = 1) {
  return '(' + pitches + ').' + duration + ' { ch "' + symbol + '" }';
}

function mount(id, tempo, versions) {
  mountScoreWritingSteps(document.getElementById(id), {
    score: { tempo, soundFontUrl },
    steps: versions.map(([label, description, melody, harmony, key = 'C', program = 24]) => ({
      label,
      description,
      notes: {
        scoreTracks: [
          { name: program === 24 ? '吉他旋律' : '上声部', program, phrase: '\\displaytranspose 0 \\ks ' + key + ' ' + melody },
          { name: '和声', program: 0, phrase: '\\clef F4 \\ks ' + key + ' ' + harmony.join(' | ') }
        ]
      }
    }))
  });
}

const tonicC = chord('C3 G3 E4', 'C');
const tonicAm = chord('A2 E3 C4', 'Am');
const sharedHead = 'E4.4 G4.4 A4.4 E4.4';

mount('rock-pentatonic-centers', 92, [
  ['C 为主音', '两版共用第一小节的题头。C 版的低音落到 C，末音也在 C 上延长。',
    sharedHead + ' | G4.4 E4.4 C5.2', [chord('C3 E3 G3', 'C', 2) + ' ' + chord('G2 D3 F3 B3', 'G7', 2), tonicC]],
  ['A 为主音', '音阶仍用 C、D、E、G、A。伴奏改由 E7 进入 Am，末音也在 A 上延长。',
    sharedHead + ' | G4.4 E4.4 A4.2', [chord('A2 E3 C4', 'Am', 2) + ' ' + chord('E3 B3 D4 G#4', 'E7', 2), tonicAm], 'Aminor']
]);

const aMinorBox = [
  [1, 5, 'A'], [1, 8, 'C'],
  [2, 5, 'E'], [2, 8, 'G'],
  [3, 5, 'C'], [3, 7, 'D'],
  [4, 5, 'G'], [4, 7, 'A'],
  [5, 5, 'D'], [5, 7, 'E'],
  [6, 5, 'A'], [6, 8, 'C']
];
const upWholeTone = { A: 'B', C: 'D', D: 'E', E: 'F♯', G: 'A' };
const boxMarkers = offset => aMinorBox.map(([string, fret, pitch]) => ({
  string,
  fret: fret + offset,
  label: offset ? upWholeTone[pitch] : pitch,
  variant: pitch === 'C' ? 'root' : pitch === 'A' ? 'secondary' : undefined
}));

mountFretboard(document.getElementById('rock-pentatonic-box-c'), {
  startFret: 5,
  endFret: 8,
  caption: 'C 大调／A 小调五声盒型。C 和 A 分别标出两种主音。',
  markers: boxMarkers(0)
});
mountFretboard(document.getElementById('rock-pentatonic-box-d'), {
  startFret: 7,
  endFret: 10,
  caption: '整体升两品后得到 D 大调／B 小调五声盒型。D 和 B 分别标出两种主音。',
  markers: boxMarkers(2)
});
mountFretboard(document.getElementById('rock-pentatonic-key-frets'), {
  tuning: ['E4', 'B3'],
  startFret: 7,
  endFret: 10,
  caption: '第 1、2 弦在第 7、10 品的四个实点限定候选。第 8、9 品的邻点可以缩小范围。',
  markers: [
    { string: 1, fret: 7, label: 'B', variant: 'accent' },
    { string: 1, fret: 8, label: 'C' },
    { string: 1, fret: 9, label: 'C♯' },
    { string: 1, fret: 10, label: 'D', variant: 'accent' },
    { string: 2, fret: 7, label: 'F♯', variant: 'accent' },
    { string: 2, fret: 8, label: 'G' },
    { string: 2, fret: 9, label: 'G♯' },
    { string: 2, fret: 10, label: 'A', variant: 'accent' }
  ]
});

const c7 = chord('C3 G3 Bb3 E4', 'C7');
const a7 = chord('A2 G3 C#4 E4', 'A7');
const cm = chord('C3 G3 Eb4', 'Cm');

mount('rock-pentatonic-chords', 92, [
  ['C', 'C 和弦上的 D 与 A 都用来连向和弦音，旋律最终落到 C。',
    'G4.4 A4.4 E5.4 D5.4 | C5.2 r.2', [tonicC, tonicC]],
  ['C7', '在相同句型的第二个音加入 B♭。这个音与 E 共同标明 C7 的色彩。',
    'G4.4 Bb4.4 E5.4 D5.4 | C5.2 r.2', [c7, c7]],
  ['Am', '第一小节仍用 C 版的五声音。伴奏改用 Am，旋律由 D 折回 A。',
    'G4.4 A4.4 E5.4 D5.4 | A4.2 r.2', [tonicAm, tonicAm], 'Aminor'],
  ['A7 → D', '旋律让 A7 的 C♯ 紧接 D。F♯ 提前出现，和句尾的 D 大三和弦呼应。',
    'E4.4 F#4.4 G4.4 C#5.4 | D5.2 r.2', [a7, chord('D3 A3 F#4', 'D')], 'D'],
  ['Cm', '旋律的 E 改为 E♭，体现 Cm 的小三度。B♭ 与 F 也属于 C 小调五声。',
    'G4.4 Bb4.4 Eb5.4 F5.4 | C5.2 r.2', [cm, cm], 'Cminor']
]);

const bluesEnd = ' | G5.4 E5.4 A4.2';
const bluesHarmony = [a7, a7];
mount('rock-blue-note', 88, [
  ['大三度 C♯', '旋律用 C♯ 与 A7 的三音重合。这个音把旋律同伴奏的大三度连在一起。',
    'A4.4 C#5.4 D5.4 E5.4' + bluesEnd, bluesHarmony],
  ['降三级 C', '旋律改用降三级 C。伴奏仍保留 C♯，两音的差异带来蓝调色彩。',
    'A4.4 C5.4 D5.4 E5.4' + bluesEnd, bluesHarmony],
  ['加入降五级 E♭', '保留降三级 C。D 与 E 之间加一个短 E♭，形成两次接续的半音上行。',
    'A4.4 C5.4 D5.8 Eb5.8 E5.4' + bluesEnd, bluesHarmony]
]);

const dHalf = chord('D3 A3 D4', 'D', 2);
const eMinor = chord('E3 B3 E4', 'Em');
const diminishedLead = 'A4.2 F#4.2 | G4.1';
mount('rock-symmetric-chords', 80, [
  ['直接连接', 'D 与 Em 直接相接，低音跨一个全音。',
    diminishedLead, [chord('D3 A3 D4', 'D'), eMinor], 'G', 0],
  ['减七连接', '第 1 小节后半插入 D♯dim7，低音 D–D♯–E 连续上行两个半音。F♯ 先作为和弦音停留，再上行到 G。',
    diminishedLead, [dHalf + ' ' + chord('D#3 A3 C4 F#4', 'D♯dim7', 2), eMinor], 'G', 0],
  ['属七归向 Em', '同处改用 B7。D♯ 仍能向 E 解决，这次低音从 B 跳向 E。',
    diminishedLead, [dHalf + ' ' + chord('B2 A3 D#4 F#4', 'B7', 2), eMinor], 'G', 0],
  ['增三过渡', 'C 与 E 持续作为内外骨架，旋律 G–G♯–A 把 C、Caug 与 C6 连接起来。',
    'G4.2 G#4.2 | A4.1',
    [chord('C3 G3 E4', 'C', 2) + ' ' + chord('C3 E4', 'Caug', 2), chord('C3 G3 E4', 'C6')], 'C', 0]
]);

const dm = chord('D3 A3 F4', 'Dm');
const dmHarmony = [dm, dm];
mount('rock-mode-colors', 86, [
  ['D 自然小调', '伴奏持续用 Dm。旋律在 B♭–A 的半音上形成自然小调的六级色彩。',
    'D4.4 F4.4 G4.4 A4.4 | Bb4.4 A4.4 D5.2', dmHarmony, 'Dminor'],
  ['D 多利亚', '改用 B 自然音后，B–A 两音相距全音。D 根音、伴奏和弦和旋律句尾都保留。',
    'D4.4 F4.4 G4.4 A4.4 | B4.4 A4.4 D5.2', dmHarmony]
]);
