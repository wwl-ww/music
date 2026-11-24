import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const melody = 'G4.4 G4.8 A4.8 C5.4 E5.4 | D5.4 E5.4 G5.2';
const lowerMelody = 'G3.4 G3.8 A3.8 C4.4 E4.4 | D4.4 E4.4 G4.2';

function chorusEntries(upper, lower) {
  return String.raw`\ks C \ts (4 4) ${upper} ||
    \staff { score } \tuning (none) \clef F4 ${lower}`;
}

mountScoreWritingSteps(document.getElementById('cantata-chorus-entries'), {
  score: { tempo: 106 },
  steps: [
    {
      label: '齐唱',
      notes: chorusEntries(melody, lowerMelody),
      description: '两组同拍唱同一旋律，音域相差一八度。',
      highlights: [{ staff: 1, bar: 1, beat: 1 }, { staff: 2, bar: 1, beat: 1 }]
    },
    {
      label: '对答',
      notes: chorusEntries(`${melody} | r.1 | r.1`, `r.1 | r.1 | ${lowerMelody}`),
      description: '高声部唱完两小节，低声部才在第 3 小节应答。相同旋律前后相接。',
      highlights: [{ staff: 1, bar: 1, beat: 1 }, { staff: 2, bar: 3, beat: 1 }]
    },
    {
      label: '轮唱',
      notes: chorusEntries(`${melody} | r.1`, `r.1 | ${lowerMelody}`),
      description: '低声部提前到第 2 小节进入。两组在这一小节同时唱同一旋律的不同位置。',
      highlights: [{ staff: 1, bar: 1, beat: 1 }, { staff: 2, bar: 2, beat: 1 }]
    }
  ]
});
