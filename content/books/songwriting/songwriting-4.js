import { lyricBars, mountSongVariants } from './songwriting-score.js';
import { bridgeMelodies as melody, bridgePhrase, bridgeScore, bridgeVerses as verses, labelPhrase } from './songwriting-phrase-material.js';

const opening = bridgePhrase(verses[0], melody.opening);
const continuation = bridgePhrase(verses[1], melody.continuation);
const turn = bridgePhrase(verses[2], melody.turn);
const closing = bridgePhrase(verses[3], melody.close);
const reprise = bridgePhrase(verses[2], melody.opening);
const answer = bridgePhrase(verses[3], [melody.continuation[0], 'F4 E4 C4']);

mountSongVariants('song-phrase-grouping', {
  four: {
    tempo: 86,
    notes: bridgeScore([labelPhrase('a 起', opening), labelPhrase('b 承', continuation), labelPhrase('c 转', turn), labelPhrase('d 合', closing)]),
    summary: '第 3 句抬高音区、落在 A，第 4 句回到中区并落到 C。四句各两小节，末句承担整段的收束。'
  },
  period: {
    tempo: 86,
    notes: bridgeScore([labelPhrase('a 一大句', opening), continuation, labelPhrase('a 二大句', reprise), answer]),
    summary: '第 3 分句原样重现第 1 分句的旋律。第 2 分句停在 D，第 4 分句只把句尾改为 C，形成较弱与较强的两次收束。'
  }
});

const preCadence = lyricBars(verses[3] + '啊', [
  'G4.8 F4.8 E4.8 D4.8', 'E4.8 D4.8 C4.4',
  'A4.4/sing/extension G4.4/held', 'E4.8/held D4.8/held C4.4/held/extension'
]);
const afterCadence = lyricBars('入烟霄', ['G4.4 E4.4', 'C4.2']);
const cadence = '(G2 B2 D3 F3).4 (C3 E3 G3).4';
function expansionScore(phrases, ending) {
  return String.raw`${bridgeScore([opening, continuation, turn, ...phrases])} ||
    \staff { score } \tuning (none) \clef F4
    (C3 E3 G3).2 | (C3 E3 G3).2 | (A2 C3 E3).2 | (G2 B2 D3).2 |
    (C3 E3 G3).2 | (F3 A3 C4).2 | (C3 E3 G3).2 | ${ending}`;
}

mountSongVariants('song-phrase-expansion', {
  square: {
    tempo: 86,
    notes: expansionScore([labelPhrase('第 4 句', closing)], cadence),
    summary: '第 4 句保留两小节，第二小节上的 C 是本段终止。全段为 2＋2＋2＋2。'
  },
  expansion: {
    tempo: 86,
    notes: expansionScore([labelPhrase('第 4 句 · 扩充', preCadence)],
      '(G2 B2 D3 F3).4 (G2 D3 F3).4 | (F3 A3 C4).2 | ' + cadence),
    summary: '第 8 小节仍唱到 C，低音却留在 G。拖腔接着发展，到第 10 小节才由 G7–C 完成终止，延长发生在句内。'
  },
  supplement: {
    tempo: 86,
    notes: expansionScore([labelPhrase('第 4 句', closing), labelPhrase('补充', afterCadence)],
      cadence + ' | (C3 E3 G3).2 | (C3 E3 G3).2'),
    summary: '第 8 小节的 C 得到 G7–C 的和声支持，原来的终止仍在。后两小节重唱“入烟霄”，是收束后的补充。'
  }
});
