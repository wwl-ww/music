import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const odeOpening = 'F#4.4 F#4.4 G4.4 A4.4 | A4.4 G4.4 F#4.4 E4.4 | D4.4 D4.4 E4.4 F#4.4';
const odeClosing = 'E4.4 { d } D4.8 D4.2';

mountFormAnalysis(document.querySelector('#binary-ode-to-joy'), {
  score: {
    tempo: 100,
    notes: String.raw`
      \ks D \ts (4 4)
      \section ("A 上句") ${odeOpening} | F#4.4 { d } E4.8 E4.2 |
      \section ("A 下句") ${odeOpening} | \barlineright (lightlight) ${odeClosing} |
      \section ("B 中间句") E4.4 E4.4 F#4.4 D4.4 | E4.4 F#4.8 G4.8 F#4.4 D4.4 |
      E4.4 F#4.8 G4.8 F#4.4 E4.4 | D4.4 E4.4 A3.4 F#4.4 |
      \section ("B 再现句") F#4{t}.4 F#4.4 G4.4 A4.4 | A4.4 G4.4 F#4.4 E4.4 |
      D4.4 D4.4 E4.4 F#4.4 | ${odeClosing}
    `
  },
  sections: [
    { id: 'ode-opening', label: 'A 上句', first: 1, last: 4, material: '呈示主要旋律', role: '第 4 小节停在第 Ⅱ 级音 E，保留继续的余地' },
    { id: 'ode-answer', label: 'A 下句', first: 5, last: 8, material: '重复题头，改写句尾', role: '第 8 小节落主音 D，结束第一段' },
    { id: 'ode-middle', label: 'B 中间句', first: 9, last: 12, material: '加入八分音符，乐句分成 1＋1＋2', role: '第 12 小节把 F♯ 提前引出，与再现句相连' },
    { id: 'ode-return', label: 'B 再现句', first: 13, last: 16, material: '重现 A 的下句', role: '跨小节的延音线把句首同前句接合，最后仍落主音 D' }
  ]
});

const firstPartUpper = String.raw`
  \section ("A 呈示") E4.8 F4.8 G4.4 E4.4 C4.4 | D4.4 E4.4 F4.2 |
  E4.8 F4.8 G4.4 E4.4 C4.4 | \barlineright (lightlight) D4.4 B3.4 C4.2
`;
const firstPartLower = String.raw`
  C3.1 | (G2 B2 D3).1 | C3.1 | \barlineright (lightlight) (G2 B2 D3).2 (C3 E3 G3).2
`;
const secondPartUpper = String.raw`
  \section ("B 继续") A4.4 G4.8 A4.8 C5.4 A4.4 | B4.4 A4.8 B4.8 D5.4 B4.4
`;
const secondPartLower = '(F3 A3).1 | (G3 B3 D4).1';

function binaryNotation(endingUpper, endingLower) {
  return String.raw`
    \ks C \ts (4 4)
    ${firstPartUpper} | ${secondPartUpper} | ${endingUpper} ||
    \staff { score } \tuning (none) \clef F4
    ${firstPartLower} | ${secondPartLower} | ${endingLower}
  `;
}

mountScoreWritingSteps(document.querySelector('#binary-return-variants'), {
  score: { tempo: 108 },
  steps: [
    {
      label: '完整再现',
      notes: binaryNotation(
        String.raw`\section ("再现") E4.8 F4.8 G4.4 E4.4 C4.4 | D4.4 B3.4 C4.2`,
        'C3.1 | (G2 B2 D3).2 (C3 E3 G3).2'
      ),
      description: '第 7–8 小节重现第一段的下句。开头的短短长音型回来，随后在主调收束。',
      highlights: [{ staff: 1, bar: 3, beat: 1 }, { staff: 1, bar: 7, beat: 1 }]
    },
    {
      label: '局部再现',
      notes: binaryNotation(
        String.raw`\section ("局部再现") E4.8 F4.8 G4.4 E4.4 C4.4 | D5.8 C5.8 B4.8 A4.8 G4.8 F4.8 E4.8 C4.8`,
        'C3.4 E3.8 G3.8 C4.4 G3.4 | (G2 B2 D3).2 (C3 E3 G3).2'
      ),
      description: '第 7 小节恢复第一段题头，伴奏保持较活跃的运动。第 8 小节另写快速下行的收束，只有题头回归。',
      highlights: [{ staff: 1, bar: 3, beat: 1 }, { staff: 1, bar: 7, beat: 1 }]
    },
    {
      label: '不带再现',
      notes: binaryNotation(
        String.raw`\section ("继续至终止") C5.4 B4.8 A4.8 G4.4 F4.4 | D4.4 G4.4 C5.2`,
        '(F3 A3).1 | (G2 B2 D3).2 (C3 E3 G3).2'
      ),
      description: '第 7–8 小节延续第二段的进行，形成新的收尾。结尾同样回到 C 大调。',
      highlights: [{ staff: 1, bar: 7, beat: 1 }]
    }
  ]
});

const verseMelody = 'E4.4 F4.4 G4.4 E4.4 | F4.4 D4.4 C4.2';
const sungParts = {
  verseOne: { label: 'A₁', notes: verseMelody },
  verseTwo: { label: 'A₂', notes: verseMelody },
  refrain: { label: 'B', notes: 'G4.4 G4.4 C5.4 G4.4 | E4.4 G4.4 C5.2' }
};

function songRoute(...order) {
  const route = order.map(part => {
    const { label, notes } = sungParts[part];
    return String.raw`\section ("${label}") ${notes}`;
  }).join(' | ');
  return String.raw`\ks C \ts (4 4) ${route}`;
}

mountScoreWritingSteps(document.querySelector('#binary-verse-refrain'), {
  score: { tempo: 118 },
  steps: [
    {
      label: '分节歌开头',
      notes: songRoute('verseOne', 'refrain', 'verseTwo', 'refrain'),
      description: 'A₁ → B → A₂ → B。每次回来的是同一个 B，A₁ 与 A₂ 表示同旋律的两节不同歌词。'
    },
    {
      label: '叠歌开头',
      notes: songRoute('refrain', 'verseOne', 'refrain', 'verseTwo', 'refrain'),
      description: 'B → A₁ → B → A₂ → B。B 仍是歌词固定的叠歌，并在最后回来。'
    }
  ]
});
