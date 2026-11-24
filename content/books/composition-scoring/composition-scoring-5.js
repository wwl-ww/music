import { accompaniment, mountScoringComparison, scoringPart } from './composition-scoring-seasonal-score.js';

const piano = (notes, settings) => scoringPart('钢琴旋律', 0, notes, settings);

const rainHarmony = accompaniment('(D3 F3 A3 C4).1 { dy p ch "Dm7" } | (C3 E3 G3 B3).1 { ch "Cmaj7" }');
const rainNinths = accompaniment('(D3 F3 A3 C4 E4).1 { dy p ch "Dm9" } | (C3 E3 G3 B3 D4).1 { ch "Cmaj9" }');
const longRain = piano('A5.4 F5.4 D5.2 | G5.4 E5.4 C5.2');
const detachedRain = piano('A5{st}.4 F5{st}.4 D5{st}.2 | G5{st}.4 E5{st}.4 C5{st}.2');
const lightRain = piano(
  'A5{st}.8 r.8 F5{st}.8 r.8 D5{st}.8 r.4 r.8 | G5{st}.8 r.8 E5{st}.8 r.8 C5{st}.8 r.4 r.8'
);
const ninthRain = piano(
  'E6{st}.8 r.8 F5{st}.8 r.8 D5{st}.8 r.4 r.8 | D6{st}.8 r.8 E5{st}.8 r.8 C5{st}.8 r.4 r.8'
);
mountScoringComparison('scoring-rain-pattern', 106, [
  ['持续音', '旋律的三个起音之后，声音延续到下一个落点。钢琴和声交替使用 Dm7 和 Cmaj7。', longRain, rainHarmony],
  ['只加断奏', '时值与起音位置沿用持续音版。点记号缩短演奏时的发声，在下一音前留出空隙。', detachedRain, rainHarmony],
  ['短音加休止', '每个音改成八分音符，后面写出明确的休止。原来的起音位置仍保留。', lightRain, rainHarmony],
  ['加入九音', '短奏和休止保留。两小节起音换为各自的九音 E 与 D，和声也加入相应的九音。', ninthRain, rainNinths]
]);

const dMajor = { key: 'D' };
const springTheme = piano('A4.4 F#4.4 B4.4 G4.4 | A4.4 C#5.4 A4.2 | G4.4 F#4.4 E4.2', dMajor);
const springStart = '(D3 F#3 A3).2 { ch "D" } (E3 G3 B3).2 { ch "Em" } | (F#3 A3 C#4).2 { ch "F♯m" } ';
const springGoal = ' | (E3 G3 B3).1 { ch "Em" }';
const springDominant = accompaniment(springStart + '(B2 A3 D#4 F#4).2 { ch "B7" }' + springGoal, dMajor);
const springSubstitute = accompaniment(springStart + '(F3 A3 Eb4 C5).2 { ch "F7" }' + springGoal, dMajor);
mountScoringComparison('scoring-spring-substitution', 84, [
  ['B7 → Em', 'D、E、F♯ 依次上行，第二小节低音从 F♯ 转向 B，再到 E。', springTheme, springDominant],
  ['F7 → Em', '保留上方的曲调和 Em 落点。第二小节后半用 F7，低音从 F♯ 经 F 平滑下降到 E。', springTheme, springSubstitute]
]);

const aMajor = { key: 'A' };
const summerHarmony = accompaniment('(A2 G#3 C#4 E4).1 { dy p ch "Amaj7" } | (G2 F#3 B3 D4).1 { ch "Gmaj7" }', aMajor);
const summerOnBeat = piano('C#5.4 E5.4 G#5.4 E5.4 | B4.4 D5.4 F#5.4 D5.4', aMajor);
const summerSyncopated = piano(
  'C#5.8 { d } E5{ac}.16 E5{t}.4 G#5.4 E5.4 | B4.8 { d } D5{ac}.16 D5{t}.4 F#5.4 D5.4',
  aMajor
);
mountScoringComparison('scoring-summer-syncopation', 124, [
  ['整拍起音', '两个短句都按整拍起音，和声依次为 Amaj7、Gmaj7。', summerOnBeat, summerHarmony],
  ['十六分切分', '第二个音提前到首拍最后一格，并用延音线跨过第 2 拍。第二小节也保留这个节奏型。', summerSyncopated, summerHarmony]
]);

const autumn = { key: 'Fminor', meter: '3 4' };
const autumnHarmony = accompaniment(
  '(F3 Ab3 C4).2 { d dy p ch "Fm" } | (E3 Ab3 C4 F4).2 { d ch "Fm(maj7)/E" } | (Eb3 Ab3 C4 F4).2 { d ch "Fm7/E♭" } | ' +
  '(D3 Ab3 C4 F4).2 { d ch "Dm7♭5" } | (Db3 Ab3 C4 F4).2 { d ch "D♭maj7" } | (C3 G3 Bb3 Eb4).2 { d ch "Cm7" }',
  autumn
);
const autumnPlain = 'C5.4 Ab4.4 F4.4 | C5.2 Ab4.4 | Bb4.4 Ab4.2 | F4.2 Ab4.4 | F4.4 Ab4.4 C5.4 | G4.2 { d }';
const autumnOrnate = 'C5.4 Ab4.4 F4.4 | C5.2 G4.16 { gr } Bb4.16 { gr } Ab4.4 | Bb4.4 Ab4.2 | ' +
  'F4.2 Ab4.4 | F4.4 Ab4.4 Bb4.16 { gr } Db5.16 { gr } C5.4 | G4.2 { d }';
const accordion = notes => scoringPart('手风琴旋律', 21, notes, autumn);
mountScoringComparison('scoring-autumn-line', 100, [
  ['旋律骨架', '每小节三个四分拍，主旋律长短轮替。低音连续下降六个落点。', accordion(autumnPlain), autumnHarmony],
  ['加入装饰音', '第 2 与第 5 小节在原落点前放入两个快速短音。低音仍按原来的步伐移动。', accordion(autumnOrnate), autumnHarmony]
]);

const aMinor = { key: 'Aminor' };
const winterHarmony = accompaniment(
  '(F2 A2 C3 E3).1 { dy p ch "Fmaj7" } | (F2 A2 C3 D3).1 { ch "F6" } | (A2 G3 B3 D4).1 { ch "G/A" } | (A2 A3 C4 E4).1 { ch "Am" }',
  aMinor
);
const stepwiseWinter = 'E5.8 F5.8 E5.2 r.4 | C5.2 r.2 | D5.8 E5.8 D5.2 r.4 | A4.2 { d } r.4';
const fourthWinter = 'E5.8 A5.8 E5.2 r.4 | C5.2 r.2 | D5.8 G5.8 D5.2 r.4 | A4.2 { d } r.4';
const panFlute = notes => scoringPart('排箫旋律', 75, notes, aMinor);
mountScoringComparison('scoring-winter-motif', 88, [
  ['邻音级进', '两个稀疏音组使用邻近音，结尾落到 A。', panFlute(stepwiseWinter), winterHarmony],
  ['四度跳进', 'E–A–E 与 D–G–D 保持同一个四度轮廓，原时值、和声与主音落点不变。', panFlute(fourthWinter), winterHarmony],
  ['同旋律换木吉他', '原四度动机交给木吉他。拨弦后的衰减拉开了短音和长音之间的听感。', scoringPart('木吉他旋律', 24, fourthWinter, aMinor), winterHarmony]
]);
