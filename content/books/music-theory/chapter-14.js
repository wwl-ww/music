import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { displayPitch } from '../../shared/formats/pitch.js';

const original = [60, 61, 64, 62, 67, 63, 68, 71, 65, 69, 66, 70];
const names = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const forms = {
  original: '原型',
  retrograde: '逆行',
  inversion: '倒影',
  retrogradeInversion: '逆行倒影'
};
const example = document.getElementById('tone-row-example');
const shiftChoice = example.querySelector('[name="shift"]');
for (let shift = 0; shift < 12; shift++) shiftChoice.add(new Option(shift, shift));

mountProgrammaticScore(example, {
  lowestPitch: 48,
  octaves: 3,
  build({ form, shift }) {
    const inverted = form === 'inversion' || form === 'retrogradeInversion';
    const reversed = form === 'retrograde' || form === 'retrogradeInversion';
    const row = original.map(pitch => (inverted ? 2 * original[0] - pitch : pitch) + Number(shift));
    const pitches = reversed ? row.reverse() : row;
    const notes = pitches.map(pitch => names[pitch % 12] + (Math.floor(pitch / 12) - 1));
    const measures = [notes.slice(0, 6), notes.slice(6)].map(measure => measure.map(note => note + '.8').join(' '));
    return {
      notes: String.raw`\ts (3 4) ${measures.join(' | ')}`,
      pitches,
      description: `${forms[form]}。 ${notes.map(displayPitch).join('、')}`
    };
  }
});
