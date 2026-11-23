import { displayPitch, getTonic } from '../../shared/formats/pitch.js';

const treblePair = ['G2', 'G2'];
const impliedHigh = 'G4.4 A4.4 B4.4 C5.4';
const impliedLow = 'r.8 E3.4 F3.4 G3.4 A3.8';
const reed = [
  '\\ac r.4',
  'D4.8 D4.16 C4.16 A3.8 C4.8',
  'D4.8 D4.16 C4.16 A3.4',
  'D4.8 D4.16 C4.16 A3.8 C4.8',
  'G3.8 C4.8 A3.4'
].join(' | ');
const flute = [
  '\\ac A4.4',
  'D5{tr 76 32}.2',
  'D5{t}.4 C5.16 D5.16 F5.16 G5.16',
  'A5.2',
  'A5{t}.4 C6.16 A5.16 G5.16 F5.16'
].join(' | ');
const reedSettings = { meter: '2 4', key: 'F', tempo: 112 };

const writingUpper = 'r.4 C5.4 B4.4 A4.4 | G4.4 A4.8 B4.8 C5.4 E4.4';
const writingOctaveOnly = 'C4.2 F4.2 | E4.2 A3.2';
const writingEleventhUp = 'F5.2 Bb5.2 | A5.2 D5.2';
const writingLower = 'C4.2 { d } F4.4 | E4.2 A3.2';
const writingOctave = 'C5.2 { d } F5.4 | E5.2 A4.2';
const writingFifthDown = 'r.4 F4.4 E4.4 D4.4 | C4.4 D4.8 E4.8 F4.4 A3.4';
const writingSettings = { meter: '2 2', clefs: treblePair };
const octaveLine = octave => 'E' + octave + '.4 { txt "A" } E' + octave + '.8 F' + octave + '.8';
const octavePedal = 'C5.1 { txt "B" }';

const pitchClasses = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const mirrorUpper = [['G4', 8], ['A4', 8], ['B4', 4], ['D5', 2]];
const mirrorLower = [['E4', 4], ['G4', 4], ['B3', 2]];
const retrogradeUpper = [...mirrorUpper].reverse();
const retrogradeLower = [...mirrorLower].reverse();
const toMidi = name => getTonic(name.slice(0, -1), Number(name.at(-1))).tonicPitch;
const midiName = midi => pitchClasses[midi % 12] + (Math.floor(midi / 12) - 1);
const inversion = (line, axis) => line.map(([pitch, length]) => [midiName(2 * toMidi(axis) - toMidi(pitch)), length]);
const transpose = (line, semitones) => line.map(([pitch, length]) => [midiName(toMidi(pitch) + semitones), length]);
const measure = line => line.map(([pitch, length]) => pitch + '.' + length).join(' ');

const pentatonic = ['C', 'D', 'E', 'G', 'A'];
const pentatonicNames = ['宫', '商', '角', '徵', '羽'];
const melody = [[0, 8], [1, 8], [2, 4], [3, 4], [4, 4]];
function pentatonicPitch(step) {
  const octave = 5 + Math.floor(step / pentatonic.length);
  const degree = (step % pentatonic.length + pentatonic.length) % pentatonic.length;
  return pentatonic[degree] + octave;
}

function pentatonicInversion(axis) {
  const axisIndex = axis < 4 ? axis : -1;
  const source = melody.map(([step, length]) => [pentatonicPitch(step), length]);
  const reflected = melody.map(([step, length]) => [pentatonicPitch(2 * axisIndex - step), length]);
  const pairs = source.map(([name], index) => displayPitch(name) + '→' + displayPitch(reflected[index][0]));
  const axisPitch = pentatonicPitch(axisIndex);
  const axisName = pentatonicNames[axis];
  return {
    voices: [measure(source) + ' | ' + measure(reflected)],
    axis: { pitch: axisPitch, name: axisName, source, reflected },
    cue: '轴音 ' + axisPitch + '（' + axisName + '）。' + pairs.join('，') + '。'
  };
}

export const chaptersTwoToFourScores = {
  'melody-shapes': {
    thematic: {
      voices: ['G4.8 A4.8 B4.4 G4.2 | E4.2 D4.4 C4.4'],
      cue: '两个短音接一个较长的音，题头有清楚的节奏轮廓。这个短动机可以截出来发展。'
    },
    general: {
      voices: ['C4.4 D4.4 E4.4 G4.4 | A4.4 G4.4 E4.4 C4.4'],
      cue: '旋律用近似歌唱的速度展开，经过一个清楚的高点，再回到主音。'
    },
    supporting: {
      voices: ['C4.8 E4.8 G4.8 E4.8 C4.8 E4.8 G4.8 E4.8 | B3.8 D4.8 G4.8 D4.8 C4.8 E4.8 G4.8 E4.8'],
      cue: '两个小节维持均匀的八分律动，重复骨架给别的旋律留出主要位置。'
    }
  },
  'implied-lines': {
    combined: {
      voices: ['G4.8 E3.8 A4.8 F3.8 B4.8 G3.8 C5.8 A3.8'],
      cue: '同一条谱线交替落在两个音区，形成两条分别上行的线。'
    },
    separated: {
      voices: [impliedHigh, impliedLow],
      cue: '拆开后，高线是 G–A–B–C，低线是 E–F–G–A。起音时刻照旧，各音延长以显示线条。'
    },
    upper: {
      voices: [impliedHigh],
      cue: '高层落在每拍开头，由 G 上行至 C。'
    },
    lower: {
      voices: [impliedLow], clefs: ['F4'],
      cue: '低层在每拍后半拍起音，由 E 上行至 A。'
    },
    imitative: {
      voices: ['G4.4 A4.4 B4.4 C5.4', 'r.8 C4.4 D4.4 E4.4 F4.8'], clefs: treblePair,
      cue: '低层晚半拍进入，低五度应答高层。G–A–B–C 和 C–D–E–F 的音程顺序都是全、全、半。'
    }
  },
  'melody-combinations': {
    supporting: {
      voices: ['G4.8 A4.8 B4.4 G4.2 | E4.2 D4.4 C4.4',
        'C3.8 E3.8 G3.8 E3.8 C3.8 E3.8 G3.8 E3.8 | C3.8 E3.8 G3.8 E3.8 B2.8 G3.8 C3.8 E3.8'],
      cue: '上方题头有独立的轮廓，下方稳定的八分律动提供衬托。'
    },
    staggered: {
      voices: ['G4.8 A4.8 B4.4 G4.2 | E4.2 D4.4 C4.4',
        'C3.2 E3.8 F3.8 G3.4 | G3.2 B2.4 C3.4'],
      cue: '下方也有一个短短长的题头。它在上方拉长 G 时出现，两条主题性线条各有空间。'
    }
  },
  'reed-writing': {
    both: { ...reedSettings, voices: [flute, reed], cue: '下方舞曲的短音不断推进，上方长音穿过它们，形成不同的句幅。' },
    given: { ...reedSettings, voices: [reed], clefs: ['F4'], cue: '芦笙舞曲在低声部，是 D 羽调式的指定旋律。' },
    counter: { ...reedSettings, voices: [flute], cue: '上方从 A 到 D 弱起，长音跨过小节线。' }
  },
  'octave-fourth': {
    original: {
      voices: [octaveLine(5) + ' G5.2 { txt "五度" }', octavePedal], clefs: treblePair,
      cue: 'A 在上，B 在下。第三拍上的 C–G 五度可以稳定地持续到结尾。'
    },
    exchange: {
      voices: [octavePedal, octaveLine(4) + ' G4.2 { txt "四度" }'], clefs: treblePair,
      dissonances: [{ staff: 1, bar: 0, beat: 3 }],
      cue: 'A 降八度来到 B 下方。第三拍在低音 G 上形成持续的四度，到了结尾也没有解决。'
    },
    revised: {
      voices: [octaveLine(5) + ' E5.2 { txt "三度" }', octavePedal], clefs: treblePair,
      cue: '末音改为 E。弱位的 F 返回 E，第三拍以 C–E 三度收稳。'
    },
    revisedExchange: {
      voices: [octavePedal, octaveLine(4) + ' E4.2 { txt "六度" }'], clefs: treblePair,
      cue: '同一条改写后的 A 整体降八度。结尾变成 E–C 六度，换位后也能收稳。'
    }
  },
  'twelfth-sixth': {
    original: {
      voices: ['G4.4 G4.8 A4.8 { txt "六度" } G4.4 E4.4', 'C4.1'], clefs: treblePair,
      cue: 'A 是 G 的上辅助音。原位的 C–A 是六度，前后是五度。'
    },
    exchange: {
      voices: ['G4.1', 'G3.4 G3.8 A3.8 { txt "七度" } G3.4 E3.4'],
      dissonances: [{ staff: 1, bar: 0, beat: 2 }],
      cue: 'A 仍在弱位，六度翻成七度后可以回到八度。结尾的 E–G 是十度。'
    }
  },
  'double-writing': {
    octaveOnly: {
      ...writingSettings, voices: [writingUpper, writingOctaveOnly],
      cue: '只按八度换位设计。原位用三度、六度支撑，四度和五度落在乐句过渡中。'
    },
    octaveToF: {
      ...writingSettings, voices: [writingEleventhUp, writingFifthDown], key: 'F',
      cue: '指定旋律下移五度，对位旋律上移十一度。相对移动十五度，仍属八度复对位。'
    },
    original: {
      ...writingSettings, voices: [writingUpper, writingLower],
      cue: 'C 大调。指定旋律在上，从四分休止后的 C 起句。'
    },
    octave: {
      ...writingSettings, voices: [writingOctave, writingUpper],
      cue: '对位旋律升八度放到上方，指定旋律保留原位。'
    },
    twelfth: {
      ...writingSettings, voices: [writingOctave, writingFifthDown], key: 'F',
      cue: '指定旋律下移五度，对位旋律上移八度，合成十二度转位。新调为 F 大调。'
    }
  },
  'pentatonic-axes': Object.fromEntries(
    pentatonicNames.map((_, axis) => [String(axis), pentatonicInversion(axis)])
  ),
  'inversion-voices': {
    original: {
      voices: [measure(mirrorUpper), measure(mirrorLower)], clefs: treblePair,
      cue: '上方开头是 G，下方是 E，两部相隔小三度。'
    },
    upper: {
      voices: [measure(inversion(mirrorUpper, 'A4')), measure(mirrorLower)], clefs: treblePair,
      cue: '只翻上声部。开头 G 变成 B，下方的 E 不动，小三度变成纯五度。'
    },
    both: {
      voices: [measure(inversion(mirrorLower, 'A4')), measure(inversion(mirrorUpper, 'A4'))], clefs: treblePair,
      cue: '两部都绕 A4 翻转，原来较低的 E 变成上方的 D，原来较高的 G 变成下方的 B。小三度保留。'
    }
  },
  'retrograde-voices': {
    original: {
      voices: [measure(mirrorUpper), measure(mirrorLower)], clefs: treblePair,
      cue: '原形的首拍是 E 与 G，尾部同时响着 B 与 D。'
    },
    upper: {
      voices: [measure(retrogradeUpper), measure(mirrorLower)], clefs: treblePair,
      cue: '只逆行上方，原来尾部的 D 提前遇到开头的 E，形成新的音程。'
    },
    both: {
      voices: [measure(retrogradeUpper), measure(retrogradeLower)], clefs: treblePair,
      cue: '两条线一起逆行。原来尾部同时响的 B 与 D 现在一起出现在开头。'
    },
    exchanged: {
      voices: [measure(transpose(retrogradeLower, 12)), measure(transpose(retrogradeUpper, -12))],
      cue: '逆行后再交换高低。较多短音的一线到了下方，开头的 B–D 十度也变成了 D–B 六度。'
    }
  }
};
