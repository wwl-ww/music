import { renderHarmonyPattern } from '../../shared/formats/accompaniment-patterns.js';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { pianoKeysMarkup } from '../../shared/formats/piano.js';
import { mountPianoStudy, pianoHands } from './piano-lesson-score.js';

const duration = { 1: '.16', 2: '.8', 3: '.8 { d }', 4: '.4' };
const pulse = [4, 4, 4, 4];
const heldQuarter = { length: 4, hold: true };
const rhythms = [
  ['四分音符', '两手都落在四个拍点上，时值各是一拍。', pulse],
  ['八分音符', '第二拍拆成两个八分音符，增加一次拍内起音。', [4, 2, 2, 4, 4]],
  ['十六分音符', '第二拍的后半再拆成两个十六分音符，两个短起音集中在拍尾。', [4, 2, 1, 1, 4, 4]],
  ['附点节奏', '第二拍用附点八分加十六分，一长一短占满这一拍。', [4, 3, 1, 4, 4]],
  ['切分', '第二拍后半起音的四分音符跨过第三拍，第三拍上只有左手重新发声。', [4, 2, 4, 2, 4]],
  ['休止', '第二拍前半和第四拍右手留空，左手的脉冲保留。', [4, -2, 4, 2, -4]],
  ['延音线', '第二拍后半的八分音符连到第三拍的四分音符，右手一次起音持续一拍半。', [4, -2, 2, heldQuarter, 2, -2]]
];

function beatParts(durations) {
  let step = 0;
  return durations.map(value => {
    const part = typeof value === 'number' ? { length: Math.abs(value), rest: value < 0 } : value;
    const timed = { step, ...part };
    step += part.length;
    return timed;
  });
}

function rhythmNotes(parts, pitch) {
  return parts.map(({ length, rest, hold }) =>
    (rest ? 'r' : pitch) + (hold ? '{t}' : '') + duration[length]).join(' ');
}

function rhythmEvents(parts) {
  const events = [];
  for (const { step, length, rest, hold } of parts) {
    if (rest) continue;
    if (hold) events.at(-1).length += length;
    else events.push({ step, length });
  }
  return events;
}

const pulseParts = beatParts(pulse);
const rhythmSteps = rhythms.map(([label, description, rhythm]) => {
  const parts = beatParts(rhythm);
  return {
    label,
    description,
    notes: pianoHands(rhythmNotes(parts, 'A4'), rhythmNotes(pulseParts, 'A2')),
    rows: [
      { label: '右手 A4', events: rhythmEvents(parts) },
      { label: '左手 A2', events: rhythmEvents(pulseParts) }
    ]
  };
});
const rhythmGrid = mountArrangementGrid(document.getElementById('piano-improv-rhythm-grid'), {
  label: '左手脉冲与右手起音及延音',
  rows: rhythmSteps[0].rows
});
mountPianoStudy('piano-rhythm-building', rhythmSteps, 88, {
  onStepChange: step => rhythmGrid.update(step.rows),
  onPlaybackPosition: rhythmGrid.markTick
});

const am = '(A2 C3 E3).1';
const opening = 'A4.4 { txt "Am" } C5.4 E5.2';
const answer = 'E5.4 { txt "Am" } C5.4 A4.2';
function melodyStep(label, description, right, { passing = false } = {}) {
  return {
    label,
    description,
    notes: pianoHands(right, am + ' | ' + am),
    highlights: passing ? [1, 2].map(bar => ({ bar, beat: 3 })) : [],
    passing
  };
}

const pitchFigure = document.getElementById('piano-am-pitches');
const pitchLegend = pitchFigure.querySelector('p');
const keys = pitchFigure.querySelector('div');
mountPianoStudy('piano-chord-led-melody', [
  melodyStep('只用和弦音',
    '左手两小节都保持 Am，右手仅用 A、C、E，从 A4 向上到 E5，再回到 A4。',
    opening + ' | ' + answer),
  melodyStep('重排时值与落音',
    '句首把 A4 分成两次起音，两处 E5 的时值都缩短。末音停在 C5，左手仍保持 Am。',
    'A4.8 { txt "Am" } A4.8 C5.4 E5.4 C5.4 | E5.8 { txt "Am" } C5.8 A4.4 C5.2'),
  melodyStep('加入经过音',
    '在 C5 和 E5 之间加入 D5，在 C5 和 A4 之间经过 B4。两处都在第二拍后半，骨干与左手保持原样。',
    'A4.4 { txt "Am" } C5.8 D5.8 E5.2 | E5.4 { txt "Am" } C5.8 B4.8 A4.2',
    { passing: true })
], 80, {
  onStepChange({ passing }) {
    const marked = [9, 12, 16].map(pitch => [pitch, 'keyboard-highlight', 'start']);
    if (passing) marked.push([11, 'keyboard-end', 'end'], [14, 'keyboard-end', 'end']);
    keys.innerHTML = pianoKeysMarkup(marked);
    pitchLegend.textContent = '● 和弦音 A4、C5、E5' + (passing ? '　◆ 经过音 B4、D5' : '');
  }
});

const motif = 'A4.4 { txt "Am" } C5.8 E5.8 C5.2';
function sequence(chord) {
  return `D4.4 { txt "${chord}" } F4.8 A4.8 F4.2`;
}
const sequenceHarmony = document.getElementById('piano-sequence-harmony');
const sequenceChords = {
  Am: { chord: 'Am', degree: 'i', bass: 'A2' },
  Dm: { chord: 'Dm', degree: 'iv', bass: 'D2' },
  F6: { chord: 'F6', degree: 'VI', bass: 'F2' }
};
mountPianoStudy('piano-melody-led-harmony', [
  {
    label: '原样重复',
    description: '第二小节重复第一小节的音高和节奏，左手都以 A2 为低音。',
    notes: pianoHands(motif + ' | ' + motif, am + ' | ' + am),
    finalChord: 'Am'
  },
  {
    label: '下行五度 · Dm',
    description: '第二小节动机整体下移纯五度，左手改为 Dm，D2 与旋律句首 D4 相应。',
    notes: pianoHands(motif + ' | ' + sequence('Dm'), am + ' | (D2 F2 A2).1'),
    finalChord: 'Dm'
  },
  {
    label: '同一模进 · F6',
    description: '右手与 Dm 版完全相同。左手以 F2 为低音，F6 同样包含 D、F、A，低音由 A–D 换成 A–F。',
    notes: pianoHands(motif + ' | ' + sequence('F6'), am + ' | (F2 A2 C3 D3).1'),
    finalChord: 'F6'
  }
], 84, {
  onStepChange({ finalChord }) {
    const bars = ['Am', finalChord].map(chord => [{ ...sequenceChords[chord], beat: 1, span: 4 }]);
    renderHarmonyPattern(sequenceHarmony, bars, 4, { showBass: true });
  }
});

const introBass = ['C3.4 G3.4 E3.4 G3.4', 'F3.4 C4.4 A3.4 C4.4'];
const chorus = ['C5.4 E5.8 G5.8 E5.2', 'C5.4 E5.4 A5.2', 'A5.4 F5.4 C5.2', 'D5.8 E5.8 G5.4 C5.2'];
const form = [
  {
    id: 'opening', label: '前奏', material: '两小节分解和弦给出拍速，右手留下较长的音值。',
    right: ['G4.2 E4.2', 'A4.4 F4.4 G4.2'], left: introBass
  },
  {
    id: 'verse', label: '主歌 A', material: '两个两小节乐句。前句在 G 和弦上停顿，后句回到 C 和弦。',
    right: ['E4.4 G4.8 E4.8 D4.2', 'D4.4 G4.4 D4.2', 'F4.4 A4.8 G4.8 F4.2', 'E4.4 G4.4 C4.2'],
    left: [introBass[0], 'G2.4 D3.4 B2.4 D3.4', introBass[1], 'C3.4 G3.4 (C3 E3).2']
  },
  {
    id: 'transition', label: '过渡 B', material: '低音由 D 转到 G，旋律抬高并留出一拍，接向副歌。',
    right: ['F4.4 A4.4 C5.2', 'D5.2 B4.4 r.4'],
    left: ['D3.4 A3.4 F3.4 A3.4', 'G2.4 D3.4 G3.4 (G3 B3 D4).4']
  },
  {
    id: 'chorus', label: '副歌 C', material: '右手整体比主歌高，左手由四分音符伴奏转为每小节两次和声重音。',
    right: chorus,
    left: ['(C3 E3 G3).2 (C3 E3 G3).2', '(A2 C3 E3).2 (A2 C3 E3).2',
      '(F3 A3 C4).2 (F3 A3 C4).2', '(G2 B2 D3).2 (C3 E3 G3).2']
  },
  {
    id: 'interlude', label: '间奏', material: '短暂抽掉副歌旋律，左手恢复前奏的分解型，右手只奏简短的回应。',
    right: ['r.2 E4.4 G4.4', 'A4.2 G4.2'], left: introBass
  },
  {
    id: 'return', label: '副歌再现', material: '副歌的音高与节奏照原样回来，左手交替使用较低的低音和中区和弦，加宽音响。',
    right: chorus,
    left: ['C2.4 (C3 E3 G3).4 C3.4 (C3 E3 G3).4', 'A2.4 (A3 C4 E4).4 A2.4 (A3 C4 E4).4',
      'F2.4 (F3 A3 C4).4 F2.4 (F3 A3 C4).4', 'G2.4 (G3 B3 D4).4 C2.4 (C3 E3 G3).4']
  },
  {
    id: 'ending', label: '尾奏', material: '保留副歌开头的轮廓，再延长 C 音和主和弦，合成明确收束。',
    right: ['C5.4 E5.8 G5.8 E5.2', 'C5.1'], left: [introBass[0], '(C3 E3 G3).1']
  }
];
let bars = 0;
const sections = form.map(({ id, label, material, right }) => {
  const first = bars + 1;
  bars += right.length;
  return { id, label, material, first, last: bars };
});
const phraseDetails = {
  verse: ['前句停在 G 和弦，留出继续的余地。', '后句回到 C 和弦，末音落在主音 C。'],
  chorus: ['旋律抬高，第二小节保留 A5 长音。', '由 F 转向 G，后两拍回到主和弦 C。'],
  return: ['旋律复现，低音与中区和弦交替。', '保持原副歌的收束，加深低音音区。']
};
const phrases = sections.flatMap(({ id, first }) => (phraseDetails[id] ?? []).map((material, index) => ({
  id: `${id}-phrase-${index + 1}`,
  label: index === 0 ? '前句' : '后句',
  material,
  first: first + 2 * index,
  last: first + 2 * index + 1
})));
const rightHand = form.map(({ label, right }) => String.raw`\section ("${label}") ${right.join(' | ')}`).join(' | ');
const leftHand = form.flatMap(({ left }) => left).join(' | ');

mountFormAnalysis(document.getElementById('piano-improv-form'), {
  score: { notes: pianoHands(rightHand, leftHand), tempo: 92, showDynamics: false },
  sections,
  phrases
});
