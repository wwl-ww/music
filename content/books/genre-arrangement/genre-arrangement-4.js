import { hits, mountGridChoices, tone } from './genre-arrangement-foundation.js';

const eightNotes = Array.from({ length: 16 }, (_, index) => index * 2);
const kick = { label: '底鼓', midi: 36, events: hits([0, 6, 8, 16, 22, 24], [0, 16]) };
const snare = { label: '小鼓', midi: 38, events: hits([4, 12, 20, 28], [4, 12, 20, 28]) };
const hat = { label: '闭镲', midi: 42, events: hits(eightNotes) };
const bass = {
  label: '贝斯', program: 33,
  events: [tone(0, 6, 'C2'), tone(6, 2, 'C2'), tone(8, 6, 'G2'),
    tone(16, 6, 'A2'), tone(22, 2, 'A2'), tone(24, 6, 'E2')]
};
const keys = {
  label: '电钢琴', program: 4,
  events: [tone(0, 16, ['E3', 'G3', 'B3', 'D4'], 'mp'), tone(16, 16, ['E3', 'G3', 'A3', 'C4'], 'mp')]
};
const drumRows = [kick, snare, hat];
const foundation = [...drumRows, bass, keys];
const guitarPitches = ['G3', 'B3', 'E4', 'D4', 'G3', 'B3', 'E4', 'D4',
  'A3', 'C4', 'E4', 'G4', 'A3', 'C4', 'E4', 'G4'];

mountGridChoices('genre-daw-workflow', {
  drums: {
    description: '底鼓和小鼓建立拍点，闭镲补出两拍之间的细分。',
    rows: drumRows
  },
  foundation: {
    description: '电钢琴写出 Cmaj9 和 Am7 的长和弦。贝斯跟着底鼓进入，并用五音延展低音线。',
    rows: foundation
  },
  verse: {
    description: '和声骨架仍是 Cmaj9–Am7。底鼓和贝斯减少第 2 拍后的短音，踩镲也由八分改为四分摆动。',
    rows: [
      { ...kick, events: hits([0, 8, 16, 24], [0, 16]) },
      snare,
      { ...hat, events: hits(eightNotes.filter(step => step % 4 === 0)) },
      { ...bass, events: bass.events.filter(({ step }) => step % 16 !== 6) },
      keys
    ]
  },
  chorus: {
    description: '鼓、贝斯和电钢琴维持原循环。高处的持续和弦扩大音区，吉他在中区连续拨出分解音。',
    rows: [...foundation,
      { label: '分解吉他', program: 25,
        events: eightNotes.map((step, index) => tone(step, 2, guitarPitches[index], 'mp')) },
      { label: '高音持续层', program: 48,
        events: [tone(0, 16, ['B4', 'D5', 'E5'], 'mp'), tone(16, 16, ['A4', 'C5', 'E5'], 'mp')] }
    ]
  }
}, { bars: 2, tempo: 108 });
