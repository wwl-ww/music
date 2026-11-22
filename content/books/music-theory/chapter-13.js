import { mountScore } from '../../shared/formats/score.js';
import { mountOrnamentComparison } from '../../shared/formats/ornament-comparison.js';
import { mountRepeatRoute } from '../../shared/formats/repeat-route.js';

const tremolo = document.getElementById('tremolo-realization');
const tremoloForm = tremolo.querySelector('form');
const tremoloPrinted = tremolo.querySelector('[data-tremolo-printed]');
const tremoloStrokes = tremoloForm.elements.strokes;
const tremoloScore = tremolo.querySelector('[data-tremolo-score]');
const tremoloCue = tremolo.querySelector('output');
let tremoloPlayer;

function updateTremolo() {
  const { source, pulse } = tremoloForm.elements;
  const double = source.value === 'double';
  const measured = pulse.value === 'measured';
  tremoloStrokes.disabled = !measured;
  const strokes = measured ? Number(tremoloStrokes.value) : 3;
  const division = 4 * 2 ** strokes;
  const count = division / 2;
  const strokePath = Array.from({ length: strokes }, (_, index) => double
    ? `M33 ${11 + 3 * index}l24 -5`
    : `M26 ${14 + 3 * index}l12 -5`).join(' ');
  tremoloPrinted.innerHTML = `<svg class="inline-staff ornament-source" viewBox="0 -5 84 39" role="img" aria-label="${double ? '双震音' : '单震音'}，${strokes} 道斜线">
    <path class="inline-staff-lines" d="M1 7H83 M1 12H83 M1 17H83 M1 22H83 M1 27H83"/>
    <text x="26" y="22">&#xE0A3;</text><path d="M32 22V5"/>
    ${double ? '<text x="52" y="17">&#xE0A3;</text><path d="M58 17V0"/>' : ''}
    <path d="${strokePath}" style="stroke-width:2"/>
  </svg>`;
  const notes = Array.from({ length: count }, (_, index) => {
    const pitch = double && index % 2 === 1 ? 'B4' : 'G4';
    return `${pitch}.${division}`;
  }).join(' ');
  const notation = String.raw`\ts (2 4) ${notes}`;
  if (tremoloPlayer) tremoloPlayer.setNotes(notation);
  else tremoloPlayer = mountScore(tremoloScore, { notation: 'staff', tempo: 72, notes: notation });
  const subdivision = { 8: '八分', 16: '十六分', 32: '三十二分' }[division];
  tremoloCue.textContent = measured ? `两拍共奏 ${count} 个${subdivision}音符。` : '不定量震音的展开谱采用示例速度，实际重复次数随奏法而定。';
}

tremoloForm.addEventListener('change', updateTremolo);
updateTremolo();

const main = (length = 1) => ['G4', length, 'main'];
const upper = () => ['A4', 1, 'upper'];
const lower = (length = 1) => ['F4', length, 'lower'];

mountOrnamentComparison(document.getElementById('mordent-comparison'), ({ side, count }) => {
  const neighbour = side === 'up' ? upper : lower;
  const twice = count === 'double';
  return {
    glyph: twice ? null : side === 'up' ? '\uE56C' : '\uE56D',
    wave: twice && side,
    events: twice ? [main(), neighbour(), main(), neighbour(), main(4)] : [main(), neighbour(), main(6)],
    text: '竖划决定往下，波形长度表示往返次数。'
  };
});

mountOrnamentComparison(document.getElementById('turn-comparison'), ({ side, timing }) => {
  const delayed = timing === 'late';
  const [first, second] = side === 'up' ? [upper, lower] : [lower, upper];
  return {
    glyph: side === 'up' ? '\uE567' : '\uE568',
    delayed,
    events: delayed ? [main(3), first(), main(), second(), main(2)] : [first(), main(), second(), main(5)],
    text: delayed ? '回音在附点四分音符后半段进入，接到下一个音。' : '从拍点进入回音，最后的主要音持续到第二拍结束。'
  };
});

mountOrnamentComparison(document.getElementById('trill-comparison'), ({ start, interval, ending }) => {
  const prefix = start === 'lower';
  const tail = ending === 'tail';
  const half = interval === 'half';
  const neighbour = half ? () => ['Ab4', 1, 'upper'] : upper;
  const first = start === 'upper' ? neighbour : main;
  const second = start === 'upper' ? main : neighbour;
  const alternations = Array.from({ length: 8 - Number(prefix) - 2 * Number(tail) },
    (_, index) => (index % 2 === 0 ? first : second)());
  return {
    glyph: '\uE566', accidental: half ? '\uE260' : null, prefix, tail,
    events: [...(prefix ? [lower()] : []), ...alternations, ...(tail ? [lower(), main()] : [])],
    text: prefix || tail ? '小音符标出交替前的引入或交替后的收尾。' : '交替音持续两拍，起奏音和邻音距离由选项决定。'
  };
});

mountRepeatRoute(document.getElementById('repeat-route'), {
  repeat: {
    bars: [{ name: 'A' }, { name: 'B', start: true }, { name: 'C', end: true }, { name: 'D' }],
    steps: [0, 1, 2, 1, 2, 3],
    cues: { 3: '第一次到终止反复线，跳回 B。', 5: 'B–C 已奏两遍，进入 D。' }
  },
  fromStart: {
    bars: [{ name: 'A' }, { name: 'B', end: true }, { name: 'C' }],
    steps: [0, 1, 0, 1, 2],
    cues: { 2: '谱面没有起始反复线，从曲首 A 回奏。', 4: '完成两遍，进入 C。' }
  },
  combined: {
    bars: [{ name: 'A', start: true }, { name: 'B', end: true }, { name: 'C', start: true }, { name: 'D', end: true }, { name: 'E' }],
    steps: [0, 1, 0, 1, 2, 3, 2, 3, 4],
    cues: { 2: '左侧两点关闭 A–B，回到 A。', 4: 'A–B 已奏两遍。右侧两点从 C 开启第二段。', 6: 'D 的终止反复线跳回 C。' }
  },
  fourTimes: {
    bars: [{ name: 'A', start: true }, { name: 'B', end: true, label: '×4' }, { name: 'C' }],
    steps: [0, 1, 0, 1, 0, 1, 0, 1, 2],
    cues: { 2: '第 2 遍从 A 开始。', 4: '第 3 遍从 A 开始。', 6: '第 4 遍从 A 开始。', 8: 'A–B 共奏四遍，进入 C。' }
  },
  endings: {
    bars: [{ name: 'A', start: true }, { name: 'B' }, { name: 'C', ending: 1, end: true }, { name: 'D', ending: 2 }],
    steps: [0, 1, 2, 0, 1, 3],
    cues: { 2: '第一遍奏一房 C。', 3: '从一房末尾跳回 A。', 5: '第二遍跳过一房 C，接二房 D。' }
  },
  longEnding: {
    bars: [{ name: 'A', start: true }, { name: 'B', ending: '1', span: 2 }, { name: 'C', end: true }, { name: 'D', ending: '2' }],
    steps: [0, 1, 2, 0, 3],
    cues: { 2: '第一遍奏完一房覆盖的 B–C。', 4: '第二遍跳过整段一房，从 A 直接进入 D。' }
  },
  sharedEnding: {
    bars: [{ name: 'A', start: true }, { name: 'B', ending: '1, 3', end: true }, { name: 'C', ending: '2', end: true }, { name: 'D' }],
    steps: [0, 1, 0, 2, 0, 1, 3],
    cues: { 1: '第一遍奏 B。', 3: '第二遍奏 C。', 5: '第三遍再奏 B。', 6: '三遍奏完，进入 D。' }
  },
  dc: {
    bars: [{ name: 'A' }, { name: 'B' }, { name: 'C', label: 'D.C.' }],
    steps: [0, 1, 2, 0, 1, 2],
    cues: { 3: '从曲首 A 回奏。', 5: '回奏至段末，结束。' }
  },
  ds: {
    bars: [{ name: 'A' }, { name: 'B', sign: 'segno' }, { name: 'C', label: 'D.S.' }],
    steps: [0, 1, 2, 1, 2],
    cues: { 3: '从 Segno 所在的 B 回奏。', 4: '回奏至段末，结束。' }
  },
  dcFine: {
    bars: [{ name: 'A' }, { name: 'B', label: 'Fine' }, { name: 'C', label: 'D.C. al Fine' }],
    steps: [0, 1, 2, 0, 1],
    cues: { 1: '第一遍经过 Fine，仍继续到 C。', 3: 'D.C. 指定回到曲首 A。', 4: '回奏到 Fine，结束。' }
  },
  dsFine: {
    bars: [{ name: 'A' }, { name: 'B', sign: 'segno' }, { name: 'C', label: 'Fine' }, { name: 'D', label: 'D.S. al Fine' }],
    steps: [0, 1, 2, 3, 1, 2],
    cues: { 2: '第一遍经过 Fine，继续到 D。', 4: '从 Segno 所在的 B 开始回奏。', 5: '回奏到 Fine，结束。' }
  },
  dcCoda: {
    bars: [{ name: 'A' }, { name: 'B', label: 'To Coda' }, { name: 'C', label: 'D.C. al Coda' }, { name: 'D', sign: 'coda', label: 'Coda' }],
    steps: [0, 1, 2, 0, 1, 3],
    cues: { 1: '第一遍经过 To Coda，继续到 C。', 3: 'D.C. 指定回到曲首 A。', 5: '从 To Coda 跳到尾声 D。' }
  },
  dsCoda: {
    bars: [{ name: 'A' }, { name: 'B', sign: 'segno' }, { name: 'C', label: 'To Coda' }, { name: 'D', label: 'D.S. al Coda' }, { name: 'E', sign: 'coda', label: 'Coda' }],
    steps: [0, 1, 2, 3, 1, 2, 4],
    cues: { 2: '第一遍经过 To Coda，继续到 D。', 4: 'D.S. 指定回到 Segno 所在的 B。', 5: '回奏到 To Coda，准备跳接尾声。', 6: '跳过 D，进入 Coda。' }
  },
  dcSegnoCoda: {
    bars: [{ name: 'A' }, { name: 'B', sign: 'segno' }, { name: 'C', label: 'D.C. al segno|e poi la Coda' }, { name: 'D', sign: 'coda', label: 'Coda' }],
    steps: [0, 1, 2, 0, 1, 3],
    cues: { 3: 'D.C. 指定回到曲首 A。', 5: '回奏到 B 的 Segno 后，跳入尾声 D。' }
  },
});
