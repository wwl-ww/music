import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

function ending(chord, voicing) {
  return {
    scoreTracks: [
      { name: '旋律', program: 27, phrase: '\\ts (4 4) E4.4 G4.4 A4.4 G4.4 | F4.4 A4.4 C5.2 | D5.4 B4.4 G4.2 | C5.1' },
      {
        name: '和弦与低音',
        program: 0,
        phrase: '\\ts (4 4) \\clef F4 (C3 E3 G3).1 { txt "C" } | (F2 C3 A3).1 { txt "F" } | ' +
          '(G2 D3 F3 B3).1 { txt "G7" } | ' + voicing + '.1 { txt "' + chord + '" }'
      }
    ]
  };
}

mountScoreWritingSteps(document.querySelector('#rock-intro-ending'), {
  score: { tempo: 100, soundFontUrl },
  steps: [
    {
      label: 'G7 → C',
      notes: ending('C', '(C3 E3 G3 C4)'),
      description: '句尾的旋律与低音都是 C，G7 的 B、F 分别走向 C、E。'
    },
    {
      label: 'G7 → Am',
      notes: ending('Am', '(A2 E3 A3 C4)'),
      description: '低音改落 A。末音 C 仍保留，却成了 Am 的三音。'
    }
  ]
});
