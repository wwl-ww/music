import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { buildMedievalScale, buildPentatonicScale, buildSevenToneScale, displayPitch, majorKeys } from '../../shared/formats/scales.js';

const pentatonicExample = document.getElementById('pentatonic-scale-example');
const gongChoice = pentatonicExample.querySelector('[name="gong"]');
for (const gong of majorKeys) {
  gongChoice.add(new Option(displayPitch(gong), gong));
}
gongChoice.value = 'C';
mountProgrammaticScore(pentatonicExample, {
  build: buildPentatonicScale,
  lowestPitch: 60,
  octaves: 2
});

mountProgrammaticScore(document.getElementById('seven-tone-scale-example'), {
  build: buildSevenToneScale,
  lowestPitch: 60,
  octaves: 2
});

const medievalExample = document.getElementById('medieval-scale-example');
const medievalTonic = medievalExample.querySelector('[name="tonic"]');
for (const tonic of ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']) {
  medievalTonic.add(new Option(displayPitch(tonic), tonic));
}
mountProgrammaticScore(medievalExample, {
  build: buildMedievalScale,
  lowestPitch: 60,
  octaves: 2
});
