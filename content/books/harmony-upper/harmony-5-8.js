import { fourPartScore, labelledChordScore as score, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';

const successive = (chords, key) => score(chords.map(chord => [chord]), key);
const example = (notes, description) => ({ notes, description });

function weakMiddle(chords, key) {
  const measure = chords.map(([pitches, label], index) => {
    const previous = chords[index - 1]?.[0].split(' ');
    const voices = pitches.split(' ').map((pitch, voice) =>
      previous?.[voice] === pitch ? `${pitch}{t}` : pitch);
    return [voices.join(' '), label, '4'];
  });
  return score([measure], key, '3 4');
}

const tonic = 'C3 G3 E4 C5';
const tonicWithoutFifth = 'C3 E3 C4 C5';
const subdominant = 'F2 A3 F4 C5';
const dominant = 'G2 G3 D4 B4';
const cadential = 'G2 G3 E4 C5';
const seventh = 'G2 F3 D4 B4';
const minorCadential = 'G2 G3 Eb4 C5';
const minorTonic = 'C3 G3 Eb4 C5';
const minorSubdominant = 'F2 Ab3 F4 C5';
const compactTonic = 'C3 G3 C4 E4';
const compactDominant = 'G2 G3 B3 D4';
const subdominantClose = 'F2 A3 C4 F4';
const dominantSixth = 'B2 G3 D4 G4';
const firstInversion = 'E3 C4 G4 C5';
const completeV7 = 'G2 F3 B3 D4';
const reducedV7 = 'G2 G3 B3 F4';
const reducedTonic = 'C3 E3 C4 C4';

const cadences = {
  halfV: example(successive([[tonic, 'I'], [dominant, 'V']]), '停在属和弦，乐句仍有继续的倾向。'),
  halfIV: example(successive([[tonic, 'I'], [subdominant, 'IV']]), '停在下属和弦。'),
  authentic: example(successive([[dominant, 'V'], [tonic, 'I']]), '属功能收束到主功能。'),
  plagal: example(successive([[subdominant, 'IV'], [tonic, 'I']]), '下属和弦直接回到主和弦。'),
  compound: example(successive([[subdominant, 'IV'], [dominant, 'V'], [tonic, 'I']]), '下属经属功能回到主和弦。'),
  supplement: example(successive([[dominant, 'V'], [tonic, 'I'], [subdominant, 'IV'], [tonic, 'I']]), '第一次 I 完成全终止，其后的 IV–I 补充收束。')
};
const completion = {
  perfect: example(successive([[dominant, 'V'], [tonic, 'I']]), '两个和弦均为原位，主和弦在强拍且高音是 C。'),
  tonicInverted: example(successive([[dominant, 'V'], ['E3 G3 C4 C5', 'I6']]), '主和弦以三音 E 作低音。'),
  sopranoThird: example(successive([[compactDominant, 'V'], [compactTonic, 'I']]), '主和弦的高音是三音 E。'),
  weakBeat: example(score([[[dominant, 'V', '4'], [tonic, 'I', '4']]]), '主和弦进入二拍子第二拍。'),
  dominantInverted: example(successive([['B2 G3 G4 D5', 'V6'], [tonic, 'I']]), '进入主和弦之前的 V6 以导音 B 作低音。')
};
const cadentialExamples = {
  tonic: example(successive([[tonic, 'I'], [cadential, 'K6/4'], ['G2 G3{t} D4 B4', 'V'], [tonic, 'I']]), '属低音上方的 C、E 分别下行到 B、D。'),
  subdominant: example(successive([[subdominant, 'IV'], [cadential, 'K6/4'], ['G2 G3{t} D4 B4', 'V'], [tonic, 'I']]), 'C 在高音保持进入终止四六，随后下行到 B。'),
  half: example(successive([[subdominant, 'IV'], [cadential, 'K6/4'], [dominant, 'V']]), '终止四六和弦解决到属和弦，乐句停下。'),
  minor: example(successive([[minorSubdominant, 'iv'], [minorCadential, 'K6/4'], [dominant, 'V'], [minorTonic, 'i']], 'Cminor'), '小调用 E♭–D，导音仍为 B。'),
  seventh: example(successive([[cadential, 'K6/4'], [seventh, 'V7'], [tonicWithoutFifth, 'I']]), '重复到上方的 G 下行到七音 F，F 再下行到 E。'),
  leapIn: example(successive([['C3 G3 E4 G4', 'I'], [cadential, 'K6/4'], [dominant, 'V'], [tonic, 'I']]), '高音 G–C 以四度跳进引入终止四六。'),
  leapOut: example(successive([['G2 G3 C4 E4', 'K6/4'], [dominant, 'V'], [tonic, 'I']]), '低音仍在 G，中音 C 上行到 D，高音 E 跳进到 B。')
};
const cadentialRhythm = {
  strong: example(score([[[cadential, 'K6/4'], [dominant, 'V']], [[tonic, 'I', '1']]], 'C', '4 4'), 'K₆₄ 在第一拍，占两拍，与 V 等长。'),
  brief: example(score([[[cadential, 'K6/4', '4'], [dominant, 'V', '2.']], [[tonic, 'I', '1']]], 'C', '4 4'), 'K₆₄ 在第一拍，只占一拍，V 占三拍。'),
  weak: example(score([[[subdominant, 'IV', '4'], [cadential, 'K6/4', '4'], [dominant, 'V']], [[tonic, 'I', '1']]], 'C', '4 4'), 'K₆₄ 落在第二拍，V 进入较强的第三拍。'),
  revoiced: example(score([[[cadential, 'K6/4'], ['G2 C4 G4 E5', '', '4'], ['G2 B3 G4 D5', 'V', '4']], [['C3 C4 G4 E5', 'I', '1']]], 'C', '4 4'), '属低音 G 延续，上方重新排列，再用 C–B、E–D 引向 V。')
};

const rootForms = ['E3 C4 G4 C5', 'E3 G3 C4 C5', 'E3 G3 C4 C4', 'E3 C4 C4 G4', 'E3 C4 C5 G5'];
const fifthForms = ['E3 G3 G4 C5', 'E3 C4 G4 G4', 'E3 C4 G4 G5', 'E3 G4 G4 C5', 'E3 G3 C4 G4'];
const fullRest = ['r r r r', '', '2'];
function voicingSet(chords, minor, labels) {
  const key = minor ? 'Cminor' : 'C';
  return score(chords.map((notes, index) => [
    [minor ? notes.replace('E3', 'Eb3') : notes, labels[index]],
    ['r r r r', '', '4']
  ]), key, '3 4');
}

const inversionBasics = {
  major: example(successive([[tonic, 'I'], ['E3 G3 C4 G4', 'I6'], fullRest, [subdominantClose, 'IV'], ['A2 F3 C4 F4', 'IV6'], fullRest, [compactDominant, 'V'], [dominantSixth, 'V6']]), '三个正三和弦分别从根音低音换到三音低音。'),
  minor: example(successive([[minorTonic, 'i'], ['Eb3 G3 C4 G4', 'i6'], fullRest, ['F2 Ab3 C4 F4', 'iv'], ['Ab2 F3 C4 F4', 'iv6'], fullRest, [compactDominant, 'V'], [dominantSixth, 'V6']], 'Cminor'), 'i₆ 与 iv₆ 的低音是 E♭ 与 A♭，V₆ 的低音仍为导音 B。')
};
const sixthVoicings = {
  majorRoot: example(voicingSet(rootForms, false, ['H', 'H', 'M', 'H', 'K']), '重复 C。上方的五种排列依次为混合、混合、密集、混合、开放。'),
  majorFifth: example(voicingSet(fifthForms, false, ['H', 'H', 'K', 'M', 'H']), '重复 G。上方的五种排列依次为混合、混合、开放、密集、混合。'),
  minorRoot: example(voicingSet(rootForms, true, ['H', 'H', 'M', 'H', 'K']), '低音是 E♭，重复 C，上方排列与大调相同。'),
  minorFifth: example(voicingSet(fifthForms, true, ['H', 'H', 'K', 'M', 'H']), '低音是 E♭，重复 G，上方排列与大调相同。')
};
const sameFunction = {
  normal: example(successive([['C3 E4 G4 C5', 'I'], ['E3 C4 G4{t} C5{t}', 'I6']]), '高音 C 和中音 G 保持，低音由 C 到 E。'),
  reverse: example(successive([[firstInversion, 'I6'], ['C3 E4 G4{t} C5{t}', 'I']]), '高音 C 和中音 G 保持，低音回到根音。'),
  doubledThird: example(successive([['C3 G3 E4 C5', 'I'], ['E3 C4 E4{t} G4', 'I6'], ['F3 A3 C4 F4', 'IV']]), 'I₆ 临时重复 E，中音保持后再下行到 IV 的 C。')
};
const smoothSixths = {
  rootToSixth: example(successive([[compactTonic, 'I'], ['B2 G3{t} D4 G4', 'V6']]), '次中音保持共同音 G，低音从 C 下行到 B。'),
  tritone: example(successive([['F3 A3 C4 F4', 'IV'], [dominantSixth, 'V6']]), '低音从 F3 下行到 B2，为减五度。'),
  bothShared: example(successive([['E3 G3 C4 G4', 'I6'], ['B2 G3{t} D4 G4{t}', 'V6']]), '两个声部保留 G，低音作下行纯四度。'),
  minorFourth: example(successive([['Eb3 G3 C4 G4', 'i6'], ['B2 G3{t} D4 G4{t}', 'V6']], 'Cminor'), '低音 E♭3 下行到 B2，为减四度。'),
  bothStep: example(successive([['A2 C4 F4 F5', 'IV6'], ['B2 D4 G4 D5', 'V6']]), 'IV₆ 以根音 F 在高音并重复 F，V₆ 重复五音 D。'),
  minorSeventh: example(successive([['F3 A3 D4 D5', 'iv6'], ['G#2 B3 E4 B4', 'V6']], 'Aminor'), '低音 F3 到 G♯2 下行减七度。'),
  minorMelodic: example(successive([['F#3 A3 D4 D5', 'IV6'], ['G#3 B3 E4 B4', 'V6']], 'Aminor'), '升高低音 F 为 F♯，与 G♯ 构成上行大二度。')
};
const sixthLeaps = {
  root: example(successive([['C3 E4 G4 C5', 'I'], ['B2 D4 G4{t} G5', 'V6']]), '高音从 I 的根音 C 跳到 V 的根音 G，共同音 G 保持在中音。'),
  fifth: example(successive([['C3 C4 E4 G4', 'I'], ['B2 D4 G4 D5', 'V6']]), '高音从 I 的五音 G 跳到 V 的五音 D，内声部作二、三度进行。'),
  cross: example(successive([['F3 C4 F4 A4', 'IV'], [dominantSixth, 'V6']]), '次中音从 IV 的五音 C 下跳到 V 的根音 G。'),
  both: example(successive([['E3 G3 C4 C5', 'I6'], ['A2 F3 C4{t} F4', 'IV6']]), '高音从根音 C 下跳到根音 F，中音保持 C。'),
  bothFifth: example(successive([['E3 G3 G4 C5', 'I6'], ['B2 D4 G4{t} D5', 'V6']]), '次中音从五音 G 跳到五音 D，中音保持，高音只走一步。'),
  bothCross: example(successive([['A2 F3 C4 C5', 'IV6'], ['B2 D3 D4 G4', 'V6']]), '高音从 IV 的五音 C 下跳到 V 的根音 G。'),
  large: example(successive([['E3 C4 G4 G5', 'I6'], ['G3 D4 G4{t} B4', 'V']]), '高音下跳小六度，中音保持，次中音级进。'),
  paired: example(successive([['C3 E4 G4 C5', 'I'], ['A2 F4 C5 F5', 'IV6']]), '高音的根音始终在中音的五音上方。两个声部保留四度关系。')
};

function tonicMelody(soprano) {
  return fourPartScore(['C3.1', 'G3.1', 'E4.1', soprano], 'C', '4 4');
}
const weakTones = {
  passing: example(tonicMelody('C5.4 D5.4 { txt "P" } E5.2'), 'D 在 I 内连接 C 与 E，沿同一方向级进。'),
  chromaticPassing: example(tonicMelody('E5.4 F5.8 { txt "P" } F#5.8 { txt "P" } G5.2'), 'F 与 F♯ 都是经过音，连成 E–F–F♯–G 的半音级进。'),
  upper: example(tonicMelody('E5.4 F5.4 { txt "N" } E5.2'), 'F 从 E 上方绕行，再回 E。'),
  lower: example(tonicMelody('E5.4 D5.4 { txt "N" } E5.2'), 'D 从 E 下方绕行，再回 E。'),
  chromatic: example(tonicMelody('E5.4 D#5.4 { txt "N" } E5.2'), 'D♯ 是临时升高的下辅助音。'),
  anticipation: example(fourPartScore(['G2.2 | C3.2', 'G3.2 | G3.2', 'D4.2 | E4.2', 'B4.4 C5.4 { txt "Ant." } | C5.2'], 'C', '2 4'), 'C 在 V 的弱拍先出现，I 进入时再奏同音。')
};
function suspension(soprano) {
  return fourPartScore(['F2.2 | C3.2', 'A3.2 | G3.2', 'C4.2 | C4{t}.2', soprano], 'C', '2 4');
}
const strongTones = {
  suspension: example(suspension('F4.2 | F4{t}.4 { txt "4" } E4.4 { txt "3" }'), 'F 在 IV 中预备，I 的强拍仍保持 F，才向下解决到 E。'),
  repeated: example(suspension('F4.2 | F4.4 { txt "4" } E4.4 { txt "3" }'), '同一个 F 在 I 的强拍重新发音，仍保留预备与解决关系。'),
  upward: example(fourPartScore(['G2.2 | C3.2', 'G3.2 | G3{t}.2', 'D4.2 | E4.2', 'B4.2 | B4{t}.4 { txt "7" } C5.4 { txt "8" }'], 'C', '2 4'), 'B 在 I 开始时延留，随后上行半音到 C。'),
  decorated: example(fourPartScore(['F2.1 | C3.1', 'A3.1 | G3.1', 'C4.1 | C4{t}.1', 'F5.1 | F5{t}.4 G5.8 F5.8 E5.2'], 'C', '4 4'), '延留的 F 返回一次后才解决到 E，G–F 是插入的装饰。'),
  appoggiatura: example(suspension('A4.2 | F4.4 { txt "App." } E4.4'), 'F 在 I 的强拍出现，左侧没有 F 的同音预备，随后下行解决到 E。')
};
const freeTones = {
  stepLeap: example(tonicMelody('E5.4 F5.4 { txt "*" } C5.2'), '从 E 级进到 F，从 F 跳到 C。'),
  leapStep: example(tonicMelody('G4.4 D5.4 { txt "*" } E5.2'), '从 G 跳到 D，从 D 级进到 E。'),
  bothLeap: example(tonicMelody('G4.4 F5.4 { txt "*" } C5.2'), '从 G 跳到 F，再从 F 跳到 C。')
};
const tonicPass = [['C3 E4 G4 C5', 'I'], ['D3 D4 G4 B4', 'V6/4'], ['E3 C4 G4 C5', 'I6']];
const subdominantPass = [[subdominantClose, 'IV'], ['G2 G3 C4 E4', 'I6/4'], ['A2 F3 C4 F4', 'IV6']];
const minorTonicPass = [['C3 Eb4 G4 C5', 'i'], tonicPass[1], ['Eb3 C4 G4 C5', 'i6']];
const minorSubdominantPass = [['F2 Ab3 C4 F4', 'iv'], ['G2 G3 C4 Eb4', 'i6/4'], ['Ab2 F3 C4 F4', 'iv6']];
const passingSixFour = {
  tonicUp: example(weakMiddle(tonicPass), '低音 C–D–E，上方一个 G 保持。'),
  tonicDown: example(weakMiddle(tonicPass.toReversed()), '低音 E–D–C，经过四六仍在中间的弱拍。'),
  subdominantUp: example(weakMiddle(subdominantPass), '低音 F–G–A，C 保持，次中音与低音反向级进。'),
  subdominantDown: example(weakMiddle(subdominantPass.toReversed()), '低音 A–G–F，经过四六连接 IV₆ 与 IV。'),
  minor: example(weakMiddle(minorTonicPass, 'Cminor'), '小调低音 C–D–E♭，中间的属四六仍含导音 B。'),
  minorTonicDown: example(weakMiddle(minorTonicPass.toReversed(), 'Cminor'), '小调低音 E♭–D–C，经过四六仍在中间的弱拍。'),
  minorSubdominantUp: example(weakMiddle(minorSubdominantPass, 'Cminor'), '小调低音 F–G–A♭，经过的是主四六。'),
  minorSubdominantDown: example(weakMiddle(minorSubdominantPass.toReversed(), 'Cminor'), '小调低音 A♭–G–F，连接 iv₆ 与 iv。')
};
const neighborSixFour = {
  tonic: example(weakMiddle([[compactTonic, 'I'], ['C3 A3 C4 F4', 'IV6/4'], [compactTonic, 'I']]), 'C 在低音和中音都保持，G、E 同时上行一步再返回。'),
  dominant: example(weakMiddle([[compactDominant, 'V'], ['G2 G3 C4 E4', 'I6/4'], [compactDominant, 'V']]), '两个 G 保持，B、D 同时上行一步再返回。'),
  minorTonic: example(weakMiddle([['C3 G3 C4 Eb4', 'i'], ['C3 Ab3 C4 F4', 'iv6/4'], ['C3 G3 C4 Eb4', 'i']], 'Cminor'), '两个 C 保持，G 与 E♭ 各向上到邻音。'),
  minorDominant: example(weakMiddle([[compactDominant, 'V'], ['G2 G3 C4 Eb4', 'i6/4'], [compactDominant, 'V']], 'Cminor'), '属低音 G 保持，弱拍上的 i₆₄ 回到同一个 V。')
};

const seventhSpacing = {
  triad: example(successive([[compactDominant, 'V']]), 'G、B、D，四部中重复根音。'),
  complete: example(successive([[completeV7, 'V7']]), '四个和弦音齐全。G–F 是小七度，B–F 属于三全音关系。'),
  omitFifth: example(successive([[reducedV7, 'V7']]), '省略 D、重复 G，七音 F 和导音 B 都保留。'),
  omitThird: example(successive([['G2 G3 D4 F4', 'V7']]), '省略 B、重复 G，减五度关系随导音消失。')
};
const seventhResolution = {
  complete: example(successive([[completeV7, 'V7'], [reducedTonic, 'I']]), 'D 和 B 都到 C，F 到 E，主和弦省去五音。'),
  omitFifth: example(successive([[reducedV7, 'V7'], ['C3 G3{t} C4 E4', 'I']]), '上方的 G 保持，成为主和弦五音。'),
  minorComplete: example(successive([[completeV7, 'V7'], ['C3 Eb3 C4 C4', 'i']], 'Cminor'), '七音 F 下行到 E♭，主和弦省去五音。'),
  minorOmitFifth: example(successive([[reducedV7, 'V7'], ['C3 G3{t} C4 Eb4', 'i']], 'Cminor'), 'G 保持，B 上行到 C，F 下行到 E♭。')
};
const seventhExceptions = {
  leadingDown: example(successive([['G2 B3 D4 F4', 'V7'], [compactTonic, 'I']]), '次中音的导音 B 下行三度至 G，主和弦得到五音。'),
  doubleThird: example(successive([[reducedV7, 'V7'], ['C3 E3 C4 E4', 'I']]), '七音下行到 E，另一个声部也到 E，形成重复三音。'),
  seventhUp: example(successive([['G2 D4 B4 F5', 'V7'], ['E3 C4 C5 G5', 'I6']]), '低音进行至 E，七音 F 上行到 G，避免重复低音 E。'),
  retain: example(successive([['G2 D4 F4 B4', 'V7'], ['A2 C4 F4{t} C5', 'IV6']]), 'F 保留；低音 G 上行到 A，B 上行到 C。')
};
const seventhPreparation = {
  sustained: example(successive([['F3 C4 A4 F5', 'IV'], ['G3 B3 G4 F5{t}', 'V7'], ['C3 C4 G4{t} E5', 'I']]), '高音 F 在 IV 中已经出现，保持到 V₇，再下行到 E。'),
  passing: example(successive([[firstInversion, 'I6'], ['G2 D4 F4 B4', 'V7'], ['C3 C4 E4 C5', 'I']]), '中音 G–F–E 连续下行，F 是中间一音。'),
  neighbor: example(successive([['C3 C4 G4 E5', 'I'], ['G2 B3 G4{t} F5', 'V7'], ['C3 C4 G4{t} E5', 'I']]), '高音 E–F–E 形成上方邻音式进行。'),
  leap: example(successive([['A2 C4 F4 C5', 'IV6'], ['G2 B3 G4 F5', 'V7'], ['C3 C4 G4{t} E5', 'I']]), '高音由 C 跳到 F，没有同音预备。')
};

const groups = {
  cadences, completion, cadential: cadentialExamples, cadentialRhythm, inversionBasics,
  sixthVoicings, sameFunction, smoothSixths, sixthLeaps, weakTones, strongTones, freeTones,
  passingSixFour, neighborSixFour, seventhSpacing, seventhResolution, seventhExceptions, seventhPreparation
};
const fixedExamples = {
  bassCadence: successive([[tonic, 'I'], [subdominant, 'IV'], [cadential, 'K6/4'], [dominant, 'V'], [tonic, 'I'], [subdominant, 'IV'], [cadential, 'K6/4'], [dominant, 'V'], [tonic, 'I'], [subdominant, 'IV'], [tonic, 'I']]),
  sixthPhrase: successive([[compactTonic, 'I'], [dominantSixth, 'V6'], [compactTonic, 'I'], [subdominantClose, 'IV'], ['A2 F3 C4 F4', 'IV6'], ['G2 G3 C4 E4', 'K6/4'], [compactDominant, 'V'], ['C3 G3 C4 E4', 'I']]),
  sixFourPhrase: score([
    tonicPass.map(([notes, label]) => [notes, label, '4']),
    [['F3 C4 F4 A4', 'IV', '2.']],
    [['G3 C4 E4 G4', 'K6/4'], ['G3 B3 D4 G4', 'V', '4']],
    [['C3 C4 E4 G4', 'I', '4'], ['C3 C4 F4 A4', 'IV6/4', '4'], ['C3 C4 E4 G4', 'I', '4']]
  ], 'C', '3 4'),
  seventhPhrase: successive([[compactTonic, 'I'], [subdominantClose, 'IV'], [compactDominant, 'V'], ['G2{t} G3{t} B3{t} F4', 'V7'], ['C3 G3{t} C4 E4', 'I']])
};

mountHarmonyOptions(groups, fixedExamples);
