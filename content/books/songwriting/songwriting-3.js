import { lyricBars, mountSongVariants } from './songwriting-score.js';

const text = '小河绕过旧石桥风把灯影送回家';
const theme = ['E4.8 G4.8 A4.8 G4.8', 'F4.8 E4.8 G4.4'];

function song(words, bars, meter = '2 4') {
  return String.raw`\ks C \ts (${meter}) ${lyricBars(words, bars)}`;
}

const continuations = {
  literal: [theme, '两句的音高、音程和时值都一致。第二句保留 G 作为停顿，整组还有向下发展的余地。'],
  varied: [['E4.8 G4.8 A4.8 G4.8', 'F4.8 D4.8 C4.4'], '第二句保留第一句的完整句头，结尾改成 F、D、C。G 上的暂歇由 C 上的收束回答。'],
  sequence: [['F#4.8 A4.8 B4.8 A4.8', 'G4.8 F#4.8 A4.4'], '第二句的每个音比对应的原型音高大二度，内部音程和时值都保持。F♯ 来自这次严格移位。'],
  rhythm: [['A4.8 E4.8 F4.8 D4.8', 'F4.8 G4.8 C4.4'], '起音和时值照用第一句。第一句从 E 向上跳，第二句从 A 向下跳，各音之间也形成新的音程。'],
  extended: [['G4.4 C5.4', 'B4.8 A4.8 G4.4', 'E4.4 C4.4'], '第一句两小节，第二句三小节。第二句由较长的音带到高点，另用逐级回落和两拍尾部收束。']
};
mountSongVariants('song-melody-continuations', Object.fromEntries(Object.entries(continuations).map(([id, [bars, summary]]) => [id, {
  tempo: 76,
  notes: song(text, [...theme, ...bars]),
  summary
}])));

mountSongVariants('song-interval-span', {
  growing: {
    tempo: 90,
    notes: song('推开窗看云起', ['G4.4 C5.4', 'G4.4 E5.4', 'G4.4 G5.4']),
    summary: '每小节先回 G4，再跳向上方。上方音依次构成四度、六度和八度，随着高点抬升形成推进。'
  },
  narrowing: {
    tempo: 90,
    notes: song('推开窗看云起', ['G4.4 G5.4', 'G4.4 F5.4', 'G4.4 E5.4']),
    summary: '基点仍是 G4，上方音连成 G5、F5、E5 的下行线。跳进幅度由八度缩到七度，再缩到六度。'
  },
  motif: {
    tempo: 90,
    notes: song('推开窗看云起', ['C5.4 A4.8/sing/first G4.8/held/first', 'D5.4 A4.8/sing/second G4.8/held/second', 'E5.4 A4.8/sing/third G4.8/held/third']),
    summary: '每小节后半重复 A4–G4，固定基点是一小组音。正拍上的 C5、D5、E5 连成隐伏的上行线。'
  }
});

mountSongVariants('song-tail-connection', {
  tail: {
    tempo: 80,
    notes: song(text, [...theme, 'F4.8 E4.8 G4.4', 'A4.8 G4.8 D4.8 C4.8']),
    summary: '前句最后三个音 F–E–G 成为第二句的头三个音。相同材料先充当句尾，再充当句首。'
  },
  tailRhythm: {
    tempo: 80,
    notes: song(text, [...theme, 'F4.4 E4.8 G4.8', 'A4.8 G4.8 D4.8 C4.8']),
    summary: '仍承接 F–E–G，延长开头的 F，把 G 缩短。头尾之间的关系由音高维系。'
  },
  head: {
    tempo: 80,
    notes: song(text, [...theme, theme[0], 'D4.8 E4.8 C4.4']),
    summary: '第二句接回 E–G–A–G 的开头形状，然后改写句尾。这是重复变化，比较对象是前句的句头。'
  }
});
