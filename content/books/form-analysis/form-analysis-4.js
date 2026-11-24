import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScore } from '../../shared/formats/score.js';

function pianoScore(upper, lower, tempo) {
  return {
    tempo,
    notes: String.raw`\ks C \ts (4 4) ${upper} ||
      \staff { score } \tuning (none) \clef F4 ${lower}`
  };
}

const openingUpper = 'G4.4 E4.4 G4.4 C5.4 | A4.4 G4.4 F4.4 E4.4 | D4.8 E4.8 F4.4 A4.4 F4.4';
const openingLower = 'C3.2 E3.2 | F3.2 C3.2 | D3.2 F3.2';

mountFormAnalysis(document.querySelector('#three-phrase-period-score'), {
  score: pianoScore(String.raw`
    \section ("a") ${openingUpper} | E4.4 F4.4 G4.2 |
    \section ("a′") ${openingUpper} | F4.4 E4.4 D4.2 |
    \section ("b") E4.8 F4.8 G4.8 A4.8 G4.4 E4.4 | F4.8 G4.8 A4.8 B4.8 C5.4 A4.4 |
    D5.4 C5.4 B4.2 | A4.4 B4.4 C5.2
  `, String.raw`
    ${openingLower} | C3.4 (D3 F3 A3).4 (G2 B2 D3).2 |
    ${openingLower} | F3.4 C3.4 (G2 B2 D3).2 |
    C3.2 E3.2 | F3.2 (F3 A3).2 | D3.4 F3.4 (G2 D3).2 | (F3 A3).4 (G2 D3).4 (C3 E3 G3).2
  `, 100),
  sections: [
    { id: 'a', label: 'a 第一句', first: 1, last: 4, material: '交代题头', role: '停在属和弦' },
    { id: 'a2', label: 'a′ 第二句', first: 5, last: 8, material: '前三小节原样重复，仅改句尾', role: '仍停在属和弦' },
    { id: 'b', label: 'b 第三句', first: 9, last: 12, material: '延伸并加密节奏', role: '第 12 小节由属到主，结束全段' }
  ],
  wholeLabel: '全段'
});

const verseOpening = 'E4.4 G4.4 A4.4 G4.4';
const verseBass = 'C3.2 F3.4 C3.4';

mountFormAnalysis(document.querySelector('#four-phrase-period-score'), {
  score: pianoScore(String.raw`
    \section ("起") ${verseOpening} | E4.4 D4.4 E4.2 |
    \section ("承") ${verseOpening} | F4.4 E4.4 D4.2 |
    \section ("转") D5.8 C5.8 B4.8 C5.8 A4.4 F4.4 | E4.4 F4.4 D4.4 G4.4 |
    \section ("合") ${verseOpening} | F4.4 D4.4 C4.2
  `, String.raw`
    ${verseBass} | (C3 E3).4 (G2 B2).4 (C3 G3).2 |
    ${verseBass} | F3.4 C3.4 (G2 B2 D3).2 |
    (D3 F3).2 F3.2 | C3.4 D3.4 (G2 B2 D3).2 |
    ${verseBass} | (F3 A3).4 (G2 B2 F3).4 (C3 E3 G3).2
  `, 92),
  sections: [
    { id: 'present', label: '起', first: 1, last: 2, material: '呈示题头', role: '旋律停在主和弦三音' },
    { id: 'continue', label: '承', first: 3, last: 4, material: '重复题头并改写后半', role: '属和弦留下期待' },
    { id: 'turn', label: '转', first: 5, last: 6, material: '音区抬高，加入连续八分音符', role: '与前两句形成对比' },
    { id: 'close', label: '合', first: 7, last: 8, material: '题头回来', role: '属和弦解决到主和弦，旋律落在主音' }
  ],
  wholeLabel: '全段'
});

const continuous = pianoScore(String.raw`
  C4.8 D4.8 E4.4 G4.8 E4.8 D4.4 | C4.8 D4.8 E4.4 G4.8 F4.8 E4.4 |
  E4.8 F4.8 G4.4 C5.8 A4.8 G4.4 | F4.8 G4.8 A4.4 D5.8 C5.8 B4.4 |
  G4.8 A4.8 B4.4 E5.8 D5.8 C5.4 | E5.8 D5.8 C5.8 B4.8 A4.8 G4.8 F4.8 E4.8 |
  D4.8 E4.8 F4.8 G4.8 A4.4 B4.4 | C5.1
`, String.raw`
  C3.1 | C3.1 | C3.1 | C3.1 |
  C3.1 | A2.2 C3.2 | (D3 F3).2 (G2 D3).2 | (C3 E3 G3).1
`, 104);

mountScore(document.querySelector('#continuous-period-score'), { ...continuous, notation: 'staff' });

const pairedOpeningUpper = `${openingUpper} | E4.4 F4.4 G4.2`;
const pairedOpeningLower = `${openingLower} | C3.4 (D3 F3 A3).4 (G2 B2 D3).2`;
const answerUpper = 'C5.4 A4.4 F4.4 A4.4 | B4.4 D5.4 A4.4 C5.4';
const answerLower = '(F3 A3).2 (F3 C4).2 | (G2 D3).2 (D3 F3).2';

mountFormAnalysis(document.querySelector('#compound-period-score'), {
  score: pianoScore(String.raw`
    \section ("A") ${pairedOpeningUpper} | ${answerUpper} | B4.4 C5.4 E5.4 F#5.4 |
    \barlineright (lightlight) G5.2 D5.4 B4.4 |
    \section ("A′") ${pairedOpeningUpper} | ${answerUpper} | C5.4 A4.4 F4.4 A4.4 | E4.4 D4.4 C4.2
  `, String.raw`
    ${pairedOpeningLower} | ${answerLower} | (G2 D3).2 (D3 F#3 C4).2 |
    \barlineright (lightlight) (G2 B2 D3).1 |
    ${pairedOpeningLower} | ${answerLower} | F3.2 (D3 F3).2 | (C3 E3).4 (G2 B2 F3).4 (C3 E3 G3).2
  `, 100),
  sections: [
    { id: 'antecedent-1', label: 'A · 上句', first: 1, last: 4, material: '建立主要材料', role: '在 C 大调形成半终止' },
    { id: 'consequent-1', label: 'A · 下句', first: 5, last: 8, material: '延伸上句材料', role: '由 D 属七和弦进入 G 大调终止' },
    { id: 'antecedent-2', label: 'A′ · 上句', first: 9, last: 12, material: '原样重复前乐段上句', role: '回到 C 大调，仍作半终止' },
    { id: 'consequent-2', label: 'A′ · 下句', first: 13, last: 16, material: '重复前乐段下句的开头，再调整句尾', role: '在 C 大调完全终止' }
  ],
  wholeLabel: '全段'
});
