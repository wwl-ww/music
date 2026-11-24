import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';

function pianoScore(upper, lower) {
  return {
    tempo: 96,
    notes: String.raw`\ks C \ts (4 4) ${upper} ||
      \staff { score } \tuning (none) \clef F4 ${lower}`
  };
}

const openingUpper = 'G4.8 A4.8 C5.4 G4.4 E4.4 | F4.4 E4.4 D4.2 | G4.8 A4.8 C5.4 A4.4 F4.4';
const openingLower = 'C3.2 E3.2 | (F3 A3).4 C3.4 (G2 B2).2 | C3.2 (F3 A3).2';
const closingUpper = 'E4.4 D4.4 C4.2';
const closingLower = 'C3.4 (G2 B2 F3).4 (C3 E3 G3).2';
const outerUpper = String.raw`${openingUpper} | \barlineright (lightlight) ${closingUpper}`;
const outerLower = String.raw`${openingLower} | \barlineright (lightlight) ${closingLower}`;

mountFormAnalysis(document.querySelector('#developing-middle-score'), {
  score: pianoScore(String.raw`
    \section ("A") ${outerUpper} |
    \section ("B") E4.8 F#4.8 A4.4 E4.4 C4.4 | D4.8 E4.8 G4.4 D4.4 B3.4 |
    C4.8 D4.8 F4.4 C4.4 A3.4 | B3.8 C#4.8 E4.4 B3.4 G3.4 |
    A4.4 D5.4 B4.4 F4.4 | \barlineright (lightlight) G4.4 B4.4 D5.4 F5.4 |
    \section ("A′") G4.8 A4.8 C5.4 G4.8 F4.8 E4.4 | F4.8 G4.8 E4.4 D4.2 |
    G4.8 A4.8 C5.4 A4.8 G4.8 F4.4 | E4.8 F4.8 D4.4 C4.2
  `, String.raw`
    ${outerLower} |
    (D3 F#3).2 (D3 A3).2 | (G2 D3).2 E3.2 |
    (F3 A3).2 (F3 C4).2 | (E3 G3).2 E3.2 |
    D3.2 (G2 B2 F3).2 | \barlineright (lightlight) (G2 D3).2 (G2 B2 F3).2 |
    C3.4 G3.4 E3.4 C4.4 | F3.4 C3.4 (G2 B2).2 |
    C3.4 E3.4 F3.4 A3.4 | ${closingLower}
  `),
  sections: [
    { id: 'a', label: 'A 呈示', first: 1, last: 4, material: '两短一长的上行动机', key: 'C 大调', role: '落到主音' },
    { id: 'b', label: 'B 展开', first: 5, last: 10, material: '保留动机的节奏和音程关系，连续下移起音', role: '末两小节建立主调属功能，准备再现' },
    { id: 'reprise', label: 'A′ 再现', first: 11, last: 14, material: '首段的旋律轮廓回来，加入装饰音，低声部改用分解音型', key: '回到 C 大调', role: '保留首段的终止结构' }
  ]
});

mountFormAnalysis(document.querySelector('#contrasting-middle-score'), {
  score: pianoScore(String.raw`
    \section ("A") ${outerUpper} |
    \section ("B") A4.2 E4.4 G#4.4 | A4.2 C5.2 | B4.2 E5.4 D5.4 | \barlineright (lightlight) B4.4 G#4.4 A4.2 |
    \section ("A") ${openingUpper} | ${closingUpper}
  `, String.raw`
    ${outerLower} |
    (A2 C3 E3).2 (E2 G#2).2 | (A2 E3).2 (A2 C3).2 |
    (E2 B2).2 (E2 G#2).2 | \barlineright (lightlight) (E2 G#2 B2).2 (A2 C3 E3).2 |
    ${openingLower} | ${closingLower}
  `),
  sections: [
    { id: 'a', label: 'A 呈示', first: 1, last: 4, material: '上行的短短长动机', key: 'C 大调', role: '在主调收束' },
    { id: 'b', label: 'B 新主题', first: 5, last: 8, material: '长音起句，接下行跳进，新旋律自成乐段', key: 'a 小调', role: '在中段自己的主调形成终止' },
    { id: 'reprise', label: 'A 准确再现', first: 9, last: 12, material: '首段旋律、伴奏、时值和终止完整回来', key: '回到 C 大调', role: '保留首段的结构' }
  ]
});
