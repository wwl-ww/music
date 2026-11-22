import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';
import { displayPitch } from '../../shared/formats/pitch.js';
import { mountScore } from '../../shared/formats/score.js';

function progression(key, chords, description) {
  return { notes: labelledChordScore(chords.map(chord => [chord]), key), description };
}

const majorTonic = ['C3 G3 C4 E4', 'I'];
const minorDominantSecond = ['B2 E3 G#3 D4', 'V4/3'];
const minorTonic = ['A2 E3 A3 C4', 'i'];

const resolutions = {
  raisedPassing: progression('C', [
    ['G2 G3 B3 D4', 'V'],
    ['G2 G3 B3 D#4', 'V(♯5)'],
    majorTonic
  ], '高音的 D–D♯–E 依次连接属三、变属与主和弦。'),
  loweredPassing: progression('C', [
    ['B2 G3 G4 D5', 'V6'],
    ['B2 G3 G4 Db5', 'V6(♭5)'],
    ['C3 G3 E4 C5', 'I']
  ], 'D–D♭–C 在高音下行，低音导音 B 上行到 C。'),
  neighbor: progression('C', [
    ['C3 G3 E4 C5', 'I'],
    ['B2 G3 F4 Db5', 'V6/5(♭5)'],
    ['C3 G3 E4 C5', 'I']
  ], '两个原位主和弦之间，C–D♭–C 构成高音半音辅助。'),
  leap: progression('C', [
    ['C3 E4 G4 C5', 'I'],
    ['B2 F4 G4 D#5', 'V6/5(♯5)'],
    ['C3 E4 G4 E5', 'I']
  ], '高音由 C 跳到 D♯，再上行到 E。次中音 F 下行到 E，主和弦在不同八度重复三音。'),
  splitFifth: progression('C', [
    ['D3 G3 B3 D4', 'V6/4'],
    ['Db3 G3 B3 D#4', 'V6/4(♭5, ♯5)'],
    majorTonic
  ], '低音 D♭ 和导音 B 分别到上下两个 C。高音 D♯ 同时上行到 E。'),
  majorLeading: progression('C', [
    ['D3 A3 B3 F4', 'viiø6/5'],
    ['Db3 A3 B3 F4', 'viiø6/5(♭3)'],
    majorTonic
  ], '导七三音 D♭ 下行到 C，其余声部延续导七解决，七音 A 下行至 G。'),
  minorLowered: progression('Aminor', [
    minorDominantSecond,
    ['Bb2 E3 G#3 D4', 'V4/3(♭5)'],
    minorTonic
  ], '降低的五音 B♭ 与原有导音 G♯ 从两侧解决到 A。'),
  minorBothLowered: progression('Aminor', [
    minorDominantSecond,
    ['Bb2 E3 G#3 Db4', 'V⁴₃(♭5,♭7)'],
    minorTonic
  ], '属七的五音和七音都降低。低音 B♭ 下行到 A，高音 D♭ 下行到 C。'),
  minorLeading: progression('Aminor', [
    ['G#2 F3 B3 D4', 'vii°7'],
    ['G#2 F3 Bb3 D4', 'vii°7(♭3)'],
    minorTonic
  ], '中音的 B♭ 下行到 A，低音导音 G♯ 上行到 A。七音 F 从次中音下降到 E。')
};

const otherProgressions = {
  outerFifth: progression('C', [
    ['G2 B3 G4 D#5', 'V(♯5)'],
    ['A2 C4 C5 E5', 'vi']
  ], '高低音都上行，外声部的 G–D♯ 同向进入 A–E，形成增五度到纯五度。'),
  inverted: progression('C', [
    ['B2 G3 G4 D#5', 'V6(♯5)'],
    ['C3 A3 E4 E5', 'vi6']
  ], '低音 B 上行到 C，改由第一转位的 vi 接续。高音 D♯ 仍上行到 E。'),
  minorDeceptive: progression('Aminor', [
    ['E3 Bb3 D4 G#4', 'V7(♭5)'],
    ['F3 A3 C4 A4', 'VI']
  ], 'B♭ 与 G♯ 都趋向 A，低音却走向 F。A 成为Ⅵ级和弦的三音。'),
  secondary: progression('C', [
    ['C3 G3 E4 G4', 'C: I'],
    ['D3 F#3 C4 A#4', 'V7(♯5)/V'],
    ['G2 G3 B3 B4', 'V'],
    ['G2 F3 D4 B4', 'V7'],
    ['C3 E3 C4 C5', 'I']
  ], 'D7 的升五音 A♯ 上行到临时目标 G 大三和弦的三音 B，后续 G7–C 回到原调。'),
  localLeading: progression('F', [
    ['A2 F3 C4 F4', 'F: I6'],
    ['B2 F#3 A3 Eb4', 'vii°⁴₃(♭5)/ii'],
    ['Bb2 G3 Bb3 D4', 'ii6'],
    ['C3 G3 Bb3 E4', 'V7'],
    ['F2 F3 A3 F4', 'I']
  ], '临时导减七的五音 C 降成 C♭，在低音等音记作 B，再下降半音到 Gm 的三音 B♭。')
};

mountHarmonyOptions({
  'altered-dominant-resolution': resolutions,
  'altered-dominant-deceptive': otherProgressions
});

const major = {
  triad: {
    original: ['G4 B4 D5', 'V'],
    raise: ['G4 B4 D#5', 'V(♯5)'],
    lower: ['G4 B4 Db5', 'V(♭5)'],
    split: ['Db4 G4 B4 D#5', 'V6/4(♭5, ♯5)']
  },
  seventh: {
    original: ['G4 B4 D5 F5', 'V7'],
    raise: ['G4 B4 D#5 F5', 'V7(♯5)'],
    lower: ['G4 B4 Db5 F5', 'V7(♭5)'],
    split: ['Db4 G4 B4 D#5 F5', 'V4/3(♭5, ♯5)']
  },
  ninth: {
    original: ['G4 B4 D5 F5 A5', 'V9'],
    raise: ['G4 B4 D#5 F5 A5', 'V9(♯5)'],
    lower: ['G4 B4 Db5 F5 A5', 'V9(♭5)'],
    split: ['Db4 G4 B4 D#5 F5 A5', 'V9(♭5, ♯5)'],
    raiseWithSmallNinth: ['G4 B4 D#5 F5 Ab5', 'V(♯5, ♭9)'],
    lowerWithSmallNinth: ['G4 B4 Db5 F5 Ab5', 'V(♭5, ♭9)']
  },
  leadingTriad: {
    original: ['B4 D5 F5', 'vii°'],
    lowerThird: ['B4 Db5 F5', 'vii°(♭3)']
  },
  leadingSeventh: {
    original: ['B4 D5 F5 A5', 'viiø7'],
    lowerThird: ['B4 Db5 F5 A5', 'viiø7(♭3)'],
    lowerThirdWithSmallNinth: ['B4 Db5 F5 Ab5', 'vii°7(♭3)']
  }
};

const minor = {
  triad: {
    original: ['E4 G#4 B4', 'V'],
    lower: ['E4 G#4 Bb4', 'V(♭5)']
  },
  seventh: {
    original: ['E4 G#4 B4 D5', 'V7'],
    lower: ['E4 G#4 Bb4 D5', 'V7(♭5)'],
    lowerWithSeventh: ['E4 G#4 Bb4 Db5', 'V7(♭5, ♭7)']
  },
  ninth: {
    original: ['E4 G#4 B4 D5 F5', 'V9'],
    lower: ['E4 G#4 Bb4 D5 F5', 'V9(♭5)'],
    lowerWithSeventh: ['E4 G#4 Bb4 Db5 F5', 'V9(♭5, ♭7)']
  },
  leadingTriad: {
    original: ['G#4 B4 D5', 'vii°'],
    lowerThird: ['G#4 Bb4 D5', 'vii°(♭3)'],
    lowerThirdWithFifth: ['G#4 Bb4 Db5', 'vii°(♭3, ♭5)']
  },
  leadingSeventh: {
    original: ['G#4 B4 D5 F5', 'vii°7'],
    lowerThird: ['G#4 Bb4 D5 F5', 'vii°7(♭3)'],
    lowerThirdWithFifth: ['G#4 Bb4 Db5 F5', 'vii°7(♭3, ♭5)']
  }
};

const byKey = { major: { signature: 'C', families: major }, minor: { signature: 'Aminor', families: minor } };
const names = {
  raise: '升五音',
  lower: '降五音',
  split: '升降五音并用',
  raiseWithSmallNinth: '升五音配小九音',
  lowerWithSmallNinth: '降五音配小九音',
  lowerThird: '降三音',
  lowerThirdWithSmallNinth: '降三音的导减七',
  lowerWithSeventh: '降五音与七音',
  lowerThirdWithFifth: '降三音与五音'
};

const structurePanel = document.getElementById('altered-dominant-structures');
const key = structurePanel.querySelector('[name="key"]');
const family = structurePanel.querySelector('[name="family"]');
const variant = structurePanel.querySelector('[name="variant"]');
const figure = structurePanel.querySelector('figure');
const output = structurePanel.querySelector('output');
let playback;

function renderStructure() {
  const { signature, families } = byKey[key.value];
  const shapes = families[family.value];
  const [original, originalLabel] = shapes.original;
  const [altered, alteredLabel] = shapes[variant.value];
  const notes = String.raw`\ks ${signature} \ts (2 4) (${original}).2 { txt "${originalLabel}" } | (${altered}).2 { txt "${alteredLabel}" }`;
  const spell = pitches => pitches.split(' ').map(pitch => displayPitch(pitch.slice(0, -1))).join('–');
  output.textContent = `${spell(original)} → ${spell(altered)}`;
  if (playback) playback.setNotes(notes);
  else playback = mountScore(figure, { notes, notation: 'staff', tempo: 100 });
}

function updateVariants() {
  const previous = variant.value;
  const shapes = byKey[key.value].families[family.value];
  const values = Object.keys(shapes).filter(name => name !== 'original');
  variant.replaceChildren(...values.map(name => new Option(names[name], name, false, name === previous)));
  renderStructure();
}

key.addEventListener('change', updateVariants);
family.addEventListener('change', updateVariants);
variant.addEventListener('change', renderStructure);
updateVariants();
