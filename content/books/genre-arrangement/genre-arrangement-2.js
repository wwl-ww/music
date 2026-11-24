import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { chord, mountScoreSelect, pitchedTrack } from './genre-arrangement-foundation.js';

const melody = ['G4.4 A4.4 G4.2', 'G4.4 E4.4 G4.2', 'C5.4 D5.4 E5.4 C5.4', 'D5.1'];
const voicings = {
  C: 'C3 G3 C4 E4',
  Em: 'E3 B3 E4 G4',
  Am: 'A2 E3 A3 C4',
  Dm: 'D3 F3 A3 D4',
  G: 'G2 D3 G3 B3',
  Fmaj9: 'F3 A3 C4 E4 G4',
  Em7: 'E3 B3 D4 G4',
  Dm9: 'D3 A3 C4 E4 F4',
  Cmaj9: 'C3 G3 B3 D4 E4'
};
function score(symbols) {
  return {
    scoreTracks: [
      pitchedTrack('旋律', 0, melody),
      pitchedTrack('和声与低音', 0, symbols.map(symbol => chord(voicings[symbol], symbol)), 'F4')
    ]
  };
}

const triads = [
  ['C C C G', '前三小节维持 C，最后低音到 G 才形成属和声的停顿。'],
  ['C C Am G', '第三小节先由 C 走到 A，C 和 E 在两个和弦之间保留。最后低音继续到 G。'],
  ['C Em C G', '第二小节短暂转到 E 低音。第三小节回到 C，第四小节才转向 G。'],
  ['C Em Am G', '低音每小节更换。中段从 Em 到 Am，最后用 G 保持句尾向主和弦的趋向。'],
  ['C C C Dm', '前三小节维持 C，第四小节转到 Dm。旋律 D 成为根音，属和弦可移到下一句。'],
  ['C Em C Dm', '低音先到 E，再回 C 并上行到 D。末端在属前和声上停住。']
];
mountScoreSelect('genre-triad-paths', triads.map(([symbols, description]) => ({
  notes: score(symbols.split(' ')), description
})));

mountScoreWritingSteps(document.getElementById('genre-extension-path'), {
  score: { tempo: 88 },
  steps: [
    {
      label: '三和弦 · C–C–C–G',
      description: 'C–C–C–G 将低音的明显变化放到句尾，最后的 D 是 G 和弦的五音。',
      notes: score(['C', 'C', 'C', 'G'])
    },
    {
      label: '七、九和弦 · F–E–D–C',
      description: '低音从 F 逐级下行到 C。首小节 G 与末小节 D 都作九音，同一旋律获得不同的起点与句尾重心。',
      notes: score(['Fmaj9', 'Em7', 'Dm9', 'Cmaj9'])
    }
  ]
});
