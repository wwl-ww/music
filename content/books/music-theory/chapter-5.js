import { mountScore } from '../../shared/formats/score.js';
import { pianoMarkup } from '../../shared/formats/piano.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { buildMajorScale, displayPitch, majorKeys } from '../../shared/formats/scales.js';

for (const keyboard of document.querySelectorAll('[data-major-keys]')) {
  const [start, end, octaves] = keyboard.dataset.majorKeys.split(' ').map(Number);
  keyboard.innerHTML = pianoMarkup(start, end, octaves);
}

const scaleExample = document.getElementById('major-scale-example');
const tonicChoice = scaleExample.querySelector('[name="tonic"]');
for (const tonic of majorKeys) {
  tonicChoice.add(new Option(displayPitch(tonic), tonic));
}
tonicChoice.value = 'C';
mountProgrammaticScore(scaleExample, {
  build: buildMajorScale,
  lowestPitch: 60,
  octaves: 2
});

mountScore(document.querySelector('#major-resolution-score'), {
  notation: 'staff',
  tempo: 78,
  notes: String.raw`
    \ts (4 4)
    (F4 B4).2 (E4 C5).2 |
    (B4 F5).2 (C5 E5).2
  `
});

mountScore(document.querySelector('#major-translation-score'), {
  notation: 'both',
  audio: false,
  notes: String.raw`\ks Bb \ts (2 4)
    F4.4 D5.4 | C5.4 Bb4.4 | A4.8 G4.8 D4.8 Eb4.8 | F4.2`
});

