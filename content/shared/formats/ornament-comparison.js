import { mountScore } from './score.js';

const durations = { 1: '.16', 2: '.8', 3: '.8 { d }', 4: '.4', 6: '.4 { d }', 8: '.2' };

function measure(events) {
  return events.map(([note, length]) => length === 5
    ? `${note}.16 ${note}{t}.4`
    : note + durations[length]).join(' ');
}

export function mountOrnamentComparison(container, build) {
  const form = container.querySelector('form');
  const print = container.querySelector('[data-ornament-printed]');
  const playback = container.querySelector('[data-ornament-score]');
  const summary = container.querySelector('output');
  let player;

  function update() {
    const { glyph, wave, accidental, tail, delayed, prefix, events, text } = build(Object.fromEntries(new FormData(form)));
    const longWave = wave ? `<path d="M24 7l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4"/>${wave === 'down' ? '<path d="M40 0v11"/>' : ''}` : '';
    const suffix = tail ? '<text class="ornament-grace" x="57" y="25.5">&#xE0A4;</text><text class="ornament-grace" x="68" y="23">&#xE0A4;</text><path d="M61 25.5V15 M72 23V13 M61 15l11-2 M61 17l11-2"/>' : '';
    const printed = `${glyph ? `<text x="${delayed ? 49 : 31}" y="5">${glyph}</text>` : longWave}
        ${accidental ? `<text class="ornament-grace" x="46" y="2">${accidental}</text>` : ''}
        ${prefix ? '<text class="ornament-grace" x="14" y="25.5">&#xE560;</text>' : ''}
        <text x="35" y="23">${delayed ? '&#xE0A4;' : '&#xE0A3;'}</text><path d="M41 23V11"/>${suffix}
        ${delayed ? '<circle cx="45" cy="20.5" r="1"/><text x="68" y="23">&#xE0A4;</text><path d="M74 23V8"/><text x="74" y="8">&#xE240;</text>' : ''}`;
    print.innerHTML = `<svg class="inline-staff ornament-source" viewBox="0 -4 85 38" aria-hidden="true">
      <path class="inline-staff-lines" d="M2 8H83 M2 13H83 M2 18H83 M2 23H83 M2 28H83"/>
      ${printed}
    </svg>`;
    summary.textContent = text;
    const notes = String.raw`\ts (2 4) ${measure(events)}`;
    if (player) player.setNotes(notes);
    else player = mountScore(playback, { notes, tempo: 76, notation: 'staff' });
  }

  form.addEventListener('change', update);
  update();
}
