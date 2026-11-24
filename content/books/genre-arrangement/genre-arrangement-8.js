import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { genreMelody, mountGenreArrangement, mountGenreVersions } from './genre-arrangement-demo.js';

const bassClef = '\\clef F4';
const drumBar = [
  'Kick.8 { dy mf } Hat.8 { dy mp }',
  '(Kick Snare).8 { dy mf } Hat.16 { dy mp } PedalHat.16 { dy p }',
  'Kick.8 { dy mf } Hat.8 { dy mp }',
  '(Kick Snare).8 { dy mf } Hat.16 { dy mp } PedalHat.16 { dy p }'
].join(' ');

const chords = [
  ['A3 C4 E4 F4', 'A3 C4 F4'],
  ['F3 A3 C4 D4', 'F3 B3 D4'],
  ['G3 B3 D4 F4', 'G3 B3 D4 E4'],
  ['G3 C4 E4', 'A3 C4 E4 F4']
];

function held(harmony, control) {
  const [first, second] = harmony;
  return '(' + first + ').2 { ' + control + ' } (' + second + ').2';
}

function stabs(harmony, balance, initial, ending = false) {
  const [first, second] = harmony.map(pitches => '(' + pitches + ')');
  const firstEffect = initial ? ' { dy p balance ' + balance + ' }' : '';
  const finalChord = ending ? '(G3 C4 E4)' : second;
  return 'r.8 ' + first + '.8' + firstEffect + ' r.8 ' + second + '.8 r.8 ' +
    second + '.8 r.8 ' + finalChord + '.8';
}

const firstBass = 'F2.8 { dy mf } F3.8 F2.8 G2.8 G3.8 G2.8 G2.8 G3.8';
const firstPad = '(A3 C4 E4 F4).4 { d dy pp } (A3 C4 F4).8 (A3{t} C4{t} F4{t}).2';

mountGenreArrangement('genre-electro-arrangement', {
  tempo: 134,
  harmony: ['Fmaj7–F/G', 'Dm7–G7', 'G7–Em7', 'C/E–Fmaj7–C'],
  tracks: [
    { name: '弱拍合成器', program: 80, bars: chords.map((chord, index) => stabs(chord, 4, index === 0, index === 3)) },
    { name: '弱拍合成器右轨', program: 81, playbackOnly: true, bars: chords.map((chord, index) => stabs(chord, 12, index === 0, index === 3)) },
    { name: '扫动衬底', program: 95, bars: [
      firstPad, held(chords[1], 'dy pp'), held(chords[2], 'dy pp'),
      '(C4 E4 G4).2 { dy pp } (C4 E4 F4 A4).4 (C4 E4 G4).4'
    ] },
    { name: '琶音合成器', program: 82, bars: [
      'r.2 F4.8 A4.8 C5.8 A4.8 { dy p }',
      'D4.8 { dy p } F4.8 A4.8 C5.8 G4.8 B4.8 D5.8 B4.8',
      'G4.8 B4.8 D5.8 F5.8 E4.8 G4.8 B4.8 D5.8',
      'E4.8 G4.8 C5.8 G4.8 F4.8 A4.8 E4.8 C5.8'
    ] },
    { name: '合成贝斯', program: 38, header: bassClef, bars: [
      firstBass,
      'D2.8 { dy mf } D3.8 D2.8 D2.8 G2.8 G3.8 G2.8 G3.8',
      'G2.8 G3.8 G2.8 G3.8 E2.8 E3.8 E2.8 E3.8',
      'E2.8 E3.8 E2.8 E3.8 F2.8 F3.8 C2.8 C3.8'
    ] },
    { name: '电子鼓', program: 'percussion', bars: Array.from({ length: 4 }, () => drumBar) }
  ],
  summary: '合成贝斯在首小节第 2 拍后半从 F 升到 G。底鼓与八分弱拍形成参照，持续衬底和琶音则把细分织体分到不同音区。'
});

function anticipation(early) {
  const piano = early
    ? '(A3 C4 E4 F4).4 { d dy p } (A3 C4 F4).8 (A3{t} C4{t} F4{t}).2'
    : '(A3 C4 E4 F4).2 { dy p } (A3 C4 F4).2';
  const bass = early
    ? 'F2.4 { d dy mf } G2.8 G2{t}.2'
    : 'F2.2 { dy mf } G2.2';
  return [
    { name: '共用旋律', program: 73, bars: genreMelody.slice(0, 1) },
    { name: '和弦', program: 4, bars: [piano] },
    { name: '贝斯', program: 38, header: bassClef, bars: [bass] },
    { name: '四踩底鼓', program: 'percussion', bars: ['Kick.4 Kick.4 Kick.4 Kick.4'] }
  ];
}

const demo = document.getElementById('genre-electro-anticipation');
const select = demo.querySelector('select');
const gridRows = () => [
  { label: '底鼓', events: [0, 2, 4, 6].map(step => ({ step })) },
  { label: '和声转换', events: [{ step: 0 }, { step: select.value === 'early' ? 3 : 4, accent: true }] }
];
const grid = mountArrangementGrid(demo.querySelector('[data-arrangement-grid]'), {
  subdivisions: 2,
  label: '第 2 拍后半与第 3 拍的换和弦位置',
  rows: gridRows()
});
mountGenreVersions('genre-electro-anticipation', {
  tempo: 134,
  onPlaybackPosition: grid.markTick,
  versions: {
    early: {
      tracks: anticipation(true),
      summary: '旋律刚发 A 时，贝斯已经换成 G，F/G 的挂留音响比第 3 拍提早半拍到达。'
    },
    square: {
      tracks: anticipation(false),
      summary: '旋律的 A 依然处在第 2 拍后半。贝斯到第 3 拍才换成 G，与底鼓的拍头一同到达。'
    }
  }
});
select.addEventListener('change', () => grid.update(gridRows()));
