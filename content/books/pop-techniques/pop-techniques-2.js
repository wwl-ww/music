import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { popChorusHook } from './pop-techniques-material.js';

const meter = String.raw`\ts (4 4)`;
const ticksPerBeat = 960;
const keyboard = (bars) => track('键盘', 4, bars, 'F4');
const bass = (bars) => track('贝斯', 33, bars, 'F4');
const melody = (bars) => track('主旋律', 73, bars);

function track(name, program, bars, clef = 'G2') {
  return { name, program, phrase: String.raw`\clef ${clef} ${meter} ${bars.join(' | ')}` };
}

const drumSetup = String.raw`\articulation (Kick 36) \articulation (Snare 38) \articulation (Hat 42)`;
function drums([first, ...remaining]) {
  return {
    ...track('鼓组', 'percussion', [`${drumSetup} ${first}`, ...remaining], 'neutral'),
    staffLines: 1
  };
}

function mount(id, steps, score = {}) {
  mountScoreWritingSteps(document.getElementById(id), {
    steps,
    score: { tempo: 100, soundFontUrl: bandSoundFont, ...score }
  });
}

const pulse = '(Kick Hat).4 (Snare Hat).4 (Kick Hat).4 (Snare Hat).4';
const open = '(Kick Hat).4 Hat.8 Hat.8 (Snare Hat).4 (Kick Hat).8 Hat.8';
const transition = '(Kick Hat).4 (Snare Hat).4 r.2';
const silence = 'r.1';
const chordPulse = chord => `${chord}.2 { dy mp } ${chord}.4 r.4`;
const chordStop = chord => `${chord}.2 { dy mp } r.2`;
const chords = ['(C3 E3 G3)', '(A2 C3 E3)', '(G2 B2 D3)', '(C3 E3 G3)'];
const bassNotes = ['C2', 'A2', 'G2', 'C2'];
const formLead = melody([
  'E4.4 G4.4 C5.4 r.4',
  'E4.4 G4.4 A4.4 r.4',
  'D4.4 G4.4 B4.4 r.4',
  popChorusHook
]);

const layerTable = document.querySelector('#pop-arranging-build tbody');

function openingDuration(part, index) {
  const { beats } = part.staves[0].bars[index].voices[0];
  let duration = 0;
  for (const beat of beats) {
    if (beat.isRest) break;
    duration += beat.playbackDuration;
  }
  const quarters = duration / ticksPerBeat;
  if (!quarters) return '休止';
  return quarters === 4 ? '全小节' : `前 ${quarters} 拍`;
}

function showLayerDurations({ tracks: [, keys, low, kit] }) {
  Array.from(layerTable.rows).forEach((row, index) => {
    const bassDuration = openingDuration(low, index);
    const drumDuration = openingDuration(kit, index);
    row.cells[1].textContent = openingDuration(keys, index);
    row.cells[2].textContent = bassDuration === drumDuration
      ? bassDuration : `贝斯${bassDuration}，鼓组${drumDuration}`;
  });
}

mount('pop-arranging-build', [
  {
    label: '伴奏密度一致',
    description: '伴奏从前奏到副歌沿用同一密度。「留一盏灯」第一次出现时，伴奏也保留了上一小节的律动。',
    notes: {
      scoreTracks: [
        formLead,
        keyboard(chords.map(chordPulse)),
        bass(bassNotes.map(note => `${note}.2 ${note}.2`)),
        drums([pulse, pulse, pulse, pulse])
      ]
    }
  },
  {
    label: '先收再放',
    description: '主歌 A 只留键盘。主歌 B 的伴奏在前两拍后收住，等副歌唱到「留」字，键盘、贝斯和鼓组一起回来。',
    notes: {
      scoreTracks: [
        formLead,
        keyboard([chordPulse(chords[0]), `${chords[1]}.1 { dy p }`, chordStop(chords[2]), chordPulse(chords[3])]),
        bass([`${bassNotes[0]}.1`, silence, `${bassNotes[2]}.2 r.2`, `${bassNotes[3]}.2 C3.4 C2.4`]),
        drums([open, silence, transition, pulse])
      ]
    }
  }
], { notationVisible: false, onScoreLoaded: showLayerDurations });

function voicing(chord) {
  return { scoreTracks: [track('上方和弦', 0, [`${chord}.1`]), bass(['C2.1'])] };
}

mount('pop-arranging-voicing', [
  {
    label: '密集排列',
    description: '贝斯持续 C2。键盘的 C4、E4、G4、B4 集中在一个八度内。',
    notes: voicing('(C4 E4 G4 B4)')
  },
  {
    label: '开放排列',
    description: '贝斯与最高音 B4 保持，键盘的 C、G 各降一个八度，拉开上下声部的距离。',
    notes: voicing('(C3 G3 E4 B4)')
  },
  {
    label: '省略五音',
    description: '保留贝斯的根音 C2 和键盘的 E4、B4，省略重复根音与五音。',
    notes: voicing('(E4 B4)')
  }
], { tempo: 76 });

const ending = '(C3 E3 G3).4 { dy mp } r.4 (C3 E3 G3).4 r.4';

function entrancePreview(keyboardBar, bassBar, drumBar) {
  return {
    scoreTracks: [
      melody(['A4.4 B4.4 r.2', popChorusHook]),
      keyboard([keyboardBar, ending]),
      { ...bass([bassBar, 'C2.2 C3.4 C2.4']), playbackOnly: true },
      { ...drums([drumBar, pulse]), playbackOnly: true }
    ]
  };
}

mount('pop-arranging-stop', [
  {
    label: '连续伴奏',
    description: '主旋律在第一小节后两拍休止，伴奏照常演奏，第二小节的「留一盏灯」接在原有节拍上。',
    notes: entrancePreview('(G2 F3 B3).2 { dy mp } (G2 F3 B3).2', 'G2.4 D3.4 G2.4 D3.4', pulse)
  },
  {
    label: '整组停拍',
    description: '第一小节后两拍各声部同时休止。第二小节的「留」字与伴奏一起进入。',
    notes: entrancePreview('(G2 F3 B3).2 { dy mp } r.2', 'G2.4 D3.4 r.2', transition)
  }
]);
