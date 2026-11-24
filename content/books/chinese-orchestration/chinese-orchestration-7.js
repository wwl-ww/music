import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';

const strike = (step, dynamic, accent = false) => ({ step, dynamic, accent });
const beats = (positions, dynamic) => positions.map(step => strike(step, dynamic));

mountPlayableArrangementGrid(document.getElementById('gong-dynamics-grid'), {
  beats: 4,
  beatsPerBar: 2,
  subdivisions: 2,
  tempo: 76,
  label: '两层钹保留相同节奏，第二小节较弱',
  rows: [
    { label: '头钹', drum: 49, events: [strike(0, 'f', true), strike(2, 'mf'), ...beats([4, 6], 'p')] },
    { label: '二钹', drum: 55, events: [...beats([1, 3], 'mf'), ...beats([5, 7], 'pp')] }
  ]
});

mountPlayableArrangementGrid(document.getElementById('gong-meter-grid'), {
  beats: 14,
  beatsPerBar: 14,
  subdivisions: 1,
  tempo: 135,
  label: '重音间距按二、三、四、三、二拍扩展与收拢',
  rows: [
    { label: '句组长度', notationOnly: true, events: [0, 2, 5, 9, 12].map((step, index) => ({
      step, text: ['2', '3', '4', '3', '2'][index], label: ['二拍组', '三拍组', '四拍组', '三拍组', '二拍组'][index]
    })) },
    { label: '句首锣声', drum: 52, events: [0, 2, 5, 9, 12].map(step => strike(step, 'mf', true)) },
    { label: '脉动', drum: 75, events: beats(Array.from({ length: 14 }, (_, step) => step), 'p') }
  ]
});

mountPlayableArrangementGrid(document.getElementById('gong-roles-grid'), {
  beats: 6,
  beatsPerBar: 2,
  subdivisions: 2,
  tempo: 95,
  label: '鼓领，大锣落拍，小锣和钹填充节奏',
  rows: [
    { label: '鼓', drum: 38, events: [strike(0, 'mf', true), ...beats([1, 3, 6, 7], 'p'), strike(8, 'f', true)] },
    { label: '钹', drum: 49, events: [strike(4, 'mp', true), strike(7, 'p'), strike(8, 'mf', true)] },
    { label: '小锣', drum: 81, events: [strike(5, 'mp'), strike(8, 'mf', true)] },
    { label: '大锣', drum: 52, events: [strike(4, 'mf', true), strike(8, 'f', true)] }
  ]
});

const gongParts = [
  { label: '马锣', drum: 80 },
  { label: '头钹', drum: 49 },
  { label: '二钹', drum: 44 },
  { label: '溜子锣', drum: 52 }
];
const gongWords = [
  { step: 0, text: '冬', parts: [[0, '掩']] },
  { step: 1, text: '七', parts: [[1, '侧']] },
  { step: 2, text: '拍', parts: [[3, '放']] },
  { step: 3, text: '卜', parts: [[2, '闷']] },
  { step: 4, text: '冬', parts: [[0, '掩']] },
  { step: 5, text: '卜', parts: [[2, '闷']] },
  { step: 6, text: '七', parts: [[1, '侧']] },
  { step: 8, text: '仓', accent: true, parts: [[0, '击'], [1, '击'], [2, '击'], [3, '放']] }
];
const gongStrokeLabels = { 掩: '击后掩音', 侧: '侧击', 放: '击后放响', 闷: '闷击', 击: '击奏' };

mountPlayableArrangementGrid(document.getElementById('gong-syllable-grid'), {
  beats: 6,
  beatsPerBar: 2,
  subdivisions: 2,
  tempo: 103,
  label: '打溜子的口读字、击法和声音对照',
  rows: [
    { label: '锣鼓经', notationOnly: true, events: gongWords.map(({ step, text, accent }) => ({ step, text, accent })) },
    ...gongParts.map((part, index) => ({
      ...part,
      events: gongWords.flatMap(({ step, parts, accent }) => parts
        .filter(([instrument]) => instrument === index)
        .map(([, text]) => ({ ...strike(step, accent ? 'f' : 'mp', accent), text, label: gongStrokeLabels[text] })))
    }))
  ]
});

mountPlayableArrangementGrid(document.getElementById('gong-response-grid'), {
  beats: 8,
  beatsPerBar: 2,
  subdivisions: 2,
  tempo: 105,
  label: '两种鼓色对答，领奏在齐奏前发声',
  rows: [
    { label: '高声领奏', drum: 81, events: [strike(10, 'mf'), strike(12, 'mf', true)] },
    { label: '鼓心', drum: 38, events: [...beats([0, 1, 2], 'mp'), strike(12, 'f', true)] },
    { label: '鼓边', drum: 37, events: [...beats([4, 6, 7], 'mf'), strike(12, 'mf', true)] },
    { label: '合奏重音', drum: 52, events: [strike(12, 'f', true)] }
  ]
});
