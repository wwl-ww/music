import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const meter = String.raw`\ts (4 4)`;
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
  'E5.4 D5.4 C5.2'
]);

const layerTable = document.querySelector('#pop-arranging-build tbody');
function showLayerDurations({ tracks }) {
  tracks.slice(1).forEach((part, row) => {
    part.staves[0].bars.forEach((bar, column) => {
      const [voice] = bar.voices;
      const played = voice.beats.findIndex(beat => beat.isRest);
      const ticks = voice.beats.slice(0, played === -1 ? voice.beats.length : played)
        .reduce((duration, beat) => duration + beat.playbackDuration, 0);
      layerTable.rows[row].cells[column + 1].textContent =
        ticks === 0 ? '休止' : ticks === 3840 ? '全小节' : `前 ${ticks / 960} 拍`;
    });
  });
}

mount('pop-arranging-build', [
  {
    label: '全段力度相近',
    description: '键盘、贝斯与鼓组从第 1 小节起沿用同一密度，一直进入副歌。',
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
    description: '第 2 小节缩减配器，第 3 小节后两拍减为主旋律和它的句尾休止，第 4 小节副歌恢复乐队合奏。',
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
    description: '和弦成员相同。下方的 C 降至 C3，E 升到 E5，中间的空隙拉开。',
    notes: voicing('(C3 G4 B4 E5)')
  },
  {
    label: '省略五音',
    description: '保留贝斯的根音 C2 和键盘的 E4、B4，省略重复根音与五音。',
    notes: voicing('(E4 B4)')
  }
], { tempo: 76 });

const ending = '(C3 E3 G3).4 { dy mp } r.4 (C3 E3 G3).4 r.4';
const entry = 'E5.4 D5.4 C5.2';

mount('pop-arranging-stop', [
  {
    label: '连续伴奏',
    description: '第一小节主旋律在第 3 拍休止，键盘、贝斯与鼓组继续演奏。',
    notes: {
      scoreTracks: [
        melody(['A4.4 B4.4 r.2', entry]),
        keyboard(['(G2 F3 B3).2 { dy mp } (G2 F3 B3).2', ending]),
        bass(['G2.4 D3.4 G2.4 D3.4', 'C2.2 C3.4 C2.4']),
        drums([pulse, pulse])
      ]
    }
  },
  {
    label: '整组停拍',
    description: '第一小节后两拍各声部同时休止，第二小节第 1 拍共同进入。',
    notes: {
      scoreTracks: [
        melody(['A4.4 B4.4 r.2', entry]),
        keyboard(['(G2 F3 B3).2 { dy mp } r.2', ending]),
        bass(['G2.4 D3.4 r.2', 'C2.2 C3.4 C2.4']),
        drums([transition, pulse])
      ]
    }
  }
]);
