import { mountScore } from '../../shared/formats/score.js';
import { pianoMarkup } from '../../shared/formats/piano.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { buildMajorScale, buildMinorScale, displayPitch, minorKeys } from '../../shared/formats/scales.js';

document.getElementById('relative-tonics-keyboard').innerHTML = pianoMarkup(9, 12);
document.getElementById('harmonic-minor-keyboard').innerHTML = pianoMarkup(5, 8, 1);
document.getElementById('melodic-minor-keyboard').innerHTML = pianoMarkup(6, 8, 1);

const scaleExample = document.getElementById('minor-scale-example');
const tonicChoice = scaleExample.querySelector('[name="tonic"]');
for (const tonic of minorKeys) {
  tonicChoice.add(new Option(displayPitch(tonic), tonic));
}
tonicChoice.value = 'A';
mountProgrammaticScore(scaleExample, {
  build: buildMinorScale,
  lowestPitch: 60,
  octaves: 2
});

mountProgrammaticScore(document.getElementById('c-scale-comparison'), {
  build({ mode, ...choices }) {
    const buildScale = mode === 'minor' ? buildMinorScale : buildMajorScale;
    return buildScale({ ...choices, tonic: 'C' });
  },
  lowestPitch: 60,
  octaves: 2
});

const examples = [
  {
    id: 'minor-resolution-score',
    notes: '(D4 G#4).2 (C4 A4).2 | (G#4 D5).2 (A4 C5).2'
  }
];

for (const { id, notes } of examples) {
  mountScore(document.getElementById(id), {
    tempo: 92,
    notation: 'staff',
    notes: String.raw`\ts (4 4)
      ${notes}`
  });
}

