import { mountFretboard } from '../../shared/formats/fretboard.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { buildMajorScale } from '../../shared/formats/scales.js';
import { mountScoreChoiceButtons } from '../../shared/formats/score-choice-buttons.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const pattern = document.querySelector('#rock-major-pattern');
mountProgrammaticScore(pattern, {
  lowestPitch: 60,
  octaves: 2,
  build({ tonic }) {
    return {
      ...buildMajorScale({ tonic, type: 'natural', direction: 'up' }),
      summary: tonic === 'D'
        ? 'D–E–F♯–G　｜　A–B–C♯–D。半音落在 F♯–G 与 C♯–D。'
        : 'C–D–E–F　｜　G–A–B–C。半音落在 E–F 与 B–C。'
    };
  }
});

const lowerNotes = ['C', 'D', 'E', 'F'];
const upperNotes = ['G', 'A', 'B', 'C'];
const fretOffsets = [0, 2, 4, 5];

function tetrachord(string, fret, labels, variant) {
  return labels.map((label, index) => ({
    string,
    fret: fret + fretOffsets[index],
    label,
    variant: index === 0 ? variant : undefined
  }));
}

function bindFretboardChoices(container, items) {
  const choices = container.querySelector('[data-fretboard-choices]');
  const figure = container.querySelector('[data-fretboard-figure]');
  const description = container.querySelector('[data-fretboard-description]');
  mountScoreChoiceButtons(choices, items, ({ board, cue }) => {
    mountFretboard(figure, board);
    description.textContent = cue;
  });
}

bindFretboardChoices(document.querySelector('#rock-four-note-fretboard'), [
  {
    label: '吉他',
    board: {
      startFret: 3,
      endFret: 10,
      markers: [...tetrachord(5, 3, lowerNotes, 'root'), ...tetrachord(4, 5, upperNotes, 'accent')]
    },
    cue: '第 5 弦第 3 品起于 C3，第 4 弦第 5 品起于 G3。每组依次向高品跨两品、两品、一品。'
  },
  {
    label: '四弦贝斯',
    board: {
      tuning: ['G2', 'D2', 'A1', 'E1'],
      startFret: 3,
      endFret: 10,
      markers: [...tetrachord(3, 3, lowerNotes, 'root'), ...tetrachord(2, 5, upperNotes, 'accent')]
    },
    cue: '第 3 弦第 3 品起于 C2，第 2 弦第 5 品起于 G2。相应品位的音比吉他低八度。'
  },
  {
    label: '尤克里里',
    board: {
      tuning: ['A4', 'E4', 'C4', 'G4'],
      endFret: 5,
      markers: [...tetrachord(3, 0, lowerNotes, 'root'), ...tetrachord(4, 0, upperNotes, 'accent')]
    },
    cue: '高 G 调弦时，两组从第 3 弦空弦 C4 与第 4 弦空弦 G4 开始。弦号较大的第 4 弦反而更高。'
  }
]);

bindFretboardChoices(document.querySelector('#rock-fret-shift'), [
  {
    label: 'C 大调',
    board: {
      startFret: 3,
      endFret: 12,
      markers: [...tetrachord(5, 3, lowerNotes, 'root'), ...tetrachord(4, 5, upperNotes, 'accent')]
    },
    cue: '第 5 弦第 3 品是第 1 级 C。第 4 弦第 7 品是第 6 级 A。'
  },
  {
    label: 'D 大调',
    board: {
      startFret: 3,
      endFret: 12,
      markers: [
        ...tetrachord(5, 5, ['D', 'E', 'F♯', 'G'], 'root'),
        ...tetrachord(4, 7, ['A', 'B', 'C♯', 'D'], 'accent')
      ]
    },
    cue: '每个音沿原弦升两品。第 1 级移到第 5 弦第 5 品的 D，第 6 级移到第 4 弦第 9 品的 B。'
  }
]);

const c = { string: 5, fret: 3 };
const lowG = { string: 6, fret: 3 };
const highG = { string: 4, fret: 5 };
mountFretboard(document.querySelector('#rock-fret-fifths'), {
  startFret: 2,
  endFret: 6,
  caption: '吉他上同一个 C 的两种 G 去向',
  markers: [
    { ...c, label: 'C3', variant: 'root' },
    { ...lowG, label: 'G2', variant: 'accent' },
    { ...highG, label: 'G3', variant: 'accent' }
  ],
  connections: [{ from: c, to: lowG }, { from: c, to: highG }]
});

function bassNotation(firstBar) {
  return String.raw`\ks C \ts (4 4) (C4 E4 G4).1 | (B3 D4 G4).1 ||
    \staff { score } \tuning (none) \clef F4 ${firstBar} | G2.1`;
}

mountScoreWritingSteps(document.querySelector('#rock-bass-motion'), {
  score: { tempo: 84 },
  steps: [
    {
      label: '根音跳进',
      notes: bassNotation('C3.1'),
      description: '上声部由 C 和弦换到 G 和弦。低音只在换和弦时改变，从 C 下行纯四度跳到 G。'
    },
    {
      label: '调内级进',
      notes: bassNotation('C3.4 B2.4 A2.2'),
      description: '和弦与换和弦的时刻保持原样。B、A 填在 C 到 G 之间，把一处跳进接成调内下行。'
    },
    {
      label: '半音连接',
      notes: bassNotation('C3.8 B2.8 Bb2.8 A2.8 Ab2.2'),
      description: '上声部仍然相同。低音加入 B♭ 与 A♭，从 C 到 G 的每一步都只下行一个半音。'
    }
  ]
});
