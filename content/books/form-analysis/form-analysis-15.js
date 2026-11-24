import concertoSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';

const orchestra = [
  'C4.4 E4.4 G4.4 E4.4', 'D4.4 F4.4 G4.2',
  'G4.2 E4.4 C4.4', 'D4.4 E4.8 F4.8 D4.2', 'C4.1',
  'r.1', 'r.1', 'r.1', 'r.1', 'r.1', 'G4.1',
  'r.1', 'r.1', 'r.1',
  'C4.4 E4.4 G4.4 E4.4', 'D4.4 F4.4 G4.2',
  'r.1', 'r.1', '(C4 E4 G4).1',
  'r.1', 'r.1',
  '(B3 D4 G4).1', 'C5.4 G4.4 E4.4 C4.4', '(C4 E4 G4 C5).1'
];

const solo = [
  'r.1', 'r.1', 'r.1', 'r.1', 'r.1',
  'C5.8 D5.8 E5.4 G5.8 F5.8 E5.4', 'D5.8 E5.8 F#5.4 A5.4 F#5.4',
  'D5.2 B4.4 G4.4', 'A4.4 B4.8 C5.8 A4.2',
  'B4.8 D5.8 G5.8 F#5.8 E5.8 D5.8 B4.8 A4.8', 'G4.1',
  'E4.8 G4.8 B4.4 G4.8 E4.8 B4.4', 'A4.8 C5.8 E5.4 C5.8 A4.8 E5.4',
  'D5.8 F5.8 G5.4 F5.8 D5.8 B4.4',
  'r.1', 'r.1',
  'G5.2 E5.4 C5.4', 'D5.4 E5.8 F5.8 D5.2', 'r.1',
  'C5.16 E5.16 G5.16 E5.16 C5.16 D5.16 E5.16 F5.16 G5.16 E5.16 C5.16 E5.16 G5.16 A5.16 G5.16 E5.16',
  'D5.16 G5.16 B5.16 G5.16 F5.16 D5.16 B4.16 G4.16 D5.8 E5.8 D5.8 B4.8',
  'r.1', 'r.1', 'r.1'
];

const bass = [
  '(C3 E3 G3).1', '(G2 B2 D3).1', '(C3 E3 G3).2 (A2 C3 E3).2',
  '(F3 A3 C4).2 (G2 B2 F3).2', '(C3 E3 G3).1',
  'C3.2 E3.2', '(D3 F#3 A3).1', 'G2.2 E3.2', '(C3 E3 G3).2 (D3 F#3 C4).2',
  'G2.2 (D3 F#3 C4).2', '(G2 B2 D3).1',
  'E3.1', 'A2.1', '(G2 B2 F3).1',
  '(C3 E3 G3).1', '(G2 B2 D3).1',
  'C3.2 A2.2', '(F3 A3 C4).2 (G2 B2 F3).2', '(G2 C3 E3).1 { fermata medium }',
  'r.1', 'r.1',
  '(G2 B2 F3).1', 'C3.2 G2.2', '(C3 E3 G3).1'
];

const reduction = solo.map((bar, index) => bar === 'r.1' ? orchestra[index] : bar);
const grandStaff = (upper, lower) => String.raw`\ts (4 4) \ks C
  ${upper.join(' | ')} ||
  \staff { score } \tuning (none) \clef F4 ${lower.join(' | ')}`;

mountFormAnalysis(document.querySelector('#concerto-exposition-score'), {
  score: {
    tempo: 112,
    soundFontUrl: concertoSoundFont,
    notes: { scoreTracks: [
      { name: '', program: 0, phrase: grandStaff(reduction, bass), notationOnly: true },
      { name: '弦乐组', program: 48, phrase: grandStaff(orchestra, bass), playbackOnly: true },
      { name: '独奏钢琴', program: 0, phrase: String.raw`\ts (4 4) \ks C ${solo.join(' | ')}`, playbackOnly: true }
    ] }
  },
  sections: [
    { id: 'tutti', label: '乐队呈示', first: 1, last: 5, material: '弦乐组奏出正主题和抒情材料', key: '两组材料都留在 C 大调，乐队在主调收束' },
    { id: 'solo', label: '独奏呈示', first: 6, last: 11, material: '钢琴重新组织开头，带出新经过句', key: '副主题移到 G 大调，并在属调终止' },
    { id: 'development', label: '展开', first: 12, last: 14, material: '钢琴截取正主题节奏，在不同音高上推动', role: '第 14 小节停在 C 大调的属七和弦上' },
    { id: 'recapitulation', label: '再现', first: 15, last: 19, material: '乐队带回正主题，钢琴在 C 大调奏副主题', role: '第 19 小节乐队停在终止四六和弦上' },
    { id: 'cadenza', label: '华彩', first: 20, last: 21, material: '乐队休止，钢琴把开头音型扩成快速分解和弦', role: '最后转向属功能' },
    { id: 'closing-tutti', label: '末次合奏', first: 22, last: 24, material: '弦乐组在属七和弦重新进入', role: '乐句最终在 C 大调主和弦收束' }
  ]
});
