import { enableScrollFrame } from './readable-layout.js';

export function mountTimeline(frame, { unitCount, unitName, unitLabels, lanes, onSelect }) {
  const grid = document.createElement('div');
  grid.className = 'score-timeline';
  grid.style.setProperty('--timeline-units', unitCount);
  const hasLabels = lanes.some(lane => lane.label);
  grid.dataset.laneLabels = String(hasLabels);
  const events = new Map();
  const units = [];

  function cell(tag, className, label, row, column, span = 1) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = label;
    element.style.gridRow = row;
    element.style.gridColumn = column + ' / span ' + span;
    grid.append(element);
    return element;
  }

  if (hasLabels) {
    const labelsBackground = cell('span', 'timeline-label-background', '', 1, 1);
    labelsBackground.style.gridRow = '1 / span ' + (lanes.length + 1);
    if (unitName) cell('span', 'timeline-label', unitName, 1, 1);
  }
  for (let index = 0; index < unitCount; index++) {
    const tick = cell('span', 'timeline-unit', unitLabels?.[index] ?? index + 1, 1, index + 2);
    tick.setAttribute('aria-hidden', 'true');
    units.push(tick);
  }
  lanes.forEach(({ label, events: items }, index) => {
    const row = index + 2;
    if (label) cell('span', 'timeline-label', label, row, 1);
    for (let unit = 0; unit < unitCount; unit++) cell('span', 'timeline-guide', '', row, unit + 2);
    for (const event of items) {
      const { id, start, length, guide, label: title } = event;
      const button = cell('button', 'timeline-event', title, row, start + 1, length);
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', event.accessibleLabel ?? [label, title].filter(Boolean).join(' '));
      if (guide) button.dataset.guide = '';
      button.addEventListener('click', () => onSelect(id));
      events.set(id, button);
    }
  });
  frame.replaceChildren(grid);
  enableScrollFrame(frame, unitName ? unitName + '时间轴' : '时间轴');

  return {
    grid,
    events,
    select(id, related = []) {
      for (const [eventId, button] of events) {
        button.setAttribute('aria-pressed', String(eventId === id));
        button.toggleAttribute('data-related', related.includes(eventId));
      }
    },
    markUnit(number) {
      units.forEach((unit, index) => unit.toggleAttribute('data-current', index + 1 === number));
    }
  };
}
