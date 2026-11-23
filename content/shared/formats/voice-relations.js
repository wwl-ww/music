import { mountTimeline } from './timeline.js';

const svgNamespace = 'http://www.w3.org/2000/svg';
let nextGraph = 0;

export function mountVoiceRelations(container, { unitCount, unitName, lanes, links }) {
  const summary = container.querySelector('[data-voice-description]');
  const entries = lanes.flatMap(({ events }) => events);
  const details = new Map(entries.map(({ id, detail }) => [id, detail]));
  const timeline = mountTimeline(container.querySelector('[data-voice-timeline]'), {
    unitCount, unitName, lanes, onSelect: select
  });

  const diagram = document.createElementNS(svgNamespace, 'svg');
  diagram.classList.add('voice-relation-arrows');
  diagram.setAttribute('aria-hidden', 'true');
  const markerId = 'voice-relation-arrow-' + ++nextGraph;
  const defs = document.createElementNS(svgNamespace, 'defs');
  const marker = document.createElementNS(svgNamespace, 'marker');
  marker.setAttribute('id', markerId);
  marker.setAttribute('viewBox', '0 0 6 6');
  marker.setAttribute('refX', '5');
  marker.setAttribute('refY', '3');
  marker.setAttribute('markerWidth', '6');
  marker.setAttribute('markerHeight', '6');
  marker.setAttribute('markerUnits', 'userSpaceOnUse');
  marker.setAttribute('orient', 'auto');
  const arrow = document.createElementNS(svgNamespace, 'path');
  arrow.setAttribute('d', 'M0 0L6 3L0 6Z');
  marker.append(arrow);
  defs.append(marker);
  diagram.append(defs);
  const edges = links.map(link => {
    const path = document.createElementNS(svgNamespace, 'path');
    path.setAttribute('marker-end', 'url(#' + markerId + ')');
    diagram.append(path);
    return { ...link, path };
  });
  timeline.grid.append(diagram);

  function draw() {
    const grid = timeline.grid.getBoundingClientRect();
    diagram.setAttribute('viewBox', '0 0 ' + grid.width + ' ' + grid.height);
    for (const { from, to, path } of edges) {
      const source = timeline.events.get(from).getBoundingClientRect();
      const target = timeline.events.get(to).getBoundingClientRect();
      const x1 = source.left - grid.left + 10;
      const x2 = target.left - grid.left + 10;
      if (Math.abs(target.top - source.top) < 1) {
        const y = source.top - grid.top;
        path.setAttribute('d', 'M' + x1 + ' ' + y + ' C' + x1 + ' ' + (y - 10)
          + ' ' + x2 + ' ' + (y - 10) + ' ' + x2 + ' ' + (y - 1));
        continue;
      }
      const downward = target.top > source.top;
      const y1 = (downward ? source.bottom : source.top) - grid.top;
      const y2 = (downward ? target.top : target.bottom) - grid.top;
      const middle = (y1 + y2) / 2;
      path.setAttribute('d', 'M' + x1 + ' ' + y1 + ' C' + x1 + ' ' + middle
        + ' ' + x2 + ' ' + middle + ' ' + x2 + ' ' + y2);
    }
  }

  function select(id) {
    const related = [];
    const descriptions = [details.get(id)];
    for (const { from, to, label, path } of edges) {
      const active = from === id || to === id;
      path.toggleAttribute('data-related', active);
      if (active) {
        related.push(from === id ? to : from);
        descriptions.push(label);
      }
    }
    timeline.select(id, related);
    summary.textContent = descriptions.filter(Boolean).join('。') + '。';
  }

  const observer = new ResizeObserver(draw);
  observer.observe(timeline.grid);
  draw();
  select((entries.find(event => !event.guide) ?? entries[0]).id);
}
