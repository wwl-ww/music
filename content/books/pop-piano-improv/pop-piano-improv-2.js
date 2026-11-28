import { getTonic } from '../../shared/formats/pitch.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { mountScoreComparison } from '../../shared/formats/score-comparison.js';
import { mountPianoStudy, pianoHands } from './piano-lesson-score.js';

const numerals = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ'];

function diatonicChords(scale, qualities, octave, key) {
  const firstLetter = 'CDEFGAB'.indexOf(scale[0][0]);
  function note(degree) {
    const name = scale[degree % 7];
    const register = octave + Math.floor((firstLetter + degree) / 7);
    return name + register;
  }

  const right = scale.map((root, degree) => {
    const pitches = [degree, degree + 2, degree + 4].map(note).join(' ');
    return `(${pitches}).2 { txt "${numerals[degree]}${qualities[degree]} · ${root.replace('#', '♯')}${qualities[degree]}" }`;
  }).join(' | ');
  const left = scale.map((_, degree) => {
    const pitch = note(degree);
    return `${pitch.slice(0, -1)}${Number(pitch.at(-1)) - 1}.2`;
  }).join(' | ');
  return pianoHands(right, left, { key, meter: '2 4' });
}

mountPianoStudy('piano-diatonic-degrees', [
  {
    label: 'C 大调',
    description: '左手逐级弹 C3 到 B3，右手按同一音列构成三和弦。Ⅱ级的 F 是自然音，Ⅶ级的 B–D–F 是减三和弦。',
    notes: diatonicChords(['C', 'D', 'E', 'F', 'G', 'A', 'B'], ['', 'm', 'm', '', '', 'm', '°'], 4, 'C')
  },
  {
    label: 'A 自然小调',
    description: '左手由 A2 开始，主和弦是 Am。音列保留 G 自然音，因此 Ⅴ 级是 Em，Ⅶ 级是 G 大三和弦。',
    notes: diatonicChords(['A', 'B', 'C', 'D', 'E', 'F', 'G'], ['m', '°', '', 'm', 'm', '', ''], 3, 'Aminor')
  },
  {
    label: 'A 和声小调',
    description: 'G 升为 G♯，改变 Ⅲ、Ⅴ、Ⅶ 级的构成。右手 Ⅴ 级从 E–G–B 变成 E–G♯–B。',
    notes: diatonicChords(['A', 'B', 'C', 'D', 'E', 'F', 'G#'], ['m', '°', '+', 'm', '', '', '°'], 3, 'Aminor')
  },
  {
    label: 'A 旋律小调上行',
    description: 'F 和 G 都升高。Ⅱ 级成为 Bm，Ⅳ 级由 Dm 变成 D，Ⅵ 级变成以 F♯ 为根音的减三和弦。',
    notes: diatonicChords(['A', 'B', 'C', 'D', 'E', 'F#', 'G#'], ['m', 'm', '+', '', '', '°', '°'], 3, 'Aminor')
  }
], 105);

const families = {
  canon: [
    ['原型', 'C G Am Em F C F G', '左手弹各和弦根音，末尾经 F–G 形成继续回到 C 的倾向。'],
    ['倒数第二个和弦用 Dm', 'C G Am Em F C Dm G', '末段的 F 换成 Dm，两个和弦都含 F、A，Dm 让低音由 D 到 G。'],
    ['低音逐级下行', 'C G/B Am Em/G F C/E Dm G', '用 G/B、Em/G、C/E 让左手从 C3 逐级下行至 D2，再由 G2 准备回 C。'],
    ['同一低音换上方和弦', 'C Em/B Am C/G F Em Dm G', '左手仍走 C–B–A–G–F–E–D，右手在三个低音位置换成 Em、C、Em。']
  ],
  'major-loop': [
    ['原型', 'C Am F G', 'C 和 Am 共用 C、E，F 接到 G 时开始向属方向推进。'],
    ['下属位置换 Dm', 'C Am Dm G', '第三个和弦从 F 换成 Dm，低音从 D 到 G，右手仍可保留 F 和 A。'],
    ['第二个和弦换 Em', 'C Em F G', '用 Em 替换 Am，第二个低音成为 E，和 C 和弦共用 E、G。']
  ],
  'minor-loop': [
    ['原型', 'Am F C G Am', '以 Am 起句，从 F 到 C 后由 G 回到下一轮的 Am。调性感也取决于旋律和停顿的位置。'],
    ['G/B 接回 Am', 'Am F C G/B Am', '右手仍弹 G 和弦，左手倒数三个音是 C3、B2、A2。'],
    ['G 提前到 C 前', 'Am F G C G/B Am', 'F–G–C 先短暂回到 C，随后插入 G/B 接回 Am。'],
    ['Dm 接 G，再回到 C', 'Am Dm G C G/B Am', 'Dm–G–C 听到一次二五一，G/B 仍可连接到下一轮的 Am。']
  ],
  'long-return': [
    ['原型', 'F G Em Am Dm G C', '前半 F–G–Em–Am 继续展开，后半 Dm–G–C 回到主和弦。'],
    ['前两个低音都用 F', 'F G/F Em Am Dm G C', '左手在 F2 保持同一音高，右手从 F 和弦换成 G 和弦。'],
    ['用 E 加强 Am，末段用 F', 'F G/F E Am F G C', 'E 中的 G♯ 向 A 靠拢，后半改用 F–G–C 回主。']
  ],
  cadence: [
    ['Dm–G–C', 'Dm G C', '右手的 B 向 C 进行，左手由 G2 到 C3。'],
    ['Dm–G–Am', 'Dm G Am', 'G 的 B 仍能向 C 走，左手改落 A2，右手得到 Am。'],
    ['F–G–C', 'F G C', '用 F 换掉 Dm，低音先 F2–G2，再落到 C3。'],
    ['F–G–Am', 'F G Am', '准备和弦用 F，属和弦后转向 Am，左手连续走 F2–G2–A2。'],
    ['Dm–Em–Am', 'Dm Em Am', '从 A 自然小调看是 iv–v–i，Em 里的 G 到 A 有一个全音。'],
    ['Dm–E–Am', 'Dm E Am', '从 A 和声小调看是 iv–V–i，E 里的 G♯ 到 A 缩成半音。']
  ]
};

const voicings = {
  C: ['C3', 'C4 E4 G4'],
  Dm: ['D2', 'A3 D4 F4'],
  Em: ['E2', 'B3 E4 G4'],
  F: ['F2', 'A3 C4 F4'],
  G: ['G2', 'B3 D4 G4'],
  Am: ['A2', 'C4 E4 A4'],
  E: ['E2', 'B3 E4 G#4']
};
const alternateBass = { B: 'B2', G: 'G2', E: 'E2', F: 'F2' };
const demo = document.getElementById('piano-progression-models');
const familyControl = demo.querySelector('[name="family"]');
const variantControl = demo.querySelector('[name="variant"]');

function updateVariants() {
  const variants = families[familyControl.value];
  variantControl.replaceChildren(...variants.map(([label], index) => new Option(label, String(index))));
}

familyControl.addEventListener('change', updateVariants);
updateVariants();

mountProgrammaticScore(demo, {
  lowestPitch: 36,
  octaves: 3,
  showDynamics: false,
  build({ family, variant }) {
    const [, progression, explanation] = families[family][Number(variant)];
    const symbols = progression.split(' ');
    const voicing = symbols.map(symbol => {
      const [chord, bass] = symbol.split('/');
      const [root, right] = voicings[chord];
      return { left: bass ? alternateBass[bass] : root, right, symbol };
    });
    const right = voicing.map(bar => `(${bar.right}).2 { txt "${bar.symbol}" }`).join(' | ');
    const left = voicing.map(bar => `${bar.left}.2`).join(' | ');
    const pitches = voicing.flatMap(bar => [bar.left, ...bar.right.split(' ')]).map(note =>
      getTonic(note.slice(0, -1), Number(note.at(-1))).tonicPitch);
    const description = `${symbols.join('–')}。${explanation}`;
    return { notes: pianoHands(right, left, { meter: '2 4' }), pitches, description };
  }
});

const loopMelody = 'E5.4 C5.8 B4.8 A4.2 | A4.4 C5.4 F5.4 E5.4 | D5.4 B4.4 G4.4 B4.4 | E5.4 G5.4 D5.4 B4.4 | C5.2 A4.2';

function loopScore(seam) {
  const left = `(A2 C3 E3).1 { txt "Am" } | (F2 A2 C3).1 { txt "F" } | (G2 B2 D3).1 { txt "G" } | ${seam} | (A2 C3 E3).1 { txt "Am" }`;
  return { notes: pianoHands(loopMelody, left), tempo: 95, showDynamics: false };
}

mountScoreComparison(document.getElementById('piano-loop-turnaround'), {
  description: '右手音高、节奏和第五小节开头都保留。加入 G/B 的版本把第四小节分成两拍 C、两拍 G/B，低音 C3–B2–A2 接到下一轮。',
  versions: [
    { label: '整小节 C', score: loopScore('(C3 E3 G3).1 { txt "C" }') },
    {
      label: '两拍 C、两拍 G/B',
      score: loopScore('(C3 E3 G3).2 { txt "C" } (B2 D3 G3).2 { txt "G/B" }'),
      highlights: [{ staff: 2, bar: 4, beat: 2 }]
    }
  ]
});
