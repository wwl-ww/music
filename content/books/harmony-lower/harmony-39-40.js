import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';

// Each entry is one measure, with pitches ordered bass, tenor, alto, soprano.
function study(key, description, chords) {
  return { notes: labelledChordScore(chords.map(chord => [chord]), key), description };
}

const minorMixture = {
  plagal: study('Aminor', 'D 大三和弦直接回到 a 小调的主和弦。', [
    ['A2 A3 C4 E4', 'i'],
    ['D3 A3 D4 F#4', 'IV'],
    ['A2 A3 C4 E4', 'i']
  ]),
  compound: study('Aminor', '大下属与终止四六、属七、主和弦构成下属—属—主的收束。', [
    ['A2 C4 E4 A4', 'i'],
    ['D3 D4 F#4 A4', 'IV'],
    ['E3 C4 E4 A4', 'K₆₄'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C4 A4 E5', 'i']
  ]),
  contrast: study('Aminor', '两次变格都回到 Am，下属三音先用 F♯，后用 F。', [
    ['A2 C4 A4 E5', 'i'],
    ['D3 D4 A4 F#5', 'IV'],
    ['A2 C4 A4 E5', 'i'],
    ['D3 D4 A4 F5', 'iv'],
    ['A2 C4 A4 E5', 'i']
  ]),
  descendingBass: study('Aminor', '副属引入经过性的 IV₆。低音从 G 经 F♯、F 降到 E。', [
    ['A3 C4 E4 A4', 'i'],
    ['G#3 B3 E4 B4', 'V₆'],
    ['G3 A3 E4 C#5', 'V₄₂/IV'],
    ['F#3 A3 D4 D5', 'IV₆'],
    ['F3 A3 D#4 C5', '增六'],
    ['E3 A3 E4 C5', 'K₆₄'],
    ['E3 B3 G#4 D5', 'V7'],
    ['A2 E4 A4 C5', 'i']
  ])
};

const minorSupertonic = {
  subdominant: study('Aminor', 'IV 与 ii 共有 D、F♯。下属方向随后进入属与主。', [
    ['A2 C4 E4 A4', 'i'],
    ['D3 D4 F#4 A4', 'IV'],
    ['B2 D4 F#4 B4', 'ii'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C4 A4 E5', 'i']
  ]),
  minorDominant: study('Aminor', 'Bm–Em 相当于 e 自然小调的 v–i，末段的 E7–Am 恢复 a 小调。', [
    ['A2 A3 E4 C5', 'i'],
    ['B2 F#3 D4 B4', 'ii'],
    ['E3 G3 E4 B4', 'v'],
    ['B2 F#3 D4 B4', 'ii'],
    ['E3 G3 E4 B4', 'v'],
    ['E3 B3 G#4 D5', 'V7'],
    ['A2 E4 A4 C5', 'i']
  ]),
  majorDominant: study('Aminor', 'Bm 引向带 G♯ 的 E。属功能随后解决到 A。', [
    ['A2 E4 A4 C5', 'i'],
    ['B2 D4 F#4 B4', 'ii'],
    ['E3 E4 G#4 B4', 'V'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C4 A4 E5', 'i']
  ])
};

const raisedSubmediant = {
  deceptive: study('Aminor', 'E7 的低音上行到 F♯。导音仍解决到 A，F♯ 小三和弦重复三音。', [
    ['A2 C4 E4 A4', 'i'],
    ['E3 B3 D4 G#4', 'V7'],
    ['F#3 A3 C#4 A4', '♯vi']
  ]),
  passing: study('Aminor', '经过的 ♯vi 连接低音 E–F♯–G♯。属七最后回到小主和弦。', [
    ['A2 A3 E4 C5', 'i'],
    ['E3 G#3 E4 B4', 'V'],
    ['F#3 A3 C#4 A4', '♯vi'],
    ['G#3 B3 E4 G#4', 'V₆'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C4 A4 E5', 'i']
  ]),
  neighbor: study('Aminor', 'G♯–F♯–G♯ 构成属低音的下方辅助。', [
    ['A3 C4 E4 A4', 'i'],
    ['G#3 B3 E4 B4', 'V₆'],
    ['F#3 C#4 F#4 A4', '♯vi'],
    ['G#3 B3 E4 B4', 'V₆'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C4 A4 E5', 'i']
  ])
};

const picardy = {
  minorTonic: study('Aminor', 'E7 按 a 小调的终止走向 Am。', [
    ['A2 E4 A4 C5', 'i'],
    ['D3 D4 A4 F5', 'iv'],
    ['E3 B3 G#4 D5', 'V7'],
    ['A2 E4 A4 C5', 'i']
  ]),
  picardy: study('Aminor', '前半句相同，终止主三和弦仅把 C 升为 C♯。', [
    ['A2 E4 A4 C5', 'i'],
    ['D3 D4 A4 F5', 'iv'],
    ['E3 B3 G#4 D5', 'V7'],
    ['A2 E4 A4 C#5', 'I']
  ]),
  alternatingTonic: study('Aminor', 'A 与 Am 在乐句中交替出现，主音与五音都保持。', [
    ['A2 A3 E4 C5', 'i'],
    ['G2 B3 G4 D5', 'VII'],
    ['A2 A3 E4 C#5', 'I'],
    ['G2 B3 G4 D5', 'VII'],
    ['A2 A3 E4 C5', 'i'],
    ['A2 A3 E4 C#5', 'I'],
    ['A2 A3 E4 C5', 'i']
  ])
};

const minorSubdominant = {
  eFlat: study('C', 'Fm 从 C 大调的 iv 变为 E♭ 大调的 ii。', [
    ['C3 G3 E4 C5', 'I'],
    ['G2 F3 D4 B4', 'V7'],
    ['C3 G3 E4 C5', 'I'],
    ['F3 Ab3 F4 C5', 'iv = ii'],
    ['Bb2 Ab3 F4 D5', 'V7'],
    ['Eb3 Bb3 G4 Eb5', 'I']
  ]),
  aFlat: study('C', 'Fm 从 C 大调的 iv 变为 A♭ 大调的 vi，再进入新调的下属与属。', [
    ['C3 G3 E4 C5', 'I'],
    ['G2 F3 D4 B4', 'V7'],
    ['C3 G3 E4 C5', 'I'],
    ['F3 Ab3 F4 C5', 'iv = vi'],
    ['Db3 Ab3 F4 Db5', 'IV'],
    ['Eb3 Db4 G4 Bb4', 'V7'],
    ['Ab2 C4 Ab4 Eb5', 'I']
  ]),
  dFlat: study('C', 'Fm 从 C 大调的 iv 变为 D♭ 大调的 iii。', [
    ['C3 G3 E4 C5', 'I'],
    ['G2 F3 D4 B4', 'V7'],
    ['C3 G3 E4 C5', 'I'],
    ['F2 Ab3 F4 C5', 'iv = iii'],
    ['Gb2 Gb3 Db4 Bb4', 'IV'],
    ['Ab2 Eb3 C4 Gb4', 'V7'],
    ['Db3 F3 Db4 Ab4', 'I']
  ]),
  aMajor: study('C', 'C 大调的 ii 是 Dm，在 A 大调可作 iv。', [
    ['C3 C4 E4 G4', 'I'],
    ['G2 D4 F4 B4', 'V7'],
    ['C3 E4 G4 C5', 'I'],
    ['D3 D4 F4 A4', 'ii = iv'],
    ['E3 C#4 E4 A4', 'K₆₄'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C#4 A4 E5', 'I']
  ]),
  eMajor: study('C', 'C 大调的 vi 是 Am，在 E 大调可作 iv。', [
    ['C3 G3 E4 C5', 'I'],
    ['G2 F3 D4 B4', 'V7'],
    ['C3 G3 E4 C5', 'I'],
    ['A2 A3 E4 C5', 'vi = iv'],
    ['B2 G#3 E4 B4', 'K₆₄'],
    ['B2 F#3 D#4 A4', 'V7'],
    ['E3 G#3 E4 B4', 'I']
  ]),
  bMajor: study('C', 'C 大调的 iii 是 Em，在 B 大调可作 iv。', [
    ['C3 C4 E4 G4', 'I'],
    ['G2 D4 F4 B4', 'V7'],
    ['C3 E4 G4 C5', 'I'],
    ['E3 E4 G4 B4', 'iii = iv'],
    ['F#3 D#4 F#4 B4', 'K₆₄'],
    ['F#3 E4 A#4 C#5', 'V7'],
    ['B2 D#4 B4 F#5', 'I']
  ])
};

const majorDominant = {
  fSharpMinor: study('Aminor', 'E 在 a 小调作 V，在 f♯ 小调作 VII。新调导音为 E♯。', [
    ['A2 C4 A4 E5', 'i'],
    ['E3 B3 G#4 D5', 'V7'],
    ['A2 E4 A4 C5', 'i'],
    ['E3 E4 G#4 B4', 'V = VII'],
    ['B2 D4 F#4 B4', 'iv'],
    ['C#3 B3 E#4 G#4', 'V7'],
    ['F#2 A3 F#4 C#5', 'i']
  ]),
  cSharpMinor: study('Aminor', 'E 在 a 小调作 V，在 c♯ 小调作 III。新调导音为 B♯。', [
    ['A2 C4 A4 E5', 'i'],
    ['E3 B3 G#4 D5', 'V7'],
    ['A2 E4 A4 C5', 'i'],
    ['E3 E4 G#4 B4', 'V = III'],
    ['F#3 C#4 F#4 A4', 'iv'],
    ['G#3 B#3 D#4 F#4', 'V7'],
    ['C#3 C#4 E4 G#4', 'i']
  ]),
  gSharpMinor: study('Aminor', 'E 在 a 小调作 V，在 g♯ 小调作 VI。新调导音为 F𝄪。', [
    ['A2 C4 A4 E5', 'i'],
    ['E3 B3 G#4 D5', 'V7'],
    ['A2 E4 A4 C5', 'i'],
    ['E3 E4 G#4 B4', 'V = VI'],
    ['C#3 E4 G#4 C#5', 'iv'],
    ['D#3 C#4 Fx4 A#4', 'V7'],
    ['G#2 B3 G#4 D#5', 'i']
  ]),
  cMinor: study('Aminor', 'G 从 a 小调的自然 VII 变为 c 小调的 V。', [
    ['A2 C4 E4 A4', 'i'],
    ['E3 B3 D4 G#4', 'V7'],
    ['A3 C4 E4 A4', 'i'],
    ['G3 D4 G4 B4', 'VII = V'],
    ['Eb3 C4 G4 C5', 'i₆'],
    ['F3 C4 F4 Ab4', 'iv'],
    ['G3 B3 D4 F4', 'V7'],
    ['C3 C4 Eb4 G4', 'i']
  ]),
  fMinor: study('Aminor', 'C 从 a 小调的 III 变为 f 小调的 V。', [
    ['A2 E4 A4 C5', 'i'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C4 A4 E5', 'i'],
    ['C3 C4 G4 E5', 'III = V'],
    ['Ab2 C4 F4 F5', 'i₆'],
    ['Bb2 Bb3 F4 Db5', 'iv'],
    ['C3 G3 E4 Bb4', 'V7'],
    ['F2 C4 F4 Ab4', 'i']
  ]),
  bFlatMinor: study('Aminor', 'F 从 a 小调的 VI 变为 b♭ 小调的 V。', [
    ['A2 C4 E4 A4', 'i'],
    ['E3 B3 D4 G#4', 'V7'],
    ['A3 C4 E4 A4', 'i'],
    ['F3 C4 F4 A4', 'VI = V'],
    ['Db3 Bb3 F4 Bb4', 'i₆'],
    ['Eb3 Bb3 Gb4 Eb5', 'iv'],
    ['F3 Eb4 A4 C5', 'V7'],
    ['Bb2 Db4 Bb4 F5', 'i']
  ]),
  aMajor: study('Aminor', 'E 同时是 a 小调与 A 大调的 V，随后的 C♯ 明确了大调主和弦。', [
    ['A2 C4 E4 A4', 'i'],
    ['E3 B3 D4 G#4', 'V7'],
    ['A3 C4 E4 A4', 'i'],
    ['E3 B3 E4 G#4', 'V = V'],
    ['A2 C#4 E4 A4', 'I'],
    ['D3 D4 F#4 A4', 'IV'],
    ['E3 B3 G#4 D5', 'V7'],
    ['A2 E4 A4 C#5', 'I']
  ]),
  eMajor: study('Aminor', 'E 从 a 小调的 V 变为 E 大调的 I，再由 E 大调的属七确认。', [
    ['A2 C4 E4 A4', 'i'],
    ['E3 B3 D4 G#4', 'V7'],
    ['A3 C4 E4 A4', 'i'],
    ['E3 B3 E4 G#4', 'V = I'],
    ['F#3 A3 C#4 F#4', 'ii'],
    ['B2 A3 D#4 F#4', 'V7'],
    ['E3 B3 E4 G#4', 'I']
  ]),
  bMajor: study('Aminor', 'E/G♯ 从 a 小调的 V₆ 变为 B 大调的 IV₆。', [
    ['A2 E4 A4 C5', 'i'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C4 A4 E5', 'i'],
    ['G#2 B3 E4 E5', 'V₆ = IV₆'],
    ['F#2 B3 F#4 D#5', 'K₆₄'],
    ['F#2 A#3 E4 C#5', 'V7'],
    ['B2 B3 D#4 F#4', 'I']
  ])
};

const combinedModulation = {
  viaFMinor: study('Aminor', 'a 小调先到 C 大调，Fm 打开通往 f 小调和 D♭ 大调的路径。', [
    ['A2 E4 A4 C5', 'i'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C4 A4 E5', 'i = vi'],
    ['D3 A3 F4 D5', 'ii'],
    ['G2 B3 F4 D5', 'V7'],
    ['C3 C4 E4 G4', 'I'],
    ['F3 C4 F4 Ab4', 'iv = i'],
    ['Bb2 Db4 F4 Bb4', 'iv'],
    ['C3 Bb3 E4 G4', 'V7'],
    ['F2 Ab3 F4 C5', 'i = iii'],
    ['Gb2 Gb3 Db4 Bb4', 'IV'],
    ['Ab2 Eb3 C4 Gb4', 'V7'],
    ['Db3 F3 Db4 Ab4', 'I']
  ]),
  twoAccelerations: study('B', 'B 和弦兼作 e 小调的属，Em 并入 C 大调。后段以 Am 连接 a 小调和 E 大调。', [
    ['B2 B3 D#4 F#4', 'I'],
    ['F#2 A#3 C#4 E4', 'V7'],
    ['B2 B3 D#4 F#4', 'I = V'],
    ['E3 B3 E4 G4', 'i = iii'],
    ['D3 D4 F4 A4', 'ii'],
    ['G2 D4 F4 B4', 'V7'],
    ['C3 E4 G4 C5', 'I = III'],
    ['E3 D4 G#4 B4', 'V7'],
    ['A2 C4 A4 E5', 'i = iv'],
    ['B2 B3 G#4 E5', 'K₆₄'],
    ['B2 A3 F#4 D#5', 'V7'],
    ['E3 B3 G#4 E5', 'I']
  ])
};

mountHarmonyOptions({
  'minor-mixture-comparisons': minorMixture,
  'minor-supertonic-directions': minorSupertonic,
  'raised-submediant-directions': raisedSubmediant,
  'picardy-third': picardy,
  'minor-subdominant-routes': minorSubdominant,
  'major-dominant-routes': majorDominant,
  'combined-modulation-routes': combinedModulation
});
