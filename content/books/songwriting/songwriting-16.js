import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { lyricBars, mountSongVariants } from './songwriting-score.js';
import { bridgeMelodies as melody, bridgePhrase, bridgeScore, bridgeVerses as verses, labelPhrase } from './songwriting-phrase-material.js';

const repeat = [0, 1, 2].flatMap(index => [
  labelPhrase(`第 ${index + 1} 节`, bridgePhrase(verses[index * 2], melody.opening)),
  bridgePhrase(verses[index * 2 + 1], melody.close)
]);
const developed = [
  labelPhrase('A · 河岸', bridgePhrase(verses[0], melody.opening)), bridgePhrase(verses[1], melody.continuation),
  labelPhrase('B · 远灯', bridgePhrase(verses[2], melody.turn)), bridgePhrase(verses[3], melody.lift),
  labelPhrase('C · 归路', bridgePhrase(verses[4], ['G4 F4 E4 F4', 'D4 F4 A4'])), bridgePhrase(verses[5], melody.close)
];

mountSongVariants('song-art-forms', {
  strophic: {
    tempo: 80,
    notes: bridgeScore(repeat),
    summary: '三节歌词沿用同一组两句旋律，每节以相同方式收住。'
  },
  through: {
    tempo: 80,
    notes: bridgeScore(developed),
    summary: '歌词顺序保持原样。第一节收束较开放，第二节把音区推向 E5，第三节另写回落的句头并结束在 C。'
  }
});

const rain = lyricBars('雨落石阶声声轻', ['E4.4 F4.4 G4.4 E4.4','D4.4 E4.4 G4.2']);
const wind = lyricBars('风穿长巷灯未明', ['D4.4 E4.4 F4.4 A4.4','B4.4 A4.4 G4.2']);
const ask = lyricBars('我问归人何时到', ['A4.4 C5.4 D5.4 E5.4','G5.4 E5.4 D5.2']);
const echo = lyricBars('回声随着细雨来', ['E5.4 D5.4 C5.4 G4.4','E4.4 D4.4 C4.2']);
const finalWords = lyricBars('灯未明', ['G4.2 F4.4 E4.4']).replace('lyrics', 'dy p lyrics');
const voiceExcerpt = String.raw`\ks C \ts (4 4) ${rain} | ${wind}`;
const bassStaff = String.raw`\staff { score } \tuning (none) \clef F4`;
const trebleStaff = String.raw`\staff { score } \tuning (none) \clef G2`;

mountSongVariants('song-art-accompaniment', {
  voice: {
    tempo: 76,
    notes: voiceExcerpt,
    summary: '单独保留有歌词的独唱声部，句尾的 G4 后留出较长的时值。'
  },
  support: {
    tempo: 76,
    notes: `${voiceExcerpt} || ${bassStaff} (C3 E3 G3).1 | (G2 B2 F3).1 | (D3 F3 A3).1 | (G2 B2 D3).1`,
    summary: '人声的音高与时值保持原样，钢琴以持续和弦托住每句。句尾属和声保持向后的期待。'
  },
  imagery: {
    tempo: 76,
    notes: `${voiceExcerpt} || ${trebleStaff} E5.8 G5.8 A5.4 G5.8 E5.8 C5.4 | F5.8 D5.8 B4.4 D5.8 E5.8 G5.4 | F5.8 A5.8 C6.4 A5.8 F5.8 D5.4 | D5.8 F5.8 G5.4 F5.8 D5.8 B4.4 || ${bassStaff} C3.2 A2.2 | G2.1 | D3.1 | G2.1`,
    summary: '钢琴的高声部独立保留短短长的音型。人声停在长音时，钢琴继续活动，刻画重复落下的雨点。'
  }
});

const introduction = 'E5.8 G5.8 A5.4 G5.8 E5.8 C5.4 | D5.8 F5.8 G5.4 F5.8 D5.8 B4.4';
const returnedIntroduction = introduction.replace('E5.8', 'E5.8 { dy mf }');
const pianoVoice = [
  introduction,
  '(G4 C5).2 (E4 G4).2 | F5.8 D5.8 B4.4 D5.8 E5.8 G5.4',
  '(A4 D5).2 (F4 A4).2 | D5.8 F5.8 G5.4 F5.8 D5.8 B4.4',
  '(C5 E5 A5).8 (C5 E5 A5).8 (B4 E5 G#5).8 (B4 E5 G#5).8 (C5 E5 A5).8 (C5 E5 A5).8 (D5 F5 B5).8 (D5 F5 B5).8 | (D5 G5 B5).2 (E5 G5 C6).4 (D5 F5 B5).4',
  '(E5 A5 C6).2 (G4 C5 E5).2 | (F4 B4 D5).2 (E4 G4 C5).2',
  '(G4 C5).2 (E4 G4).2 | (F4 B4).2 (D4 G4).2',
  returnedIntroduction,
  'G4.8 E4.8 D4.4 C4.2'
].join(' | ');
const lowPiano = [
  '(C3 G3).2 (A2 E3).2 | (D3 A3).2 (G2 F3).2',
  'C3.1 | G2.1 | D3.1 | G2.1',
  'A2.4 E3.4 A2.4 B2.4 | G2.2 C3.4 B2.4',
  'A2.2 C3.2 | G2.2 C3.2',
  'C3.1 | G2.1',
  '(C3 G3).2 (A2 E3).2 | (D3 A3).2 (G2 F3).2 | (C3 G3).1'
].join(' | ');

mountFormAnalysis(document.getElementById('song-art-piano-arc'), {
  score: {
    tempo: 76,
    notes: String.raw`\ks C \ts (4 4) \section ("前奏") r.1 | r.1 |
      \section ("A") ${rain} | ${wind} |
      \section ("B") ${ask} | ${echo} |
      \section ("A′") ${rain} |
      \section ("后奏") ${finalWords} | r.1 | r.1 ||
      ${trebleStaff} ${pianoVoice} || ${bassStaff} ${lowPiano}`
  },
  sections: [
    { id: 'intro', label: '钢琴前奏', first: 1, last: 2, material: '钢琴在高区建立短短长的雨声动机' },
    { id: 'scene', label: 'A · 写景', first: 3, last: 6, material: '人声用中区的歌唱性线条。句尾长音上，钢琴动机再次回应' },
    { id: 'climax', label: 'B · 追问', first: 7, last: 10, material: '人声上行至 G5。A 小调色彩与连续八分和弦加厚音响，随后人声回落到 C' },
    { id: 'reprise', label: 'A′ · 写景再现', first: 11, last: 12, material: '人声恢复 A 的第一句，钢琴用疏朗和弦托住歌声' },
    {
      id: 'handover', label: '声部交接', first: 13, last: 13,
      playback: { first: 12, last: 14 },
      rangeLabel: '12–14 小节',
      material: '第 13 小节钢琴在高区重现前奏，人声放轻并下行。前一小节仍由人声领唱，后一小节只剩钢琴'
    },
    { id: 'outro', label: '钢琴独奏收束', first: 14, last: 15, material: '钢琴接完前奏的剩余动机，再落到更低的音区。第 13 小节就已开始后奏' }
  ]
});
