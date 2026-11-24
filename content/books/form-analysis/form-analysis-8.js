import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const opening = 'E4.8 G4.8 C5.4 G4.4 | A4.4 G4.4 E4.4';

function multiSectionScore(lastLabel, finalOpening, finalBass) {
  return String.raw`
    \ks C \ts (3 4)
    \section ("A") ${opening} | F4.4 D4.4 B3.4 | \barlineright (lightlight) C4.2 { d } |
    \section ("B") D5.2 B4.4 | A4.4 B4.4 D5.4 | C5.4 E5.4 F#5.4 | \barlineright (lightlight) G5.2 { d } |
    \section ("${lastLabel}") ${finalOpening} | A4.4 F4.4 D4.4 | C4.2 { d } ||
    \staff { score } \tuning (none) \clef F4
    C3.2 G3.4 | F3.4 E3.4 C3.4 | F3.4 (G2 B2 D3).2 | \barlineright (lightlight) (C3 E3 G3).2 { d } |
    (G2 B2 D3).2 { d } | D3.4 G3.4 B2.4 | (A2 C3 E3).2 (D3 F#3 C4).4 | \barlineright (lightlight) (G2 B2 D3).2 { d } |
    ${finalBass} | (F3 A3).2 (G2 B2 F3).4 | (C3 E3 G3).2 { d }
  `;
}

mountScoreWritingSteps(document.querySelector('#multi-section-tonic-return'), {
  score: {
    tempo: 110,
    onScoreLoaded(score) {
      score.tracks[0].addLineBreaks(4);
      score.tracks[0].addLineBreaks(8);
    }
  },
  steps: [
    {
      label: 'A B C',
      notes: multiSectionScore('C', 'A4.8 G4.8 F4.8 E4.8 D4.8 F4.8 | E4.2 G4.4', '(F3 A3).2 (D3 F3).4 | (C3 E3).2 (E3 G3).4'),
      description: '第 9 小节转回 C 大调，以连续下行的八分音符引入新主题。第 12 小节和再现版一样落在主和弦。',
      highlights: [{ staff: 1, bar: 9, beat: 1 }, { staff: 1, bar: 9, beat: 2 }]
    },
    {
      label: 'A B A′',
      notes: multiSectionScore('A′', opening, 'C3.2 G3.4 | F3.4 E3.4 C3.4'),
      description: '第 9、10 小节原样恢复 A 的旋律，第 11 小节改写，最后仍回到 C 大调主和弦。',
      highlights: [{ staff: 1, bar: 1, beat: 1 }, { staff: 1, bar: 9, beat: 1 }]
    }
  ]
});
