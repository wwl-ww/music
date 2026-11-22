import { mountScore } from '../../shared/formats/score.js';
import { pianoMarkup } from '../../shared/formats/piano.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import '../../shared/formats/keyboard-intervals.js';

for (const example of document.querySelectorAll('[data-piano]')) {
  const [start, end, octaves] = example.dataset.piano.split(' ').map(Number);
  example.innerHTML = pianoMarkup(start, end, octaves);
}

const naturalIntervals = [
  ['纯一度', 'C4', 0],
  ['小二度', 'Db4', 1],
  ['大二度', 'D4', 2],
  ['小三度', 'Eb4', 3],
  ['大三度', 'E4', 4],
  ['纯四度', 'F4', 5],
  ['增四度', 'F#4', 6],
  ['减五度', 'Gb4', 6],
  ['纯五度', 'G4', 7],
  ['小六度', 'Ab4', 8],
  ['大六度', 'A4', 9],
  ['小七度', 'Bb4', 10],
  ['大七度', 'B4', 11],
  ['纯八度', 'C5', 12]
];
const intervalExample = document.getElementById('natural-interval-score');
const intervalChoice = intervalExample.querySelector('[name="interval"]');
naturalIntervals.forEach(([name], index) => intervalChoice.add(new Option(name, String(index))));

mountProgrammaticScore(intervalExample, {
  lowestPitch: 60,
  octaves: 2,
  build({ interval }) {
    const [, upper, semitones] = naturalIntervals[Number(interval)];
    const name = upper.replace('#', '♯').replace('b', '♭');
    return {
      notes: String.raw`\ts (4 4) C4.2 ${upper}.2`,
      pitches: [60, 60 + semitones],
      description: `C4–${name} · ${semitones} 个半音`
    };
  }
});

mountScore(document.querySelector('#consonance-intervals-score'), {
  tempo: 84,
  notation: 'staff',
  notes: String.raw`\ts (2 4)
    (C4 G4).2 | (C4 E4).2 | (C4 F#4).2 | (C4 Db4).2`
});
