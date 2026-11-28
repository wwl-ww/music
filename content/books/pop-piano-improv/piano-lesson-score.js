import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

export function pianoHands(right, left, { key = 'C', meter = '4 4' } = {}) {
  return String.raw`\ks ${key} \ts (${meter}) ${right} ||
    \staff { score } \tuning (none) \clef F4 \ks ${key} ${left}`;
}

export function mountPianoStudy(id, steps, tempo = 84, { onStepChange, onPlaybackPosition } = {}) {
  mountScoreWritingSteps(document.getElementById(id), {
    steps,
    score: { tempo, showDynamics: false, onPlaybackPosition },
    onStepChange
  });
}
