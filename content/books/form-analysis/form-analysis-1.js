import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';

const openingUpper = 'E4.8 F4.8 G4.4 C5.4 G4.4 | F4.4 E4.4 D4.2 | E4.8 F4.8 G4.4 E4.4 C4.4';
const openingLower = 'C3.2 G3.2 | F3.4 E3.4 G2.2 | C3.2 E3.2';

mountFormAnalysis(document.querySelector('#form-opening-return'), {
  score: {
    tempo: 104,
    notes: String.raw`
      \ks C \ts (4 4)
      \section ("A") ${openingUpper} | \barlineright (lightlight) E4.4 F4.4 G4.2 |
      \section ("B") B4.4 A4.4 G#4.4 A4.4 | C5.2 B4.4 A4.4 | D5.4 C5.4 B4.4 A4.4 |
      \barlineright (lightlight) C5.4 B4.4 A4.2 |
      \section ("A′") ${openingUpper} | F4.4 D4.4 C4.2 ||
      \staff { score } \tuning (none) \clef F4
      ${openingLower} | \barlineright (lightlight) C3.4 D3.4 (G2 B2 D3).2 |
      A2.4 C3.4 (E2 G#2).4 (A2 C3).4 | (A2 E3).2 (E3 G#3).4 (A2 C3).4 |
      (D3 F3).2 (E3 G#3).4 (A2 E3).4 | \barlineright (lightlight) (A2 E3).4 (E2 G#2).4 (A2 C3 E3).2 |
      ${openingLower} | (F3 A3).4 (G2 B2 F3).4 (C3 E3 G3).2
    `
  },
  sections: [
    { id: 'opening', label: 'A 呈示', first: 1, last: 4, material: '短短长的题头建立主要材料', key: 'C 大调', role: '第 4 小节在属和弦上形成半终止' },
    { id: 'contrast', label: 'B 对比', first: 5, last: 8, material: '节奏改为较均匀的四分音符', key: 'a 小调', role: '第 8 小节在 a 小调的属、主和弦进行中收束' },
    { id: 'return', label: 'A′ 回归', first: 9, last: 12, material: '开头三小节原样回来', key: '回到 C 大调', role: '第 12 小节以属和弦到主和弦完成全曲' }
  ]
});
