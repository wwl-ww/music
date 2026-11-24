import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { mountGuitarChordDiagrams } from '../../shared/formats/guitar-chord-diagram.js';
import { baseHarmony, baseMelody } from './style-reharm-base.js';
import { harmonyBars, mountReharmDemo, reharmTrack } from './style-reharm-3-5.js';

const voicings = {
  C: ['C3', 'E3 G3 C4'], F: ['F2', 'F3 A3 C4'], G: ['G2', 'G3 B3 D4'],
  C7: ['C3', 'E3 Bb3 G4'], C9: ['C3', 'E3 Bb3 D4'],
  F7: ['F2', 'Eb3 A3 C4'], F9: ['F2', 'A3 Eb4 G4'],
  Fmaj7: ['F2', 'A3 C4 E5'],
  'F7 · 七音高位': ['F2', 'A3 C4 Eb5'],
  'F7 · 七音低位': ['F2', 'A3 C4 Eb4'],
  'B7 · 三音低位': ['B2', 'D#3 F#3 A3'],
  D7: ['D3', 'F#3 A3 C4'], D9: ['D3', 'F#3 C4 E4'],
  G7: ['G2', 'F3 B3 D4'], G9: ['G2', 'F3 B3 D4 A4'],
  'Dm7/G': ['G2', 'F3 A3 C4 D4'], 'F/G': ['G2', 'F3 A3 C4'],
  Em7: ['E2', 'G3 B3 D4'], E7: ['E2', 'G#3 B3 D4'],
  'A♭7': ['Ab2', 'Gb3 C4 Eb4'], 'B♭7': ['Bb2', 'Ab3 D4 F4'],
  'B♭9': ['Bb2', 'Ab3 D4 F4 C5'], B7: ['B2', 'A3 D#4 F#4'],
  'B7(♯9)': ['B2', 'D#3 A3 D4'],
  Am7: ['A2', 'G3 C4 E4'], 'Am7(11)': ['A2', 'G3 C4 D4 G4']
};

const guitar = Object.fromEntries(Object.entries(voicings).map(([name, [, upper]]) => [name, upper]));
const roots = Object.fromEntries(Object.entries(voicings).map(([name, [bass]]) => [name, bass]));
const symbols = {
  'F7 · 七音高位': 'F7',
  'F7 · 七音低位': 'F7',
  'B7 · 三音低位': 'B7'
};

const sevenths = [
  'C7', 'C7', 'F7', 'C7', 'C7', 'Am7', 'D7', 'D7',
  'G7', 'C7', 'F7', 'Em7', 'Am7', 'D7', 'G7', 'C7'
];
const chromatic = [
  ...sevenths.slice(0, 7), 'A♭7', 'G7', 'C7', 'B7', 'B♭7', ...sevenths.slice(12)
];
const extended = [
  'C9', 'C9', 'F9', 'C9', 'C9', 'Am7', 'D9', 'A♭7',
  'G7', 'C9', 'B7(♯9)', 'B♭9', 'Am7(11)', 'D9', 'G9', 'C9'
];
const tail = ['F9', 'C9', 'F9', 'C9'];
const cutting = {
  4: [[8, false, 'p'], [8, true], [8, true], [8, false, 'mp'], [8, false, 'p'], [8, true], [8, true], [8, false, 'mp']]
};

function bassBars(harmony, shuffle) {
  return harmony.map(name => {
    const root = roots[name];
    return shuffle
      ? `${root}.4 { dy mf } r.8 ${root}.8 { dy p } ${root}.4 ${root}.8 { dy p } r.8`
      : `${root}.1 { dy mp }`;
  });
}

function arrangement(harmony, summary, { line = baseMelody, shuffle = false } = {}) {
  const material = [
    reharmTrack('主旋律', line),
    reharmTrack('切奏吉他', harmonyBars(harmony, guitar, shuffle ? cutting : {}, symbols), { program: 27 }),
    reharmTrack('贝斯', bassBars(harmony, shuffle), { program: 33, clef: 'F4' })
  ];
  if (shuffle) material[0].phrase = String.raw`\tf t8 ${material[0].phrase}`;
  return { summary, tracks: material };
}

mountReharmDemo('reharm-funk-comparison', {
  base: arrangement(baseHarmony, 'C、F、G 三个大三和弦交代原来的功能分区，旋律和低音主要按调内自然音进行。'),
  seventh: arrangement(sevenths, 'C7 和 F7 分别稳定在主和弦与下属位置。D7 的 F♯也加入调外色彩。'),
  chromatic: arrangement(chromatic, '第 8 小节奏 A♭7 接 G7。第 10 至 13 小节形成 C–B–B♭–A 的低音。'),
  voicing: arrangement(extended, '第 10、11 小节用 D 把 C9 和 B7(♯9) 接起来；第 13 小节保留两组四度。'),
  final: arrangement([...extended, ...tail], '相同和声音高改用交错短音与休止，贝斯确认落点。末尾用 F9–C9 反复两次。', {
    shuffle: true, line: [...baseMelody, 'r.1', 'r.1', 'r.1', 'r.1']
  })
}, 112, { scrollScore: true });

mountPlayableArrangementGrid(document.getElementById('reharm-funk-shuffle'), {
  tempo: 112,
  label: '摆动八分音符下的吉他与贝斯拍位',
  subdivisions: 3,
  rows: [
    { label: '吉他短音', program: 27, pitch: guitar.C9.split(' '),
      events: [{ step: 0 }, { step: 5 }, { step: 6 }, { step: 11 }] },
    { label: '贝斯', program: 33, pitch: roots.C9,
      events: [{ step: 0, length: 3 }, { step: 5 }, { step: 6, length: 3 }, { step: 9 }] }
  ]
});

const clashLine = ['E5.2 D5.4 C5.4', 'F5.2 D5.4 Bb4.4'];
mountReharmDemo('reharm-funk-clash', {
  close: arrangement(['F7 · 七音高位', 'B♭7'], '第一小节 E5 与 E♭5 紧邻。该声位出现一拍以上的直接半音碰撞。', { line: clashLine }),
  wide: arrangement(['F7 · 七音低位', 'B♭7'], 'E♭改放低一个八度，与 E5 相距小九度。F7 的蓝调七音仍在。', { line: clashLine }),
  major: arrangement(['Fmaj7', 'B♭7'], '用 E 代 E♭，和弦上部与旋律同音。Fmaj7 的大七音色取代原来 F7 的蓝调小七音。', { line: clashLine }),
  tritone: arrangement(['B7 · 三音低位', 'B♭7'], 'B7 的三音 D♯ 与原来的 E♭等音，移到低处后让 E 的紧邻碰撞疏开，同时低音改为 B–B♭。', { line: clashLine })
}, 88);

const descentLine = baseMelody.slice(9, 13);
mountReharmDemo('reharm-funk-descent', {
  draft: arrangement(['C7', 'F7', 'Em7', 'Am7'], 'C–F–E–A 保留调内低音，第 12 小节的 Em7 还没有强烈导向 A 的三音。', { line: descentLine }),
  dominant: arrangement(['C7', 'F7', 'E7', 'Am7'], '只改第 12 小节，升高 G 成为 G♯。E7 与 Em7 低音相同，内部导向不同。', { line: descentLine }),
  substitute: arrangement(['C7', 'F7', 'B♭7', 'Am7'], 'B♭7 仍有 D 和 A♭（等音 G♯），低音换为比 A 高半音的 B♭。', { line: descentLine }),
  descent: arrangement(['C7', 'B7', 'B♭7', 'Am7'], 'F7 也替换为 B7，根音依次为 C、B、B♭、A。', { line: descentLine })
}, 96);

const suspensionLine = ['D5.4 G4.4 G4.2', 'C5.4 E5.4 C5.2'];
mountReharmDemo('reharm-funk-suspension', {
  plain: arrangement(['G7', 'C7'], 'G7 的 B 与 F 确立强烈属功能。', { line: suspensionLine }),
  ninth: arrangement(['G9', 'C7'], '上部增加九音 A；B 与 F 仍在。', { line: suspensionLine }),
  dm: arrangement(['Dm7/G', 'C7'], 'G 低音不动，上部用 Dm7 的 D、F、A、C，省去 B。', { line: suspensionLine }),
  f: arrangement(['F/G', 'C7'], 'G 低音上只用 F、A、C，挂留的上部更简明。', { line: suspensionLine })
}, 90);

mountGuitarChordDiagrams(document.getElementById('reharm-funk-guitar'), [
  { label: 'C9 · 省五音', positions: [null, 3, 2, 3, 3, null], degrees: [null, 'R', '3', '♭7', '9', null] },
  { label: 'Am7(11) · 省五音', positions: [null, 0, 5, 5, 3, 3], degrees: [null, 'R', '♭7', '♭3', '11', '♭7'], firstFret: 3 },
  { label: 'G9 · 贝斯弹根音', positions: [null, null, 3, 4, 3, 5], degrees: [null, null, '♭7', '3', '5', '9'], firstFret: 3 }
]);
