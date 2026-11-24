import { lyricBars } from '../songwriting/songwriting-score.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { popChorusHook, popChorusWords } from './pop-techniques-material.js';

const meter = String.raw`\ts (4 4)`;
const opening = { words: '夜渐深', notes: 'E4.4 E4.4 D4.4 r.4' };
const middle = { words: '风渐轻', notes: 'E4.4 G4.4 E4.4 r.4' };
const title = { words: popChorusWords, notes: popChorusHook };
const ending = { words: '等你回来', notes: 'E4.4 G4.4 D4.4 C4.4' };

const pulse = 'C3.2 (E3 G3).2';
const accompaniment = [
  'C3.2 { dy p } (E3 G3).2', pulse, pulse, '(C3 E3 G3).1'
].join(' | ');

function chorusScore(bars) {
  const melody = lyricBars(bars.map(({ words }) => words).join(''), bars.map(({ notes }) => notes));
  return { scoreTracks: [
    { name: '旋律', program: 0, phrase: `${meter} ${melody}` },
    { name: '伴奏', program: 0, phrase: String.raw`\clef F4 ${meter} ${accompaniment}`, playbackOnly: true }
  ] };
}

mountScoreWritingSteps(document.getElementById('pop-pitch-hook-revision'), {
  score: { tempo: 100 },
  steps: [
    {
      label: '第 3 小节唱标题句',
      description: '前两小节铺垫夜景，第 3 小节出现「留一盏灯」。',
      notes: chorusScore([opening, middle, title, ending])
    },
    {
      label: '第 1 小节唱标题句',
      description: '开头就唱「留一盏灯」，「夜渐深」移到第 3 小节。',
      notes: chorusScore([title, middle, opening, ending])
    }
  ]
});
