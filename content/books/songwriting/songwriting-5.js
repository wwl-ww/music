import { lyricBars, mountSongVariants } from './songwriting-score.js';
import { bridgeMelodies as melody, bridgePhrase, bridgeScore, bridgeVerses as verses, labelPhrase } from './songwriting-phrase-material.js';

const first = bridgePhrase(verses[0], melody.opening);
const second = bridgePhrase(verses[1], melody.continuation);
const third = bridgePhrase(verses[2], melody.turn);
const fourth = bridgePhrase(verses[3], melody.close);
const pending = bridgePhrase(verses[3], [melody.close[0], 'E4 D4 G4']);
const four = [labelPhrase('1', first), labelPhrase('2', second), labelPhrase('3', third), labelPhrase('4', fourth)];
const repeatedWords = lyricBars(verses[3] + '烟霄', [
  'G4.8 F4.8 E4.8 D4.8', 'E4.8 D4.8 G4.4', 'D4.4 C4.4'
]);
const fillerOne = lyricBars('啦啦啦', ['C5.4 E5.4', 'D5.2']);
const fillerTwo = lyricBars('哦哦哦', ['C5.4 A4.4', 'G4.2']);
const fillerClosing = lyricBars('哦哦哦', ['G4.4 E4.4', 'C4.2']);

mountSongVariants('song-lyric-repetition', {
  plain: {
    tempo: 90,
    notes: bridgeScore(four),
    summary: '每句词对应两小节的一句曲。第 4 句的 C 完成收束，作为其余版本的基准。'
  },
  tail: {
    tempo: 90,
    notes: bridgeScore([...four.slice(0, 3), labelPhrase('4 · 重复词尾', repeatedWords)]),
    summary: '“烟霄”在第四句内再次出现，终止推后一小节。词尾重复，整段仍是四句曲。'
  },
  fifth: {
    tempo: 90,
    notes: bridgeScore([...four.slice(0, 3), labelPhrase('4', pending), labelPhrase('5 · 重复第四句词', bridgePhrase(verses[3], ['C5 E5 D5 C5', 'G4 D4 C4']))]),
    summary: '第 4 句停在 G。第 5 句用高区的新句重唱整句词，再落在 C。出现新的气息与句尾，句数增到五句。'
  },
  filler: {
    tempo: 90,
    notes: bridgeScore([...four.slice(0, 3), labelPhrase('4', pending), labelPhrase('5 · 衬词', fillerOne), labelPhrase('6 · 衬词', fillerClosing)]),
    summary: '第四句以后用“啦”“哦”各写一句。衬词先把旋律带入高音区，再以单独的乐句收回主音。'
  },
  fillerReturn: {
    tempo: 90,
    notes: bridgeScore([...four, labelPhrase('5 · 衬词', fillerOne), labelPhrase('6 · 衬词', fillerTwo), labelPhrase('7 · 重现', third), labelPhrase('8 · 收束', fourth)]),
    summary: '原有四句之后加入两句衬词，再同时重现第三、四句的词与曲。整段由四句增为八句。'
  }
});

const continuous = lyricBars(verses.slice(0, 4).join(''), [
  'C4.16 E4.16 G4.16 E4.16 D4.16 E4.16 G4.8',
  'G4.16 A4.16 C5.16 B4.16 A4.16 C5.16 A4.8',
  'A4.16 G4.16 F4.16 G4.16 E4.16 D4.16 D4.8',
  'G4.16 F4.16 E4.16 D4.16 E4.16 D4.16 C4.8'
]);
const shortText = [
  labelPhrase('A · 原句', first),
  bridgePhrase(verses[0], ['D4 F4 A4 F4', 'E4 F4 G4']),
  labelPhrase('B · 衬词', lyricBars('啊啊', ['C5.2', 'E5.2'])),
  lyricBars('旧桥旧桥', ['D5.4 C5.4', 'E4.4 C4.4'])
];

mountSongVariants('song-text-density', {
  separate: {
    tempo: 72,
    notes: bridgeScore(four),
    summary: '每行词唱两小节，每个句尾有四分音符。第 2、4、6、8 小节末都是乐句边界。'
  },
  compact: {
    tempo: 72,
    notes: bridgeScore([labelPhrase('一大句', continuous)]),
    summary: '仍是同样四句词，每一句缩成一个小节。前几个词尾只停八分音符，前三小节不完全收束，形成一气唱下的一大句。'
  },
  expanded: {
    tempo: 72,
    notes: bridgeScore(shortText),
    summary: '只保留“山风吹过旧石桥”这一句。前两句曲重复原词，B 的高区衬词和低区词尾形成对比，再回到 C。'
  }
});
