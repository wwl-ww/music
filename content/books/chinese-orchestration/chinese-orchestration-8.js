import { mountEnsembleStudy, part } from './ensemble-study.js';

const dizi = phrase => part('笛', 73, phrase);
const hu = phrase => part('胡琴', 110, phrase);
const pipa = phrase => part('琵琶', 105, phrase);
const ruan = phrase => part('阮', 24, phrase, 'F4');
const sheng = phrase => part('笙', 20, phrase);
const bass = phrase => part('低音拉弦', 42, phrase, 'F4');

const longLine = 'G4.2 A4.4 C5.4 | A4.2 G4.2';
const attacks = 'G4.8 r.4 { d } A4.8 r.8 C5.8 r.8 | A4.8 r.4 { d } G4.8 r.4 { d }';
const lowAttacks = 'G3.8 r.4 { d } A3.8 r.8 C4.8 r.8 | A3.8 r.4 { d } G3.8 r.4 { d }';

mountEnsembleStudy('modern-attack', {
  alone: {
    detail: '胡琴用保持的声音连接每个音，作为其他三种配置的参照。',
    tracks: [hu(longLine)]
  },
  points: {
    detail: '琵琶在胡琴的每个起音同度轻弹一次，起音更鲜明，持续部分由胡琴保持。',
    tracks: [hu(longLine), pipa(attacks)]
  },
  roll: {
    detail: '琵琶用均匀的十六分音符示意连续轮音，同一音上的持续感更密。',
    tracks: [hu(longLine), pipa('G4.16*8 A4.16*4 C5.16*4 | A4.16*8 G4.16*8')]
  },
  octave: {
    detail: '低音阮在下八度描出相同起音，旋律宽度增加，胡琴音高保持不变。',
    tracks: [hu(longLine), ruan(lowAttacks)]
  }
}, 77);

const diziStart = 'G5.4 A5.4 C6.4 A5.4';
const huEnd = 'G5.2 E5.4 D5.4';
mountEnsembleStudy('modern-handoff', {
  cut: {
    detail: '笛在第一小节末结束，胡琴在下一小节第一拍单独进入。',
    tracks: [dizi(diziStart + ' | r.1'), hu('r.1 | ' + huEnd)]
  },
  bridge: {
    detail: '末拍的 A5 改由琵琶接过，作为笛与胡琴之间的一次过渡。',
    tracks: [dizi('G5.4 A5.4 C6.4 r.4 | r.1'), pipa('r.2 r.4 A5.4 | r.1'), hu('r.1 | ' + huEnd)]
  },
  overlap: {
    detail: '第二小节开头，笛与胡琴同时在 G5 发声一拍，随后笛退出，胡琴继续。',
    tracks: [dizi(diziStart + ' | G5.4 r.2 { d }'), hu('r.1 | ' + huEnd)]
  }
}, 78);

mountEnsembleStudy('modern-spacing', {
  close: {
    detail: 'C4–D4 与 C♯4–D♯4 分成两个声部，却挤在同一狭小音区，合起来几乎是连续的半音。',
    tracks: [sheng('(C#4 D#4).1'), bass('(C4 D4).1')]
  },
  open: {
    detail: '上层 C♯–D♯ 上移两个八度，C–D 留在原处。两层各自仍是大二度，但中音区留空。',
    tracks: [sheng('(C#6 D#6).1'), bass('(C4 D4).1')]
  }
}, 74);

const theme = 'G5.4 A5.4 E5.4 D5.4 | E5.4 G5.4 A5.4 G5.4';
mountEnsembleStudy('modern-texture-study', {
  contrast: {
    detail: '笛以四分音符讲出主题，胡琴用低区的两个长音接短句，在音区和节奏上形成对比。',
    tracks: [dizi(theme), hu('D4.2 A4.2 | B4.8 A4.8 B4.8 A4.8 D4.2')]
  },
  imitation: {
    detail: '胡琴迟入两拍，低八度复现笛的 G–A–E–D，第二次 G–A–E–D 可凭同一轮廓被辨认出来。',
    tracks: [dizi(theme), hu('r.2 G4.4 A4.4 | E4.4 D4.4 E4.4 G4.4')]
  },
  split: {
    detail: '笛与琵琶轮流发音。各自的休止处由另一件乐器补齐，合起来仍是完整主题。',
    tracks: [dizi('G5.4 r.4 E5.4 r.4 | E5.4 r.4 A5.4 r.4'),
      pipa('r.4 A5.4 r.4 D5.4 | r.4 G5.4 r.4 G5.4')]
  },
  accompany: {
    detail: '笛旋律原样保留，阮用持续反复的分解和弦填充低区，形成主线与伴奏。',
    tracks: [dizi(theme), ruan('G3.8 D4.8 G4.8 D4.8 G3.8 D4.8 G4.8 D4.8 | C3.8 G3.8 E4.8 G3.8 G3.8 D4.8 G4.8 D4.8')]
  },
  lead: {
    detail: '笛领奏，胡琴只在低八度保留第一、三拍的骨干，琵琶在个别落点加亮音头。',
    tracks: [dizi(theme), hu('G4.2 E4.2 | E4.2 A4.4 G4.4'),
      pipa('G5.8 r.8 r.4 r.2 | r.2 A5.8 r.8 G5.8 r.8')]
  },
  harmony: {
    detail: '笛仍在最高声部，笙的内声与低音随主线一起落拍。听觉上形成连续的和弦连接。',
    tracks: [dizi(theme),
      sheng('(B4 D5).4 (C5 E5).4 (G4 C5).4 (G4 B4).4 | (G4 C5).4 (C5 E5).4 (C5 E5).4 (B4 D5).4'),
      bass('G3.4 A3.4 C3.4 G3.4 | C3.4 C3.4 A3.4 G3.4')]
  }
}, 94);
