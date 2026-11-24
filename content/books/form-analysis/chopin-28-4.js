// Notes adapted from Roland Goretzki's public-domain Mutopia transcription
// of the Peters / Herrmann Scholtz edition (Mutopia ID 921).

const repeatedMelody = 'B4.2 { d } C5.4';
const openingChord = ['G3 B3 E4', 8];
const subdominant = 'C3 E3 A3';
const dominant = 'B2 D#3 A3';
const heldDominant = 'B2 E3 B3';
const tuplet = (pitches) => pitches.map(pitch => `${pitch}.8 { tu 3 }`).join(' ');

function pulse(...groups) {
  return groups.flatMap(([notes, count]) => {
    const pitch = notes.includes(' ') ? `(${notes})` : notes;
    return Array(count).fill(pitch + '.8');
  }).join(' ');
}

const upper = [
  String.raw`\ac B3.8 { d dy p } B4.16`,
  repeatedMelody,
  repeatedMelody,
  repeatedMelody,
  'B4.2 { d } Bb4.4',
  'A4.2 { d } B4.4',
  'A4.2 { d } B4.4',
  'A4.2 { d } B4.8 { d } A4.16',
  'A4.2 { d } G#4.4',
  'G#4{t}.4 A4.8 B4.8 D5.8 C5.8 E4.8 A4.8',
  'F#4.2 { d } A4.4',
  'F#4.2 { d } A4.4',
  `G4.8 F#4.8 C4.8 B3.8 D#4.8 F#4.8 ${tuplet(['D5', 'C5', 'B4'])}`,
  repeatedMelody,
  repeatedMelody,
  repeatedMelody,
  'B4.8 { d } A#4.16 A#4.4 G5.4 F#5.8 { d } E5.16',
  'E5.8 { dy f } D#5.8 C6.8 D#5.8 D#5.8 E5.8 G5.8 B4.8',
  `D5.8 C5.8 ${tuplet(['E5', 'E4', 'A4'])} F#4.4 { d } A4.8`,
  'F#4.2 { d dy p } A4.4',
  'F#4.2 { d } F#4{t}.8 { d } E4.16',
  'E4.2 { d } F#4.4',
  'E4.2 { d } F#4.4',
  'E4.2 r.2 { fermata medium }',
  '(E3 F#3 B3 E4).2 { dy pp } (D#3 F#3 B3 D#4).2',
  '(E3 G3 B3 E4).2 { d fermata medium }'
];

const lower = [
  String.raw`\ac r.4 { dy p }`,
  pulse(openingChord),
  pulse(['F#3 A3 E4', 4], ['F#3 A3 Eb4', 4]),
  pulse(['F3 A3 Eb4', 4], ['F3 A3 D4', 2], ['F3 G#3 D4', 2]),
  pulse(['E3 G#3 D4', 4], ['E3 G3 D4', 2], ['E3 G3 C#4', 2]),
  pulse(['E3 G3 C4', 4], ['E3 F#3 C4', 4]),
  pulse(['E3 F#3 C4', 4], ['D#3 F#3 C4', 4]),
  pulse(['D3 F#3 C4', 8]),
  pulse(['D3 F3 C4', 4], ['D3 F3 B3', 4]),
  pulse(['C3 E3 B3', 2], [subdominant, 6]),
  pulse(['B2 E3 A3', 2], [dominant, 2], [subdominant, 4]),
  pulse([dominant, 4], [subdominant, 4]),
  '(B2 D#3 A3).4 r.4 r.2',
  pulse(openingChord),
  pulse(['F#3 A3 E4', 4], ['F3 A3 Eb4', 4]),
  pulse(['F3 Ab3 Eb4', 2], ['F3 Ab3 D4', 2], ['E3 G#3 D4', 4]),
  pulse(['E3 G3 D4', 2], ['E3 G3 C#4', 2], ['C#3 E3 A#3', 2], [subdominant, 2]),
  '(B1 B2).8 { dy f } ' + pulse(['A3 C4 F#4 A4', 3], ['G3 B3 D#4 F#4', 1], [openingChord[0], 3]),
  pulse(['A3 C4 E4', 2], ['A2', 1], ['E3 F#3 C4', 1], [heldDominant, 2], [subdominant, 2]),
  '(B2 E3 B3).8 { dy p } ' + pulse([heldDominant, 3], [subdominant, 4]),
  pulse([heldDominant, 4], ['B2 D#3 B3', 2], [dominant, 2]),
  pulse(['C3 G3', 4], ['C3 Bb3', 2], [subdominant, 2]),
  pulse(['B2 E3 A3', 2], ['B2 E3 G#3', 2], ['B2 E3 G3', 4]),
  '(Bb2 C3 G3).2 r.2 { fermata medium }',
  '(B1 B2).2 { dy pp } (B1 F#2 B2).2',
  '(E1 E2).2 { d fermata medium }'
];

export const preludeInEMinor = String.raw`\ks Eminor \ts (2 2)
  ${upper.join(' | ')} ||
  \staff { score } \tuning (none) \clef F4 ${lower.join(' | ')}`;
