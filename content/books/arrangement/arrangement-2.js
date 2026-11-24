import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { mountGuitarChordDiagrams } from '../../shared/formats/guitar-chord-diagram.js';
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
const dominantTail = 'B4.4 G4.4';
mountVariants('phrase-note-color', {
  chord: {
    notes: score(piano(`G4.4 F4.8 G4.8 ${dominantTail}`), dominant),
    summary: '乐句完全由 G7 的基本构成音写成，各音都能直接融入和弦。'
  },
  approach: {
    notes: score(piano(`G4.4 F4.8 A4.8 ${dominantTail}`), dominant),
    summary: 'A4 只占第二拍后半的一个八分音符，上行全音接到第三拍的和弦音 B4。'
  },
  tension: {
    notes: score(piano(`A4.2 ${dominantTail}`), dominant),
    summary: '同一个 A4 从第一拍持续两拍，G7 上的九音获得了独立分量，随后仍落到同一个 B4。'
  }
});

const roleLead = lead('E5.4 D5.4 r.2 | E5.4 D5.4 C5.2');
const rolePulseBar = '(C3 E3 G3).4 { dy p } (C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4';
const rolePulse = track('C 和弦律动', 0, `${rolePulseBar} | ${rolePulseBar}`, 'F4');
const brightMotif = 'r.2 r.8 G4.8 { dy mp } F5.8 C5.8';
mountVariants('phrase-role-comparison', {
  gap: {
    notes: score(roleLead, guitar(`${brightMotif} | r.1`), rolePulse),
    summary: '第一小节后半主旋律休止，吉他在第 3 拍后半起音，从 G4 跳到 F5，再落到 C5。'
  },
  overlap: {
    notes: score(roleLead, guitar(`r.1 | ${brightMotif}`), rolePulse),
    summary: '同一句移到第二小节，突出的高音 F5 和末音 C5 叠在主旋律的 C5 长音上，容易抢走焦点。'
  },
  background: {
    notes: score(roleLead, guitar('r.1 | r.2 G3.4 { dy mp } C4.8 G3.8'), rolePulse),
    summary: '保留上行转下行的轮廓，移入较低音区，用 G–C–G 呼应 C 和弦。动机随第 3 拍起音，主旋律更清楚。'
  }
}, { soundFontUrl: bandSoundFont });

const gapLead = lead('C5.4 A4.4 G4.2 | r.2 r.4 C5.4');
const gapHarmony = track('和声', 0,
  '(C3 E3 G3).1 { dy p } | (G2 B2 D3 F3).2 { dy p } (G2 B2 D3 F3).4 (C3 E3 G3).4', 'F4');
const gapEnding = 'G4.8 A4.8 B4.4 r.4';
const gapGuitar = (notes, ...support) => score(gapLead, guitar(notes), gapHarmony, ...support);
const gapFills = {
  plain: {
    notes: gapGuitar('r.1 | r.1'),
    summary: '第一小节是 C，主旋律止于 G 长音。第二小节前 3 拍转入 G7，主旋律在第 4 拍随 C 和弦重新进入。'
  },
  short: {
    notes: gapGuitar(`r.1 | r.4 ${gapEnding}`),
    summary: '吉他等长音结束才进入，在 G7 上落到 B。和弦回到 C 时，吉他让出起音，主旋律高半音接回 C5。'
  },
  support: {
    notes: gapGuitar(`r.1 | r.4 ${gapEnding}`, bass('r.1 | r.2 B2.4 { dy mp } r.4')),
    summary: '原来的吉他填句保留。贝斯只在它的末音 B4 下方低两个八度叠奏 B2，随后给主旋律的 C5 留出起音。'
  },
  third: {
    notes: gapGuitar(`r.2 E4.2 | D4.8 G4.8 ${gapEnding}`),
    summary: '同属 C 和弦的 E4 与 G4 在句尾同时延续，形成小三度，容易被听成临时加上的主旋律和声。'
  },
  fifth: {
    notes: gapGuitar(`r.2 C4.2 | D4.8 G4.8 ${gapEnding}`),
    summary: '重叠音换成 C 和弦的根音 C4，形成纯五度。随后吉他在 G7 上继续展开，仍让主旋律在第四拍接回 C5。'
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
  { name: '吉他', main: 'G2–D4', open: [] },
  { name: '钢琴右手', main: 'E4–B4', open: [] },
  { name: '主旋律', main: 'G4–D5', open: [] }
], { firstOctave: 1, octaves: 5, rangeLabel: '示意', caption: '四个声部的音区分配' });

const backgroundLead = lead('E5.2 D5.4 C5.4');
const backgroundHarmony = track('Am7', 0, '(A2 C3 E3 G3).1 { dy p }', 'F4');
const backgroundScore = (notes) => score(backgroundLead, bass(notes), backgroundHarmony);
mountVariants('phrase-background-arp', {
  straight: {
    notes: backgroundScore('A1.4 C2.4 E2.4 G2.4'),
    summary: '贝斯用 Am7 的四个构成音连成单向上行，主旋律在更高处下行。'
  },
  turn: {
    notes: backgroundScore('A1.4 E2.4 C2.4 G2.4'),
    summary: '音集合与节奏都相同，贝斯向下转了一次，增加线条感。'
  },
  approach: {
    notes: backgroundScore('A1.4 C2.8 D#2.8 E2.4 G2.4'),
    summary: 'D♯ 在第二拍后半短暂经过，随即接到 Am7 的 E。'
  },
  change: {
    notes: score(
      backgroundLead,
      bass('A1.8 C2.8 E2.8 G2.8 D2.8 F2.8 A2.8 C3.8'),
      track('Am7 → Dm7', 0, '(A2 C3 E3 G3).2 { dy p } (D3 F3 A3 C4).2', 'F4')
    ),
    summary: '前两拍分解 Am7。第三拍改用 D2 建立 Dm7，随后的 F、A、C 延续原来的八分音符。'
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
    summary: '顶音 C5–B4 距低音 C3–B2 两个八度，两条线一起下行半音。'
  },
  leap: {
    notes: score(piano('(E4 G4 C5).2 (G5 B5 D6).2'), changingBass),
    summary: '第二个和弦仍为 G/B，钢琴顶音却跳到 D6，整个音区突变。'
  }
});

mountGuitarChordDiagrams(document.getElementById('phrase-guitar-shapes'), [
  {
    label: 'G3 在底部',
    positions: [null, null, 5, 4, 3, null],
    degrees: [null, null, 'R', '3', '5', null],
    firstFret: 3
  },
  {
    label: 'B3 在底部',
    positions: [null, null, 9, 7, 8, null],
    degrees: [null, null, '3', '5', 'R', null],
    firstFret: 7
  },
  {
    label: 'D4 在底部',
    positions: [null, null, 12, 12, 12, null],
    degrees: [null, null, '5', 'R', '3', null],
    firstFret: 10
  }
]);

const drumParts = [
  { key: 'crash', label: '镲', midi: 49 },
  { key: 'hat', label: '闭合踩镲', midi: 42 },
  { key: 'snare', label: '小鼓', midi: 38 },
  { key: 'highTom', label: '高音桶鼓', midi: 50 },
  { key: 'lowTom', label: '低音桶鼓', midi: 45 },
  { key: 'floorTom', label: '落地桶鼓', midi: 41 },
  { key: 'kick', label: '底鼓', midi: 36 }
];
const kicks = [0, 10, 16, 26];
const snares = [4, 12, 20, 28];
const groove = Array.from({ length: 16 }, (_, index) => {
  const step = index * 2;
  const kick = kicks.includes(step);
  const snare = snares.includes(step);
  const instruments = ['hat'];
  if (kick) instruments.push('kick');
  if (snare) instruments.push('snare');
  return { step, instruments, accent: kick || snare };
});
const skeletonSteps = [8, 10, 12, 14];
const fillSteps = [8, 10, 12, 13, 14, 15];
const fillParts = {
  low: [['snare'], ['snare'], ['snare'], ['floorTom'], ['snare'], ['floorTom']],
  middle: [['snare'], ['crash', 'snare'], ['snare'], ['floorTom'], ['snare'], ['floorTom']],
  high: [['snare'], ['crash', 'snare'], ['lowTom'], ['highTom'], ['floorTom'], ['lowTom']]
};
const drumArticulations = drumParts.map(({ key, midi }) => String.raw`\articulation (${key} ${midi})`).join(' ');

function fillHits(steps, parts) {
  const arrival = groove.find(({ step }) => step === 16);
  const originalAccents = new Set(groove.filter(({ accent }) => accent).map(({ step }) => step));
  return [
    ...groove.filter(({ step }) => step < 8),
    ...steps.map((step, index) => ({ step, instruments: parts[index], accent: originalAccents.has(step) })),
    { ...arrival, instruments: ['crash', ...arrival.instruments] },
    ...groove.filter(({ step }) => step > 16)
  ];
}

function gridRows(hits) {
  return [
    { label: '原律动', events: groove },
    ...drumParts.map(({ key, label }) => ({
      label,
      events: hits.filter(({ instruments }) => instruments.includes(key))
    }))
  ];
}

function drumScore(hits) {
  const byStep = new Map(hits.map(hit => [hit.step, hit]));
  const notes = [0, 16].map(start => Array.from({ length: 16 }, (_, offset) => {
    const hit = byStep.get(start + offset);
    if (!hit) return 'r.16';
    const { instruments, accent } = hit;
    const names = instruments.length === 1 ? instruments[0] : '(' + instruments.join(' ') + ')';
    return `${names}.16 { dy ${accent ? 'f' : 'p'} }`;
  }).join(' ')).join(' | ');
  return score({
    name: '鼓组',
    program: 'percussion',
    phrase: String.raw`\clef neutral ${drumArticulations} \ts (4 4) ${notes}`
  });
}

const drumHits = {
  groove,
  skeleton: fillHits(skeletonSteps, skeletonSteps.map(() => ['snare'])),
  ...Object.fromEntries(Object.entries(fillParts).map(([version, parts]) => [version, fillHits(fillSteps, parts)]))
};
const fillGrid = mountArrangementGrid(document.getElementById('phrase-fill-grid'), {
  beats: 8,
  rows: gridRows(drumHits.groove),
  label: '原律动和鼓组过门的起音与重音'
});
mountVariants('phrase-fill-comparison', {
  groove: {
    notes: drumScore(drumHits.groove),
    summary: '首行是参照。第 3 拍后半的底鼓与第 4 拍的小鼓都是原律动的重音。'
  },
  skeleton: {
    notes: drumScore(drumHits.skeleton),
    summary: '第 3 拍起转入小鼓。较重的两击对齐原律动，拍内其余位置留空。第二小节重拍后恢复踩镲和底鼓、小鼓。'
  },
  low: {
    notes: drumScore(drumHits.low),
    summary: '第 4 拍内多两次较轻的击打，原来的两个重音保持。小鼓和落地桶鼓交替。'
  },
  middle: {
    notes: drumScore(drumHits.middle),
    summary: '给第 3 拍后半的重音加上镲，与小鼓一起发声，其他击点沿用前一版。'
  },
  high: {
    notes: drumScore(drumHits.high),
    summary: '保持重音和击点，改用高低桶鼓折返。镲和底鼓落在下一小节开头，随后接回原律动。'
  }
}, {
  tempo: 92,
  soundFontUrl: bandSoundFont,
  onPlaybackPosition(tick) { fillGrid.markStep(tick === null ? null : Math.floor(tick / 240)); },
  onChange(version) { fillGrid.update(gridRows(drumHits[version])); }
});
