import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { pianoKeysMarkup, pianoMarkup } from '../../shared/formats/piano.js';
import { displayPitch, getTonic } from '../../shared/formats/pitch.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { mountPianoStudy, pianoHands } from './piano-lesson-score.js';

const midiPitch = note => getTonic(note.slice(0, -1), Number(note.at(-1))).tonicPitch;

for (const diagram of document.querySelectorAll('[data-voicing]')) {
  const notes = diagram.dataset.voicing.split(' ');
  diagram.innerHTML = pianoKeysMarkup(notes.map((note, index) =>
    [midiPitch(note) - 48, 'keyboard-highlight', index === 0 ? 'start' : undefined]));
}
for (const diagram of document.querySelectorAll('[data-interval]')) {
  const [start, end] = diagram.dataset.interval.split(' ').map(Number);
  diagram.innerHTML = pianoMarkup(start, end);
}

function chordComparison(voicings) {
  const right = voicings.map(([label, pitches]) => `(${pitches}).2 { txt "${label}" }`).join(' | ');
  const left = voicings.map(([, , bass = 'C3']) => `${bass}.2`).join(' | ');
  return pianoHands(right, left, { meter: '2 4' });
}

mountPianoStudy('piano-chord-colors', [
  {
    label: '三和弦',
    description: '左手都弹 C3。右手分别用 E–G、E♭–G、E–G♯、E♭–G♭ 和上方 C 配成四类三和弦。',
    notes: chordComparison([
      ['C', 'C4 E4 G4'], ['Cm', 'C4 Eb4 G4'], ['C+', 'C4 E4 G#4'], ['C°', 'C4 Eb4 Gb4']
    ])
  },
  {
    label: '七和弦',
    description: '左手保持 C3。Cmaj7 和 C7 的右手只差 B 与 B♭，Cø7 和 C°7 只差 B♭ 与 B𝄫。',
    notes: chordComparison([
      ['Cmaj7', 'E4 G4 B4'], ['C7', 'E4 G4 Bb4'], ['Cm7', 'Eb4 G4 Bb4'],
      ['Cø7', 'Eb4 Gb4 Bb4'], ['C°7', 'Eb4 Gb4 Bbb4']
    ])
  },
  {
    label: '九和弦',
    description: '三种九和弦都有右手九音 D5。三音和七音分别决定它们是大九和弦、属九和弦或小九和弦。',
    notes: chordComparison([
      ['Cmaj9', 'E4 G4 B4 D5'], ['C9', 'E4 G4 Bb4 D5'], ['Cm9', 'Eb4 G4 Bb4 D5']
    ])
  },
  {
    label: '挂留与加九',
    description: 'Csus2、Csus4 的 E 被 D、F 替换；Cadd9 的 E 保留，并加入 D。三种写法的左手都保持 C3。',
    notes: chordComparison([
      ['C', 'C4 E4 G4'], ['Csus2', 'C4 D4 G4'], ['Csus4', 'C4 F4 G4'], ['Cadd9', 'E4 G4 D5']
    ])
  },
  {
    label: '斜线低音',
    description: '前三个版本的右手都是 C–E–G，左手走 C3–E3–G3。D/C 的右手换成 D–F♯–A，左手指定 C3。',
    notes: chordComparison([
      ['C', 'C4 E4 G4'], ['C/E', 'C4 E4 G4', 'E3'], ['C/G', 'C4 E4 G4', 'G3'], ['D/C', 'D4 F#4 A4']
    ])
  }
]);

const fixedPhrase = ['F4', 'A4', 'C5', 'A4', 'F4', 'A4', 'C5', 'F4'];
const majorSinging = ['do', 're', 'mi', 'sol'];
const solfegeModes = {
  c: {
    key: 'C', bass: 'C3', pitches: ['C4', 'D4', 'E4', 'G4', 'F4', 'E4', 'D4', 'C4'],
    movable: majorSinging, description: 'C 大调的实音和首调唱名都从 C 出发，左手保持主音 C3。'
  },
  d: {
    key: 'D', bass: 'D3', pitches: ['D4', 'E4', 'F#4', 'A4', 'G4', 'F#4', 'E4', 'D4'],
    movable: majorSinging, description: '主音上移到 D，第一小节的实际键位随之移动，首调唱名保持原样。'
  },
  bb: {
    key: 'Bb', bass: 'Bb3', pitches: ['Bb4', 'C5', 'D5', 'F5', 'Eb5', 'D5', 'C5', 'Bb4'],
    movable: majorSinging, description: '主音改作 B♭，第一拍的 do 对应黑键 B♭4。'
  },
  a: {
    key: 'Aminor', bass: 'A3', pitches: ['A4', 'B4', 'C5', 'E5', 'D5', 'C5', 'B4', 'A4'],
    movable: ['la', 'si', 'do', 'mi'], description: '在以 la 为小调主音的体系中，右手用 A 小调的 Ⅰ、Ⅱ、Ⅲ、Ⅴ 级，首音 A4 唱 la。'
  },
  'f-fixed': {
    key: 'F', bass: 'F3', pitches: fixedPhrase, movable: ['do', 'mi', 'sol', 'mi'],
    description: '右手保持 F–A–C 的旋律，用 F 作参照时，第一个 F4 唱 do。'
  },
  'c-fixed': {
    key: 'C', bass: 'C3', pitches: fixedPhrase, movable: ['fa', 'la', 'do', 'la'],
    description: '右手音高与 F 作 do 的版本完全相同。用 C 作参照时，同一个 F4 唱 fa，固定调唱名保持原样。'
  }
};
const fixedSinging = { C: 'do', D: 're', E: 'mi', F: 'fa', G: 'sol', A: 'la', B: 'si' };
const singingRows = document.querySelector('#piano-singing-map tbody').rows;

mountProgrammaticScore(document.getElementById('piano-solfege'), {
  lowestPitch: 48,
  octaves: 3,
  showDynamics: false,
  build({ key }) {
    const { key: signature, pitches, bass, movable, description } = solfegeModes[key];
    const firstBar = pitches.slice(0, 4);
    firstBar.forEach((note, beat) => {
      const alteration = note[1] === '#' ? '升 ' : note[1] === 'b' ? '降 ' : '';
      const row = singingRows[beat];
      row.querySelector('[data-note]').textContent = displayPitch(note);
      row.cells[1].textContent = alteration + fixedSinging[note[0]];
      row.cells[2].textContent = movable[beat];
    });
    const quarterNotes = notes => notes.map(note => `${note}.4`).join(' ');
    const right = `${quarterNotes(firstBar)} | ${quarterNotes(pitches.slice(4))}`;
    return { notes: pianoHands(right, `${bass}.1 | ${bass}.1`, { key: signature }),
      pitches: [bass, ...pitches].map(midiPitch), description };
  }
});

const melodyBars = [
  [['E4', 2], ['G4', 1], ['A4', 1], ['G4', 2], ['r', 2]],
  [['F4', 2], ['D4', 1], ['E4', 1], ['C4', 4]]
];
const filledBars = [
  [['C3', 2], ['(E3 G3)', 2], ['C3', 2], ['(E3 G3)', 2]],
  [['G2', 2], ['(D3 B3)', 2], ['C3', 2], ['(E3 G3)', 2]]
];
const durations = { 1: 8, 2: 4, 4: 2 };
function phraseFromBars(bars) {
  return bars.map(bar => bar.map(([pitch, length]) => `${pitch}.${durations[length]}`).join(' ')).join(' | ');
}
function timedEvents(bars, include) {
  let step = 0;
  const events = [];
  for (const [pitch, length] of bars.flat()) {
    if (include(pitch)) events.push({ step, length, label: pitch });
    step += length;
  }
  return events;
}

const melody = phraseFromBars(melodyBars);
const bass = 'C3.1 | G2.2 C3.2';
const silence = 'r.1 | r.1';

mountPianoStudy('piano-listening-layers', [
  {
    label: '右手旋律',
    description: '右手第一小节末拍休止，第二小节的 C4 持续两拍。旋律的停顿和归结都在右手。',
    notes: pianoHands(melody, silence)
  },
  {
    label: '左手低音',
    description: '左手由 C3 到 G2，再回 C3。第二小节一半换低音，形成清楚的回归。',
    notes: pianoHands(silence, bass)
  },
  {
    label: '旋律与低音',
    description: '右手第一小节的休止上，左手 C3 仍在保持。右手第二小节落在 C4 时，左手同时回到 C3。',
    notes: pianoHands(melody, bass)
  },
  {
    label: '加填充音',
    description: '左手也在低音之间加入和弦音。右手最后的 C4 继续延长，此时新起音来自左手伴奏。',
    notes: pianoHands(melody, phraseFromBars(filledBars))
  }
], 88);

mountArrangementGrid(document.querySelector('[data-listening-grid]'), {
  beats: 8, subdivisions: 2, beatsPerBar: 4, label: '旋律、低音和填充音的起音与持续时间',
  rows: [
    { label: '右手旋律', events: timedEvents(melodyBars, pitch => pitch !== 'r') },
    { label: '左手低音', events: timedEvents(filledBars, pitch => !pitch.startsWith('(')) },
    { label: '左手填充', events: timedEvents(filledBars, pitch => pitch.startsWith('(')) }
  ]
});
