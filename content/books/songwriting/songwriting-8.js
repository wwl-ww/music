import { lyricBars, mountSongVariants } from './songwriting-score.js';

const wordsA = ['风吹过山口', '河映着月光'];
const wordsB = ['雨落在江面', '我听见船歌'];
const firstPhrase = ['C4.8 D4.8 E4.4', 'G4.4 E4.4'];
const secondPhrase = ['F4.8 E4.8 D4.4', 'G4.4 C4.4'];
const a = lyricBars(wordsA.join(''), [...firstPhrase, ...secondPhrase]);
const middleContrast = [
  'r.8 G4.8 A4.8 B4.8', 'C5.8 B4.4 r.8',
  'E5.8 D5.8 C5.4', 'B4.4 G4.4'
];

function ternaryScore(middle, ending) {
  return String.raw`\ks C \ts (2 4) \section ("A") ${a} | ${middle} | ${ending}`;
}

function middlePart(bars, settings = '') {
  return String.raw`${settings} \section ("B") ${lyricBars(wordsB.join(''), bars)}`;
}

function endingPart(phrase, label = 'A′', settings = '') {
  return String.raw`${settings} \section ("${label}") ${phrase}`;
}

const baseTempo = 88;
const baseMiddle = middlePart(middleContrast);
const exactEnding = endingPart(a, 'A');
const vocalise = lyricBars('啊啊', [
  'C5.8/sing/rise D5.8/held E5.8/held G5.8/held',
  'A5.8/held G5.8/held F5.8/held E5.8/held/rise',
  'F5.8/sing/fall E5.8/held D5.8/held C5.8/held',
  'B4.8/held A4.8/held G4.4/held/fall'
]);
const layeredMiddle = String.raw`\section ("B · 叙述") ${lyricBars(wordsB.join(''), middleContrast)} |
  \section ("无词发展") ${vocalise} | \section ("过渡") r.2 | r.2`;
const layeredPiano = [
  'C3.2 | C3.2 | F3.2 | C3.2',
  'G3.2 | C3.2 | A2.2 | G2.2',
  'C3.2 | F3.2 | D3.2 | G2.2',
  'D3.8 F3.8 A3.4 | (G2 B2 D3 F3).2',
  'C3.2 | C3.2 | F3.2 | C3.2'
].join(' | ');

mountSongVariants('song-ternary-middle', {
  contrast: {
    tempo: baseTempo,
    notes: ternaryScore(baseMiddle, exactEnding),
    summary: 'B 从后半拍起唱，进入高区。第二句经过 E5 的高点落到 G4，A 以原来的低音区回归。'
  },
  derived: {
    tempo: baseTempo,
    notes: ternaryScore(middlePart([
      'G4.8 A4.8 B4.4', 'D5.4 B4.4', 'C5.8 B4.8 A4.4', 'E5.4 G4.4'
    ]), exactEnding),
    summary: 'B 的第一句移高纯五度，保留 A 的短短长题头和两小节时值。第二句延续这股动势，再停在 G4。'
  },
  character: {
    tempo: baseTempo,
    notes: ternaryScore(middlePart([
      'G4.4 A4.4 B4.4', 'D5.2 C5.4', 'B4.4 A4.4 G4.4', 'E4.4 G4.2'
    ], String.raw`\tempo 120 \ts (3 4)`), endingPart(a, 'A', String.raw`\tempo ${baseTempo} \ts (2 4)`)),
    summary: 'B 换为较快的三拍子，保留句尾的延长。进入再现时恢复二拍子和原速度，回归也体现在拍感上。'
  },
  layered: {
    tempo: baseTempo,
    notes: String.raw`${ternaryScore(layeredMiddle, exactEnding)} || \staff { score } \tuning (none) \clef F4 ${layeredPiano}`,
    summary: 'B 先唱两句词，再用“啊”把旋律拓展到高区。人声换气时，钢琴用两小节过渡停在属七和弦，准备 A 回归。三步合为一个 B 段。'
  }
});

function withEnding(summary, ending) {
  return { tempo: baseTempo, summary, notes: ternaryScore(baseMiddle, ending) };
}

const newLastPhrase = ['F4.8 G4.8 A4.4', 'D5.4 C5.4'];
const returnWithNewEnd = lyricBars(wordsA.join(''), [...firstPhrase, ...newLastPhrase]);
mountSongVariants('song-ternary-ending-options', {
  exact: withEnding('第三段的两个乐句均与最初的 A 相同，段落在 C4 收拢。', exactEnding),
  melody: withEnding('第 9、10 小节保留原题头，后一句把句尾抬至 D5–C5，让整个作品在更高的音区收住。', endingPart(returnWithNewEnd)),
  speed: withEnding('歌词、音程和谱面时值关系保持。再现段的四分音符每分钟由 88 拍变为 68 拍。', endingPart(a, 'A', String.raw`\tempo 68`)),
  expanded: withEnding('保留前句，后句以“月光”再推进两个小节，最后才完成收束。', endingPart(
    lyricBars(wordsA.join(''), [...firstPhrase, 'F4.8 E4.8 D4.4', 'G4.2', 'A4.4/held G4.4/held', 'C5.2'])
  )),
  shortened: withEnding('第三段只回到 A 的后一句，直接用熟悉的收束完成全曲。', endingPart(lyricBars(wordsA[1], secondPhrase))),
  reordered: withEnding('先回到 A 的第二句，再唱第一句。交换句序后，新的句尾改落到 C4。', endingPart(
    lyricBars(wordsA[1] + wordsA[0], [...secondPhrase, firstPhrase[0], 'G4.4 C4.4'])
  )),
  combined: withEnding('第三段先用 B 的高音区句子开头，再接 A 的后一句。两个来源的材料都参与结尾。', endingPart(
    lyricBars(wordsB[1] + wordsA[1], [...middleContrast.slice(2), ...secondPhrase])
  )),
  new: withEnding('第三段用 A 的歌词，但写成分解和弦和更长的末音。新乐句自成 C 段。', endingPart(
    lyricBars(wordsA.join(''), ['C5.8 G4.8 E4.4', 'F4.4 A4.4', 'B4.8 G4.8 E4.4', 'G4.8 C4.4 r.8']), 'C'
  ))
});
