import { mountScore } from '../../shared/formats/score.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { buildChord, buildDiatonicTriad, buildResolution, chordRoots, hasSeventh } from '../../shared/formats/chords.js';
import { displayPitch } from '../../shared/formats/pitch.js';

mountScore(document.querySelector('#triad-colors'), {
  notation: 'staff',
  tempo: 88,
  notes: String.raw`\ts (2 4)
    (C4 E4 G4).2 | (C4 Eb4 G4).2 | (C4 E4 G#4).2 | (C4 Eb4 Gb4).2`
});

const builder = document.getElementById('chord-builder');
const root = builder.querySelector('[name="tonic"]');
for (const name of chordRoots) root.add(new Option(displayPitch(name), name));

const chordType = builder.querySelector('[name="type"]');
const position = builder.querySelector('[name="inversion"]');
const thirdInversion = position.querySelector('[value="3"]');
function syncPositions() {
  const triad = !hasSeventh(chordType.value);
  if (triad && position.value === '3') position.value = '0';
  thirdInversion.disabled = triad;
}
chordType.addEventListener('change', syncPositions);
syncPositions();

mountProgrammaticScore(builder, { build: buildChord, lowestPitch: 60, octaves: 2 });
mountProgrammaticScore(document.getElementById('diatonic-triad-example'), {
  build: buildDiatonicTriad,
  lowestPitch: 60,
  octaves: 2
});
mountProgrammaticScore(document.getElementById('resolution-example'), {
  build: buildResolution,
  lowestPitch: 48,
  octaves: 3
});
