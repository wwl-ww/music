import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { bandSoundFont, chord, hits, mountGridChoices, pitchedTrack, tone } from './genre-arrangement-foundation.js';

const spacing = [
  ['高音相邻', 'E3 G3 D4 B4 C5', 'C2 在低音，B4 与其上方的 C5 相隔半音，两个高音同时持续。'],
  ['分开半音', 'E3 G3 C4 D4 B4', '将 C5 降为 C4，其他音与时值保持。B4 仍显出大七音的色彩，高处不再有相邻半音。'],
  ['根音只留低声部', 'E3 G3 D4 B4', '上层去掉重复的 C4，低音仍给出 C2。E、B、D 保留三音、七音与九音。']
];
mountScoreWritingSteps(document.getElementById('genre-register-spacing'), {
  score: { soundFontUrl: bandSoundFont },
  steps: spacing.map(([label, pitches, description]) => ({
    label, description,
    notes: {
      scoreTracks: [
        pitchedTrack('钢琴', 0, [chord(pitches, 'Cmaj9')]),
        pitchedTrack('电贝斯', 33, ['C2.1'], 'F4')
      ]
    }
  }))
});

const quarterBeats = [0, 4, 8, 12, 16, 20, 24, 28];
const kick = { label: '底鼓', midi: 36, events: hits(quarterBeats.filter(step => step % 8 === 0), [0, 16]) };
const bass = {
  label: '贝斯', program: 33,
  events: [tone(0, 6, 'C2', 'f'), tone(8, 5, 'G2'), tone(16, 6, 'C2', 'f'), tone(24, 5, 'G2')]
};
const guitar = { label: '木吉他', program: 25 };
const piano = { label: '钢琴', program: 0 };
const strings = { label: '弦乐', program: 48 };
const guitarChord = ['G3', 'C4', 'E4'];
const pianoChord = ['E3', 'G3', 'C4'];
const high = ['E5', 'G5'];

mountGridChoices('genre-role-spacing', {
  overlap: {
    description: '吉他、钢琴和弦乐同时在每拍起音，拍点整齐，几个声部反复给出同样的重音。',
    rows: [kick, bass,
      { ...piano, events: quarterBeats.map(step => tone(step, 3, pianoChord, 'mp')) },
      { ...guitar, events: quarterBeats.map(step => tone(step, 2, guitarChord, 'mp')) },
      { ...strings, events: quarterBeats.map(step => tone(step, 3, high, 'mp')) }
    ]
  },
  layers: {
    description: '底鼓与贝斯依旧支撑拍点，钢琴只在每小节的开头出现，吉他填入拍间，弦乐用长音连起两层节奏。',
    rows: [kick, bass,
      { ...piano, events: [tone(0, 8, pianoChord, 'mp'), tone(16, 8, pianoChord, 'mp')] },
      { ...guitar, events: [2, 6, 10, 14, 18, 22, 26, 30].map(step => tone(step, 2, guitarChord, 'mp')) },
      { ...strings, events: [tone(0, 16, high, 'mp'), tone(16, 16, high, 'mp')] }
    ]
  }
}, { bars: 2 });
