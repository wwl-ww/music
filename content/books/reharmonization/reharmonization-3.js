import { mountReharmExamples } from './reharmonization-example.js';

function chord(symbol, notes, duration = 1, tie = []) {
  return { symbol, notes: notes.split(' '), duration, tie };
}

const dominantPedal = [
  chord('Fmaj7/G', 'G2 F3 A3 C4 E4'),
  chord('Em7/G', 'G2 E3 G3 B3 D4', 1, ['G2']),
  chord('Dm7/G', 'G2 D3 F3 A3 C4', 1, ['G2']),
  chord('Fm6/G', 'G2 F3 Ab3 C4 D4', 1, ['G2'])
];

mountReharmExamples([
  {
    id: 'technique-21',
    title: '副歌中的增和弦与半音收束',
    tempo: 102,
    melody: [
      ['G5:4', 'E5:4', 'C5:4', 'E5:4'],
      ['C5:4', 'A5:4', 'Ab5:4', 'F5:4'],
      ['G5:4', 'B5:4', 'A5:4', 'E5:4'],
      ['A5:4', 'C6:4', 'F5:2'],
      ['E5:2', 'C5:2']
    ],
    original: [['C:2', 'C7:2'], ['F:2', 'Fm:2'], ['Em:2', 'Am:2'], ['Dm:2', 'G7:2'], 'C'],
    revised: [
      ['C:2', 'Caug:2'],
      ['F:2', 'Bb7:2'],
      ['Em7:2', 'Am7:2'],
      [chord('Am7/D', 'D3 A3 C4 E4 G4', 2), chord('Db9', 'Db3 Ab3 Cb4 Eb4 F4', 2)],
      chord('C', 'C3 G3 C4 E4')
    ]
  },
  {
    id: 'technique-22',
    title: '主音低音与逐级上行',
    tempo: 94,
    melody: [
      ['G5:4', 'C6:4', 'G5:2'],
      ['E5:4', 'C5:4', 'E5:2'],
      ['A5:4', 'C6:4', 'F5:2'],
      ['G5:4', 'D5:4', 'G5:2'],
      ['C5:1']
    ],
    original: ['C', 'Am', 'F', 'G', 'C'],
    revised: [
      chord('G/C', 'C3 G3 B3 D4'),
      chord('C', 'C3 G3 C4 E4', 1, ['C3']),
      chord('F/C', 'C3 A3 C4 F4', 1, ['C3']),
      chord('G/C', 'C3 B3 D4 G4', 1, ['C3']),
      chord('C', 'C3 G3 C4 E4', 1, ['C3'])
    ]
  },
  {
    id: 'technique-23',
    title: '持续低音上的声位展开',
    tempo: 94,
    melody: [
      ['G5:4', 'E5:4', 'C5:2'],
      ['F5:4', 'A5:4', 'F5:2'],
      ['E5:4', 'G5:4', 'C6:2'],
      ['A5:4', 'F5:4', 'C5:2'],
      ['C5:1']
    ],
    original: ['C', 'F', 'C', 'F', 'C'],
    revised: [
      chord('Cadd9', 'C3 G3 C4 D4 E4'),
      chord('Dm/C', 'C3 A3 D4 F4', 1, ['C3']),
      chord('Cmaj7', 'C3 E3 B3 C4 G4', 1, ['C3']),
      chord('F/C', 'C3 F3 A3 C4 F4', 1, ['C3']),
      chord('C', 'C3 G3 C4 E4', 1, ['C3'])
    ]
  },
  {
    id: 'technique-24',
    title: '副歌中成对下移的和声单元',
    tempo: 108,
    melody: [
      ['A5:4', 'E5:4', 'E5:8', 'A5:8', 'E5:4'],
      ['G5:4', 'Bb5:4', 'E5:8', 'G5:8', 'E5:4'],
      ['F5:4', 'A5:4', 'D5:2'],
      ['E5:4', 'A5:4', 'E5:2']
    ],
    original: ['Am', 'C7', ['F:2', 'E7:2'], 'Am'],
    revised: [
      [chord('Am7', 'A2 E3 G3 C4', 2), chord('D9', 'D3 F#3 A3 C4 E4', 2)],
      [chord('Gm7', 'G2 D3 F3 Bb3', 2), chord('C9', 'C3 E3 G3 Bb3 D4', 2)],
      [chord('Fmaj7', 'F2 A3 C4 E4', 2), chord('Bb7', 'Bb2 F3 Ab3 D4', 2)],
      chord('Am9', 'A2 E3 G3 B3 C4')
    ]
  },
  {
    id: 'technique-25',
    title: '副属和弦、半音低音与共通音',
    tempo: 100,
    melody: [
      ['C5:4', 'G5:4', 'E5:4', 'G5:4'],
      ['A5:4', 'F5:4', 'Ab5:4', 'C6:4'],
      ['E5:4', 'G5:4', 'G5:2'],
      ['A5:4', 'F5:4', 'D6:4', 'G5:4'],
      ['E5:2', 'C5:2']
    ],
    original: ['C', ['F:2', 'Fm:2'], ['C:2', 'A7:2'], ['Dm:2', 'G:2'], 'C'],
    revised: [
      [chord('C', 'C3 G3 C4 E4', 2), chord('C7/E', 'E3 G3 Bb3 C4', 2)],
      [chord('F', 'F3 A3 C4 F4', 2), chord('Bb9', 'Bb2 F3 Ab3 C4 D4', 2)],
      [chord('Em7', 'E3 G3 B3 D4', 2), chord('Eb9', 'Eb3 Bb3 Db4 F4 G4', 2)],
      [chord('Dm9(add11)', 'D3 C4 F4 G4 E5', 2), chord('G13', 'G2 B3 D4 F4 E5', 2, ['E5'])],
      'C'
    ]
  },
  {
    id: 'technique-26',
    title: '二五一与两个三全音替代',
    tempo: 104,
    melody: [
      ['A5:4', 'F5:4', 'D5:4', 'G5:4'],
      ['E5:4', 'G5:4', 'E5:2'],
      ['C5:4', 'A5:4', 'Ab5:4', 'F5:4'],
      ['E5:2', 'C5:2']
    ],
    original: [['F:2', 'G:2'], ['C:2', 'C7:2'], ['F:2', 'Fm:2'], 'C'],
    revised: [
      ['Dm:2', 'G7:2'],
      [chord('C', 'C3 G3 C4 E4', 2), chord('F#7', 'F#3 A#3 C#4 E4', 2)],
      [chord('F', 'F3 C4 F4 A4', 2), chord('Db7', 'Db3 Ab3 Cb4 F4', 2)],
      chord('Cmaj9', 'C3 G3 B3 D4 E4')
    ]
  },
  {
    id: 'technique-27',
    title: '经过减和弦与压缩的二五终止',
    tempo: 84,
    melody: [
      ['C5:4', 'A5:4', 'G5:4', 'E5:4'],
      ['A5:2', 'F5:2'],
      ['E5:2', 'G5:4', 'E5:4'],
      ['C5:1']
    ],
    original: [['F:2', 'C:2'], ['Dm7:2', 'G7:2'], 'C', 'C'],
    revised: [
      [chord('F', 'F3 A3 C4 F4', 2), chord('C/E', 'E3 G3 C4 E4', 2)],
      [chord('Ebdim', 'Eb3 Gb3 A3', 2), chord('Dm7', 'D3 A3 C4 F4', 4), 'G7:4'],
      'C',
      'C'
    ]
  },
  {
    id: 'technique-28',
    title: '两次属替代与小大七和弦收尾',
    tempo: 82,
    melody: [
      ['E5:4', 'A5:4', 'G5:2'],
      ['F5:4', 'A5:4', 'D5:2'],
      ['E5:4', 'E5:8', 'A5:8', 'E5:2'],
      ['A5:1']
    ],
    original: [
      ['Am7:2', 'A7:2'], ['Dm7:2', 'E7:2'],
      chord('Am', 'A2 E3 A3 C4'),
      chord('Am', 'A2 E3 A3 C4', 1, ['A2', 'E3', 'A3', 'C4'])
    ],
    revised: [
      ['Am9:2', 'Eb9:2'],
      ['Dm9:2', chord('Bb7', 'Bb2 F3 Ab3 D4', 2)],
      chord('Am(maj9)', 'A2 E3 C4 G#4 B4'),
      chord('Am(maj9)', 'A2 E3 C4 G#4 B4', 1, ['A2', 'E3', 'C4', 'G#4', 'B4'])
    ]
  },
  {
    id: 'technique-29',
    title: '固定主音上的大下属、小下属与主和弦',
    tempo: 86,
    melody: [
      ['E5:4', 'G5:4', 'C6:2'],
      ['A5:4', 'F5:4', 'C5:2'],
      ['E5:4', 'G5:4', 'C6:2'],
      ['G5:2', 'C5:2']
    ],
    original: ['C', 'F', 'C', 'C'],
    revised: [
      [chord('C', 'C3 E3 C4 G4', 2), chord('C7', 'C3 E3 G3 C4 Bb4', 2, ['C3'])],
      [chord('F/C', 'C3 F3 C4 A4', 2, ['C3']), chord('Fm/C', 'C3 F3 C4 Ab4', 2, ['C3'])],
      chord('C', 'C3 E3 C4 G4', 1, ['C3']),
      chord('C', 'C3 E3 C4 G4', 1, ['C3', 'E3', 'C4', 'G4'])
    ]
  },
  {
    id: 'technique-30',
    title: '属持续低音与两种尾奏落点',
    tempo: 86,
    melody: [
      ['A5:4', 'E5:4', 'C5:2'],
      ['G5:4', 'B5:4', 'E5:2'],
      ['C5:4', 'F5:4', 'D5:2'],
      ['D5:4', 'G5:4', 'F5:2'],
      ['E5:1']
    ],
    original: ['Fmaj7', 'Em7', 'Dm7', 'G7', 'Cmaj7'],
    revised: [...dominantPedal, 'Cmaj7'],
    variants: [{ label: '转色收尾', harmony: [...dominantPedal, chord('Amaj7', 'A2 E3 G#3 C#4')] }]
  },
  {
    id: 'technique-31',
    title: '小调尾奏的同主音大调收束',
    tempo: 90,
    melody: [
      ['C5:4', 'E5:4', 'A5:4', 'E5:4'],
      ['F5:4', 'A5:4', 'D5:2'],
      ['E5:4', 'A5:4', 'E5:2'],
      ['A5:1']
    ],
    original: ['Am', 'Dm', 'Am', 'Am'],
    revised: [['Am:2', 'A7:2'], ['Dm:2', 'G:2'], 'A', 'A']
  },
  {
    id: 'technique-32',
    title: '降七级属七通往大调主和弦',
    tempo: 90,
    melody: [
      ['A5:4', 'F5:4', 'D5:2'],
      ['E5:4', 'A5:4', 'G5:2'],
      ['A5:4', 'F5:4', 'B5:4', 'D5:4'],
      ['E5:2', 'A5:2']
    ],
    original: [['Dm:2', 'E7:2'], ['Am:2', 'A7:2'], ['Dm:2', 'E7:2'], 'Am'],
    revised: [
      ['Dm:2', chord('Bb7', 'Bb2 D3 F3 Bb3 Ab4', 2)],
      [chord('Am9', 'A2 E3 G3 C4 B4', 2), 'Eb9:2'],
      ['Dm9:2', chord('G7', 'G2 B3 D4 F4', 2)],
      chord('Amaj7', 'A2 G#3 C#4 E4')
    ]
  },
  {
    id: 'technique-33',
    title: '半减七和弦铺垫大调收束',
    tempo: 88,
    melody: [
      ['F5:4', 'A5:4', 'B5:4', 'E5:4'],
      ['C5:4', 'E5:4', 'A5:2'],
      ['F5:4', 'A5:4', 'D5:2'],
      ['A5:2', 'E5:2']
    ],
    original: [['Dm:2', 'E7:2'], ['Am:2', 'A7:2'], ['Dm:2', 'E7:2'], 'Am'],
    revised: [
      [chord('Bm7b5', 'B2 F3 A3 D4', 2), 'E7:2'],
      ['Am:2', chord('F#m7b5', 'F#3 A3 C4 E4', 2)],
      ['Fmaj7:2', 'Bb7:2'],
      'Amaj7'
    ]
  },
  {
    id: 'technique-34',
    title: '两个大七和弦后的 a 小调收束',
    tempo: 86,
    melody: [
      ['A5:4', 'F5:4', 'D5:4', 'B5:4'],
      ['C6:4', 'A5:4', 'E5:4', 'A5:4'],
      ['C6:4', 'A5:4', 'D5:2'],
      ['E5:2', 'A5:2']
    ],
    original: [['F:2', 'E7:2'], 'Am', ['F:2', 'E7:2'], 'Am'],
    revised: [
      [chord('Dm9', 'D3 F3 A3 C4 E4', 2), chord('E7(b9)', 'E3 G#3 B3 D4 F4', 2)],
      [chord('Fmaj7', 'F3 A3 C4 E4', 2), chord('F#m7b5', 'F#3 A3 C4 E4', 2, ['A3', 'C4', 'E4'])],
      [chord('Fmaj7', 'F3 A3 C4 E4', 2), chord('Bbmaj7', 'Bb2 F3 A3 D4', 2)],
      chord('Am(maj9)', 'A2 E3 C4 G#4 B4')
    ]
  },
  {
    id: 'technique-35',
    title: '半音低音与共同最高音的尾奏',
    tempo: 90,
    melody: [
      ['A5:4', 'D5:4', 'E5:4', 'D5:4'],
      ['E5:4', 'A5:4', 'C5:2'],
      ['C5:4', 'A5:4', 'E5:4', 'B5:4'],
      ['E5:2', 'A5:2']
    ],
    original: [
      ['Dm:2', 'E7:2'], ['Am:2', chord('F#m7b5', 'F#3 A3 C4 E4', 2)],
      ['F:2', 'Em:2'], 'Am'
    ],
    revised: [
      [chord('Bm7b5', 'B2 F3 A3 D4', 2), chord('Bb9(#11)', 'Bb2 Ab3 C4 D4 E4 F4', 2)],
      [chord('Am9', 'A2 E3 G3 B3 C4', 2), chord('Ab9', 'Ab2 Eb3 Gb3 Bb3 C4', 2)],
      [chord('Fmaj7/G', 'G2 F3 A3 C4 E4', 2), chord('G13', 'G2 F3 B3 D4 E4', 2, ['G2', 'E4'])],
      chord('A', 'A2 E3 A3 C#4')
    ]
  }
]);
