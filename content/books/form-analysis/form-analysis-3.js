import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const opening = {
  upper: '\\section ("上句") E4.8 F4.8 G4.4 E4.4 C4.4 | D4.4 E4.4 G4.2 | A4.4 G4.4 E4.4 F4.4 | \\barlineright (lightlight) D4.4 E4.4 D4.2',
  lower: 'C3.1 | F3.4 C3.2 G3.4 | F3.2 C3.4 F3.4 | \\barlineright (lightlight) (G2 B2 D3).1'
};
const closingUpper = 'A4.4 G4.4 E4.4 F4.4 | D4.4 B3.4 C4.2';
const closingLower = 'F3.2 C3.4 F3.4 | (G2 B2 D3).2 (C3 E3).2';
const repeatedUpper = 'E4.8 F4.8 G4.4 E4.4 C4.4 | D4.4 E4.4 G4.2';
const repeatedLower = 'C3.1 | F3.4 C3.2 G3.4';

function periodNotation(upperAnswer, lowerAnswer) {
  return String.raw`
    \ks C \ts (4 4)
    ${opening.upper} | \section ("下句") ${upperAnswer} ||
    \staff { score } \tuning (none) \clef F4
    ${opening.lower} | ${lowerAnswer}
  `;
}

const tempo = 106;
const closedPeriod = periodNotation(
  `${repeatedUpper} | ${closingUpper}`,
  `${repeatedLower} | ${closingLower}`
);

mountScoreWritingSteps(document.querySelector('#period-statement-types'), {
  score: { tempo },
  steps: [
    {
      label: '重复型',
      notes: closedPeriod,
      description: '第 5 小节回到上句的短短长题头，第 8 小节改用主和弦收束。',
      highlights: [{ staff: 1, bar: 1, beat: 1 }, { staff: 1, bar: 5, beat: 1 }]
    },
    {
      label: '延伸型',
      notes: periodNotation(
        'D4.4 E4.4 D4.2 | F4.4 E4.4 D4.4 C4.4 | B3.4 C4.4 F4.4 E4.4 | D4.4 B3.4 C4.2',
        '(G2 B2 D3).1 | F3.2 F3.4 C3.4 | G2.4 C3.4 F3.4 C3.4 | (G2 B2 D3).2 (C3 E3).2'
      ),
      description: '第 5 小节接续上句最后一小节的音型，再从它发展至主调终止。',
      highlights: [{ staff: 1, bar: 4, beat: 1 }, { staff: 1, bar: 5, beat: 1 }]
    },
    {
      label: '对比型',
      notes: periodNotation(
        'C5.2 A4.2 | B4.4 G4.4 D5.2 | C5.2 A4.4 F4.4 | D4.4 B3.4 C4.2',
        'F3.1 | (G3 B3).1 | F3.1 | (G2 B2 D3).2 (C3 E3).2'
      ),
      description: '第 5 小节进入更高的音区，以二分音符的跳进替换上句句首的短音。',
      highlights: [{ staff: 1, bar: 5, beat: 1 }, { staff: 1, bar: 5, beat: 2 }]
    }
  ]
});

const toGUpper = 'E4.8 F4.8 G4.4 E4.4 C4.4 | G4.4 B4.4 A4.4 G4.4 | E4.4 G4.4 A4.4 F#4.4 | G4.2';
const toGLower = 'C3.1 | (E3 G3 B3).1 | (C3 E3 G3).2 (D3 F#3 A3 C4).2 | (G2 B2 D3).2';
const toGHighlights = [{ staff: 2, bar: 7, beat: 2 }, { staff: 2, bar: 8, beat: 1 }, { staff: 2, bar: 8, beat: 2 }];

mountScoreWritingSteps(document.querySelector('#period-ending-types'), {
  score: { tempo },
  steps: [
    {
      label: '收拢性乐段',
      notes: periodNotation(`${toGUpper} C4.2`, `${toGLower} (C3 E3 G3).2`),
      description: 'D⁷ 暂时引向 G。第 8 小节还有 G → C，G 承担原调的属功能，旋律与低音回 C。',
      highlights: toGHighlights
    },
    {
      label: '开放性乐段',
      notes: periodNotation(
        `${repeatedUpper} | A4.4 G4.4 F4.2 | D4.4 E4.4 G4.2`,
        `${repeatedLower} | (F3 A3).1 | (G2 B2 D3).1`
      ),
      description: '下句仍在 C 大调。第 8 小节停在属和弦 G，留下继续的要求。',
      highlights: [{ staff: 2, bar: 8, beat: 1 }]
    },
    {
      label: '转调乐段',
      notes: periodNotation(`${toGUpper} G4.2`, `${toGLower} (G2 B2 D3).2`),
      description: '同一个 D⁷ → G 现在是句末的属到主。第 8 小节继续保持 G 和弦，G 成为新调的结束中心。',
      highlights: toGHighlights
    }
  ]
});

mountFormAnalysis(document.querySelector('#period-expansion-analysis'), {
  score: {
    tempo,
    notes: periodNotation(
      String.raw`${repeatedUpper} | \section ("扩充") F4.8 G4.8 A4.4 F4.4 D4.4 | G4.8 A4.8 B4.4 C5.2 |
        ${closingUpper} | \section ("补充") C4.2 B3.2 | (C4 E4).1`,
      `${repeatedLower} | D3.2 F3.2 | E3.2 (F3 A3).2 | ${closingLower} | (F3 A3).2 (G2 D3).2 | (C3 G3).1`
    )
  },
  sections: [
    { id: 'first-phrase', label: '上句', first: 1, last: 4, role: '四小节呈示材料，在 C 大调属和弦上停顿' },
    { id: 'expanded-answer', label: '下句', first: 5, last: 10, material: '第 7、8 小节在完整终止前用模进推高题头', role: '第 8 小节达到音区高点，第 10 小节完成主调终止' },
    { id: 'closing-addition', label: '补充', first: 11, last: 12, role: '第一次主调终止已经完成，补充两小节再次确认主和弦' }
  ]
});

const eighthOpening = 'E4.8 F4.8 G4.8 C5.8 | B4.8 A4.8 G4.8 E4.8 | F4.8 G4.8 A4.8 C5.8 | B4.8 A4.8 G4.8 D4.8';
const eighthOpeningBass = 'C3.2 | (E3 G3).2 | (F3 A3).2 | (G2 B2 D3).2';

mountFormAnalysis(document.querySelector('#period-continuous-eighths'), {
  score: {
    tempo,
    notes: String.raw`\ks C \ts (2 4)
      ${eighthOpening} |
      E4.8 F4.8 G4.8 B4.8 | A4.8 G4.8 F4.8 D4.8 | E4.8 F4.8 G4.8 A4.8 | G4.8 D4.8 G4.8 B4.8 |
      ${eighthOpening} |
      C5.8 D5.8 E5.8 G5.8 | B4.8 C5.8 D5.8 F5.8 | A4.8 B4.8 C5.8 E5.8 | G4.8 A4.8 B4.8 D5.8 |
      F4.8 G4.8 A4.8 C5.8 | B4.8 A4.8 G4.8 F4.8 | E4.8 F4.8 G4.8 D4.8 | D4.8 B3.8 C4.8 C4.8 ||
      \staff { score } \tuning (none) \clef F4
      ${eighthOpeningBass} | C3.2 | (D3 F3).2 | (F3 A3).2 | (G2 B2 D3).2 |
      ${eighthOpeningBass} | C3.2 | (G2 B2 D3).2 | (A2 C3 E3).2 | (G2 B2 D3).2 |
      (F3 A3).2 | (G2 B2 F3).2 | C3.4 (G2 D3).4 | (G2 B2 D3).4 (C3 E3 G3).4`
  },
  sections: [
    { id: 'first-phrase', label: '上句', first: 1, last: 8, role: '第 8 小节停在属和弦，旋律落在导音 B' },
    { id: 'return', label: '下句句首', first: 9, last: 12, material: '原样重提第 1–4 小节，分句清楚，八分音符持续不断' },
    { id: 'extension', label: '下句扩充', first: 13, last: 16, material: '上行音型在逐渐降低的位置作三次模进' },
    { id: 'cadence', label: '下句末尾', first: 17, last: 20, role: '旋律在第 20 小节落 C，低音同时由属走向主' }
  ]
});
