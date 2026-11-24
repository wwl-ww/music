import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { baseMelody, baseScore } from './style-reharm-base.js';
import { chord, half, harmonicScore } from './style-reharm-1-score.js';

const voices = {
  C: 'C3 G3 C4 E4',
  'C · 四度': 'C3 A3 D4 G4',
  'F · 四度': 'F2 A3 D4 G4',
  'C · 严格四度': 'C3 F3 Bb3 Eb4',
  'C · D起叠': 'C3 D3 G3 C4',
  'C · E起叠': 'C3 E3 A3 D4',
  'C · G起叠': 'C3 G3 C4 F4',
  'C · B起叠': 'C3 B3 E4 A4',
  'C/E': 'E2 G3 C4 E4',
  'Cadd9/E · 高排列': 'E2 G3 D4 C5',
  'Fadd9 · 高排列': 'F2 C4 G4 A4',
  'Cadd9/E': 'E2 C4 D4 G4',
  Fadd9: 'F2 A3 C4 F4 G4',
  F: 'F2 F3 C4 A4',
  Am: 'A2 A3 C4 E4',
  'Am · 顶声': 'A2 C4 E4 A4',
  'Am(maj7)': 'A2 C4 E4 G#4',
  'Am7 · 顶声': 'A2 C4 E4 G4',
  Am6: 'A2 C4 E4 F#4',
  Am7: 'A2 G3 C4 E4',
  'Am(maj7)/G♯': 'G#2 C4 E4 G#4',
  'Am(maj7)/G♯ · 固定顶声': 'G#2 C4 E4 A4',
  'Am7/G': 'G2 G3 A3 C4 E4',
  'Am7/G · 固定顶声': 'G2 C4 E4 A4',
  'Am7/G · 同向': 'G2 C4 E4 G4',
  'Am6/F♯': 'F#2 F#3 A3 C4 E4',
  'Am6/F♯ · 固定顶声': 'F#2 C4 E4 A4',
  'Am6/F♯ · 同向': 'F#2 C4 E4 F#4',
  F6: 'F2 A3 C4 D4',
  'F6 · 顶声': 'F2 A3 C4 D4 F4',
  Fm6: 'F2 Ab3 C4 D4',
  Em7: 'E3 B3 D4 G4',
  A7: 'A2 C#3 E4 G4',
  'A7(♭9)': 'A2 Bb3 C#4 G4',
  'A7(♭9) · 低三音': 'A2 C#3 Bb3 G4',
  Dm7: 'D3 A3 C4 F4',
  Dm11: 'D3 A3 C4 G4',
  G7: 'G2 B3 D4 F4',
  'G7(♭9)': 'G2 Ab3 B3 G4',
  'E♭7': 'Eb3 Bb3 Db4 G4',
  'D♭7(♯11)': 'Db3 Ab3 Cb4 G4'
};

const middle = [
  half('Am', 'Am(maj7)/G♯'), 'Am7/G', half('Am6/F♯', 'F6'), 'F6', 'Fm6'
];
const ending = [half('Em7', 'A7(♭9)'), half('Dm11', 'G7(♭9)'), 'C · 四度'];
const bossaHarmony = [
  'C · 四度', 'C · 四度', 'F · 四度', 'C · 四度', ...middle, 'Cadd9/E', 'Fadd9',
  'Cadd9/E', 'Fadd9', half('Em7', 'A7(♭9) · 低三音'), ...ending.slice(1)
];
const coda = ['F · 四度', 'C · 四度', 'F · 四度', 'C · 四度'];
const codaMelody = ['r.1', 'r.1', 'r.1', 'r.1'];

function bossaChords(pitches, duration, change, label) {
  if (duration === 1) {
    return `${chord(pitches, label, 4)} r.8 ${chord(pitches, '', 8)} r.4 ${chord(pitches, '', 4)}`;
  }
  return change === 0 ?
    `${chord(pitches, label, 4)} r.8 ${chord(pitches, '', 8)}` :
    `r.8 ${chord(pitches, label, 8)} ${chord(pitches, '', 4)}`;
}

const bossaBass = (pitch, duration) => duration === 1 ? `${pitch}.2 ${pitch}.2` : `${pitch}.${duration}`;
const rhythm = { leadProgram: 0, chordProgram: 24, bassProgram: 32, playChords: bossaChords, playBass: bossaBass };
const bossa = (melody, bars, options) => harmonicScore(melody, bars, voices, options);

function mount(id, steps, { tempo = 96, sectionNavigation } = {}) {
  mountScoreWritingSteps(document.getElementById(id), {
    steps: steps.map(([label, description, notes]) => ({ label, description, notes })),
    score: { tempo, sectionNavigation, soundFontUrl: bandSoundFont }
  });
}

mount('style-bossa-finished', [
  ['巴萨诺瓦成品', '十六小节旋律之下，尼龙弦吉他在正拍与反拍入拍，低音维持两大拍。尾奏附加四小节，回用 C 与 F 上方的共同四度排列。', bossa([...baseMelody, ...codaMelody], [...bossaHarmony, ...coda], rhythm)],
  ['共同基谱', '保持相同速度，以 C、F、G 三和弦配置同一条十六小节旋律。', baseScore({ tempo: 96 })],
  ['巴萨诺瓦和声', '节奏用长和弦还原和声布局。开头和弦少，句中有半音声部，二–五进行集中在主句结尾。', bossa(baseMelody, bossaHarmony)]
], { sectionNavigation: {} });

const heldTopMelody = baseMelody.slice(0, 4);
mount('style-bossa-quartal', [
  ['三度叠置', 'C 与 F 都有大三度和纯五度。上方随最低音更换。', bossa(heldTopMelody, ['C', 'C', 'F', 'C'])],
  ['从根音连续叠四度', '在 C 低音上直接加 F、B♭、E♭。出现调外的 B♭ 与 E♭ 后，原来的 C 大调主和弦色彩变弱。', bossa(heldTopMelody, ['C · 严格四度', 'C · 严格四度', 'F', 'C'])],
  ['固定上方三音', 'C 与 F 两处都把 A–D–G 放在上方。最低音从 C 换到 F，F 上的 A 是大三度。', bossa(heldTopMelody, ['C · 四度', 'C · 四度', 'F · 四度', 'C · 四度'])]
]);

const candidateMelody = ['E5.1'];
mount('style-bossa-quartal-workbench', [
  ['A 起叠', '上方 A3–D4–G4 是连续纯四度。旋律 E5 补出大三度，伴奏顶音低于旋律。', bossa(candidateMelody, ['C · 四度'])],
  ['D 起叠', 'D3–G3–C4 也是连续纯四度。D3 与低音 C3 贴近，上方的 C4 又重复主音。', bossa(candidateMelody, ['C · D起叠'])],
  ['E 起叠', 'E3–A3–D4 仍是两组纯四度。E3 离 C3 只有大三度，伴奏本身已经给出明晰的大和弦色彩。', bossa(candidateMelody, ['C · E起叠'])],
  ['G 起叠', 'G3–C4–F4 是纯四度叠置。最低的 C3–G3 形成纯五度，C4 再重复主音，会强化空五度。', bossa(candidateMelody, ['C · G起叠'])],
  ['B 起叠', 'B3–E4–A4 是纯四度叠置，B 是 C 的大七音。E4 与旋律 E5 相隔八度，会在伴奏里加重旋律这个音。', bossa(candidateMelody, ['C · B起叠'])]
]);

const add9Melody = baseMelody.slice(9, 13);
mount('style-bossa-alternation', [
  ['三和弦低音 E–F', 'C/E 与 F 交替。低音已经作半音移动，和声保留三和弦。', bossa(add9Melody, ['C/E', 'F', 'C/E', 'F'])],
  ['和声顶音随低音移动', 'C 与 F 都加入九音，和声的顶音在 C5 与 A4 间移动。部分位置会接近主旋律的音区。', bossa(add9Melody, ['Cadd9/E · 高排列', 'Fadd9 · 高排列', 'Cadd9/E · 高排列', 'Fadd9 · 高排列'])],
  ['和声顶音固定 G', '和声顶音改为 G4。Cadd9/E 保留 D4–G4 的四度，Fadd9 保留 C4–F4 的四度。', bossa(add9Melody, ['Cadd9/E', 'Fadd9', 'Cadd9/E', 'Fadd9'])]
]);

const clicheExample = ['E5.1', 'C5.1', 'A5.1'];
mount('style-bossa-line-placement', [
  ['半音线在顶声', '前两小节低音固定 A2。顶声从 A4 降到 G♯4、G4、F♯4，再落 F4。', bossa(clicheExample, [half('Am · 顶声', 'Am(maj7)'), half('Am7 · 顶声', 'Am6'), 'F6 · 顶声'])],
  ['半音线在低音', '前两小节的和声顶声保持 A4。最低音从 A2 降到 G♯2、G2、F♯2，再落 F2。', bossa(clicheExample, [half('Am · 顶声', 'Am(maj7)/G♯ · 固定顶声'), half('Am7/G · 固定顶声', 'Am6/F♯ · 固定顶声'), 'F6 · 顶声'])],
  ['低音与顶声同向', '低音和伴奏顶声都走 A–G♯–G–F♯–F。中间的 C4、E4 在前两小节维持不动。', bossa(clicheExample, [half('Am · 顶声', 'Am(maj7)/G♯'), half('Am7/G · 同向', 'Am6/F♯ · 同向'), 'F6 · 顶声'])]
]);

const middleMelody = baseMelody.slice(4, 9);
mount('style-bossa-cliche', [
  ['低音维持根音', '从 Am 经过句中走向 F6。前两小节低音都停在 A。', bossa(middleMelody, ['Am', 'Am', 'F6', 'F6', 'F6'])],
  ['半音下行', '低音从 A 经 G♯、G、F♯ 到 F。A 小调的三音 C 与五音 E 可在前四个和声位置保持，F6 接住低音。', bossa(middleMelody, [...middle.slice(0, -1), 'F6'])],
  ['下属小和弦', '经过 F6 后，低音 F 与上方 C、D 保持，只把 A 降为 A♭，成为 Fm6。', bossa(middleMelody, middle)]
]);

const cadenceMelody = ['G4.1', 'A4.2 G4.2', 'E4.4 G4.4 C5.2'];
mount('style-bossa-cadence', [
  ['保留调内 Am7', 'Em7–Am7 之后仍有 Dm7–G7。G7–C 明确承担最后的回主。', bossa(cadenceMelody, [half('Em7', 'Am7'), half('Dm7', 'G7'), 'C'])],
  ['两组二–五', 'Em7–A7 把 Dm7 当作局部目标，Dm7–G7 又指向 C。', bossa(cadenceMelody, [half('Em7', 'A7'), half('Dm7', 'G7'), 'C'])],
  ['四个声部 · 固定顶音', '上方顶音维持 G。A7 加 B♭，G7 加 A♭。Dm11 保留 G，和声中省略三音 F，内声形成 D–C♯–C–B 与 B–B♭–A–A♭ 两条半音线。', bossa(cadenceMelody, ending)],
  ['保持上声，只换低音', 'A7(♭9) 变为 E♭7，G7(♭9) 变为省略三音的 D♭7(♯11)。上方只作等音换写，低音 E–E♭–D–D♭–C 连续下行。', bossa(cadenceMelody, [half('Em7', 'E♭7'), half('Dm11', 'D♭7(♯11)'), 'C · 四度'])]
]);
