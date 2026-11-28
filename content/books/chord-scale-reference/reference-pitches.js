import { displayPitch, getTonic, naturalOffsets, spellNote } from '../../shared/formats/pitch.js';

export const tonicGroups = [
  ['C'], ['Db', 'C#'], ['D'], ['Eb', 'D#'], ['E'], ['F'], ['Gb', 'F#'],
  ['G'], ['Ab', 'G#'], ['A'], ['Bb', 'A#'], ['B']
];

export const tonics = tonicGroups.flat();

function noteAtDegree(root, degree) {
  const [, signs, numberText] = degree.match(/^([♭♯]*)([1-9]\d*)$/);
  const step = Number(numberText) - 1;
  const adjustment = [...signs].reduce((offset, sign) => offset + (sign === '♯' ? 1 : -1), 0);
  const pitch = root.tonicPitch + 12 * Math.floor(step / 7) + naturalOffsets[step % 7] + adjustment;
  return { ...spellNote(root, step, pitch), degree };
}

export function referenceNotes(tonic, type, direction, octave = getTonic(tonic).tonicPitch >= 67 ? 3 : 4) {
  const root = getTonic(tonic, octave);
  const degrees = direction === 'down'
    ? type.descendingDegrees ?? [...type.degrees].reverse()
    : type.degrees;
  return degrees.map(degree => noteAtDegree(root, degree));
}

export function referenceScore(notes, scale) {
  const pitches = notes.map(({ name, octave }) => name + octave);
  if (!scale) return String.raw`\clef G2 \ks C \ts (2 4) (${pitches.join(' ')}).2`;
  return String.raw`\clef G2 \ks C \ts (${pitches.length} 8) ${pitches.map(pitch => pitch + '.8').join(' ')}`;
}

export { displayPitch };
