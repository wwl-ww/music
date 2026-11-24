import { pianoKeysMarkup } from './piano.js';
import { mountScore } from './score.js';

export function mountProgrammaticScore(container, { build, lowestPitch, octaves, soundFontUrl }) {
  const scoreFigure = container.querySelector('[data-generated-score]');
  const piano = container.querySelector('[data-generated-piano]');
  const form = container.querySelector('form');
  const title = container.querySelector('.score-toolbar h3');
  const descriptionLabel = container.querySelector('[data-generated-description]');
  let score;
  let activeKeys = [];

  function highlightPitches(pitches) {
    for (const key of activeKeys) key.classList.remove('keyboard-playing');
    activeKeys = pitches.map(pitch => piano.querySelector(`[data-pitch="${pitch - lowestPitch}"]`)).filter(Boolean);
    for (const key of activeKeys) key.classList.add('keyboard-playing');
  }

  function update() {
    const { notes, pitches, description, summary = description } = build(Object.fromEntries(new FormData(form)));
    const marked = [...new Set(pitches)].map(pitch => [pitch - lowestPitch, 'keyboard-highlight']);
    highlightPitches([]);
    piano.innerHTML = pianoKeysMarkup(marked, octaves);
    scoreFigure.setAttribute('aria-label', description);
    if (descriptionLabel) descriptionLabel.textContent = summary;
    if (score) {
      score.setNotes(notes);
    } else {
      score = mountScore(scoreFigure, { notes, notation: 'staff', onPitchesChange: highlightPitches, soundFontUrl });
      if (title) {
        const header = document.createElement('div');
        header.className = 'programmatic-score-heading';
        title.before(header);
        header.append(title, scoreFigure.querySelector('.score-controls'));
      }
    }
  }

  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('change', update);
  update();
}
