import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { renderRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';

function mountVariants(id, variants, { tempo = 92, soundFontUrl, onChange, onPlaybackPosition } = {}) {
  const demo = document.getElementById(id);
  const choice = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  const figure = demo.querySelector('[data-audible-score]') ?? demo.querySelector('figure');

  function selection() {
    const { notes, summary } = variants[choice.value];
    cue.textContent = summary;
    onChange?.(choice.value);
    return notes;
  }

  const player = mountScore(figure, {
    notation: 'staff',
    notationVisible: !figure.hasAttribute('data-audible-score'),
    notes: selection(),
    tempo,
    soundFontUrl,
    onPlaybackPosition
  });
  choice.addEventListener('change', () => player.setNotes(selection()));
}

function track(name, program, notes, clef = 'G2') {
  return { name, program, phrase: String.raw`\clef ${clef} \ts (4 4) ${notes}` };
}

const guitar = (notes) => track('电吉他', 27, notes);
const bass = (notes) => track('贝斯', 33, notes, 'F4');
const piano = (notes) => track('钢琴', 0, notes);
const lead = (notes) => track('主旋律', 73, notes);
const score = (...scoreTracks) => ({ scoreTracks });

const pulse = track('基本律动', 0, 'C3.4 C3.4 C3.4 C3.4', 'F4');
mountVariants('phrase-rhythm', {
  together: {
    notes: score(piano('E4.4 G4.4 E4.4 C4.4'), pulse),
    summary: '乐句与每个伴奏拍点同时起音，两层节奏合在一起。'
  },
  offset: {
    notes: score(piano('r.8 E4.4 G4.4 E4.4 C4.8'), pulse),
    summary: '乐句整体推迟半拍，三个音跨过伴奏的下一次起音，形成独立的节奏。'
  },
  split: {
    notes: score(piano('E4.4 G4.4 E4.4 C4.8 C4.8'), pulse),
    summary: '保留原有拍点，第四拍把 C 分成两次起音，变化集中在句末。'
  }
});

const motions = {
  distance: [
    { label: '级进', notes: 'C4.4 D4.4 E4.4 F4.4', summary: '上行方向固定，每一步移到相邻音级。' },
    { label: '跳进', notes: 'C4.4 E4.4 G4.4 C5.4', summary: '同样上行，三度与四度让轮廓张开。' }
  ],
  contour: [
    { label: '单向', notes: 'G4.4 F4.4 E4.4 D4.4', summary: '音符依次下行，运动态势一致。' },
    { label: '折返', notes: 'E4.4 F4.4 E4.4 D4.4', summary: '仍然全是级进，上行后转向下行，改变的只是轮廓。' }
  ],
  direction: [
    { label: '下行', notes: 'G4.4 F4.4 E4.4 D4.4', summary: '同一组音按从高到低排列。' },
    { label: '上行', notes: 'D4.4 E4.4 F4.4 G4.4', summary: '反转上述音序，级进上行把乐句推向高处。' }
  ]
};
const motion = document.getElementById('phrase-motion');
const feature = motion.querySelector('[name="feature"]');
const version = motion.querySelector('[name="version"]');
const motionCue = motion.querySelector('.music-demo-cue');
function motionNotes() {
  const { notes, summary } = motions[feature.value][version.selectedIndex];
  motionCue.textContent = summary;
  return String.raw`\ts (4 4) ${notes}`;
}
const motionPlayer = mountScore(motion.querySelector('figure'), {
  notation: 'staff',
  tempo: 92,
  notes: motionNotes()
});
feature.addEventListener('change', () => {
  motions[feature.value].forEach(({ label }, index) => { version.options[index].textContent = label; });
  version.selectedIndex = 0;
  motionPlayer.setNotes(motionNotes());
});
version.addEventListener('change', () => motionPlayer.setNotes(motionNotes()));

const dominant = track('G7', 0, '(G2 B2 D3 F3).1 { dy p }', 'F4');
mountVariants('phrase-note-color', {
  chord: {
    notes: score(piano('G4.4 B4.8 F4.8 D4.4 G4.4'), dominant),
    summary: '乐句完全由 G7 的基本构成音写成，各音都能直接融入和弦。'
  },
  approach: {
    notes: score(piano('G4.4 B4.8 C#4.8 D4.4 G4.4'), dominant),
    summary: '弱位置的 C♯ 很快向上半音接到第三拍的 D，D 仍然是落点。'
  },
  tension: {
    notes: score(piano('A4.2 F4.4 D4.4'), dominant),
    summary: 'A 在第一拍起音并持续两拍，作为九音成为乐句本身的色彩。'
  }
});

const gapLead = lead('B4.4 A4.4 G4.2 | r.2 r.4 D5.4');
const gapFills = {
  plain: {
    notes: score(gapLead, guitar('r.1 | r.1')),
    summary: '第一小节后两拍是 G 的长音，第二小节第 1–3 拍留空。'
  },
  short: {
    notes: score(gapLead, guitar('r.1 | r.4 E4.8 G4.8 B4.4 r.4')),
    summary: '吉他等长音结束才进入，把短句收在主旋律下次起音之前。'
  },
  third: {
    notes: score(gapLead, guitar('r.2 E4.2 | E4.8 G4.8 B4.4 D5.4 r.4')),
    summary: '长音 G 与吉他 E 在同一处延续，三度重叠容易被听成附加和声。'
  },
  fifth: {
    notes: score(gapLead, guitar('r.2 C4.2 | E4.8 G4.8 B4.4 D5.4 r.4')),
    summary: '重叠音换成 C，C–G 构成五度。后续吉他线和主旋律保持不变。'
  }
};
mountVariants('phrase-gap-comparison', gapFills, { soundFontUrl: bandSoundFont });

mountVariants('phrase-piano-gap', {
  onset: {
    notes: String.raw`\ts (4 4) (C4 E4 G4 E5).2 D5.4 C5.4`,
    summary: 'E5 起音时有下方和弦支撑，后两个音回到单线。'
  },
  octaves: {
    notes: String.raw`\ts (4 4) (E4 E5).2 (D4 D5).4 (C4 C5).4`,
    summary: '整句由两个八度层同步演奏，三个起音都加厚。'
  }
});

renderRangeKeyboards(document.getElementById('phrase-background-ranges'), [
  { name: '贝斯', main: 'A1–G2', open: [] },
  { name: '吉他', main: 'G2–E4', open: [] },
  { name: '钢琴右手', main: 'C4–G4', open: [] },
  { name: '主旋律', main: 'E4–D5', open: [] }
], { firstOctave: 1, octaves: 5, rangeLabel: '本例', caption: '乐队声部的示例音区' });

const backgroundLead = lead('E5.2 D5.4 C5.4');
mountVariants('phrase-background-arp', {
  straight: {
    notes: score(backgroundLead, bass('A1.4 C2.4 E2.4 G2.4')),
    summary: '贝斯用 Am7 的四个构成音连成单向上行，主旋律在更高处下行。'
  },
  turn: {
    notes: score(backgroundLead, bass('A1.4 E2.4 C2.4 G2.4')),
    summary: '音集合与节奏都相同，贝斯向下转了一次，增加线条感。'
  },
  approach: {
    notes: score(backgroundLead, bass('A1.4 C2.8 D#2.8 E2.4 G2.4')),
    summary: 'D♯ 在第二拍后半短暂经过，随即接到 Am7 的 E。'
  }
}, { soundFontUrl: bandSoundFont });

const changingBass = track('低音', 0, 'C3.2 B2.2', 'F4');
mountVariants('phrase-top-note', {
  common: {
    notes: score(piano('(C4 E4 G4).2 (B3 D4 G4).2'), changingBass),
    summary: '最高音 G 同时属于 C 和 G，换和弦时保留在原位。'
  },
  step: {
    notes: score(piano('(E4 G4 C5).2 (D4 G4 B4).2'), changingBass),
    summary: '最高音 C5 下行半音到 B4，保持和弦变化的连续性。'
  },
  leap: {
    notes: score(piano('(E4 G4 C5).2 (G5 B5 D6).2'), changingBass),
    summary: '第二个和弦仍为 G/B，钢琴顶音却跳到 D6，整个音区突变。'
  }
});

const drumParts = [
  { key: 'crash', label: '镲', midi: 49 },
  { key: 'snare', label: '小鼓', midi: 38 },
  { key: 'highTom', label: '高音桶鼓', midi: 50 },
  { key: 'lowTom', label: '低音桶鼓', midi: 45 },
  { key: 'floorTom', label: '落地桶鼓', midi: 41 },
  { key: 'kick', label: '底鼓', midi: 36 }
];
const fillParts = {
  low: [['snare'], ['snare'], ['snare'], ['floorTom'], ['snare'], ['floorTom']],
  middle: [['crash', 'snare'], ['snare'], ['snare'], ['floorTom'], ['snare'], ['floorTom']],
  high: [['crash', 'snare'], ['lowTom'], ['snare'], ['highTom'], ['floorTom'], ['lowTom']]
};
const fillSteps = [8, 10, 12, 13, 14, 15];
const drumArticulations = drumParts.map(({ key, midi }) => String.raw`\articulation (${key} ${midi})`).join(' ');

function fillHits(parts) {
  return [
    { step: 0, instruments: ['kick'] },
    { step: 4, instruments: ['snare'] },
    ...fillSteps.map((step, index) => ({ step, instruments: parts[index], accent: index === 0 || index === 2 })),
    { step: 16, instruments: ['crash', 'kick'], accent: true }
  ];
}

function gridRows(hits) {
  return drumParts.map(({ key, label }) => ({
    label,
    events: hits.filter(({ instruments }) => instruments.includes(key))
  }));
}

function drumScore(hits) {
  const durations = [4, 4, 8, 8, 16, 16, 16, 16, 4];
  const notes = hits.map(({ instruments, accent }, index) => {
    const voices = instruments.length === 1 ? instruments[0] : '(' + instruments.join(' ') + ')';
    const hit = `${voices}.${durations[index]} { dy ${accent ? 'f' : 'mp'} }`;
    return index === 8 ? '| ' + hit + ' r.4 r.2' : hit;
  }).join(' ');
  return score({
    name: '鼓组',
    program: 'percussion',
    phrase: String.raw`\clef neutral ${drumArticulations} \ts (4 4) ${notes}`
  });
}

const drumHits = Object.fromEntries(Object.entries(fillParts).map(([version, parts]) => [version, fillHits(parts)]));
const fillGrid = mountArrangementGrid(document.getElementById('phrase-fill-grid'), {
  beats: 8,
  rows: gridRows(drumHits.low),
  label: '鼓组过门的起音与重音'
});
mountVariants('phrase-fill-comparison', {
  low: {
    notes: drumScore(drumHits.low),
    summary: '过门多留在小鼓，同落地桶鼓交替，音色移动较少。'
  },
  middle: {
    notes: drumScore(drumHits.middle),
    summary: '过门起点加上镲与小鼓同击，起点比前一版更突出，后续鼓件不变。'
  },
  high: {
    notes: drumScore(drumHits.high),
    summary: '保持重音和击点，在两种桶鼓之间折返，最后仍用镲与底鼓接入下一小节。'
  }
}, {
  tempo: 92,
  soundFontUrl: bandSoundFont,
  onPlaybackPosition(tick) { fillGrid.markStep(tick === null ? null : Math.floor(tick / 240)); },
  onChange(version) { fillGrid.update(gridRows(drumHits[version])); }
});
