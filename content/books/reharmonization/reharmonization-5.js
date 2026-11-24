import { mountReharmExamples } from './reharmonization-example.js';

function voicing(symbol, pitches, duration = 1, tie = []) {
  return { symbol, duration, notes: pitches.split(' '), tie };
}

const descent = [
  voicing('Fmaj7', 'F2 A3 C4 E4'), voicing('Fm6', 'F2 Ab3 C4 D4', 1, ['F2']),
  voicing('Em7', 'E2 G3 B3 D4')
];

mountReharmExamples([
  {
    id: 'technique-44', title: '下属小六与全减七的双线下行',
    melody: ['A4:2 F5:4 E5:4', 'F5:4 C5:4 D5:2', 'E5:4 D5:4 G5:2', 'E5:4 D5:4 C5:2'],
    original: ['Dm7', 'G7', 'Cmaj7', 'Am7'],
    revised: [...descent, voicing('Ebdim7', 'Eb2 Gb3 Bbb3 Dbb4')]
  },
  {
    id: 'technique-45', title: '伴奏顶音 E–D–D–C',
    melody: ['A4:2 F5:4 E5:4', 'F5:4 C5:4 D5:2', 'E5:4 D5:4 G5:2', 'E5:4 D5:4 C5:2'],
    original: ['F', 'G', 'C', 'Am'],
    revised: [...descent, voicing('Am7', 'A2 E3 G3 C4')]
  },
  {
    id: 'technique-46', title: '经过减七和属十三音的半音移动',
    melody: ['E5:4 G5:4 C5:2', 'E5:4 G5:4 E5:2', 'A4:4 F5:4 F5:4 D5:4', 'B4:2 D5:2', 'C5:1'],
    original: ['C', 'Am', 'Dm', 'G', 'C'],
    revised: [voicing('C', 'C2 E3 G3 C4'), voicing('C#dim7', 'C#2 E3 G3 Bb3'),
      [voicing('Dm7', 'D2 F3 A3 C4', 2), 'Fm6:2'],
      [voicing('G7(13)', 'G2 B3 F4 E5', 2), voicing('G7(b13)', 'G2 B3 F4 Eb5', 2, ['G2','B3','F4'])], 'C']
  },
  {
    id: 'technique-47', title: '两轮循环的不同和声走向',
    melody: ['E5:4 G5:4 G5:2', 'D5:4 C5:4 B4:2', 'G5:2 E5:2', 'F5:4 C5:4 D5:2', 'E5:4 D5:4 C5:2'],
    original: [['C:2', 'A7:2'], ['Dm:2', 'G7:2'], ['C:2', 'Am:2'], ['Dm:2', 'G7:2'], 'C'],
    revised: [
      ['C:2', voicing('Eb7', 'Eb2 G3 Bb3 Db4', 2)], [voicing('D7', 'D2 F#3 A3 C4', 2), 'G7:2'],
      ['C:2', voicing('C7/E', 'E2 G3 Bb3 C4', 2)], [voicing('Fm7', 'F2 Ab3 C4 Eb4', 2), 'G7:2'], 'C'
    ]
  },
  {
    id: 'technique-48', title: '减少配音后的挂留色彩',
    melody: ['E5:2 B4:4 A4:4', 'A4:2 G5:2', 'F5:2 G5:2', 'B4:4 E5:4 B4:2'],
    original: ['Am7(9)', 'Fmaj7(9)', 'Dm7(9)', 'E7'],
    revised: [voicing('Esus4/A', 'A2 E3 B3'), voicing('Dsus4/F', 'F2 G3 A3 D4'),
      voicing('Csus4/Bb', 'Bb2 F3 G3 C4'), voicing('Esus4', 'E2 A3 B3')]
  },
  {
    id: 'technique-49', title: 'C–C♯–D–D♯–E–E♭–D 的低音线',
    melody: ['E5:4 G5:4 E5:2', 'F5:4 A5:4 F#5:4 A5:4', 'G5:4 B5:4 Bb5:4 G5:4', 'A5:4 E5:4 G5:2'],
    original: [['C:2', 'A7:2'], ['Dm:2', 'B7:2'], ['Em:2', 'A7:2'], ['Dm:2', 'G7:2']],
    revised: [
      [voicing('Cmaj7', 'C2 E3 G3 B3', 2), voicing('C#dim7', 'C#2 E3 G3 Bb3', 2)],
      [voicing('Dm7', 'D2 F3 A3 C4', 2), voicing('D#dim7', 'D#2 F#3 A3 C4', 2)],
      [voicing('Em7', 'E2 G3 B3 D4', 2), voicing('Eb7', 'Eb2 G3 Bb3 Db4', 2)],
      [voicing('Am7/D', 'D2 A3 C4 E4 G4', 2), voicing('G7(13)', 'G2 B3 F4 E4 G4', 2, ['E4','G4'])]
    ]
  },
  {
    id: 'technique-50', title: '两轮循环的逐拍重配',
    melody: ['E5:4 G5:4 B4:4 C5:4', 'F5:4 D5:4 G5:4 D5:4', 'G5:4 D5:4 C5:4 G5:4', 'F5:4 D5:4 C5:4 B4:4', 'C5:1'],
    original: [['C:2', 'Am:2'], ['Dm:2', 'G:2'], ['Em:2', 'Am:2'], ['Dm:2', 'G:2'], 'C'],
    revised: [
      ['Cmaj7:2', 'Em7:4', 'Am7:4'], ['Dm7:4', 'Fm6:4', 'G:4', 'G/F:4'],
      ['Em7(b5):4', 'Bb7(9):4', 'Am7:4', 'Eb7(9):4'],
      ['Dm7(9):4', 'Bb7(9):4', voicing('Fmaj7/G', 'G2 F3 A3 C4 E4', 4), voicing('G7', 'G2 F3 G3 B3 D4', 4, ['G2', 'F3'])], 'C'
    ]
  }
]);
