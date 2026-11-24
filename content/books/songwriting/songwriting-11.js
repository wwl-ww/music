import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { lyricBars, mountSongVariants } from './songwriting-score.js';

function accompanied(voice, piano) {
  return String.raw`\ks C \ts (4 4) ${voice} || \staff { score } \tuning (none) \clef F4 ${piano}`;
}

const mainSong = lyricBars('水绕旧桥光照两岸', ['E4.4 G4.4 E4.4 D4.4', 'C4.4 E4.4 F4.4 C4.4']);
const current = 'C3.8 G3.8 E3.8 G3.8 C3.8 G3.8 E3.8 G3.8';
const downstream = 'F3.8 C4.8 A3.8 C4.8 G3.8 D4.8 E3.8 G3.8';
const afterPrelude = current + ' | ' + downstream;
const beforeSong = String.raw`\section ("前奏") r.1 | r.1 | \section ("歌声") ${mainSong}`;

mountSongVariants('song-prelude-design', {
  figure: {
    tempo: 88,
    notes: accompanied(beforeSong, current + ' | ' + downstream + ' | ' + afterPrelude),
    summary: '较均匀的分解音型先交代流水感和拍速，歌声进入后仍保留在下方。'
  },
  melody: {
    tempo: 88,
    notes: accompanied(beforeSong, 'E3.4 G3.4 E3.4 D3.4 | C3.4 E3.4 G3.4 r.4 | ' + afterPrelude),
    summary: '器乐先奏歌声开头的轮廓。前奏末尾留一拍空隙，再接歌声。'
  },
  scene: {
    tempo: 88,
    notes: accompanied(beforeSong, 'C3.8 D3.8 E3.8 G3.8 C4.8 D4.8 E4.8 G4.8 | E4.4 G3.4 F3.4 (G2 B2 F3).4 | ' + afterPrelude),
    summary: '上行音型先把音区铺开，再回落到属和弦。歌声从稳固的 C 大调进入。'
  }
});

const prior = lyricBars('水边有灯照小船', ['G4.4 A4.4 G4.4 E4.4', 'D4.4 E4.4 G4.2']);
const continued = lyricBars('船又向前', ['G4.4 F4.4 E4.4 C4.4']);
const changed = lyricBars('夜色渐深', ['A4.4 E4.4 D4.4 C4.4']);
const throughInterlude = String.raw`\section ("前句") ${prior} | \section ("间奏") r.1 | r.1 | \section ("后句")`;
const beforeInterlude = '(C3 E3 G3).1 | (G2 B2 D3).1 | ';

mountSongVariants('song-interlude-design', {
  echo: {
    tempo: 88,
    notes: accompanied(throughInterlude + ' ' + continued, beforeInterlude + 'D3.4 E3.4 G3.2 | E3.4 G3.4 D3.4 r.4 | (C3 E3 G3).1'),
    summary: '伴奏从较低的音区复现前句末尾的 D–E–G，用回声留下歌声的换气位置。'
  },
  shift: {
    tempo: 88,
    notes: accompanied(throughInterlude + ' ' + changed, beforeInterlude + 'D3.4 E3.4 G3.2 | E3.2 (E3 G#3 B3 D4).2 | (A2 C3 E3).1'),
    summary: '间奏开头仍是尾句的 D–E–G，随后延长 E 并转成 E7，为后句的 a 小调作准备。'
  },
  develop: {
    tempo: 88,
    notes: accompanied(throughInterlude + ' ' + continued, beforeInterlude + 'D3.8 E3.8 G3.4 E3.8 F3.8 A3.4 | G3.8 A3.8 C4.4 B3.8 A3.8 G3.4 | (C3 E3 G3).1'),
    summary: '把前句尾的三音动机收紧、向上模进，到 C4 后回落，再让人声接回。'
  }
});

const finalSong = lyricBars('水绕旧桥晚灯归岸', ['E4.4 G4.4 E4.4 D4.4', 'G4.4 F4.4 D4.4 C4.4']);
const beforePostlude = String.raw`\section ("末句") ${finalSong} | \section ("后奏") r.1 | r.1`;
const underFinalWords = '(C3 E3 G3).1 | (G2 B2 D3 F3).2 (C3 E3 G3).2 | ';

mountSongVariants('song-postlude-design', {
  cadence: {
    tempo: 78,
    notes: accompanied(beforePostlude, underFinalWords + 'C3.4 E3.4 G3.4 C4.4 | (C3 E3 G3).1'),
    summary: '伴奏以主和弦分解与最后的主和弦延长已经成立的终止。'
  },
  recall: {
    tempo: 78,
    notes: accompanied(beforePostlude, underFinalWords + 'E3.4 G3.4 E3.4 D3.4 | (C3 E3 G3).1'),
    summary: '伴奏将较早的“水绕旧桥”移低八度奏出，使结束与开头相连。'
  },
  extend: {
    tempo: 78,
    notes: accompanied(beforePostlude + ' | r.1', underFinalWords + 'E3.8 G3.8 E3.8 D3.8 F3.8 A3.8 F3.8 E3.8 | G3.8 B3.8 D4.4 F4.4 (G2 B2 D3 F3).4 | (C3 E3 G3).1'),
    summary: '把开头的轮廓收紧、抬高，音区到 F4 后才回到主和弦，形成一段简短的器乐展开。'
  }
});

const call = lyricBars('啊望', ['G4.4/sing/open A4.4/held G4.2/held/open', 'E4.1']).replace(' | ', String.raw` | \tempo 46 `);
const body = lyricBars('风过小桥灯影摇动岸边初静你且慢行', [
  'G4.4 A4.4 G4.4 E4.4', 'E4.4 D4.4 E4.4 G4.4', 'F4.4 A4.4 G4.4 F4.4', 'E4.4 F4.4 D4.4 C4.4'
]);
const echo = lyricBars('啊', ['G4.4/sing/close A4.4/held G4.2/held', 'E4.4/held D4.4/held C4.2/held/close']);

mountFormAnalysis(document.getElementById('song-vocal-framing'), {
  score: {
    tempo: 76,
    notes: accompanied(String.raw`\tempo 60 \section ("人声引子") ${call} | \tempo 76 \section ("定拍") r.1 | \section ("主体") ${body} | \section ("人声尾声") ${echo}`, [
      '(C3 E3 G3).1', '(C3 E3 G3).1', 'G2.4 D3.4 F3.4 G3.4', '(C3 E3 G3).1', '(C3 E3 G3).1',
      '(F3 A3 C4).1', '(G2 B2 D3 F3).2 (C3 E3 G3).2', '(C3 E3 G3).1', '(G2 B2 D3 F3).2 (C3 E3 G3).2'
    ].join(' | '))
  },
  sections: [
    { id: 'call', label: '人声引子', first: 1, last: 2, material: '持续和弦托住“啊”的回转，第二小节进一步放宽速度' },
    { id: 'pulse', label: '伴奏定拍', first: 3, last: 3, material: '人声换气，钢琴用四个等长的音建立主体的拍速' },
    { id: 'song', label: '主体', first: 4, last: 7, material: '人声落在钢琴建立的第一个新强拍上，末句收向主音 C' },
    { id: 'echo', label: '人声尾声', first: 8, last: 9, material: '引子的衬词与回转重现，接着沿较低的音收束' }
  ]
});
