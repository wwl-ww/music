import { mountGenreVersions } from './genre-arrangement-demo.js';

const bassClef = '\\clef F4';
const two = '\\ts (2 4)';
const four = '\\ts (4 4)';
const intro = {
  piano: [
    'C4.8 { dy p } G4.8 E4.4 G4.8 C5.8 E5.4',
    'A3.8 { dy p } E4.8 C4.4 E4.8 A4.8 C5.4',
    '(A3 C4 F4).4 { dy f } (A3 C4 F4).8 (C4 F4 A4).8 (C4 F4 A4).4 (A3 C4 F4).4',
    '(B3 D4 G4).4 { dy f } (B3 D4 G4).4 (D4 G4 B4).8 r.8 r.4'
  ],
  strings: [
    'r.1', '(E4 A4 C5).1 { dy mp }',
    '(F4 A4 C5).2 { dy mf } (A4 C5 F5).2',
    '(G4 B4 D5).2 { dy f } (G4 B4 D5).8 r.8 r.4'
  ],
  bass: [
    'r.1', 'r.1', 'F2.4 { dy f } F2.8 C3.8 F2.4 C3.4',
    'G2.4 { dy f } D3.4 G2.8 r.8 r.4'
  ],
  drums: [
    'r.1', 'r.1', '(Kick Crash).8 { dy f } Hat.8 (Snare Hat).8 Hat.8 Kick.8 Hat.8 (Snare Hat).8 Hat.8',
    '(Kick Hat).8 { dy f } Hat.8 (Snare Hat).8 Hat.8 (Kick Snare).8 r.8 r.4'
  ]
};

function opening(buffer) {
  const tail = (last, extra) => buffer ? [two + ' ' + extra, four + ' ' + last] : [last];
  const parts = [
    ['主旋律', 73, ['r.1', 'r.1', 'r.1', 'r.1'], 'E5.4 { dy mf } G5.4 E5.4 C5.4', 'r.2'],
    ['钢琴', 0, intro.piano, '(C4 E4 G4).2 { dy p } E4.4 G4.4', 'G4.4 { dy p } C5.4'],
    ['弦乐', 48, intro.strings, 'r.1', 'r.2'],
    ['贝斯', 33, intro.bass, 'r.1', 'r.2', bassClef],
    ['鼓组', 'percussion', intro.drums, 'r.4 PedalHat.4 { dy p } r.4 PedalHat.4', 'r.4 PedalHat.4 { dy p }']
  ];
  return parts.map(([name, program, prefix, last, extra, header]) => ({
    name, program, header, bars: [...prefix, ...tail(last, extra)]
  }));
}

mountGenreVersions('genre-ballad-opening', {
  tempo: 74,
  versions: {
    buffer: {
      tracks: opening(true),
      summary: '第 4 小节后半全奏停下。另加的短小节先响钢琴、再出现轻镲。第 6 小节恢复四拍，主旋律进入。'
    },
    direct: {
      tracks: opening(false),
      summary: '第 4 小节后半全奏同样停下。第 5 小节主旋律与钢琴直接进入，少了器乐提前接回脉搏的两拍。'
    }
  }
});

function ending(hit) {
  const beat = 'E5.4 D5.4 G5.8 E5.8 D5.8 r.8';
  const piano = hit
    ? '(B3 D4 G4).4 { dy mp } (B3 D4 G4).4 (B3 D4 G4).8 { dy f } (B3 D4 G4).8 (B3 D4 G4).8 r.8'
    : '(B3 D4 G4).4 { dy mp } (D4 G4 B4).4 (B3 D4 G4).4 (D4 G4 B4).4';
  const bass = hit
    ? 'G2.4 { dy mp } D3.4 G2.8 { dy f } G2.8 G2.8 r.8'
    : 'G2.8 { dy mp } G2.8 D3.8 D3.8 G2.8 G2.8 D3.8 D3.8';
  const drums = hit
    ? '(Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8 (Kick Snare).8 { dy f } (Kick Snare).8 (Kick Snare).8 r.8'
    : '(Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8 (Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8';
  return [
    { name: '主旋律', program: 73, bars: [beat, 'C5.2 { dy mp } r.2'] },
    { name: '钢琴', program: 0, bars: [piano, '(C4 E4 G4).2 { dy p } E4.4 G4.4'] },
    { name: '贝斯', program: 33, bars: [bass, 'r.1'], header: bassClef },
    { name: '鼓组', program: 'percussion', bars: [drums, 'r.1'] }
  ];
}

mountGenreVersions('genre-ballad-band-hit', {
  tempo: 82,
  versions: {
    hit: {
      tracks: ending(true),
      summary: '第三拍拍头、后半和第四拍拍头三个主旋律起音都有鼓、贝斯与钢琴的合击。末半拍完全留白，下一小节只剩旋律和钢琴。'
    },
    continue: {
      tracks: ending(false),
      summary: '鼓、贝斯和钢琴维持前面的重复型。主旋律在末半拍休止时，踩镲和贝斯仍发声，段落收束相对连续。'
    }
  }
});

function interlude(returnToC) {
  const newKey = returnToC ? '\\ks C ' : '';
  const dominant = returnToC ? '(D3 B3 F4).1 { ch "G7" }' : '(A3 C4 F#4).1 { ch "D7" }';
  const tonic = returnToC ? '(G3 C4 E4)' : '(G3 B3 D4)';
  const root = returnToC ? 'C3' : 'G2';
  return [
    { name: '尾唱与主歌', program: 73, header: '\\ks G', bars: [
      'B4.4 A4.4 G4.4 D5.4', 'B4.4 D5.2 r.4', newKey + 'r.1', 'r.1', 'G4.4 G4.4 A4.4 G4.4'
    ] },
    { name: '钢琴', program: 0, header: '\\ks G', bars: [
      '(G3 B3 D4).1 { ch "G" dy mp }', '(E3 G3 B3 D4).1 { ch "Em7" }',
      newKey + dominant, `${tonic}.1 { ch "${returnToC ? 'C' : 'G'}" }`, `${tonic}.2 { dy p } ${tonic}.2`
    ] },
    { name: '贝斯', program: 33, header: bassClef + ' \\ks G', bars: [
      'r.1', 'r.1', newKey + (returnToC ? 'G2.2 D3.2' : 'D3.2 A2.2'), `${root}.1`, `${root}.1`
    ] },
    { name: '弦乐', program: 48, playbackOnly: true, bars: [
      '(D4 G4 B4).1 { dy pp }', '(D4{t} G4{t} B4{t}).1', 'r.1', 'r.1', 'r.1'
    ] },
    { name: '鼓组', program: 'percussion', playbackOnly: true, bars: [
      'r.1', 'r.1', 'Kick.4 Hat.4 Kick.4 Snare.4', 'Kick.4 Hat.4 Kick.4 Snare.4', 'r.1'
    ] }
  ];
}

mountGenreVersions('genre-ballad-return-key', {
  tempo: 78,
  versions: {
    return: {
      tracks: interlude(true),
      summary: 'G–Em7 ｜ G7–C。前两小节用钢琴和弦乐承接尾唱，后两小节贝斯与鼓合入。F 下行到 E，B 上行到 C，第 5 小节在 C 上起句。'
    },
    stay: {
      tracks: interlude(false),
      summary: 'G–Em7 ｜ D7–G。尾唱、入鼓位置和主歌的起句相同。第 3 小节用 F♯，低音由 D 回到 G，听觉仍留在副歌的调。'
    }
  }
});
