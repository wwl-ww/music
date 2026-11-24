import { enableScrollFrame } from './readable-layout.js';

const standardGuitar = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];
const svgNamespace = 'http://www.w3.org/2000/svg';
const cellWidth = 40;
const stringSpacing = 28;
const gridLeft = 57;
const firstStringY = 39;
const boards = new WeakMap();

function draw(tag, attributes, content) {
  const element = document.createElementNS(svgNamespace, tag);
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  if (content != null) element.textContent = content;
  return element;
}

function describePosition({ string, fret }) {
  return fret === 0 ? `第 ${string} 弦空弦` : `第 ${string} 弦第 ${fret} 品`;
}

export function mountFretboard(figure, {
  tuning = standardGuitar, startFret = 0, endFret = 5, caption, markers = [], connections = []
}) {
  const lastFretX = gridLeft + (endFret - startFret + 1) * cellWidth;
  const stringY = string => firstStringY + (string - 1) * stringSpacing;
  const positionX = fret => gridLeft + (fret - startFret + 0.5) * cellWidth;
  const bottom = stringY(tuning.length);
  const inView = ({ string, fret }) => string >= 1 && string <= tuning.length && fret >= startFret && fret <= endFret;
  const visibleMarkers = markers.filter(inView);
  const routes = connections.filter(({ from, to }) => inView(from) && inView(to));
  const accessibleName = [
    caption || '弦乐器指板',
    `第 ${startFret} 至 ${endFret} 品，空弦由高到低 ${tuning.join('、')}`,
    ...visibleMarkers.map(marker => `${describePosition(marker)}${marker.label ? ` ${marker.label}` : ''}${marker.variant === 'root' ? '（主音）' : ''}`),
    ...routes.map(({ from, to }) => `${describePosition(from)}移至${describePosition(to)}`)
  ].join('。');
  const width = lastFretX + 5;
  const svg = draw('svg', {
    class: 'fretboard-svg',
    viewBox: `0 0 ${width} ${bottom + 19}`,
    role: 'img',
    'aria-label': accessibleName
  });
  svg.style.setProperty('--fretboard-width', `${width / 16}rem`);

  tuning.forEach((note, index) => {
    const y = stringY(index + 1);
    const lowestVisibleX = startFret === 0 ? positionX(0) : gridLeft;
    svg.append(draw('line', { x1: lowestVisibleX, y1: y, x2: lastFretX, y2: y, class: 'fretboard-string' }));
    svg.append(draw('text', { x: 45, y, class: 'fretboard-tuning' }, `${index + 1} · ${note}`));
  });
  for (let fret = startFret; fret <= endFret; fret++) {
    const x = positionX(fret) + cellWidth / 2;
    const isNut = fret === 0;
    svg.append(draw('line', {
      x1: x, y1: firstStringY - 12, x2: x, y2: bottom + 12, class: isNut ? 'fretboard-nut' : 'fretboard-fret'
    }));
    svg.append(draw('text', { x: positionX(fret), y: 12, class: 'fretboard-position' }, isNut ? '空弦' : fret));
  }
  if (startFret > 0) {
    svg.append(draw('line', { x1: gridLeft, y1: firstStringY - 12, x2: gridLeft, y2: bottom + 12, class: 'fretboard-fret' }));
  }

  for (const { from, to } of routes) {
    const x1 = positionX(from.fret);
    const y1 = stringY(from.string);
    const x2 = positionX(to.fret);
    const y2 = stringY(to.string);
    const length = Math.hypot(x2 - x1, y2 - y1);
    if (length === 0) continue;
    const dx = (x2 - x1) / length;
    const dy = (y2 - y1) / length;
    const tipX = x2 - 13 * dx;
    const tipY = y2 - 13 * dy;
    svg.append(draw('path', {
      class: 'fretboard-arrow',
      d: `M${x1 + 13 * dx} ${y1 + 13 * dy} L${tipX} ${tipY}
          l${-5 * dx - 2.8 * dy} ${-5 * dy + 2.8 * dx}
          M${tipX} ${tipY} l${-5 * dx + 2.8 * dy} ${-5 * dy - 2.8 * dx}`
    }));
  }

  for (const { string, fret, label, variant = 'note' } of visibleMarkers) {
    const x = positionX(fret);
    const y = stringY(string);
    const group = draw('g', { class: 'fretboard-marker', 'data-variant': variant, 'data-string': string, 'data-fret': fret });
    const isRoot = variant === 'root';
    const radius = label?.length >= 3 ? 15 : 12;
    group.append(draw('rect', { x: x - radius, y: y - 10, width: radius * 2, height: 20, rx: isRoot ? 3 : 10 }));
    if (label) group.append(draw('text', { x, y }, label));
    svg.append(group);
  }

  let board = boards.get(figure);
  if (!board) {
    const title = figure.querySelector(':scope > figcaption') ?? document.createElement('figcaption');
    const frame = document.createElement('div');
    figure.classList.add('fretboard');
    figure.replaceChildren(title, frame);
    const refresh = enableScrollFrame(frame, '指板图');
    board = { title, frame, refresh };
    boards.set(figure, board);
  }
  if (caption !== undefined) board.title.textContent = caption;
  board.title.hidden = !board.title.textContent.trim();
  board.frame.replaceChildren(svg);
  board.refresh();
}
