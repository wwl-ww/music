import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { renderRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const hook = 'G4.8 A4.8 G4.4 E4.4 r.4';
const refrainEnd = 'E4.4 G4.4 D4.4 C4.4';
const leadIn = 'D4.4 E4.4 F4.4 r.4';
const meter = String.raw`\ts (4 4) `;

function mount(id, steps, tempo = 96) {
  mountScoreWritingSteps(document.getElementById(id), { steps, score: { tempo, soundFontUrl } });
}

function duet(melody, harmony, speed) {
  const tempo = speed ? String.raw`\tempo ${speed} ` : '';
  return { scoreTracks: [
    { name: '旋律', program: 73, phrase: meter + tempo + melody },
    { name: '和声', program: 0, phrase: String.raw`${meter}\clef F4 ${harmony}` }
  ] };
}

function chord(voicing, symbol, duration = 2) {
  return `(${voicing}).${duration} { ch "${symbol}" }`;
}

mount('pop-hook-drafts', [
  {
    label: '一句记忆点',
    description: '两短一长的句头在 G–A–G 上形成回折，随后降到 E 并空出一拍。',
    notes: meter + hook
  },
  {
    label: '重复并收束',
    description: '第二小节复用 G–A–G 的句头，把 E 改成 D，第三至第四小节才走到主音 C。',
    notes: meter + [hook, 'G4.8 A4.8 G4.4 D4.4 r.4', 'E4.4 G4.4 E4.4 D4.4', 'C4.2 r.2'].join(' | ')
  }
]);

const voicings = {
  C: 'C3 G3 C4 E4', 'G/B': 'B2 G3 B3 D4', Am: 'A2 E3 A3 C4',
  F: 'F2 C3 A3 C4', G: 'G2 D3 G3 B3',
  Fmaj7: 'F2 C3 E3 A3', Em: 'E3 B3 E4 G4', Em7: 'E3 G3 B3 D4',
  Dm: 'D3 A3 D4 F4', G7: 'G2 F3 B3 D4'
};

function progression(symbols) {
  const chords = symbols.map(symbol => chord(voicings[symbol], symbol));
  const bars = [];
  for (let index = 0; index < chords.length; index += 2) {
    bars.push(chords.slice(index, index + 2).join(' '));
  }
  return String.raw`${meter}\clef F4 ${bars.join(' | ')}`;
}

mount('pop-chord-loops', [
  {
    label: 'vi–IV–V–I',
    description: 'Am–F–G–C 从关系小调的主和弦出发，经 G 落到大调主和弦。',
    notes: progression(['Am', 'F', 'G', 'C'])
  },
  {
    label: 'IVmaj7–V–iii7–vi',
    description: 'Fmaj7–G–Em7–Am 把句尾停在 Am。G 后避开 C，先经过 Em7。',
    notes: progression(['Fmaj7', 'G', 'Em7', 'Am'])
  },
  {
    label: '低音下行',
    description: '低音从 C 经 B、A、G、F、E 到 D，最后去到 G。G/B 里的 B 来自和弦转位。',
    notes: progression(['C', 'G/B', 'Am', 'G', 'F', 'Em', 'Dm', 'G'])
  }
]);

renderRangeKeyboards(document.getElementById('pop-vocal-ranges'), [
  { name: '男声试写参考', main: 'F3–G4', open: [] },
  { name: '女声试写参考', main: 'A3–C5', open: [] }
], { firstOctave: 3, octaves: 3, caption: '两组试写音域', rangeLabel: '参考' });

const introHarmony = `${chord(voicings.G7, 'G7', 1)} | ${chord(voicings.C, 'C', 1)}`;

mount('pop-hook-entry', [
  {
    label: '正拍入口',
    description: '副歌第一个 G 和 C 和弦一起在下一小节第一拍进入。前一小节最后一拍留给换气。',
    notes: duet(`${leadIn} | ${hook}`, introHarmony)
  },
  {
    label: '句内切分',
    description: '副歌的 E 从第 2 拍后半起音，跨过整个第 3 拍，到第 4 拍停下。副歌入口与换和弦的位置不变。',
    notes: duet(`${leadIn} | G4.8 A4.8 G4.8 E4.4 { d } r.4`, introHarmony)
  },
  {
    label: '跨小节先行音',
    description: '副歌的 G 提前半拍，在 G7 上先发声，用延音线续到 C 和弦进入。谱面上的副歌首拍没有第二次起音。',
    notes: duet('D4.4 E4.4 F4.4 r.8 G4.8 | G4{t}.8 A4.8 G4.4 E4.4 r.4', introHarmony)
  }
]);

mount('pop-hook-tempo', [
  { speed: 84, gap: '约 0.71 秒' },
  { speed: 112, gap: '约 0.54 秒' },
  { speed: 128, gap: '约 0.47 秒' }
].map(({ speed, gap }) => ({
  label: `♩ = ${speed}`,
  description: `旋律和和弦不变。第一小节的四分休止实际长${gap}。`,
  notes: duet(`${leadIn} | ${hook}`, introHarmony, speed)
})), 84);

const repeats = [
  { label: '维持 C 大调', key: 'C', motif: hook, end: refrainEnd, harmony: voicings.C },
  { label: '上移半音', key: 'Db', motif: 'Ab4.8 Bb4.8 Ab4.4 F4.4 r.4', end: 'F4.4 Ab4.4 Eb4.4 Db4.4', harmony: 'Db3 Ab3 Db4 F4' },
  { label: '上移全音', key: 'D', motif: 'A4.8 B4.8 A4.4 F#4.4 r.4', end: 'F#4.4 A4.4 E4.4 D4.4', harmony: 'D3 A3 D4 F#4' },
  { label: '上移小三度', key: 'Eb', motif: 'Bb4.8 C5.8 Bb4.4 G4.4 r.4', end: 'G4.4 Bb4.4 F4.4 Eb4.4', harmony: 'Eb3 Bb3 Eb4 G4' },
  { label: '下移小三度', key: 'A', motif: 'E4.8 F#4.8 E4.4 C#4.4 r.4', end: 'C#4.4 E4.4 B3.4 A3.4', harmony: 'A2 E3 A3 C#4' }
];

const oldTonic = chord(voicings.C, 'C', 1);
mount('pop-hook-transposition', repeats.map(({ label, key, motif, end, harmony }) => {
  const keyLabel = key.replace('b', '♭');
  const newTonic = chord(harmony, keyLabel, 1);
  const keyChange = key === 'C' ? '' : String.raw`\ks ${key} `;
  return {
    label,
    description: key === 'C'
      ? '两次副歌片段都在 C 大调，音高和节奏一致。'
      : `前两小节在 C 大调，第 3 小节改用 ${keyLabel} 大调的调号。两次副歌片段的节奏和音程一致。`,
    notes: duet([hook, refrainEnd, keyChange + motif, end].join(' | '), [oldTonic, oldTonic, keyChange + newTonic, newTonic].join(' | '))
  };
}));
