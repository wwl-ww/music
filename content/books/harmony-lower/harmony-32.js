import { fourPartScore, labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';
import { mountScore } from '../../shared/formats/score.js';

const outline = [
  { bass: 'C3', upper: ['G3', 'C4', 'E4'], label: 'I' },
  { bass: 'F2', upper: ['A3', 'C4', 'F4'], label: 'IV' },
  { bass: 'G2', upper: ['G3', 'B3', 'F4'], label: 'V7' },
  { bass: 'C3', upper: ['G3', 'C4', 'E4'], label: 'I' },
];

function pitchOctave(pitch, shift) {
  return pitch.slice(0, -1) + (Number(pitch.at(-1)) + shift);
}

function notesAt(pitches, duration) {
  return pitches.map(pitch => `${pitch}.${duration}`).join(' ');
}

function labelled(text, label) {
  const [first] = text.match(/^(?:\([^)]*\)|[^ .]+)\.\d+/);
  return `${first} { txt "${label}" }${text.slice(first.length)}`;
}

const ornaments = [
  'E4.8 F4.8 E4.8 D4.8 C4.8 G3.8 (C4 E4).4',
  'G4.8 F4.8 C4.8 A3.8 (A3 C4 F4).2',
  'B4.8 A4.8 G4.8 F4.8 (G3 B3 F4).2',
  'E4.8 F4.8 E4.8 C4.8 (G3 C4 E4).2',
];

const arpeggioWithSuspension = [
  'G3.8 C4.8 E4.8 G4.8 E4.8 C4.8 G3.4',
  'A3.8 C4.8 F4.8 A4.8 F4.8 A3.8 C4.4',
  'C4{t}.4 B3.8 G3.8 B3.8 G3.8 B3.8 F4.8',
  'E4.8 G3.8 C4.8 E4.8 G4.8 C4.8 G3.4',
];

const patterns = {
  outline: {
    upper: ({ upper }) => `(${upper.join(' ')}).1`,
    cue: '每小节一个和弦。属七的 F、B 在末次换和弦时分别趋向 E、C。',
  },
  offbeat: {
    upper: ({ upper }) => `r.8 (${upper.join(' ')}).8 `.repeat(4).trim(),
    cue: '低音从小节第一拍保持，上方和弦在各拍的后半拍反复发音。',
  },
  staggered: {
    upper: ({ upper }) => `(${upper.join(' ')}).4 r.4 `.repeat(2).trim(),
    lower: ({ bass }) => `r.4 ${bass}.4 r.4 ${bass}.4`,
    cue: '和弦落在第一、三拍，低音落在第二、四拍。同一个和弦在两层之间交替。',
  },
  waltz: {
    meter: '3 4',
    upper: ({ upper }) => `r.4 (${upper.join(' ')}).4 (${upper.join(' ')}).4`,
    lower: ({ bass }) => `${bass}.4 r.2`,
    cue: '三拍子中，低音落在第一拍，第二、三拍重复整个上方和弦。',
  },
  singleTone: {
    upper: ({ upper: [, , note] }) => `${note}.8 r.8 ${note}.4 ${note}.8 r.8 ${note}.4`,
    inner: ({ upper: [a, b] }) => `(${a} ${b}).1`,
    cue: '只有最高和弦音按节奏重奏，内声部与低音保持。',
  },
  twoTones: {
    upper: ({ upper: [, b, c] }) => `(${b} ${c}).8 r.8 (${b} ${c}).4 `.repeat(2).trim(),
    inner: ({ upper: [a] }) => `${a}.1`,
    cue: '上方两个和弦音一起重奏。其他声部持续在原位，节奏型有了两个音的厚度。',
  },
  ascending: {
    upper: ({ upper: [a, b, c] }) => notesAt([a, b, c, pitchOctave(a, 1), pitchOctave(b, 1), pitchOctave(c, 1), pitchOctave(a, 2), pitchOctave(b, 2)], 8),
    cue: '上方逐次奏出和弦音并跨过八度，低音持续支撑同一个根音。',
  },
  turning: {
    upper: ({ upper: [a, b, c] }) => notesAt([a, b, c, pitchOctave(a, 1), c, b, a, b], 8),
    cue: '分解到达高点后折回，和弦的组成音保持不变。',
  },
  lowArpeggio: {
    upper: ({ upper }) => `(${upper.join(' ')}).1`,
    lower: ({ bass, upper: [a, b, c] }) => notesAt([bass, pitchOctave(a, -1), pitchOctave(b, -1), pitchOctave(c, -1), pitchOctave(b, -1), pitchOctave(a, -1), bass, pitchOctave(a, -1)], 8),
    cue: '上方和弦保持，低音区先后奏出同一和弦的音。',
  },
  twoHands: {
    upper: ({ upper: [a, b, c] }) => `r.2 ${notesAt([a, b, c, pitchOctave(a, 1)], 8)}`,
    lower: ({ bass, upper: [a, b, c] }) => `${notesAt([bass, pitchOctave(a, -1), pitchOctave(b, -1), pitchOctave(c, -1)], 8)} r.2`,
    cue: '前两拍在低音区分解，后两拍转到上方。音区移动发生在同一和弦内。',
  },
  suspendedArpeggio: {
    upper: (_chord, index) => arpeggioWithSuspension[index],
    cue: '低音在第三小节起点已经换成 G。上方的 C 沿延音线保持，到第二拍才下行到 B。',
  },
  mixed: {
    upper: ({ upper: [a, b, c] }) => `(${a} ${b} ${c}).4 ${b}.8 ${c}.8 (${a} ${b} ${c}).4 ${c}.8 ${b}.8`,
    cue: '第一、三拍齐奏，第二、四拍分解。两种发音方式共用和弦。',
  },
  tripletMix: {
    upper: ({ upper: [a, b, c] }) => `(${a} ${b} ${c}).4 ${a}.8 { tu 3 } ${b}.8 { tu 3 } ${c}.8 { tu 3 } (${a} ${b} ${c}).4 ${c}.8 { tu 3 } ${b}.8 { tu 3 } ${a}.8 { tu 3 }`,
    cue: '齐奏占一拍。每组三个八分三连音也占一拍，分解变密，和声节奏保持不变。',
  },
  ornaments: {
    upper: (_chord, index) => ornaments[index],
    cue: '第一小节的 F 是辅助音，D 是经过音。第二小节的 G 在强位出现，随即下行到 F。',
  },
};

function grandStaff(upper, lower, { key = 'C', tempo = 100, meter = '4 4' } = {}) {
  const separator = String.raw` || \voice `;
  return String.raw`\tempo ${tempo} \ks ${key} \ts (${meter}) ${upper.join(separator)} ||
    \staff { score } \tuning (none) \clef F4 \ks ${key} ${lower.join(separator)}`;
}

const figurationPanel = document.getElementById('harmony-figuration-example');
if (figurationPanel) {
  const form = figurationPanel.querySelector('form');
  const cue = figurationPanel.querySelector('output');
  const figure = figurationPanel.querySelector('figure');
  let player;

  function renderFiguration() {
    const tempo = Number(form.elements.tempo.value);
    const pattern = patterns[form.elements.pattern.value];
    const upper = [outline.map((chord, index) => labelled(pattern.upper(chord, index), chord.label)).join(' | ')];
    if (pattern.inner) upper.push(outline.map(pattern.inner).join(' | '));
    const lower = outline.map(pattern.lower ?? (chord => `${chord.bass}.1`)).join(' | ');
    const score = grandStaff(upper, [lower], { tempo, meter: pattern.meter });
    cue.textContent = pattern.cue;
    if (player) player.setNotes(score);
    else player = mountScore(figure, { notes: score, notation: 'staff' });
  }

  form.addEventListener('change', renderFiguration);
  renderFiguration();
}

const labels = outline.map(chord => chord.label);
const upperVoices = outline[0].upper.map((_, index) => outline.map(chord => chord.upper[index]));
const plainMeasures = outline.map(({ bass, upper, label }) => [[[bass, ...upper].join(' '), label, '1']]);

function tied(pitches, times) {
  return Array.from({ length: times }, (_, index) => {
    const tones = pitches.map(pitch => index === 0 ? pitch : `${pitch}{t}`);
    return tones.length === 1 ? `${tones[0]}.1` : `(${tones.join(' ')}).1`;
  });
}

function onBass(bass, chords = upperVoices, marks = labels, key = 'C') {
  const upper = chords.map((pitches, voice) => pitches.map((pitch, measure) => {
    const text = `${pitch}.1`;
    return voice === 2 ? labelled(text, marks[measure]) : text;
  }).join(' | '));
  return fourPartScore([bass.join(' | '), ...upper], key, '4 4');
}

const dualPedal = tied(['C2', 'G2'], 4);
const tonicPedal = tied(['C3'], 4);
const dominantPedal = [...tied(['G2'], 3), 'C3.1'];

const pedalFunctions = {
  plain: {
    notes: labelledChordScore(plainMeasures, 'C', '4 4'),
    description: '低音随四部和声一起换音，保留 I–IV–V₇–I 的参照。',
  },
  tonic: {
    notes: onBass(tonicPedal),
    description: '低音 C 只起音一次。经过 V₇ 时与上方 B 不协和，回到 I 时重新成为和弦音。',
  },
  expandedTonic: {
    notes: onBass(tied(['C3'], 5), [
      ['G3', 'G3', 'A3', 'G3', 'G3'],
      ['C4', 'Bb3', 'C4', 'B3', 'C4'],
      ['E4', 'E4', 'F4', 'F4', 'E4'],
    ], ['I', 'V7/IV', 'IV', 'V7', 'I']),
    description: 'C 持续不动。上方的 C₇–F 短暂加强下属，随后由 G₇–C 收束在原调。',
  },
  dominant: {
    notes: onBass(dominantPedal, upperVoices, ['I6/4', 'IV', 'V7', 'I']),
    description: '固定的 G 把开头的主和弦置于四六位置，持续到属七，再移到 C。',
  },
  cadentialDominant: {
    notes: onBass([...tied(['G2'], 2), 'C3.1'], [
      ['G3', 'F3', 'E3'],
      ['C4', 'B3', 'C4'],
      ['E4', 'D4', 'E4'],
    ], ['K6/4', 'V7', 'I']),
    description: 'G 从终止四六延长到属七。上方的 C、E 先解到 B、D，再整体归主。',
  },
  expandedDominant: {
    notes: onBass([...tied(['G2'], 4), 'C3.1'], [
      ['G3', 'A3', 'A3', 'G3', 'G3'],
      ['B3', 'C#4', 'D4', 'B3', 'C4'],
      ['D4', 'G4', 'F#4', 'F4', 'E4'],
    ], ['V', 'D:V7', 'D:I', 'C:V7', 'I']),
    description: 'G 保持时，上方 A₇–D 短暂突出 D。C 大调的 G₇–C 恢复主调的终止。',
  },
  double: {
    notes: onBass(dualPedal),
    description: 'C 在下、G 在上，组成跨越四个和弦的纯五度。整体仍由主持续音支撑。',
  },
  upper: {
    notes: fourPartScore([
      'C3.1 | F2.1 | G2.1 | C3.1',
      'E3.1 | A3.1 | B3.1 | C4.1',
      'C4.1 | C4.1 | F4.1 | E4.1',
      tied(['G4'], 4).map((beat, index) => labelled(beat, labels[index])).join(' | '),
    ], 'C', '4 4'),
    description: 'G 在最高声部保持，低音仍随和弦更换。IV 上方的 G 成为背景性的外音。',
  },
  inner: {
    notes: fourPartScore([
      'C3.1 | F2.1 | G2.1 | C3.1',
      'G3.1 | A3.1 | B3.1 | C4.1',
      tied(['C4'], 4).join(' | '),
      'E4.1 { txt "I" } | F4.1 { txt "IV" } | F4.1 { txt "V7" } | E4.1 { txt "I" }',
    ], 'C', '4 4'),
    description: 'C 保持在内声部。属七小节的次中音 B 与它形成半音，随后上行与之汇合。',
  },
  added: {
    notes: grandStaff([
      upperVoices[2].map((pitch, index) => labelled(`${pitch}.1`, labels[index])).join(' | '),
      upperVoices[1].map(pitch => `${pitch}.1`).join(' | '),
    ], [
      upperVoices[0].map(pitch => `${pitch}.1`).join(' | '),
      outline.map(chord => `${chord.bass}.1`).join(' | '),
      tied(['C2'], 4).join(' | '),
    ]),
    description: '原四部的低音仍移动。更低的 C 单独占用第五个声部，贯穿原和声。',
  },
  relativeThird: {
    notes: onBass(tonicPedal, [
      ['E3', 'F3', 'E3', 'E3'],
      ['A3', 'A3', 'G#3', 'A3'],
      ['C4', 'D4', 'D4', 'C4'],
    ], ['i6', 'iv', 'V7', 'i6'], 'Aminor'),
    description: '在 a 小调保持第Ⅲ级 C。这个音也是其平行大调的主音，E₇ 的 G♯ 仍上行到 A。',
  },
};

const pedalPatterns = {
  tied: { notes: pedalFunctions.double.notes, description: '主音 C 与属音 G 由延音线连成一次发音。' },
  repeated: {
    notes: onBass(outline.map(() => '(C2 G2).4 r.4 (C2 G2).4 r.4')),
    description: '每小节第一、三拍重奏 C 与 G，短暂留白仍保留两个固定音高的支撑。',
  },
  alternating: {
    notes: onBass(outline.map(() => 'C2.4 G2.4 C2.4 G2.4')),
    description: '主音与属音逐拍交替，形成反复的双持续音型。',
  },
  appoggiatura: {
    notes: onBass([
      '(C2 G2).4 (C2{t} A2).8 (C2{t} G2).8 (C2{t} G2{t}).2',
      '(C2{t} G2{t}).2 (C2{t} G2{t}).4 C2{t}.4',
      '(C2{t} A2).8 (C2{t} G2).8 (C2{t} G2{t}).2 (C2{t} G2{t}).4',
      '(C2{t} G2{t}).1',
    ]),
    description: '低音 C 保持。上方 G 短暂留白，属七小节的强拍从倚音 A 下行回 G。',
  },
};

mountHarmonyOptions({
  'pedal-function-example': pedalFunctions,
  'pedal-figuration-example': pedalPatterns,
});
