import { fourPartScore, labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';

function progression(key, bars, description) {
  const measures = bars.map(bar => Array.isArray(bar[0]) ? bar : [bar]);
  return { notes: labelledChordScore(measures, key), description };
}

const cMajorOpening = [
  ['C3 G3 E4 C5', 'C: I'],
  ['F3 A3 F4 C5', 'IV'],
  ['G3 G3 F4 B4', 'V7'],
  ['C3 G3 E4 C5', 'I']
];

const aMinorOpening = [
  ['A2 A3 E4 C5', 'a: i'],
  ['D3 A3 F4 D5', 'iv'],
  ['E3 G#3 E4 D5', 'V7'],
  ['A2 A3 E4 C5', 'i']
];

const gMajorCadence = [
  ['A2 E3 C4 A4', 'G: ii'],
  ['D3 F#3 C4 A4', 'V7'],
  ['G2 G3 B3 G4', 'I']
];

const gToAMinorOpening = [
  ['G3 G3 D4 B4', 'G: I'],
  ['E3 G3 C4 C5', 'IV6'],
  ['D3 F#3 D4 C5', 'V7'],
  ['G2 G3 D4 B4', 'I']
];

function gToAMinor(chord, description) {
  return progression('G', [
    ...gToAMinorOpening,
    [[chord, 'G: V', '4'], ['D3 B3 F4 A4', 'a: iiø6/5', '4']],
    ['E3 D4 E4 G#4', 'V7'],
    ['A3 C4 E4 A4', 'i']
  ], description);
}

const restatement = fourPartScore([
  'A2.2 | D3.2 | E3.2 | A2.2 | E3.4 E3.4 | C3.2 | F3.2 | G3.2 | C3.2',
  'A3.2 | A3.2 | G#3.2 | A3.2 | G#3.4 G3.4 | G3.2 | D4.2 | D4.2 | G3.2',
  'E4.2 | F4.2 | E4.2 | E4.2 | E4.4 E4.4 | E4.2 | A4.2 | F4.2 | E4.2',
  'C5.4 { txt "a: i" } B4.8 A4.8 | D5.4 { txt "iv" } C5.8 A4.8 | D5.2 { txt "V7" } | C5.2 { txt "i" } | B4.4 { txt "a: V" } B4.4 { txt "C: iii" } | E5.4 { txt "C: I" } D5.8 C5.8 | F5.4 { txt "ii6" } E5.8 D5.8 | B4.2 { txt "V7" } | C5.2 { txt "I" }'
], 'Aminor', '2 4');

const chromaticModulation = {
  natural: progression('C', [
    ...cMajorOpening,
    [['A2 A3 E4 C5', 'C: vi = G: ii', '4'], ['D3 F#3 D4 C5', 'V7', '4']],
    ['G2 G3 D4 B4', 'I'],
    ...gMajorCadence
  ], 'Am 以共同和弦连接两调。后续 D7 的 F♯ 引向新主音 G。'),
  chromaticUp: progression('C', [
    ...cMajorOpening,
    [['D3 F3 D4 B4', 'C: vii°6', '4'], ['C3 F#3 D4 A4', 'G: V2', '4']],
    ['B2 G3 D4 G4', 'I6'],
    ...gMajorCadence
  ], '次中音的 F 升为 F♯，再到 G。D7 的七音 C 在低音下行到 B。'),
  chromaticDown: progression('C', [
    ...cMajorOpening,
    [['G3 G3 D4 B4', 'C: V', '4'], ['G3 G3 D4 Bb4', 'd: iv', '4']],
    ['F3 A3 F4 D5', 'i6'],
    ['A3 A3 G4 C#5', 'V7'],
    ['D3 A3 F4 D5', 'i']
  ], '高音 B 降为 B♭，低音仍是 G。Gm 接作 d 小调的 iv，A7–Dm 确立新调。'),
  relativeUp: progression('C', [
    ...cMajorOpening,
    [['E3 G3 E4 B4', 'C: iii', '4'], ['E3 G#3 E4 B4', 'a: V', '4']],
    ['A2 A3 E4 C5', 'i'],
    ['D3 F3 D4 A4', 'iv'],
    ['E3 E3 D4 G#4', 'V7'],
    ['A2 E3 C4 A4', 'i']
  ], 'Em 的 G 升为 a 小调导音 G♯，E 大三和弦直接解决到 Am。'),
  relativeDown: progression('Aminor', [
    ...aMinorOpening,
    [['E3 G#3 E4 B4', 'a: V', '4'], ['E3 G3 E4 B4', 'C: iii', '4']],
    ['E3 G3 E4 C5', 'I6'],
    ['D3 A3 F#4 C5', 'V7/V'],
    ['G2 G3 F4 B4', 'V7'],
    ['C3 G3 E4 C5', 'I']
  ], 'G♯ 还原成 G，旧调的 E 大三和弦转为 C 大调的 Em。DD–D–T 巩固新调。'),
  sameVoice: gToAMinor('D3 A3 F#4 A4', '中音连续奏出 F♯–F，低音 D 和高音 A 在交接处保持原音高。'),
  distributed: gToAMinor('D3 F#3 D4 A4', '低音 D 和高音 A 相同。F♯ 由次中音奏出，F 则在中音接入。'),
  restatement: {
    notes: restatement,
    description: 'G♯ 还原后，旧调开头的三音下行节奏在 C 大调主和弦上重述，结尾落在 C。'
  }
};

const fMajorOpening = [
  ['F3 A3 F4 C5', 'F: I'],
  ['Bb2 Bb3 F4 D5', 'IV'],
  ['C3 Bb3 E4 C5', 'V7'],
  ['F3 A3 F4 C5', 'I']
];

const alternateFOpening = [
  ['F3 C4 F4 A4', 'F: I'],
  ['Bb2 D4 F4 Bb4', 'IV'],
  ['C3 C4 E4 Bb4', 'V7'],
  ['F3 C4 F4 A4', 'I']
];

const pivotDm = ['D3 A3 F4 D5', 'F: vi = C: ii'];
const pivotLeadIn = ['C3 C4 F4 A4', 'F: I6/4'];
const aSeventh = ['C#3 A3 G4 E5', 'F: V6/5/vi'];
const cMajorCadence = [
  ['G2 G3 F4 B4', 'C: V7'],
  ['C3 G3 E4 C5', 'I']
];

const pivotTonicization = {
  pivotPlain: progression('F', [
    ...fMajorOpening,
    pivotLeadIn,
    pivotDm,
    ...cMajorCadence
  ], '低音从 C 直接到 D。Dm 改作 C 大调的 ii，后续 G7–C 建立新主音。'),
  pivotTonicization: progression('F', [
    ...fMajorOpening,
    pivotLeadIn,
    aSeventh,
    pivotDm,
    ...cMajorCadence
  ], '转位 A7 在低音 C–D 之间插入 C♯，七音 G 下行至 F。Dm 随后充当 C 大调的 ii。'),
  pivotExpanded: progression('F', [
    ...fMajorOpening,
    pivotLeadIn,
    aSeventh,
    pivotDm,
    ['F3 Ab3 F4 C5', 'C: iv'],
    ['F#3 A3 Eb4 C5', 'vii°7/V'],
    ['G3 G3 F4 B4', 'V7'],
    ['C3 G3 E4 C5', 'I']
  ], 'Dm 后的小下属与重属减七丰富了声部的半音走向，随后终止在 C。'),
  localOnly: progression('F', [
    ...alternateFOpening,
    ['C#3 A3 E4 G4', 'F: V6/5/vi'],
    ['D3 A3 D4 F4', 'vi'],
    ['Bb2 Bb3 D4 F4', 'IV'],
    ['C3 Bb3 C4 E4', 'V7'],
    ['F3 A3 C4 F4', 'I']
  ], 'A7 同样暂时强调 Dm。后续 B♭–C7–F 回到原调，Dm 仍只承担 F 大调的 vi。')
};

mountHarmonyOptions({
  'chromatic-modulation-example': chromaticModulation,
  'pivot-tonicization-example': pivotTonicization
});
