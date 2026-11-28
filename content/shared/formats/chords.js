import { displayPitch, getTonic, spellNote } from './pitch.js';

export const chordRoots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const chordTypes = {
  major: ['大三和弦', [0, 4, 7]],
  minor: ['小三和弦', [0, 3, 7]],
  augmented: ['增三和弦', [0, 4, 8]],
  diminished: ['减三和弦', [0, 3, 6]],
  dominant: ['大小七和弦', [0, 4, 7, 10]],
  minor7: ['小七和弦', [0, 3, 7, 10]],
  halfDim: ['半减七和弦', [0, 3, 6, 10]],
  dim7: ['减七和弦', [0, 3, 6, 9]],
  major7: ['大七和弦', [0, 4, 7, 11]],
  augMajor7: ['增大七和弦', [0, 4, 8, 11]],
  minorMajor7: ['小大七和弦', [0, 3, 7, 11]]
};
export const chordPositions = ['原位', '第一转位', '第二转位', '第三转位'];
export const chordBassRoles = ['根音', '三音', '五音', '七音'];

function moveOctave(note, offset) {
  return { ...note, pitch: note.pitch + 12 * offset, octave: note.octave + offset };
}

export function invertChordNotes(notes, inversion) {
  return [...notes.slice(inversion), ...notes.slice(0, inversion).map(note => moveOctave(note, 1))];
}

export function hasSeventh(type) {
  return chordTypes[type][1].length === 4;
}

function noteNames(notes) {
  return notes.map(({ name }) => displayPitch(name)).join('–');
}

function score(chords, summary, signature = 'C') {
  const measures = chords.map(chord => `(${chord.map(({ name, octave }) => name + octave).join(' ')}).2`);
  return {
    notes: String.raw`\ks ${signature} \ts (2 4) ${measures.join(' | ')}`,
    pitches: chords.flat().map(({ pitch }) => pitch),
    description: `${summary}。${chords.map(noteNames).join(' → ')}`,
    summary
  };
}

export function buildChord({ tonic, type, inversion }) {
  const [quality, steps] = chordTypes[type];
  const root = getTonic(tonic);
  const bass = Number(inversion);
  const voiced = invertChordNotes(steps.map((step, index) => spellNote(root, index * 2, root.tonicPitch + step)), bass);
  const notes = voiced.at(-1).pitch >= 84 ? voiced.map(note => moveOctave(note, -1)) : voiced;
  const summary = `${displayPitch(tonic)} ${quality} · ${chordPositions[bass]} · 低音 ${displayPitch(notes[0].name)}（${chordBassRoles[bass]}）`;
  return score([notes], summary);
}

const diatonicScales = {
  major: { steps: [0, 2, 4, 5, 7, 9, 11], signature: 'C' },
  harmonicMajor: { steps: [0, 2, 4, 5, 7, 8, 11], signature: 'C' },
  minor: { steps: [0, 2, 3, 5, 7, 8, 10], signature: 'Cminor' },
  harmonicMinor: { steps: [0, 2, 3, 5, 7, 8, 11], signature: 'Cminor' }
};
const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export function buildDiatonicTriad({ scale, degree }) {
  const { steps, signature } = diatonicScales[scale];
  const start = Number(degree);
  const root = getTonic('C');
  const notes = [start, start + 2, start + 4].map(index => {
    const pitch = root.tonicPitch + steps[index % 7] + 12 * Math.floor(index / 7);
    return spellNote(root, index, pitch);
  });
  const intervals = notes.map(note => note.pitch - notes[0].pitch);
  const [kind, [quality]] = Object.entries(chordTypes).find(([, [, candidate]]) =>
    candidate.length === intervals.length && candidate.every((pitch, index) => pitch === intervals[index]));
  const lowerCase = kind === 'minor' || kind === 'diminished';
  const prefix = scale === 'harmonicMajor' && start === 5 ? '♭' : '';
  const suffix = { augmented: '+', diminished: '°' }[kind] ?? '';
  const numeral = prefix + (lowerCase ? numerals[start].toLowerCase() : numerals[start]) + suffix;
  return score([notes], `${numeral} · ${quality} · ${noteNames(notes)}`, signature);
}

// Each source voice is paired with its destination in the same position.
const resolutions = {
  dominant: [
    [['G3', 'B3', 'F4', 'D5'], ['C3', 'C4', 'E4', 'C5']],
    [['B3', 'F4', 'G4', 'D5'], ['C4', 'E4', 'G4', 'C5']],
    [['D4', 'F4', 'G4', 'B4'], ['C4', 'E4', 'G4', 'C5']],
    [['F3', 'G3', 'B3', 'D5'], ['E3', 'G3', 'C4', 'C5']]
  ],
  leading: [
    [['B3', 'F4', 'A4', 'D5'], ['C4', 'E4', 'G4', 'E5']],
    [['D4', 'A4', 'B4', 'F5'], ['E4', 'G4', 'C5', 'E5']],
    [['F3', 'A3', 'B3', 'D4'], ['E3', 'G3', 'C4', 'E4']],
    [['A3', 'B3', 'D4', 'F5'], ['G3', 'C4', 'E4', 'E5']]
  ]
};

export function buildResolution({ scale, family, inversion }) {
  const position = Number(inversion);
  const [source, destination] = resolutions[family][position];
  const minor = scale === 'minor';
  const chords = [
    source.map(note => minor && family === 'leading' ? note.replace(/^A/, 'Ab') : note),
    destination.map(note => minor ? note.replace(/^E/, 'Eb') : note)
  ].map(chord => chord.map(note => {
    const name = note.slice(0, -1);
    const octave = Number(note.at(-1));
    return { name, octave, pitch: getTonic(name, octave).tonicPitch };
  }));
  const label = family === 'dominant' ? '属七' : '导七';
  const summary = `${label}和弦${positions[position]} → 主和弦`;
  return score(chords, summary, minor ? 'Cminor' : 'C');
}
