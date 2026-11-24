import { mountScore } from '../../shared/formats/score.js';
import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { lyricBars, mountSongVariants } from './songwriting-score.js';

const verses = [
  '小河绕过旧石桥风把灯影送回家',
  '我在山外走很久每盏灯都像从前',
  '小河绕过旧石桥愿把歌声带回家'
];
const firstVerse = verses[0];

mountSongVariants('song-opening-character', {
  folk: {
    tempo: 92,
    notes: String.raw`\ks C \ts (2 4) ${lyricBars(firstVerse, [
      'G4.8 A4.8 G4.8 E4.8', 'D4.8 E4.8 G4.8/sing/bridge E4.8/held/bridge',
      'E4.8 D4.8 C4.8 E4.8', 'G4.8 E4.8 D4.8/sing/home C4.8/held/home'
    ])}`,
    summary: '五声性的短句保留匀整的二拍子。句末的“桥”和“家”由一个字唱两个音，旋律在词尾轻轻回折。'
  },
  syncopated: {
    tempo: 106,
    notes: String.raw`\ks C \ts (4 4) ${lyricBars(firstVerse, [
      'r.8 E4.4 G4.8 A4.4 G4.4', 'E4.8 D4.4 C4.2 r.8',
      'r.8 E4.4 G4.8 A4.4 C5.4', 'G4.8 E4.4 C4.2 r.8'
    ])}`,
    summary: '“小”和“风”都从第一拍后半起唱，时值跨到第二拍。伴随的四拍骨架不变，词的重心移到拍间。'
  },
  waltz: {
    tempo: 120,
    notes: String.raw`\ks C \ts (3 4) ${lyricBars(firstVerse, [
      'A4.4 C5.8 B4.8 A4.4', 'E4.4 F4.4 E4.4',
      'G4.4 A4.8 B4.8 C5.4', 'E5.4 G#4.4 A4.4'
    ])}`,
    summary: '每三拍形成一轮，小调与向下的句尾保留回望的色彩。三拍的律动可以轻巧，也能容纳含蓄的叙述。'
  },
  anthem: {
    tempo: 82,
    notes: String.raw`\ks G \ts (4 4) \ac ${lyricBars(firstVerse, [
      'D4.4', 'G4.4 A4.4 B4.4 D5.4', 'C5.4 B4.2 E4.4',
      'G4.4 A4.4 B4.4 E5.4', 'D5.4 G4.2 r.4'
    ])}`,
    summary: '两句都在第四拍弱起，接着向上展开。“旧”和“送”到达各自的高点，句尾拉长，留出抒情性的气息。'
  },
  declaimed: {
    tempo: 70,
    notes: String.raw`\ks C \ts (4 4) ${lyricBars(firstVerse, [
      'E4.2 E4.4 E4.8 E4.8', 'E4.8/triplet E4.8/triplet G4.8/triplet/bridge A4.4/held E4.2/held/bridge',
      'D4.4 D4.8 D4.8 D4.2', 'E4.8/triplet F4.8/triplet G4.8/triplet/home A4.4/held C4.2/held/home'
    ])}`,
    summary: '句头近似在同一音上念词，三连音把末尾几个字连起来，末字再舒展开来。谱面仍给出可读的拍号和时值。'
  }
});

const opening = ['G4.8 A4.8 G4.8 E4.8', 'D4.8 E4.8 G4.4', 'E4.8 D4.8 C4.8 E4.8'];
const closed = 'G4.8 E4.8 C4.4';

mountScore(document.querySelector('#song-strophic figure'), {
  notation: 'staff',
  tempo: 90,
  notes: String.raw`\ks C \ts (2 4) ${lyricBars(verses, [...opening, closed])}`
});

const statement = lyricBars(verses[0], [...opening, 'G4.8 A4.8 G4.4']);
const contrast = lyricBars(verses[1], [
  'A4.8 B4.8 C5.8 D5.8', 'E5.8 D5.8 C5.4',
  'D5.8 C5.8 B4.8 A4.8', 'D5.8 B4.8 G4.4'
]);
const returnVerse = lyricBars(verses[2], [...opening, closed]);

mountFormAnalysis(document.getElementById('song-contrasting-form'), {
  score: {
    tempo: 90,
    notes: String.raw`\ks C \ts (2 4)
      \section ("A") ${statement} |
      \section ("B") ${contrast} |
      \section ("A′") ${returnVerse}`
  },
  sections: [
    { id: 'river', label: 'A · 河岸', first: 1, last: 4, material: '中区呈示河岸意象，第二句落在 G，仍有继续的余地' },
    { id: 'distance', label: 'B · 远行', first: 5, last: 8, material: '音区抬高，E5 出现在“走”字上，第二句回落后仍停在 G' },
    { id: 'return', label: 'A′ · 归来', first: 9, last: 12, material: '开头句回归，最后一句落到主音 C，收住全曲' }
  ]
});
