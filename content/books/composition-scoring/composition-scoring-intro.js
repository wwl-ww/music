import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const majorMotif = ['E4.4 G4.4 E4.4 E5.4', 'F4.4 A4.4 D4.4 G4.4', 'E4.4 G4.4 D4.4 G4.4', 'A4.4 F4.4 C5.2'];
const minorMotif = ['C4.4 E4.4 A4.4 C5.4', 'A4.4 F4.4 B4.4 A4.4', 'E4.4 B4.4 D5.4 E5.4', 'C5.2 A4.2'];

const C = '(C3 E3 G3 C4)';
const Am = '(A2 E3 A3 C4)';
const Em = '(E3 G3 B3 E4)';
const Dm = '(D3 A3 D4 F4)';
const F = '(F3 A3 C4 F4)';
const G = '(G2 D3 G3 B3)';
const G7 = '(G2 F3 B3 D4)';
const Bm7b5 = '(B2 F3 A3 D4)';
const Em7 = '(E3 B3 D4 G4)';
const E7 = '(E3 B3 D4 G#4)';
const minorTonic = '(A2 E3 C4 A4)';

function duet(melody, accompaniment, { meter = '4 4', key = 'C', speed } = {}) {
  const timing = String.raw`\ts (${meter}) \ks ${key}`;
  const tempo = speed ? String.raw` \tempo ${speed}` : '';
  return {
    scoreTracks: [
      { name: '旋律', program: 0, phrase: `${timing}${tempo} ${melody.join(' | ')}` },
      { name: '伴奏', program: 0, phrase: String.raw`${timing} \clef F4 ${accompaniment.join(' | ')}` }
    ]
  };
}

function mount(id, steps, tempo = 92) {
  mountScoreWritingSteps(document.getElementById(id), { steps, score: { tempo } });
}

function chord(pitches, name, duration) {
  return `${pitches}.${duration} { ch "${name}" }`;
}

const tonic = chord(C, 'C', 2);
const aMinorChord = chord(Am, 'Am', 2);
const fMajorChord = chord(F, 'F', 2);
const dominantSeventh = chord(G7, 'G7', 2);
const majorLoop = [
  `${tonic} ${aMinorChord}`, `${chord(Dm, 'Dm', 2)} ${dominantSeventh}`,
  `${tonic} ${chord(G, 'G', 2)}`, `${fMajorChord} ${tonic}`
];

mount('scoring-basic-major', [
  {
    label: 'I–vi 循环 · IV–I 句尾',
    description: '开头从 C 经 Am、Dm 到 G7，再落回 C。末小节由 F 回 C。',
    notes: duet(majorMotif, majorLoop)
  },
  {
    label: 'I–iii 循环 · IV–I 句尾',
    description: '第一小节后半的 Am 换为 Em。旋律的 E 是两个和弦的共同音。后面的和弦与旋律保持一致。',
    notes: duet(majorMotif, [`${tonic} ${chord(Em, 'Em', 2)}`, ...majorLoop.slice(1)])
  },
  {
    label: 'I–vi 循环 · V7–I 句尾',
    description: '前三小节相同。句尾的 F 换成 G7，伴奏里的 B、F 分别移向 C、E。旋律沿用原来的音。',
    notes: duet(majorMotif, [...majorLoop.slice(0, 3), `${dominantSeventh} ${tonic}`])
  }
]);

const minorLeadIn = [`${aMinorChord} ${fMajorChord}`, chord(Bm7b5, 'Bm7(♭5)', 1)];
const minorEnd = chord(minorTonic, 'Am', 1);
const minorKey = { key: 'Aminor' };
mount('scoring-basic-minor', [
  {
    label: '自然小调 · Em7',
    description: 'Am–F–Bm7(♭5)–Em7–Am。伴奏最高音 G 到 A 相距全音，D 到 C 同时下行。',
    notes: duet(minorMotif, [...minorLeadIn, chord(Em7, 'Em7', 1), minorEnd], minorKey)
  },
  {
    label: '和声小调 · E7',
    description: '旋律、和弦其余音与节奏相同。伴奏的 G 升成 G♯，以半音上行至 A。',
    notes: duet(minorMotif, [...minorLeadIn, chord(E7, 'E7', 1), minorEnd], minorKey)
  }
]);

mount('scoring-basic-tempo', [
  { speed: 72, time: '约 13.3 秒' },
  { speed: 120, time: '8 秒' },
  { speed: 156, time: '约 6.2 秒' }
].map(({ speed, time }) => ({
  label: `♩ = ${speed}`,
  description: `♩ = ${speed}。旋律、和弦和记谱时值保持一致，四小节共 16 拍，按谱面速度${time}。`,
  notes: duet(majorMotif, majorLoop, { speed })
})), 72);

const meterMotif = ['E4.4 G4.4 C5.2', 'F4.4 A4.4 C5.2', 'D4.4 F4.4 B4.2', 'G4.4 E4.4 C4.2'];
const threeNoteBars = [['E4', 'G4', 'C5'], ['F4', 'A4', 'C5'], ['D4', 'F4', 'B4'], ['G4', 'E4', 'C4']];
const waltzMotif = threeNoteBars.map(pitches => pitches.map(pitch => `${pitch}.4`).join(' '));
const compoundMotif = threeNoteBars.map(([first, middle, last]) => `${first}.4 ${middle}.8 ${middle}{t}.8 ${last}.4`);
const bassAndChord = [['C3', C], ['F3', F], ['G2', G7], ['C3', C]];
const fourBeat = bassAndChord.map(([bass, chord]) => `${bass}.4 ${chord}.4 ${bass}.4 ${chord}.4`);
const threeBeat = bassAndChord.map(([bass, chord]) => `${bass}.4 ${chord}.4 ${chord}.4`);
const compoundBeat = bassAndChord.map(([bass, chord]) => `${bass}.4 { d } ${chord}.4 { d }`);
mount('scoring-basic-meter', [
  {
    label: '四四拍',
    description: '在第 1、3 拍落低音，和弦在第 2、4 拍回应。每小节末音持续两拍。',
    notes: duet(meterMotif, fourBeat)
  },
  {
    label: '三四拍',
    description: '每小节第一拍落低音，随后两拍都奏和弦。旋律音高顺序相同，末音缩为一拍。',
    notes: duet(waltzMotif, threeBeat, { meter: '3 4' })
  },
  {
    label: '六八拍',
    description: '旋律沿用三四拍版的起音位置与实际时值。伴奏按三个八分音符一组，第二组从第 4 个八分位置开始。旋律中音用延音线跨过这个分组。',
    notes: duet(compoundMotif, compoundBeat, { meter: '6 8' })
  }
], 108);
