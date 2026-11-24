import { mountScore } from './score.js';
import { mountScoreChoiceButtons } from './score-choice-buttons.js';

export function mountScoreComparison(container, { versions, description }) {
  const panes = [...container.querySelectorAll('[data-comparison-pane]')];
  const choices = container.querySelector('[data-comparison-choices]');
  const playback = container.querySelector('[data-comparison-playback]');
  const cue = container.querySelector('[data-comparison-description]');
  const positionLabel = document.createElement('output');
  positionLabel.className = 'score-comparison-position';
  playback.after(positionLabel);
  playback.addEventListener('click', event => {
    if (event.target.closest('.score-playback')) positionLabel.textContent = '';
  });
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
      preservePosition: true,
      noteHighlights: () => version.highlights ?? []
    });
    const controls = figure.querySelector('.score-controls');
    controls.remove();
    return { player, controls };
  });

  let active = null;
  mountScoreChoiceButtons(choices, versions, (_, index) => {
    if (active === index) return;
    const previous = entries[active]?.player;
    const position = previous?.getPosition();
    previous?.stop();
    if (active !== null) panes[active].removeAttribute('data-current');
    active = index;
    const { player, controls } = entries[index];
    panes[index].dataset.current = '';
    const retained = player.setPosition(position);
    playback.replaceChildren(controls);
    positionLabel.textContent = retained ? `第 ${retained.bar + 1} 小节` : '';
  });
}
