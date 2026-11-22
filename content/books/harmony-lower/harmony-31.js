import { fourPartScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';

function score(voices, description) {
  return { notes: fourPartScore(voices, 'C', '4 4'), description };
}

const weakMelody = [
  'E5.4 { txt "I" } F5.8 { txt "+" } E5.8 G5.4 A5.8 { txt "+" } G5.8',
  'E5.4 { txt "vi" } D5.8 { txt "+" } E5.8 C5.4 B4.8 { txt "+" } C5.8',
  'D5.4 { txt "ii" } E5.8 { txt "+" } D5.8 B4.4 { txt "V7" } C5.8 { txt "+" } B4.8',
  'C5.1 { txt "I" }'
];
const changedHarmony = weakMelody.map((bar, index) => [
  bar.replace('txt "I"', 'txt "I6"'),
  bar.replace('txt "vi"', 'txt "I"'),
  bar.replace('txt "ii"', 'txt "ii6/5"'),
  bar
][index]);
const weakToneHarmonization = {
  outline: {
    notes: String.raw`\ks C \ts (4 4) E5.2 G5.2 | E5.2 C5.2 | D5.2 B4.2 | C5.1`,
    description: '同一拍内的短辅助音归入骨干长音，留下能支撑和弦的音。'
  },
  basic: score([
    'C3.1 | A2.1 | D3.2 G2.2 | C3.1',
    'E4.1 | C4.1 | A3.2 D4.2 | C4.1',
    'G4.1 | A4.2 E4.2 | F4.2 F4.2 | E4.1',
    weakMelody.join(' | ')
  ], '弱分位的辅助音仍保留。第三小节在 D、B 两个骨干音上更换和弦。'),
  alternate: score([
    'E3.1 | C3.1 | F3.2 G2.2 | C3.1',
    'C4.1 | C4.1 | C4.2 D4.2 | C4.1',
    'G4.1 | G4.1 | A4.2 F4.2 | E4.1',
    changedHarmony.join(' | ')
  ], '旋律与节奏相同。低音 E 和 F 分别形成 I₆ 与 ii₆₅，中段也可用 I 支撑 E、C。')
};

const earlyWeakMelody = 'E4.4 G4.8 A4.8 A4{t}.4 C5.4 | B4.2 C5.2';
const weakBeatHarmony = {
  early: score([
    'C3.4 { d txt "I" } F2.8 { txt "IV" } F2{t}.2 | G2.2 { txt "V7" } C3.2 { txt "I" }',
    'G3.4 { d } A3.8 A3{t}.2 | F3.2 E3.2',
    'C4.1 | D4.2 C4.2',
    earlyWeakMelody
  ], 'IV 从第二拍的后半拍进入。A 虽在弱位，发声时已经是 IV 的三音。'),
  late: score([
    'C3.2 { txt "I" } F2.2 { txt "IV" } | G2.2 { txt "V7" } C3.2 { txt "I" }',
    'G3.2 A3.2 | F3.2 E3.2',
    'C4.1 | D4.2 C4.2',
    earlyWeakMelody.replace('A4.8', 'A4.8 { txt "+" }')
  ], 'IV 从第三拍才进入。先响起的 A 属于后面的 IV，在 I 上的半拍是先现音。')
};

const tiedMelody = 'G4.4 C5.4 C5{t}.4 B4.4 | C5.1';
const suspensionBass = [
  'C3.2 { txt "I" } G2.2 { txt "V7" } | C3.1 { txt "I" }',
  'G3.2 D4.2 | C4.1',
  'E4.2 F4.2 | E4.1'
];
const accentedToneHarmonization = {
  suspension: score([
    ...suspensionBass,
    tiedMelody.replace('C5{t}.4', 'C5{t}.4 { txt "+" }')
  ], '第三拍已经换成 V₇。高音 C 从 I 延续到这一拍，随后下行到 B。'),
  harmonyBeforeMelody: score([
    ...suspensionBass,
    'r.4 C5.4 C5{t}.4 { txt "+" } B4.4 | C5.1'
  ], '高音第一拍休止。低音和内声部已经确立 I，第二拍的 C 因而有清楚的预备和声。'),
  later: score([
    'C3.2 { d txt "I" } G2.4 { txt "V7" } | C3.1 { txt "I" }',
    'G3.2 { d } D4.4 | C4.1',
    'E4.2 { d } F4.4 | E4.1',
    tiedMelody
  ], 'V₇ 到第四拍才进入，延续的 C 始终在 I 上。'),
  appoggiatura: score([
    'C3.2 { txt "I" } G2.2 { txt "V7" } | C3.1 { txt "I" }',
    'G3.2 B3.2 | C4.1',
    'E4.2 F4.2 | E4.1',
    'E4.2 A4.4 { txt "+" } G4.4 | G4.2 E4.2'
  ], '高音跳到强位的 A，和下方 G–B–F 同时响起，再下行至和弦音 G。'),
  neighborHarmony: score([
    'G2.4 { txt "V" } F3.4 { txt "IV" } G2.2 { txt "V" } | C3.1 { txt "I" }',
    'D4.4 C4.4 D4.2 | C4.1',
    'G4.4 A4.4 G4.2 | E4.1',
    'B4.4 C5.4 A4.4 { txt "+" } B4.4 | C5.1'
  ], 'IV 插在两个 V 之间。第二个 V 的 A 是倚音，解决到 B 后再归主。')
};

const theme = [
  ['C3.1 { txt "I" }', 'F3.1 { txt "IV" }', 'G2.1 { txt "V7" }', 'C3.1 { txt "I" }'],
  ['E4.1', 'F4.1', 'D4.1', 'C4.1'],
  ['G4.1', 'A4.1', 'F4.1', 'E4.1'],
  ['C5.1', 'C5.1', 'B4.1', 'C5.1']
];

const singing = [
  'C5.4 B4.8 { txt "+" } C5.8 C5.2',
  'C5.4 D5.8 { txt "+" } C5.8 A4.2',
  'B4.2 A4.4 { txt "+" } B4.4',
  'C5.1'
];
const flourishes = [
  'C5.8 D5.8 { txt "+" } E5.8 G5.8 E5.8 F5.8 { txt "+" } G5.8 E5.8',
  'C5.8 D5.8 { txt "+" } E5.8 { txt "+" } F5.8 A5.8 G5.8 { txt "+" } F5.8 C5.8',
  'B4.8 C5.8 { txt "+" } D5.8 F5.8 D5.8 E5.8 { txt "+" } F5.8 B4.8',
  'C5.1'
];
const lowerMotion = [
  'C3.4 { txt "I" } D3.8 { txt "+" } E3.8 F3.8 { txt "+" } E3.8 D3.8 { txt "+" } E3.8',
  'F3.4 { txt "IV" } G3.8 { txt "+" } A3.8 Bb3.8 { txt "+" } A3.8 G3.8 { txt "+" } F3.8',
  'G2.4 { txt "V7" } A2.8 { txt "+" } B2.8 C3.8 { txt "+" } B2.8 A2.8 { txt "+" } G2.8',
  'C3.1 { txt "I" }'
];
const altoAnswers = [
  'G4.2 F4.8 { txt "+" } G4.8 G4.4',
  'A4.2 G4.8 { txt "+" } A4.8 A4.4',
  'F4.2 E4.8 { txt "+" } F4.8 F4.4',
  'E4.1'
];

function variation(parts, description) {
  return score(theme.map((bars, voice) => (parts[voice] ?? bars).join(' | ')), description);
}

const voiceDecoration = {
  theme: variation({}, '每小节一个骨干和弦，第三小节的 F 已是 V₇ 的七音。'),
  singing: variation({ 3: singing }, '高音保留长时值，只在少数位置加入短辅助音。'),
  inner: variation({ 2: altoAnswers }, '加饰转到中音，时值与高音分开。'),
  bass: variation({ 0: lowerMotion }, '低音在原来的和声范围内活动，仍以小节起点的根音支持和声。'),
  florid: variation({ 3: flourishes }, '高音改以成组八分音符展开，外音与和弦分解音相间。')
};

const multiVoiceDecoration = {
  doublePassing: variation({
    1: ['E4.4 F4.4 { txt "+" } G4.2', ...theme[1].slice(1)],
    3: ['C5.4 D5.4 { txt "+" } E5.2', ...theme[3].slice(1)]
  }, 'E–F–G 与 C–D–E 同时级进。F、D 分别连起两个和弦音，低音始终支撑 I。'),
  synchronous: variation({
    1: ['E4.4 F4.4 { txt "+" } E4.2', 'F4.4 G4.4 { txt "+" } F4.2', 'D4.1', 'C4.1'],
    2: ['G4.4 A4.4 { txt "+" } G4.2', 'A4.4 Bb4.4 { txt "+" } A4.2', 'F4.1', 'E4.1']
  }, '两个内声部在相同拍位移动，平行三度暂时离开和弦，低音保留原骨架。'),
  doubleNeighbor: variation({
    2: ['G4.4 F4.4 { txt "+" } G4.2', ...theme[2].slice(1)],
    3: ['C5.4 D5.4 { txt "+" } C5.2', ...theme[3].slice(1)]
  }, '中音 G 与高音 C 同时向相反方向走到辅助音，再回到同一主和弦。'),
  doubleSuspension: score([
    'C3.1 { txt "I" } | G2.1 { txt "V7" } | C3.1 { txt "I" }',
    'G3.1 | F3.1 | E3.1',
    'C4.1 | C4{t}.2 { txt "+" } B3.2 | C4.1',
    'E4.1 | E4{t}.2 { txt "+" } D4.2 | E4.1'
  ], 'C 与 E 由 I 沿延音线保持到 V₇。两条留音同步下行，落在属和弦的三音 B、五音 D。'),
  doubleAppoggiatura: score([
    'C3.1 { txt "I" } | G2.1 { txt "V7" } | C3.1 { txt "I" }',
    'E3.1 | F3.1 | E3.1',
    'G3.1 | C4.2 { txt "+" } B3.2 | C4.1',
    'C4.1 | E4.2 { txt "+" } D4.2 | E4.1'
  ], '两个声部在 V₇ 开始时分别跳入 C 与 E，随后下行到 B 与 D。解决音与双留音相同。'),
  alternating: variation({
    0: [theme[0][0], lowerMotion[1], ...theme[0].slice(2)],
    3: [flourishes[0], theme[3][1], flourishes[2], theme[3][3]]
  }, '第一、三小节由高音展开，第二小节转移到低音。'),
  polyphonic: variation({
    0: ['C3.2 E3.4 D3.4', 'F3.2 A3.4 G3.4', 'G2.2 B2.4 D3.4', 'C3.1'],
    2: altoAnswers,
    3: singing
  }, '高、低音各有不同节奏，内声部以更舒缓的线条填补间隙。'),
  imitation: variation({
    0: ['r.4 G2.8 D3.8 E3.4 C3.4', ...lowerMotion.slice(1)],
    3: ['G4.8 C5.8 B4.4 { txt "+" } C5.2', ...singing.slice(1)]
  }, '高音先从 G 上行四度到 C，低音稍后以 G–D 的五度回应。')
};

mountHarmonyOptions({
  'weak-tone-harmonization': weakToneHarmonization,
  'weak-beat-harmony': weakBeatHarmony,
  'accented-tone-harmonization': accentedToneHarmonization,
  'voice-decoration': voiceDecoration,
  'multi-voice-decoration': multiVoiceDecoration
});
