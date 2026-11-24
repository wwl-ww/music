import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { lyricBars, mountSongVariants } from './songwriting-score.js';

const notesForSong = (lyrics, bars) => String.raw`\ks C \ts (4 4) ${lyricBars(lyrics, bars)}`;

const nightWind = '夜风穿过小小城门';
const regularEnd = 'G4.4 A4.4 G4.4 C4.4';
mountSongVariants('song-pop-rhythm-placement', {
  even: {
    tempo: 90,
    notes: notesForSong(nightWind, ['G4.4 A4.4 G4.4 E4.4', regularEnd]),
    summary: '每个字都在整拍起音，听感平稳。'
  },
  syncopated: {
    tempo: 90,
    notes: notesForSong(nightWind, ['G4.8 A4.4 G4.8 E4.4 r.4', 'r.8 G4.4 A4.8 G4.4 C4.4']),
    summary: '“风”和第二小节的第一个“小”都在第一拍后半起声并跨过第二拍。音高、拍速和歌词保持原样。'
  },
  pause: {
    tempo: 90,
    notes: notesForSong(nightWind, ['G4.8 A4.8 r.4 G4.4 E4.4', regularEnd]),
    summary: '“夜风”后空一拍，留下口语的停顿。后一句连续在整拍起声。'
  }
});

const roadHome = '晚风吹过小巷一盏灯等我归';
mountSongVariants('song-pop-melodic-types', {
  recitative: {
    tempo: 86,
    notes: notesForSong(roadHome, [
      'E4.8 E4.8 F4.4 E4.2', 'E4.4 D4.4 D4.4 E4.4', 'E4.4 F4.4 E4.4 D4.4'
    ]),
    summary: '主要在 D、E、F 之间陈述，音高反复与短小的回绕带出说话的语气。'
  },
  melodic: {
    tempo: 86,
    notes: notesForSong(roadHome, [
      'E4.8 G4.8 A4.4 G4.2', 'A4.4 C5.4 B4.4 A4.4', 'G4.4 F4.4 D4.4 C4.4'
    ]),
    summary: '保持一字一音及拍速，旋律从 E4 上到 C5，再落回 C4，形成一条更长的弧线。'
  },
  rap: {
    tempo: 86,
    notes: notesForSong(roadHome, ['E4.8 E4.8 E4.16 E4.16 E4.4 E4.4 r.8', 'E4.16 E4.16 E4.8 r.8 E4.8 E4.4 E4.4']),
    summary: '同音只用于标示字的先后与时值。十六分音符与停顿交替，词位和语气成为主要变化。'
  }
});

const firstSentence = lyricBars('小路无人风声渐起', ['C4.4 D4.4 E4.4 D4.4', 'E4.4 E4.4 F4.4 G4.4']);
const secondSentence = lyricBars('河面微亮远岸有人一盏旧灯等我回家', [
  'C4.4 D4.4 E4.4 D4.4', 'F4.4 E4.4 D4.4 G4.4',
  'E4.4 G4.4 F4.4 D4.4', 'D4.8 E4.8 D4.4 C4.2'
]);
const theme = lyricBars('把灯举高让河看见', [
  'E5.8 D5.4 C5.8 D5.4/sing/lift E5.4/held/lift', 'F5.8 E5.8 D5.4 C5.4/sing/see G4.4/held/see'
]);

mountFormAnalysis(document.getElementById('song-pop-returning-binary'), {
  score: {
    tempo: 88,
    notes: String.raw`\ks C \ts (4 4) \section ("A") ${firstSentence} | ${secondSentence} | \section ("B") ${theme} | ${secondSentence}`
  },
  sections: [
    { id: 'story', label: 'A · 两大句', first: 1, last: 6, material: '中低音区交代场景，第一句留在 G，第二句落到 C' },
    { id: 'theme', label: 'B · 新主题', first: 7, last: 8, material: '“把灯举高”进入高音区，切分的重音突出新题头' },
    { id: 'recall', label: 'B 后部 · 句尾再现', first: 9, last: 12, material: '完整恢复 A 的第二大句，用同一个句尾收束' }
  ]
});

function contrastingModes(third, bass) {
  const voice = notesForSong('河面微亮我向远方愿把灯火送回家乡', [
    'C4.4 G4.4 E4.4 G4.4', 'C5.4 G5.4 ' + third + '.4 D5.4',
    'E5.4 F5.4 G5.4 E5.4', 'D5.4 B4.4 G4.4 C5.4'
  ]);
  return String.raw`${voice} || \staff { score } \tuning (none) \clef F4 (C3 E3 G3).1 | ${bass} | (C3 E3 G3).1 | (G2 B2 D3 F3).2 (C3 E3 G3).2`;
}

mountSongVariants('song-pop-artistic-development', {
  steady: {
    tempo: 84,
    notes: contrastingModes('E5', '(C3 E3 G3).1'),
    summary: '五度题头从 C4–G4 变为 C5–G5。音区升高，调式色彩保持。'
  },
  contrast: {
    tempo: 84,
    notes: contrastingModes('Eb5', '(C3 Eb3 G3).1'),
    summary: '高八度题头出现 E♭，伴奏只借用一个 C 小三和弦。下一小节恢复 E，句末仍以 G7–C 收束。'
  },
  minorSection: {
    tempo: 84,
    notes: String.raw`${notesForSong('河面微亮我向远方长夜渐深风落岸边雾中灯影引我回愿把灯火送回家乡', [
      'C4.4 G4.4 E4.4 G4.4', 'C5.4 G5.4 Eb5.4 D5.4',
      'F5.4 Eb5.4 D5.4 B4.4', 'C5.4 G4.4 Eb4.4 C4.4',
      'Eb4.4 D4.4 C4.4 G4.4', 'D5.4 B4.4 C5.2',
      'E5.4 F5.4 G5.4 E5.4', 'D5.4 B4.4 G4.4 C5.4'
    ])} || \staff { score } \tuning (none) \clef F4
      (C3 E3 G3).1 | (C3 Eb3 G3).1 | (F3 Ab3 C4).2 (G2 B2 D3 F3).2 | (C3 Eb3 G3).1 |
      (Ab2 C3 Eb3).2 (F3 Ab3 C4).2 | (G2 B2 D3 F3).2 (C3 Eb3 G3).2 |
      (C3 E3 G3).1 | (G2 B2 D3 F3).2 (C3 E3 G3).2`,
    summary: '小调在第 3–6 小节继续发展，两次从 G7 回到 Cm。第 7 小节旋律恢复 E♮，第 8 小节以 G7–C 完成大调终止。'
  }
});
