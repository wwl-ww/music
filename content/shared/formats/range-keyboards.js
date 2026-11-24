import { pianoKeysMarkup } from './piano.js';

const naturalSteps = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const accidentalSteps = { '♯': 1, '♭': -1, '#': 1, b: -1 };

export function semitone(note) {
  const [, letter, accidental, octave] = /^([A-G])([♯♭#b]?)(-?\d+)$/.exec(note);
  return Number(octave) * 12 + naturalSteps[letter] + (accidentalSteps[accidental] ?? 0);
}

export function readInstrumentRanges(table) {
  return Array.from(table.querySelectorAll('[data-range-main]'), cell => {
    const row = cell.closest('tr');
    const read = kind => row.querySelector('[data-range-' + kind + ']')?.textContent.trim();
    const name = row.querySelector('th[scope="row"]').textContent.trim();
    return {
      name,
      shortName: row.dataset.rangeName || name,
      common: row.hasAttribute('data-range-common'),
      main: cell.textContent.trim(),
      high: read('high'),
      low: row.dataset.rangeLow,
      gap: row.dataset.rangeGap?.split('–').map(semitone),
      open: read('open')?.split(' · ') ?? []
    };
  });
}

export function mountRangeKeyboards(figure, table, options) {
  renderRangeKeyboards(figure, readInstrumentRanges(table), options);
}

export function renderRangeKeyboards(figure, ranges, {
  rangeLabel = '常用', lowerLabel = '低音扩展至', upperLabel = '上限', markLimits = true,
  firstOctave = 1, octaves = 7, caption = '键盘上的实际音域'
} = {}) {
  const octaveLabels = Array.from({ length: octaves }, (_, index) => {
    const note = 'C' + (index + firstOctave);
    return note === 'C4' ? '<strong>C4</strong>' : '<span>' + note + '</span>';
  });
  const hasExtensions = ranges.some(range => range.high || range.low);
  figure.classList.add('range-keyboards');
  figure.innerHTML = `
    <figcaption>${caption}</figcaption>
    <div class="instrument-range-key range-keyboard-legend">
      <span class="range-legend-common">${rangeLabel}音域</span>
      ${hasExtensions ? '<span class="range-legend-extension">扩展音域</span>' : ''}
      ${ranges.some(range => range.open.length) ? '<span class="range-legend-open">空弦</span>' : ''}
      ${hasExtensions && markLimits ? '<span class="range-legend-limit">极限音</span>' : ''}
      ${ranges.some(range => range.gap) ? '<span>音域内留白为断档</span>' : ''}
    </div>
    <div class="range-keyboard-octaves" aria-hidden="true">${octaveLabels.join('')}</div>
  `;

  const offset = firstOctave * 12;
  for (const { name, common, main, high, low, gap, open } of ranges) {
    const [first, last] = main.split('–').map(semitone);
    const lower = low ? semitone(low) : first;
    const upper = high ? semitone(high) : last;
    const openKeys = new Set(open.map(semitone));
    const keys = Array.from({ length: upper - lower + 1 }, (_, index) => {
      const pitch = lower + index;
      const inRange = pitch >= first && pitch <= last;
      const isLimit = markLimits && ((high && pitch === upper) || (low && pitch === lower));
      const marker = openKeys.has(pitch) ? 'start' : isLimit ? 'end' : undefined;
      return [pitch - offset, inRange ? 'keyboard-highlight' : 'keyboard-end', marker];
    }).filter(([pitch]) => !gap || pitch + offset < gap[0] || pitch + offset > gap[1]);
    const row = document.createElement('div');
    row.className = 'range-keyboard-row';
    if (common) row.setAttribute('data-range-common', '');
    row.innerHTML = `
      <div class="range-keyboard-label">
        <strong>${name}</strong>
        <span>${rangeLabel} ${main}</span>
        ${high ? `<span>${upperLabel} ${high}</span>` : ''}
        ${low ? `<span>${lowerLabel} ${low}</span>` : ''}
      </div>
      ${pianoKeysMarkup(keys, octaves)}
    `;
    row.querySelector('svg').setAttribute('preserveAspectRatio', 'none');
    figure.append(row);
  }
  figure.hidden = false;
}
