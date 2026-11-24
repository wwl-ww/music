import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { mountDominantTensionMap } from '../../shared/formats/dominant-tension-map.js';
import { baseMelody, baseScore, harmonyBeat, pianoScore } from './style-reharm-base.js';
import { chord, half, harmonicScore } from './style-reharm-1-score.js';

const voices = {
  C: 'C3 G3 C4 E4',
  Cm: 'C3 G3 C4 Eb4',
  Dm: 'D3 A3 D4 F4',
  Em: 'E3 G3 B3 E4',
  F: 'F2 A3 C4 F4',
  Fmaj7: 'F2 A3 C4 E4',
  'Fmaj7 · 邻接': 'F3 A3 C4 E4',
  G: 'G2 G3 B3 D4',
  Cmaj7: 'C3 G3 B3 E4',
  'Cmaj7/E': 'E3 G3 B3 E4',
  Cmaj9: 'C3 G3 B3 D4 E4',
  Cm9: 'C3 G3 Bb3 D4 Eb4',
  C7: 'C3 G3 Bb3 E4',
  'C13': 'C3 A3 Bb3 D4 E4',
  Dm7: 'D3 F3 A3 C4',
  'Dm7(♭5)': 'D3 F3 Ab3 C4',
  'Dm7 · 副属解决': 'D3 F3 A3 C4 D4',
  Dm9: 'D3 F3 A3 C4 E4',
  Dm11: 'D3 F3 A3 C4 G4',
  'D7(9)': 'D3 F#3 A3 C4 E4',
  D7: 'D3 A3 C4 F#4',
  D13: 'D3 C4 E4 F#4 B4',
  Em7: 'E3 G3 B3 D4',
  'Em7(♭5)': 'E3 G3 Bb3 D4',
  'Em7 · 低音下行': 'E2 G3 B3 D4',
  Em9: 'E3 G3 B3 D4 F#4',
  'Em7/G': 'G2 G3 B3 D4 E4',
  E7: 'E3 G#3 B3 D4',
  'E7(♭9,♭13)': 'E3 G#3 C4 D4 F4',
  'E7(♯9,♭13)': 'E3 G#3 C4 D4 Fx4',
  Fmaj9: 'F2 G3 A3 C4 E4',
  FmMaj7: 'F2 Ab3 C4 E4',
  'Fmaj7/G': 'G2 F3 A3 C4 E4',
  'Dm7/G': 'G2 F3 A3 C4 D4',
  'Gm9': 'G2 Bb3 D4 F4 A4',
  Gm7: 'G2 Bb3 D4 F4',
  G7: 'G2 F3 B3 D4',
  'G7 · 共同音': 'G2 G3 B3 D4 F4',
  'G7/B': 'B2 F3 G3 D4',
  'G/B': 'B2 G3 B3 D4',
  G13: 'G2 F3 A3 B3 E4',
  'G7(13)': 'G2 F3 B3 E4',
  'G7(♭13)': 'G2 F3 B3 Eb4',
  'G7(♭9,♭13)': 'G2 F3 Ab3 B3 Eb4',
  'G7sus4': 'G2 F3 C4 D4',
  'G13sus4': 'G2 F3 A3 C4 E4',
  'Gadd9/B': 'B2 A3 D4 G4',
  'Gadd9/B · 密集': 'B2 G3 A3 D4',
  Am7: 'A2 G3 C4 E4',
  Am9: 'A2 G3 B3 C4 E4',
  A7: 'A2 G3 C#4 E4',
  'A7(♭9,♭13)': 'A2 G3 Bb3 C#4 F4',
  A7sus4: 'A2 G3 D4 E4',
  'B♭13': 'Bb2 Ab3 C4 D4 G4',
  'B♭7': 'Bb2 F3 Ab3 D4',
  B7: 'B2 F#3 A3 D#4',
  'B7(♭9,♭13)': 'B2 A3 C4 D#4 G4',

};

const reharmonized = [
  'Cmaj7', half('Cmaj7', 'Cmaj7/E'), half('Dm9', 'G13'), 'Cmaj9',
  [['Gadd9/B', 2], ['E7(♭9,♭13)', 4], ['E7(♯9,♭13)', 4]], half('Am9', 'C13'), half('Fmaj9', 'Dm9'), half('D7(9)', 'G13'),
  half('Dm7/G', 'FmMaj7'), 'Em7 · 低音下行', half('Gm9', 'C13'), 'Fmaj9',
  half('Dm9', 'B7(♭9,♭13)'), [['Em7', 2], ['B♭13', 4], ['A7sus4', 4]], half('Dm11', 'G13sus4'), 'Cmaj7'
];
const coda = ['Fmaj7/G', 'Em7/G', 'Dm7/G', 'G13', 'Cmaj7'];
const finishedHarmony = [...reharmonized.slice(0, -1), ...coda];
const finishedMelody = [...baseMelody, 'r.1', 'r.1', 'r.1', 'r.1'];

const walking = [
  ['C3', 'E3', 'G3', 'B2'], ['C3', 'D3', 'E3', 'Eb3'], ['D3', 'A2', 'G2', 'B2'], ['C3', 'E3', 'G3', 'C3'],
  ['B2', 'D3', 'E3', 'E3'], ['A2', 'G2', 'C3', 'E3'], ['F2', 'A2', 'D3', 'C3'], ['D3', 'A2', 'G2', 'D3'],
  ['G2', 'D3', 'F2', 'Gb2'], ['E2', 'G2', 'B2', 'Ab2'], ['G2', 'Bb2', 'C3', 'E3'], ['F2', 'A2', 'C3', 'Eb3'],
  ['D3', 'F3', 'B2', 'D#3'], ['E3', 'B2', 'Bb2', 'A2'], ['D3', 'A2', 'G2', 'G2']
];

const walkingBars = walking.map(bar => bar.map(pitch => `${pitch}.4`).join(' '));
function jazzComp(pitches, duration, change, label) {
  if (duration === 1) return `r.4 ${chord(pitches, label, 4)} r.4 ${chord(pitches, '', 4)}`;
  if (duration === 2) {
    return change === 0 ? `${chord(pitches, label, 4)} r.4` : `r.4 ${chord(pitches, label, 4)}`;
  }
  return chord(pitches, label, duration);
}

const plain = (melody, bars) => harmonicScore(melody, bars, voices);
function band(melody, bars) {
  const notes = harmonicScore(melody, bars, voices, {
    swing: true, leadProgram: 65, bassProgram: 32, playChords: jazzComp
  });
  notes.scoreTracks[2].phrase = String.raw`\ks C \ts (4 4) \clef F4 ${walkingBars.concat(
    ['G2.1', 'G2{t}.1', 'G2{t}.1', 'G2{t}.1', 'C3.1']
  ).join(' | ')}`;
  return notes;
}

function mount(id, steps, { tempo = 104, sectionNavigation, notationVisible = true } = {}) {
  mountScoreWritingSteps(document.getElementById(id), {
    steps: steps.map(([label, description, notes]) => ({ label, description, notes })),
    score: { tempo, sectionNavigation, notationVisible, soundFontUrl: bandSoundFont }
  });
}

mount('style-jazz-finished', [
  ['爵士成品', '萨克斯管沿用十六小节旋律。前段低音行进，尾段转为 G 持续低音，加四小节尾声。成对八分音符采用三连音式摇摆。', band(finishedMelody, finishedHarmony)],
  ['共同基谱', '十六小节的旋律按等分八分音符演奏，伴奏主要用 C、F、G 三和弦。', baseScore({ tempo: 104 })],
  ['爵士和声', '十六小节旋律按等分八分音符演奏，改用爵士和声，保留块状和弦和直接结束。', plain(baseMelody, reharmonized)]
], { sectionNavigation: {} });

const closingMelody = baseMelody.slice(12);
mount('style-jazz-functional', [
  ['原和声', 'F、G、F、C。最后由 IV 回到 I，前一个 G 与 C 并不相接。', plain(closingMelody, ['F', 'G', 'F', 'C'])],
  ['功能改写', 'F–C–Dm–G–C。先规划前段回主与末尾二–五–一。', plain(closingMelody, ['F', 'C', half('Dm', 'G'), 'C'])],
  ['调内替代', 'Dm7 代替 F，Em7 代替其后的 C。句尾保留 Dm7–G7sus4–Cmaj7，旋律的 A 可当作 G 上的九音。', plain(closingMelody, ['Dm7', 'Em7', half('Dm7', 'G7sus4'), 'Cmaj7'])]
]);

const tonicSubstitutionMelody = baseMelody.slice(8, 12);
mount('style-jazz-tonic-substitution', [
  ['Cmaj7', '第 10 小节的旋律 E 与 G 是 Cmaj7 的三音与五音。低音 G→C，属七直接回到主和弦。', plain(tonicSubstitutionMelody, ['G7 · 共同音', 'Cmaj7', 'Fmaj7 · 邻接', 'Cmaj7'])],
  ['Em7', 'E 与 G 成为 Em7 的根音与小三音。和声的 G3、B3、D4 留在原音高，低音由 G 到 E，再级进至 F。', plain(tonicSubstitutionMelody, ['G7 · 共同音', 'Em7', 'Fmaj7 · 邻接', 'Cmaj7'])],
  ['Am7', 'E 与 G 成为 Am7 的五音与七音。低音 G→A，属七先落到第六级，随后经 Fmaj7 回到 Cmaj7。', plain(tonicSubstitutionMelody, ['G7 · 共同音', 'Am7', 'Fmaj7 · 邻接', 'Cmaj7'])]
]);

const testClashMelody = ['G4.1', 'D5.2 E4.2', 'E4.2 G4.2', 'F4.2 A4.2', 'E4.4 G4.4 C5.2'];
const secondaryDraft = ['Cmaj7', 'G7', 'Em7', 'Dm7 · 副属解决', 'Cmaj7'];
const secondaryScreened = ['Cmaj7', 'G7', half('Em7', 'A7'), ...secondaryDraft.slice(3)];
mount('style-jazz-secondary', [
  ['调内原和声', '每小节先放一个和弦。第 2、3、4 小节的 G7、Em7、Dm7 都可以作为局部目标。', plain(testClashMelody, secondaryDraft)],
  ['试加三个副属', '各在目标前两拍放副属。D7 的 F♯4 紧挨旋律 G4，B7 的 D♯4 紧挨旋律 E4，两个小二度都持续两拍。', plain(testClashMelody, [half('Cmaj7', 'D7'), half('G7', 'B7'), half('Em7', 'A7'), ...secondaryDraft.slice(3)])],
  ['只保留 A7', '恢复前两处原和声。第 3 小节后半的旋律 G4 是 A7 的七音，和声的 C♯4 上行到下一小节的 D4。', plain(testClashMelody, secondaryScreened)]
]);

const subdivisionMelody = ['G4.1', 'A4.2 G4.2', 'E4.2 G4.2', 'F4.2 G4.2', 'C5.1'];
const subdivisionDraft = ['C7', 'Fmaj7', 'A7', 'Dm7', 'Cmaj7'];
const subdivisionDominants = [half('Gm7', 'C7'), 'Fmaj7', half('Em7', 'A7'), 'Dm7', 'Cmaj7'];
mount('style-jazz-ii-v-split', [
  ['整小节和弦', 'C7 先到 Fmaj7，A7 再到 Dm7。两处目标各保留一小节。', plain(subdivisionMelody, subdivisionDraft)],
  ['拆分两个属七', '先设目标 F 和 D。第一小节成为 Gm7–C7，第三小节成为 Em7–A7，原来的两个目标仍在下一小节第一拍。', plain(subdivisionMelody, subdivisionDominants)],
  ['Fmaj7 被改掉', '若把 Fmaj7 整段改成 Dm7–G7，第一小节的 C7 就进入 Dm7，原定的 F 落点消失。', plain(subdivisionMelody, [subdivisionDominants[0], half('Dm7', 'G7'), subdivisionDominants[2], half('Dm7', 'G7'), 'Cmaj7'])],
  ['保留 F 的落点', '第二小节先到 Fmaj7，后半才用 G7。第四小节从 Dm7 开始，再加入 G7 准备最终的 Cmaj7。', plain(subdivisionMelody, [subdivisionDominants[0], half('Fmaj7', 'G7'), subdivisionDominants[2], half('Dm7', 'G7'), 'Cmaj7'])]
]);

const targetExamples = [
  { tonic: 'C', melody: ['G4.1', 'G4.4 E4.4 C4.2'], chords: ['Dm7', 'G13', 'C'] },
  { tonic: 'C', minor: true, melody: ['G4.1', 'G4.4 Eb4.4 C4.2'], chords: ['Dm7(♭5)', 'G7(♭9,♭13)', 'Cm'] },
  { tonic: 'D', minor: true, melody: ['A4.1', 'A4.4 F4.4 D4.2'], chords: ['Em7(♭5)', 'A7(♭9,♭13)', 'Dm'] }
];
mountDominantTensionMap(document.getElementById('style-jazz-tensions'),
  targetExamples.map(({ tonic, minor, melody, chords: [preparation, dominant, target] }) => ({
    tonic, minor, score: included => plain(melody, [included ? half(preparation, dominant) : dominant, target])
  })));

const screenedTensionMelody = ['E4.1', 'E4.2 G4.2'];
mount('style-jazz-tension-screen', [
  ['落在 Cmaj7', 'G7 加 E，下一小节落在 Cmaj7。旋律与伴奏在第一小节都有 E4。', plain(screenedTensionMelody, ['G7(13)', 'Cmaj7'])],
  ['落在 Em7', '第一小节完全相同。第二小节改接 Em7，伴奏里仍有 E、G、B，低音改为 E。', plain(screenedTensionMelody, ['G7(13)', 'Em7'])],
  ['伴奏 E 降半音', '仍然落在 Em7。第一小节只有伴奏 E4 变成 E♭4，与旋律长音 E4 同时响。', plain(screenedTensionMelody, ['G7(♭13)', 'Em7'])]
]);

const tritoneMelody = ['F4.1', 'E4.1'];
const tritoneTonic = harmonyBeat('C2 G3 C4', 'C');
mount('style-jazz-tritone', [
  ['G7–C', 'B 是 G7 的三音，F 是七音，两音相隔三全音。', pianoScore(tritoneMelody, [harmonyBeat('G2 D3 B3', 'G7'), tritoneTonic], { tempo: 104 })],
  ['D♭7–C', 'F 成为 D♭7 的三音，C♭ 是七音。C♭ 与原来的 B 同音高。', pianoScore(tritoneMelody, [harmonyBeat('Db2 Ab3 Cb4', 'D♭7'), tritoneTonic], { tempo: 104 })]
], { notationVisible: false });

const dominantChainMelody = ['G4.2 A4.2', 'D4.2 r.4 A4.4', 'D4.1'];
mount('style-jazz-secondary-tritone', [
  ['保留 ii7–V7', '第二小节 Em7–A7 是指向 Dm7 的二–五。第 1 小节后半的 B7 原本指向 Em7。', plain(dominantChainMelody, [half('Dm7', 'B7'), half('Em7', 'A7'), 'Dm7'])],
  ['把 ii7 改成属七', '把 Em7 的 G 升成 G♯，变成 E7。E7 的三音、七音 G♯ 与 D 使它也能把下一和弦 A7 当作局部目标。', plain(dominantChainMelody, [half('Dm7', 'B7'), half('E7', 'A7'), 'Dm7'])],
  ['用 B♭7 替代 E7', 'E7 的 G♯ 与 D 等音保留为 A♭ 与 D。第 1 小节后半开始，最低音 B–B♭–A 连续下行。', plain(dominantChainMelody, [half('Dm7', 'B7'), half('B♭7', 'A7'), 'Dm7'])]
]);

const scanMelody = baseMelody.slice(3, 6);
mount('style-jazz-slash', [
  ['原位 · G7', '第五小节在 G7 到 E7 之间更换低音，G7 仍含七音 F。', plain(scanMelody, ['Cmaj9', half('G7', 'E7(♭9,♭13)'), 'Am9'])],
  ['换低音 · G7/B', '把 G7 的三音 B 放到低音，C–B–E 已经形成。七音 F 仍保留。', plain(scanMelody, ['Cmaj9', half('G7/B', 'E7(♭9,♭13)'), 'Am9'])],
  ['去七音 · G/B', '这处 G 和弦接 E7。去掉原本会向 C 的三音 E 解决的七音 F，保留大三和弦。', plain(scanMelody, ['Cmaj9', half('G/B', 'E7(♭9,♭13)'), 'Am9'])],
  ['加九音 · Gadd9/B', '加入九音 A，和声上方以 G–A–D 排列，低音仍是 B。', plain(scanMelody, ['Cmaj9', half('Gadd9/B · 密集', 'E7(♭9,♭13)'), 'Am9'])],
  ['四度叠置', '低音和和弦音保持一致，把 G 移高八度，和声上方改为 A–D–G。', plain(scanMelody, ['Cmaj9', half('Gadd9/B', 'E7(♭9,♭13)'), 'Am9'])]
]);

const colorMelody = baseMelody.slice(4, 6);
mount('style-jazz-colors', [
  ['固定 ♭9', 'E7 的降九音 F 保持两拍，再在下一小节进入 Am9。', plain(colorMelody, [half('Gadd9/B', 'E7(♭9,♭13)'), 'Am9'])],
  ['♭9 转 ♯9', 'E7 每拍重新组织一次。先用 F，再换成 F𝄪，实际音高 G，其他和弦音不变。', plain(colorMelody, [reharmonized[4], 'Am9'])]
]);
