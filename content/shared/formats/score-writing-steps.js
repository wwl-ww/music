import { mountScore } from './score.js';
import { mountScoreChoiceButtons } from './score-choice-buttons.js';

export function mountScoreWritingSteps(container, { steps, score = {}, onStepChange }) {
  const figure = container.querySelector('[data-writing-score]');
  const choices = container.querySelector('[data-writing-choices]');
  const cue = container.querySelector('[data-writing-description]');
  let active = steps[0];
  const player = mountScore(figure, {
    notation: 'staff',
    ...score,
    notes: active.notes,
    noteHighlights: () => active.highlights ?? []
  });

  function showStep(step) {
    cue.textContent = step.description ?? '';
    if (step !== active) {
      active = step;
      player.setNotes(step.notes);
    }
    onStepChange?.(step);
  }

  if (choices instanceof HTMLSelectElement) {
    choices.replaceChildren(...steps.map((step, index) => new Option(step.label, index)));
    choices.addEventListener('change', () => showStep(steps[choices.selectedIndex]));
    showStep(steps[0]);
  } else mountScoreChoiceButtons(choices, steps, showStep);
}
