import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { genreTrack, mountGenreArrangement } from './genre-arrangement-demo.js';
import { arrangementBar, drumBar, hits, noteAt } from './genre-arrangement-10-13-rhythm.js';

const tempo = 60;
const harmony = [
  ['E3', 'G3', 'B3', 'C4'], ['A3', 'C4', 'E4', 'G4'],
  ['B3', 'F4', 'Ab4'], ['E3', 'G3', 'C4']
];
const piano = harmony.map((notes, bar) => arrangementBar([
  noteAt(0, notes, 4, 'mp'),
  noteAt(4, notes, bar === 1 ? 2 : 4, 'p'),
  ...(bar === 1 ? [noteAt(6, notes, 2, 'p')] : []),
  noteAt(8, notes, 4, 'mp'),
  noteAt(12, notes, 4, 'p')
]));
const bass = [
  'C3.2 { dy p } G2.4 C3.8 { d } E3.16',
  'F2.2 { dy mp } A2.4 C3.8 { d } F#2.16',
  'G2.2 { dy mf } D3.4 G2.8 { d } B2.16',
  'C3.2 { dy mp } G2.4 C3.4'
];
const guitar = [
  'r.1',
  'F3.16 { dy p } A3.16 C4.16 E4.16 r.4 F3.16 A3.16 C4.16 r.16 E4.8 r.8',
  'G3.16 { dy p } B3.16 D4.16 F4.16 r.4 G3.16 B3.16 D4.16 r.16 F4.8 r.8',
  'C3.16 { dy p } E3.16 G3.16 C4.16 r.2 r.4'
];
const kick = hits([0, 2, 8], 'Kick', 'mf');
const backbeat = hits([4, 12], 'Snare', 'mf');
const ghosts = hits([3, 7, 9, 11, 15], 'Snare', 'pp');
const ride = hits([0, 2, 4, 6, 8, 10, 12, 14], 'Ride', 'mp');
const drumDetails = drumBar([kick, backbeat, ghosts, ride]);

mountGenreArrangement('genre-ballad-arrangement', {
  tempo,
  harmony: ['Cmaj7', 'Fmaj9', 'G7(♭9)', 'C'],
  summary: '钢琴四分和弦建立脉搏。钢弦吉他和弦乐随后进入，第三小节加入略密的鼓组，句尾回到较疏的声部。',
  tracks: [
    { name: '钢琴', program: 0, bars: piano },
    { name: '指弹贝斯', program: 33, header: '\\clef F4', bars: bass },
    { name: '钢弦吉他', program: 25, playbackOnly: true, bars: guitar },
    { name: '弦乐', program: 48, playbackOnly: true, bars: [
      'r.1', '(A3 C4 E4 G4).1 { dy pp }',
      '(B3 F4 Ab4).2 { dy p } (B3 D4 F4).2', '(C4 E4 G4).1 { dy pp }'
    ] },
    { name: '鼓组', program: 'percussion', playbackOnly: true, bars: [
      'r.1', 'Kick.4 { dy p } Ride.4 Kick.4 Ride.4',
      drumDetails, 'Kick.4 { dy p } r.4 Ride.4 r.4'
    ] }
  ]
});

mountPlayableArrangementGrid(document.getElementById('genre-ballad-drums'), {
  tempo,
  rows: [
    { label: '底鼓', events: kick.map(event => ({ ...event, accent: event.step === 0 })) },
    { label: '小鼓重击', events: backbeat.map(event => ({ ...event, accent: true })) },
    { label: '极轻小鼓', events: ghosts },
    { label: '叠音镲', events: ride }
  ],
  label: '十六分音符格中的底鼓、反拍重击与极轻小鼓',
  notes: { scoreTracks: [genreTrack({ name: '鼓组', program: 'percussion', bars: [drumDetails] })] }
});

const localMelody = ['E5.4 G5.4 G5.4 G5{t}.4', 'C5.2 r.4 D5.4', 'E5.2 G5.2'];
const firstUpper = '(E4 G4 B4).2 { ch "Cmaj7" dy p } (D4 G4 A4).4 { ch "Bm7(♯5)" } (G#3 B3 D4).4 { ch "E7(♯9)" }';
const firstBass = 'C3.2 B2.4 E3.4';
const lastUpper = '(A3 C4 E4 G4).1 { ch "Fmaj9" }';
const harmonySteps = [
  {
    label: '二–五骨架',
    description: 'B 上的和弦经 E7 落到 Am7，第二组 Gm7–C9 落到 Fmaj9。两处旋律长音仍在原来的拍上。',
    upper: '(A3 C4 G4).2 { ch "Am7" } (F3 Bb3 D4).4 { ch "Gm7" } (E3 Bb3 G4).4 { ch "C9" }',
    bass: 'A2.2 G2.4 C3.4'
  },
  {
    label: '三连音半音下行',
    description: '第 2 小节第 3 拍插入三连音，低音 A–A♭–G 等距下行。主旋律的休止露出这三次伴奏起音。',
    upper: '(A3 C4 G4).2 { ch "Am7" } (A3 C4 G4).8 { tu 3 } (Gb3 Cb4 Eb4).8 { tu 3 ch "A♭m7" } (F3 Bb3 D4).8 { tu 3 ch "Gm7" } (E3 Bb3 G4).4 { ch "C9" }',
    bass: 'A2.2 A2.8 { tu 3 } Ab2.8 { tu 3 } G2.8 { tu 3 } C3.4'
  }
];
mountScoreWritingSteps(document.getElementById('genre-ballad-harmony-steps'), {
  score: { tempo, soundFontUrl },
  steps: harmonySteps.map(({ label, description, upper, bass: middleBass }) => ({
    label, description,
    notes: { scoreTracks: [
      genreTrack({ name: '旋律', program: 73, bars: localMelody }),
      genreTrack({ name: '钢琴', program: 0, bars: [firstUpper, upper, lastUpper] }),
      genreTrack({ name: '低音', program: 33, header: '\\clef F4', bars: [firstBass, middleBass, 'F2.1'] })
    ] }
  }))
});

const transitionSteps = [
  {
    label: '四拍后进入',
    description: '第 2 小节保留四拍，旋律 B 之后等待两拍。第 3 小节的 C 直接进入主和弦。'
  },
  {
    label: '缩为二拍',
    description: '第 2 小节仅有两拍，C 提前两拍进入。音高和每拍时长保持原样。',
    short: true
  },
  {
    label: '缩节并延迟回主',
    description: 'C 准时进入并保持。走到 F♯m7(♭5) 时它是降五音，低音 F♯–F 半音下行，再回 C。',
    short: true,
    detour: true
  }
];

function transitionScore({ short, detour }) {
  const measure = music => short ? '\\ts (2 4) ' + music : music + ' r.2';
  const arrival = music => short ? '\\ts (4 4) ' + music : music;
  const tonic = '(E4 G4 C5).1 { ch "C" dy p }';
  return { scoreTracks: [
    genreTrack({ name: '旋律', program: 73,
      bars: ['E5.2 F5.2', measure('D5.4 B4.4'), arrival('C5.1'), 'C5{t}.1'] }),
    genreTrack({ name: '钢琴', program: 0, bars: [
      '(E4 G4 B4).2 { ch "Cmaj7" dy p } (A3 C4 E4).2 { ch "Fmaj7" }',
      measure('(A3 C4 F4).4 { ch "Dm7" } (B3 D4 F4).4 { ch "G7" }'),
      arrival(detour ? '(A3 C4 E4).2 { ch "F♯m7(♭5)" } (A3 C4{t} E4{t}).2 { ch "Fmaj7" }' : tonic),
      tonic
    ] }),
    genreTrack({ name: '低音', program: 33, header: '\\clef F4',
      bars: ['C3.2 F2.2', measure('D3.4 G2.4'), arrival(detour ? 'F#2.2 F2.2' : 'C3.1'), 'C3.1'] })
  ] };
}

mountScoreWritingSteps(document.getElementById('genre-ballad-transition-steps'), {
  score: { tempo, soundFontUrl },
  steps: transitionSteps.map(step => ({ ...step, notes: transitionScore(step) }))
});
