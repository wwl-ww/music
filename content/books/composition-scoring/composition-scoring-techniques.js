import { accompaniment, mountScoringComparison, scoringPart } from './composition-scoring-seasonal-score.js';

const piano = (notes, settings) => scoringPart('曲调', 0, notes, settings);

const susTheme = piano('E5.4 G5.4 G5.2 | D5.4 G5.4 G5.2 | C5.1');
const susDirect = accompaniment('(C3 G3 E4).1 { dy p ch "C" } | (G2 F3 B3 D4).1 { ch "G7" } | (C3 G3 E4).1 { ch "C" }');
const tonicSuspended = accompaniment(
  '(C3 E3 G3).2 { dy p ch "C" } (C3 F3 G3).2 { ch "Csus4" } | (G2 F3 B3 D4).1 { ch "G7" } | ' +
  '(C3 F3 G3).2 { ch "Csus4" } (C3 E3 G3).2 { ch "C" }'
);
const dominantSuspended = accompaniment(
  '(C3 G3 E4).1 { dy p ch "C" } | (G2 F3 C4 D4).2 { ch "G7sus4" } (G2 F3 B3 D4).2 { ch "G7" } | (C3 G3 E4).1 { ch "C" }'
);
mountScoringComparison('scoring-tech-sus', 86, [
  ['直接解决', '共同的主音段之后，G7 直接解决到 C。', susTheme, susDirect],
  ['Csus4', '第一小节以 Csus4 延续 C 低音。终止时，低音先到 C，上方 F 在同一小节稍后落到 E。', susTheme, tonicSuspended],
  ['G7sus4', 'G 低音保持。第二小节先出现 C，再落到 B 构成 G7，之后整组解决到 C。', susTheme, dominantSuspended]
]);

const augTheme = piano('E5.2 E5.2 | C5.2 F5.2 | B4.2 G4.2 | C5.1');
const augDirect = accompaniment(
  '(C3 E3 G3).2 { dy p ch "C" } (C3 E3 G3).2 | (F3 A3 C4).1 { ch "F" } | ' +
  '(G2 B2 F3 D4).2 { ch "G7" } (G2 B2 F3 D4).2 | (C3 G3 E4).1 { ch "C" }'
);
const augBridges = accompaniment(
  '(C3 E3 G3).2 { dy p ch "C" } (C3 E3 G#3).2 { ch "Caug" } | (F3 A3 C4).1 { ch "F" } | ' +
  '(G2 B2 F3 D4).2 { ch "G7" } (C3 G3 B3 D#4).2 { ch "Gaug/C" } | (C3 G3 E4).1 { ch "C" }'
);
mountScoringComparison('scoring-tech-aug', 84, [
  ['直接连接', '第一小节的 G 保持不变，进入 F 和弦时换成 A。第三小节保留 G7，随后直接到 C。', augTheme, augDirect],
  ['增和弦连接', '第一小节内部加 G♯，形成 G–G♯–A。第三小节后半先放 C 低音，上方 D–D♯–E 完成另一条半音线。', augTheme, augBridges]
]);

const dimTheme = piano('E5.2 D5.2 | C5.1 | B4.2 A4.2 | A4.2 F4.2');
function dimHarmony(dominant, middle) {
  return accompaniment(
    '(C3 E3 G3).2 { dy p ch "C" } ' + dominant + ' | (C3 E3 G3).1 { ch "C" } | ' + middle + ' | (D3 F3 A3 C4).1 { ch "Dm7" }'
  );
}
const dominantG = '(G2 F3 B3 D4).2 { ch "G7" }';
const fullMinorE = '(E3 G3 B3 D4).1 { ch "Em7" }';
const dimDirect = dimHarmony(dominantG, fullMinorE);
const dimSubstitute = dimHarmony('(C3 D3 F3 Ab3 Cb4).2 { ch "D°7/C" }', fullMinorE);
const dimPassing = dimHarmony(dominantG, '(E3 G3 B3 D4).2 { ch "Em7" } (Eb3 Gb3 Bbb3 Dbb4).2 { ch "E♭°7" }');
mountScoringComparison('scoring-tech-dim', 80, [
  ['直接连接', '前两小节 C 到 G7 再回 C，后两小节 Em7 直接到 Dm7。', dimTheme, dimDirect],
  ['减七替代属七', '开头用 D°7/C，保留属七中的 F 与 B 的等音 C♭。C 低音贯穿前两小节。', dimTheme, dimSubstitute],
  ['经过减七', '后半段加入 E♭°7，低音 E–E♭–D、内声部 G–G♭–F 同步下降，上方以 A 配合过渡。', dimTheme, dimPassing]
]);

const seventhCycle = piano('E5.4 G5.4 A4.4 E5.4 | A4.4 D5.4 G4.4 D5.4 | C5.1');
const firstTonic = '(C3 E3 G3).2 { dy p ch "C" } ';
const cycleEnd = ' (G2 B2 F3 G3).2 { ch "G7" } | (C3 E3 G3).1 { ch "C" }';
function cycleHarmony(sixth, second) {
  return accompaniment(firstTonic + sixth + ' | ' + second + cycleEnd);
}
const minorSixth = '(A2 C3 E3).2 { ch "Am" }';
const dominantSixth = '(A2 C#3 E3 G3).2 { ch "A7" }';
const minorSecond = '(D3 F3 A3).2 { ch "Dm" }';
const dominantSecond = '(D3 F#3 A3 C4).2 { ch "D7" }';
mountScoringComparison('scoring-tech-secondary', 96, [
  ['自然循环', '原循环用 C、Am、Dm、G7，末小节返回 C。', seventhCycle, cycleHarmony(minorSixth, minorSecond)],
  ['D7 → G7', '只将 Dm 改成 D7，F♯ 加入第二小节前半，随后走向 G。', seventhCycle, cycleHarmony(minorSixth, dominantSecond)],
  ['A7 → Dm', '只将 Am 改成 A7，C♯ 加入第一小节后半，随后走向 D。', seventhCycle, cycleHarmony(dominantSixth, minorSecond)],
  ['连续属七', '前两处同时改换，得到 C–A7–D7–G7–C。A7 和 D7 都为下一站准备。', seventhCycle, cycleHarmony(dominantSixth, dominantSecond)]
]);

const triple = { meter: '3 4' };
const counterTheme = piano(
  'C5.8 D5.8 E5.8 G5.8 E5.8 C5.8 | B4.8 G4.8 A4.8 B4.8 D5.8 B4.8 | A4.2 G4.4 | C5.2 { d }',
  triple
);
const counterHarmony = accompaniment(
  '(F2 F3 C4 E4).2 { d dy p } | (E2 E3 B3 D4).2 { d } | (D3 A3 C4).2 (G2 C3 F3 A3).4 | (C3 G3 B3).2 { d }',
  triple
);
const contraryCounterline = scoringPart('弦乐副旋律', 48,
  'A3.2 { d dy p } | G3.2 { d } | F4.8 G4.8 F4.8 A4.8 F4.4 | E4.8 F4.8 G4.8 E4.8 E4.4',
  triple
);
mountScoringComparison('scoring-tech-countermelody', 90, [
  ['主旋律与和声', '上声部前半较密，后半改用长音。下方只给出和声。', counterTheme, counterHarmony],
  ['加入互补副线', '前两小节用 A 和 G 托住密集主线。后两小节主线拉长，副线由 F 到 E 并在中间加密。', counterTheme, contraryCounterline, counterHarmony]
]);

const countryStyle = { key: 'Bb', meter: '6 8' };
const countryMelody = 'F4.8 G4.8 Bb4.8 D5.4 { d } | C5.8 Bb4.8 G4.8 Bb4.4 { d }';
const countryHarmony = '(Bb2 F3 D4).2 { d dy p } | (F3 A3 C4 Eb4).4 { d } (Bb2 F3 D4).4 { d }';
const country = (lead, harmony) => [piano(lead, countryStyle), accompaniment(harmony, countryStyle)];

const countryIntro = String.raw`\section ("前奏") D5.4 { d } C5.8 Bb4.8 G4.8 | A4.4 { d } Gb4.4 { d }`;
const countryTheme = String.raw`\section ("主题") ` + countryMelody;
const introPedal = '(Bb2 D3 F3 A3).4 { d dy p } (Bb2 Eb3 Bb3 G4).4 { d } | (Bb2 F3 A3 C4).4 { d } (Bb2 Eb3 Bb3 Gb4).4 { d }';

const countryDevelopment = String.raw`\section ("发展部") E5.8 F5.8 G5.8 A5.4 { d } | F5.8 Eb5.8 D5.8 G5.4 { d } |
  G5.4 { d } C#5.4 { d } | F5.8 E5.8 D5.8 C5.4 { d } |
  A4.8 Bb4.8 C5.8 Bb4.4 { d }`;
const developmentHarmony =
  '(C3 Eb3 G3 Bb3).4 { d } (F3 A3 C4 Eb4).4 { d } | (Bb2 F3 A3 D4).4 { d } (G2 F3 Bb3 D4).4 { d } | ' +
  '(E3 Bb3 D4 G4).4 { d } (A2 G3 C#4 E4).4 { d } | ' +
  '(D3 F3 A3).4 { d } (F3 A3 Eb4 Gb4).4 { d } | (F3 A3 C4).4 { d } (Bb2 F3 D4).4 { d }';

const countryReturn = String.raw`\section ("主题回归") ` + countryMelody;
const countryEnding = String.raw`\section ("尾奏") F4.8 G4.8 Bb4.8 D5.4 { d fermata medium } |
  \tempo 90 C5.8 Bb4.8 G4.8 Bb4.4 { d } |
  \tempo 76 F4.8 Gb4.8 Eb4.8 F4.4 { d } | \tempo 66 D5.4 { d } Gb4.4 { d } | \tempo 60 Bb4.2 { d }`;
const endingHarmony =
  '(Eb3 G3 Bb3).4 { d } (G2 Bb3 D4 F4).4 { d } | (C3 G3 Bb3 Eb4).4 { d } (Bb2 F3 D4).4 { d } | ' +
  '(Bb2 F3 D4).4 { d } (Bb2 Eb3 Gb3 Bb3).4 { d } | (Bb2 F3 D4).4 { d } (Bb2 Eb3 Gb3 Bb3).4 { d } | (Bb2 F3 D4).2 { d }';

mountScoringComparison('scoring-tech-form', 90, [
  ['主题', '两小节主题先以小跳上行，再逐步下行并落回 B♭。', ...country(countryMelody, countryHarmony)],
  ['独立前奏', '前两小节是新材料，低音始终在 B♭，末和弦 E♭m/B♭ 接入原主题。', ...country(
    [countryIntro, countryTheme].join(' | '), [introPedal, countryHarmony].join(' | ')
  )],
  ['发展部', '主题之后从 ii–V 进入循环，经过 I–vi 再用 Em7♭5–A7 到 Dm，最后以 F7 的张力返回 B♭。', ...country(
    [countryTheme, countryDevelopment].join(' | '), [countryHarmony, developmentHarmony].join(' | ')
  )],
  ['重配尾奏', '尾奏回用原动机，但用 E♭ 与 Gm7 托住题头。延长后回到原速，末段以持续 B♭、小下属色彩和逐小节降速接回主和弦。', ...country(
    [countryTheme, countryEnding].join(' | '), [countryHarmony, endingHarmony].join(' | ')
  )],
  ['完整小曲', '先有 B♭ 低音的前奏。主题在发展后原样回来，随后同一个题头换上新和声，经过放慢收束。', ...country(
    [countryIntro, countryTheme, countryDevelopment, countryReturn, countryEnding].join(' | '),
    [introPedal, countryHarmony, developmentHarmony, countryHarmony, endingHarmony].join(' | ')
  )]
]);

function lyricBar(words, notes) {
  let syllable = 0;
  const text = Array.from(words);
  const line = notes.split(' ').map(token => {
    const dotted = token.endsWith('*');
    const note = dotted ? token.slice(0, -1) : token;
    if (note.startsWith('r.') || note.includes('{t}')) return dotted ? note + ' { d }' : note;
    const character = text[syllable++];
    if (character === undefined) throw new Error('词曲对照中有未配词的音符。');
    return note + ' { ' + (dotted ? 'd ' : '') + 'lyrics (0 "' + character + '") }';
  }).join(' ');
  if (syllable !== text.length) throw new Error('词曲对照中有未配音的唱词。');
  return line;
}

const lyricsFront = [
  lyricBar('微风吹来檐下灯亮', 'E4.8 F4.8 G4.8 A4.8 G4.8 E4.8 F4.8 E4.8'),
  lyricBar('水边白鹭还未归', 'E4.8 F4.8 G4.8 A4.8 r.8 G4.8 F4.8 E4.8')
].join(' | ');
const lyricsBack = [
  lyricBar('钟声传来慢慢亮', 'E4.8 F4.8 G4.8 A4.8 r.8 G4.8 F4.8 E4.8'),
  lyricBar('我把归途唱成歌', 'E4.8 F4.8 G4.8 A4.8 G4.8 D4.8 C4.4')
].join(' | ');
const frontHarmony = '(C3 E3 G3).1 { dy p } | (E3 G3 B3).1';
const backHarmony = '(A2 E3 C4).1 { dy p } | (G2 F3 B3).4 { d } (C3 E3 G3).8 (G2 F3 B3 D4).4 (C3 E3 G3).4';
const sing = notes => scoringPart('歌词旋律', 53, notes);
mountScoringComparison('scoring-tech-lyric-fit', 84, [
  ['前半', '前半部最后一个字落在 E，低部的 Em 保留向后发展的空间。', sing(lyricsFront), accompaniment(frontHarmony)],
  ['后半', '两个题头保留。三字词组「慢慢亮」先留半拍，最后一个「歌」延长并落回 C。', sing(lyricsBack), accompaniment(backHarmony)],
  ['全段', '相同题头贯穿四行，同样少一个字的词组用同样的半拍空位。结尾第一次落稳在主音与主和弦上。', sing(lyricsFront + ' | ' + lyricsBack), accompaniment(frontHarmony + ' | ' + backHarmony)]
]);

const verseCue = [
  lyricBar('夜色渐深', 'r.8 A4.8 G4.8 E4.8 F4.2'),
  lyricBar('窗边微亮', 'r.8 A4.8 G4.8 F4.8 E4.2')
].join(' | ');
const chorusStart = lyricBar('远处灯火', 'G4.8 F4.8 E4.8 D4.4* r.4');
const chorusTop = lyricBar('远处灯火', 'G4.8 A4.8 B4.8 C5.4* r.4');
const choruses = accompaniment('(F3 C4 A4).1 { dy p } | (G3 B3 D4).1 | (G2 B3 D4 F4).1 | (C3 G3 E4).1');
mountScoringComparison('scoring-tech-chorus-peak', 90, [
  ['同轮廓重复', '主歌末尾延长「亮」，两次「远处灯火」使用相同的下行轮廓。', sing([verseCue, chorusStart, chorusStart].join(' | ')), choruses],
  ['第二次上推', '保留主歌和第一次出现的旋律。第二次「远处灯火」上行到 C5，长音形成高潮落点。', sing([verseCue, chorusStart, chorusTop].join(' | ')), choruses]
]);

const backingTrack = accompaniment(
  '(C3 E3 G3).2 { d dy p } | (E3 G3 B3).2 { d } | (G2 F3 Bb3 D4).2 (C3 E3 Bb3 G4).4 | (F3 C4 A4).2 { d } | (C3 E3 G3).2 { d }',
  triple
);
const harmonizedLead = scoringPart('主旋律', 73,
  'E4.4 G4.4 C5.4 | G4.4 D5.4 B4.4 | G4.2 { d } | A4.4 G4.4 F4.4 | C5.2 { d }', triple);
const lowHarmonyBars = ['C4.4 E4.4 A4.4', 'E4.4 B4.4 G4.4', 'C4.2 { d }', 'F4.4 E4.4 D4.4', 'G4.2 { d }'];
const lowHarmony = scoringPart('低声部', 52, lowHarmonyBars.join(' | '), triple);
const parallelThirds = scoringPart('低声部', 52, [
  ...lowHarmonyBars.slice(0, 2), 'E4.2 { d }', lowHarmonyBars[3], 'A4.2 { d }'
].join(' | '), triple);
const highHarmony = scoringPart('高声部', 52,
  'G4.4 B4.4 E5.4 | B4.4 G5.4 D5.4 | C5.2 { d } | C5.4 Bb4.4 A4.4 | E5.2 { d }', triple);
const lowerIndependent = scoringPart('低声部', 52,
  'C4.4 C4.4 G4.4 | E4.4 B4.4 G4.4 | F4.2 E4.4 | F4.4 C4.4 C4.4 | G4.2 { d }', triple);
const upperIndependent = scoringPart('高声部', 52,
  'G4.4 E5.4 E5.4 | B4.4 G5.4 E5.4 | Bb4.2 Bb4.4 | C5.4 A4.4 A4.4 | E5.2 { d }', triple);
mountScoringComparison('scoring-tech-harmonize', 92, [
  ['调整低三度', '主线持续在上，Gm7–C7 处改用低五度，终止处改用低四度。', harmonizedLead, lowHarmony, backingTrack],
  ['平行低三度', '保留调内低三度。Gm7 上出现十三音 E，结尾 C 和弦上出现六音 A。', harmonizedLead, parallelThirds, backingTrack],
  ['以上三度为主', '配音移到主线之上。Em 上的 D 和 Gm7–C7 上的 G 分别配高四度 G 和 C。', highHarmony, harmonizedLead, backingTrack],
  ['三声部选音', '两条配音分别选用和弦音。主旋律 G 在第三小节保持，上方 B♭ 保留，下方 F 走到 E，跟随和声从 Gm7 变成 C7。', upperIndependent, harmonizedLead, lowerIndependent, backingTrack]
]);
