import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

function ensemble({ melody, chords, bass }) {
  return {
    scoreTracks: [
      { name: '吉他', program: 27, phrase: '\\ts (4 4) ' + melody },
      { name: '伴奏', program: 0, phrase: '\\ts (4 4) \\clef F4 ' + chords },
      { name: '贝斯', program: 33, phrase: '\\ts (4 4) \\clef F4 ' + bass, playbackOnly: true }
    ]
  };
}

const pulse = {
  chords: '(C3 G3).4 E3.4 (C3 G3).4 E3.4 | (C3 G3).4 E3.4 (C3 G3).4 E3.4',
  bass: 'C2.4 G2.4 C2.4 G2.4 | C2.4 G2.4 C2.4 G2.4'
};

mountScoreWritingSteps(document.querySelector('#rock-glossary-syncopation'), {
  score: { tempo: 96, soundFontUrl },
  steps: [
    {
      label: '第三拍起音',
      notes: ensemble({ ...pulse, melody: 'E4.4 G4.4 A4.4 G4.4 | E4.4 D4.4 C4.2' }),
      description: '吉他的 A 与伴奏第三拍同时起音。'
    },
    {
      label: '提前半拍',
      notes: ensemble({ ...pulse, melody: 'E4.4 G4.8 A4.8 A4{t}.8 r.8 G4.4 | E4.4 D4.4 C4.2' }),
      description: 'A 在第二拍后半起音，延音线把它接到第三拍，所以第三拍只有伴奏重新起音。'
    }
  ]
});

mountPlayableArrangementGrid(document.querySelector('#rock-three-against-two'), {
  tempo: 60,
  beats: 1,
  subdivisions: 6,
  label: '复节奏三对二的六格对照',
  rows: [
    { label: '三等分', drum: 37, events: [0, 2, 4].map(step => ({ step })) },
    { label: '二等分', drum: 36, events: [0, 3].map(step => ({ step })) }
  ]
});

const bluesHead = {
  melody: 'E4.4 G4.8 A4.8 G4.4 E4.4',
  chords: '(C3 E3 Bb3).1 { txt "C7" }',
  bass: 'C2.4 G2.4 A2.4 Bb2.4'
};

mountScoreWritingSteps(document.querySelector('#rock-glossary-turnaround'), {
  score: { tempo: 104, soundFontUrl },
  steps: [
    {
      label: '折返下一轮',
      notes: ensemble({
        melody: bluesHead.melody + ' | F4.4 D4.4 B3.4 D4.4 | ' + bluesHead.melody,
        chords: bluesHead.chords + ' | (G2 B2 F3).1 { txt "G7" } | ' + bluesHead.chords,
        bass: bluesHead.bass + ' | G2.4 B2.4 D3.4 B2.4 | ' + bluesHead.bass
      }),
      description: '第 12 小节的 G7 使末尾保持开放，下一小节回到 C7 并重新奏起动机。'
    },
    {
      label: '最后一轮',
      notes: ensemble({
        melody: bluesHead.melody + ' | E4.4 D4.4 C4.2',
        chords: bluesHead.chords + ' | (C3 E3 Bb3).1 { txt "C7" }',
        bass: bluesHead.bass + ' | C2.1'
      }),
      description: '第 12 小节仍在蓝调的主和弦 C7 上，旋律和低音同时收在 C。'
    }
  ]
});
