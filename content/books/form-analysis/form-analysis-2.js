import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';

const phraseUpper = 'G4.8 A4.8 C5.4 | B4.4 G4.4 | A4.8 G4.8 F4.4';
const phraseLower = 'C3.4 (E3 G3 C4).4 | (E3 G3 B3).4 (E3 G3 B3).4 | (F3 A3 C4).4 (D3 F3 A3).4';

mountFormAnalysis(document.querySelector('#period-structure-demo'), {
  score: {
    tempo: 86,
    onScoreLoaded(score) {
      score.tracks[0].addLineBreaks(4);
    },
    notes: String.raw`
      \ks C \ts (2 4)
      \section ("上句") ${phraseUpper} | \barlineright (lightlight) F4.8 E4.8 D4.4 |
      \section ("下句") ${phraseUpper} | D4.4 C4.4 ||
      \staff { score } \tuning (none) \clef F4
      ${phraseLower} | \barlineright (lightlight) (F3 A3).4 (G2 B2 D3).4 |
      ${phraseLower} | (G2 B2 F3).4 (C3 E3 G3).4
    `
  },
  wholeLabel: '全段',
  sections: [
    { id: 'antecedent', label: '上句', first: 1, last: 4, material: '两个两小节乐节', role: '第 4 小节停在属和弦，形成半终止' },
    { id: 'consequent', label: '下句', first: 5, last: 8, material: '前 3 小节保留上句材料，改写句尾', role: '第 8 小节解决到原位主和弦，旋律落主音' }
  ]
});
