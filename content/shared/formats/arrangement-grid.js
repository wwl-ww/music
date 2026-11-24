import { enableScrollFrame } from './readable-layout.js';

export function mountArrangementGrid(frame, {
  beats = 4, subdivisions = 4, beatsPerBar = 4, rows, label
}) {
  const steps = beats * subdivisions;
  const table = document.createElement('table');
  table.className = 'arrangement-grid';
  table.setAttribute('aria-label', label);
  table.style.setProperty('--arrangement-steps', steps);
  const header = table.createTHead().insertRow();
  const key = document.createElement('th');
  key.textContent = '拍';
  header.append(key);
  for (let beat = 0; beat < beats; beat++) {
    const heading = document.createElement('th');
    heading.scope = 'col';
    heading.colSpan = subdivisions;
    heading.textContent = beat % beatsPerBar + 1;
    heading.setAttribute('aria-label', `第 ${Math.floor(beat / beatsPerBar) + 1} 小节第 ${heading.textContent} 拍`);
    heading.toggleAttribute('data-bar-start', beat % beatsPerBar === 0);
    header.append(heading);
  }
  const body = table.createTBody();
  let markedStep = null;

  function update(nextRows) {
    body.replaceChildren();
    for (const { label: name, events } of nextRows) {
      const row = body.insertRow();
      const title = document.createElement('th');
      title.scope = 'row';
      title.textContent = name;
      row.append(title);
      const onsets = new Map(events.map(event => [event.step, event]));
      for (let step = 0; step < steps; step++) {
        const cell = row.insertCell();
        cell.toggleAttribute('data-beat-start', step % subdivisions === 0);
        cell.toggleAttribute('data-bar-start', step % (beatsPerBar * subdivisions) === 0);
        cell.toggleAttribute('data-current', step === markedStep);
        const event = onsets.get(step);
        if (!event) continue;
        const symbol = document.createElement('span');
        const emphasis = event.accent ? '重音' : '起音';
        const duration = event.length ? `，持续 ${event.length} 格` : '';
        cell.setAttribute('aria-label', `第 ${step % subdivisions + 1} 格，${emphasis}${duration}`);
        symbol.className = 'arrangement-grid-event';
        symbol.setAttribute('aria-hidden', 'true');
        symbol.toggleAttribute('data-accent', Boolean(event.accent));
        if (event.length) {
          symbol.dataset.duration = '';
          symbol.style.setProperty('--arrangement-duration', event.length);
        }
        cell.append(symbol);
      }
    }
  }

  function markStep(step) {
    if (step === markedStep) return;
    for (const row of body.rows) {
      row.cells[markedStep === null ? -1 : markedStep + 1]?.removeAttribute('data-current');
      if (step !== null) row.cells[step + 1]?.setAttribute('data-current', '');
    }
    markedStep = step;
  }

  update(rows);
  frame.replaceChildren(table);
  enableScrollFrame(frame, label);
  return { update, markStep };
}
