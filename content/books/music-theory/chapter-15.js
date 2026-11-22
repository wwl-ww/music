import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { buildTraditionalScale } from '../../shared/formats/scales.js';
import { displayPitch } from '../../shared/formats/pitch.js';

const systems = [
  ['黄钟', 'C'], ['大吕', 'Db'], ['太簇', 'D'], ['夹钟', 'Eb'],
  ['姑洗', 'E'], ['仲吕', 'F'], ['蕤宾', 'F#'], ['林钟', 'G'],
  ['夷则', 'Ab'], ['南吕', 'A'], ['无射', 'Bb'], ['应钟', 'B']
];
const degrees = ['宫', '商', '角', '变徵', '徵', '羽', '变宫'];
const example = document.getElementById('ancient-modes');
const gongChoice = example.querySelector('[name="gong"]');
const degreeChoice = example.querySelector('[name="degree"]');
systems.forEach(([name, pitch], index) => gongChoice.add(new Option(`${name}均 · ${displayPitch(pitch)}`, index)));
degrees.forEach((name, index) => degreeChoice.add(new Option(name, index)));

mountProgrammaticScore(example, {
  lowestPitch: 60,
  octaves: 2,
  build({ gong, degree }) {
    const [name, pitch] = systems[Number(gong)];
    return buildTraditionalScale({
      gong: pitch, type: 'ya', degree: Number(degree), direction: 'up', label: name + degrees[Number(degree)] + '调'
    });
  }
});
