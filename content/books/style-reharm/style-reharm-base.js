export const baseMelody = Object.freeze([
  'G4.4 E4.8 G4.8 C5.2', 'G4.4 E4.4 C5.2', 'A4.2 G4.4 F4.4', 'E4.4 G4.4 C5.2',
  'E5.2 D5.4 C5.4', 'G4.4 A4.4 G4.2', 'A4.4 C5.4 A4.2', 'D5.2 B4.2',
  'B4.4 D5.4 G5.2', 'E5.2 G5.4 E5.4', 'F5.4 E5.4 C5.2', 'G4.4 C5.4 E5.2',
  'A4.2 G4.8 A4.8 C5.4', 'B4.4 G4.4 D5.2', 'C5.4 A4.2 F4.4', 'G4.4 E4.4 C4.2'
]);

export const baseHarmony = Object.freeze([
  'C', 'C', 'F', 'C', 'C', 'C', 'F', 'G', 'G', 'C', 'F', 'C', 'F', 'G', 'F', 'C'
]);

const sharpNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function transposeMelody(semitones) {
  return baseMelody.map(bar => bar.replace(/([A-G])(\d+)/g, (_, pitch, octave) => {
    const shifted = Number(octave) * 12 + sharpNames.indexOf(pitch) + semitones;
    const note = sharpNames[((shifted % 12) + 12) % 12];
    return `${note}${Math.floor(shifted / 12)}`;
  }));
}

export const primaryVoicings = {
  C: 'C3 E3 G3 C4',
  F: 'F2 C3 A3 C4',
  G: 'G2 D3 G3 B3'
};

export function harmonyBeat(pitches, symbol, duration = 1) {
  return `(${pitches}).${duration} { ch "${symbol}" }`;
}

export function pianoScore(melody, accompaniment, { key = 'C', tempo = 92 } = {}) {
  const timing = String.raw`\ts (4 4) \ks ${key}`;
  return {
    scoreTracks: [
      { name: '旋律', program: 0, phrase: String.raw`${timing} \tempo ${tempo} ${melody.join(' | ')}` },
      { name: '和声', program: 0, phrase: String.raw`${timing} \clef F4 ${accompaniment.join(' | ')}` }
    ]
  };
}

export function baseScore(options) {
  const accompaniment = baseHarmony.map(symbol => harmonyBeat(primaryVoicings[symbol], symbol));
  return pianoScore(baseMelody, accompaniment, options);
}
