import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';

mountRangeKeyboards(document.getElementById('bowed-range-keyboards'), document.getElementById('bowed-range-data'), {
  firstOctave: 4,
  octaves: 4,
  rangeLabel: '参考'
});

const bowingVersions = {
  sustain: {
    phrase: 'D5.2 A4.8 B4.8 D5.4 | E5.4 D5.4 A4.2',
    summary: '第 1 小节第一个 D5 保持两拍，句尾 A4 保持不变。'
  },
  repeat: {
    phrase: 'D5.8 { dy f } D5.8 { dy mp } D5.8 { dy mf } D5.8 { dy mp } A4.8 B4.8 D5.4 | E5.4 D5.4 A4.2',
    summary: '把前两拍的 D5 分成四次起音。句尾仍是 A4，前段听起来更有推动力。'
  }
};
const bowingDemo = document.getElementById('erhu-bow-phrasing');
const bowingChoice = bowingDemo.querySelector('select');
const bowingCue = bowingDemo.querySelector('.music-demo-cue');
function selectedBowing() {
  const { phrase, summary } = bowingVersions[bowingChoice.value];
  bowingCue.textContent = `${summary} 试听用小提琴音色示意时值和起音。`;
  return `\\instrument 40 \\ks D \\ts (4 4) ${phrase}`;
}
const player = mountScore(bowingDemo.querySelector('figure'), { notes: selectedBowing(), tempo: 86, notation: 'staff' });
bowingChoice.addEventListener('change', () => player.setNotes(selectedBowing()));

mountPlayableArrangementGrid(document.querySelector('[data-jinghu-grid]'), {
  beats: 6,
  beatsPerBar: 2,
  subdivisions: 2,
  tempo: 92,
  label: '京胡弓序。弱起拉弓，第一拍换推弓',
  rows: [
    {
      label: '旋律',
      program: 40,
      events: [
        { step: 3, text: 'A4', pitch: 'A4', accent: true },
        { step: 4, text: 'D5', pitch: 'D5', length: 2 },
        { step: 6, text: 'E5', pitch: 'E5', length: 2, accent: true },
        { step: 8, text: 'D5', pitch: 'D5', length: 4 }
      ]
    },
    {
      label: '弓向',
      notationOnly: true,
      events: [
        { step: 3, text: '拉', label: '拉弓' },
        { step: 4, text: '推', label: '推弓' },
        { step: 6, text: '拉', label: '拉弓' },
        { step: 8, text: '推', label: '推弓' }
      ]
    }
  ]
});
