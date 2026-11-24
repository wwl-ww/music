import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';

function variationScore(key, upper, lower, tempo) {
  return {
    tempo,
    notes: String.raw`\ks ${key} \ts (3 4) ${upper} ||
      \staff { score } \tuning (none) \clef F4 ${lower}`
  };
}

const fixedBass = 'C3.2{d} | Ab2.2{d} | G2.2{d} | C3.2{d}';

mountFormAnalysis(document.querySelector('#ground-bass-variation-score'), {
  score: variationScore('Cminor', String.raw`
    \section ("T") r.2{d} | r.2{d} | r.2{d} | r.2{d} |
    \section ("V1") Eb4.4 G4.4 C5.4 | C5.4 Ab4.4 Eb4.4 | D4.4 B4.4 G4.4 | G4.4 Eb4.4 C5.4 |
    \section ("V2") Eb4.8 G4.8 C5.8 G4.8 Eb4.8 G4.8 | Eb4.8 Ab4.8 C5.8 Ab4.8 Eb4.8 Ab4.8 |
    G4.8 B4.8 D5.8 B4.8 G4.8 D5.8 | G4.8 C5.8 Eb5.8 C5.8 G4.8 C5.8
  `, String.raw`${fixedBass} | ${fixedBass} | ${fixedBass}`, 90),
  sections: [
    { id: 'theme', label: 'T 主题', first: 1, last: 4, material: '四小节低音单独陈述', role: '以属音回到主音形成收束' },
    { id: 'first', label: 'V₁ 疏', first: 5, last: 8, material: '加入分解和弦形成的四分音符上声部', role: '低音仍按原音高、原时值进入' },
    { id: 'second', label: 'V₂ 密', first: 9, last: 12, material: '上声部转为连续八分音符，展开每小节的和声音型', role: '低音、循环长度与前两轮一致' }
  ]
});

const chords = '(G4 B4 D5).2{d} | (G4 B4 E5).2{d} | (A4 C5 E5).4 (A4 C5 D5 F#5).2 | (G4 B4 D5).2{d}';

mountFormAnalysis(document.querySelector('#chaconne-harmony-score'), {
  score: variationScore('G', String.raw`
    \section ("T") ${chords} | \section ("V1") ${chords} | \section ("V2") ${chords}
  `, String.raw`
    G2.2{d} | E3.2{d} | A2.4 D3.2 | G2.2{d} |
    B2.4 D3.4 G3.4 | E3.4 E2.4 G2.4 | A2.4 F#2.4 D3.4 | G2.4 B2.4 G2.4 |
    G2.8 B2.8 D3.8 G3.8 D3.8 B2.8 | E2.8 G2.8 B2.8 E3.8 B2.8 G2.8 |
    A2.8 C3.8 D3.8 F#3.8 A3.8 C4.8 | G2.2{d}
  `, 100),
  sections: [
    { id: 'theme', label: 'T 和声', first: 1, last: 4, material: '以 I–vi–ii–V–I 为骨架', role: '下方多用根音，第三小节从 ii 转到 V' },
    { id: 'first', label: 'V₁ 转位', first: 5, last: 8, material: '开始的低音从 G 变成 B，加入转位和弦', role: '同样的和声及终止位置仍可辨认' },
    { id: 'second', label: 'V₂ 流动', first: 9, last: 12, material: '低音改用连续八分音符的分解和弦', role: '最后仍以 V–I 收束' }
  ]
});
