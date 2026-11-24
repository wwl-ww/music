import { mountGenreVersions } from './genre-arrangement-demo.js';

const melody = [
  '\\section ("主歌") E5.4 D5.4 C5.2', 'D5.4 E5.4 G5.2',
  '\\section ("预副歌") E5.4 D5.4 C5.2', 'D5.4 E5.4 G5.2',
  '\\section ("副歌") E5.4 D5.4 C5.2', 'D5.4 E5.4 G5.2'
];
const harmony = [
  'C3 G3 C4 E4', 'G2 G3 B3 D4',
  'A2 E3 A3 C4', 'G2 D3 G3 B3',
  'C3 G3 C4 E4', 'F2 A3 C4 F4'
];
const roots = harmony.map(chord => chord.split(' ')[0]);
const mainTrack = { name: '主旋律', program: 73, bars: melody };
const fullPiano = harmony.map(chord => '(' + chord + ').4 { dy mf } r.8 (' + chord + ').8 (' + chord + ').4 (' + chord + ').4');
const fullBass = roots.map(root => root + '.4 { dy mf } r.8 ' + root + '.8 ' + root + '.4 ' + root + '.4');
const fullDrums = '(Kick Hat).8 Hat.8 (Snare Hat).8 (Kick Hat).8 (Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8';

function tracks(piano, bass, drums) {
  return [
    mainTrack,
    { name: '钢琴', program: 0, bars: piano },
    { name: '贝斯', program: 33, bars: bass, header: '\\clef F4' },
    { name: '鼓组', program: 'percussion', bars: drums }
  ];
}

mountGenreVersions('genre-form-contrast', {
  tempo: 104,
  versions: {
    contour: {
      tracks: tracks(
        ['(C3 G3 C4 E4).2 { dy p } (G3 C4 E4).2', '(G3 B3 D4).1 { dy p }',
          '(A3 C4 E4).1 { dy pp }', '(G3 B3 D4).2 { dy p } (G3 B3 D4).4 (G3 B3 D4).4',
          ...fullPiano.slice(4)],
        ['r.1', 'r.1', 'r.1', 'r.2 D2.4 { dy mp } G2.4', ...fullBass.slice(4)],
        ['r.1', 'r.1', 'r.1', 'r.2 Hat.8 { dy p } Hat.8 (Snare Hat).8 { dy mp } Hat.8', fullDrums, fullDrums]
      ),
      summary: '第 1–2 小节钢琴托住主歌，第 3 小节预副歌的起音减到一个和弦。第 4 小节后半节奏组逐步进入，第 5 小节副歌时钢琴、贝斯和鼓同时恢复完整律动。'
    },
    flat: {
      tracks: tracks(fullPiano, fullBass, melody.map(() => fullDrums)),
      summary: '旋律、和声与速度维持不变。每两小节仍有乐句边界，全段配器与节奏密度接近，副歌入口较难分辨。'
    }
  }
});
