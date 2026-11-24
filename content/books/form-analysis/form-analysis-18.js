import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

function motifScore(meter, upper, lower) {
  return String.raw`\ks Gminor \ts (${meter}) ${upper} ||
    \staff { score } \tuning (none) \clef F4 ${lower}`;
}

mountScoreWritingSteps(document.getElementById('symphony-cycle-motif'), {
  score: { tempo: 104 },
  steps: [
    {
      label: '低音中的动机',
      notes: motifScore('2 4', 'D5.8 D5.8 D5.8 Eb5.8 | D5.8 C5.8 Bb4.4', 'G3.8 Bb3.8 G3.4 | F#3.4 G3.4'),
      description: '动机在第 1 小节低声部。上声部连续使用八分音符，低音的 G–降 B–G 藏在织体里。',
      highlights: [{ staff: 2, bar: 1, beat: 1 }, { staff: 2, bar: 1, beat: 2 }, { staff: 2, bar: 1, beat: 3 }]
    },
    {
      label: '舞曲的开头',
      notes: motifScore('3 4', 'G4.4 Bb4.4 G4.4 | A4.4 F#4.4 G4.4', 'G3.4 (Bb3 D4).4 (Bb3 D4).4 | D3.4 (A3 C4).4 G3.4'),
      description: '动机改在高声部，每音占一拍，一个小节完成一次陈述。低音与后两拍和弦勾勒舞曲节拍。',
      highlights: [{ staff: 1, bar: 1, beat: 1 }, { staff: 1, bar: 1, beat: 2 }, { staff: 1, bar: 1, beat: 3 }]
    },
    {
      label: '终止处的动机',
      notes: motifScore('4 4', 'D5.4 C5.4 A4.4 F#4.4 | G4.4 Bb4.4 G4.2', '(D3 F#3 A3 C4).1 | (G2 Bb2 D3).1'),
      description: '属七和弦先推动解决，随后动机在主和弦上出现。最后一个 G 拉长，承担收束。',
      highlights: [{ staff: 1, bar: 2, beat: 1 }, { staff: 1, bar: 2, beat: 2 }, { staff: 1, bar: 2, beat: 3 }]
    }
  ]
});
