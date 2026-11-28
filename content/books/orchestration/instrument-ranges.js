import { horizontalRangeChart, staffRangeChart } from '../../shared/formats/instrument-range-charts.js';
import { readInstrumentRanges, renderRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { enableScrollFrame } from '../../shared/formats/readable-layout.js';

const toolbar = document.querySelector('.range-atlas-header');
const family = toolbar.querySelector('select');
const search = toolbar.querySelector('input[type="search"]');
const empty = toolbar.querySelector('[data-range-empty]');
const links = [...toolbar.querySelectorAll('a')];
const panels = new Map(links.map(link => [link.hash.slice(1), document.querySelector(link.hash)]));
const tablePanel = panels.get('range-table');
const fullStaff = panels.get('range-staves').querySelector('details');
const searchKey = name => name.normalize('NFKC').toLowerCase().replace(/\s/g, '');
const groups = [...tablePanel.querySelectorAll('[data-family]')].map(section => {
  const table = section.querySelector('table');
  const ranges = new Map(readInstrumentRanges(table).map(range => [range.name, range]));
  return {
    id: section.dataset.family,
    label: section.querySelector('h3').textContent,
    section,
    entries: Array.from(table.tBodies[0].rows, row => {
      const name = row.querySelector('th').textContent.trim();
      return {
        name, row, range: ranges.get(name), common: row.hasAttribute('data-range-common'),
        keywords: searchKey(`${name} ${row.dataset.rangeName || ''}`)
      };
    })
  };
});

fullStaff.addEventListener('toggle', () => {
  const frame = fullStaff.querySelector('[data-full-staff]');
  if (!fullStaff.open || frame.childElementCount) return;
  frame.innerHTML = staffRangeChart(groups.flatMap(group => group.entries.map(entry => entry.range)).filter(Boolean));
  const staff = frame.firstElementChild;
  staff.style.minWidth = `${staff.viewBox.baseVal.width}px`;
  enableScrollFrame(frame, '全书共用谱表');
});

function renderCharts(panel, matching, filterKey) {
  if (panel.dataset.filter === filterKey) return;
  panel.dataset.filter = filterKey;
  const container = panel.querySelector('[data-range-groups]');
  container.replaceChildren();
  for (const { id, label, entries } of matching) {
    if (!entries.length) continue;
    const ranges = entries.map(entry => entry.range).filter(Boolean);
    const withoutRange = entries.filter(entry => !entry.range);
    const section = document.createElement('section');
    section.dataset.family = id;
    const title = document.createElement('h3');
    title.textContent = label;
    section.append(title);

    if (ranges.length && panel.id === 'range-horizontal') {
      section.insertAdjacentHTML('beforeend', horizontalRangeChart(ranges));
    }
    if (ranges.length && panel.id === 'range-staves') {
      const grid = document.createElement('div');
      grid.className = 'range-atlas-staves';
      const groupSize = Math.ceil(ranges.length / Math.ceil(ranges.length / 4));
      for (let index = 0; index < ranges.length; index += groupSize) {
        const chunk = ranges.slice(index, index + groupSize);
        grid.insertAdjacentHTML('beforeend', staffRangeChart(chunk));
        grid.lastElementChild.dataset.columns = chunk.length;
      }
      section.append(grid);
    }
    if (ranges.length && panel.id === 'range-keyboards') {
      const figure = document.createElement('figure');
      figure.dataset.rangesKeyboard = '';
      renderRangeKeyboards(figure, ranges, {
        caption: `${label}键位`, rangeLabel: '参考', lowerLabel: '下限', firstOctave: 0, octaves: 9
      });
      section.append(figure);
    }
    if (withoutRange.length) {
      const note = document.createElement('p');
      note.className = 'range-atlas-note';
      note.append('记谱与型号见音域表。');
      for (const [index, entry] of withoutRange.entries()) {
        if (index) note.append('、');
        const name = document.createElement('span');
        name.textContent = entry.name;
        name.toggleAttribute('data-range-common', entry.common);
        note.append(name);
      }
      note.append('。');
      section.append(note);
    }
    container.append(section);
  }
}

function showView() {
  const id = location.hash.slice(1);
  const active = panels.get(id) ?? tablePanel;
  for (const panel of panels.values()) panel.hidden = panel !== active;
  for (const link of links) {
    if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  const selection = family.value;
  const query = searchKey(search.value);
  const matching = groups.map(group => ({
    ...group,
    entries: group.entries.filter(entry => entry.keywords.includes(query) &&
      (selection === 'all' || selection === group.id || (selection === 'common' && entry.common)))
  }));
  empty.hidden = matching.some(group => group.entries.length > 0);
  fullStaff.hidden = selection !== 'all' || Boolean(query);

  if (active !== tablePanel) {
    renderCharts(active, matching, `${selection}:${query}`);
    return;
  }

  for (const [index, group] of groups.entries()) {
    const visible = new Set(matching[index].entries);
    group.section.hidden = !visible.size;
    for (const entry of group.entries) entry.row.hidden = !visible.has(entry);
  }
}

for (const link of links) {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    showView();
  });
}
family.addEventListener('change', showView);
search.addEventListener('input', showView);
window.addEventListener('hashchange', showView);
toolbar.hidden = false;
showView();
