import { pianoMarkup } from './piano.js';

const naturalOffsets = [0, 2, 4, 5, 7, 9, 11];
const degreeNames = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
const perfectDegrees = new Set([0, 3, 4]);

const list = document.querySelector('.keyboard-interval-list');
if (list) list.innerHTML = degreeNames.map((degree, index) => {
  const step = index % 7;
  const octave = Math.floor(index / 7);
  const natural = naturalOffsets[step] + octave * 12;
  const qualities = perfectDegrees.has(step)
    ? [['减', -1], ['纯', 0], ['增', 1]]
    : [['减', -2], ['小', -1], ['大', 0], ['增', 1]];

  const examples = qualities.filter(([, shift]) => natural + shift >= 0).map(([quality, shift]) => {
    const semitones = natural + shift;
    return `<li>
      <strong>${quality}${degree}度</strong>
      <span>${semitones} 个半音</span>
      ${pianoMarkup(0, semitones)}
    </li>`;
  }).join('');

  return `<section class="keyboard-degree"><h3>${degree}度</h3><ul>${examples}</ul></section>`;
}).join('');
