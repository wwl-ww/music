import { mountScore } from './shared/formats/score.js';
import './shared/formats/keyboard-intervals.js';
import { mountRepeatRoute } from './shared/formats/repeat-route.js';
import { mountFormAnalysis } from './shared/formats/form-analysis.js';
import { mountVoiceRelations } from './shared/formats/voice-relations.js';
import { mountScoreComparison } from './shared/formats/score-comparison.js';
import { mountScoreWritingSteps } from './shared/formats/score-writing-steps.js';
import { mountPlayableArrangementGrid } from './shared/formats/arrangement-grid-playback.js';
import { mountArrangementGrid } from './shared/formats/arrangement-grid.js';
import { renderHarmonyPattern, renderRhythmPattern } from './shared/formats/accompaniment-patterns.js';
import { mountGuitarChordDiagrams } from './shared/formats/guitar-chord-diagram.js';
import { mountFretboard } from './shared/formats/fretboard.js';
import { mountStringSounds, mountWindFingering } from './shared/formats/instrument-techniques.js';
import { diziFingering, diziHoleLabels, guqinSoundExamples } from './books/chinese-orchestration/instrument-technique-data.js';
import { mountTimeline } from './shared/formats/timeline.js';
import { mountProgrammaticScore } from './shared/formats/programmatic-score.js';
import { mountOrnamentComparison } from './shared/formats/ornament-comparison.js';
import { labelledChordScore } from './shared/formats/harmony-score.js';
import { buildMajorScale } from './shared/formats/scales.js';
import { mountChordRevision } from './shared/formats/chord-revision.js';
import { mountDominantTensionMap } from './shared/formats/dominant-tension-map.js';
import { renderRangeKeyboards, readInstrumentRanges } from './shared/formats/range-keyboards.js';
import { horizontalRangeChart, staffRangeChart } from './shared/formats/instrument-range-charts.js';

const preview = document.querySelector('#preview-width');
const showcase = document.querySelector('.format-showcase');
function setPreviewWidth() {
  showcase.dataset.previewWidth = preview.value;
}
preview.addEventListener('change', setPreviewWidth);
setPreviewWidth();

mountWindFingering(document.getElementById('wind-fingering-preview'), diziHoleLabels).update(diziFingering('re'));
mountStringSounds(document.getElementById('string-sound-preview'), guqinSoundExamples);

const pendingSamples = new Map();
const sampleObserver = new IntersectionObserver(entries => {
  for (const { target, isIntersecting } of entries) {
    if (!isIntersecting || !pendingSamples.has(target)) continue;
    const render = pendingSamples.get(target);
    pendingSamples.delete(target);
    sampleObserver.unobserve(target);
    render(target);
  }
}, { rootMargin: '220px 0px' });

function renderNearViewport(id, render) {
  const sample = document.getElementById(id);
  pendingSamples.set(sample, render);
  sampleObserver.observe(sample);
}

const indexLinks = [...document.querySelectorAll('.format-index a')];
function markSampleFamily() {
  const target = document.getElementById(location.hash.slice(1));
  const section = target?.closest('.format-family');
  const current = section ? '#' + section.getAttribute('aria-labelledby') : indexLinks[0].hash;
  for (const link of indexLinks) {
    if (link.hash === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  const disclosure = target?.closest('details');
  if (disclosure) disclosure.open = true;
}
window.addEventListener('hashchange', markSampleFamily);
markSampleFamily();

const themeChoices = document.querySelector('#theme-choices');
const themeButtons = [...document.querySelectorAll('.format-theme-list button')];
function markTheme(theme) {
  for (const button of themeButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.theme === theme));
  }
}
themeChoices.addEventListener('change', ({ target }) => markTheme(target.value));
for (const button of themeButtons) {
  button.addEventListener('click', () => {
    const radio = themeChoices.querySelector(`[value="${button.dataset.theme}"]`);
    radio.checked = true;
    radio.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
markTheme(document.documentElement.dataset.theme);

const nameToggle = document.querySelector('#sample-toggle');
const toggleState = document.querySelector('#sample-toggle-state');
nameToggle.addEventListener('click', () => {
  const selected = nameToggle.getAttribute('aria-pressed') !== 'true';
  nameToggle.setAttribute('aria-pressed', String(selected));
  toggleState.textContent = selected ? 'C · E · G' : '';
});

const rangeHost = document.querySelector('#library-range-preview');
const rangeChoice = document.querySelector('#range-sample-view');
const ranges = readInstrumentRanges(document.querySelector('#library-range-table'));
function renderRangeSample() {
  rangeHost.classList.remove('range-keyboards');
  if (rangeChoice.value === 'keyboard') {
    renderRangeKeyboards(rangeHost, ranges, { firstOctave: 3, octaves: 5, caption: '键盘上的音域与空弦' });
  } else if (rangeChoice.value === 'horizontal') {
    rangeHost.innerHTML = '<figcaption>同一横轴上的音域</figcaption>' + horizontalRangeChart(ranges);
  } else {
    rangeHost.innerHTML = '<figcaption>共用大谱表上的音域</figcaption><div class="staff-range-comparison">' + staffRangeChart(ranges) + '</div>';
  }
}
rangeChoice.addEventListener('change', renderRangeSample);
renderRangeSample();

const gridSample = {
  label: '贝斯与底鼓的起音对照',
  subdivisions: 2,
  rows: [
    { label: '贝斯 C3', program: 33, pitch: 'C3', events: [{ step: 0, length: 2 }, { step: 4, length: 3 }] },
    { label: '底鼓', drum: 36, events: [{ step: 0 }, { step: 4 }] }
  ]
};
mountArrangementGrid(document.querySelector('#library-grid'), gridSample);
renderNearViewport('arrangement-grid-sample', frame => mountPlayableArrangementGrid(frame, gridSample));
renderNearViewport('library-gong-grid', frame => mountPlayableArrangementGrid(frame, {
  label: '锣鼓经的口读与击法',
  tempo: 78,
  subdivisions: 2,
  rows: [
    { label: '口读示意', notationOnly: true, events: [{ step: 0, text: '仓', accent: true }, { step: 2, text: '七' }, { step: 4, text: '仓', accent: true }, { step: 6, text: '七' }] },
    { label: '锣', drum: 52, events: [{ step: 0, text: '响', label: '放响', accent: true }, { step: 4, text: '响', label: '放响', accent: true }] },
    { label: '钹', drum: 49, events: [{ step: 0, text: '齐', label: '与锣合击' }, { step: 2, text: '击', label: '单击' }, { step: 4, text: '齐', label: '与锣合击' }, { step: 6, text: '击', label: '单击' }] }
  ]
}));

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

const melodyScore = {
  tempo: 88,
  notes: String.raw`
    \ks C
    \ts 4 4
    C4.4 { d } D4.8 E4.4 G4.4 |
    C5.4 G4.4 F#4.4 G4.4 |
    r.1 |
    E4.4 D4.4 C4.2
  `
};
renderNearViewport('melody-example', figure => mountScore(figure, melodyScore));

const scoreModes = document.querySelector('#score-mode-details');
function mountScoreModes() {
  if (!scoreModes.open) return;
  scoreModes.removeEventListener('toggle', mountScoreModes);
  mountScore(document.querySelector('#staff-example'), { ...melodyScore, notation: 'staff' });
  mountScore(document.querySelector('#numbered-example'), { ...melodyScore, notation: 'numbered' });
  mountScore(document.querySelector('#visual-score-example'), { ...melodyScore, notation: 'staff', audio: false });
  mountScore(document.querySelector('#audio-example'), { ...melodyScore, notation: 'staff', notationVisible: false });
}
scoreModes.addEventListener('toggle', mountScoreModes);
mountScoreModes();

renderNearViewport('library-four-part', figure => mountScore(figure, {
  notation: 'staff',
  tempo: 76,
  notes: labelledChordScore([
    [['C3 G3 E4 C5', 'I']],
    [['F3 A3 F4 C5', 'IV']],
    [['G3 B3 F4 D5', 'V7']],
    [['C3 C4 E4 C5', 'I']]
  ]),
  voiceAudition: [
    { label: '全部声部', voices: [1, 2, 3, 4] },
    { label: '高声部', voices: [1] },
    { label: '外声部', voices: [1, 4] }
  ]
}));

renderNearViewport('library-programmatic', host => mountProgrammaticScore(host, {
  build: choices => buildMajorScale({ ...choices, type: 'natural' }),
  lowestPitch: 60,
  octaves: 2
}));

renderNearViewport('library-ornament', host => mountOrnamentComparison(host, ({ variant }) => {
  const upper = variant === 'upper';
  return {
    glyph: upper ? '\uE56C' : '\uE56D',
    events: [['E4', 1], [upper ? 'F4' : 'D4', 1], ['E4', 6]],
    text: upper ? 'E–F–E。短音 F 在主音上方。' : 'E–D–E。短音 D 在主音下方。'
  };
}));

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

renderRhythmPattern(document.querySelector('#library-rhythm-pattern'), {
  beats: 4,
  measures: [[
    { label: '右手', events: [
      { start: 0, end: 0.125, type: 'rest' },
      { start: 0.125, end: 0.375, type: 'attack', roles: [{ name: '根' }, { name: '五' }] },
      { start: 0.375, end: 0.5, type: 'rest' },
      { start: 0.5, end: 0.75, type: 'attack', roles: [{ name: '根', octave: 1 }] },
      { start: 0.75, end: 1, type: 'hold' }
    ] },
    { label: '左手', events: [
      { start: 0, end: 0.5, type: 'attack', roles: [{ name: '根', octave: -2 }] },
      { start: 0.5, end: 1, type: 'attack', roles: [{ name: '五', octave: -1 }] }
    ] }
  ]]
});
renderHarmonyPattern(document.querySelector('#library-harmony-pattern'), [
  [{ degree: '1', chord: 'C', bass: 'C', span: 3, beat: 1 }, { degree: '5/7', chord: 'G', bass: 'B', inversion: true, span: 1, beat: 4 }],
  [{ degree: '6m', chord: 'Am', bass: 'A', span: 4, beat: 1 }]
]);

const timelineEvents = [
  { id: 'a', label: 'A 呈示', start: 1, length: 2, description: '第 1–2 小节 · A 呈示' },
  { id: 'b', label: 'B 对比', start: 3, length: 2, description: '第 3–4 小节 · B 对比' },
  { id: 'return', label: 'A′ 再现', start: 5, length: 2, description: '第 5–6 小节 · A′ 再现' }
];
const timelineStatus = document.querySelector('#library-timeline-status');
const timeline = mountTimeline(document.querySelector('#library-timeline'), {
  unitCount: 6,
  unitName: '小节',
  lanes: [{ label: '段落', events: timelineEvents }],
  onSelect: showTimelineEvent
});
function showTimelineEvent(id) {
  timeline.select(id);
  timelineStatus.textContent = timelineEvents.find(event => event.id === id).description;
}
showTimelineEvent('a');

const revision = document.querySelector('#library-chord-revision');
const revisionDiagrams = document.querySelector('#voice-leading-sample .voice-leading-staves').cloneNode(true);
revisionDiagrams.dataset.revisionDiagrams = '';
const revisionVersions = [
  { label: '原版', symbol: 'G7', pitches: 'G2 D3 B3 F4' },
  { label: '三全音替代', symbol: 'Db7', pitches: 'Db2 Ab3 Cb4 F4' }
].map(({ label, symbol, pitches }, index) => {
  revisionDiagrams.children[index].dataset.revisionVersion = label;
  return {
    label,
    bars: [[{ symbol, start: 0, end: 2 }], [{ symbol: 'C', start: 0, end: 2 }]],
    score: labelledChordScore([[[pitches, symbol]], [['C2 G3 C4 E4', 'C']]])
  };
});
revision.append(revisionDiagrams);
mountChordRevision(revision, {
  title: 'G7 或 D♭7 → C',
  versions: revisionVersions,
  tempo: 76
});

function dominantProgression(preparation, dominant, target) {
  return included => included
    ? `(${preparation}).2 (${dominant}).2 | (${target}).1`
    : `(${dominant}).1 | (${target}).1`;
}
renderNearViewport('library-tension', host => mountDominantTensionMap(host, [
  { tonic: 'C', score: dominantProgression('D3 F3 A3 C4', 'G2 B3 F4 A4 E5', 'C3 E3 G3 C4') },
  { tonic: 'C', minor: true, score: dominantProgression('D3 F3 Ab3 C4', 'G2 B3 F4 Ab4 Eb5', 'C3 Eb3 G3 C4') }
], { tempo: 88 }));

renderNearViewport('library-form-analysis', host => mountFormAnalysis(host, {
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
}));

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
    { from: 'guide', to: 'b-answer', label: '辅助谱表的预写与实际 B′ 对齐' }
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

renderNearViewport('library-score-comparison', host => mountScoreComparison(host, {
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
}));

const canonOpening = 'C5.8 D5.8 E5.4 G5.2';
const canonEcho = 'C4.8 D4.8 E4.4 G4.2';
const canonEnding = 'E5.2 F5.4 G5.4';
renderNearViewport('library-writing-steps', host => mountScoreWritingSteps(host, {
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
}));
