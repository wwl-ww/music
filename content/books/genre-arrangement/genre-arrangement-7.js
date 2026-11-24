import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { guitarBrush, guitarNotes, guitarTuning } from '../../shared/formats/guitar-strum.js';
import { genreTrack, mountGenreArrangement, mountGenreVersions } from './genre-arrangement-demo.js';

const bassClef = '\\clef F4';
const hat = ['(Kick Hat).8 { dy mf }', 'Hat.8 { dy mp }', '(Snare Hat).8 { dy mf }',
  '(Kick Hat).8 { dy mp }', '(Kick Hat).8 { dy mf }', 'Hat.8 { dy mp }',
  '(Snare Hat).8 { dy mf }', 'Hat.8 { dy mp }'];
const firstBass = 'C3.8 { dy mf } r.4 G2.8 { dy mp } B2.4 { dy mf } G2.8 B2.8 { dy mp }';
const tempo = 100;
const openC = [null, 3, 2, 0, 1, 0];
const acousticShapes = [
  [openC, [null, 2, null, 0, 3, 0]],
  [[null, 0, 3, null, 1, 1], [3, null, 2, 0, 1, null]],
  [[1, null, 0, 2, 3, 1], [0, null, 0, 0, 0, null]],
  [[null, null, 0, 2, 1, 1], openC]
];

function alternatingStroke(shape, isFirst) {
  const strings = guitarNotes(shape);
  const full = '(' + strings.join(' ') + ')';
  const high = '(' + strings.slice(-3).join(' ') + ')';
  return `${full}.4 { ${guitarBrush('down', tempo, 38)} dy mf${isFirst ? ' balance 11' : ''} } ` +
    `${full}.8 { ${guitarBrush('down', tempo, 28)} dy mp } ${high}.8 { ${guitarBrush('up', tempo, 24)} dy p }`;
}

mountGenreArrangement('genre-folk-arrangement', {
  tempo,
  harmony: ['C–G6/B', 'F/A–C/G', 'Dm/F–Em7', 'Dm7–C'],
  tracks: [
    { name: '钢弦吉他', program: 25, tuning: guitarTuning, bars: acousticShapes.map(([first, second], index) =>
      alternatingStroke(first, index === 0) + ' ' + alternatingStroke(second, false)) },
    { name: '电吉他', program: 29, bars: [
      'r.8 C3.8 { dy p balance 5 } G3.8 E4.8 r.8 B2.8 G3.8 D4.8',
      'r.8 A2.8 F3.8 C4.8 r.8 G3.8 C4.8 E4.8',
      'r.8 F3.8 A3.8 D4.8 r.8 E3.8 B3.8 G4.8',
      'r.8 D3.8 A3.8 F4.8 r.8 C3.8 G3.8 E4.8'
    ] },
    { name: '电钢琴', program: 4, bars: [
      '(G3 C4 E4).2 { dy p } (G3 D4 E4).2', '(F3 A3 C4).2 (G3 C4 E4).2',
      '(F3 A3 D4).2 (G3 B3 D4).2', '(F3 A3 C4).2 (G3 C4 E4).2'
    ] },
    { name: '电贝斯', program: 33, header: bassClef, bars: [
      firstBass,
      'A2.8 { dy mf } r.4 F2.8 { dy mp } G2.4 { dy mf } E2.8 G2.8 { dy mp }',
      'F2.8 { dy mf } r.4 A2.8 { dy mp } E2.4 { dy mf } G2.8 B2.8 { dy mp }',
      'D2.8 { dy mf } r.4 A2.8 { dy mp } C2.2 { dy mf }'
    ] },
    { name: '鼓组', program: 'percussion', bars: [
      hat.join(' '), hat.join(' '), hat.join(' '),
      '(Kick Hat).8 { dy mf } Hat.8 { dy mp } (Snare Hat).8 { dy mf } (Kick Hat).8 { dy mp } (Kick Hat).4 { dy mf } r.4'
    ] }
  ],
  summary: '低音 C–B–A–G–F–E–D–C 逐级下降。原声扫弦承担拍点，电吉他分解型从拍间进入，电钢琴托住长音。'
});

mountPlayableArrangementGrid(document.getElementById('genre-folk-grid'), {
  tempo: 100,
  subdivisions: 2,
  label: '民谣流行首小节的起音位置',
  rows: [
    { label: '底鼓', events: hat.flatMap((beat, step) => beat.includes('Kick') ? [{ step, accent: step !== 3 }] : []) },
    { label: '小鼓', events: hat.flatMap((beat, step) => beat.includes('Snare') ? [{ step, accent: true }] : []) },
    { label: '踩镲', events: hat.map((_, step) => ({ step, accent: step % 2 === 0 })) },
    { label: '电贝斯', events: [{ step: 0, accent: true }, { step: 3 }, { step: 4, accent: true }, { step: 6 }, { step: 7 }] }
  ],
  notes: { scoreTracks: [
    genreTrack({ name: '鼓组', program: 'percussion', bars: [hat.join(' ')] }),
    genreTrack({ name: '电贝斯', program: 33, header: bassClef, bars: [firstBass] })
  ] }
});

const guitar = bars => ({ name: '钢弦吉他', program: 25, tuning: guitarTuning, bars });
const bass = { name: '贝斯', program: 33, header: bassClef, bars: ['G2.1 { dy mp }', 'C2.1'] };
const gShape = [3, null, 0, 0, 0, null];
const cShape = [null, 3, null, 0, 1, 0];
const gSuspended = gShape.with(4, 1);
const cSuspended = cShape.with(5, 1);

function suspensionBar(start, end) {
  const down = guitarBrush('down', tempo, 43);
  return [start, end].map(shape => `(${guitarNotes(shape).join(' ')}).2 { ${down} dy mp }`).join(' ');
}

mountGenreVersions('genre-folk-suspension', {
  tempo,
  versions: {
    suspended: {
      tracks: [
        guitar([suspensionBar(gSuspended, gShape), suspensionBar(cSuspended, cShape)]),
        bass
      ],
      summary: '两个挂留在第 3 拍各下行半音解决。G 上响 C→B，C 上响 F→E。'
    },
    direct: {
      tracks: [
        guitar([suspensionBar(gShape, gShape), suspensionBar(cShape, cShape)]),
        bass
      ],
      summary: '两个小节的第 1 拍已经有三音，之后只重复同一个和弦排列。'
    }
  }
});
