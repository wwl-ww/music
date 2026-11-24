import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { lyricBars, mountSongVariants } from './songwriting-score.js';
import { bridgeMelodies as melody, bridgePhrase, bridgeScore, bridgeVerses as verses, labelPhrase } from './songwriting-phrase-material.js';

const phrase = (index, notes) => bridgePhrase(verses[index], notes);
const opening = phrase(0, melody.opening);
const answer = phrase(1, melody.return);

mountSongVariants('song-two-phrase', {
  closed: {
    tempo: 84,
    notes: bridgeScore([labelPhrase('上句', opening), labelPhrase('下句', answer)]),
    summary: '下句重现上句开头，句尾从上句的属音 G 改为主音 C，形成收拢性的两句乐段。'
  },
  open: {
    tempo: 84,
    notes: bridgeScore([labelPhrase('上句', opening), labelPhrase('下句', phrase(1, [melody.return[0], 'G4 E4 D4']))]),
    summary: '下句在 D 上结束。旋律已经唱完这一段，但结尾仍留着向后承接的余地。'
  },
  octave: {
    tempo: 84,
    notes: bridgeScore([labelPhrase('上句', phrase(0, [melody.opening[0], 'A4 B4 C5'])), labelPhrase('下句', answer)]),
    summary: '上下句都落主音，上句落高音 C5，下句落低八度的 C4。音区下移与句尾走向造成不同的收束感。'
  },
  expanded: {
    tempo: 84,
    notes: bridgeScore([labelPhrase('上句', opening), labelPhrase('下句', lyricBars(verses[1] + '啊', [
      'C4.8 E4.8 G4.8 E4.8', 'G4.8 D4.8 G4.4', 'A4.4/sing/end G4.4/held', 'E4.8/held D4.8/held C4.4/held/end'
    ]))]),
    summary: '下句保留主题句开头，再用末尾衬词扩充，到第四小节才终止，形成 2＋4 的非方正两句。'
  }
});

const repetitions = [
  labelPhrase('第 1 次', opening), answer,
  labelPhrase('第 2 次', phrase(2, melody.opening)), phrase(3, [melody.return[0], 'A4 G4 C4']),
  labelPhrase('第 3 次', phrase(4, melody.opening)), phrase(5, [melody.return[0], 'G4 E4 D4']),
  labelPhrase('变化结束', phrase(6, ['G4 A4 C5 A4', 'C5 D5 E5'])), phrase(7, melody.close)
];

mountFormAnalysis(document.getElementById('song-repeated-phrase'), {
  score: { tempo: 82, notes: bridgeScore(repetitions) },
  sections: [
    { id: 'first', label: '第 1 次', first: 1, last: 4, material: '两句原型建立短短长的句尾，第二句落在 C' },
    { id: 'second', label: '第 2 次', first: 5, last: 8, material: '换词后保留句头，只调整第二句的收束走向' },
    { id: 'third', label: '第 3 次', first: 9, last: 12, material: '句头仍相同，第二句的落音改为 D，悬而未决' },
    { id: 'closing', label: '变化结束', first: 13, last: 16, material: '抬高音区至 E5，再下行回到 C' }
  ]
});

const second = phrase(1, melody.continuation);
const turn = phrase(2, melody.turn);
const fourthClosed = lyricBars(verses[3], ['G4.8 F4.8 E4.8 D4.8', 'E4.8 D4.8 C4.8 r.8']);
const fourthOpen = phrase(3, [melody.close[0], 'E4 D4 G4']);
const sixthClosed = phrase(5, melody.return);
const compactMiddle = lyricBars(verses[2] + verses[3], [
  'G4.16 G4.16 A4.16 G4.16 A4.16 C5.16 B4.8',
  'A4.16 G4.16 A4.16 F4.16 G4.16 E4.16 D4.8'
]);
const counted = phrases => bridgeScore(phrases.map((notes, i) => labelPhrase(String(i + 1), notes)));
const fifth = phrase(4, melody.lift);
function sixPhrases(fourth, cadence) {
  return String.raw`${counted([opening, second, turn, fourth, fifth, sixthClosed])}
    || \staff { score } \tuning (none) \clef F4
    (C3 E3 G3).2 | (C3 E3 G3).2 | (A2 C3 E3).2 | (G2 B2 D3).2 |
    (C3 E3 G3).2 | (F3 A3 C4).2 | (C3 E3 G3).2 | ${cadence} |
    (C3 E3 G3).4 (F3 A3 C4).4 | (G2 B2 D3).2 | (C3 E3 G3).2 | (G2 B2 D3 F3).4 (C3 E3 G3).4`;
}

mountSongVariants('song-phrase-count', {
  five: {
    tempo: 78,
    notes: counted([opening, second, compactMiddle, fifth, sixthClosed]),
    summary: '第三、四句歌词缩进同一句曲，口吻加快。第四句曲抬到高区，第五句曲回落收束。六句词写成五句曲。'
  },
  grouped: {
    tempo: 86,
    notes: sixPhrases(fourthClosed, '(G2 B2 D3 F3).4 (C3 E3 G3).4'),
    summary: '第 4 句在 G7–C 上落到 C4，随后换气。第 5 句另从 C5 起唱，第 6 句再次终止，前四句和末两句可听成两个结构单位。'
  },
  unfolding: {
    tempo: 86,
    notes: sixPhrases(fourthOpen, '(G2 B2 D3 F3).2'),
    summary: '第 4 句停在属七和弦上的 G4，没有留休止。第 5 句用相同的 C5 题头接着推进，第 6 句才在 G7–C 上完成全段终止。'
  }
});

const chainContours = [
  ['C4 E4 E4', 'G4 F4 E4 D4'],
  ['D4 F4 F4', 'A4 G4 F4 E4'],
  ['E4 G4 G4', 'B4 A4 G4 F4'],
  ['F4 A4 A4', 'C5 B4 A4 G4'],
  ['G4 B4 B4', 'D5 C5 B4 A4'],
  ['A4 C5 C5', 'E5 D5 C5 B4'],
  ['G4 B4 B4', 'D5 C5 B4 A4'],
  ['D4 F4 F4', 'G4 E4 D4 C4']
];
const chain = chainContours.map(([head, ending], index) => {
  const firstBar = ['r.8', ...head.split(' ').map(pitch => `${pitch}.8`)].join(' ');
  const lastBar = ending.split(' ').map(pitch => `${pitch}.8`).join(' ');
  return labelPhrase(String(index + 1), lyricBars(verses[index], [firstBar, lastBar]));
});

mountFormAnalysis(document.getElementById('song-many-phrases'), {
  score: { tempo: 94, notes: bridgeScore(chain) },
  sections: [
    { id: 'opening', label: '1–2 句 · 建立音型', first: 1, last: 4, material: '八分休止后的句头与等节奏尾部建立了贯穿全段的律动' },
    { id: 'bridge', label: '3–4 句 · 继续推进', first: 5, last: 8, material: '音型逐级抬升，第 4 句停在 G，音乐继续向前' },
    { id: 'climax', label: '5–6 句 · 高潮', first: 9, last: 12, material: '同样的句头继续抬高，第 6 句抵达 E5' },
    { id: 'close', label: '7–8 句 · 回顾与收束', first: 13, last: 16, material: '第 7 句重现第 5 句音调，第 8 句落在主音 C' }
  ]
});
