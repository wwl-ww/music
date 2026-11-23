function transpose(music, semitones) {
  // These examples rise by whole tones and use major-key spellings.
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return music.replace(/([A-G]#?)(\d)/g, (_, note, octave) => {
    const pitch = notes.indexOf(note) + semitones;
    return notes[pitch % 12] + (Number(octave) + Math.floor(pitch / 12));
  });
}

const joinBars = bars => bars.join(' | ');
const sequenceSteps = [0, 2, 4];
const majorHeadAndTail = 'E5.4 G5.4 B4.8 C5.8 E5.4 | G5.4 E5.4 C5.4 r.4';
const majorDelayed = 'r.4 E4.4 G4.4 B3.8 C4.8 | E4.4 G4.4 E4.4 C4.4';
const movingLine = 'E4.8 F4.8 G4.4 B4.4 C5.4';
const supportingLine = 'C4.4 E4.4 G4.4 C4.4';

const head = 'C4.8 D4.8 E4.4 G4.2';
const nextHead = 'D4.8 E4.8 F4.4 A4.2';
const tail = 'A3.2 E4.2';
const octaveUp = music => music.replace(/([A-G][#b]?)(\d)(?=\.)/g, (_, note, octave) => note + (Number(octave) + 1));

export const sequenceDraft = {
  clefs: ['G2', 'G2', 'G2'],
  voices: [
    octaveUp(head).replace('C5.8', 'C5.8 { txt "当前应句" }'),
    tail.replace('A3.2', 'A3.2 { txt "原型尾句" }'),
    nextHead.replace('D4.8', 'D4.8 { txt "辅助谱表" }')
  ]
};

const a = ['E3.8 F3.8 G3.4 E3.2', 'G3.8 F3.8 E3.4 G3.2', 'E3.8 D3.8 E3.4 C3.2', 'C3.1'];
const b = ['C3.2 E3.4 C3.4', 'C3.2 G2.4 E3.4', 'C3.2 E3.4 G2.4', 'C3.1'];
function labelBars(bars, label) {
  return bars.map((bar, index) => bar.replace(/^\S+/, '$& { txt "' + label + (index + 1) + '" }'));
}

function doubleCanon(introduceBAt) {
  const rests = Array(introduceBAt).fill('r.1');
  const firstA = labelBars(a, 'A');
  const answerA = labelBars(a.map(octaveUp).map(octaveUp), 'A′');
  const firstB = labelBars(b, 'B');
  const answerB = labelBars(b.map(octaveUp), 'B′');
  return [
    ['r.1', ...answerA, ...rests],
    [...rests, 'r.1', ...answerB],
    [...firstA, 'r.1', ...rests],
    [...rests, ...firstB, 'r.1']
  ].map(joinBars);
}

const theme4 = 'C4.8 D4.8 E4.4 G4.2';
const threeImitations = [
  `${octaveUp(theme4).replace('C5.8', 'C5.8 { txt "起句" }')} | E5.2 G5.2 | E5.2 G5.2 | C5.1`,
  `r.1 | ${theme4.replace('C4.8', 'C4.8 { txt "第一应句" }')} | E4.2 E4.2 | E4.1`,
  'r.1 | r.1 | C3.8 { txt "第二应句" } D3.8 E3.4 G3.2 | C3.1'
];
const freeLine = 'E6.2 { txt "自由" } E6.4 G6.4 | E6.2 E6.4 G6.4 | E6.2 G6.4 E6.4 | C6.1';
const freeBass = freeLine.replace(/([A-G])6(?=\.)/g, (_, note) => note + '2');

export const combinationScores = {
  'bitonal-sequence-score': {
    original: {
      meter: '2 4', key: 'F', clefs: ['G2', 'G2'],
      voices: [
        'r.8 A4.8 { txt "a 小调" } C5.8 Bb4.8 | A4.4 G#4.4 | r.8 G4.8 { txt "g 小调" } Bb4.8 A4.8 | G4.4 F#4.4 | r.8 F#4.8 A4.8 G4.8',
        'r.2 | r.8 D4.8 { txt "d 小调" } F4.8 E4.8 | D4.4 C#4.4 | r.8 C4.8 { txt "c 小调" } Eb4.8 D4.8 | C4.4 B3.4'
      ],
      cue: '上方第 3 小节先换中心，下方第 4 小节才跟进。第 3 小节同时展开新的 g 小调起句和原来的 d 小调应句。'
    }
  },
  'canonic-draft-result': {
    original: {
      clefs: ['G2', 'G2'],
      voices: [
        joinBars(['r.1', octaveUp(head), octaveUp(tail).replace('A4.2', 'A4.2 { txt "复制尾句" }')]),
        joinBars([head, tail.replace('A3.2', 'A3.2 { txt "尾句" }'), nextHead.replace('D4.8', 'D4.8 { txt "下一组" }')])
      ],
      cue: '同一尾句先在低声部唱，配上方当前的应句。晚一小节在上方重复时，改为配下方新一组的题头。'
    }
  },
  'double-imitation': {
    contrast: {
      voices: doubleCanon(0),
      cue: '第 1 小节并置 A₁ 与 B₁。第 2 小节，两条应句同时出现。第 3、4 小节，应句继续复制各自声部前一小节的旋律。'
    },
    imitation: {
      voices: doubleCanon(1),
      cue: 'A′₁ 在第 2 小节开始，同时引入 B₁。B′₁ 到第 3 小节才进入。此后两对应句都继续追唱各自前一小节的旋律。'
    }
  },
  'imitation-free-four': {
    original: {
      voices: [freeLine, ...threeImitations],
      cue: '自由声部在最上方。下方三部的起句、第一应句和第二应句分别从第 1、2、3 小节进入。'
    },
    swapped: {
      voices: [...threeImitations, freeBass],
      cue: '原来最高的自由旋律移到最下面，三次模仿进入依然发生在第 1、2、3 小节。第 3 小节首拍的低音从 C 换成 E。'
    }
  }
};

export const addedSequenceScores = {
  'canonic-modulating': {
    voices: [
      joinBars(sequenceSteps.map(step => transpose(majorHeadAndTail, step))),
      joinBars(sequenceSteps.map(step => transpose(majorDelayed, step)))
    ],
    clefs: ['G2', 'G2'],
    cue: '应句低八度、晚一拍进入。每两小节把整组升高大二度，依次用 B–C、C♯–D、D♯–E 引出新主音，低声部在各组末拍落在该音上。'
  },
  'invertible-modulating': {
    voices: [
      joinBars([movingLine, transpose(movingLine, 2), octaveUp(transpose(supportingLine, 4))]),
      joinBars([supportingLine, transpose(supportingLine, 2), transpose(movingLine, 4)])
    ],
    clefs: ['G2', 'G2'],
    cue: '同一对旋律依次落在 C、D、E。第三组把原来在下方的长线提高一个八度，短音型转到下方，仍用 D♯–E 收束。'
  }
};
