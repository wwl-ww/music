import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';
import { mountScore } from '../../shared/formats/score.js';
import { displayPitch } from '../../shared/formats/pitch.js';

function progression(key, chords) {
  return labelledChordScore(chords.map(chord => [chord]), key);
}

const scores = {
  direct: progression('C', [
    ["C3 C4 E4 G4","I"],
    ["F3 C4 F4 A4","IV"],
    ["D3 C4 F#4 A4","V7/V"],
    ["G2 B3 G4 D5","V"],
    ["C3 C4 G4 E5","I"]
  ]),
  cadence: progression('C', [
    ["D3 A3 F4 D5","ii"],
    ["D3 A3 F#4 C5","V7/V"],
    ["G2 E4 G4 C5","K6/4"],
    ["G2 D4 F4 B4","V7"],
    ["C3 G3 E4 C5","I"]
  ]),
  minor: progression('Aminor', [
    ["A2 A3 C4 E4","i"],
    ["D3 A3 D4 F4","iv"],
    ["B2 A3 D#4 F#4","V7/V"],
    ["E2 G#3 E4 B4","V"],
    ["A2 A3 E4 C5","i"]
  ]),
  rootSeventh: progression('C', [
    ["D3 F#3 C4 A4","V7/V"],
    ["G2 G3 B3 F4","V7"],
    ["C3 G3 C4 E4","I"]
  ]),
  invertedSeventh: progression('C', [
    ["C3 A3 D4 F#4","V4/2/V"],
    ["B2 G3 D4 F4","V6/5"],
    ["C3 G3 C4 E4","I"]
  ]),
  dim: progression('C', [
    ["C3 G3 C4 E4","I"],
    ["Eb3 A3 C4 F#4","vii°4/2/V"],
    ["E3 C4 C4 G4","I6"]
  ]),
  tonicEntry: progression('C', [
    ['C3 C4 E4 G4','I'], ['F#2 C4 Eb4 A4','vii°7/V'], ['G2 B3 D4 G4','V']
  ]),
  sixthEntry: progression('C', [
    ['A2 C4 E4 A4','vi'], ['D3 C4 F#4 A4','V7/V'], ['G2 B3 G4 D5','V']
  ]),
  rootNinth: String.raw`\ks C \ts (2 4)
    A4.2 { txt "V7/V" } | (F4 A4).2 { txt "V9" } | (E4 G4).2 { txt "I" } ||
    \voice C4.2 | B3.2 | C4.2 ||
    \staff { score } \tuning (none) \clef F4 F#3.2 | G3.2 | G3.2 ||
    \voice D3.2 | G2.2 | C3.2`,
  enharmonicCadence: progression('C', [
    ['F#3 C4 D#4 A4','vii°7/V'], ['G3 C4 E4 G4','K6/4'],
    ['G3 B3 D4 G4','V'], ['C3 G3 C4 E4','I']
  ]),
  half: progression('C', [
    ['C3 C4 E4 G4','I'], ['F3 C4 F4 A4','IV'],
    ['D3 C4 F#4 A4','V7/V'], ['G2 B3 G4 D5','V']
  ]),
  inside: progression('C', [
    ['C3 G3 E4 G4','I'], ['C3 A3 D4 F#4','V4/2/V'], ['B2 G3 D4 F4','V6/5'],
    ['C3 G3 C4 E4','I'], ['F3 A3 C4 F4','IV']
  ]),
  neighbor: progression('C', [
    ['E3 C4 C4 G4','I6'], ['Eb3 A3 C4 F#4','vii°4/2/V'], ['E3 C4 C4 G4','I6']
  ]),
  localDominant: progression('C', [
    ["C3 C4 G4 E5","I"],
    ["A2 C#4 G4 E5","V7/ii"],
    ["D3 D4 F4 A4","ii"],
    ["G2 D4 F4 B4","V7"],
    ["C3 G3 E4 C5","I"]
  ]),
  fourth: progression('C', [
    ["C3 C4 E4 G4","I"],
    ["C3 Bb3 E4 G4","V7/IV"],
    ["F2 A3 F4 C5","IV"],
    ["G2 D4 F4 B4","V7"],
    ["C3 G3 E4 C5","I"]
  ]),
  third: progression('C', [
    ["C3 E4 G4 C5","I"],
    ["B2 B3 A4 D#5","V7/iii"],
    ["E3 B3 G4 E5","iii"],
    ["F3 A3 F4 C5","IV"],
    ["G3 D4 F4 B4","V7"],
    ["C3 C4 E4 C5","I"]
  ]),
  minorSeventh: progression('Aminor', [
    ["A2 C4 E4 A4","i"],
    ["D3 A3 F#4 C5","V7/VII"],
    ["G2 D4 G4 B4","VII"],
    ["E3 D4 G#4 B4","V7"],
    ["A2 C4 A4 E5","i"]
  ]),
  sixth: progression('C', [
    ["C3 C4 G4 E5","I"],
    ["E3 B3 G#4 D5","V7/vi"],
    ["A2 E4 A4 C5","vi"],
    ["D3 F4 A4 D5","ii"],
    ["G3 F4 B4 D5","V7"],
    ["C3 E4 C5 G5","I"]
  ]),
  deceptive: progression('C', [
    ["C3 C4 G4 E5","I"],
    ["E3 B3 G#4 D5","V7/vi"],
    ["F3 A3 A4 C5","IV"],
    ["G3 D4 B4 F5","V7"],
    ["C3 G4 C5 E5","I"]
  ]),
  localCadence: progression('C', [
    ["C3 C4 G4 E5","I"],
    ["E3 Bb3 G4 D5","iiø7/ii"],
    ["A2 A3 G4 C#5","V7/ii"],
    ["D3 A3 F4 D5","ii"],
    ["G2 B3 F4 D5","V7"],
    ["C3 C4 E4 C5","I"]
  ]),
  plagalAux: progression('C', [
    ["C3 E3 C4 G4","I"],
    ["G2 D3 Bb3 G4","iv/ii"],
    ["D3 F3 A3 D4","ii"],
    ["G2 F3 B3 D4","V7"],
    ["C3 E3 C4 E4","I"]
  ]),
  doubleSub: progression('C', [
    ["C3 G3 E4 C5","I"],
    ["Bb2 Bb3 F4 D5","SS"],
    ["F2 A3 F4 C5","IV"],
    ["G2 D4 F4 B4","V7"],
    ["C3 G3 E4 C5","I"]
  ]),
  sequence: progression('C', [
    ["C3 C4 G4 E5","I"],
    ["D3 A3 F#4 C5","V7/V"],
    ["G2 D4 G4 B4","V"],
    ["C3 G3 E4 Bb4","V7/IV"],
    ["F2 C4 F4 A4","IV"],
    ["G2 G3 F4 B4","V7"],
    ["C3 G3 E4 C5","I"]
  ]),
  chain: progression('C', [
    ["C3 E4 G4 C5","I"],
    ["E3 D4 G#4 B4","E7"],
    ["A2 C#4 G4 E5","A7"],
    ["D3 A3 F#4 C5","V7/V"],
    ["G2 D4 F4 B4","V7"],
    ["C3 G3 E4 C5","I"]
  ]),
  aToC: progression('Aminor', [
    ["D3 A3 F4 D5","a: iv"],
    ["E3 G#3 E4 D5","V7"],
    ["A2 A3 E4 C5","a: i = C: vi"],
    ["F2 A3 F4 C5","C: IV"],
    ["G2 G3 E4 C5","K6/4"],
    ["G2 F3 D4 B4","V7"],
    ["C3 E3 C4 C5","I"]
  ]),
  cToA: progression('C', [
    ["F2 A3 F4 C5","C: IV"],
    ["G2 D4 F4 B4","V7"],
    ["C3 G3 E4 C5","I"],
    ["D3 B3 F4 A4","C: viiø6/5 = a: iiø6/5"],
    ["E3 B3 E4 G#4","a: V"],
    ["A2 C4 E4 A4","i"]
  ]),
  directChange: progression('C', [
    ["F2 A3 F4 C5","C: IV"],
    ["G2 D4 F4 B4","V7"],
    ["C3 G3 E4 C5","I"],
    ["r r r r",""],
    ["E3 G#3 E4 D5","a: V7"],
    ["A2 A3 E4 C5","i"],
    ["D3 A3 F4 D5","iv"],
    ["E3 G#3 E4 D5","V7"],
    ["A2 A3 E4 C5","i"]
  ])
};

const comparisons = {
  'double-dominant-example': {
    direct: { notes: scores.direct, description: "F–F♯–G 构成半音引入与解决。重属七和弦的七音 C 下行到属和弦的三音 B。" },
    cadence: { notes: scores.cadence, description: "F♯ 上行到 G。C 先在终止四六中保持，再下行到属七和弦的 B。" },
    minor: { notes: scores.minor, description: "B7 的 D♯ 是临时导音，指向属和弦 E。属和弦中的 G♯ 随后指向 a 小调主音 A。" },
    tonicEntry: { notes: scores.tonicEntry, description: '主和弦的 C 保持，E 下行到 E♭。低音 F♯ 上行到 G。' },
    sixthEntry: { notes: scores.sixthEntry, description: 'vi 和重属七共有 A、C，只在另一声部引入临时导音 F♯。' },
    rootSeventh: { notes: scores.rootSeventh, description: "次中音的 F♯ 向 G 解决，高音另奏 F。升Ⅳ级与自然Ⅳ级出现在不同声部，构成对斜。" },
    rootNinth: { notes: scores.rootNinth, description: 'F♯ 在次中音上行到 G，属九的 F 出现在上方；九音 A 保持后下行到 G。' },
    invertedSeventh: { notes: scores.invertedSeventh, description: "两个七和弦都用转位。F♯–F–E 由同一个高音声部承担，低音 C–B–C 走级进。" },
    enharmonicCadence: { notes: scores.enharmonicCadence, description: '减七音 E♭ 按声部方向写为 D♯，上行半音到终止四六的 E。' },
    dim: { notes: scores.dim, description: "低音 E♭ 向 E 移动，C 保持，F♯ 到 G。重属减七的第三转位在两个主功能和弦之间形成辅助进行。" }
  },
  'double-dominant-placement': {
    half: { notes: scores.half, description: '重属加强 G 大三和弦，乐句在本调属和弦上停顿。' },
    full: { notes: scores.direct, description: '保持同一引入和解决，再由 G 到 C，完成全终止。' },
    inside: { notes: scores.inside, description: '重属七与属七采用转位，低音保持在 C–B–C 的级进范围。' },
    neighbor: { notes: scores.neighbor, description: '重属减七插在两个 I₆ 之间。低音和高音分别绕行，C 作为共同音保留。' }
  },
  'secondary-dominant-example': {
    localDominant: { notes: scores.localDominant, description: "临时导音 C♯ 上行到 D，七音 G 下行到 F。回到 V7–I 后，D 小三和弦仍是 C 大调的 ii。" },
    fourth: { notes: scores.fourth, description: "起始 I 和 V7/IV 都以 C 为根音。加入 B♭ 后形成向 F 解决的属七功能。" },
    third: { notes: scores.third, description: "D♯ 到 E、A 到 G 都是针对 e 小调的解决。Em 后接 IV–V7–I，最终收束在 C 大调。" },
    minorSeventh: { notes: scores.minorSeventh, description: "D7 指向 a 自然小调的 VII。G 大三和弦出现后，再由 E7–Am 收束原来的小调。" },
    sixth: { notes: scores.sixth, description: "E7 到 Am 时，G♯ 上行到 A，D 下行到 C。" },
    deceptive: { notes: scores.deceptive, description: "E7 仍有 G♯–A 和 D–C 的解决，但低音 E 上行到 F。F 是临时 a 小调的 VI，也是本调的 IV。" }
  },
  'tonicization-example': {
    localDominant: { notes: scores.localDominant, description: "A7 把 Dm 暂时当作主和弦，后续 G7–C 回到原调。" },
    localCadence: { notes: scores.localCadence, description: "Eø7、A7、Dm 在局部构成 iiø7–V7–i。B♭ 属于临时 d 小调的音列。" },
    plagalAux: { notes: scores.plagalAux, description: "Gm–Dm 在局部构成 iv–i。这里由副下属直接到临时主和弦，省去了副属。" },
    doubleSub: { notes: scores.doubleSub, description: "B♭ 大三和弦是 F 大调的 IV，从 C 大调看是重下属。F 在局部受到支持，随后仍按本调 IV 的功能进行。" }
  },
  'tonicization-sequence': {
    sequence: { notes: scores.sequence, description: "先以 D7–G 指向 G，再把这种关系移到 C7–F。两个临时主和弦 G、F 依次下降二度。" },
    chain: { notes: scores.chain, description: "E7、A7、D7、G7 的根音连续按纯五度下行。预期的临时主和弦改变成新的属七，直到 C 大调主和弦才稳定。" }
  },
  'relative-modulation-example': {
    aToC: { notes: scores.aToC, description: "先用 a 小调的属七到主和弦。Am 接作 C 大调的 vi，再走向 C 大调的终止。" },
    cToA: { notes: scores.cToA, description: "同一组 B、D、F、A 在 C 大调是导七和弦，在 a 小调是 iiø7。D 在低音时两者均为第一转位。之后以 E–Am 确立新主音。" },
    directChange: { notes: scores.directChange, description: "C 大调先完整终止。停顿后直接从 a 小调的属七和弦开始新乐句，再在 a 小调内完成终止。" }
  }
};

mountHarmonyOptions(comparisons);

const doubleDominants = {
  major: {
    signature: 'C',
    target: 'G4 B4 D5',
    triad: 'D4 F#4 A4',
    seventh: 'D4 F#4 A4 C5',
    ninth: 'D4 F#4 A4 C5 E5',
    leadingTriad: 'F#4 A4 C5',
    halfDiminished: 'F#4 A4 C5 E5',
    diminished: 'F#4 A4 C5 Eb5',
    thirteenth: 'D4 F#4 C5 Bb5'
  },
  minor: {
    signature: 'Aminor',
    target: 'E4 G#4 B4',
    triad: 'B3 D#4 F#4',
    seventh: 'B3 D#4 F#4 A4',
    ninth: 'B3 D#4 F#4 A4 C5',
    leadingTriad: 'D#4 F#4 A4',
    diminished: 'D#4 F#4 A4 C5',
    thirteenth: 'B3 D#4 A4 G5'
  }
};

const doubleDominantLabels = {
  triad: ['重属三和弦', 'V/V'],
  seventh: ['重属七和弦', 'V7/V'],
  ninth: ['重属九和弦', 'V9/V'],
  leadingTriad: ['重属导三和弦', 'vii°/V'],
  halfDiminished: ['重属半减七和弦', 'viiø7/V'],
  diminished: ['重属减七和弦', 'vii°7/V'],
  thirteenth: ['重属七—十三和弦', 'V₇¹³/V']
};

const forms = document.getElementById('double-dominant-forms');
if (forms) {
  const key = forms.querySelector('[name="key"]');
  const shape = forms.querySelector('[name="shape"]');
  const figure = forms.querySelector('figure');
  const cue = forms.querySelector('output');
  let playback;

  function render() {
    const { signature, target, ...chords } = doubleDominants[key.value];
    const chord = chords[shape.value];
    const [, label] = doubleDominantLabels[shape.value];
    const notes = String.raw`\ks ${signature} \ts (2 4) (${chord}).2 { txt "${label}" } | (${target}).2 { txt "V" }`;
    const pitchNames = pitches => pitches.split(' ').map(pitch => displayPitch(pitch.slice(0, -1))).join('–');
    cue.textContent = `${pitchNames(chord)} → ${pitchNames(target)}`;
    if (playback) playback.setNotes(notes);
    else playback = mountScore(figure, { notes, notation: 'staff', tempo: 100 });
  }

  function changeKey() {
    const previous = shape.value;
    const available = Object.entries(doubleDominantLabels).filter(([id]) => doubleDominants[key.value][id]);
    shape.replaceChildren(...available.map(([id, [label]]) => new Option(label, id, false, id === previous)));
    render();
  }

  key.addEventListener('change', changeKey);
  shape.addEventListener('change', render);
  changeKey();
}
