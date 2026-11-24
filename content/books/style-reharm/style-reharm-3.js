import { mountGuitarChordDiagrams } from '../../shared/formats/guitar-chord-diagram.js';
import { baseHarmony, transposeMelody } from './style-reharm-base.js';
import { harmonyBars, mountReharmDemo, reharmTrack } from './style-reharm-3-5.js';

const key = 'B';
const melody = transposeMelody(-1);
const voicings = {
  B: 'B2 F#3 B3 D#4 F#4',
  E: 'E2 B2 E3 G#3 B3 E4',
  'F♯': 'F#2 C#3 F#3 A#3 C#4 F#4',
  A: 'A2 E3 A3 C#4 E4',
  'Badd9': 'B2 F#3 B3 C#4 F#4',
  'Aadd9': 'A2 E3 B3 C#4 E4',
  'Badd9/C♯': 'C#3 F#3 B3 C#4 F#4',
  'Badd9/D♯': 'D#3 F#3 B3 C#4 F#4',
  'Badd9/A♯': 'A#2 F#3 B3 C#4 F#4',
  'G♯m7(11)': 'G#2 F#3 B3 C#4 F#4',
  'E6/9': 'E2 F#3 B3 C#4 F#4',
  'F♯sus4': 'F#2 F#3 B3 C#4 F#4',
  'Eadd9': 'E2 B2 F#3 G#3 B3 E4',
  'Eadd9/G♯': 'G#2 E3 B3 F#4'
};

const originalSymbols = { C: 'B', F: 'E', G: 'F♯' };
const original = baseHarmony.map(name => originalSymbols[name]);
const tonic = [
  'B', 'B', 'B', 'B', 'B', 'B', 'E', 'F♯',
  'F♯', 'B', 'E', 'B', 'B', 'E', 'E', 'B'
];
const borrowed = tonic.map((name, index) => [2, 9].includes(index) ? 'A' : name);
const final = [
  'Badd9', 'Badd9', 'Aadd9', 'Badd9', 'Badd9', 'G♯m7(11)', 'E6/9', 'F♯sus4',
  'F♯sus4', 'Aadd9', 'Eadd9/G♯', 'F♯sus4', 'G♯m7(11)', 'Eadd9', 'Eadd9', 'Badd9',
  'Badd9', 'Badd9'
];
const strokes = { 4: [[4, false, 'p'], [8, false, 'pp'], [8, true], [4, false, 'p'], [8, false, 'pp'], [8, false, 'pp']] };

function arrangement(harmony, summary, { guitar = 27, rhythm, line = melody } = {}) {
  return {
    summary,
    tracks: [
      reharmTrack('主旋律', line, { key }),
      reharmTrack('电吉他', harmonyBars(harmony, voicings, rhythm), { program: guitar, key })
    ]
  };
}

const codaMelody = [...melody, 'r.1', 'r.1'];
mountReharmDemo('reharm-rock-comparison', {
  base: arrangement(original, '十六小节一起移低半音到 B 大调，仍用 B、E、F♯ 三个大三和弦标明功能。'),
  tonic: arrangement(tonic, '第 3 小节的 E 改成 B，开头六小节保持主和弦。E 与 F♯留在需要转向的位置。'),
  borrowed: arrangement(borrowed, '第 3 与第 10 小节借入 A 大三和弦，形成 B 大调的降七级。第 10 小节的旋律 D♯先作升十一音，再落到 F♯和 D♯。'),
  clean: arrangement(final, '用清音听固定上部与低音换位，带 C♯的 Badd9 在尾声继续两小节。', { rhythm: strokes, line: codaMelody }),
  final: arrangement(final, '换成失真音色，吉他谱、速度、低音与清音成品完全相同。', { guitar: 30, rhythm: strokes, line: codaMelody })
}, 136, { scrollScore: true });

function bassColor(symbol, summary) {
  return {
    summary,
    tracks: [reharmTrack('固定上部与低音', harmonyBars([symbol], voicings), { program: 27, key })]
  };
}

mountReharmDemo('reharm-rock-bass-color', {
  b: bassColor('Badd9', '低音 B2。上部四声为 F♯3–B3–C♯4–F♯4，C♯ 是九音，三音 D♯ 留空。'),
  cs: bassColor('Badd9/C♯', '低音 C♯3 与上部 C♯4 相隔八度，仍可把上部听作 B 和弦的省三音声位。'),
  ds: bassColor('Badd9/D♯', '低音 D♯3 补入 B 的大三音。谱面可听见理论声位，吉他固定把位需要跨第 2 至第 6 品。'),
  e: bassColor('E6/9', 'E 用第六弦空弦。上部 C♯和 F♯，对 E 分别为六音与九音。'),
  fs: bassColor('F♯sus4', '低音 F♯。上部 B 是四音，C♯ 是五音，四音占据了大三音 A♯的位置。'),
  gs: bassColor('G♯m7(11)', '低音 G♯。B、F♯、C♯ 分别成为小三音、小七音与十一音，五音 D♯ 省略。'),
  as: bassColor('Badd9/A♯', '低音 A♯2 与上部 B3 相距小九度。上部不动时，最低处会出现与主音邻近的导音张力。')
}, 84);

const bassExcerpt = ['B4.2 F#4.2', 'F#4.2 B4.2', 'B4.2 C#5.2'];
mountReharmDemo('reharm-rock-bass', {
  flat: arrangement(['Badd9', 'Badd9', 'E6/9'], '前两小节在同一个 B 低音上，第三小节直接降到 E。上方四音固定。', { line: bassExcerpt }),
  descending: arrangement(['Badd9', 'G♯m7(11)', 'E6/9'], '低音走 B–G♯–E，上层的 B、C♯与 F♯仍固定。', { line: bassExcerpt })
}, 112);

mountGuitarChordDiagrams(document.getElementById('reharm-rock-guitar'), [
  { label: 'Badd9 · 省三音', positions: [null, 2, 4, 4, 2, 2], degrees: [null, 'R', '5', 'R', '9', '5'] },
  { label: 'G♯m7(11) · 省五音', positions: [4, null, 4, 4, 2, 2], degrees: ['R', null, '♭7', '♭3', '11', '♭7'] },
  { label: 'F♯sus4', positions: [2, null, 4, 4, 2, 2], degrees: ['R', null, 'R', '4', '5', 'R'] }
]);
