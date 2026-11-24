import ensembleSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { mountScore } from '../../shared/formats/score.js';

const instruments = {
  voice: { name: '主旋律', program: 53, clef: 'G2' },
  piano: { name: '钢琴', program: 0, clef: 'G2' },
  guitar: { name: '吉他', program: 26, clef: 'G2' },
  bass: { name: '贝斯', program: 33, clef: 'F4' }
};

function part(instrument, notes, label) {
  const { name, program, clef } = instruments[instrument];
  return { name: label ?? name, program, phrase: String.raw`\clef ${clef} \ks C \ts (4 4) ${notes}` };
}

function drumPart(notes) {
  return {
    name: '鼓组',
    program: 'percussion',
    phrase: String.raw`\clef neutral \articulation (Kick 36) \articulation (Snare 38)
      \articulation (FloorTom 41) \articulation (Hat 42) \articulation (Crash 49) \ts (4 4) ${notes}`
  };
}

function mountVariants(id, layouts, tempo, onChange) {
  const demo = document.getElementById(id);
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  const figure = demo.querySelector('figure');

  function showVersion() {
    const { tracks, description, rows } = layouts[select.value];
    cue.textContent = description;
    onChange?.(rows);
    return { scoreTracks: tracks };
  }

  const player = mountScore(figure, {
    notes: showVersion(), tempo, notation: 'staff', soundFontUrl: ensembleSoundFont
  });
  select.addEventListener('change', () => player.setNotes(showVersion()));
}

const lead = 'E4.4 G4.4 A4.4 C5.4';
const returningLead = 'C5.4 A4.4 G4.4 E4.4';
function motionLayout(guitar, returningGuitar, description) {
  return {
    tracks: [
      part('guitar', lead + ' | ' + returningLead, '吉他一'),
      part('guitar', guitar + ' | ' + returningGuitar, '吉他二')
    ],
    description
  };
}

mountVariants('ensemble-motions', {
  unison: motionLayout(lead, returningLead, '两把吉他在相同的实际音高上奏同一个乐句，覆盖一个音区。'),
  octave: motionLayout('E3.4 G3.4 A3.4 C4.4', 'C4.4 A3.4 G3.4 E3.4', '第二把吉他把第一把的曲调低八度复制。两条线同起同落，覆盖的音区变宽。'),
  parallel: motionLayout('C4.4 E4.4 F4.4 A4.4', 'A4.4 F4.4 E4.4 C4.4', '两条线同向转折。音程保持在三度范围，大小随具体音高变化。'),
  contrary: motionLayout('C4.4 B3.4 A3.4 F3.4', 'F3.4 A3.4 B3.4 C4.4', '上方吉他上行时，下方吉他下行。回程时两条线改变方向，从分开转为靠近。'),
  oblique: motionLayout('C4.1', 'C4.1', '下方吉他每小节维持 C4，纵向音程随上方吉他的移动而变化。')
}, 96);

const durationToken = { 1: 16, 2: 8, 4: 4, 8: 2, 16: 1 };
function notePattern(events, initialDynamic = 'mf') {
  let nextStep = 0;
  const tokens = [];
  function appendRestUntil(end) {
    for (const unit of [16, 8, 4, 2, 1]) {
      if (nextStep + unit > end) continue;
      tokens.push('r.' + durationToken[unit]);
      nextStep += unit;
    }
  }
  events.forEach(({ step, note, length, accent }, index) => {
    appendRestUntil(step);
    const dynamics = accent ? 'f' : index === 0 ? initialDynamic : '';
    tokens.push(note + '.' + durationToken[length] + (dynamics ? ` { dy ${dynamics} }` : ''));
    nextStep = step + length;
  });
  appendRestUntil(16);
  return tokens.join(' ');
}

function threeAttacks(steps, notes, length) {
  return steps.map((step, index) => ({
    step, note: notes[index], length, accent: index === steps.length - 1
  }));
}

const commonAttacks = [2, 4, 6];
const guitarDown = threeAttacks(commonAttacks, ['B4', 'A4', 'G4'], 2);
const guitarOctave = threeAttacks(commonAttacks, ['B3', 'A3', 'G3'], 2);
const bassUp = threeAttacks(commonAttacks, ['G2', 'C3', 'D3'], 2);
const pianoOverdub = part('piano', String.raw`${notePattern(guitarDown)} ||
    \staff { score } \tuning (none) \clef F4 ${notePattern(bassUp)}`);

function rhythmLayout(drumSteps, description) {
  const drums = threeAttacks(drumSteps, drumSteps.map(() => '(Snare FloorTom)'), 2);
  return {
    description,
    rows: [
      { label: '吉他一', events: guitarDown },
      { label: '吉他二', events: guitarOctave },
      { label: '贝斯', events: bassUp },
      { label: '钢琴', events: guitarDown },
      { label: '鼓组', events: drums.map(({ step, accent }) => ({ step, accent })) }
    ],
    tracks: [
      part('guitar', notePattern(guitarDown), '吉他一'),
      part('guitar', notePattern(guitarOctave), '吉他二'),
      part('bass', notePattern(bassUp)),
      pianoOverdub,
      drumPart(notePattern(drums))
    ]
  };
}

const gridHost = document.querySelector('[data-ensemble-grid]');
let rhythmGrid;
mountVariants('ensemble-aligned-rhythm', {
  aligned: rhythmLayout(commonAttacks,
    '吉他与贝斯反向运动。小鼓、落地鼓与各声部在三处对齐，过门短促有力。'),
  offset: rhythmLayout(commonAttacks.map(step => step + 1),
    '每组鼓点整体推迟一个十六分音符。吉他、贝斯和钢琴保持原样，鼓的声音从共同音头里分离出来。')
}, 94, rows => {
  if (rhythmGrid) rhythmGrid.update(rows);
  else rhythmGrid = mountArrangementGrid(gridHost, { beats: 4, subdivisions: 4, rows, label: '反向过门的共同起音' });
});

const simpleDrums = '(Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8 (Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8';

function focusEvents(items) {
  return items.map(([step, note, length]) => ({ step, note, length }));
}

const singerBars = [
  focusEvents([[0, 'G5', 4], [4, 'E5', 8]]),
  focusEvents([[8, 'A5', 4], [12, 'G5', 4]])
];
const pianoFillBars = [
  focusEvents([[8, 'C5', 4], [12, 'G4', 2], [14, 'E4', 2]]),
  focusEvents([[0, 'F4', 4], [4, 'A4', 4]])
];
const guitarLeadIn = [4, '(C4 G4)', 4];
const guitarReturn = [8, '(C4 F4)', 8];
const movingGuitarBars = [
  focusEvents([guitarLeadIn, [8, 'E4', 2], [10, 'G4', 2], [12, 'G4', 2], [14, 'E4', 2]]),
  focusEvents([[0, 'C4', 2], [2, 'A4', 2], [4, 'A4', 2], [6, 'F4', 2], guitarReturn])
];
const heldGuitarBars = [
  focusEvents([guitarLeadIn, [8, '(C4 E4)', 8]]),
  focusEvents([[0, '(C4 F4)', 8], guitarReturn])
];

function priorityLayout(guitarBars, description) {
  const voices = [
    { instrument: 'voice', label: '主旋律', bars: singerBars, dynamics: 'mf' },
    { instrument: 'piano', label: '钢琴填句', bars: pianoFillBars, dynamics: 'mf' },
    { instrument: 'guitar', label: '吉他背景', bars: guitarBars, dynamics: 'mf' }
  ];
  return {
    rows: voices.map(({ label, bars }) => ({
      label,
      events: bars.flatMap((events, bar) => events.map(({ step, length }) => ({
        step: bar * 8 + step / 2, length: length / 2
      })))
    })),
    tracks: [
      ...voices.map(({ instrument, bars, dynamics }) =>
        part(instrument, bars.map(events => notePattern(events, dynamics)).join(' | '))),
      part('bass', 'C3.2 { dy mp } G2.2 | F2.2 C3.2'),
      drumPart(simpleDrums + ' | ' + simpleDrums)
    ],
    description
  };
}

const focusGridHost = document.querySelector('[data-focus-grid]');
let focusGrid;
mountVariants('ensemble-priority-mix', {
  crowded: priorityLayout(movingGuitarBars,
    '合成人声在第一小节第 3 拍仍持续发声。钢琴在这时进入，穿过换气处。吉他的连续起音碰上钢琴的 G、E 和 A。'),
  open: priorityLayout(heldGuitarBars,
    '吉他只在第一小节第 3 拍到第二小节第 2 拍改成长和弦。人声、钢琴、贝斯和鼓保持原样，换气处能听到完整的钢琴填句。')
}, 94, rows => {
  if (focusGrid) focusGrid.update(rows);
  else focusGrid = mountArrangementGrid(focusGridHost, { beats: 8, subdivisions: 2, rows, label: '主旋律、钢琴填句与吉他背景的起音时间' });
});

const firstChorusPiano = String.raw`\section ("首次副歌") (B3 G4).4 { dy mf } D5.4 B4.4 G4.4 | (C4 E4).2 r.2`;
const firstChorusGuitar = 'r.4 (G3 B3 D4).2 { d dy mp } | (G3 C4 E4).2 r.2';
const chorusBass = part('bass', 'B2.1 { dy mp } | C3.2 r.2 | B2.4 E3.2 { d } | A2.2 r.2');

function chorusLayout(piano, guitar, description) {
  return {
    tracks: [
      part('piano', String.raw`${firstChorusPiano} | \section ("副歌再现") ${piano}`),
      part('guitar', firstChorusGuitar + ' | ' + guitar),
      chorusBass
    ],
    description
  };
}

mountVariants('ensemble-chorus-recall', {
  recall: chorusLayout(
    '(B3 D4 F4 A4).4 { dy mf } D5.4 B4.4 G#4.4 | A4.2 r.2',
    'r.4 (D4 E4 G#4).2 { d dy mp } | (A3 C4 E4).2 r.2',
    '第 1–2 小节为首次副歌，第 3–4 小节为再现。两次填句都从第二拍开始，用三个四分音符下行。再现的末音 G♯ 接到下一小节的 A。'
  ),
  handoff: chorusLayout(
    '(B3 D4 F4 A4).4 { dy mp } (D4 E4 G#4 B4).2 { d } | (A3 C4 E4).2 r.2',
    'r.4 E4.8 { dy mf } G#4.8 D5.4 B4.4 | A4.2 r.2',
    '首次副歌保持原样。再现处的钢琴延长和弦，吉他先上行再回落。新句清楚地接到 A，首次副歌的钢琴填句只出现了一次。'
  )
}, 106);
