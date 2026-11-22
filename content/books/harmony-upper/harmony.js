import { mountScore } from '../../shared/formats/score.js';
import { fourPartScore } from '../../shared/formats/harmony-score.js';
import { harmonizedMelodies, redistributionStudies } from './harmony-studies.js';

function chordScore(chords) {
  return String.raw`\ks C \ts (2 4) ${chords.map(chord => `(${chord}).2`).join(' | ')}`;
}

// Each column stays assigned to the same voice, from bass to soprano.
function fourParts(chords, key = 'C', carryCommon = false) {
  const columns = chords.map(chord => chord.split(' '));
  const voices = Array.from({ length: 4 }, (_, index) =>
    columns.map((column, step) => {
      const note = column[index];
      const tied = carryCommon && index > 0 && columns[step - 1]?.[index] === note;
      return `${note}${tied ? '{t}' : ''}.2`;
    }).join(' | '));
  return fourPartScore(voices, key, '2 4');
}

const tonic = 'C3 G3 C4 E4';
const subdominant = 'F2 A3 C4 F4';
const dominant = 'G2 G3 B3 D4';
const openDominant = 'G2 G3 D4 B4';
const openSubdominant = 'F2 F3 C4 A4';
const thirdLeapPatterns = {
  C: {
    dominant: { soprano: [tonic, openDominant], tenor: ['C3 E3 C4 G4', 'G2 B3 D4 G4'] },
    subdominant: { soprano: [tonic, openSubdominant], tenor: ['C3 E3 C4 G4', subdominant] }
  },
  Cminor: {
    dominant: {
      soprano: ['C3 C4 G4 Eb5', 'G2 D4 G4 B4'],
      tenor: ['C3 Eb4 G4 C5', 'G2 B3 G4 D5']
    },
    subdominant: {
      soprano: ['C3 G3 C4 Eb4', 'F2 F3 C4 Ab4'],
      tenor: ['C3 Eb3 C4 G4', 'F2 Ab3 C4 F4']
    }
  }
};
const tonicVoicings = ['C3 E4 G4 C5', tonic, 'C3 C4 E4 G4', 'C3 G3 E4 C5', 'C3 C4 G4 E5', 'C3 E3 C4 G4'];
const subdominantVoicings = ['F2 A3 C4 F4', 'F2 C4 F4 A4', 'F2 F4 A4 C5', 'F2 C4 A4 F5', 'F2 F3 C4 A4', 'F2 A3 F4 C5'];
const smoothConnections = {
  tonicDominant: {
    start: tonicVoicings, common: 'G',
    harmonic: ['G2 D4 G4 B4', dominant, 'G2 B3 D4 G4', openDominant, 'G2 B3 G4 D5', 'G2 D3 B3 G4'],
    melodic: ['G2 G4 B4 D5', 'G2 B3 D4 G4', 'G2 D4 G4 B4', 'G2 B3 G4 D5', 'G2 D4 B4 G5', openDominant]
  },
  tonicSubdominant: {
    start: tonicVoicings, common: 'C',
    harmonic: ['F3 F4 A4 C5', 'F3 A3 C4 F4', 'F3 C4 F4 A4', 'F3 A3 F4 C5', 'F3 C4 A4 F5', openSubdominant],
    melodic: ['F3 C4 F4 A4', 'F3 F3 A3 C4', 'F3 A3 C4 F4', 'F3 F3 C4 A4', 'F3 A3 F4 C5', 'F2 C3 A3 F4']
  },
  subdominantDominant: {
    start: subdominantVoicings,
    melodic: [dominant, 'G2 B3 D4 G4', 'G2 D4 G4 B4', 'G2 B3 G4 D5', 'G2 D3 B3 G4', openDominant]
  }
};

const examples = {
  'root-order': chordScore(['C4 E4 G4', 'E4 G4 C5', 'G4 C5 E5']),
  'triad-quality': chordScore(['C4 E4 G4', 'C4 Eb4 G4', 'C4 Eb4 Gb4', 'C4 E4 G#4']),
  'diatonic-sevenths': chordScore([
    'C4 E4 G4 B4', 'D4 F4 A4 C5', 'E4 G4 B4 D5', 'F4 A4 C5 E5',
    'G4 B4 D5 F5', 'A4 C5 E5 G5', 'B4 D5 F5 A5'
  ]),
  'dominant-ninths': chordScore(['G3 B3 D4 F4 A4', 'E3 G#3 B3 D4 F4']),
  doubling: fourParts([tonic, 'C3 C4 E4 C5']),
  connection: fourParts([tonic, dominant, tonic, 'G2 B3 D4 G4'], 'C', true),
  redistribution: fourParts([tonic, 'C3 E3 C4 G4', 'C3 G3 E4 C5']),
  'sixth-redistribution': fourParts([tonic, 'C3 G3 E4 C5']),
  'harmonized-g-minor': fourPartScore(harmonizedMelodies.gMinor, 'Gminor', '3 4'),
  'harmonized-a-flat': fourPartScore(harmonizedMelodies.aFlat, 'Ab', '2 4'),
  'flexible-redistribution': fourPartScore(redistributionStudies.flexible, 'C', '2 2')
};

const motionErrors = {
  parallelOctave: [fourParts(['F2 A3 C4 F4', 'G2 B3 D4 G4']), '低音 F–G 和高音 F–G 同向，两个和弦中的外声部都构成八度类音程。'],
  parallelFifth: [fourParts([tonic, 'D3 A3 D4 F4']), '低音 C–D 和次中音 G–A 同向，从纯五度到纯五度。'],
  contraryOctave: [fourParts(['C3 E3 G3 C4', 'A2 E3 C4 A4']), '低音 C 下行至 A，高音 C 上行至 A，从八度扩大为十五度。'],
  contraryFifth: [fourParts(['C3 G3 G4 E5', 'Bb2 F4 Bb4 D5']), '低音 C 下行至 B♭，次中音 G 上行至 F，从五度扩大为十二度。'],
  hiddenOctave: [fourParts(['C3 C4 E4 G4', 'D3 A3 F4 D5']), '低音上行二度，高音上跳五度，外声部同向进入八度类音程。'],
  hiddenFifth: [fourParts(['C3 G3 C4 E4', 'D3 A3 F4 A4']), '低音 C–D 与高音 E–A 同向，落在纯五度的复音程。'],
  crossing: [fourParts([tonic, 'G2 G3 D4 B3']), '第二个和弦中，中音 D4 高于高音声部的 B3。'],
  overlap: [fourParts([tonic, 'F3 C4 F4 A4']), '两个和弦内的声部顺序都正确，但第二个和弦的中音 F4 越过了第一个和弦的高音 E4。']
};

const comparisons = {
  voicings: {
    close: fourParts(tonicVoicings.slice(0, 3)),
    open: fourParts(tonicVoicings.slice(3))
  },
  functions: {
    authenticOpen: fourParts([tonic, dominant]),
    plagalOpen: fourParts([tonic, subdominant]),
    compoundOpen: fourParts([tonic, subdominant, dominant]),
    authenticClose: fourParts([dominant, tonic]),
    plagalClose: fourParts([subdominant, tonic]),
    compoundClose: fourParts([subdominant, dominant, tonic])
  },
  'minor-leap-interval': {
    tenor: fourParts(['A2 C4 E4 A4', 'E3 G#3 E4 B4'], 'Aminor'),
    'tenor-augmented': fourParts(['A2 C4 A4 E5', 'E3 G#4 B4 E5'], 'Aminor')
  },
  'redistribution-study': {
    clear: fourPartScore(redistributionStudies.clear, 'C', '4 4'),
    flawed: fourPartScore(redistributionStudies.flawed, 'C', '4 4')
  }
};

function attach(figure, notes) {
  const container = document.createElement('div');
  figure.append(container);
  return mountScore(container, { notation: 'staff', tempo: 100, notes });
}

const leapDemo = document.querySelector('[data-harmony-leaps]');
if (leapDemo) {
  const form = leapDemo.querySelector('form');
  const { key, pair, voice, direction } = form.elements;
  let player;

  function updateLeap() {
    const pattern = thirdLeapPatterns[key.value][pair.value][voice.value];
    const chords = direction.value === 'return' ? pattern.toReversed() : pattern;
    const notation = fourParts(chords, key.value, true);
    if (player) player.setNotes(notation);
    else player = attach(leapDemo.querySelector('figure'), notation);
  }

  form.addEventListener('change', updateLeap);
  updateLeap();
}

for (const figure of document.querySelectorAll('[data-harmony]')) {
  attach(figure, examples[figure.dataset.harmony]);
}

for (const example of document.querySelectorAll('[data-harmony-switch]')) {
  const select = example.querySelector('select');
  const scores = comparisons[example.dataset.harmonySwitch];
  const player = attach(example.querySelector('figure'), scores[select.value]);
  select.addEventListener('change', () => player.setNotes(scores[select.value]));
}

const errorDemo = document.querySelector('[data-harmony-errors]');
if (errorDemo) {
  const select = errorDemo.querySelector('select');
  const caption = errorDemo.querySelector('output');
  const player = attach(errorDemo.querySelector('figure'), motionErrors[select.value][0]);
  function updateError() {
    const [score, finding] = motionErrors[select.value];
    player.setNotes(score);
    caption.textContent = finding;
  }
  select.addEventListener('change', updateError);
  caption.textContent = motionErrors[select.value][1];
}

const connectionDemo = document.querySelector('[data-harmony-connections]');
if (connectionDemo) {
  const form = connectionDemo.querySelector('form');
  const { pair, method, voicing, key } = form.elements;
  const summary = connectionDemo.querySelector('output');
  let player;

  function updateConnection() {
    const example = smoothConnections[pair.value];
    method.options[0].disabled = !example.harmonic;
    if (!example.harmonic) method.value = 'melodic';
    const index = Number(voicing.value);
    let source = example.start[index];
    let destination = example[method.value][index];
    if (key.value === 'Cminor') {
      source = source.replaceAll('E', 'Eb').replaceAll('A', 'Ab');
      if (pair.value === 'tonicSubdominant') destination = destination.replaceAll('A', 'Ab');
    }
    const notation = fourParts([source, destination], key.value, method.value === 'harmonic');
    if (player) player.setNotes(notation);
    else player = attach(connectionDemo.querySelector('figure'), notation);
    summary.textContent = example.common
      ? `共同音 ${example.common}${method.value === 'harmonic' ? ' 保留在原声部。' : ' 转交其他声部。'}`
      : '两个和弦没有共同音。';
  }

  form.addEventListener('change', updateConnection);
  updateConnection();
}
