const keys = ['c', 'c-sharp', 'd', 'd-sharp', 'e', 'f', 'f-sharp', 'g', 'g-sharp', 'a', 'a-sharp', 'b'];
const keyCenters = [16, 32, 48, 64, 80, 112, 128, 144, 160, 176, 192, 208];
// SVG <use> needs a same-origin file for its key fragments in the built site.
const piano = new URL('./piano.svg?no-inline', import.meta.url).href;
const octaveWidth = 224;

export function pianoMarkup(start, end, octaves = 2) {
  const marked = [[start, 'keyboard-highlight', 'start']];
  if (start !== end) marked.push([end, 'keyboard-end', 'end']);
  return pianoKeysMarkup(marked, octaves);
}

export function pianoKeysMarkup(marked, octaves = 2) {
  const markedKeys = marked.map(([pitch, style, endpoint]) => {
    const index = pitch % 12;
    const key = keys[index];
    const x = Math.floor(pitch / 12) * octaveWidth;
    const black = key.endsWith('-sharp');
    const cx = x + keyCenters[index];
    const cy = black ? 48 : 80;
    const marker = endpoint === 'start'
      ? `<circle class="keyboard-start-marker" cx="${cx}" cy="${cy}" r="4.5"/>`
      : endpoint === 'end'
        ? `<path class="keyboard-end-marker" d="M${cx} ${cy - 5}l5 5-5 5-5-5Z"/>`
        : '';
    return {
      black,
      marker,
      markup: `<use class="${style}" data-pitch="${pitch}" href="${piano}#key-${key}" x="${x}"/>`
    };
  });

  function layer(black) {
    const kind = black ? 'black' : 'white';
    const base = Array.from({ length: octaves }, (_, octave) =>
      `<use class="keyboard-${kind}" href="${piano}#${kind}-keys" x="${octave * octaveWidth}"/>`
    ).join('');
    return base + markedKeys.filter(key => key.black === black).map(key => key.markup + key.marker).join('');
  }

  return `<svg viewBox="0 0 ${octaves * octaveWidth} 96" aria-hidden="true">${layer(false)}${layer(true)}</svg>`;
}
