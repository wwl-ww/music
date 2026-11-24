import { mountReharmExamples } from './reharmonization-example.js';

function voicing(symbol, pitches, duration = 1, tied = '') {
  return { symbol, duration, notes: pitches.split(' '), tie: tied ? tied.split(' ') : [] };
}

const minorPrelude = {
  melody: ['E5:2 C5:4 E5:4', 'D5:4 B4:4 D5:2', 'E5:4 C5:4 A4:2', 'B4:2 D5:2'],
  original: [voicing('Am', 'A2 E3 A3 C4'), 'Em7', 'Dm7', 'Em7']
};

mountReharmExamples([
  {
    id: 'technique-36', title: '经过减七与半音下行低音',
    melody: ['E5:2 D5:2', 'C5:2 A4:2', 'A4:2 B4:2', 'C5:2 A4:2'],
    original: [['Am:2', 'E7:2'], ['Am:2', 'D7:2'], ['Dm:2', 'Em:2'], 'Am'],
    revised: [
      [voicing('Am', 'A2 E3 A3 C4', 2), voicing('G#dim7', 'G#2 F3 B3 D4', 2)],
      [voicing('Am/G', 'G2 E3 A3 C4', 2), voicing('F#m7(b5)', 'F#2 E3 A3 C4', 2)],
      [voicing('Fmaj7', 'F2 E3 A3 C4', 2), voicing('Em7', 'E2 E3 G3 D4', 2)], 'Am'
    ]
  },
  {
    id: 'technique-37', title: '移位二–五与半音低音收束',
    melody: ['G5:2 A5:2', 'G5:2 G5:4 A5:4', 'F5:2 D5:2', 'E5:4 G5:4 E5:2'],
    original: [['C:2', 'F:2'], ['Em:2', 'A7:2'], ['Dm7:2', 'G7:2'], 'C'],
    revised: [
      ['Cmaj7:2', 'Dm7(9):2'], ['Em7:2', 'A7(b13):2'],
      ['Fm7(9):2', voicing('Bb7', 'Bb2 F3 Ab3 D4', 2)], voicing('Am7', 'A2 E3 G3 C4')
    ]
  },
  {
    id: 'technique-38', title: '伴奏最高音 E–D–C–D',
    melody: ['A5:4 C6:4 E5:2', 'E5:4 D5:4 B4:2', 'A4:4 C5:4 F5:2', 'E5:2 G5:2'],
    original: ['Am', 'Am', 'F', 'Em'],
    revised: [voicing('Fmaj7', 'F2 A3 C4 E4'), voicing('Em7', 'E2 G3 B3 D4'),
      voicing('Dm7', 'D2 F3 A3 C4'), voicing('Em7', 'E2 G3 B3 D4')]
  },
  {
    id: 'technique-39', title: '两块和声连接主歌首和弦',
    melody: ['G5:2 D5:2', 'E5:4 D5:4 G5:2', 'A5:2 C6:2', 'D5:4 B4:4 G5:2', 'E5:2 C5:2'],
    original: ['C', 'Am', 'F', 'G', 'C'],
    revised: [voicing('G/C', 'C2 G3 B3 D4'), voicing('G/C', 'C2 G3 B3 D4', 1, 'C2 G3 B3 D4'),
      voicing('F/G', 'G2 F3 A3 C4'), voicing('F/G', 'G2 F3 A3 C4', 1, 'G2 F3 A3 C4'), 'C']
  },
  {
    id: 'technique-40', title: '省略三音与挂留解决',
    melody: ['B4:2 D5:2', 'A4:2 G5:2', 'F#5:2 E5:2', 'E5:2 B4:2', 'A4:1'],
    original: ['Am7(9,11)', 'Am7(9,11)', 'E7(9)', 'E7(b9)', 'Am'],
    revised: [voicing('G/A', 'A2 G3 B3 D4'), voicing('G/A', 'A2 G3 B3 D4', 1, 'A2 G3 B3 D4'),
      voicing('D/E', 'E2 D3 F#3 A3'), voicing('E7(b9)', 'E2 B2 D3 F3 G#3', 1, 'E2 D3'), 'Am']
  },
  {
    id: 'technique-41', title: '上行伴奏线与 ii–V–I',
    melody: ['E5:2 G5:2', 'A5:4 F5:4 A5:2', 'G5:2 E5:2', 'F5:4 A5:4 C6:2', 'G5:2 E5:2'],
    original: ['C', 'F', 'C', 'F', 'C'],
    revised: [voicing('Cmaj7', 'C2 E3 G3 B3'), voicing('Dm7', 'D2 F3 A3 C4'), voicing('Em7', 'E2 G3 B3 D4'),
      ['Dm7:2', 'F/G:2'], 'C']
  },
  {
    ...minorPrelude, id: 'reharm-prelude-comparison', title: 'A 持续低音上的两种顶音线', revisedLabel: '第 42 法',
    revised: [minorPrelude.original[0], voicing('G/A', 'A2 D3 G3 B3', 1, 'A2'),
      voicing('F/A', 'A2 F3 A3 C4', 1, 'A2'), voicing('G/A', 'A2 G3 B3 D4', 1, 'A2')],
    variants: [{
      label: '第 43 法',
      harmony: [voicing('Am7(9)', 'A2 C3 E3 G3 B3'), voicing('Bm7/A', 'A2 B2 D3 F#3 A3', 1, 'A2'),
        voicing('Am7', 'A2 C3 E3 G3', 1, 'A2'), voicing('Bm/A', 'A2 B2 D3 F#3', 1, 'A2')]
    }]
  }
]);
