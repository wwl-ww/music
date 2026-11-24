import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountGuitarChordDiagrams } from '../../shared/formats/guitar-chord-diagram.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const harmony = {
  C: ['E4 G4 C5', 'C3'],
  'C arriving': ['G4 C5 E5', 'C3', 'C'],
  F: ['F4 A4 C5', 'F2'],
  'F ending': ['F4 C5 A5', 'F2', 'F'],
  Fm: ['F4 C5 Ab5', 'F2'],
  'A♭': ['Eb4 C5 Ab5', 'Ab2'],
  'C ending': ['E4 C5 G5', 'C3', 'C'],
  'G7 ending': ['F4 B4 D5 G5', 'G2', 'G7'],
  G: ['D4 G4 B4', 'G2'],
  'G/B': ['D4 G4 B4', 'B2'],
  G7: ['D4 F4 B4', 'G2'],
  'G7 arriving': ['G4 B4 D5 F5', 'G2', 'G7'],
  Bdim: ['D4 F4 B4', 'B2'],
  Am: ['E4 A4 C5', 'A2'],
  'Am/G': ['E4 A4 C5', 'G2'],
  Am7: ['E4 G4 A4 C5', 'A2'],
  Dm7: ['F4 A4 C5', 'D3'],
  'Dm7 arriving': ['F4 A4 C5 D5', 'D3', 'Dm7'],
  Em: ['G4 B4 E5', 'E3'],
  Em7: ['G4 B4 D5 E5', 'E3'],
  'Bm7(♭5)': ['F4 A4 D5', 'B2'],
  B7: ['F#4 A4 D#5', 'B2'],
  E7: ['G#4 B4 D5', 'E3'],
  A7: ['E4 G4 C#5', 'A2'],
  D7: ['F#4 A4 C5', 'D3'],
  'F♯dim7': ['Eb4 A4 C5', 'F#2'],
  'D♭7': ['F4 Ab4 Cb5', 'Db3'],
  'E♭7': ['Db4 G4 Bb4', 'Eb3']
};

function score(bars, { melody, bassLine } = {}) {
  const top = [];
  const low = [];
  for (const bar of bars) {
    const upper = [];
    const lower = [];
    for (const [symbol, length] of bar) {
      const [notes, bass, name = symbol] = harmony[symbol];
      upper.push(`(${notes}).${length} { ch "${name}" }`);
      lower.push(`${bass}.${length}`);
    }
    top.push(upper.join(' '));
    low.push(lower.join(' '));
  }

  const tracks = [
    { name: '和弦', program: 0, phrase: top.join(' | ') },
    { name: '贝斯', program: 33, phrase: String.raw`\clef F4 ${(bassLine ?? low).join(' | ')}` }
  ];
  if (melody) tracks.unshift({ name: '旋律', program: 0, phrase: melody.join(' | ') });
  return { scoreTracks: tracks };
}

function progression(...symbols) {
  const bars = [];
  for (let i = 0; i < symbols.length; i += 2) {
    bars.push(i + 1 < symbols.length
      ? [[symbols[i], 2], [symbols[i + 1], 2]]
      : [[symbols[i], 1]]);
  }
  return score(bars);
}

function mount(id, steps, tempo = 100) {
  mountScoreWritingSteps(document.getElementById(id), {
    steps, score: { tempo, soundFontUrl: bandSoundFont }
  });
}

mount('rock-functional-paths', [
  {
    label: 'I–IV–V7–I',
    description: 'C–F–G7–C。属七中的 B、F 分别去往 C、E。',
    notes: progression('C', 'F', 'G7', 'C')
  },
  {
    label: 'I–ii7–V7–I',
    description: '第二个和弦的上方 F、A、C 原样保留，贝斯改弹 D。Dm7 和 G7 的根音构成五度关系。',
    notes: progression('C', 'Dm7', 'G7', 'C')
  },
  {
    label: 'I–ii7–vii°–I',
    description: '把 G7 的根音 G 换成 B。上方的 D、F、B 仍相同，带着导音去往 C。',
    notes: progression('C', 'Dm7', 'Bdim', 'C')
  }
]);

mount('rock-dominant-chain', [
  {
    label: '调内五度链',
    description: 'Bm7(♭5)–Em7–Am7–Dm7–G7–C。低音依次沿下行五度关系前进。全句使用 C 大调的音。',
    notes: progression('Bm7(♭5)', 'Em7', 'Em7', 'Am7', 'Am7', 'Dm7 arriving', 'Dm7 arriving', 'G7 arriving', 'C arriving')
  },
  {
    label: '局部使用副属',
    description: '低音与各目标的落点维持不变。E7 的 G♯ 走到 Am7 的 A，A7 的 C♯ 走到 Dm7 的 D。',
    notes: progression('Bm7(♭5)', 'Em7', 'E7', 'Am7', 'A7', 'Dm7 arriving', 'Dm7 arriving', 'G7 arriving', 'C arriving')
  },
  {
    label: '连续使用副属',
    description: 'B7、E7、A7、D7 依次引向 Em7、Am7、Dm7、G7，句末仍由 G7 回 C。',
    notes: progression('B7', 'Em7', 'E7', 'Am7', 'A7', 'Dm7 arriving', 'D7', 'G7 arriving', 'C arriving')
  }
]);

mountGuitarChordDiagrams(document.getElementById('rock-c-inversion-fingerings'), [
  { label: 'C · 原位', firstFret: 3, positions: [null, null, null, 5, 5, 3], degrees: [null, null, null, 'R', '3', '5'] },
  { label: 'C/E · 第一转位', firstFret: 7, positions: [null, null, null, 9, 8, 8], degrees: [null, null, null, '3', '5', 'R'] },
  { label: 'C/G · 第二转位', firstFret: 11, positions: [null, null, null, 12, 13, 12], degrees: [null, null, null, '5', 'R', '3'] }
]);

mount('rock-slash-bass', [
  {
    label: '根音低音',
    description: '低声部与和弦根音一致。第二个低音是 G。',
    notes: progression('C', 'G', 'Am', 'G', 'F', 'G7', 'C')
  },
  {
    label: '低音改用转位',
    description: '第二个和弦的上方 D、G、B 不动，贝斯由 G 改为 B。前五个低音连成 C–B–A–G–F。',
    notes: progression('C', 'G/B', 'Am', 'G', 'F', 'G7', 'C')
  },
  {
    label: '同一低音再配和声',
    description: '贝斯照旧。第四个位置的低音 G 上面改奏 A、C、E，合奏形成 Am/G。',
    notes: progression('C', 'G/B', 'Am', 'Am/G', 'F', 'G7', 'C')
  }
]);

mount('rock-passing-diminished', [
  {
    label: 'F–G7–C',
    description: 'F 直接走到 G7。F 的低音维持到小节末。',
    notes: score([[['F', 1]], [['G7', 2], ['C', 2]]])
  },
  {
    label: '加入 F♯dim7',
    description: '第一小节后两拍加 F♯dim7。贝斯 F–F♯–G 连走两个半音，上方的 E♭ 随后降到 D。',
    notes: score([[['F', 2], ['F♯dim7', 2]], [['G7', 2], ['C', 2]]])
  }
]);

mount('rock-tritone-substitution', [
  {
    label: 'Dm7–G7–C',
    description: '低音按五度关系前进，B 和 F 分别解决到 C 和 E。',
    notes: progression('Dm7', 'G7', 'C')
  },
  {
    label: 'Dm7–D♭7–C',
    description: 'G7 改成 D♭7。低音 D–D♭–C 半音下行，C♭、F 仍分别走到 C、E。',
    notes: progression('Dm7', 'D♭7', 'C')
  },
  {
    label: '两处三全音替代',
    description: 'E♭7 替代原本指向 Dm7 的 A7，D♭7 替代 G7。贝斯成为 E–E♭–D–D♭–C。',
    notes: progression('Em', 'E♭7', 'Dm7 arriving', 'D♭7', 'C')
  }
]);

mount('rock-borrowed-cadence', [
  {
    label: 'F–G7–C',
    description: 'F–G7–C，最后由属七回主。最高音走 A–G–G。',
    notes: progression('F ending', 'G7 ending', 'C ending')
  },
  {
    label: 'F–Fm–C',
    description: '第二个和弦借用 Fm。前两个低音都为 F，最高音 A–A♭–G 半音下行。',
    notes: progression('F ending', 'Fm', 'C ending')
  },
  {
    label: 'F–A♭–C',
    description: '最高音保持 A–A♭–G。第二个低音变成 A♭，中间和弦也从小三和弦改为大三和弦。',
    notes: progression('F ending', 'A♭', 'C ending')
  }
]);

const melody = [
  'E4.4 G4.4 G4.8 B4.8 G4.4',
  'A4.4 C5.4 A4.4 F4.4',
  'F4.4 A4.4 G4.4 F4.4',
  'E4.4 G4.4 C5.2'
];
mount('rock-reharmonization', [
  {
    label: '基础伴奏',
    description: '只用 C、F、G7。旋律第二小节的重拍 A，第三小节的重拍 F 都由 F 和弦承接。',
    notes: score([[['C', 1]], [['F', 1]], [['F', 2], ['G7', 2]], [['C', 1]]], { melody })
  },
  {
    label: '重配和声',
    description: '第一小节经 C–G/B，第二小节经 Am–F，构成 C–B–A–G–F 的低音线。第三小节的 Dm7 把 F 保留在和弦里，并接出 D–G–C 的根音走向。',
    notes: score([
      [['C', 2], ['G/B', 2]],
      [['Am', 2], ['F', 2]],
      [['Dm7', 2], ['G7', 2]],
      [['C', 1]]
    ], {
      melody,
      bassLine: ['C3.2 B2.2', 'A2.4 A2.8 G2.8 F2.2', 'D3.2 G2.4 B2.4', 'C3.1']
    })
  }
], 104);
