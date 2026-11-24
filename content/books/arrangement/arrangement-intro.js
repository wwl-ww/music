import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { arrangementCaseScore, caseOpeningRows, caseTempo } from './arrangement-case-music.js';

const opening = document.getElementById('case-opening');
const openingGrid = mountArrangementGrid(opening.querySelector('[data-case-grid]'), {
  beats: 8, subdivisions: 1, rows: [], label: '第 1–2 小节的主旋律、底鼓和贝斯'
});
mountScoreWritingSteps(opening, {
  steps: [
    { label: '原旋律', notes: arrangementCaseScore('melody', 2), description: '主旋律在第 2 小节第 3、4 拍留白，这时没有伴奏。' },
    { label: '节拍骨架', notes: arrangementCaseScore('foundation', 2), description: '底鼓和贝斯在第 1、3 拍同时起音。主旋律停下时，伴奏仍维持拍感。' }
  ],
  score: {
    tempo: caseTempo, soundFontUrl, notationVisible: false,
    onScoreLoaded(score) { openingGrid.update(caseOpeningRows(score, { includeMelody: true })); },
    onPlaybackPosition: openingGrid.markTick
  }
});

mountPlayableArrangementGrid(document.getElementById('drum-chart'), {
  label: '一小节鼓组对照表，四拍，每拍两格',
  subdivisions: 2,
  rows: [
    { label: '踩镲', drum: 42, events: Array.from({ length: 8 }, (_, step) => ({ step, dynamic: 'p' })) },
    { label: '小鼓', drum: 38, events: [{ step: 2, accent: true }, { step: 6, accent: true }] },
    { label: '底鼓', drum: 36, events: [{ step: 0 }, { step: 4 }] }
  ]
});

mountPlayableArrangementGrid(document.getElementById('piano-roll'), {
  label: '一小节钢琴卷帘图，四拍，每拍两格',
  subdivisions: 2,
  rows: [
    { label: 'G4', pitch: 'G4', events: [{ step: 4, length: 4 }] },
    { label: 'F♯4', events: [] },
    { label: 'F4', events: [] },
    { label: 'E4', pitch: 'E4', events: [{ step: 1, length: 2 }] },
    { label: 'D♯4', events: [] },
    { label: 'D4', events: [] },
    { label: 'C♯4', events: [] },
    { label: 'C4', pitch: 'C4', events: [{ step: 0, length: 1 }] }
  ]
});

function part(name, program, notes, header = '') {
  return { name, program, phrase: String.raw`\ts (4 4) ${header} ${notes}` };
}

const melody = part('主旋律', 73, 'E5.4 { dy mf } D5.4 C5.2 | D5.4 C5.4 r.2');
const drumBar = '(Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8 (Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8';
const drums = part('鼓组', 'percussion', `${drumBar} | ${drumBar}`,
  String.raw`\clef neutral \articulation (Kick 36) \articulation (Snare 38) \articulation (Hat 42)`);
const bass = part('贝斯', 33, 'C2.4 r.2 C2.4 | C2.4 r.2 C2.4', String.raw`\clef F4`);
const alignedBass = part('贝斯', 33, 'C2.4 r.4 C2.4 r.4 | C2.4 r.4 C2.4 r.4', String.raw`\clef F4`);
const reply = 'G5.8 A5.8 G5.4 { dy mf }';
const busyGuitar = part('吉他答句', 27, `G5.8 { dy mf } A5.8 G5.4 G5.8 A5.8 G5.4 | G5.8 A5.8 G5.4 ${reply}`);
const spacedGuitar = part('吉他答句', 27, `r.1 | r.2 ${reply}`);

function piano(dynamic) {
  const chord = '(C4 E4 G4).4';
  return part('钢琴和弦', 0, `${chord} { dy ${dynamic} } r.4 ${chord} r.4 | ${chord} { dy ${dynamic} } r.4 ${chord} { dy mf } r.4`);
}

const keys = piano('mf');
const quietKeys = piano('p');
const versions = [
  { label: '原旋律', description: '主旋律两小节。第二小节后两拍留空。', tracks: [melody] },
  { label: '加法 · 伴奏骨架', description: '鼓给出稳定的拍点，贝斯明确低音，钢琴补出和弦。第二小节的留白仍然存在。', tracks: [melody, keys, bass, drums] },
  { label: '加法 · 再添答句', description: '伴奏骨架不变。吉他填入留白，也在主旋律进行时反复奏同一动机，两条线开始争夺注意力。', tracks: [melody, busyGuitar, keys, bass, drums] },
  { label: '减法', description: '删去主旋律进行时的吉他乐句。第二小节后两拍保留答句，鼓和贝斯照常维持节拍。', tracks: [melody, spacedGuitar, keys, bass, drums] },
  { label: '乘法', description: '贝斯每小节的第二次起音提前到第 3 拍，与底鼓对齐。贝斯的音高与底鼓的冲击声集中到同一个瞬间。', tracks: [melody, spacedGuitar, keys, alignedBass, drums] },
  { label: '除法', description: '主旋律进行时收轻钢琴和弦，到吉他答句出现时恢复原力度。起音位置和音高沿用上一版，两条乐句的主次更清楚。', tracks: [melody, spacedGuitar, quietKeys, alignedBass, drums] }
];

mountScoreWritingSteps(document.getElementById('arrangement-operations'), {
  steps: versions.map(({ label, description, tracks }) => ({ label, description, notes: { scoreTracks: tracks } })),
  score: { tempo: 100, soundFontUrl }
});
