import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { genreTrack, mountGenreArrangement, mountGenreVersions } from './genre-arrangement-demo.js';

const bass = bars => ({ name: '合成贝斯', program: 38, header: String.raw`\clef F4`, bars });
const keys = bars => ({ name: '电钢琴', program: 4, bars });
const firstBeat = '(Kick SubKick Hat).8 Hat.8';
const backbeat = '(Snare Clap Hat).8 Hat.8';
const offset = 'Hat.8 (Kick Hat).8';
const swungOffset = 'Hat.16 Kick.16 (Kick Hat).8';
const firstKeys = '(A3 C4 E4 G4).1 { dy p }';
const drums = [
  `${firstBeat} ${backbeat} ${swungOffset} ${backbeat}`,
  `${firstBeat} ${backbeat} ${offset} (Snare Rim Hat).8 Hat.16 Rim.16`
];

function staggeredBass(root) {
  return `${root}.8 { dy mp d } r.16 r.4 r.8 ${root}.8 r.4`;
}

mountGenreArrangement('genre-rnb-arrangement', {
  tempo: 76,
  swing: 't16',
  harmony: ['Fmaj9', 'Dm7/G', 'G13', 'Cmaj9'],
  summary: '电钢琴撑住整小节。大鼓和贝斯共同给第 1 拍落点，并在第 3 拍后半发出第二次起音。底鼓层与短促的反拍保留了旋律周围的空间。',
  tracks: [
    keys([firstKeys, '(F3 A3 C4 D4).1', '(F3 B3 E4 A4).1', '(G3 B3 D4 E4).1']),
    bass(['F2', 'G2', 'G2', 'C2'].map(staggeredBass)),
    { name: '取样风格鼓组', program: 'percussion', bars: [...drums, ...drums] }
  ]
});

mountPlayableArrangementGrid(document.querySelector('[data-rnb-grid]'), {
  tempo: 76,
  subdivisions: 4,
  label: '一小节中鼓组、贝斯和电钢琴的起音与持续时间',
  rows: [
    { label: '踩镲', events: Array.from({ length: 8 }, (_, index) => ({ step: index * 2 })) },
    { label: '底鼓', events: [{ step: 0, accent: true }, { step: 9 }, { step: 10 }] },
    { label: '小鼓与弹指', events: [{ step: 4, accent: true }, { step: 12, accent: true }] },
    { label: '贝斯', events: [{ step: 0, length: 3 }, { step: 10, length: 2 }] },
    { label: '电钢琴', events: [{ step: 0, length: 16 }] }
  ],
  notes: { scoreTracks: [
    { name: '鼓组', program: 'percussion', header: '\\tf t16', bars: [drums[0]] },
    bass([staggeredBass('F2')]),
    keys([firstKeys])
  ].map(genreTrack) }
});

const rooted = { name: 'G 低音', program: 38, header: String.raw`\clef F4`, bars: ['G2.1'] };
mountGenreVersions('genre-rnb-suspension', {
  tempo: 76,
  versions: {
    sus: {
      summary: '从下到上是 G、D、F、A、C。G9sus4 的四音与上方 Dm7 的 C 是同一音。',
      tracks: [keys(['(D3 F3 A3 C4).1 { ch "Dm7/G" }']), rooted]
    },
    extended: {
      summary: '加上 E，得到 Dm9/G。E 相对 G 是十三音，四音 C 仍在。',
      tracks: [keys(['(D3 F3 A3 C4 E4).1 { ch "Dm9/G" }']), rooted]
    },
    resolved: {
      summary: '上方 C 下行半音到 B，属三音出现。低音 G 与色彩音 E 留在原处。',
      tracks: [keys(['(D3 F3 A3 B3 E4).1 { ch "G13" }']), rooted]
    }
  }
});

const fixedPulse = `${firstBeat} ${backbeat} ${offset} ${backbeat}`;
const drum = bar => ({ name: '鼓组', program: 'percussion', bars: [bar] });
const sixteenthKicks = '(Kick SubKick Hat).16 r.16 Hat.16 Kick.16 (Snare Clap Hat).16 r.16 Hat.16 r.16 Hat.16 Kick.16 (Kick Hat).16 r.16 (Snare Clap Hat).16 r.16 Hat.16 r.16';
mountGenreVersions('genre-rnb-shuffle', {
  tempo: 76,
  versions: {
    straight: {
      summary: '三次细分底鼓和踩镲都落在平均分割的十六分格。',
      tracks: [drum(sixteenthKicks)]
    },
    shuffle: {
      summary: '十六分音符成对长短变化。八分踩镲的骨架不变，拍内后半个十六分格上的底鼓稍迟。',
      tracks: [{ ...drum(sixteenthKicks), header: String.raw`\tf t16` }]
    },
    reduced: {
      summary: '稀疏的节奏保留首拍、第三拍后半与两次反拍，便于辨认贝斯可落下的地方。',
      tracks: [drum(fixedPulse), bass([staggeredBass('F2')])]
    }
  }
});
