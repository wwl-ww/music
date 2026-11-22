import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';

function example(chords, description, key = 'C') {
  return { notes: labelledChordScore(chords.map(chord => [chord]), key), description };
}

const cTonic = ['C3 G3 E4 C5', 'C：I'];
const aTonic = ['A2 A3 C4 E4', 'a：i'];
const diminishedPitches = 'G#2 D4 F4 B4';
const cDominantSeventh = ['G2 D4 F4 B4', 'C：V₇'];
const cTonicAfterCompleteDominant = ['C3 C4 E4 C5', 'C：I'];

const acceleratedPivots = {
  originalSixth: example([
    cTonic, cDominantSeventh, ['Ab2 C4 Eb4 C5', 'C：♭VI＝A♭：I'],
    ['Db3 Db4 F4 Ab4', 'IV'], ['Eb3 Db4 Eb4 G4', 'V₇'], ['Ab2 C4 Eb4 Ab4', 'I']
  ], 'C 调的 G7 阻碍解决到 ♭VI。后面的 D♭–E♭7–A♭ 又让同一个 A♭ 和弦成为新主和弦。'),
  newSixth: example([
    cTonic, ['F3 A3 F4 C5', 'C：IV'], ['C3 E4 G4 E5', 'C：I＝E：♭VI'],
    ['B2 D#4 A4 F#5', 'V₇'], ['E3 E4 G#4 E5', 'I']
  ], 'C 和弦原先是主和弦，随后成为 E 的降Ⅵ级和弦。C–B 的低音半音和 B7–E 建立了新中心。'),
  originalNeapolitan: example([
    ['C3 E4 G4 C5', 'C：I'], ['F3 F4 Ab4 Db5', 'C：♭II₆＝D♭：I₆'],
    ['Gb3 Db4 Gb4 Bb4', 'IV'], ['Ab3 C4 Gb4 Ab4', 'V₇'], ['Db3 Db4 F4 Ab4', 'I']
  ], 'C 的那波里六和弦是 D♭ 大三和弦的第一转位。D♭ 调的下属、属七和原位主和弦确立新调。'),
  newNeapolitan: example([
    cTonic, ['G2 D4 G4 B4', 'C：V'], ['E3 E4 G4 C5', 'C：I₆＝B：♭II₆'],
    ['F#3 D#4 F#4 B4', 'K⁶₄'], ['F#3 C#4 E4 A#4', 'V₇'], ['B2 B3 D#4 B4', 'I']
  ], 'C 和弦的转位低音 E 保持为新调那波里六和弦的低音，再上行到终止四六的属低音 F♯。'),
  minorTonic: example([
    cTonic, ['G2 F4 G4 B4', 'C：V₇'], ['C3 Eb4 G4 C5', 'C：i＝E♭：vi'],
    ['Ab2 Eb4 Ab4 C5', 'IV'], ['Bb2 D4 Ab4 Bb4', 'V₇'], ['Eb3 Eb4 G4 Bb4', 'I']
  ], 'C 的属七先解决到小主和弦。C 小三和弦随后作为 E♭ 的 vi，只有经过 E♭ 的终止才完成转调。'),
  majorTonic: example([
    aTonic, ['E3 D4 E4 G#4', 'a：V₇'], ['A2 C#4 E4 A4', 'a：I＝D：V'],
    ['D3 D4 F#4 A4', 'I'], ['G2 B3 G4 D5', 'IV'], ['A2 C#4 G4 A4', 'V₇'], ['D3 D4 F#4 A4', 'I']
  ], 'a 小调的 E7 解决到大主和弦 A。A 的 C♯ 继而作为 D 的导音，新调再经 IV–V₇–I 得到巩固。', 'Aminor'),
  combined: example([
    ['E3 B3 G#4 E5', 'E：I'], ['B2 A3 F#4 D#5', 'V₇'], ['E3 G#3 E4 E5', 'I'],
    ['G3 F4 G4 B4', 'V₇/♭VI'], ['E3 E4 G4 C5', '♭VI₆＝♭II₆'],
    ['F#3 D#4 F#4 B4', 'B：K⁶₄'], ['F#3 C#4 E4 A#4', 'V₇'], ['B2 B3 D#4 B4', 'I']
  ], 'G7 把 C 大三和弦引作 E 调的降Ⅵ级。低音 E 使这个中介同时成为 B 大调的那波里六和弦，随后进入属低音上的终止。', 'E')
};

const diminishedPivot = {
  tonic: example([
    cTonic, [diminishedPitches, 'a：vii°₇'], ['A2 C4 E4 C5', 'i'],
    ['D3 D4 F4 A4', 'iv'], ['E3 D4 E4 G#4', 'V₇'], ['A2 C4 E4 A4', 'i']
  ], '旧拼法的 A♭ 改写为 G♯。作为 a 小调的导音减七，四个声部级进解决到小主和弦；随后再以小调终止加以确认。'),
  dominant: example([
    cTonic, [diminishedPitches, 'D：vii°₇/V'], ['A2 C#4 E4 A4', 'V'], ['D3 D4 F#4 A4', 'I']
  ], '同一组音先解决到 A 大三和弦。在 D 调中，A 是属和弦，C♯ 继续上行到新主音 D。'),
  subdominant: example([
    cTonic, [diminishedPitches, 'E：vii°₇/IV'], ['A2 C#4 E4 A4', 'IV'],
    ['B2 B3 D#4 A4', 'V₇'], ['E3 B3 E4 G#4', 'I']
  ], '同一组音也能先解决到 A 大三和弦。在 E 调中，A 是下属和弦，后面的 B7–E 完成新调终止。')
};

const diminishedResolution = {
  tonicAppoggiatura: example([
    aTonic, ['C3 A3 D#4 F#4', 'C：♯ii°⁴₂'], ['C3 G3 E4 G4', 'I'],
    cDominantSeventh, cTonicAfterCompleteDominant
  ], 'C 保持为主和弦根音。这一处的减七根音是升Ⅱ级 D♯，其余声部从 A、D♯、F♯ 级进到 G、E、G。', 'Aminor'),
  dominantAppoggiatura: example([
    ['D3 A3 D4 F#4', 'D：I'], ['G2 C#4 E4 A#4', 'C：♯vi°⁴₂'],
    ['G2 D4 F4 B4', 'V₇'], ['C3 C4 E4 C5', 'I']
  ], 'G 保持为属七根音。升Ⅵ级 A♯ 是减七根音，三个变化声部都上行半音，组成 C 调的 V₇。', 'D'),
  tonicConversion: example([
    ['Eb3 Eb4 G4 Bb4', 'E♭：I'], ['Ab2 D4 F4 B4', 'C：vii°⁴₂'],
    cDominantSeventh, cTonicAfterCompleteDominant
  ], '新调的导音减七只改变七音 A♭，把它降低到 G，就成为属七的根音。随后 V₇–I 确立 C。', 'Eb'),
  subdominantConversion: example([
    ['A2 A3 E4 C#5', 'A：I'], ['Db3 G3 E4 Bb4', 'C：vii°⁴₂/IV'],
    ['C3 G3 E4 Bb4', 'V₇/IV'], ['F2 C4 F4 A4', 'IV'],
    ['G2 B3 F4 G4', 'V₇'], ['C3 C4 E4 G4', 'I']
  ], '下属副属减七的七音 D♭ 降到 C，组成下属副属七。它先确立 F 的下属功能，再由本调 V₇ 回主。', 'A'),
  dominantConversion: example([
    ['F#3 A3 C#4 F#4', 'f♯：i'], ['A3 C4 Eb4 F#4', 'c：vii°⁶₅/V'],
    ['Ab3 C4 Eb4 F#4', 'Ger⁺⁶'], ['G3 C4 Eb4 G4', 'K⁶₄'],
    ['G3 B3 F4 G4', 'V₇'], ['C3 C4 Eb4 G4', 'i']
  ], '把重属减七的三音 A 降到 A♭。A♭ 与 F♯ 向两端各移半音到 G，经过终止四六和属七回到 c 小调主和弦。', 'F#minor')
};

mountHarmonyOptions({
  'accelerated-pivots': acceleratedPivots,
  'diminished-pivot': diminishedPivot,
  'diminished-resolution': diminishedResolution
});
