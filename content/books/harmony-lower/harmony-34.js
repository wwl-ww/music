import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';
import { mountScore } from '../../shared/formats/score.js';

function phrase(title, rows, description, key = 'C') {
  const measures = rows.map(row => typeof row[0] === 'string' ? [row] : row);
  return { title, notes: labelledChordScore(measures, key), description };
}

const italian = ['Ab2 C3 C4 F#4', 'It+6'];
const french = ['Ab2 D3 C4 F#4', 'Fr+6'];
const german = ['Ab2 Eb3 C4 F#4', 'Ger+6'];
const enharmonic = ['Ab2 D#3 C4 F#4', '+6'];
const augmentedFifth = ['Ab2 E3 C4 F#4', '+6'];

const majorSixFour = ['G2 E3 C4 G4', 'K6/4'];
const minorSixFour = ['G2 Eb3 C4 G4', 'K6/4'];
const dominant = ['G2 D3 B3 G4', 'V'];
const dominantSeventh = ['G2 D3 B3 F4', 'V7'];
const majorTonic = ['C3 E3 C4 G4', 'I'];
const minorTonic = ['C3 Eb3 C4 G4', 'i'];

mountHarmonyOptions({
  'augmented-sixth-interval': {
    expanded: {
      notes: String.raw`\ks C \ts (2 4) (Ab4 F#5).2 { txt "+6" } | (G4 G5).2 { txt "8" }`,
      description: 'A♭4 下行到 G4，F♯5 上行到 G5。两条半音线把增六度扩张为纯八度。'
    },
    seventh: {
      notes: String.raw`\ks C \ts (2 4) (Ab4 Gb5).2 { txt "m7" } | (Db5 F5).2 { txt "M3" }`,
      description: 'A♭–G♭ 可作为 A♭7 的根音与七音。七音下行到 F，低音到 D♭。'
    },
    chordAugmented: phrase('德意志增六到终止四六', [
      german, majorSixFour, dominant
    ], '四部同响时，谱上的 F♯ 上行、A♭ 下行，终止四六的低音和高音都到 G。'),
    chordDominant: phrase('A♭7 到 D♭', [
      ['Ab2 Eb3 C4 Gb4', 'Db: V7'], ['Db3 Db3 Db4 F4', 'I']
    ], '起始琴键相同。G♭ 作为七音下行到 F，C 上行到 D♭，低音到 D♭。')
  }
});

const basicTypes = {
  italian: ['意大利增六', italian, '四部写法重复低音上方的大三度音 C。'],
  french: ['法兰西增六', french, '增四度 A♭–D 与外侧的增六度同时存在。'],
  german: ['德意志增六', german, 'A♭ 与 E♭ 构成纯五度。']
};
const majorTypes = {
  ...basicTypes,
  enharmonic: ['倍增三四', enharmonic, '德意志式的 E♭ 写作 D♯，在大调终止四六中上行到 E。'],
  augmentedFifth: ['大调倍增五六', augmentedFifth, 'A♭–E 是增五度，E 保持到大调终止四六。']
};

function typeExamples(types, sixFour, tonic, key) {
  return Object.fromEntries(Object.entries(types).map(([id, [title, chord, detail]]) => [
    id, phrase(title, [chord, sixFour, dominant, tonic], detail, key)
  ]));
}

const entryExamples = {
  fromSubdominant: phrase('从 IV₆ 引入', [
    ['A2 C3 C4 F4', 'IV6'], italian, majorSixFour, dominant
  ], 'IV₆ 的 A、F 在同一声部各变半音，分别成为增六度的下方音与上方音。'),
  fromMinorSubdominant: phrase('c 小调从 iv₆ 引入', [
    ['Ab2 C3 C4 F4', 'iv6'], italian, minorSixFour, dominant, minorTonic
  ], 'A♭ 已在 c 小调的音阶内。只升高原来高声部的 F，就能形成相同的意大利式增六。', 'Cminor'),
  fromSixth: phrase('从 vi 引入', [
    ['A2 E3 C4 E4', 'vi'], italian, majorSixFour, dominant
  ], 'vi 的低音 A 降到 A♭，中声部 C 可以保留。'),
  fromTonic: phrase('从 I₆ 引入', [
    ['E3 C4 C4 G4', 'I6'], ['Ab3 C4 C4 F#4', 'It+6'],
    ['G3 C4 E4 G4', 'K6/4'], ['G3 B3 D4 G4', 'V']
  ], '低音 E 上行到 A♭ 写作减四度，两个内声部保留 C。')
};

const resolutionExamples = {
  cadential: phrase('经终止四六到 V', [
    german, majorSixFour, dominant, majorTonic
  ], '外声部先到 G 的八度。E♭ 到 E，经过终止四六后才到属和弦。'),
  italianDirect: phrase('意大利式直接到 V', [
    italian, dominant
  ], 'A♭、F♯ 反向半音到 G，两个 C 各进入相邻的 D 与 B。'),
  frenchDirect: phrase('法兰西式直接到 V', [
    french, ['G2 D3{t} B3 G4', 'V']
  ], '法兰西式含有 D，进入属和弦时这个音可以保持。'),
  germanDirect: phrase('德意志式直接到 V', [
    german, dominant
  ], '下方 A♭–E♭ 同向走到 G–D，形成莫扎特五度。'),
  germanToFrench: phrase('先改成法兰西式', [
    [[german[0], german[1], '4'], ['Ab2{t} D3 C4{t} F#4{t}', 'Fr+6', '4']],
    ['G2 D3{t} B3 G4', 'V']
  ], 'E♭ 提前到 D。低音随后下行到 G 时，D 保持。'),
  delayedFifth: phrase('属和弦内延后解决 E♭', [
    german,
    [['G2 Eb3{t} B3 G4', 'V', '4'], ['G2{t} D3 B3{t} G4{t}', '', '4']]
  ], '先到达属低音 G，原来的 E♭ 保持到强位，再下行到 D。'),
  seventh: phrase('同向半音到 V₇', [
    [[italian[0], italian[1], '4'], [dominantSeventh[0], dominantSeventh[1], '4']],
    ['C3 C3 C4 E4', 'I']
  ], 'A♭ 与 F♯ 同向下行到 G 和 F，属七中的两音形成小七度。'),
  tonicRoot: phrase('直接到原位 I', [
    italian, ['C3 E3 C4 G4', 'I']
  ], '低音跳至主音 C，高音 F♯ 仍上行到 G。'),
  tonicSixth: phrase('直接到第一转位 I₆', [
    ['Ab3 C4 E4 F#4', '+6'], ['E3 C4{t} E4{t} G4', 'I6']
  ], '低音 A♭ 下跳到三音 E，两个内声部保持。'),
  tonicPedal: phrase('在主音上作辅助', [
    ['C3 G3 E4 G4', 'I'], ['C3{t} Ab3 C4 F#4', '+6'], ['C3{t} G3 E4 G4', 'I']
  ], 'C 作为持续低音。上方 A♭ 和 F♯ 回到两个 G。'),
  towardSubdominant: phrase('主四六后进 IV', [
    italian, ['G2 E3 C4 G4', 'I6/4'], ['F2 F3 C4{t} A4', 'IV']
  ], '两条半音线先归到属音八度，随后的 IV 让主四六成为连接的一环。'),
  towardSupertonic: phrase('主四六后进 ii₆₅', [
    italian, ['G2 E3 C4 G4', 'I6/4'], ['F2 A3 C4{t} D4', 'ii6/5']
  ], '同一个主四六也可通往 ii₆₅。F 是下属方向的低音。')
};

const raisedSubdominant = ['F3 A3 C4 D#4', 'IV+6'];
const subdominantExamples = {
  raiseSixth: phrase('附加六度升高半音', [
    ['F3 A3 C4 D4', 'IV(add6)'], ['F3{t} A3{t} C4{t} D#4', 'IV+6']
  ], '附加的 D 升为 D♯，低音 F 与最高声部的距离成为增六度。'),
  tonicSixth: phrase('反向解决到 I₆', [
    raisedSubdominant, ['E3 G3 C4{t} E4', 'I6']
  ], 'F 与 D♯ 分别到达两个 E，所以 I₆ 重复三音。'),
  plagalRoot: phrase('下属增六作变格收束', [
    raisedSubdominant, ['C3 G3 C4{t} E4', 'I']
  ], '低音由 F 下跳纯四度到 C，高音 D♯ 上行到 E。')
};

const neapolitanExamples = {
  majorInverted: phrase('大调解决到 I₆', [
    ['F3 Ab3 Db4 B4', 'bII6 + B'], ['E3 G3 C4 C5', 'I6']
  ], 'F 在低音。上方 D♭ 和 B 反向走到两个 C。'),
  minorInverted: phrase('小调解决到 i₆', [
    ['D3 F3 Bb3 G#4', 'bII6 + G#'], ['C3 E3 A3 A4', 'i6']
  ], 'a 小调中，降Ⅱ级 B♭ 与导音 G♯ 汇合在主音 A。', 'Aminor'),
  tonicRoot: phrase('那波里增六作变格收束', [
    ['F3 Db4 Ab4 B4', 'bII6 + B'], ['C3 C4 E4 C5', 'I']
  ], '低音从 F 跳到 C。上方的 D♭ 与 B 仍各走半音到 C。')
};

const localExamples = {
  towardMinor: phrase('副属增六到 ii', [
    ['C3 G3 E4 C5', 'I'], ['Eb3 A3 G4 C#5', 'V4/3(b5)/ii'],
    ['D3 A3 F4 D5', 'ii'], ['G2 G3 F4 B4', 'V7'], ['C3 G3{t} E4 C5', 'I']
  ], 'A7 的五音降为 E♭ 并置于低音。E♭ 与 C♯ 围住临时主音 D。'),
  towardDominant: phrase('副下属增六到 V 的第一转位', [
    ['C3 G3 E4 C5', 'I'], ['C3 G3{t} E4{t} A#4', 'IV+6/V'],
    ['B2 G3{t} D4 B4', 'V6'], ['C3 G3{t} E4 G4', 'I']
  ], '以 G 为临时中心时，C 与 A♯ 构成下属增六，向两个 B 解决。'),
  towardMediant: phrase('b 小调中暂向 III 收束', [
    ['B2 B3 D4 F#4', 'i'], ['G3 B3{t} D4{t} E#4', 'IV+6/III'], ['D3 A3 D4{t} F#4', 'III'],
    ['F#2 F#3 A#3 E4', 'V7'], ['B2 F#3{t} B3 D4', 'i']
  ], 'G 和 E♯ 构成 D 大和弦的下属增六骨架，后续仍回到 b 小调。', 'Bminor'),
  towardSubmediant: phrase('b 小调中暂向 VI 收束', [
    ['B2 B3 D4 F#4', 'i'], ['C3 G3 E4 A#4', 'IV+6/VI'], ['G2 G3{t} D4 B4', 'VI'],
    ['F#2 A#3 E4 C#5', 'V7'], ['B2 B3 D4 B4', 'i']
  ], 'C 到 G，A♯ 到 B，先变格式地突出 G 大和弦，再回到 b 小调。', 'Bminor')
};

function mountFiltered(id, families) {
  const demo = document.getElementById(id);
  const category = demo.querySelector('[name="category"]');
  const example = demo.querySelector('[name="example"]');
  const figure = demo.querySelector('figure');
  const cue = demo.querySelector('output');
  let playback;

  function render() {
    const { notes, description } = families[category.value][example.value];
    cue.textContent = description;
    if (playback) playback.setNotes(notes);
    else playback = mountScore(figure, { notes, notation: 'staff', tempo: 100 });
  }

  function updateOptions() {
    const selected = example.value;
    const choices = Object.entries(families[category.value]);
    example.replaceChildren(...choices.map(([value, item]) => new Option(item.title, value, false, value === selected)));
    render();
  }

  category.addEventListener('change', updateOptions);
  example.addEventListener('change', render);
  updateOptions();
}

mountFiltered('augmented-sixth-types', {
  major: typeExamples(majorTypes, majorSixFour, majorTonic, 'C'),
  minor: typeExamples(basicTypes, minorSixFour, minorTonic, 'Cminor')
});
mountFiltered('augmented-sixth-connections', { entries: entryExamples, resolutions: resolutionExamples });
mountFiltered('augmented-sixth-functions', {
  subdominant: subdominantExamples, neapolitan: neapolitanExamples, local: localExamples
});
