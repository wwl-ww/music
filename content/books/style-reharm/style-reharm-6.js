import { baseHarmony, baseMelody } from './style-reharm-base.js';
import { arrangement, baseChords, chord, editBars, mountReharmVersions } from './style-reharm-6-8-score.js';

const base = baseChords(baseHarmony);
const half = (symbol, bass, upper) => chord(symbol, bass, upper, 4);
const guitar = (melody, harmony, summary) => arrangement(melody, harmony, { tempo: 84, feel: 'guitar', melodyProgram: 73, summary });

const invertedF = chord('F/C', 'C3', 'A3 C4 F4');
const st = {
  3: invertedF,
  6: chord('Am', 'A2', 'A3 C4 E4'),
  14: chord('Dm7', 'D3', 'A3 C4 F4'),
  15: chord('G7', 'G2', 'G3 B3 F4')
};
const minorApproach = [
  half('Em7b5', 'E3', 'G3 Bb3 D4'),
  half('A7', 'A2', 'G3 C#4 E4')
];
const dm7 = chord('Dm7', 'D3', 'A3 C4 F4');
const cMaj7 = chord('Cmaj7', 'C3', 'G3 B3 E4');
const cMaj7Half = half('Cmaj7', 'C3', 'G3 B3 E4');
const dominant = [
  half('Dm7', 'D3', 'A3 C4 F4'),
  half('E', 'E3', 'G#3 B3 E4')
];
const folkTune = editBars(baseMelody, { 11: 'F5.4 E5.4 E5.2' });
const finished = editBars(base, {
  ...st,
  5: chord('Cadd9', 'C3', 'E3 G3 D4 E4'),
  8: [half('Bb', 'Bb2', 'F3 Bb3 D4'), half('G/B', 'B2', 'G3 B3 D4')],
  9: [chord('G', 'G2', 'G3 B3 D4', 2), chord('Gsus4', 'G2', 'D3 G3 C4', 6)],
  10: minorApproach,
  11: dominant,
  12: [half('Am', 'A3', 'C4 E4 A4'), half('Am/G', 'G3', 'C4 E4 A4')],
  13: [half('F', 'F3', 'A3 C4 F4'), half('C/E', 'E3', 'G3 C4 E4')],
  14: dm7,
  15: chord('Gsus4', 'G2', 'D3 G3 C4'),
  16: [half('C', 'C3', 'G3 C4 E4'), half('Ab', 'Ab2', 'Ab3 C4 Eb4')]
});

mountReharmVersions('reharm-folk-arrangement', {
  final: guitar([...folkTune, 'r.1', 'r.1'], [
    ...finished, chord('Bb', 'Bb2', 'Bb3 D4 F4'), chord('C', 'C3', 'G3 C4 E4')
  ], '前段以三和弦和原声吉他分解为主，后段加入小调二五、下行低音和两小节器乐尾声。第 11 小节的长音从 C 改到 E。'),
  base: guitar(baseMelody, base, '以基础和声配上同一把原声吉他的分解型。16 小节后直接在 C 结束。')
});

const tonicization = (penultimate, summary) =>
  guitar(folkTune.slice(9, 12), [penultimate, dominant, finished[11]], summary);
mountReharmVersions('reharm-folk-secondary', {
  sparse: tonicization(cMaj7, '第 10 小节维持 Cmaj7。第 11 小节前半的 Dm7 仍从 C 大调的主区接入。'),
  insert: tonicization([cMaj7Half, minorApproach[1]], '第 10 小节后半换成 A7，C♯ 在下一个小节上行半音进入 D。'),
  applied: tonicization([half('Em7', 'E3', 'G3 B3 D4'), minorApproach[1]],
    '第 10 小节前半的主功能交给 Em7。由 D 来看，E–A–D 已形成二五一的根音路线。'),
  minor: tonicization(minorApproach, '只把前半和弦的 B 降为 B♭，Em7♭5–A7–Dm7 成为明确的小调二五一。')
});

const fourthTune = ['C5.2 A4.4 F4.4', folkTune[15]];
const fourth = (voicing, summary) => guitar(fourthTune, [voicing, base[15]], summary);
mountReharmVersions('reharm-folk-guitar-fourth', {
  dominant: fourth(chord('G7', 'G2', 'D3 G3 B3 F4'), '第二弦空弦 B 会在旋律 C 持续时发声。B 与 F 同属 G7 的属张力。'),
  seventh: fourth(chord('G7sus4', 'G2', 'D3 G3 C4 F4'), '第二弦从空弦改按第一品，B 升到 C。第一弦的 F 仍给出属七色彩。'),
  suspended: fourth(chord('Gsus4', 'G2', 'D3 G3 C4'), '第一弦不弹。D–G–C 连续两次叠纯四度，伴奏中没有 F。')
});

const close = (harmony, summary) =>
  guitar([...folkTune.slice(13), ...harmony.slice(3).map(() => 'r.1')], harmony, summary);
mountReharmVersions('reharm-folk-ending', {
  tonic: close([dm7, st[15], base[15]], 'G7 的 B–F 提供属功能，最后一小节直接落在 C。'),
  borrowed: close([...finished.slice(13), chord('Bb', 'Bb2', 'Bb3 D4 F4'), base[15]],
    'G 的三音换成 C，省去伴奏中的七音。末句旋律在 A♭ 上停住，吉他继续走 A♭–B♭–C。')
});
