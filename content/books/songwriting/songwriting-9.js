import { lyricBars, mountSongVariants } from './songwriting-score.js';

function section(label, words, bars, key = 'C') {
  return String.raw`\section ("${label}") \ks ${key} ${lyricBars(words, bars)}`;
}

const theme = ['C4.4 E4.4 G4.4 E4.4', 'F4.4 D4.4 C4.2'];
const variationTheme = section('A', '小河绕过旧石桥', theme);
const variations = {
  register: [section('A1', '长风吹过远山腰', ['E4.4 G4.4 A4.4 G4.4', theme[1]]), 'A1 改变句头的音区和音高，四字的节奏布局及 F–D–C 的收束都保留。'],
  minor: [section('A2', '夜雨沿着屋檐落', ['C4.4 Eb4.4 G4.4 Eb4.4', 'F4.4 D4.4 C4.2'], 'Cminor'), 'A2 用同主音小调。在原有位置改变三音，主音、两小节句长及落音结构仍可辨认。'],
  returnHigh: [section('A3', '灯火引我慢慢归', ['G4.4 A4.4 C5.4 A4.4', 'G4.4 D5.4 C5.2']), 'A3 回到 C 大调，高区的 D5–C5 扩大了收束。主题的四字加三字句法仍留在原来的位置。']
};
function variationRoute(route, summary) {
  return {
    tempo: 84,
    notes: String.raw`\ts (4 4) ${[variationTheme, ...route].join(' | ')}`,
    summary
  };
}

mountSongVariants('song-variation-form', {
  complete: variationRoute(Object.values(variations).map(([notes]) => notes),
    'A₁ 抬高句头而保留句尾，A₂ 在原音区改用同主音小调，A₃ 恢复大调并以高八度的 C 完成全曲。'),
  ...Object.fromEntries(Object.entries(variations).map(([id, [notes, summary]]) => [id, variationRoute([notes], summary)]))
});

const parts = {
  A: section('A', '小河绕过旧石桥', ['E4.8 G4.8 A4.8 G4.8', 'F4.8 D4.8 C4.4']),
  B: section('B', '风把灯影送回家', ['r.8 G4.8 A4.8 C5.8', 'B4.8 A4.8 G4.8 C5.8']),
  C: section('C', '夜雨沿着屋檐落', ['E5.8 D5.8 C5.8 Bb4.8', 'A4.8 G4.8 F4.4'], 'F'),
  D: section('D', '灯火引我慢慢归', ['C5.8 B4.8 A4.8 G4.8', 'E4.8 D4.8 C4.4'])
};
const firstA = section('第一组 · A', '小河绕过旧石桥一路灯影送归舟', [
  'E4.8 G4.8 A4.8 G4.8', 'F4.8 E4.8 D4.4',
  'E4.8 G4.8 A4.8 G4.8', 'A4.8 F4.8 G4.4'
]);
const secondC = section('第二组 · C', '夜雨沿着屋檐落孤舟摇过远山腰', [
  'A4.8 C5.8 E5.8 C5.8', 'A4.8 G4.8 F4.4',
  'D5.8 C5.8 A4.8 F4.8', 'A4.8 F4.8 G4.4'
]);
const sharedB = group => section(group + ' · B', '风把灯影送回家一声轻唱过桥来', [
  'r.8 G4.8 A4.8 C5.8', 'B4.8 A4.8 G4.8 D4.8',
  'F4.8 A4.8 G4.8 E4.8', 'D4.8 B3.8 C4.8 r.8'
]);
const bHarmony = '(C3 E3 G3).2 | (G2 B2 D3 F3).2 | (F3 A3 C4).2 | (G2 B2 D3 F3).4 (C3 E3 G3).4';
const pairedB = {
  tempo: 82,
  notes: String.raw`\ts (2 4) ${firstA} | ${sharedB('第一组')} | ${secondC} | ${sharedB('第二组')} ||
    \staff { score } \tuning (none) \clef F4
    (C3 E3 G3).2 | (F3 A3 C4).4 (G2 B2 D3).4 | (C3 E3 G3).2 | (D3 F3 A3).4 (G2 B2 D3).4 |
    ${bHarmony} |
    (A2 C3 E3).2 | (F3 A3 C4).2 | (D3 F3 A3).2 | (D3 F3 A3).4 (G2 B2 D3).4 |
    ${bHarmony}`,
  summary: 'A 与 C 各在属和弦上停住（第 4、12 小节）。两次 B 都以 G7–C 收束并留出换气（第 8、16 小节），形成〔A B〕〔C B〕两组。'
};

const layouts = {
  pairedA: ['ABAC', '两个两段体分别是〔A→B〕、〔A→C〕。第二组重新从 A 出发，再接另一个后段。'],
  rondo: ['ABACA', 'A 先后出现在开头、中间和结尾。B、C 是两个位置不同、材料各异的插部。'],
  returning: ['ABCA', '两个不同的中间段连续展开。A 在开头呈示，在结尾集中回归。'],
  successive: ['ABCD', '四段依次换用不同材料。D 以新曲调结束，C 大调的收束和 A 呼应。']
};
mountSongVariants('song-multiple-forms', {
  pairedB,
  ...Object.fromEntries(Object.entries(layouts).map(([id, [route, summary]]) => [id, {
    tempo: 82,
    notes: String.raw`\ts (2 4) ${[...route].map(mark => parts[mark]).join(' | ')}`,
    summary
  }]))
});
