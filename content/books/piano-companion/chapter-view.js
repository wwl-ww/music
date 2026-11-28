import { mountScore } from '../../shared/formats/score.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const main = document.querySelector('[data-companion-chapter]');
const chapters = import.meta.glob('./chapter-[0-9]*.js');
const { examples } = await chapters[`./chapter-${main.dataset.companionChapter}.js`]();
const byId = new Map(examples.map(demo => [demo.id, demo]));

function pianoNotes({ right, left, key = 'C', meter = '4 4' }) {
  return { scoreNotation: String.raw`\ks ${key} \ts (${meter}) ${right} ||
    \staff { score } \tuning (none) \clef F4 \ks ${key} \ts (${meter}) ${left}` };
}

const observer = new IntersectionObserver(entries => {
  for (const { target, isIntersecting } of entries) {
    if (!isIntersecting) continue;
    observer.unobserve(target);
    const { tempo = 84, variants } = byId.get(target.id);
    const steps = variants.map(({ label, description, ...parts }) => ({ label, description, notes: pianoNotes(parts) }));
    const score = { tempo, showDynamics: false, justifyLastSystem: false, useWorkers: false };
    if (steps.length > 1) {
      const cue = target.querySelector('[data-writing-description]');
      mountScoreWritingSteps(target, {
        steps, score, onStepChange(step) { cue.hidden = !step.description; }
      });
    } else {
      const figure = target.querySelector('[data-writing-score]');
      mountScore(figure, { ...score, notation: 'staff', notes: steps[0].notes });
    }
  }
}, { rootMargin: '420px 0px' });

for (const panel of main.querySelectorAll('[data-companion-demo]')) observer.observe(panel);
