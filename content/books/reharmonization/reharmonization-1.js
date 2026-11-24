import { mountReharmExamples } from './reharmonization-example.js';

const majorMelody = [
  ['E5:4', 'G5:4', 'E5:2'],
  ['E5:4', 'G5:4', 'E5:4', 'A5:4'],
  ['F5:4', 'D5:4', 'F5:4', 'A5:4'],
  ['G5:4', 'D5:4', 'B4:2'],
  ['C5:1']
];

const minorMelody = [
  ['E5:4', 'C5:4', 'D5:4', 'F5:4'],
  ['B4:4', 'E5:4', 'E5:4', 'A5:4'],
  ['F5:4', 'D5:4', 'A4:2'],
  ['E5:4', 'B4:4', 'C5:4', 'A4:4']
];

const voicing = (symbol, notes, duration = 1) => ({ symbol, notes: notes.split(' '), duration });
const half = chord => ({ ...chord, duration: 2 });

const c = voicing('C', 'C3 E3 G3 C4');
const am = voicing('Am', 'A2 E3 A3 C4');
const dm = voicing('Dm', 'D3 F3 A3 D4');
const g = voicing('G', 'G2 G3 B3 D4');
const e = voicing('E', 'E3 G#3 B3 E4');
const a7 = voicing('A7', 'A2 E3 G3 C#4 A4');
const bHalfDim = voicing('Bm7(b5)', 'B2 F3 A3 D4', 2);

const majorLoop = [c, am, dm, g, c];
const minorLoop = [[half(am), half(dm)], [half(e), half(a7)], dm, [half(e), half(am)]];

const extensions = {
  c: voicing('Cmaj9', 'C3 E3 G3 B3 D4'),
  a: voicing('Am9', 'A2 E3 G3 C4 B4'),
  d: voicing('Dm9', 'D3 F3 A3 C4 E4')
};

mountReharmExamples([
  {
    id: 'technique-01',
    title: '三和弦与加七音的同一进行',
    melody: majorMelody,
    original: majorLoop,
    revised: [
      voicing('Cmaj7', 'C3 E3 G3 C4 B4'),
      voicing('Am7', 'A2 E3 G3 A3 C4'),
      voicing('Dm7', 'D3 F3 A3 C4 D4'),
      g, c
    ]
  },
  {
    id: 'technique-02',
    title: '属和弦前的二级半减七和弦',
    melody: minorMelody,
    original: minorLoop,
    revised: [
      [half(am), bHalfDim],
      [half(e), half(a7)],
      [half(dm), bHalfDim],
      [half(e), half(am)]
    ]
  },
  {
    id: 'technique-03',
    title: '主功能与属前功能的调内代理',
    melody: majorMelody,
    original: majorLoop,
    revised: [c, ['Em:2', half(am)], voicing('F', 'F2 F3 A3 C4'), g, c]
  },
  {
    id: 'technique-04',
    title: '分别指向 Am 与 Dm 的副属和弦',
    melody: majorMelody,
    original: majorLoop,
    revised: [[half(c), 'E7:2'], [half(am), half(a7)], dm, g, c]
  },
  {
    id: 'technique-05',
    title: '同一低音骨架上的九音与十三音',
    melody: majorMelody,
    original: majorLoop,
    revised: [extensions.c, extensions.a, extensions.d, voicing('G7(9,13)', 'G2 B3 F4 A4 E5'), c]
  },
  {
    id: 'technique-06',
    title: '三全音替代与三条半音线',
    melody: majorMelody.with(1, ['G5:2', 'C5:2']).with(3, ['B4:1']),
    original: majorLoop,
    revised: [
      extensions.c,
      voicing('Eb9', 'Eb3 G3 Bb3 Db4 F4'),
      extensions.d,
      voicing('Db9', 'Db3 F3 Ab3 Cb4 Eb4'),
      c
    ],
    variants: [{
      label: '属七中间版',
      harmony: [extensions.c, a7, extensions.d, 'G7', c]
    }]
  },
  {
    id: 'technique-07',
    title: 'E、E♭、D 低音中的经过减七和弦',
    melody: majorMelody.with(1, ['C5:2', 'A4:4', 'C5:4']),
    original: majorLoop,
    revised: [
      voicing('Cmaj9/E', 'E2 G3 B3 C4 D4'),
      voicing('E♭dim7', 'Eb2 Gb3 A3 C4'),
      voicing('Dm9', 'D2 F3 A3 C4 E4'),
      voicing('G13', 'G2 B3 F4 E5'),
      c
    ]
  },
  {
    id: 'technique-08',
    title: '增和弦连接的伴奏最高声部',
    melody: majorMelody.with(1, ['E5:4', 'C5:4', 'E5:4', 'C5:4']),
    original: [
      voicing('C', 'C3 E4 G4'),
      voicing('Am', 'A2 C4 E4 A4'),
      voicing('Dm', 'D3 F4 A4'),
      voicing('G', 'G2 D4 G4 B4'),
      c
    ],
    revised: [
      voicing('C', 'C3 E4 G4'),
      voicing('Caug', 'C3 E4 G#4'),
      voicing('Dm', 'D3 F4 A4'),
      voicing('G', 'G2 D4 G4 B4'),
      c
    ]
  },
  {
    id: 'technique-09',
    title: 'E 与 B 上的挂留和解决',
    melody: minorMelody,
    original: minorLoop,
    revised: [
      [half(am), half(dm)],
      [voicing('Esus4', 'E3 B3 E4 A4', 4), voicing('E7', 'E3 B3 D4 G#4', 4), half(a7)],
      [half(dm), voicing('B7sus4', 'B2 F#3 A3 E4', 4), voicing('B7', 'B2 F#3 A3 D#4', 4)],
      [half(e), half(am)]
    ]
  },
  {
    id: 'technique-10',
    title: '同主音小调借来的 Fm',
    melody: majorMelody.with(2, ['F5:4', 'C5:4', 'F5:2']),
    original: [c, am, voicing('Dm', 'D3 F3 D4 A4'), voicing('G', 'G3 B3 D4 G4'), c],
    revised: [c, am, voicing('Fm', 'F3 C4 F4 Ab4'), voicing('G', 'G3 B3 D4 G4'), c],
    variants: [{
      label: '调内 F',
      harmony: [c, am, voicing('F', 'F3 C4 F4 A4'), voicing('G', 'G3 B3 D4 G4'), c]
    }]
  }
]);
