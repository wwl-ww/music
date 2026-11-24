import { mountReharmExamples } from './reharmonization-example.js';

function voicing(symbol, notes, duration = 1, tiedBass) {
  return { symbol, notes: notes.split(' '), duration, ...(tiedBass ? { tie: [tiedBass] } : {}) };
}

const cOverD = voicing('C/D', 'D3 C4 E4 G4');
const fOverG = voicing('F/G', 'G2 F3 A3 C4');

mountReharmExamples([
  {
    id: 'technique-11',
    title: '固定 F 低音的四小节连接',
    melody: [
      ['A4:4', 'C5:8', 'A4:8', 'G4:4', 'A4:4'],
      ['B4:4', 'D5:4', 'A4:8', 'B4:8', 'G4:4'],
      ['E5:4', 'D5:8', 'C5:8', 'G4:4', 'E5:4'],
      ['C5:4', 'A4:4', 'E5:2'],
      ['G5:4', 'E5:4', 'C5:2']
    ],
    original: ['F', 'G', 'C', 'Am', 'C'],
    revised: [voicing('Fmaj7', 'F2 E3 A3 C4'), voicing('G/F', 'F2 D3 G3 B3', 1, 'F2'), 'Em7', 'Am7', 'C']
  },
  {
    id: 'technique-12',
    title: 'D、G 两组低音与挂留解决',
    melody: [
      ['D5:4', 'E5:8', 'D5:8', 'G5:4', 'C5:4'],
      ['A4:4', 'C5:8', 'D5:8', 'A4:4', 'D5:4'],
      ['G5:4', 'A5:8', 'G5:8', 'D5:4', 'G5:4'],
      ['G5:2', 'D5:4', 'B4:4'],
      ['C5:4', 'E5:4', 'G5:2']
    ],
    original: ['Dm', 'Dm', 'G', 'G', 'C'],
    revised: [
      cOverD, voicing('D7', 'D3 C4 F#4 A4', 1, 'D3'), fOverG,
      voicing('G', 'G2 D3 G3 B3', 1, 'G2'), 'C'
    ]
  },
  {
    id: 'technique-13',
    title: '同一 G 低音上的伴奏顶音上行',
    melody: [
      ['A4:4', 'F5:8', 'E5:8', 'D5:4', 'A4:4'],
      ['D5:4', 'F5:8', 'D5:8', 'C5:4', 'D5:4'],
      ['G5:4', 'A5:8', 'G5:8', 'B5:4', 'D5:4'],
      ['G5:4', 'A5:8', 'G5:8', 'F5:4', 'D5:4'],
      ['E5:4', 'G5:4', 'C6:2']
    ],
    original: ['Dm', 'Dm', 'G', 'G', 'C'],
    revised: [
      'Dm9', 'Bb9',
      [voicing('F/G', 'G2 F3 A3 C4', 2), voicing('Em7/G', 'G2 E3 B3 D4', 2, 'G2')],
      [voicing('Fmaj7/G', 'G2 F3 A3 C4 E4', 2, 'G2'), voicing('G7', 'G2 F3 G3 B3 D4', 2, 'G2')],
      'C'
    ]
  },
  {
    id: 'technique-14',
    title: '从 C 大调的二–五–一过渡到 A 小调',
    melody: [
      ['E5:4', 'D5:4', 'G5:8', 'A5:8', 'G5:4'],
      ['E5:4', 'G5:4', 'E5:2'],
      ['F#5:4', 'A5:4', 'B5:4', 'F#5:4'],
      ['E5:4', 'A5:4', 'G#5:4', 'E5:4'],
      ['A5:4', 'C6:8', 'B5:8', 'A5:2']
    ],
    original: [['Dm:2', 'G:2'], 'C', 'B7', 'E7', 'Am'],
    revised: [
      [voicing('Dm9', 'D3 F3 A3 C4 E4', 2), voicing('G13', 'G2 F3 B3 E4', 2)],
      ['Em7:2', 'Am7:2'],
      ['F#m7b5:2', 'B7:2'],
      [voicing('D/E', 'E2 A3 D4 F#4', 2), voicing('E7b9', 'E2 G#3 B3 D4 F4', 2, 'E2')],
      'Am'
    ]
  },
  {
    id: 'technique-15',
    title: '进入同主音小调，再回到 C 大调副歌',
    melody: [
      ['A4:4', 'F5:4', 'E5:8', 'D5:8', 'E5:4'],
      ['F5:4', 'C5:4', 'G5:4', 'E5:4'],
      ['C5:8', 'D5:8', 'F5:4', 'D5:4', 'G5:4'],
      ['C5:4', 'C5:4', 'B4:4', 'D5:4'],
      ['E5:4', 'G5:4', 'C5:2']
    ],
    original: [
      ['F:2', 'C:2'], ['F:2', 'C:2'], ['Dm7:2', 'Em7:2'],
      ['F:2', 'G7:2'], 'C'
    ],
    revised: [
      ['Dm7:2', 'Em7:2'], ['Fmaj7:2', 'Em7:2'], ['Fm7:2', 'Gm7:2'],
      [voicing('Abmaj7', 'Ab2 C4 Eb4 G4', 2), voicing('G7', 'G2 B3 D4 F4', 2)], 'C'
    ]
  },
  {
    id: 'technique-16',
    title: '两种属七替换指向副歌的 Dm',
    melody: [
      ['F5:4', 'A5:8', 'G5:8', 'A5:4', 'F5:4'],
      ['D5:4', 'F5:4', 'D5:4', 'D5:4'],
      ['E5:4', 'G5:4', 'E5:4', 'G5:4'],
      ['G5:2', 'G5:4', 'F5:4'],
      ['F5:4', 'A5:4', 'D5:2']
    ],
    original: ['Dm', 'G7', 'C', 'A7', 'Dm'],
    revised: ['Fmaj7', 'Bb7', 'Em7', 'Eb9', 'Dm']
  },
  {
    id: 'technique-17',
    title: '用借用和弦准备 A 小调副歌',
    melody: [
      ['F5:4', 'A5:4', 'G5:8', 'F5:8', 'D5:4'],
      ['E5:4', 'G5:4', 'G5:4', 'E5:4'],
      ['C5:4', 'F5:4', 'G5:8', 'F5:8', 'C5:4'],
      ['B4:4', 'D5:4', 'E5:4', 'G#5:4'],
      ['A5:4', 'E5:4', 'C5:2']
    ],
    original: ['F', 'C', 'Dm', 'E7', 'Am'],
    revised: ['Dm7', 'Em7', 'Fm7', 'E7', 'Am']
  },
  {
    id: 'technique-18',
    title: '两条半音声部线推迟终止',
    melody: [
      ['F5:4', 'A5:4', 'D5:4', 'D5:8', 'F5:8'],
      ['E5:4', 'G5:4', 'G5:2'],
      ['D5:4', 'A5:4', 'D5:4', 'A5:4'],
      ['B5:4', 'G5:4', 'G5:4', 'B5:4'],
      ['E5:4', 'G5:4', 'C5:2']
    ],
    original: [['F:2', 'G:2'], ['Em:2', 'A7:2'], 'D7', 'G', 'C'],
    revised: [
      ['Fmaj7:2', 'Bb7:2'], ['Em7:2', 'Eb9:2'],
      [voicing('D7sus4', 'D3 A3 C4 G4', 2), voicing('D7', 'D3 A3 C4 F#4', 2)],
      [voicing('G', 'G2 G3 B3 D4', 2), voicing('Gaug', 'G2 G3 B3 D#4', 2)],
      voicing('C', 'C3 G3 C4 E4')
    ]
  },
  {
    id: 'technique-19',
    title: '关系小调先收束，随后重新打开乐句',
    melody: [
      ['A4:4', 'F5:4', 'A5:4', 'F5:4'],
      ['D5:4', 'B4:8', 'C5:8', 'D5:4', 'B4:4'],
      ['C5:4', 'E5:4', 'C5:2'],
      ['A4:4', 'C5:4', 'C5:4', 'A4:4'],
      ['B4:4', 'D5:4', 'F5:2'],
      ['E5:4', 'C5:4', 'G5:2']
    ],
    original: ['F', 'G', 'C', 'Am', 'G7', 'C'],
    revised: ['Dm7', 'E7', 'Am', 'D7', 'G7', 'C']
  },
  {
    id: 'technique-20',
    title: '从全减七持续低音到三全音替代解决',
    melody: [
      ['A4:4', 'C5:4', 'B4:4', 'D5:4'],
      ['E5:8', 'F5:8', 'G5:4', 'C#5:4', 'E5:4'],
      ['D5:4', 'E5:4', 'F#5:4', 'E5:4'],
      ['G5:4', 'F5:4', 'F5:2'],
      ['E5:4', 'G5:8', 'E5:8', 'C5:2']
    ],
    original: [['F:2', 'G:2'], ['C:2', 'A7:2'], 'D', 'G7', 'C'],
    revised: [
      [voicing('F', 'F2 A3 C4 F4', 2), voicing('Fdim7', 'F2 Ab3 Cb4 Ebb4', 2, 'F2')],
      ['Em7:2', 'A7:2'],
      [voicing('C/D', 'D3 C4 E4 G4', 2), voicing('D9', 'D3 C4 E4 F#4', 2, 'D3')],
      [voicing('F/G', 'G2 F3 A3 C4', 2), voicing('Db9', 'Db3 Cb4 Eb4 F4', 2)],
      'C'
    ]
  }
]);
