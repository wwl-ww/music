import { enableScrollFrame } from './readable-layout.js';
import { mountScore } from './score.js';
import { mountScoreChoiceButtons } from './score-choice-buttons.js';

function makeComparison(versions) {
  const table = document.createElement('table');
  table.className = 'lesson-table chord-revision-table';
  table.createCaption().textContent = '和弦对照';
  const heading = table.createTHead().insertRow();
  function header(row, label, scope) {
    const cell = document.createElement('th');
    cell.scope = scope;
    cell.textContent = label;
    row.append(cell);
    return cell;
  }
  header(heading, '版本', 'col');
  versions[0].bars.forEach((_, index) => header(heading, `第 ${index + 1} 小节`, 'col'));

  const body = table.createTBody();
  const rows = versions.map(({ label, bars }, index) => {
    const row = body.insertRow();
    header(row, label, 'row');
    bars.forEach((events, bar) => {
      const cell = row.insertCell();
      const original = versions[0].bars[bar];
      for (const { symbol, start, end, voicing } of events) {
        const line = document.createElement('span');
        if (events.length > 1) {
          const beat = document.createElement('small');
          beat.textContent = `${start + 1} 拍`;
          line.append(beat);
        }
        const same = original.some(event => event.start === start && event.end === end
          && event.symbol === symbol && event.voicing === voicing);
        const name = document.createElement(index && !same ? 'mark' : 'span');
        name.textContent = symbol.replaceAll('#', '♯').replace(/([A-G]|\d|\()b/g, '$1♭');
        line.append(name);
        cell.append(line);
      }
    });
    return row;
  });
  const frame = document.createElement('div');
  frame.className = 'table-scroll';
  table.style.setProperty('--table-min-width', `${(versions[0].bars.length + 1) * 4.55}rem`);
  frame.append(table);
  return { frame, rows };
}

export function mountChordRevision(container, { title, versions, tempo, showDynamics = true }) {
  container.classList.add('music-demo', 'chord-revision');
  const diagrams = container.querySelector('[data-revision-diagrams]');
  const panels = [...diagrams?.querySelectorAll('[data-revision-version]') ?? []];
  const panelVersions = new Map(panels.map(panel => [
    panel, versions.findIndex(version => version.label === panel.dataset.revisionVersion)
  ]));
  const versionFromAnchor = () => panelVersions.get(panels.find(panel => panel.id && `#${panel.id}` === location.hash)) ?? -1;
  const toolbar = document.createElement('div');
  toolbar.className = 'music-demo-toolbar';
  const heading = document.createElement('h3');
  heading.textContent = title;
  const choices = document.createElement('div');
  choices.className = 'score-choice-buttons';
  choices.setAttribute('role', 'group');
  choices.setAttribute('aria-label', '试听版本');
  toolbar.append(heading, choices);
  const { frame, rows } = makeComparison(versions);
  const figure = document.createElement('figure');
  figure.className = 'chord-revision-score';
  container.replaceChildren(toolbar, ...(diagrams ? [diagrams] : []), frame, figure);
  enableScrollFrame(frame, '和弦对照');

  let active;
  let player;
  function showScore() {
    player ??= mountScore(figure, {
      notation: 'staff', tempo, notes: active.score, showDynamics,
      horizontal: matchMedia('(max-width: 36rem)').matches
    });
  }
  const linkedIndex = versionFromAnchor();
  const initialIndex = linkedIndex >= 0 ? linkedIndex : Math.max(0, panelVersions.get(panels[0]) ?? 0);
  const choose = mountScoreChoiceButtons(choices, versions, (version, index) => {
    if (version === active) return;
    active = version;
    rows.forEach((row, position) => row.toggleAttribute('data-current', position === index));
    for (const [panel, position] of panelVersions) {
      panel.toggleAttribute('data-current', position === index);
      panel.setAttribute('aria-current', String(position === index));
    }
    const anchoredIndex = versionFromAnchor();
    if (anchoredIndex >= 0 && anchoredIndex !== index) {
      const anchor = panels.find(panel => panel.id && panelVersions.get(panel) === index)?.id ?? container.id;
      if (anchor) history.replaceState(history.state, '', `#${anchor}`);
    }
    figure.setAttribute('aria-label', `${title} · ${version.label}`);
    player?.setNotes(version.score);
  }, initialIndex);
  if (panels.some(panel => panel.id)) window.addEventListener('hashchange', () => {
    const index = versionFromAnchor();
    if (index >= 0) choose(index);
  });

  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    showScore();
  }, { rootMargin: '180px 0px' });
  observer.observe(figure);
  choices.addEventListener('focusin', showScore, { once: true });
}
