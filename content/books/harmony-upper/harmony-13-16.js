import { fourPartScore, labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';
import { mountScore } from '../../shared/formats/score.js';
import { displayPitch, getTonic } from '../../shared/formats/pitch.js';

function example(rows, description, key = 'Aminor') {
  return { notes: labelledChordScore(rows.map(row => [row]), key), description };
}

const minorTonic = ['A2 E3 C4 A4', 'i'];
const minorDominant = ['E3 G#3 B3 E4', 'V'];
const minorSubdominantSixth = ['F3 A3 D4 A4', 'iv6'];
const minorDominantSeventh = ['E3 D4 G#4 B4', 'V7'];
const sharpMediantSixth = ['E3 C4 E4 G#4', 'III+6'];
const minorSecond = {
  dominant: example([['D3 F3 B3 D4','ii°6'], ['E3 E3 G#3 B3','V'], ['A2 E3 A3 C4','i']], 'D 在低音承担下属功能，低音到 E，进入含导音的属和弦。'),
  cadential: example([['D3 B3 D4 F4','ii°6'], ['E3 A3 C4 E4','K6/4'], minorDominant, ['A2 A3 C4 E4','i']], 'ii°₆ 重复三音 D，进入属低音上的终止四六。'),
  plagal: example([['D3 F3 B3 D4','ii°6'], ['A2 E3 C4 C4','i']], '下属低音 D 直接到主音 A。'),
  passing: example([['C3 E3 A3 E4','i6'], ['B2 F3 D4 D4','ii°'], ['A2 A3 C4 E4','i']], '低音 C–B–A，原位 ii° 填在主和弦两种位置之间。')
};
const minorThird = {
  dominant: example([sharpMediantSixth, ['E3 B3 D4 G#4{t}','V7'], ['A2 A3 C4 A4','i']], '属低音 E 不变，G♯ 保留，再由属七解决。'),
  direct: example([sharpMediantSixth, ['A2 C4{t} E4{t} A4','i']], 'C、E 可保留，增五音 G♯ 上行到 A。'),
  passing: example([['D3 B3 F4 D5','ii°6'], sharpMediantSixth, minorSubdominantSixth], '低音 D–E–F。中间的增中音六和弦使连接继续级进。'),
  neighbor: example([['E3 G#3 E4 B4','V'], ['C3 G#3{t} E4{t} C5','III+'], ['E3 G#3{t} E4{t} B4','V']], 'E 和 G♯ 在上方保持，高音 B–C–B 往返。')
};
const minorSixth = {
  deceptive: example([minorDominantSeventh, ['F3 C4 A4 A4','VI']], '低音 E 上行到 F，导音 G♯ 到 A，VI 重复三音 A。'),
  accented: example([['A3 F4 A4 C5','VI6'], ['A3{t} E4 A4{t} C5{t}','i']], '主音 A 不变，F 下行到 E 后得到主和弦。'),
  neighbor: example([minorTonic, ['A2{t} F3 C4{t} A4{t}','VI6'], ['A2{t} E3 C4{t} A4{t}','i']], '三声部保持，F 从 E 上方绕行后回到 E。')
};
const minorLeading = {
  firstInversion: example([['C3 A3 E4 A4','i6'], ['B2 B3 D4 G#4','vii°6'], ['A2 C4 E4 A4','i']], '导三重复三音 B，高音 G♯ 上行到 A。'),
  dominantPart: example([['G#2 B3 D4 B4','vii°'], ['E2 B3{t} D4{t} G#4','V7'], ['A2 A3 C4 A4','i']], '保留 B、D，把 G♯ 交给高音并加入属低音 E。')
};
const naturalMinor = {
  soprano: example([['C3 G3 Eb4 C5','i'], ['D3 F3 D4 Bb4','VII6'], ['C3 Eb3 Eb4 Ab4','VI6'], ['G2 D3 B3 G4','V']], '高音 C–B♭–A♭–G，最后的 A♭–G 是半音。', 'Cminor'),
  bass: example([['C3 Eb3 G3 Eb4','i'], ['Bb2 D3 Bb3 F4','VII'], ['Ab2 C3 C4 F4','iv6'], ['G2 D3 B3 G4','V']], '低音 C–B♭–A♭–G，A♭ 在 iv₆ 的低音。', 'Cminor')
};

const iiMajor = ['D3 F4 A4 C5','ii7'];
const iiMinor = ['B2 D4 F4 A4','iiø7'];
const iiiMinor = ['E3 G#3 C4 B4','III+6/5'];
const viMajor = ['A2 C4 E4 G4','vi7'];
const majorDominant = ['G2 D4 G4 B4','V'];
const supertonicSeventh = {
  major: example([['F3 A3 C4 D4','ii6/5'], ['G3 G3 B3 D4{t}','V']], '七音 C 下行到 B，D 保留。', 'C'),
  minor: example([['D3 F4 A4 B4','iiø6/5'], ['E3 E4 G#4 B4{t}','V']], '七音 A 下行到导音 G♯，B 保留。'),
  prepared: example([['A2 E4 A4 C5','vi'], ['D3 F4 A4{t} C5{t}','ii7'], majorDominant], '高音 C 从 vi 延续到 ii₇，再下行至 B。', 'C'),
  majorQuality: example([iiMajor, ['D3 F#4 A4 C5','D7']], '两者根音到七音都是小七度。F 升为 F♯ 后，结构变成属七。', 'C'),
  minorQuality: example([iiMinor, ['B2 D#4 F#4 A4','B7']], 'D 和 F 都升高后，结构从半减七变为属七。')
};
const mediantSeventh = {
  major: example([['G2 B3 E4 D5','iii6/5'], ['C3 C4 E4{t} C5','I']], 'G 在低音，高音的七音 D 下行到 C。', 'C'),
  minor: example([iiiMinor, ['A2 A3 C4{t} A4','i']], '增五音 G♯ 上行，七音 B 下行，两线在 A 收束。'),
  neighbor: example([['C3 E4 A4 A4','i6'], ['C3{t} E4{t} G#4 B4','III+7'], ['C3{t} E4{t} A4 A4','i6']], 'G♯ 与 B 分别从同音 A 向下、向上绕行后返回。')
};
const submediantSeventh = {
  supertonic: example([viMajor, ['D3 A3 D4 F4','ii']], '七音 G 下行到 ii 的三音 F。', 'C'),
  dominant: example([['A2 E3 C4 G4','vi7'], ['G2 B3 D4 G4{t}','V']], '七音 G 留在高音，成为属和弦根音。', 'C'),
  minor: example([['F3 A3 C4 E4','VI7'], ['B2 F3 B3 D4','ii°']], '低音 F3 下行到 B2，七音 E 下行到 D。')
};
const otherSevenths = {
  tonicUp: example([['C3 E4 G4 B4','I7'], ['F2 A3 F4 C5','IV']], '主七的七音 B 同时是导音，可上行到 C。', 'C'),
  tonicDown: example([['C3 E4 G4 B4','I7'], ['F2 C4 F4 A4','IV']], '换用另一个高音位置，B 可以下行到 A。', 'C'),
  minorTonic: example([['A2 E3 C4 G#4','i7'], ['D3 F3 C4{t} A4','iv7']], 'G♯ 上行到 A。这个声部避免了向下到 F 的增二度。'),
  doubledLeading: example([['F2 A3 C4 E4','IV7'], ['G2 B3 B3 D4','V']], 'V 采用重复三音的例外，避免平行五度。', 'C'),
  fourths: example([['F2 C4 E4 A4','IV7'], ['G2 B3 D4 G4','V']], 'E–A 同向下行至 D–G，上方是一对平行四度。', 'C'),
  minorFourths: example([['D3 A3 C4 F4','iv7'], ['E3 G#3 B3 E4','V']], 'C–F 下行至 B–E，改用平行四度。')
};

const letters = 'CDEFGAB';
const majorDegrees = ['I','ii','iii','IV','V','vi','vii°'];

function shiftPitch(note, steps) {
  const index = Number(note.at(-1)) * 7 + letters.indexOf(note[0]) + steps;
  return letters[(index % 7 + 7) % 7] + Math.floor(index / 7);
}

function shiftedPattern(motif, step, count) {
  return Array.from({ length: count }, (_, index) => motif.map(([notes, degree, suffix = '']) => {
    const shift = index * step;
    const root = majorDegrees[(degree + shift % 7 + 7) % 7];
    const label = root === 'vii°' && suffix === '7' ? 'viiø7' : root + suffix;
    return [notes.split(' ').map(note => shiftPitch(note, shift)).join(' '), label];
  }));
}

const triadMotif = [['F3 A3 F4 C5',3], ['E3 C4 G4 C5',0,'6']];
const tonicMotif = [['G2 G3 D4 B4',4], ['C3 G3 E4 C5',0]];
const seventhMotif = [['G2 F3 B3 D4',4,'7'], ['C3 E3 C4 C4',0]];
const metricPattern = shiftedPattern(triadMotif, 1, 2);
const strongMetric = metricPattern.map((measure) => measure.map(([notes,label],i) => [notes,label,i ? '4':'2']));
const weakMetric = [
  [[...metricPattern[0][0], '4']],
  [[...metricPattern[0][1], '2'], [...metricPattern[1][0], '4']],
  [[...metricPattern[1][1], '2']]
];
const sequenceRhythm = {
  strong: { notes: labelledChordScore(strongMetric, 'C', '3 4'), description: '动机第一个和弦落在强拍，占两拍。' },
  weak: { notes: labelledChordScore(weakMetric, 'C', '3 4', { pickup: true }), description: '同样两个和弦以短弱起开始，第二个和弦落在下一小节强拍。' }
};
const triadSequences = {
  fifths: { notes: labelledChordScore(shiftedPattern(tonicMotif, -1, 4), 'C', '4 4'), description: '各组保持四、五度的根音关系，动机的起点每次下移二度。' },
  sixths: { notes: labelledChordScore([
    [['E2 G3 G3 C4','I6'], ['F2 F3 A3 D4','ii6']],
    [['G2 E3 B3 E4','iii6'], ['A2 A3 C4 F4','IV6']],
    [['B2 G3 D4 G4','V6'], ['C3 C4 E4 A4','vi6']],
    [['D3 B3 F4 B4','vii°6'], ['E3 G3 G4 C5','I6']]
  ], 'C', '4 4'), description: '低音、中音和高音平行上行，次中音轮流重复五音、三音或根音。' }
};
const seventhSequences = {
  sevenths: example([
    ['E3 E4 G4 D5','iii7'], ['A2 E4{t} G4{t} C5','vi7'],
    ['D3 D4 F4 C5{t}','ii7'], ['G2 D4{t} F4{t} B4','V7'],
    ['C3 C4 E4 B4{t}','I7'], ['F2 C4{t} E4{t} A4','IV7'],
    ['B2 B3 D4 A4{t}','viiø7'], ['E2 B3{t} D4{t} G4','iii7'], ['A2 G3 C4 E4','vi7']
  ], '七音依次进入相邻的下方音。例中部分七和弦省略五音，延音线标明保持的声部。', 'C'),
  mixed: { notes: labelledChordScore(shiftedPattern(seventhMotif, 1, 3), 'C', '4 4'), description: 'V₇–I 的解决关系随整个动机上移，成为 vi₇–ii、viiø₇–iii。' }
};

const pedalMelody = 'C5.4 { txt "I" } D5.8 { txt "+" } E5.8 | D5.4 { txt "V2" } C5.8 { txt "+" } B4.8 | C5.2 { txt "I6" }';
const waltzMelody = 'E5.4 { txt "I" } D5.8 { txt "+" } E5.8 G5.4 | F5.2 { txt "V7" } D5.4 | E5.4 { txt "I" } F5.4 { txt "+" } G5.4 | A5.2 { txt "IV" } F5.4 | D5.4 { txt "V7" } F5.4 B4.4 | C5.2 { d txt "I" }';
const scaleMelody = 'E5.2 { txt "I" } G5.2 | E5.2 F5.2 { txt "V7" } | E5.1 { txt "I" } | C5.2 { txt "ii7" } B4.2 { txt "V7" } | C5.1 { txt "I" }';
const tonicScaleBass = 'C3.8 D3.8 { txt "+" } E3.8 F3.8 { txt "+" } G3.8 F3.8 { txt "+" } E3.8 D3.8 { txt "+" }';
const dominantScaleBass = 'G2.8 A2.8 { txt "+" } B2.8 D3.8';
const analysis = {
  pedal: {
    marked: {
      notes: fourPartScore(['C3.2 | C3{t}.2 | E3.2','E3.2 | F3.2 | G3.2','G4.2 | G4.4 B4.4 | G4.2',pedalMelody], 'C', '2 4'),
      description: 'C 横跨小节线；第二小节仍保留 C，同时在上方形成以 F 为和弦低音的 V₂。'
    },
    melody: {
      notes: fourPartScore(['C3.2 | F3.2 | E3.2','E3.2 | G3.2 | C4.2','G4.2 | B4.2 | G4.2',pedalMelody], 'C','2 4'),
      description: '旋律仍含两个经过音。和弦谱显示真正的转位低音 F–E。'
    },
    reduced: {
      notes: labelledChordScore([[['C3 E3 G4 C5','I']], [['F3 G3 B4 D5','V2']], [['E3 C4 G4 C5','I6']]], 'C'),
      description: '只保留骨干音。第二小节里的经过音 C 与持续音 C 都不再占一个和弦位置。'
    }
  },
  scale: {
    marked: {
      notes: fourPartScore([
        `${tonicScaleBass} | C3.8 D3.8 { txt "+" } E3.8 G3.8 ${dominantScaleBass} | ${tonicScaleBass} |
        D3.8 E3.8 { txt "+" } F3.8 A3.8 ${dominantScaleBass} | C3.1`,
        'E4.1 | E4.2 D4.2 | E4.1 | A3.2 G3.2 | G3.1',
        'G4.1 | G4.2 B4.2 | G4.1 | F4.2 F4.2 | E4.1',
        scaleMelody
      ], 'C', '4 4'),
      description: '开头低音的 D、F 是和弦外音。第二小节前两拍仍属 I，后两拍由低音 G 和上方的 B、D、F 确立 V₇。'
    },
    melody: {
      notes: fourPartScore([
        'C3.1 | C3{t}.2 G2.2 | C3.1 | D3.2 G2.2 | C3.1',
        'E4.1 | E4{t}.2 D4.2 | E4.1 | A3.2 G3.2 | G3.1',
        'G4.1 | G4{t}.2 B4.2 | G4.1 | F4.2 F4.2 | E4.1',
        scaleMelody
      ], 'C', '4 4'),
      description: '开头的 I 跨小节延续。第四小节前两拍归为 D–F–A–C，标作 ii₇。'
    },
    reduced: {
      notes: labelledChordScore([
        [['C3 E4 G4 E5','I','1']],
        [['C3{t} E4{t} G4{t} E5{t}',''], ['G2 D4 B4 F5','V7']],
        [['C3 E4 G4 E5','I','1']],
        [['D3 A3 F4 C5','ii7'], ['G2 G3 F4 B4','V7']],
        [['C3 G3 E4 C5','I','1']]
      ], 'C', '4 4'),
      description: '低音的八分音符归并成稳定的和声低音。第三小节只有一个和弦，第四小节每两拍换一次和弦。'
    }
  },
  waltz: {
    marked: {
      notes: fourPartScore([
        'C3.4 r.2 | G2.4 r.2 | C3.4 r.2 | F2.4 r.2 | G2.4 r.2 | C3.4 r.2',
        'r.4 G3.4 G3.4 | r.4 B3.4 B3.4 | r.4 G3.4 G3.4 | r.4 C4.4 C4.4 | r.4 B3.4 B3.4 | r.4 G3.4 G3.4',
        'r.4 E4.4 E4.4 | r.4 F4.4 F4.4 | r.4 E4.4 E4.4 | r.4 A4.4 A4.4 | r.4 F4.4 F4.4 | r.4 E4.4 E4.4',
        waltzMelody
      ], 'C','3 4'),
      description: '强拍低音和后两拍的重复音型属于同一组和弦，六小节各更换一次和声。'
    },
    melody: {
      notes: fourPartScore([
        'C3.2 { d } | G2.2 { d } | C3.2 { d } | F2.2 { d } | G2.2 { d } | C3.2 { d }',
        'G3.2 { d } | B3.2 { d } | G3.2 { d } | C4.2 { d } | B3.2 { d } | G3.2 { d }',
        'E4.2 { d } | F4.2 { d } | E4.2 { d } | A4.2 { d } | F4.2 { d } | E4.2 { d }',
        waltzMelody
      ], 'C','3 4'),
      description: '伴奏改成持续和弦，旋律和外音的节奏保持不变。'
    },
    reduced: {
      notes: labelledChordScore([
        [['C3 G3 E4 E5','I','2.']], [['G2 B3 F4 D5','V7','2.']],
        [['C3 C4 E4 G4','I','2.']], [['F2 C4 F4 A4','IV','2.']],
        [['G2 D4 F4 B4','V7','2.']], [['C3 C4 E4 C5','I','2.']]
      ],'C','3 4'),
      description: '第一次停在属功能，后句由 IV–V₇–I 构成复式终止。'
    }
  }
};

const dMajorOutline = labelledChordScore([
  [['D3 A3 F#4 D5', 'I', '1']],
  [['D3 B3 G4 D5', 'IV6/4'], ['D3 A3 F#4 D5', 'I']],
  [['C#3 A3 E4 G4', 'V6/5', '1']],
  [['D3 A3 D4 F#4', 'I', '1']],
  [['G2 B3 E4 G4', 'ii6'], ['A2 G3 C#4 B4', 'V9']],
  [['D3 F#3 D4 A4', 'I', '1']]
], 'D', '4 4');

mountHarmonyOptions({
  minorSecond, minorThird, minorSixth, minorLeading, naturalMinor,
  supertonicSeventh, mediantSeventh, submediantSeventh, otherSevenths,
  sequenceRhythm, triadSequences, seventhSequences
}, { dMajorOutline });

const secondary = {
  major: { Ⅱ:['ii','D F A C'], Ⅲ:['iii','E G B D'], Ⅵ:['vi','A C E G'], Ⅶ:['viiø','B D F A'], Ⅰ:['I','C E G B'], Ⅳ:['IV','F A C E'] },
  minor: { Ⅱ:['iiø','B D F A'], Ⅲ:['III+','C E G# B'], Ⅵ:['VI','F A C E'], Ⅶ:['vii°','G# B D F'], Ⅰ:['i','A C E G#'], Ⅳ:['iv','D F A C'] }
};
const signatures = { major:'C', minor:'Aminor' };

function buildSecondary({ key, degree, position }) {
  const [label, source] = secondary[key][degree];
  const suffix = ['7','6/5','4/3','2'][position];
  const tones = source.split(' ');
  const offset = Number(position);
  const order = [...tones.slice(offset), ...tones.slice(0, offset)];
  let octave = 4;
  let previous = -1;
  const voiced = order.map(tone => {
    const pitch = getTonic(tone, octave).tonicPitch;
    if (pitch <= previous) octave++;
    previous = getTonic(tone, octave).tonicPitch;
    return tone + octave;
  });
  const notation = String.raw`\ks ${signatures[key]} \ts (2 4) (${voiced.join(' ')}).2 { txt "${label}${suffix}" }`;
  return { notes: notation, description: `${label}${suffix} · 低音 ${displayPitch(order[0])} · 由低到高 ${order.map(displayPitch).join('–')}` };
}

function buildSequence({ direction, step, copies }) {
  const interval = Number(direction) * Number(step);
  const measures = shiftedPattern(triadMotif, interval, Number(copies) + 1);
  const notes = labelledChordScore(measures, 'C', '4 4');
  const summary = measures.map(group => group.map(([,label]) => label).join('–')).join('｜');
  const chords = measures.flat().map(([chord]) => chord.split(' ').map(note =>
    getTonic(note[0], Number(note.at(-1))).tonicPitch));
  const needsAdjustment = chords.some((chord, index) => {
    const prior = chords[index - 1];
    if (!prior) return false;
    return chord.some((lower, a) => chord.some((higher, b) => {
      const interval = (higher - lower) % 12;
      return b > a && [0, 7].includes(interval) && (prior[b] - prior[a]) % 12 === interval &&
        lower !== prior[a] && higher !== prior[b];
    }));
  });
  return { notes, description: summary + (needsAdjustment ? '。这组直接移位出现连续纯五度或八度，四部写作时需调整相关声部。' : '') };
}

function mountBuilder(id, build) {
  const panel = document.getElementById(id);
  if (!panel) return;
  const form = panel.querySelector('form');
  const cue = panel.querySelector('output');
  const figure = panel.querySelector('figure');
  let playback;

  function update() {
    const { notes, description } = build(Object.fromEntries(new FormData(form)));
    cue.textContent = description;
    if (playback) playback.setNotes(notes);
    else playback = mountScore(figure, { notes, notation: 'staff', tempo: 100 });
  }
  form.addEventListener('change', update);
  update();
}

mountBuilder('secondarySeventhBuilder', buildSecondary);
mountBuilder('sequenceBuilder', buildSequence);
mountBuilder('analysisLayers', ({ passage, layer }) => analysis[passage][layer]);
