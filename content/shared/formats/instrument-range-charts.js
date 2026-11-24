import { semitone } from './range-keyboards.js';

const noteNames = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
const letters = 'CDEFGAB';
const accidentals = { '♭': '&#xE260;', '♯': '&#xE262;' };
const diatonicStep = note => letters.indexOf(note[0]) + 7 * Number(note.slice(-1));
const octaveNotes = Array.from({ length: 9 }, (_, index) => `C${index}`);

function escape(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
}

function describedRanges(ranges) {
  return escape(ranges.map(({ name, common, main, low, high, open, gap }) => [
    `${name}${common ? '（常用）' : ''} ${main}`, low && `下延至 ${low}`, high && `上延至 ${high}`,
    open.length && `空弦 ${open.join('、')}`, gap && '低音区有断档'
  ].filter(Boolean).join('，')).join('。'));
}

export function horizontalRangeChart(ranges) {
  const left = 147;
  const right = 548;
  const height = 32 + ranges.length * 32;
  const position = pitch => left + (right - left) * pitch / 108;
  const pitchX = note => position(semitone(note));
  const axis = octaveNotes.map(note => `<path class="instrument-range-guide" d="M${pitchX(note)} 28V${height - 3}"/>
    <text class="instrument-range-axis" x="${pitchX(note)}" y="18" text-anchor="middle">${note}</text>`).join('');
  const rows = ranges.map(({ shortName, common, main, low, high, gap, open }, index) => {
    const [first, last] = main.split('–').map(pitchX);
    const y = 47 + index * 32;
    const connector = (a, b) => `<path class="instrument-range-limit" d="M${a} ${y}H${b}"/>`;
    return `<g${common ? ' data-range-common' : ''}>
      <text class="instrument-range-name" x="137" y="${y + 5}">${escape(shortName)}</text>
      <rect class="instrument-range-band" x="${first}" y="${y - 6}" width="${last - first}" height="12" rx="2"/>
      ${low ? connector(pitchX(low), gap ? position(gap[0] - 1) : first) : ''}
      ${high ? connector(last, pitchX(high)) : ''}
      ${open.map(note => `<circle class="instrument-range-open" cx="${pitchX(note)}" cy="${y}" r="3.4"/>`).join('')}
    </g>`;
  }).join('');
  return `<svg class="instrument-range range-atlas-horizontal" viewBox="0 0 560 ${height}" role="img" aria-label="实际音高。${describedRanges(ranges)}">${axis}${rows}</svg>`;
}

export function staffRangeChart(ranges) {
  const columns = ranges.map(range => {
    const [first, last] = range.main.split('–');
    return { ...range, first, last };
  });
  const highest = Math.max(diatonicStep('F5'), ...columns.map(({ high, last }) => diatonicStep(high || last)));
  const lowest = Math.min(diatonicStep('G2'), ...columns.map(({ low, first }) => diatonicStep(low || first)));
  const y = note => 44 + 6 * (highest - diatonicStep(note));
  const width = 105 + 100 * (columns.length - 1) + 57;
  const height = 60 + 6 * (highest - lowest);
  const fullLine = note => `M42 ${y(note)}H${width - 4}`;
  const axis = octaveNotes.filter(note => diatonicStep(note) >= lowest && diatonicStep(note) <= highest);
  const guide = axis.filter(note => note !== 'C3' && note !== 'C5');

  function head(note, x, shift = 0) {
    const position = y(note);
    const center = x + shift;
    const ledger = [];
    for (let line = y('F5') - 12; line >= position; line -= 12) ledger.push(`M${center - 10} ${line}h20`);
    for (let line = y('G2') + 12; line <= position; line += 12) ledger.push(`M${center - 10} ${line}h20`);
    if (note[0] === 'C' && note.endsWith('4')) ledger.push(`M${center - 10} ${y('C4')}h20`);
    const side = shift && x !== 105 ? 'end' : 'start';
    const symbol = accidentals[note[1]];
    const labelX = side === 'end' ? center - (symbol ? 20 : 11) : x + 12;
    const labelY = position + (shift && x === 105 && Math.abs(position - y('C4')) < 12 ? 14 : 4);
    return `<g class="staff-range-pitch${shift ? ' range-staff-limit' : ''}" data-staff-endpoint="${note}">
      ${ledger.length ? `<path class="range-staff-ledger" d="${ledger.join(' ')}"/>` : ''}
      ${symbol ? `<text class="range-staff-symbol range-staff-accidental" x="${center - 16}" y="${position}">${symbol}</text>` : ''}
      <text class="range-staff-symbol" x="${center - 6}" y="${position}">${shift ? '&#xE0A3;' : '&#xE0A4;'}</text>
      <text class="staff-range-note-label" x="${labelX}" y="${labelY}" text-anchor="${side}">${note}</text>
    </g>`;
  }

  const series = columns.map(({ shortName, common, first, last, low, high, gap, open }, index) => {
    const x = 105 + index * 100;
    const pedalPitch = gap?.[0] - 1;
    const pedal = gap ? noteNames[pedalPitch % 12] + Math.floor(pedalPitch / 12) : '';
    const extension = (edge, note) => `<path class="staff-range-extension" d="M${x} ${y(edge)}V${y(note)}h-17"/>${head(note, x, -17)}`;
    return `<g data-instrument-range${common ? ' data-range-common' : ''}>
      <text class="staff-range-name" x="${x}" y="20">${escape(shortName)}</text>
      <path class="staff-range-span" d="M${x} ${y(last)}V${y(first)}"/>
      ${high ? extension(last, high) : ''}
      ${low ? extension(pedal || first, low) : ''}
      ${pedal ? head(pedal, x, -17) : ''}
      ${head(first, x)}${head(last, x)}
      ${open.map(note => `<circle class="staff-range-open" cx="${x + 7}" cy="${y(note)}" r="3.4"/>`).join('')}
    </g>`;
  }).join('');

  return `<svg class="staff-range-plot" viewBox="0 0 ${width} ${height}" role="img" aria-label="实际音高。${describedRanges(ranges)}">
    <path class="staff-range-guide" d="${guide.map(fullLine).join(' ')}"/>
    <path class="range-staff-lines" d="${['F5', 'D5', 'B4', 'G4', 'E4', 'A3', 'F3', 'D3', 'B2', 'G2'].map(fullLine).join(' ')}"/>
    <text class="range-staff-clef" x="46" y="${y('G4')}">&#xE050;</text>
    <text class="range-staff-clef" x="46" y="${y('F3')}">&#xE062;</text>
    <g class="staff-range-axis" text-anchor="end">${axis.map(note => `<text x="35" y="${y(note) + 4}">${note}</text>`).join('')}</g>
    ${series}
  </svg>`;
}
