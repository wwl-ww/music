import ensembleSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScore } from '../../shared/formats/score.js';

const instruments = {
  piano: { name: '钢琴', program: 0, clef: 'G2' },
  guitar: { name: '吉他', program: 26, clef: 'G2' },
  bass: { name: '贝斯', program: 33, clef: 'F4' }
};

function part(instrument, notes) {
  const { name, program, clef } = instruments[instrument];
  return { name, program, phrase: String.raw`\clef ${clef} \ks C \ts (4 4) ${notes}` };
}

function drumPart(notes) {
  return {
    name: '鼓组',
    program: 'percussion',
    phrase: String.raw`\clef neutral \articulation (Kick 36) \articulation (Snare 38)
      \articulation (Hat 42) \articulation (Crash 49) \ts (4 4) ${notes}`
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
    tracks: [part('piano', lead + ' | ' + returningLead), part('guitar', guitar + ' | ' + returningGuitar)],
    description
  };
}

mountVariants('ensemble-motions', {
  unison: motionLayout(lead, returningLead, '钢琴和吉他在同一实际音高叠合，旋律的音区保持不变。'),
  octave: motionLayout('E3.4 G3.4 A3.4 C4.4', 'C4.4 A3.4 G3.4 E3.4', '吉他把钢琴的曲调低八度复制。两条线同起同落，覆盖的音区变宽。'),
  parallel: motionLayout('C4.4 E4.4 F4.4 A4.4', 'A4.4 F4.4 E4.4 C4.4', '吉他在钢琴下方以三度随行。两条线同向转折，音型轮廓相同，和声色彩发生变化。'),
  contrary: motionLayout('C4.4 B3.4 A3.4 F3.4', 'F3.4 A3.4 B3.4 C4.4', '钢琴向上时吉他向下，回程互换方向。两条线先拉开，再回到近处。'),
  oblique: motionLayout('C4.1', 'C4.1', '吉他每小节维持 C4，钢琴在上方往返。纵向音程随钢琴的移动而变化。')
}, 96);

const rhythmLabels = ['钢琴', '贝斯', '鼓组'];
const durationToken = { 1: 16, 2: 8, 4: 4, 8: 2, 16: 1 };
function notePattern(steps, notes, length) {
  let nextStep = 0;
  const tokens = [];
  function appendRestUntil(end) {
    for (const unit of [16, 8, 4, 2, 1]) {
      if (nextStep + unit > end) continue;
      tokens.push('r.' + durationToken[unit]);
      nextStep += unit;
    }
  }
  steps.forEach((step, index) => {
    appendRestUntil(step);
    const dynamics = index === steps.length - 1 ? ' { dy f }' : index === 0 ? ' { dy mf }' : '';
    tokens.push(notes[index] + '.' + durationToken[length] + dynamics);
    nextStep = step + length;
  });
  appendRestUntil(16);
  return tokens.join(' ');
}

function rhythmLayout(patterns, description) {
  const [piano, bass, drums] = patterns;
  const lengths = [2, 2, 1];
  const rows = patterns.map((steps, index) => ({
    label: rhythmLabels[index],
    events: steps.map((step, hit) => ({
      step,
      ...(index < 2 && { length: lengths[index] }),
      accent: hit === steps.length - 1
    }))
  }));
  return {
    description,
    rows,
    tracks: [
      part('piano', notePattern(piano, ['(E4 G4 C5)', '(G4 B4 D5)', '(E4 G4 C5)'], lengths[0])),
      part('bass', notePattern(bass, ['C3', 'G2', 'C3'], lengths[1])),
      drumPart(notePattern(drums, ['Kick', 'Snare', '(Kick Crash)'], lengths[2]))
    ]
  };
}

const gridHost = document.querySelector('[data-ensemble-grid]');
let rhythmGrid;
mountVariants('ensemble-aligned-rhythm', {
  aligned: rhythmLayout([[0, 6, 12], [0, 6, 12], [0, 6, 12]],
    '三个分部在第 1 拍、第 2 拍后半和第 4 拍一起起音。最后一下集中成一个重音。'),
  offset: rhythmLayout([[0, 6, 12], [2, 8, 14], [3, 10, 15]],
    '各分部自己的顺序、奏法和重音不变，贝斯与鼓稍后加入。句尾由几个先后出现的音头组成。')
}, 94, rows => {
  if (rhythmGrid) rhythmGrid.update(rows);
  else rhythmGrid = mountArrangementGrid(gridHost, { beats: 4, subdivisions: 4, rows, label: '钢琴、贝斯与鼓组的起音网格' });
});

const activePiano = 'E4.8 G4.8 A4.8 G4.8 E4.8 G4.8 C5.4 | D5.8 B4.8 G4.8 A4.8 G4.8 D4.8 B4.4';
const activeGuitar = 'G4.8 E4.8 C4.8 D4.8 E4.8 G4.8 E4.4 | G4.8 B4.8 A4.8 G4.8 B4.8 D5.8 G4.4';
const activeBass = 'C3.8 C3.8 E3.8 E3.8 G2.8 A2.8 B2.4 | G2.8 A2.8 B2.8 D3.8 G2.8 A2.8 G2.4';
const supportedPiano = '(C4 E4 G4).1 | (B3 D4 G4).1';
const supportedGuitar = 'r.4 (C4 E4).4 r.4 (C4 E4).4 | r.4 (B3 D4).4 r.4 (B3 D4).4';
const supportedBass = 'C3.2 G2.2 | G2.2 D3.2';
const simpleDrums = '(Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8 (Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8';
const backingDrums = drumPart(simpleDrums + ' | ' + simpleDrums);

function priorityLayout(piano, guitar, bass, description) {
  return {
    tracks: [part('piano', piano), part('guitar', guitar), part('bass', bass), backingDrums],
    description
  };
}

mountVariants('ensemble-priority-mix', {
  crowded: priorityLayout(activePiano, activeGuitar, activeBass, '三条有音高的线都有连续的起音和转折，同时占据前景。鼓点与后面三个版本相同。'),
  bass: priorityLayout(supportedPiano, supportedGuitar, activeBass, '贝斯保留经过音和连接句。钢琴改成长和弦，吉他只在第 2、4 拍给出短和弦。'),
  guitar: priorityLayout(supportedPiano, activeGuitar, supportedBass, '吉他的动机保持原样。钢琴支撑和声；贝斯减为根音与五音。'),
  piano: priorityLayout(activePiano, 'r.8 (C4 E4).8 r.2 r.4 | r.8 (B3 D4).8 r.2 r.4', supportedBass, '钢琴保留整条动机。吉他仅用很短的和弦点出拍内位置，贝斯维持低端。')
}, 102);

const finalPiano = 'E4.4 G4.8 A4.8 G4.4 E4.4 | A4.4 G4.4 E4.2 | (A3 C4 F4).2 r.2 | (G3 B3 D4).2 r.2 | A4.4 C5.4 A4.4 G4.4 | G4.4 F4.4 E4.4 D4.4 | G4.8 r.8 E4.8 r.8 D4.4 r.4 | C4.2 r.2';
const finalGuitar = 'r.4 (C4 E4).4 r.4 (C4 E4).4 | r.4 (A3 C4).4 r.4 (A3 C4).4 | F4.4 A4.8 C5.8 A4.4 F4.4 | D4.4 G4.4 B4.4 A4.4 | F4.4 A4.4 F4.4 E4.4 | E4.4 D4.4 C4.4 B3.4 | G3.8 r.8 E3.8 r.8 D3.4 r.4 | C3.2 r.2';
const finalBass = 'C3.2 G2.2 | A2.2 E3.2 | F2.2 C3.2 | G2.2 D3.2 | F2.2 C3.2 | G2.4 A2.4 B2.4 G2.4 | G2.8 r.8 E2.8 r.8 D2.4 r.4 | C2.2 r.2';
const finalDrums = Array(6).fill(simpleDrums).concat([
  '(Kick Hat).8 r.8 Snare.8 r.8 (Kick Crash).4 r.4', '(Kick Crash).4 r.4 r.2'
]).join(' | ');

mountFormAnalysis(document.getElementById('ensemble-phrase-map'), {
  score: {
    notes: { scoreTracks: [part('piano', finalPiano), part('guitar', finalGuitar), part('bass', finalBass), drumPart(finalDrums)] },
    tempo: 104,
    soundFontUrl: ensembleSoundFont
  },
  sections: [
    { id: 'piano', label: '钢琴主线', first: 1, last: 2, voice: '钢琴的短句位于前景，吉他留出间隔，只补短和弦' },
    { id: 'guitar', label: '吉他接句', first: 3, last: 4, voice: '吉他接过旋律，钢琴改为较长的和弦，鼓与贝斯维持节拍' },
    { id: 'harmony', label: '合音与反向低音', first: 5, last: 6, voice: '吉他和钢琴同向运动。第六小节开头，贝斯上行时两条上方声部下行' },
    { id: 'unison', label: '八度齐奏', first: 7, last: 8, voice: '三件乐器用三个八度奏同一短句，鼓与它们在句尾对齐起音' }
  ]
});
