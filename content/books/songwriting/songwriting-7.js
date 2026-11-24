import { lyricBars, mountSongVariants } from './songwriting-score.js';

const wordsA = '风吹过山口河映着月光';
const wordsB = '雨落在江面我听见船歌';
const aEnding = ['D4.8 E4.8 F4.4', 'D4.4 C4.4'];
const a = lyricBars(wordsA, ['C4.8 E4.8 G4.4', 'E4.4 G4.4', ...aEnding]);
const bStart = ['A4.8 C5.8 B4.4', 'A4.4 G4.4'];

function binaryScore(bBars, coda = '') {
  return String.raw`\ks C \ts (2 4) \section ("A") ${a} |
    \section ("B") ${lyricBars(wordsB, bBars)} ${coda}`;
}

function setting(summary, bBars, coda) {
  return { summary, tempo: 88, notes: binaryScore(bBars, coda) };
}

mountSongVariants('song-binary-return', {
  return: setting('第 7、8 小节重现第 3、4 小节的整句曲调，换上 B 的歌词并完成收束。', [...bStart, ...aEnding]),
  recall: setting('B 延续高处的曲调，只在第 8 小节借用 A 的两音句尾 D4–C4。', [...bStart, 'A4.8 G4.8 E4.4', aEnding[1]]),
  new: setting('B 的后半用新材料收束，从 F 跳到 C，再以 E–C 结束。', [...bStart, 'A4.8 G4.8 F4.4', 'C4.8/held E4.8 C4.4'])
});

const titleLyrics = '仍听见船歌';
const coda = String.raw`| \section ("尾声") ${lyricBars(titleLyrics, ['C5.8 D5.8 E5.4', 'D5.4 C5.4'])}`;
mountSongVariants('song-binary-climax', {
  contrast: setting('E5 落在 B 刚开始的“在”字上，随后的乐句逐级回落，突入的高点和 A 形成对比。', [
    'C5.8 D5.8 E5.4', 'D5.4 C5.4', 'B4.8 A4.8 G4.4', 'E4.4 C4.4'
  ]),
  build: setting('B 的起句先到 A4，下一短句才抬高到 E5。两处相似的上行形状把动势向后积累。', [
    'E4.8 G4.8 A4.4', 'G4.4 B4.4', 'A4.8 C5.8 E5.4', 'D5.4 C5.4'
  ]),
  final: setting('B 先维持中区，到最后一个小节在“船”字上突然到达 E5，随即落 C 收拢。', [
    'E4.8 G4.8 A4.4', 'G4.4 E4.4', 'G4.8 A4.8 B4.4', 'E5.4 C5.4'
  ]),
  coda: setting('B 已经收住，尾声重复“听见船歌”的词意，另用两小节高音区材料强化全曲最后的表达。', [
    'E4.8 G4.8 A4.4', 'G4.4 E4.4', 'G4.8 F4.8 D4.4', 'E4.4 C4.4'
  ], coda)
});
