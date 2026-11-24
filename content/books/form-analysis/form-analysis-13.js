import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';

const exposition = String.raw`
  \ks C \ts (4 4)
  \section ("主部") C4.8 E4.8 G4.8 C5.8 G4.4 E4.4 | D4.4 F4.4 G4.2 |
  C4.8 E4.8 G4.8 C5.8 A4.4 F4.4 | \barlineright (lightlight) E4.4 D4.4 C4.2 |
  \section ("连接部") C4.8 E4.8 G4.8 C5.8 B4.4 A4.4 | F#4.8 A4.8 C5.8 D5.8 C5.4 A4.4 |
  G4.8 B4.8 D5.8 G5.8 E5.4 C5.4 | \barlineright (lightlight) A4.8 C5.8 A4.8 F#4.8 D4.2 |
  \section ("副部") D5.2 B4.4 A4.4 | G4.2 A4.2 | B4.4 D5.4 C5.4 B4.4 | A4.4 F#4.4 D4.2 |
  D5.2 B4.4 A4.4 | G4.2 B4.2 | C5.4 E5.4 D5.4 A4.4 | \barlineright (lightlight) B4.4 A4.4 G4.2 |
  \section ("结束部") D5.8 B4.8 G4.4 A4.4 G4.4 | F#4.4 A4.4 G4.2 |
  D5.8 B4.8 G4.4 C5.4 A4.4 | F#4.4 A4.4 G4.2 ||
  \staff { score } \tuning (none) \clef F4
  C3.2 E3.2 | (D3 F3).2 (G2 B2).2 | C3.2 (F3 A3).2 | \barlineright (lightlight) C3.4 (G2 B2 F3).4 (C3 E3 G3).2 |
  C3.2 (A2 E3).2 | (D3 F#3).2 (D3 F#3 A3).2 |
  (G2 B2 D3).2 (C3 E3).2 | \barlineright (lightlight) (D3 F#3 C4).1 |
  (G2 D3).2 (G2 B2).2 | (E3 G3).2 (D3 F#3).2 | (G2 B2).2 (C3 E3).2 | (D3 F#3 C4).1 |
  (G2 B2).2 (G2 D3).2 | (G2 B2 D3).2 (E3 G3).2 | (C3 E3).2 (D3 F#3 C4).2 |
  \barlineright (lightlight) (G2 B2).4 (D3 F#3 C4).4 (G2 B2 D3).2 |
  (G2 B2).2 (D3 F#3).4 (G2 B2).4 | (D3 F#3 C4).2 (G2 B2 D3).2 |
  (G2 B2).2 (D3 F#3 C4).2 | (D3 F#3 C4).2 (G2 B2 D3).2
`;

mountFormAnalysis(document.querySelector('#sonata-exposition-score'), {
  score: { tempo: 112, notes: exposition },
  sections: [
    { id: 'primary', label: '主部', first: 1, last: 4, material: '上行分解和弦的八分音符题头', key: 'C 大调', role: '在主调完全终止' },
    { id: 'transition', label: '连接部', first: 5, last: 8, material: '承接主部题头，连续换位', key: '由 C 大调转向 G 大调', role: '持续 D 属七和弦，为副部准备属功能' },
    { id: 'secondary', label: '副部', first: 9, last: 16, material: '以长音起句，组成两个四小节乐句', key: 'G 大调', role: '从前句的半终止走向后句的完全终止' },
    { id: 'closing', label: '结束部', first: 17, last: 20, material: '压缩并倒转主部的分解和弦形态，短乐节重复', key: '仍在 G 大调', role: '反复属到主，确认呈示部所到的调性' }
  ],
  wholeLabel: '全呈示部'
});
