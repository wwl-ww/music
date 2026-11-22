import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';

// One measure per chord, ordered bass, tenor, alto, soprano.
function study(key, description, chords) {
  return { notes: labelledChordScore(chords.map(chord => [chord]), key), description };
}

const fromCMajor = [
  ['C3 E4 G4 C5', 'I'],
  ['F3 F4 A4 C5', 'IV']
];
const toBMajor = ['B2 D#4 B4 F#5', 'I'];
const fromBMajor = [
  ['B2 F#3 B3 D#4', 'I'],
  ['F#2 C#3 A#3 E4', 'V7'],
  ['B2 F#3 B3 D#4', 'I']
];

const dominantAugmentedSixth = {
  cadential: study('C', 'G7 的七音 F 改写为 E♯。B 调的终止四六先接住外声部到 F♯ 的解决。', [
    ...fromCMajor,
    ['G3 D4 B4 E#5', 'V7 = Ger⁺⁶'],
    ['F#3 D#4 B4 F#5', 'K₆₄'],
    ['F#3 C#4 A#4 E5', 'V7'],
    ['B2 F#3 B4 D#5', 'I']
  ]),
  doubleAugmented: study('C', 'D 也改写成 C𝄪，和弦仍用同一组琴键。中声部按 C𝄪–D♯ 上行。', [
    ...fromCMajor,
    ['G3 C##4 B4 E#5', 'V7 = 倍增三四'],
    ['F#3 D#4 B4 F#5', 'K₆₄'],
    ['F#3 C#4 A#4 E5', 'V7'],
    ['B2 F#3 B4 D#5', 'I']
  ]),
  directSeventh: study('C', '增六度直接到 V7 的八度。属七省去五音，把中声部 D 引到七音 E。', [
    ...fromCMajor,
    ['G3 D4 B4 E#5', 'V7 = Ger⁺⁶'],
    ['F#3 E4 A#4 F#5', 'V7'],
    toBMajor
  ]),
  directTriad: study('C', '外声部反向到 F♯。低音与次中音的 G–D 和 F♯–C♯ 则同向形成两个纯五度。', [
    ...fromCMajor,
    ['G3 D4 B4 E#5', 'V7 = Ger⁺⁶'],
    ['F#3 C#4 A#4 F#5', 'V'],
    toBMajor
  ]),
  reverse: study('B', '把 B 大调增六和弦中的 E♯ 写成 F，G7 随后按 C 大调的属功能解决。', [
    ...fromBMajor,
    ['G2 D3 B3 F4', 'Ger⁺⁶ = V7'],
    ['C2 C3 C4 E4', 'I']
  ]),
  reverseApplied: study('B', '等换出的 G7 先到 C，C7 随后解决到 F。G7 在最终建立的 F 调中作重属。', [
    ...fromBMajor,
    ['G2 D3 B3 F4', 'Ger⁺⁶ = V7/V'],
    ['C2 C3 C4 E4', 'V'],
    ['C2 C3 Bb3 E4', 'V7'],
    ['F2 C3 A3 F4', 'I']
  ]),
  reverseInversion: study('Bb', '同组音改写成 F♯7/A♯，低音 A♯ 是新调导音，上行解决到 B。', [
    ['Bb2 F3 D4 Bb4', 'I'],
    ['F3 A3 C4 Eb4', 'V7'],
    ['Bb2 F3 D4 Bb4', 'I'],
    ['A#2 C#4 E4 F#4', 'Ger⁺⁶ = V₆₅'],
    ['B2 B3 D#4 F#4', 'I']
  ])
};

const secondaryDominantPivots = {
  eToG: study('E', 'D♯7 本可到 G♯，改写后却向 G 大调的属音 D 展开。', [
    ['E3 G#3 B3 E4', 'I'],
    ['A2 A3 C#4 E4', 'IV'],
    ['E3 G#3 B3 E4', 'I'],
    ['Eb3 G3 Bb3 C#4', 'V7/iii = Ger⁺⁶'],
    ['D3 G3 B3 D4', 'K₆₄'],
    ['D3 F#3 C4 A4', 'V7'],
    ['G2 G3 B3 D4', 'I']
  ]),
  fToCSharp: study('F', 'F 大调的 A7 本可到 D。G 改写成 F𝄪 后，和弦的外声部趋向新调属音 G♯。', [
    ['F3 A3 F4 C5', 'I'],
    ['C3 Bb3 E4 G4', 'V7'],
    ['F3 A3 F4 C5', 'I'],
    ['A3 C#4 E4 F##4', 'V7/vi = Ger⁺⁶'],
    ['G#3 C#4 E4 G#4', 'K₆₄'],
    ['G#3 B#3 F#4 G#4', 'V7'],
    ['C#3 C#4 E4 G#4', 'i']
  ]),
  aToF: study('A', 'C♯7 用等音拼写变为 D♭–F–A♭–B，转向 F 大调的属音 C。', [
    ['A2 E3 C#4 A4', 'I'],
    ['E3 G#3 D4 B4', 'V7'],
    ['A2 A3 C#4 E5', 'I'],
    ['Db3 F3 Ab3 B4', 'V7/vi = Ger⁺⁶'],
    ['C3 F3 A3 C5', 'K₆₄'],
    ['C3 E3 Bb3 C5', 'V7'],
    ['F2 F3 A3 C5', 'I']
  ])
};

const fromFMajor = [
  ['F3 A3 C4 F4', 'I'],
  ['C3 G3 Bb3 E4', 'V7'],
  ['F2 F3 A3 F4', 'I']
];
const toCMajor = [
  ['G2 G3 B3 F4', 'V7'],
  ['C3 G3 C4 E4', 'I']
];
const raisedSubdominant = ['F3 A3 C4 D#4', 'V7/IV = IV⁺⁶'];
const tonicFirstInversion = ['E3 G3 C4 E4', 'I₆'];

const otherAugmentedSixthPivots = {
  neapolitan: study('Db', 'D♭7 的七音 C♭ 改写为 B，外声部向 C 收束。', [
    ['Db3 Ab3 F4 Db5', 'I'],
    ['Ab2 Gb3 C4 Eb5', 'V7'],
    ['Db3 F3 Db4 F5', 'I'],
    ['Db3 Ab3 F4 B4', 'V7/IV = N⁺⁶'],
    ['C3 C4 E4 C5', 'I'],
    ['G2 D4 B4 F5', 'V7'],
    ['C3 G4 C5 E5', 'I']
  ]),
  subdominant: study('F', '把 F7 的 E♭ 写成 D♯，外声部 F 和 D♯ 分别下行、上行到 E。', [
    ...fromFMajor,
    raisedSubdominant,
    tonicFirstInversion,
    ...toCMajor
  ]),
  withInversion: study('F', '中介先接 G7/F，低音停在 F。随后七音下行到 E，进入 C 大调 I₆。', [
    ...fromFMajor,
    raisedSubdominant,
    ['F3 G3 B3 D4', 'V₄₂'],
    tonicFirstInversion,
    ...toCMajor
  ])
};

const augmentedTriadModulations = {
  toFlat: study('C', 'C 大调 V⁺ 的 B 写成 C♭，向下解决到 E♭ 大调终止四六的低音 B♭。', [
    ['C3 E3 G3 C4', 'I'],
    ['G2 D3 G3 B3', 'V'],
    ['C3 E3 G3 C4', 'I'],
    ['Cb3 Eb3 G3 G4', 'V⁺ = ♭VI⁺'],
    ['Bb2 Eb3 G3 Bb4', 'K₆₄'],
    ['Bb2 D3 Ab3 F4', 'V7'],
    ['Eb2 Eb3 G3 Bb4', 'I']
  ]),
  toDominant: study('Eb', 'C♭ 和 E♭ 改写为 B 和 D♯，两个中介趋向音上行到 C 与 E。', [
    ['Eb3 G3 Bb3 Eb4', 'I'],
    ['Bb2 F3 Ab3 D4', 'V7'],
    ['Eb3 G3 Bb3 Eb4', 'I'],
    ['G2 G3 B3 D#4', '♭VI⁺ = V⁺'],
    ['C3 G3 C4 E4', 'I']
  ]),
  toRelativeMinor: study('C', 'C 大调的 A♭ 在 a 小调改读 G♯，从下行变音变成上行导音。', [
    ['C3 C4 E4 G4', 'I'],
    ['G2 B3 F4 D5', 'V7'],
    ['C3 C4 E4 C5', 'I'],
    ['A2 C4 E4 E5', 'vi'],
    ['G#2 C4 E4 E5', '♭VI⁺ = III⁺'],
    ['A2 C4 E4 A4', 'i'],
    ['E3 D4 E4 G#4', 'V7'],
    ['A2 C4 E4 A4', 'i']
  ]),
  minorModes: study('Ebminor', 'e♭ 小调的 G♭⁺ 改读为 f♯ 小调的 B♭⁺，中介的 B♭ 下行到 A。', [
    ['Eb3 Gb3 Bb3 Eb4', 'i'],
    ['Bb2 F3 Ab3 D4', 'V7'],
    ['Eb3 Gb3 Bb3 Eb4', 'i'],
    ['Bb2 F#3 D4 F#4', 'III⁺₆ = ♭IV⁺'],
    ['A2 F#3 C#4 F#4', 'i₆'],
    ['C#3 B3 C#4 E#4', 'V7'],
    ['F#2 A3 C#4 F#4', 'i']
  ])
};

mountHarmonyOptions({
  'dominant-augmented-sixth': dominantAugmentedSixth,
  'secondary-dominant-pivots': secondaryDominantPivots,
  'other-augmented-sixth-pivots': otherAugmentedSixthPivots,
  'augmented-triad-modulations': augmentedTriadModulations
});
