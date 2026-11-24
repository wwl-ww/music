import { lyricBars } from '../songwriting/songwriting-score.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const meter = String.raw`\ts (4 4)`;

function mount(id, examples, tempo = 88) {
  mountScoreWritingSteps(document.getElementById(id), {
    score: { tempo },
    steps: examples.map(({ label, description, words, bars }) => ({
      label,
      description,
      notes: `${meter} ${lyricBars(words, bars)}`
    }))
  });
}

const sentence = '我把一盏灯留在窗边';
mount('pop-lyric-phrasing', [
  {
    label: '语义分组',
    description: '「我把一盏灯」唱到「灯」后停顿，下一小节接「留在窗边」。钢琴示意旋律的断句。',
    words: sentence,
    bars: ['E4.8 E4.8 G4.8 G4.8 A4.4 r.4', 'F4.8 G4.8 A4.4 G4.2']
  },
  {
    label: '拆开词组',
    description: '两格八分休止分别移到「一」与「留」后，切开了「一盏灯」和「留在窗边」。',
    words: sentence,
    bars: ['E4.8 E4.8 G4.8 r.8 G4.8 A4.4 F4.8', 'r.8 G4.8 A4.4 G4.2']
  }
]);
