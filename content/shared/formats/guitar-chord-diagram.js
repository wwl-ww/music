const svgNamespace = 'http://www.w3.org/2000/svg';
const stringX = index => 38 + index * 20;
const nutY = 27;
const fretSpacing = 20;

function draw(tag, attributes, content) {
  const element = document.createElementNS(svgNamespace, tag);
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  if (content) element.textContent = content;
  return element;
}

function diagram({ label, positions, degrees = [], firstFret = 1, barre }) {
  const fretCount = Math.max(4, Math.max(...positions) - firstFret + 1);
  const fretY = fret => nutY + (fret - firstFret + 0.5) * fretSpacing;
  const fingering = positions.map((fret, index) => {
    const note = fret === null ? '不弹' : fret === 0 ? '空弦' : `第 ${fret} 品`;
    return `第 ${6 - index} 弦${note}${degrees[index] ? `（${degrees[index] === 'R' ? '根音' : degrees[index]}）` : ''}`;
  }).join('，');
  const barreText = barre ? `，第 ${barre.fret} 品横按第 ${barre.fromString} 至第 ${barre.toString} 弦` : '';
  const svg = draw('svg', {
    viewBox: `0 0 155 ${nutY + fretCount * fretSpacing + 6}`,
    class: 'guitar-chord-diagram', role: 'img', 'aria-label': `${label}，${fingering}${barreText}`
  });

  const lastFretY = nutY + fretCount * fretSpacing;
  positions.forEach((_, index) => {
    const x = stringX(index);
    svg.append(draw('line', { x1: x, y1: nutY, x2: x, y2: lastFretY, class: 'guitar-diagram-string' }));
  });
  for (let row = 0; row <= fretCount; row++) {
    const y = nutY + row * fretSpacing;
    svg.append(draw('line', {
      x1: stringX(0), y1: y, x2: stringX(5), y2: y,
      class: row === 0 && firstFret === 1 ? 'guitar-diagram-nut' : 'guitar-diagram-fret'
    }));
  }
  if (firstFret > 1) {
    svg.append(draw('text', { x: 27, y: fretY(firstFret), class: 'guitar-diagram-position' }, `${firstFret} 品`));
  }
  if (barre) {
    const start = stringX(6 - Math.max(barre.fromString, barre.toString));
    const end = stringX(6 - Math.min(barre.fromString, barre.toString));
    svg.append(draw('rect', {
      x: start - 7.5, y: fretY(barre.fret) - 7.5, width: end - start + 15, height: 15, rx: 7.5,
      class: 'guitar-diagram-barre'
    }));
  }
  positions.forEach((fret, index) => {
    const x = stringX(index);
    const degree = degrees[index];
    if (fret === null) {
      svg.append(draw('text', { x, y: 12, class: 'guitar-diagram-muted' }, '×'));
      return;
    }
    const y = fret === 0 ? 12 : fretY(fret);
    svg.append(draw('circle', {
      cx: x, cy: y, r: fret === 0 ? 6.5 : 7.5,
      class: fret === 0 ? 'guitar-diagram-open' : `guitar-diagram-stop${degree === 'R' ? ' guitar-diagram-root' : ''}`
    }));
    if (degree) svg.append(draw('text', { x, y, class: fret === 0 ? 'guitar-diagram-open-degree' : 'guitar-diagram-degree' }, degree));
  });
  return svg;
}

export function mountGuitarChordDiagrams(host, shapes) {
  host.classList.add('guitar-chord-diagrams');
  const figures = shapes.map(shape => {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.textContent = shape.label;
    figure.append(caption, diagram(shape));
    return figure;
  });
  host.replaceChildren(...figures);
}
