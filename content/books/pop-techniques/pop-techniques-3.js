import { lyricBars } from '../songwriting/songwriting-score.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { popChorusHook, popChorusWords } from './pop-techniques-material.js';

const meter = String.raw`\ts (4 4)`;

function mount(id, examples) {
  mountScoreWritingSteps(document.getElementById(id), {
    score: { tempo: 100 },
    steps: examples.map(({ label, description, words, bars }) => ({
      label,
      description,
      notes: `${meter} ${lyricBars(words, bars)}`
    }))
  });
}

const sentence = '我把一盏灯留在窗边';
const words = sentence + popChorusWords;
mount('pop-lyric-phrasing', [
  {
    label: '语义分组',
    description: '「我把一盏灯」唱到「灯」后停顿，下一小节接「留在窗边」。第三小节是副歌的「留一盏灯」。',
    words,
    bars: ['E4.8 E4.8 G4.8 G4.8 A4.4 r.4', 'F4.8 G4.8 A4.4 G4.4 r.4', popChorusHook]
  },
  {
    label: '拆开词组',
    description: '半拍休止切开了「一盏灯」和「留在窗边」。第三小节的词、音高和节奏保持。',
    words,
    bars: ['E4.8 E4.8 G4.8 r.8 G4.8 A4.4 F4.8', 'r.8 G4.8 A4.4 G4.4 r.4', popChorusHook]
  }
]);
