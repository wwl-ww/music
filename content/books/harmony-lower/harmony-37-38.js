import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';

function example(chords, description) {
  return { notes: labelledChordScore(chords.map(chord => [chord])), description };
}

const tonic = ['C3 E4 G4 C5', 'I'];
const minorTonic = ['C3 Eb4 G4 C5', 'i'];
const subdominant = ['F3 F4 A4 C5', 'IV'];
const neapolitan = ['F3 F4 Ab4 Db5', '♭II₆'];
const cadential = ['G3 E4 G4 C5', 'K⁶₄'];
const dominant = ['G3 D4 G4 B4', 'V'];
const dominantSeventh = ['G3 F4 G4 B4', 'V₇'];

const neapolitanDominant = {
  direct: example([tonic, neapolitan, dominantSeventh, tonic],
    '直接接原位 V₇。D♭ 到 B 是减三度，V₇ 保留三音 B 和七音 F，省去五音 D。'),
  inversion: example([tonic, neapolitan, ['F3 D4 G4 B4', 'V⁴₂'], ['E3 C4 G4 C5', 'I₆']],
    'V⁴₂ 保留全部四个和弦音。F 在低音延续，随后作为属七的七音下行到 E。'),
  cadential: example([tonic, neapolitan, cadential, dominantSeventh, tonic],
    '终止四六将 D♭ 到 B 的减三度分成 D♭–C–B。那波里和弦的根音 D♭ 排在五音 A♭ 上方。'),
  applied: example([tonic, neapolitan, ['F#3 D4 A4 C5', 'V⁶₅/V'], dominant, tonic],
    'V⁶₅/V 的低音 F♯ 让原来的 F 到属根音 G 成为两次上行半音。'),
  root: example([subdominant, ['Db3 F4 Ab4 Db5', '♭II'], ['G2 F4 G4 B4', 'V₇'], tonic],
    '原位那波里和弦以 D♭ 作低音，D♭ 到 G 下行减五度。')
};

const neapolitanColors = {
  plagal: example([tonic, neapolitan, tonic],
    '♭II₆ 直接回 I。三个上方声部均下行半音，低音 F 下行纯四度到 C。'),
  neighboring: example([subdominant, neapolitan, subdominant],
    'F 在低音和次中音持续，A–A♭–A 与 C–D♭–C 形成半音辅助。'),
  tonicized: example([
    ['C3 G3 C4 E4', 'I'], ['C3 Gb3 Ab3 Eb4', 'V⁶₅/♭II'], ['Db3 F3 Ab3 Db4', '♭II'],
    ['G2 F3 G3 B3', 'V₇'], ['C3 E3 G3 C4', 'I']
  ], 'A♭7 的导音 C 进入 D♭，七音 G♭ 下行到 F。接回本调的 V₇–I，保留原调终止。')
};

const flatSixthDoubleThird = ['Ab2 C4 Eb4 C5', '♭VI'];
const flatSixthDoubleRoot = ['Ab2 Eb4 Ab4 C5', '♭VI'];
const completeDominantSeventh = ['G2 D4 F4 B4', 'V₇'];
const cadentialLower = ['G2 C4 E4 G4', 'K⁶₄'];
const lowTonic = ['C3 C4 E4 G4', 'I'];

const borrowedSixthFunction = {
  deceptive: example([completeDominantSeventh, flatSixthDoubleThird, ['F3 C4 F4 A4', 'IV'],
    cadentialLower, ['G2 B3 F4 G4', 'V₇'], lowTonic],
    '♭VI 在第一处替代主和弦。导音 B 与七音 F 都完成解决，后续的终止明确回到 I。'),
  passing: example([tonic, flatSixthDoubleRoot, subdominant],
    '♭VI 连接 I 和 IV。高音 C 是三个和弦的共同音，A♭ 在 ♭VI 中作为根音重复。'),
  authentic: example([['C3 G3 E4 C5', 'I'], flatSixthDoubleThird, completeDominantSeventh, ['C3 C4 E4 C5', 'I']],
    '♭VI 通向 V₇，是复式终止的下属环节。重复的 C 分别连接到 B 和 D。'),
  leading: example([tonic, flatSixthDoubleRoot, ['Ab2 D4 F4 B4', 'vii°⁴₂'],
    cadentialLower, ['G2 B3 F4 G4', 'V₇'], lowTonic],
    '转位导减七使 A♭ 留在低音，随后下行到 G，避免原位 ♭VI–vii°₇ 的低音增二度。'),
  plagal: example([tonic, flatSixthDoubleRoot, tonic],
    '♭VI 按变格方向回 I，C 保持。E♭–E 与 A♭–G 使调式色彩恢复为大调。')
};

const phrygianOpening = ['C3 G3 E4 C5', 'I'];
const phrygianBorrowing = {
  third: example([phrygianOpening, ['Eb3 Eb4 G4 Bb4', '♭III'], ['F3 C4 F4 Ab4', 'iv'], lowTonic],
    '♭III 承接旋律的 B♭，iv 承接 A♭。♭III 在这里占据弱化的属功能位置。'),
  minorDominant: example([phrygianOpening, ['G2 G3 D4 Bb4', 'v'], ['F3 C4 F4 Ab4', 'iv'], lowTonic],
    'v 沿用属根音 G，三音改成 B♭。旋律 B♭–A♭–G 不需要大属和弦的导音 B。'),
  seventh: example([phrygianOpening, ['F3 Bb3 D4 Bb4', '♭VII⁶₄'], ['Ab3 C4 F4 Ab4', 'iv₆'], lowTonic],
    '♭VII 和 iv 都可转位。上方的 C–B♭–A♭–G 不变，低音可走另一条线。')
};

const borrowedTonic = {
  contrast: example([tonic, minorTonic, tonic],
    '只改变主和弦的三音。C 和 G 维持共同音，E–E♭–E 使大、小三和弦交替。'),
  minorEnding: example([
    ['F3 F4 A4 C5', 'IV'], ['G3 F4 G4 B4', 'V₇'], minorTonic,
    ['F3 F4 Ab4 C5', 'iv'], minorTonic
  ], 'V₇ 先解决到小主和弦，iv–i 再用变格补充终止巩固小主色彩。')
};

mountHarmonyOptions({
  'neapolitan-dominant': neapolitanDominant,
  'neapolitan-colors': neapolitanColors,
  'borrowed-sixth-function': borrowedSixthFunction,
  'phrygian-borrowing': phrygianBorrowing,
  'borrowed-tonic': borrowedTonic
});
