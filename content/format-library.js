import { mountScore } from './shared/formats/score.js';
import './shared/formats/keyboard-intervals.js';
import { mountRepeatRoute } from './shared/formats/repeat-route.js';
import { mountFormAnalysis } from './shared/formats/form-analysis.js';
import { mountVoiceRelations } from './shared/formats/voice-relations.js';
import { mountScoreComparison } from './shared/formats/score-comparison.js';
import { mountScoreWritingSteps } from './shared/formats/score-writing-steps.js';
import { mountPlayableArrangementGrid } from './shared/formats/arrangement-grid-playback.js';
import { mountGuitarChordDiagrams } from './shared/formats/guitar-chord-diagram.js';
import { mountFretboard } from './shared/formats/fretboard.js';

const preview = document.querySelector('#preview-width');
const showcase = document.querySelector('.format-showcase');
function setPreviewWidth() {
  showcase.dataset.previewWidth = preview.value;
}
preview.addEventListener('change', setPreviewWidth);
setPreviewWidth();

mountPlayableArrangementGrid(document.querySelector('#arrangement-grid-sample'), {
  label: '贝斯与底鼓的起音对照',
  subdivisions: 2,
  rows: [
    { label: '贝斯 C3', program: 33, pitch: 'C3', events: [{ step: 0, length: 2 }, { step: 4, length: 3 }] },
    { label: '底鼓', drum: 36, events: [{ step: 0 }, { step: 4 }] }
  ]
});

mountGuitarChordDiagrams(document.querySelector('#guitar-chord-diagram-sample'), [
  { label: 'C 开放和弦', positions: [null, 3, 2, 0, 1, 0], degrees: [null, 'R', '3', '5', 'R', '3'] },
  { label: 'F 横按和弦', positions: [1, 3, 3, 2, 1, 1], degrees: ['R', '5', 'R', '3', '5', 'R'],
    barre: { fret: 1, fromString: 6, toString: 1 } }
]);

mountFretboard(document.querySelector('#fretboard-sample'), {
  startFret: 3,
  endFret: 10,
  markers: [
    ...['C', 'D', 'E', 'F'].map((label, index) => ({
      string: 5, fret: [3, 5, 7, 8][index], label, variant: index === 0 ? 'root' : 'accent'
    })),
    ...['G', 'A', 'B', 'C'].map((label, index) => ({
      string: 4, fret: [5, 7, 9, 10][index], label, variant: index === 3 ? 'root' : 'secondary'
    }))
  ]
});

mountScore(document.querySelector('#melody-example'), {
  tempo: 88,
  notes: String.raw`
    \ks C
    \ts 4 4
    C4.4 { d } D4.8 E4.4 G4.4 |
    C5.4 G4.4 F#4.4 G4.4 |
    r.1 |
    E4.4 D4.4 C4.2
  `
});

mountRepeatRoute(document.querySelector('#library-route'), {
  repeat: {
    bars: [{ name: 'A' }, { name: 'B', start: true }, { name: 'C', end: true }, { name: 'D' }],
    steps: [0, 1, 2, 1, 2, 3],
    cues: { 3: '回到起始反复线 B。' }
  },
  straight: {
    bars: [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }],
    steps: [0, 1, 2, 3],
    cues: {}
  }
});

mountFormAnalysis(document.querySelector('#library-form-analysis'), {
  score: {
    tempo: 100,
    notes: String.raw`
      \ks C \ts (4 4)
      C5.8 D5.8 E5.4 G5.4 E5.4 | F5.4 D5.4 C5.2 |
      A4.4 D5.4 F#5.4 E5.8 F#5.8 | G5.4 D5.4 B4.4 G4.4 |
      C5.8 D5.8 E5.4 G5.4 E5.4 | F5.4 D5.4 C5.2 ||
      \staff { score } \tuning (none) \clef F4
      C4.2 E4.2 | F4.4 G3.4 C4.2 |
      D4.2 A3.2 | G3.2 D4.4 G3.4 |
      E4.2 C4.2 | F4.4 G3.4 C4.2
    `
  },
  sections: [
    { id: 'a', label: 'A 呈示', first: 1, last: 2, material: '两短一长的题头', voice: '高声部呈示', key: 'C 大调', role: '建立主调和主要材料' },
    { id: 'b', label: 'B 对比', first: 3, last: 4, material: '四分音符推进', voice: '高声部以 F♯ 引向 G', key: 'G 大调', role: '在属调形成对比' },
    { id: 'return', label: 'A′ 再现', first: 5, last: 6, material: '开头的题头回来', voice: '高声部保留原句，低声部改变开头', key: 'C 大调', role: '收回主调' }
  ]
});

mountVoiceRelations(document.querySelector('#library-voice-relations'), {
  unitCount: 8,
  unitName: '拍',
  lanes: [
    { label: '辅助谱表', events: [
      { id: 'guide', label: '预写 B′', start: 7, length: 2, guide: true, detail: '虚线框是写作参照，标出下一组应句的音高和时间' }
    ] },
    { label: '上声部', events: [
      { id: 'a', label: 'A 起句', start: 1, length: 2, detail: 'A 从第 1 拍开始' },
      { id: 'b', label: 'B 起句', start: 5, length: 2, detail: 'B 在第 5 拍从高一级的音进入' }
    ] },
    { label: '下声部', events: [
      { id: 'a-answer', label: 'A′ 应句', start: 3, length: 2, detail: 'A′ 在第 3 拍进入' },
      { id: 'b-answer', label: 'B′ 应句', start: 7, length: 2, detail: 'B′ 在第 7 拍进入' }
    ] }
  ],
  links: [
    { from: 'a', to: 'a-answer', label: 'A′ 比 A 晚两拍、低八度' },
    { from: 'b', to: 'b-answer', label: 'B′ 比 B 晚两拍、低八度' },
    { from: 'b-answer', to: 'guide', label: '辅助谱表的预写与实际 B′ 对齐' }
  ]
});

function twoVoiceScore(upper, lower) {
  return String.raw`
    \ks C \ts (4 4)
    ${upper} ||
    \staff { score } \tuning (none) \clef G2
    ${lower}
  `;
}

mountScoreComparison(document.querySelector('#library-score-comparison'), {
  description: '第三拍开始的 G 从 C 的上方移到 C 的下方。持续两拍的纯五度变成纯四度，成了需要处理的不协和音程。',
  versions: [
    {
      label: '原位',
      score: {
        tempo: 92,
        notes: twoVoiceScore('E5.4 E5.4 G5.2 { txt "纯五度" }', 'C5.2 C5.2')
      },
      highlights: [{ staff: 1, bar: 1, beat: 3 }, { staff: 2, bar: 1, beat: 2 }]
    },
    {
      label: '八度换位',
      score: {
        tempo: 92,
        notes: twoVoiceScore('C5.2 C5.2', 'E4.4 E4.4 G4.2 { txt "纯四度" }')
      },
      highlights: [{ staff: 1, bar: 1, beat: 2 }, { staff: 2, bar: 1, beat: 3 }]
    }
  ]
});

const canonOpening = 'C5.8 D5.8 E5.4 G5.2';
const canonEcho = 'C4.8 D4.8 E4.4 G4.2';
const canonEnding = 'E5.2 F5.4 G5.4';
mountScoreWritingSteps(document.querySelector('#library-writing-steps'), {
  score: { tempo: 92 },
  steps: [
    {
      label: '起句',
      notes: twoVoiceScore(`${canonOpening} | r.1 | r.1`, 'r.1 | r.1 | r.1'),
      highlights: [1, 2, 3, 4].map(beat => ({ staff: 1, bar: 1, beat })),
      description: '上声部在第一小节奏出起句 A。'
    },
    {
      label: '加入应句',
      notes: twoVoiceScore(`${canonOpening} | r.1 | r.1`, `r.1 | ${canonEcho} | r.1`),
      highlights: [1, 2, 3, 4].map(beat => ({ staff: 2, bar: 2, beat })),
      description: '应句 A′ 晚一小节、低八度进入。上声部的第二小节留给后句 B。'
    },
    {
      label: '检查重叠',
      notes: twoVoiceScore(`${canonOpening} | Db5.2 D5.4 E5.4 | ${canonEnding}`, `r.1 | ${canonEcho} | Db4.2 D4.4 E4.4`),
      highlights: [
        { staff: 1, bar: 2, beat: 1, kind: 'conflict' },
        { staff: 2, bar: 2, beat: 1, kind: 'conflict' }
      ],
      description: 'B 的首音 D♭ 与 A′ 的首音 C 在第二小节强拍相叠，形成不协和的小九度。第三小节下声部模仿 B。'
    },
    {
      label: '修正',
      notes: twoVoiceScore(`${canonOpening} | G5.2 D5.4 E5.4 | ${canonEnding}`, `r.1 | ${canonEcho} | G4.2 D4.4 E4.4`),
      highlights: [{ staff: 1, bar: 2, beat: 1 }, { staff: 2, bar: 3, beat: 1 }],
      description: 'B 的首音改为 G，与 A′ 的 C 构成协和的纯十二度。下一小节的 B′ 也改用低八度的 G。'
    }
  ]
});
