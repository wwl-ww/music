import { mountGenreArrangement, mountGenreVersions } from './genre-arrangement-demo.js';

const bass = (bars) => ({ name: '低音提琴', program: 32, header: String.raw`\clef F4`, bars });
const piano = (bars) => ({ name: '钢琴', program: 0, bars });
const ride = 'Ride.4 (Ride PedalHat).8 Ride.8 Ride.4 (Ride PedalHat).8 Ride.8';

mountGenreArrangement('genre-jazz-arrangement', {
  tempo: 128,
  swing: 't8',
  harmony: ['C6/9', 'Dm9', 'G13', 'C6/9'],
  summary: '低音提琴走四分音符，吊镲补出摇摆的后半拍。钢琴避开根音和五音，在旋律下方用短和弦填空。',
  tracks: [
    piano([
      '(E4 A4 D5).4 { dy mp } r.8 (E4 A4 D5).8 r.2',
      'r.4 r.8 (F4 C5 E5).8 r.4 (F4 C5 E5).4',
      '(F4 B4 E5).4 r.4 r.8 (F4 A4 B4).8 r.4',
      'r.8 (E4 A4 D5).8 r.4 (E4 A4 D5).2'
    ]),
    bass([
      'C3.4 { dy mp } E3.4 G2.4 C#3.4',
      'D3.4 F3.4 A2.4 Ab2.4',
      'G2.4 B2.4 D3.4 Db3.4',
      'C3.4 E3.4 G2.4 C3.4'
    ]),
    { name: '鼓组', program: 'percussion', bars: Array(4).fill(ride) }
  ]
});

const dominantUpper = label => piano([
  `(F3 B3 Eb4 A4).1 { ch "${label}" }`,
  '(E3 A3 D4 G4).1 { ch "C6/9" }'
]);
mountGenreVersions('genre-jazz-slash', {
  tempo: 104,
  versions: {
    root: {
      summary: 'G–C 的低音走纯四度，钢琴里的 B–F 给出属和弦的三音与七音。',
      tracks: [dominantUpper('G7(9,♭13)'), bass(['G2.1', 'C3.1'])]
    },
    altered: {
      summary: '钢琴声部完全相同。低音换成 D♭ 后半音下行至 C，上方的 B–F 仍能导向 C 和弦。',
      tracks: [dominantUpper('G7(9,♭13)/D♭'), bass(['Db3.1', 'C3.1'])]
    }
  }
});
