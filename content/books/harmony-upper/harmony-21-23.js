import { labelledChordScore, mountHarmonyOptions, scoreWithAccompaniment } from '../../shared/formats/harmony-score.js';
import { mountScore } from '../../shared/formats/score.js';

function progression(chords, description) {
  return { notes: labelledChordScore(chords.map(chord => [chord]), 'C'), description };
}

function stack(notes, label) {
  return `(${notes}).2 { txt "${label}" }`;
}

function structure(original, variant, description) {
  const chords = original === variant ? [original] : [original, variant];
  const notes = String.raw`\ks C \ts (2 4) ${chords.map(chord => stack(...chord)).join(' | ')}`;
  return { notes, description };
}

const zhi = ['G4 B4 D5', 'V (T)'];
const shang = ['D4 F4 A4', 'ii (d)'];
const zhiStructures = {
  plain: structure(zhi, zhi, 'G–B 是大三度，B 是变宫。'),
  open: structure(zhi, ['G4 D5', '◦V'], '省去变宫 B，保留根音和纯五度。'),
  replaceSecond: structure(zhi, ['G4 A4 D5', '◦V²'], '羽音 A 取代 B，形成根音上方的大二度。'),
  replaceFourth: structure(zhi, ['G4 C5 D5', '◦V⁴'], '宫音 C 取代 B，形成根音上方的纯四度。'),
  addedSixth: structure(zhi, ['G4 B4 D5 E5', 'V⁶'], '保留三音 B，再加入根音上方的大六度 E。'),
  minor: structure(zhi, ['G4 Bb4 D5', 'v'], '三音 B 降为 B♭，主和弦变为小三和弦。'),
  shang: structure(shang, shang, '三音 F 是清角，离徵音 G 一个全音。'),
  shangSecond: structure(shang, ['D4 E4 A4', '◦ii²'], '角音 E 换去偏音 F。'),
  shangFourth: structure(shang, ['D4 G4 A4', '◦ii⁴'], '徵音 G 换去偏音 F。'),
  majorDominant: structure(shang, ['D4 F#4 A4', 'II (D)'], 'F♯ 距主音 G 半音，属到主的倾向增强。')
};

const closeZhi = ['G3 B3 D4 G4', 'V'];
const zhiCadences = {
  minor: progression([['D3 A3 D4 F4', 'ii'], closeZhi], '属三音 F 到 G 是全音，D 作为共同音保留。'),
  seventhStep: progression([['D3 A3 F4 C5', 'ii7'], ['G3 G3 D4 B4', 'V']], '高音 C 逐级下行到 B。'),
  seventhLeap: progression([['D3 A3 F4 C5', 'ii7'], closeZhi], '七音 C 从高音下跳到主音 G。'),
  major: progression([['D3 A3 D4 F#4', 'II'], closeZhi], '升高的三音 F♯ 从高音上行半音到 G。'),
  majorInner: progression([['D3 F#3 D4 A4', 'II'], ['G2 D3 B3 G4', 'V']], 'F♯ 在次中音下行三度到 D，旋律的终点仍是徵。'),
  ninthStep: progression([['D3 C4 A4 E5', 'II9'], ['G3 B3 B4 D5', 'V']], '省去三音 F♯，九音 E 下行到 D，七音 C 下行到 B。'),
  ninthLeap: progression([['D3 A3 C4 E4', 'II9'], ['G2 G3 B3 G4', 'V']], '九音 E 在高声部上跳到 G；七音 C 仍下行到 B。'),
  plagal: progression([['A2 E3 C4 C5', 'vi'], ['G2 G3 D4 B4', 'V']], '羽和弦到徵和弦是常见的变格式收束。'),
  gongPlagal: progression([['C3 G3 E4 C5', 'I'], ['G2 G3 D4 B4', 'V']], '宫音 C 作下属根音，低音按下行四度收束到徵。'),
  mediantPlagal: progression([['E3 G3 E4 B4', 'iii'], ['G3 G3 D4 B4', 'V']], '根音上行三度，G、B 是两个和弦的共同音。'),
  sdt: progression([['A2 A3 E4 C5', 'vi'], ['D3 A3 F4 D5', 'ii'], ['G3 B3 G4 D5', 'V']], '羽–商–徵依次构成下属、属、主。'),
  dst: progression([['D3 A3 F4 D5', 'ii'], ['A2 A3 E4 C5', 'vi'], ['G2 B3 G4 D5', 'V']], '商先转向羽，最后以羽到徵收束。')
};

const gongHinge = [
  ['C3 E4 G4 C5', 'I'], ['D3 D4 F4 A4', 'ii'], ['G3 D4 G4 B4', 'V']
];
const zhiGong = {
  opening: progression([['G2 D4 G4 D5', '◦V'], ...gongHinge],
    '引子先出现徵音的空五度，随后的宫和弦补出 C–E，终点仍由商到徵。'),
  later: progression([
    ['G3 D4 G4 D5', '◦V'], ['D3 D4 A4 D5', '◦ii'], ['G2 D4 G4 D5', '◦V'], ...gongHinge
  ], '前段以徵、商两个空五度交替。较晚出现的宫和弦明确了共同的宫音。')
};

const yuChord = ['A2 A3 E4 C5', 'vi'];
const shangTonic = ['D3 A3 F4 D5', 'ii'];
const shangCadences = {
  basic: progression([yuChord, shangTonic], '羽和弦的根音上行四度到商。'),
  seventhDown: progression([['A2 E3 C4 G4', 'vi7'], ['D3 F3 A3 F4', 'ii']], 'G 下行到 F，主和弦保留五音 A。'),
  seventhUp: progression([['A2 E4 G4 C5', 'vi7'], ['D3 F4 A4 D5', 'ii']], 'G 上行至 A，与 C–D 形成一对平行四度。'),
  ninth: progression([['A2 G3 E4 B4', 'vi9'], ['D3 F3 F4 A4', 'ii']], '羽九省三音 C，九音 B 下行到 A。'),
  open: progression([['A2 G3 E4 C5', 'vi7'], ['D3 A3 D4 D5', '◦ii']], '商和弦省去 F，形成空五度终止。'),
  gong: progression([['C3 G3 E4 C5', 'I'], ['D3 F3 F4 A4', 'ii']], '宫和弦的根音上行二度到商。'),
  gongSixth: progression([['E3 G3 E4 C5', 'I6'], shangTonic], '宫和弦第一转位以 E 为低音，由 E 下行到 D。'),
  compound: progression([['E3 G3 D4 B4', 'iii7'], ['A2 G3 E4 C5', 'vi7'], shangTonic],
    '角七的 D 是徵和弦的一部分；复合的下属方向先到羽，再到商。'),
  tonicSeventh: progression([
    ['A2 G3 E4 C5', 'vi7'], ['D3 A3 F4 C5', 'ii7'], ['A2 G3 E4 C5', 'vi7'], ['D3 A3 F4 C5', 'ii7']
  ], '两个小七和弦轮换，商七保留作为主和弦。')
};

const shangColors = {
  majorTonic: progression([yuChord, ['D3 A3 F#4 D5', 'II']], '羽和弦保留 C，商和弦提亮三音 F♯。'),
  majorDominant: progression([['A2 A3 E4 C#5', 'VI'], shangTonic], '羽和弦的 C♯ 上行半音到 D，结尾保留小主。'),
  minorSubdominant: progression([['G2 G3 D4 Bb4', 'v'], ['A2 E3 C4 A4', 'vi'], ['D3 F3 D4 A4', 'ii']],
    '小下属的 B♭ 向下到 A，与上行的低音 G–A 在音级上合为 A。'),
  both: progression([['A2 A3 E4 C#5', 'VI'], ['D3 A3 F#4 D5', 'II']], '强导音 C♯ 与大主的 F♯ 合起来形成 D 大调式的收束。')
};

const jueChord = ['E3 G3 E4 B4', 'iii'];
const jueCadences = {
  halfDiminished: progression([['B2 A3 F4 D5', 'viiø7'], jueChord], '变宫半减七的 F 与 A 下行，根音 B 到 E。'),
  minorDominant: progression([['B2 F#3 D4 B4', 'vii'], jueChord], '升高五音 F♯ 得到 B 小三和弦，三音仍是 D。'),
  majorDominant: progression([['B2 F#3 B3 D#4', 'VII'], ['E3 G3 B3 E4', 'iii']], '提高的三音 D♯ 上行到 E，五音 F♯ 进入主和弦的三音 G。'),
  majorTonic: progression([['B2 A3 F4 D5', 'viiø7'], ['E3 G#3 E4 B4', 'III']], '终点的 G♯ 让角和弦成为大三和弦。'),
  shang: progression([['D3 A3 F4 C5', 'ii7'], ['E3 G3 G4 B4', 'iii']], '根音 D–E 上行二度，商七的 C 向 B 下行。'),
  alteredShang: progression([['D3 A3 F#4 D5', 'II'], ['E3 G3 G4 B4', 'iii']], '商和弦升高三音为 F♯，根音仍从 D 进到 E。'),
  replacedShang: progression([['D3 A3 G4 C5', '◦ii₇⁴'], ['E3 G3 G4 B4', 'iii']], 'F 换成正音 G，商七换音和弦包含除角音外的四个五声骨干音。'),
  yu: progression([['A3 E4 A4 C5', 'vi'], ['E3 E4 G4 B4', 'iii']], '羽和弦全由正音构成，E 可保留为主和弦根音。'),
  gong: progression([['C3 G3 E4 C5', 'I'], jueChord], '上行三度的根音关系保留 E 和 G，收束较柔和。')
};

const cPhrase = [
  ['C3 E4 G4 C5', 'I'], ['F3 F4 A4 C5', 'IV'], ['G3 D4 G4 B4', 'V'], ['C4 E4 G4 C5', 'I (T)']
];
const aPhrase = [
  ['A2 A3 E4 C5', 'vi (t)'], ['E3 G3 E4 B4', 'iii'], ['A2 A3 E4 C5', 'vi'],
  ['D3 F3 F4 A4', 'ii'], ['E3 B3 E4 G4', 'iii'], ['A3 C4 E4 A4', 'vi (t)']
];
const silence = ['r r r r', ''];
const repeatStart = [['D3 F3 F4 A4', 'ii'], ['C3 G3 E4 C5', 'I']];
const gongEnding = [['G2 G3 D4 B4', 'V'], ['C3 G3 E4 C5', 'I (T)']];
const modalAlternation = {
  relative: progression([
    ['C3 E4 G4 C5', 'I'], ['E3 E4 G4 B4', 'iii'], ['A3 E4 A4 C5', 'vi'],
    ['G3 G4 B4 D5', 'V'], ['C4 G4 C5 E5', 'I']
  ], '角–羽局部加强 vi，进入 V–I 后仍归宫，没有独立的羽调式乐句。'),
  gradual: progression([
    ['D3 A3 D4 F4', 'ii'], ['G3 B3 D4 G4', 'V'], ['A3 C4 C4 E4', 'vi'],
    ['G3 B3 D4 G4', 'V (T)'], ['E3 C4 E4 G4', 'I6'], ['E3 D4 G4 B4', 'iii7'],
    ['A2 E4 G4 C5', 'vi7'], ['D3 F4 A4 D5', 'ii'], ['E3 D4 G4 B4', 'iii7'],
    ['A2 E4 A4 C5', 'vi'], ['D3 F4 A4 D5', 'ii (t)']
  ], '徵先获属和弦支持。中间经过宫六与角七，末段两次由羽归商。'),
  direct: progression([...cPhrase, silence, ...aPhrase],
    '第一句完整归宫。新段从羽和弦开始，最后用角–羽收束。'),
  lastEnding: progression([
    ...repeatStart, ...gongEnding, ...repeatStart, ...gongEnding,
    ...repeatStart, ['A2 C4 A4 E5', 'vi'], ['G2 D4 B4 G5', 'V (T)']
  ], '前两次收在宫，最后一次由羽到徵，换了收束中心。'),
  postlude: progression([
    ...repeatStart, ...gongEnding, silence,
    ['A2 A3 C4 E4', 'vi'], ['D3 A3 D4 F4', 'ii'], ['G3 B3 D4 G4', 'V (T)']
  ], '原段在宫结束。独立后奏用下属—属—主的进行归徵。')
};

function twoLayers(melody, accompaniment, description) {
  return { notes: scoreWithAccompaniment(melody, accompaniment), description };
}

const layerOpeningMelody = 'E5.4 D5.4 | C5.2 | B4.2 | C5.2';
const layerOpeningChords = ['C3 E3 G3', 'C3 E3 G3', 'G2 B2 D3', 'C3 E3 G3'];
const zhiPhraseMelody = 'G4.2 | G4.4 E4.4 | D4.4 A4.4 | G4.2';
const zhiPhraseChords = ['G2 B2 D3', 'C3 E3 G3', 'D3 A3 C4', 'G2 B2 D3'];
const modalLayers = {
  both: twoLayers(`${layerOpeningMelody} | ${zhiPhraseMelody}`, [...layerOpeningChords, ...zhiPhraseChords],
    '前段的旋律和低音共同归宫。后段旋律收在 G，下方也由商到徵。'),
  harmonyOnly: twoLayers(
    'D5.2 | E5.4 G5.4 | C5.4 A4.4 | D5.2 | D5.2 | E5.4 C5.4 | A4.2 | D5.2',
    ['D3 F3 A3', 'C3 E3 G3', 'A2 C3 E3 G3', 'D3 F3 A3', 'G2 B2 D3', 'C3 E3 G3', 'D3 F#3 A3', 'G2 B2 D3'],
    '旋律两句都以商音 D 为归着点。下方从羽–商改为大商–徵，最后 D 是徵和弦的五音。'),
  melodyOnly: twoLayers(
    `${layerOpeningMelody} | ${zhiPhraseMelody}`,
    [...layerOpeningChords, 'C3 E3 G3', 'A2 C3 E3', 'D3 F3 A3 C4', 'C3 E3 G3 D4'],
    '后段旋律收在徵，和声仍以下属方向的商七回到宫。结尾加二度的宫和弦保留高音 G。')
};

mountHarmonyOptions({
  zhiStructures, zhiCadences, zhiGong, shangCadences, shangColors, jueCadences, modalAlternation, modalLayers
});

const compoundPairs = {
  fifth: [
    ['zhiGong', '徵 → 宫', 'G4', 'C3 E3 G3', '五音'],
    ['shangZhi', '商 → 徵', 'D5', 'G2 B2 D3', '五音'],
    ['jueYu', '角 → 羽', 'E5', 'A2 C3 E3', '五音'],
    ['yuShang', '羽 → 商', 'A4', 'D3 F3 A3', '五音']
  ],
  third: [
    ['jueGong', '角 → 宫', 'E5', 'C3 E3 G3', '三音'],
    ['zhiJue', '徵 → 角', 'G4', 'E3 G3 B3', '三音'],
    ['gongYu', '宫 → 羽', 'C5', 'A2 C3 E3', '三音']
  ],
  fourth: [['gongZhi', '宫 → 徵', 'C5', 'G2 C3 D3', '四度换入音']],
  second: [['shangGong', '商 → 宫', 'D5', 'C3 D3 E3 G3', '加入的二度音']],
  seventh: [['zhiYu', '徵 → 羽', 'G4', 'A2 C3 E3 G3', '七音']]
};

const compoundPanel = document.getElementById('compoundModes');
if (compoundPanel) {
  const relation = compoundPanel.querySelector('[name="relation"]');
  const pair = compoundPanel.querySelector('[name="pair"]');
  const figure = compoundPanel.querySelector('figure');
  const cue = compoundPanel.querySelector('output');
  let playback;

  function render() {
    const [, , tonic, chord, role] = compoundPairs[relation.value].find(([id]) => id === pair.value);
    const notes = scoreWithAccompaniment(`${tonic}.2 { txt "旋律主音" }`, [chord]);
    cue.textContent = `上方旋律主音是下方和声主和弦的${role}。`;
    if (playback) playback.setNotes(notes);
    else playback = mountScore(figure, { notes, notation: 'staff', tempo: 100 });
  }

  function changeRelation() {
    const pairs = compoundPairs[relation.value];
    pair.replaceChildren(...pairs.map(([id, title]) => new Option(title, id)));
    pair.disabled = pairs.length === 1;
    render();
  }

  relation.addEventListener('change', changeRelation);
  pair.addEventListener('change', render);
  changeRelation();
}
