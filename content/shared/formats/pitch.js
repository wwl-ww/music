const letters = 'CDEFGAB';
export const naturalOffsets = [0, 2, 4, 5, 7, 9, 11];
const accidentals = ['bb', 'b', '', '#', '##'];

export function displayPitch(name) {
  return name.replace('bb', '𝄫').replace('##', '𝄪').replace('b', '♭').replace('#', '♯');
}

export function getTonic(tonic, tonicOctave = tonic === 'Cb' ? 5 : 4) {
  const tonicLetter = letters.indexOf(tonic[0]);
  const tonicPitch = (tonicOctave + 1) * 12 + naturalOffsets[tonicLetter] + accidentals.indexOf(tonic.slice(1)) - 2;
  return { tonicLetter, tonicOctave, tonicPitch };
}

export function spellNote({ tonicLetter, tonicOctave }, degree, pitch) {
  const letterOffset = tonicLetter + degree;
  const octaveOffset = Math.floor(letterOffset / letters.length);
  const letter = letterOffset - octaveOffset * letters.length;
  const octave = tonicOctave + octaveOffset;
  const naturalPitch = (octave + 1) * 12 + naturalOffsets[letter];
  const name = letters[letter] + accidentals[pitch - naturalPitch + 2];
  return { pitch, name, octave };
}
