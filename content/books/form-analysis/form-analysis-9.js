import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';

const outerUpper = String.raw`
  C4.4 E4.4 G4.4 | C5.2 G4.4 | A4.4 F4.4 A4.4 | G4.2 r.4 |
  G4.4 B4.4 D5.4 | C5.4 A4.4 C5.4 | B4.4 A4.4 F#4.4 | \barlineright (lightlight) G4.2 r.4 |
  E4.4 G4.4 C5.4 | B4.4 A4.4 G4.4 | F4.4 D4.4 F4.4 | G4.2 r.4 |
  C5.4 G4.4 E4.4 | F4.4 A4.4 C5.4 | A4.4 F4.4 D4.4 | \barlineright (lightlight) C4.2 r.4
`;

const outerLower = String.raw`
  C3.4 E3.4 G3.4 | (C3 E3).2 G3.4 | F3.4 A3.4 C4.4 | (G2 B2 D3).2 r.4 |
  G3.4 B3.4 D4.4 | (E3 A3).2 A3.4 | D3.2 (D3 F#3 A3 C4).4 | \barlineright (lightlight) (G2 B2 D3).2 r.4 |
  E3.4 G3.4 C4.4 | (D3 F3 B3).2 G3.4 | (D3 F3 A3).2 D3.4 | (G2 B2 D3).2 r.4 |
  C3.4 E3.4 G3.4 | F3.4 A3.4 C4.4 | D3.4 F3.4 (G2 B2 D3).4 | \barlineright (lightlight) (C3 E3 G3).2 r.4
`;

const middleUpper = String.raw`
  \ks Cminor Eb4.8 D4.8 C4.8 D4.8 Eb4.8 G4.8 |
  F4.8 G4.8 Ab4.8 G4.8 F4.8 Eb4.8 |
  D4.8 Eb4.8 F4.8 Eb4.8 D4.8 C4.8 | B3.2 r.4 |
  Eb4.8 D4.8 C4.8 D4.8 Eb4.8 G4.8 |
  Ab4.8 G4.8 F4.8 Eb4.8 D4.8 C4.8 |
  F4.8 Eb4.8 D4.8 C4.8 B3.8 D4.8 | \barlineright (lightlight) C4.2 r.4
`;

const middleLower = String.raw`
  \ks Cminor C3.2 G3.4 | F3.2 C3.4 | (D3 F3 Ab3).2 F3.4 | (G2 B2 D3).2 r.4 |
  C3.2 G3.4 | F3.2 (F3 Ab3 C4).4 | (F3 Ab3).2 (G2 B2 D3).4 | \barlineright (lightlight) (C3 Eb3 G3).2 r.4
`;

mountFormAnalysis(document.querySelector('#compound-ternary-score'), {
  score: {
    tempo: 128,
    notes: String.raw`\ts (3 4) \ks C
      ${outerUpper} | ${middleUpper} | \ks C ${outerUpper} ||
      \staff { score } \tuning (none) \clef F4
      ${outerLower} | ${middleLower} | \ks C ${outerLower}`
  },
  sections: [
    { id: 'a-start', label: 'A · a 段', first: 1, last: 8, material: '两句先陈述主题，随后展开并终止在 G 大调', role: '是第一乐部内部的前段' },
    { id: 'a-close', label: 'A · b 段', first: 9, last: 16, material: '延续首部的舞曲音型，最后在 C 大调完全终止', role: '和前八小节合成二段结构 A' },
    { id: 'minore', label: 'B · 三声中部', first: 17, last: 24, material: '同主音 c 小调，新旋律用连续八分音符', role: '中部只有一个两句乐段，仍与两个外部并列' },
    { id: 'return-start', label: 'A 再现 · a 段', first: 25, last: 32, material: 'C 大调和首部材料同时回来', role: '从 a 段开始重现整个第一乐部' },
    { id: 'return-close', label: 'A 再现 · b 段', first: 33, last: 40, material: 'b 段也原样返回，最后回到 C 大调主和弦', role: '回归范围是完整的乐部' }
  ]
});
