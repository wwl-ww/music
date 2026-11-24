import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

function danceScore(meter, upper, lower) {
  return String.raw`\ks G \ts (${meter}) ${upper} ||
    \staff { score } \tuning (none) \clef F4 ${lower}`;
}

mountScoreWritingSteps(document.getElementById('suite-dance-meters'), {
  score: { tempo: 94 },
  steps: [
    {
      label: '阿勒芒德',
      notes: danceScore('4 4', '\\ac G4.16 A4.16 | B4.8 C5.8 B4.8 A4.8 G4.8 A4.8 B4.8 C5.8 | D5.8 B4.8 A4.8 F#4.8 G4.2', '\\ac r.8 | G3.2 D3.2 | B2.2 D3.4 G3.4'),
      description: '四拍子。两个十六分音符由弱起引向强拍，随后保持连续的细分。'
    },
    {
      label: '库朗特',
      notes: danceScore('3 2', '\\ac G4.8 | A4.4 B4.2 A4.4 G4.2 | A4.4 B4.4 C5.2 A4.4 G4.4', '\\ac r.8 | G3.2 (D3 F#3).2 G3.2 | C3.2 D3.2 G3.2'),
      description: '每小节三个二分拍。弱部的短音引向较长的旋律，低音把三拍分开。'
    },
    {
      label: '萨拉班德',
      notes: danceScore('3 4', 'G4.4 B4.4 { d } A4.8 | A4.4 F#4.4 { d } G4.8', '(G3 B3 D4).4 (C3 E3 G3).2 | D3.4 (D3 F#3 A3 C4).4 G3.4'),
      description: '每小节三个四分拍。高声部把第二拍时值拉长，和声也在第二拍改变。'
    },
    {
      label: '吉格',
      notes: danceScore('6 8', 'G4.8 A4.8 B4.8 D5.8 C5.8 B4.8 | A4.8 B4.8 C5.8 B4.8 A4.8 G4.8', 'G3.4 { d } G3.8 A3.8 B3.8 | D3.8 E3.8 F#3.8 G3.4 { d }'),
      description: '每小节分两组，每组三个八分音符。高声部题头到第二组时由低声部接入。'
    }
  ]
});
