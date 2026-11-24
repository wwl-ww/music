import { mountFretboard } from '../../shared/formats/fretboard.js';
import { pianoKeysMarkup } from '../../shared/formats/piano.js';
import { getTonic, naturalOffsets } from '../../shared/formats/pitch.js';

const scaleNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const solfege = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const tuning = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];

document.querySelector('#rock-keyboard-map').innerHTML = pianoKeysMarkup([
  [0, 'keyboard-highlight', 'start'],
  [12, 'keyboard-highlight', 'start']
], 2);

const labelChoice = document.querySelector('#rock-fretboard-labels');
const figures = [...document.querySelectorAll('[data-reference-fretboard]')];
const openPitches = tuning.map(name => getTonic(name.slice(0, -1), Number(name.at(-1))).tonicPitch);

function drawReference() {
  for (const figure of figures) {
    const startFret = Number(figure.dataset.referenceFretboard);
    const endFret = startFret === 0 ? 6 : 12;
    const markers = [];
    for (const [index, openPitch] of openPitches.entries()) {
      for (let fret = startFret; fret <= endFret; fret++) {
        const pitch = openPitch + fret;
        const degree = naturalOffsets.indexOf(pitch % 12);
        if (degree === -1) continue;
        const name = scaleNames[degree] + (Math.floor(pitch / 12) - 1);
        const labels = { pitch: name, solfege: solfege[degree], degree: String(degree + 1) };
        markers.push({ string: index + 1, fret, label: labels[labelChoice.value], variant: degree === 0 ? 'root' : 'note' });
      }
    }
    mountFretboard(figure, { tuning, startFret, endFret, markers });
  }
}

labelChoice.addEventListener('change', drawReference);
drawReference();
