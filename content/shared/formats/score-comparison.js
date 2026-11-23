import { mountScore } from './score.js';
import { mountScoreChoiceButtons } from './score-choice-buttons.js';

export function mountScoreComparison(container, { versions, description }) {
  const panes = [...container.querySelectorAll('[data-comparison-pane]')];
  const choices = container.querySelector('[data-comparison-choices]');
  const playback = container.querySelector('[data-comparison-playback]');
  const cue = container.querySelector('[data-comparison-description]');
  cue.textContent = description;

  const entries = versions.map((version, index) => {
    const pane = panes[index];
    const title = pane.querySelector('[data-version-title]');
    const figure = pane.querySelector('figure');
    title.textContent = version.label;
    figure.setAttribute('aria-label', version.label);
    const player = mountScore(figure, {
      notation: 'staff',
      ...version.score,
      noteHighlights: () => version.highlights ?? []
    });
    const controls = figure.querySelector('.score-controls');
    controls.remove();
    return { player, controls };
  });

  let active = null;
  mountScoreChoiceButtons(choices, versions, (_, index) => {
    if (active === index) return;
    entries[active]?.player.stop();
    active = index;
    playback.replaceChildren(entries[index].controls);
  });
}
