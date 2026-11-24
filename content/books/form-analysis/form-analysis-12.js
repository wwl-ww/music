import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const themeBass = 'C3.2 F3.2 | F3.2 G3.2 | C3.2 (G2 B2 D3).2 | (C3 E3 G3).1';

function pianoScore(upper, lower, time = '4 4') {
  return String.raw`\ks C \ts (${time}) ${upper} ||
    \staff { score } \tuning (none) \clef F4 ${lower}`;
}

mountScoreWritingSteps(document.getElementById('ornamental-and-free-variation'), {
  score: { tempo: 96 },
  steps: [
    {
      label: '主题',
      notes: pianoScore('E4.4 G4.4 A4.4 G4.4 | F4.4 E4.4 D4.2 | E4.4 G4.4 D4.4 B3.4 | C4.1', themeBass),
      description: '四个四拍小节。第 1 小节的 G–A–G 是短动机，第 4 小节落在 C 大调主和弦。',
      highlights: [{ staff: 1, bar: 1, beat: 2 }, { staff: 1, bar: 1, beat: 3 }, { staff: 1, bar: 1, beat: 4 }]
    },
    {
      label: '装饰变奏',
      notes: pianoScore('E4.8 F4.8 G4.8 B4.8 A4.8 F4.8 G4.8 E4.8 | F4.8 G4.8 E4.8 F4.8 D4.4 D4.4 | E4.8 F4.8 G4.8 E4.8 D4.8 C4.8 B3.8 D4.8 | C4.4 E4.8 G4.8 C5.4 C4.4', themeBass),
      description: '仍是四个四拍小节，左手和声照旧。主题音仍落在相同的拍点，拍间增加八分音符，最后一小节在主和弦上展开。',
      highlights: [{ staff: 1, bar: 1, beat: 3 }, { staff: 1, bar: 1, beat: 5 }, { staff: 1, bar: 1, beat: 7 }]
    },
    {
      label: '自由变奏',
      notes: pianoScore(
        'G4.4 A4.4 G4.4 | E4.2 A4.4 | G5.4 A5.4 G5.4 | E5.2 A5.4 | F5.4 E5.4 G#4.4 | A4.2 { d }',
        '(A2 C3 E3).2 { d } | (A2 E3).4 (E3 A3).4 (C3 E3).4 | (A2 C3 E3).2 { d } | (A2 E3).4 (E3 A3).4 (C3 E3).4 | (D3 F3).4 (E3 G#3).2 | (A2 C3 E3).2 { d }',
        '3 4'
      ),
      description: '用 G–A–G 动机重写为六个三拍小节。动机先在原音区出现，再抬高八度，最后在 a 小调收束。',
      highlights: [{ staff: 1, bar: 1, beat: 1 }, { staff: 1, bar: 3, beat: 1 }]
    }
  ]
});
