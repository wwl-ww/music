import { mountScore } from './score.js';
import { mountScoreChoiceButtons } from './score-choice-buttons.js';

export function mountScoreWritingSteps(container, { steps, score = {} }) {
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

  mountScoreChoiceButtons(choices, steps, step => {
    cue.textContent = step.description;
    if (step === active) return;
    active = step;
    player.setNotes(step.notes);
  });
}
