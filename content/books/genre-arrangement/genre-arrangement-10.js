import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { genreTrack, mountGenreArrangement } from './genre-arrangement-demo.js';
import { arrangementBar, drumBar, eighthSteps, hits, noteAt } from './genre-arrangement-10-13-rhythm.js';

const tempo = 120;
const voicings = [
  ['E4', 'G4', 'B4', 'D5'], ['A3', 'C4', 'E4', 'G4'],
  ['B3', 'E4', 'F4', 'A4'], ['E4', 'G4', 'B4', 'D5']
];
const bassline = [
  ['C3', 'G2', 'G2'], ['F2', 'C3', 'C3'],
  ['G2', 'D3', 'D3'], ['C3', 'G2', 'C3']
];
const chordEntries = [
  [0, 4, 10, 14], [0, 4, 6, 12], [0, 4, 10, 14], [0, 6, 10, 12]
];
const earlyChanges = new Set([0, 2]);
const guitarEvents = chordEntries.map((positions, bar) => positions.map(step => {
  const early = earlyChanges.has(bar) && step === 14;
  return noteAt(step, voicings[early ? bar + 1 : bar], step === 0 ? 3 : 2, step % 4 ? 'mf' : 'mp');
}));
const bassEvents = bassline.map(([root, fifth, pickup]) => [
  noteAt(0, root, 6, 'mf'), noteAt(6, root, 2, 'p'),
  noteAt(8, fifth, 6, 'mf'), noteAt(14, pickup, 2, 'p')
]);
const guitar = guitarEvents.map(arrangementBar);
const bass = bassEvents.map(arrangementBar);
const drum = [0, 1].map(bar => drumBar([
  hits([0, 8], 'Kick', 'mp'), hits([6, 14], 'Kick', 'p'),
  hits(bar ? [0, 6, 12] : [0, 4, 10], 'Rim', 'mp'),
  eighthSteps.map(step => noteAt(step, 'Hat', 1, step % 4 === 0 ? 'p' : 'pp')),
  hits([2, 6, 10, 14], 'Shaker', 'pp')
]));

mountGenreArrangement('genre-bossa-arrangement', {
  tempo,
  harmony: ['Cmaj9', 'Fmaj9', 'G13', 'Cmaj9'],
  summary: '尼龙弦吉他在第 1、3 小节末提前换弦。低音提琴仍在下个小节拍头才交代新根音，电钢琴长音在后层。',
  tracks: [
    { name: '尼龙弦吉他', program: 24, bars: guitar },
    { name: '低音提琴', program: 32, header: '\\clef F4', bars: bass },
    { name: '电钢琴', program: 4, playbackOnly: true, bars: voicings.map((notes, index) =>
      arrangementBar([noteAt(0, notes, earlyChanges.has(index) ? 12 : 16, 'p')])) },
    { name: '轻鼓组', program: 'percussion', playbackOnly: true, bars: [...drum, ...drum] }
  ]
});

const eighthOnsets = (events, offset, isAccent = () => false) =>
  events.map(({ step }) => ({ step: offset + step / 2, accent: isAccent(step) }));
mountPlayableArrangementGrid(document.getElementById('genre-bossa-grid'), {
  beats: 8,
  subdivisions: 2,
  tempo,
  rows: [
    { label: '吉他 · Cmaj9', events: eighthOnsets(guitarEvents[0].slice(0, -1), 0) },
    { label: '吉他 · Fmaj9', events: [
      ...eighthOnsets(guitarEvents[0].slice(-1), 0, () => true),
      ...eighthOnsets(guitarEvents[1], 8)
    ] },
    { label: '贝斯 · C 和弦内', events: eighthOnsets(bassEvents[0], 0, step => step % 8 === 0) },
    { label: '贝斯 · F 和弦内', events: eighthOnsets(bassEvents[1], 8, step => step % 8 === 0) }
  ],
  notes: { scoreTracks: [
    genreTrack({ name: '尼龙弦吉他', program: 24, bars: guitar.slice(0, 2) }),
    genreTrack({ name: '低音提琴', program: 32, header: '\\clef F4', bars: bass.slice(0, 2) })
  ] },
  label: '巴萨诺瓦吉他在第一小节末提前换和弦，贝斯在第二小节拍头换和弦'
});

const finalVoicing = '(B3 E4 G4 D5).1 { ch "Cmaj9" dy p }';
const endings = [
  {
    label: '降二级大九 → 主大九',
    description: '旋律 C5 保持。低音 D♭3–C3 半音下行，内声的 F4–E4 与 A♭4–G4 同向移动。',
    upper: '(F4 Ab4 Eb5).1 { ch "D♭maj9" dy p }',
    bass: 'Db3.1'
  },
  {
    label: '属七 → 主大九',
    description: '旋律仍保持 C5。低音 G2–C3，内声保留 B3 和 D5，并让 F4 下行解决到 E4。',
    upper: '(B3 F4 G4 D5).1 { ch "G7" dy p }',
    bass: 'G2.1'
  }
];
mountScoreWritingSteps(document.getElementById('genre-bossa-ending'), {
  score: { tempo, soundFontUrl },
  steps: endings.map(({ label, description, upper, bass }) => ({
    label,
    description,
    notes: { scoreTracks: [
      genreTrack({ name: '旋律', program: 73, bars: ['C5.1', 'C5{t}.1'] }),
      genreTrack({ name: '内声', program: 4, bars: [upper, finalVoicing] }),
      genreTrack({ name: '低音', program: 32, header: '\\clef F4', bars: [bass, 'C3.1'] })
    ] }
  }))
});
