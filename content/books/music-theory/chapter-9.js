import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { buildParallelPentatonicScale, displayPitch, majorKeys } from '../../shared/formats/scales.js';

const example = document.getElementById('parallel-pentatonic-example');
const tonicChoice = example.querySelector('[name="tonic"]');
for (const tonic of majorKeys.slice(3)) {
  tonicChoice.add(new Option(displayPitch(tonic), tonic));
}
tonicChoice.value = 'C';

mountProgrammaticScore(example, {
  build: buildParallelPentatonicScale,
  lowestPitch: 60,
  octaves: 2
});
