import { mountTimeline } from './timeline.js';

const svgNamespace = 'http://www.w3.org/2000/svg';
let nextGraph = 0;

function setAttributes(element, attributes) {
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
}

function svgElement(tag, attributes) {
  const element = document.createElementNS(svgNamespace, tag);
  if (attributes) setAttributes(element, attributes);
  return element;
}

export function mountVoiceRelations(container, { unitCount, unitName, unitLabels, lanes, links }) {
  const frame = container.querySelector('[data-voice-timeline]');
  const summary = container.querySelector('[data-voice-description]');
  const entries = lanes.flatMap(({ events }) => events);
  const details = new Map(entries.map(({ id, detail }) => [id, detail]));
  const timeline = mountTimeline(frame, {
    unitCount, unitName, unitLabels, lanes, onSelect: select
  });
  frame.classList.add('voice-relations-frame');
  for (const { id, length } of entries) {
    timeline.events.get(id).toggleAttribute('data-long', length >= 6);
  }

  const diagram = svgElement('svg', { class: 'voice-relation-connections', 'aria-hidden': 'true' });
  const graphId = 'voice-relation-' + ++nextGraph;
  const sources = new Set(links.map(({ from }) => from));
  const maskId = graphId + '-labels';
  const mask = svgElement('mask', { id: maskId, maskUnits: 'userSpaceOnUse' });
  mask.append(svgElement('rect', { width: '100%', height: '100%', fill: 'white' }));
  const labels = [...timeline.events.values()].map(button => {
    const range = document.createRange();
    range.selectNodeContents(button);
    const hole = svgElement('rect', { fill: 'black', rx: 2 });
    mask.append(hole);
    return { button, range, hole };
  });
  diagram.append(mask);
  const edges = links.map((link, index) => {
    const group = svgElement('g');
    const path = svgElement('path', { mask: `url(#${maskId})` });
    const gradientId = `${graphId}-gradient-${index}`;
    const gradient = svgElement('linearGradient', { id: gradientId, gradientUnits: 'userSpaceOnUse' });
    gradient.append(
      svgElement('stop', { offset: 0, 'stop-color': 'currentColor', 'stop-opacity': 0.44 }),
      svgElement('stop', { offset: 1, 'stop-color': 'currentColor' })
    );
    const origin = svgElement('circle', { class: 'voice-relation-origin', r: 3 });
    const destination = svgElement('circle', { class: 'voice-relation-destination', r: 3 });
    path.style.stroke = `url(#${gradientId})`;
    group.append(gradient, path, origin, destination);
    diagram.append(group);
    return { ...link, group, path, gradient, origin, destination };
  });
  timeline.grid.append(diagram);

  function draw() {
    const grid = timeline.grid.getBoundingClientRect();
    if (!grid.width || !grid.height) return;
    diagram.setAttribute('viewBox', '0 0 ' + grid.width + ' ' + grid.height);
    setAttributes(mask, { x: 0, y: 0, width: grid.width, height: grid.height });
    const bounds = new Map();
    // Keep long cross-voice connections clear of intermediate event labels.
    for (const { button, range, hole } of labels) {
      const box = button.getBoundingClientRect();
      const label = range.getBoundingClientRect();
      const start = Math.max(box.left, label.left - 3);
      const end = Math.min(box.right, label.right + 3);
      bounds.set(button, box);
      setAttributes(hole, { x: start - grid.left, y: label.top - grid.top - 1, width: end - start, height: label.height + 2 });
    }
    for (const { from, to, path, gradient, origin, destination } of edges) {
      const source = bounds.get(timeline.events.get(from));
      const target = bounds.get(timeline.events.get(to));
      const offset = 14;
      const inset = 4;
      const x1 = source.left - grid.left + offset;
      const skipsLane = Math.abs(target.top - source.top) > source.height * 2;
      const shareEndpoint = sources.has(to) || (skipsLane && Math.abs(source.left - target.left) < 1);
      const x2 = target.left - grid.left + offset + (shareEndpoint ? 8 : 0);
      let y1;
      let y2;
      let middle;
      if (Math.abs(target.top - source.top) < 1) {
        y1 = source.top - grid.top + inset;
        y2 = y1;
        middle = source.top - grid.top - 10;
      } else {
        const downward = target.top > source.top;
        y1 = (downward ? source.bottom - inset : source.top + inset) - grid.top;
        y2 = (downward ? target.top + inset : target.bottom - inset) - grid.top;
        middle = (y1 + y2) / 2;
      }
      path.setAttribute('d', `M${x1} ${y1} C${x1} ${middle} ${x2} ${middle} ${x2} ${y2}`);
      setAttributes(gradient, { x1, y1, x2, y2 });
      setAttributes(origin, { cx: x1, cy: y1 });
      setAttributes(destination, { cx: x2, cy: y2 });
    }
  }

  function select(id) {
    const related = new Set();
    const descriptions = [details.get(id)];
    for (const { from, to, label, group } of edges) {
      const active = from === id || to === id;
      group.toggleAttribute('data-related', active);
      if (active) {
        related.add(from === id ? to : from);
        diagram.append(group);
        descriptions.push(label);
      }
    }
    timeline.select(id, [...related]);
    summary.textContent = descriptions.filter(Boolean).join('。') + '。';
  }

  const observer = new ResizeObserver(draw);
  observer.observe(frame);
  observer.observe(timeline.grid);
  draw();
  select((entries.find(event => !event.guide) ?? entries[0]).id);
}
