import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { mountGenreArrangement, mountGenreVersions } from './genre-arrangement-demo.js';

const piano = bars => ({ name: '钢琴', program: 0, bars });
const bass = bars => ({ name: '合成贝斯', program: 38, header: String.raw`\clef F4`, bars });
const kit = bars => ({ name: '原声鼓组', program: 'percussion', bars });
const oneBar = bar => [bar, bar, bar, bar];
const houseKick = 'Kick.4 { dy mf } Kick.4 Kick.4 Kick.4';
const liveKit = [
  '(Kick Ride).16 { dy mp } Ride.16 Ride.16 (Rim Ride).16',
  'Ride.16 { dy p } Ride.16 (Kick Ride).16 { dy mp } Ride.16',
  '(Kick Ride).16 Ride.16 Ride.16 (Rim Ride).16',
  'Ride.16 { dy p } (Rim Ride).16 { dy mp } (Kick Ride).16 Ride.16'
].join(' ');
const percussion = [
  '(SubKick Shaker).8 Conga.16 Shaker.16',
  '(SubKick Shaker).8 r.16 (Conga Triangle).16',
  '(SubKick Shaker).8 Conga.8',
  '(SubKick Shaker).8 (Conga Triangle).8'
].join(' ');
const leadIn = 'r.8 (E4 G4 B4).8 { dy mp } (C4 E4 A4).4 r.8 (D4 E4 A4).8 (C4 E4 G4).4';
const twoBeatBass = (root, fifth) => `${root}.8 { dy mp d } ${fifth}.16 ${fifth}{t}.8 ${root}.8`;
const typicalBass = (root, fifth) => `${twoBeatBass(root, fifth)} ${twoBeatBass(root, fifth)}`;

mountGenreArrangement('genre-brazil-arrangement', {
  tempo: 120,
  harmony: ['D♭m7♭5 → C6/9', 'Am9', 'G13', 'C6/9'],
  summary: '第一拍后半由 D♭ 低音和 E–G–B 组成半减七和弦，第二拍回到 C。四拍底鼓维持舞曲重心，钢琴切分和打击乐填出拍内层次。',
  tracks: [
    piano([
      leadIn,
      'r.8 (G3 B3 E4).8 (A3 C4 E4).4 r.8 (G3 C4 B4).8 (G3 C4 E4).4',
      'r.8 (F3 B3 E4).8 (A3 B3 D4).4 r.8 (F3 A3 E4).8 (F3 B3 D4).4',
      'r.8 (E3 A3 D4).8 (E3 G3 C4).4 r.8 (G3 A3 D4).8 (G3 C4 E4).4'
    ]),
    bass([
      `Db3.4 { dy mp } C3.4 ${twoBeatBass('C3', 'G2')}`,
      typicalBass('A2', 'E3'), typicalBass('G2', 'D3'), typicalBass('C3', 'G2')
    ]),
    kit(oneBar(liveKit)),
    {
      name: '浩室底鼓与打击乐', program: 'percussion', playbackOnly: true,
      bars: oneBar(percussion)
    }
  ]
});

mountPlayableArrangementGrid(document.querySelector('[data-brazil-grid]'), {
  tempo: 120,
  subdivisions: 4,
  label: '四拍底鼓、边击、贝斯与钢琴切分的相对位置',
  rows: [
    { label: '浩室底鼓', drum: 35, events: [0, 4, 8, 12].map(step => ({ step, accent: true })) },
    { label: '原声低音鼓', drum: 36, events: [0, 6, 8, 14].map(step => ({ step })) },
    { label: '小鼓边击', drum: 37, events: [3, 11, 13].map(step => ({ step })) },
    { label: '贝斯', program: 38, pitch: 'C3', events: [
      { step: 0, length: 3 }, { step: 3, pitch: 'G2', length: 3 }, { step: 6, length: 2 },
      { step: 8, length: 3 }, { step: 11, pitch: 'G2', length: 3 }, { step: 14, length: 2 }
    ] },
    { label: '钢琴', events: [
      { step: 2, pitch: ['E4', 'G4', 'B4'] }, { step: 4, pitch: ['C4', 'E4', 'A4'] },
      { step: 10, pitch: ['D4', 'E4', 'A4'] }, { step: 12, pitch: ['C4', 'E4', 'G4'] }
    ] }
  ]
});

mountGenreVersions('genre-brazil-shared-tones', {
  tempo: 120,
  versions: {
    tonic: {
      summary: 'D♭–C 的低音变化发生时，E–G–B 全部连住。接 G/B 时，低音继续降到 B，上方只移动一个音。',
      tracks: [
        piano(['(E4 G4 B4).1 { ch "D♭m7♭5" }', '(E4{t} G4{t} B4{t}).1 { ch "Cmaj7" }', '(D4 G4{t} B4{t}).1 { ch "G/B" }']),
        bass(['Db3.1', 'C3.1', 'B2.1'])
      ]
    },
    subdominant: {
      summary: 'F♯移到 F 时，A–C–E 连成同一个上方音响。随后向 G7 转动，低音离开半音线。',
      tracks: [
        piano(['(A3 C4 E4).1 { ch "F♯m7♭5" }', '(A3{t} C4{t} E4{t}).1 { ch "Fmaj7" }', '(G3 B3 F4).1 { ch "G7" }']),
        bass(['F#2.1', 'F2.1', 'G2.1'])
      ]
    }
  }
});

mountGenreVersions('genre-brazil-rhythm', {
  tempo: 120,
  versions: {
    acoustic: { summary: '原声底鼓与边击形成交错，镲连续细分十六分音符。', tracks: [kit([liveKit])] },
    pulse: {
      summary: '叠一层每拍发声的重底鼓，同一个节奏有了稳定舞步。',
      tracks: [kit([liveKit]), { name: '浩室底鼓', program: 'percussion', bars: [houseKick] }]
    },
    full: {
      summary: '加入拍内打击乐、长短相接的贝斯和切分钢琴。乐谱以总谱标记起音，鼓声使用通用音色近似。',
      tracks: [
        kit([liveKit]), { name: '打击乐与底鼓', program: 'percussion', playbackOnly: true, bars: [percussion] },
        bass([typicalBass('C3', 'G2')]),
        piano([leadIn.replace('(E4 G4 B4)', '(E4 G4 A4)')])
      ]
    }
  }
});
