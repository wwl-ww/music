import { fourPartScore, labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';

const example = (chords, description, key = 'C') => ({
  notes: labelledChordScore(chords.map(chord => [chord]), key),
  description
});
const weakExample = (chords, description) => ({
  notes: labelledChordScore([chords.map(([pitches, label]) => [pitches, label, '4'])], 'C', '3 4'),
  description
});

// Pitches in each row run from bass to soprano.
const majorTonic = ['C3 G3 C4 E4', 'I'];
const highTonic = ['C3 G3 E4 C5', 'I'];
const dominant = ['G2 G3 D4 B4', 'V'];
const subdominant = ['F2 A3 F4 C5', 'IV'];
const dominantSeventh = ['G2 F3 B3 D4', 'V7'];
const dominantSecond = ['D3 G3 B3 F4', 'V4/3'];
const dominantThird = ['F3 D4 G4 B4', 'V2'];

const seventhInversions = {
  first: example([['B2 G3 D4 F4', 'V6/5'], ['C3 G3{t} C4 E4', 'I']], '低音 B 升至 C，根音 G 留在次中音。'),
  secondRoot: example([dominantSecond, ['C3 G3{t} C4 E4', 'I']], '低音 D 下行到 C，F 下行到 E。'),
  secondSixth: example([dominantSecond, ['E3 G3{t} C4 E4', 'I6']], '低音 D 上行到 E，七音也到 E，主六和弦因此重复三音。'),
  third: example([dominantThird, ['E3 C4 G4{t} C5', 'I6']], '低音 F 下行至 E，D 下行至 C，B 上行至 C。'),
  minor: example([dominantThird, ['Eb3 C4 G4{t} C5', 'i6']], '七音 F 在 c 和声小调下行到 E♭。', 'Cminor')
};
const inversionOmissions = {
  full: example([dominantThird], '低音 F，其他声部具备 D、G、B。'),
  omitFifth: example([['F3 G3 G4 B4', 'V2']], '省 D、重复 G，导音与七音都在。'),
  omitThird: example([['F3 D4 G4 D5', 'V2']], '省 B、重复 D，F 与 B 的三全音消失。')
};
const invertedExceptions = {
  rising: example([['C3 G4 C5 E5', 'I'], ['D3 G4{t} B4 F5', 'V4/3'], ['E3 G4{t} C5 G5', 'I6']], '低音到 E，高音的七音 F 改向上行到 G。'),
  heldRoot: example([['F2 G3 B3 D4', 'V2'], ['F2{t} A3 C4 F4', 'IV']], 'F 保持在低音，成为原位下属和弦的根音。'),
  heldSixth: example([['B2 D4 G4 F5', 'V6/5'], ['A2 C4 F4 F5{t}', 'IV6']], '高音 F 保持，低音 B 改向下行，进入 IV₆。'),
  leaping: example([['F3 G3 B3 D4', 'V2'], ['E3 G3{t} C4 G4', 'I6']], '高音 D 跳到 G，低音 F 仍到 E，中音 B 仍到 C。'),
  finalOctaves: example([['G3 B3 F4 G4', 'V7'], ['C3 C4 E4 C5', 'I']], '只作最后收束的特例。低音下行、高音上行，外声部由八度到十五度。')
};
const inversionUsage = {
  passing: example([dominantSecond, ['E3 G3{t} C4 E4', 'I6'], ['F3 G3{t} B3 D4', 'V2'], ['E3 G3{t} C4 E4', 'I6'], dominantSecond, majorTonic], '经过性的属七转位与主和弦交替，低音 D–E–F–E–D–C。'),
  prolonged: example([dominantSeventh, ['B2 F3 G3 D4', 'V6/5'], ['D3 F3 G3 B3', 'V4/3'], ['F3 G3 B3 D4', 'V2'], ['E3 G3 C4 E4', 'I6']], '多个转位轮换，前四个和弦仍是同一属功能。'),
  interpolated: {
    notes: labelledChordScore([
      [[dominantSeventh[0], 'V7'], ['B2 F3{t} G3 D4{t}', 'V6/5', '4'], ['D3 F3{t} G3{t} B3', 'V4/3', '4']],
      [['F3 G3 B3 D4', 'V2', '4'], ['E3 G3{t} C4 E4', 'I6', '4'], ['D3 G3{t} B3 F4', 'V4/3', '4'], ['C3 A3 C4 F4{t}', 'IV6/4', '4']],
      [['B2 G3 D4 F4{t}', 'V6/5', '4'], ['A2 C3 C4 F4{t}', 'IV6', '4'], ['G2 F3 D4 B4', 'V7']],
      [['C3 E3 C4 C5', 'I', '1']]
    ], 'C', '4 4'),
    description: 'I₆、IV₆₄、IV₆ 短暂经过。低音连续下行，属七的各转位仍构成主体，最后用原位 V₇–I 收束。'
  }
};

const ninth = ['G2 F3 B3 A4', 'V9'];
const minorNinth = ['G2 F3 B3 Ab4', 'V9'];
const ninthTonic = ['C3 E3 C4 G4', 'I'];
const dominantWithSeventh = ['G2 F3 B3 G4', 'V7'];
const ninthVoicing = {
  root: example([['G3 B3 F4 A4', 'V9']], '原位省略五音 D，高音 A 与低音 G 构成大九度。'),
  minor: example([['G3 B3 F4 Ab4', 'V9']], '九音 A♭ 与低音 G 构成小九度。', 'Cminor'),
  withoutThird: example([['G2 F3 D4 A4', 'V9']], '保留 D、F、A，省去三音 B。'),
  withoutSeventh: example([['G2 D3 B3 A4', 'V9']], '保留 D、B、A，省去七音 F。'),
  first: example([['B2 G3 F4 A4', 'V9/6/5']], '三音 B 在低音，A 仍是九音。'),
  second: example([['D3 G3 B3 A4', 'V9/4/3']], '五音 D 在低音。这一例省略七音 F。'),
  third: example([['F3 G3 B3 A4', 'V9/2']], '七音 F 在低音，省略五音 D。'),
  innerSpaced: example([['G2 A3 B3 F4', 'V9']], '九音 A 在次中音，和根音 G 分隔为大九度。'),
  innerClose: example([['G3 A3 B3 F4', 'V9']], '这一配置不佳，内声部 A 与根音 G 挤成大二度。')
};
const ninthPaths = {
  prepared: example([['F2 F3 C4 A4', 'IV'], ['G2 F3{t} B3 A4{t}', 'V9'], ninthTonic], '高音 A 在 IV 中已经出现，保持进 V₉，再下行到 G。'),
  stepwise: example([ninthTonic, ninth, ninthTonic], '高音 G–A–G，级进引入九音并直接解决。'),
  leaping: example([highTonic, ninth, ninthTonic], '高音由 C 下跳到 A，未作同音预备。'),
  internal: example([ninth, ['G2{t} F3{t} B3{t} G4', 'V7'], ['C3 E3 C4 G4{t}', 'I']], '先在属低音上把 A 降至 G，再解决其他声部。'),
  minor: example([minorNinth, ['C3 Eb3 C4 G4', 'i']], '高音 A♭–G 下行半音，七音 F 到主和弦三音 E♭。', 'Cminor')
};
const ninthChecks = {
  fifths: example([['G2 F3 D4 A4', 'V9'], ninthTonic], '中音 D 与高音 A 均下行，纯五度移到 C–G 的纯五度。'),
  doubleThird: example([['G2 F3 D4 A4', 'V9'], ['C3 E3 E4 G4', 'I']], '中音 D 改上行至 E，主和弦加倍三音。'),
  fourths: example([['G2 A3 D4 F4', 'V9'], majorTonic], '把 A 放在 D 下方，A–D 下行到 G–C，保持四度。'),
  seventhOctave: { notes: '(G4 F5).2 | (D4 D5).2', description: 'G4–F5 是小七度，两音都向下到 D4–D5 的纯八度。' },
  ninthOctave: { notes: '(F4 G5).2 | (E4 E5).2', description: 'F4–G5 是大九度，两音同向下行到 E4–E5 的纯八度。' }
};
const ninthExpansion = {
  buildup: example([['G2 G3 B3 D4', 'V'], dominantWithSeventh, ninth, ninthTonic], '同一个属低音上逐步加入 F 与 A，再回主。'),
  release: example([ninth, dominantWithSeventh, ninthTonic], '高音先从 A 落到 G，属九减为属七，再归主。'),
  invertedRelease: example([highTonic, ['B2 G3 F4 A4', 'V9/6/5'], ['D3 B3 F4{t} G4', 'V4/3'], ['F3 B3{t} D4 G4{t}', 'V2'], ['E3 C4 E4 G4{t}', 'I6']], '在属九五六上跳进引入 A。九音退到 G 时，低音从 B 移到 D，属功能继续以三四、二和弦展开。'),
  arpeggioBuildup: {
    notes: labelledChordScore([
      [['C3 E3 C4 G4', 'I', '2.']],
      [['G2 D3 B3 G4', 'V', '4'], ['G2{t} G3 B3{t} F4', 'V7', '4'], ['G2{t} F3 B3{t} A4', 'V9', '4']],
      [['G2{t} F3{t} B3{t} G4', 'V7', '4'], ['C3 E3 C4 G4{t}', 'I']]
    ], 'C', '3 4'),
    description: '属低音保持，高音掠过 F、A。九音先在同一属功能内下行到 G，其他声部才解决到主和弦。'
  }
};

const leadingMajor = ['B2 D4 F4 A4', 'viiø7'];
const leadingMinor = ['B2 D4 F4 Ab4', 'vii°7'];
const leadingFourth = ['F3 A3 B3 D4', 'viiø4/3'];
const leadingSecond = ['A2 D4 F4 B4', 'viiø2'];
const leadingResolution = {
  major: example([leadingMajor, ['C3 E4 E4 G4', 'I']], '半减导七的 D 上行和 F 下行都到 E，避免 D–A 与 C–G 的平行五度。'),
  minor: example([leadingMinor, ['C3 Eb4 Eb4 G4', 'i']], '减七和弦的 A♭ 到 G，D 与 F 汇到 E♭。', 'Cminor'),
  first: example([['D3 A3 B3 F4', 'viiø6/5'], ['E3 G3 C4 E4', 'I6']], '低音 D 到 E，导音 B 到 C。'),
  second: example([leadingFourth, ['E3 G3 C4 E4', 'I6']], '低音 F 下行到 E，D 上行到 E。'),
  third: example([leadingSecond, ['G2 C4 E4 C5', 'I6/4']], '七音 A 在低音，下行到 G，典型目标是主四六。'),
  throughV: example([leadingMajor, ['G2 B3 F4{t} G4', 'V7'], ['C3 C4 E4 G4{t}', 'I']], '高音 A 先下行至属音 G，转成属七，再归主。'),
  throughIV: example([leadingMajor, ['C3 C4 F4{t} A4{t}', 'IV6/4'], ['D3 B3 F4{t} A4{t}', 'viiø6/5'], ['E3 C4 E4 G4', 'I6']], 'F 和 A 同时保持，通过临时的下属四六回到导七，再解决到主六。'),
  throughMinorIV: example([leadingMinor, ['C3 C4 F4{t} Ab4{t}', 'iv6/4'], ['D3 B3 F4{t} Ab4{t}', 'vii°6/5'], ['Eb3 C4 Eb4 G4', 'i6']], 'F 和 A♭ 同时保持，穿过小下属四六，最后到 i₆。', 'Cminor')
};
const leadingUsage = {
  fromFour: example([leadingFourth, majorTonic], '低音 F 直接到 C，形成近似变格终止的低音路线。'),
  fromSix: example([leadingSecond, ['C3 C4 E4 C5', 'I']], '七音在低音时也可由 A 直接到原位主和弦。'),
  mixed: example([dominantSeventh, leadingFourth, ['G2 F3 B3 G4', 'V7'], ninthTonic], '导七插在两个属七之间，属功能在最后才得到解决。')
};
const thirteenth = ['G2 F3 B3 E4', 'V13/7'];
const thirteenthResolution = {
  major: example([thirteenth, ['C3 E3 C4 C4', 'I']], '高音 E 下行到主音 C，七音 F 到 E。'),
  minor: example([['G2 F3 B3 Eb4', 'V13/7'], ['C3 Eb3 C4 C4', 'i']], '小十三音 E♭ 下行到 C，导音 B 上行到 C。', 'Cminor'),
  first: example([['B2 G3 F4 E5', 'V13/6/5'], ['C3 G3{t} E4 C5', 'I']], '三音在低音，B 上行至 C，十三音仍在高音。'),
  third: example([['F3 G3 B3 E4', 'V13/2'], ['E3 G3{t} C4 C4', 'I6']], '七音在低音，F 下行到 E，进入主六和弦。'),
  kept: example([thirteenth, ['C3 E3 C4 E4{t}', 'I']], '少见的处理。E 保持，成为主和弦三音。'),
  toFifth: example([thirteenth, ['C2 E3 C4 G4', 'I']], '少见的处理。十三音 E 到主和弦五音 G。'),
  alternating: example([dominantWithSeventh, ['G2{t} F3{t} B3{t} E4', 'V13/7'], ['C3 E3 C4 C4', 'I']], '上方先奏属音 G，再在同一属功能内转到十三音 E，最后到主音 C。')
};

const submediant = ['A2 C4 E4 C5', 'vi'];
const mediant = ['E3 G3 E4 B4', 'iii'];
const mediantSixth = ['G2 B3 G4 E5', 'iii6'];
const leadingTriadSixth = ['D3 F3 D4 B4', 'vii°6'];
const majorFunction = {
  plagal: example([highTonic, ['F3 A3 F4 C5', 'IV'], highTonic], '原位 IV 承担下属功能。'),
  substitute: example([highTonic, ['D3 F3 F4 A4', 'ii'], highTonic], '同一位置的 ii 替代 IV，仍是下属回主。'),
  compound: example([highTonic, subdominant, dominant, highTonic], '主–下属–属–主的基本骨架。'),
  expansion: example([highTonic, submediant, subdominant, dominant, highTonic], 'vi 在 I 与 IV 之间延长功能，并保持两个共同音。')
};
const majorSecond = {
  parallel: example([['F3 D4 F4 A4', 'ii6'], ['G2 C4 E4 G4', 'K6/4']], '次中音 D 与高音 A 同时下行到 C 和 G，形成平行五度。'),
  fourths: example([['F2 A3 F4 D5', 'ii6'], ['G2 G3 E4 C5', 'K6/4']], 'D 放到 A 上方，变成 A–D 到 G–C 的平行四度。'),
  leap: example([['F2 F4 A4 D5', 'ii6'], ['G2 C4 G4 E5', 'K6/4']], '次中音 F 下跳四度到 C，避免和其他声部平行。')
};
const majorThird = {
  toTonic: example([mediant, ['C3 G3{t} E4{t} C5', 'I']], '高音导音 B 上行到 C，另两个上方声部保持。'),
  descending: example([['C3 E4 G4 C5', 'I'], ['E3 E4 G4 B4', 'iii'], ['F3 C4 F4 A4', 'IV'], ['C3 C4 E4 G4', 'I']], '下行 C–B–A–G 中，B 配 iii，随后用 IV。'),
  inverted: example([mediantSixth, highTonic], 'iii₆ 以 G 为低音，高音 E 到 C。')
};
const deceptive = {
  normal: example([dominantSeventh, ['C3 E3 C4 C4', 'I']], '导音 B 上行至 C，属低音也到 C。'),
  deceptive: example([dominantSeventh, ['A2 E3 C4 C4', 'vi']], '导音仍到 C，低音改走 G–A，vi 重复三音 C。'),
  expanded: example([subdominant, dominant, ['A2 E3 C4 C5', 'vi']], 'IV 预备属功能，低音在最后避开主音。'),
  doubledFifthWarning: example([['A2 E3 C4 E4', 'vi'], ['G2 D3 B3 D4', 'V']], '这一写法不佳。vi 重复五音 E，接 V 时低音 A–G 和次中音 E–D 形成平行五度。'),
  doubledThirdToDominant: example([['A2 E3 C4 C5', 'vi'], ['G2 F3 D4 B4', 'V7']], 'vi 改为重复三音 C。次中音 E 上行到 F，与下行的低音作反向进行。')
};
const majorLeading = {
  rootless: example([['G2 D4 F4 B4', 'V7'], ['B2 D4 F4 D5', 'vii°']], '根音 G 离开，留下 B、D、F，重复 D。'),
  first: example([leadingTriadSixth, highTonic], '高音 B 上行到 C，vii°₆ 可担任属功能。'),
  second: example([['F3 D4 B4 D5', 'vii°6/4'], ['C3 E4 C5 G5', 'I']], '低音 F 到 C，形成变格式的低音走向。'),
  passing: weakExample([['E3 G3 C4 C5', 'I6'], leadingTriadSixth, highTonic], '第一转位的导三在弱拍作经过，低音 E–D–C 逐级下行。'),
  neighbor: weakExample([['E3 G3 C4 C5', 'I6'], leadingTriadSixth, ['E3 G3 C4 C5', 'I6']], '第一转位的导三在弱拍作辅助，低音 E–D–E 往返。')
};
const secondarySixFour = {
  second: weakExample([['D3 F4 A4 D5', 'ii'], ['E3 E4 A4{t} C5', 'vi6/4'], ['F3 D4 A4{t} D5', 'ii6']], '低音 D–E–F，vi₆₄ 从原位 ii 经过到 ii₆。'),
  sixth: weakExample([['C3 E4 A4 A4', 'vi6'], ['B2 E4{t} G4 B4', 'iii6/4'], ['A2 E4{t} A4 C5', 'vi']], '低音 C–B–A，经 iii₆₄ 从 vi₆ 回到原位 vi。'),
  neighbor: weakExample([['A2 A3 C4 E4', 'vi'], ['A2{t} A3{t} D4 F4', 'ii6/4'], ['A2{t} A3{t} C4 E4', 'vi']], '两个 A 保持，上方 C、E 各上行一步再返回，ii₆₄ 位于两次 vi 之间。')
};
const majorCadences = {
  authentic: example([mediantSixth, highTonic], 'iii₆ 替代 V，仍保有属到主的方向。'),
  authenticLeading: example([leadingTriadSixth, highTonic], 'vii°₆ 的 B 上行到 C，保留正格式的导音归向。'),
  plagalSixth: example([['A2 C4 E4 C5', 'vi'], highTonic], 'vi 与 I 共用 C、E，六级低音直接回到主音。'),
  plagalSecond: example([['F3 A3 F4 D5', 'ii6'], highTonic], 'ii₆ 保留 F–C 的下属到主低音线。'),
  plagal: example([['F3 B3 D4 D5', 'vii°6/4'], highTonic], '第二转位的导三由下属低音 F 回到主音 C。'),
  compoundSixth: example([['A2 E3 C4 C5', 'vi'], ['G2 F3 D4 B4', 'V7'], highTonic], 'vi 占据通常由 IV 承担的属前位置。'),
  compoundSecond: example([['D3 F4 F4 A4', 'ii'], ['G3 D4 F4 B4', 'V7'], ['C4 E4 G4 C5', 'I']], '原位 ii 以三音 F 连接到 V₇ 的七音。'),
  compoundLeadingSixth: example([['D3 D4 F4 B4', 'vii°6'], ['G3 D4 F4 B4', 'V7'], ['C4 E4 G4 C5', 'I']], '导三的第一转位保留上方三音，加入属低音后归主。'),
  compoundLeadingFour: example([['F2 D3 D4 B4', 'vii°6/4'], ['G2 F3 D4 B4', 'V7'], highTonic], '低音以 F–G–C 连接导三的第二转位、V₇ 和 I。'),
  compound: example([['F3 F4 A4 D5', 'ii6'], ['G3 E4 G4 C5', 'K6/4'], ['G3 D4 F4 B4', 'V7'], ['C4 E4 G4 C5', 'I']], 'ii₆ 引入终止四六，再经 V₇ 到 I。')
};

const studies = {
  invertedSeventhPhrase: fourPartScore([
    'C3.4 F3.8 | E3.4 B2.8 | C3.8 A2.8 A3.8 | G3.4 { d } | F3.4 E3.8 | D3.4 C3.8 | B2.8 G3.8 G3.8 | C3.4 { d }',
    'E4.4 B3.8 | C4.4 D4.8 | C4.4 { d } | C4{t}.4 B3.8 | B3.4 C4.8 | B3.4 C4.8 | D4.8 B3.8 D4.8 | C4.4 { d }',
    'G4.4 { d } | G4{t}.4 { d } | G4{t}.8 F4.4 | G4.4 { d } | G4.4 { d } | G4{t}.4 { d } | G4{t}.4 F4.8 | E4.4 { d }',
    'C5.4 D5.8 { txt "V2" } | E5.4 F5.8 { txt "V6/5" } | E5.8 C5.8 C5.8 | E5.4 D5.8 | D5.4 { txt "V2" } E5.8 | F5.4 { txt "V4/3" } E5.8 | F5.8 { txt "V6/5" } D5.8 B4.8 { txt "V7" } | C5.4 { d txt "I" }'
  ], 'C', '3 8'),
  ninthHalfCadence: fourPartScore([
    'G3.2 C4.4 | B3.2 F#3.4 | G3.2 C4.4 | D3.2 { d }',
    'D4.2 { d } | D4{t}.2 { d } | D4{t}.2 E4.4 | D4.2 { d }',
    'G4.2 F#4.4 | G4.2 A4.4 | G4.2 { d } | F#4.2 { d }',
    'B4.2 { txt "I" } E5.4 { txt "V9/2" } | D5.2 { txt "I6" } C5.4 | B4.2 C5.4 | A4.2 { d txt "V" }'
  ], 'G', '3 4'),
  thirteenthPhrase: fourPartScore([
    'A2.2 F3.2 | D3.2 C3.2 | E3.2 E2.2 | A2.1',
    'A3.1 | B3.2 A3.2 | G#3.1 | A3.1',
    'C4.4 E4.4 A4.2 | G#4.2 A4.4 E4.4 | E4.2 D4.2 | C4.1',
    'A4.4 C5.4 D5.4 A4.4 | F5.2 { txt "vii°4/3" } E5.4 C5.4 | B4.2 { txt "V" } C5.2 { txt "V13/7" } | A4.1 { txt "i" }'
  ], 'Aminor', '4 4'),
  secondaryTriadPhrase: fourPartScore([
    'C3.8 | E3.8 F3.8 G3.8 A3.8 G3.8 F3.8 | E3.8 D3.8 C3.8 G3.4 E3.8 | D3.8 A3.8 F3.8 G3.8 A3.8 G3.8 | F3.8 G3.8 G2.8 C3.4',
    'E4.8 | C4.4 C4.8 C4.4 C4.8 | C4.8 D4.8 E4.8 B3.4 C4.8 | A3.8 C4.8 C4.8 B3.8 C4.8 B3.8 | A3.8 G3.8 G3.8 G3.4',
    'G4.8 | G4.8 A4.8 G4.8 F4.8 G4.8 A4.8 | G4.8 B4.8 G4.8 G4.4 G4.8 | F4.8 A4.8 A4.8 G4.8 F4.8 G4.8 | A4.8 E4.8 F4.8 E4.4',
    String.raw`\ac C5.8 { txt "I" } | G5.8 { txt "I6" } F5.8 { txt "IV" } E5.8 { txt "I6/4" } F5.8 { txt "IV6" } E5.8 { txt "I6/4" } D5.8 { txt "IV" } | C5.8 { txt "I6" } F5.8 { txt "vii°6" } E5.8 { txt "I" } D5.4 { txt "V" } C5.8 { txt "I6" } | F5.8 { txt "ii" } E5.8 { txt "vi" } F5.8 { txt "IV" } D5.8 { txt "V" } F5.8 { txt "IV6" } E5.8 { txt "iii6" } | D5.8 { txt "ii6" } C5.8 { txt "K6/4" } B4.8 { txt "V7" } C5.4 { txt "I" }`
  ], 'C', '6 8')
};

mountHarmonyOptions({
  seventhInversions, inversionOmissions, invertedExceptions, inversionUsage,
  ninthVoicing, ninthPaths, ninthChecks, ninthExpansion,
  leadingResolution, leadingUsage, thirteenthResolution,
  majorFunction, majorSecond, majorThird, deceptive, majorLeading, majorCadences, secondarySixFour
}, studies);
