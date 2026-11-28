import { mountScore } from '../../shared/formats/score.js';
import { mountScoreDefinition } from './counterpoint-definitions.js';
import { learningScores } from './counterpoint-learning.js';
import { mountScoreRelations } from './counterpoint-relations.js';

const quarter = 2;
const bar = 8;
const eighthDurations = [[8, 1], [4, 2], [2, 4], [1, 8]];

function line(pitches, lengths, bars, { delay = 0, label = '', pitchLabels = false } = {}) {
  const measures = Array.from({ length: bars }, () => []);
  let tick = 0;

  function write(pitch, remaining, caption) {
    let tied = false;
    while (remaining > 0) {
      const space = bar - tick % bar;
      const [size, duration] = eighthDurations.find(([size]) => size <= Math.min(space, remaining));
      const effect = caption && !tied ? ` { txt "${caption}" }` : '';
      measures[Math.floor(tick / bar)].push(`${pitch}${tied && pitch !== 'r' ? '{t}' : ''}.${duration}${effect}`);
      remaining -= size;
      tick += size;
      tied = true;
    }
  }

  write('r', delay);
  pitches.forEach((pitch, index) => {
    const caption = pitchLabels && pitch !== 'r' ? pitch.replace('#', '♯').replace('b', '♭') : index === 0 ? label : '';
    write(pitch, lengths[index], caption);
  });
  write('r', bars * bar - tick);
  return measures.map(measure => measure.join(' ')).join(' | ');
}

function phrase(voices, key = 'C', lowerClef = 'F4') {
  return String.raw`\ks ${key} \ts (4 4) ` + voices.map((voice, index) => index === 0 ? voice :
    String.raw`\staff { score } \tuning (none) \clef ${index === voices.length - 1 ? lowerClef : 'G2'} ${voice}`
  ).join(' || ');
}
const twoTreble = voices => phrase(voices, 'C', 'G2');

function demo(notes, description, tempo = 92) {
  return { notes, description, tempo };
}

const eighthMotion = 'E5.8 G5.8 E5.8 D5.8 C5.4 E5.4 | D5.8 F5.8 E5.8 D5.8 C5.2';
const miniatureBass = 'C4.2 G3.4 C4.4 | B3.4 G3.4 C4.2';
const echoSubject = 'E5.8 G5.8 A5.8 G5.8 E5.2 | D5.8 E5.8 G5.8 E5.8 C5.2';

const miniatureTexture = {
  density: demo(phrase([eighthMotion, miniatureBass]), '上声部的八分音符与下声部较长的音符构成密度对比。'),
  overlap: demo(phrase([eighthMotion, 'C4.2 G3.8 A3.8 B3.8 C4.8 | B3.2 G3.8 A3.8 B3.8 C4.8']), '上方开始延长时，下方接入流动音型。'),
  three: demo(phrase([eighthMotion, 'r.4 E4.4 D4.2 | F4.4 r.4 E4.2', miniatureBass]), '中声部只在部分时段活动，外声部仍保留不同的句幅和起音密度。')
};

const miniatureEcho = {
  contrast: demo(phrase([echoSubject, 'C4.2 G3.4 C4.4 | G3.4 B3.4 C4.2']), '下方有独立的节奏和走向，整个片段以对比为主。'),
  imitation: demo(phrase([echoSubject, 'C4.2 E4.8 G4.8 A4.8 G4.8 | E4.2 G3.4 C4.4']), '下方迟半小节模仿首部，之后回到自由进行，形成局部八度模仿。')
};

const miniatureForms = {
  strophic: demo(phrase([
    [eighthMotion, eighthMotion, eighthMotion].join(' | '),
    [miniatureBass, 'C4.2 E4.4 G3.4 | F3.2 G3.4 C4.4',
      'C4.8 E4.8 G3.8 A3.8 G3.4 C4.4 | G3.8 B3.8 D4.8 B3.8 C4.2'].join(' | ')
  ]), '第 1、3、5 小节都用同一主题起句。前两段的下声部疏密相近、走向不同，第三段的下声部明显增加了短音。'),
  ternary: demo(phrase([
    `${eighthMotion} | G5.4 E5.4 D5.4 G5.4 | A5.4 G5.4 F5.4 D5.4 | ${eighthMotion}`,
    `${miniatureBass} | G3.2 B3.2 | F3.2 G3.2 | ${miniatureBass}`
  ]), '第 3、4 小节的上方材料和低音都换了，停在属音 G 支撑的和声上。第 5 小节原主题和原来的低声部一起回来。')
};

const canonSubject = ['E5', 'G5', 'E5', 'C5', 'E5', 'C5', 'D5', 'F5', 'D5', 'C5'];
const canonLengths = [2, 1, 1, 2, 1, 1, 2, 1, 1, 4];
const downOctave = pitches => pitches.map(pitch => pitch.replace(/\d$/, octave => Number(octave) - 1));

function canonResponse({ delay = quarter, pitches = downOctave(canonSubject), ratio = 1 }) {
  const bars = Math.ceil((16 * ratio + delay) / bar);
  return twoTreble([
    line(canonSubject, canonLengths, bars, { label: '起句' }),
    line(pitches, canonLengths.map(length => length * ratio), bars, { delay, label: '应句' })
  ]);
}

const canonDelay = {
  beat: demo(canonResponse({}), '应句降八度、晚一拍进入，旋律方向与时值保持一致。'),
  half: demo(canonResponse({ delay: 4 }), '同一应句晚两拍进入，被叠在一起的节奏位置随之改变。'),
  measure: demo(canonResponse({ delay: 8 }), '一小节的距离给起句更多独立陈述的空间。')
};

const canonTransform = {
  original: demo(canonResponse({}), '音程方向与时值关系沿用起句。'),
  inversion: demo(canonResponse({ pitches: ['E4', 'C#4', 'E4', 'G#4', 'E4', 'G#4', 'F#4', 'D#4', 'F#4', 'G#4'] }), '以两次进入的 E 为对应轴，旋律音程方向相反，时值关系保持。'),
  double: demo(canonResponse({ ratio: 2 }), '应句的每一个时值扩大为原来的两倍。'),
  tripleLayer: demo(phrase([4, 2, 1].map((count, index) => {
    const labels = ['原时值', '两倍时值', '四倍时值'];
    const opening = canonSubject.slice(0, 6);
    const pitches = index === 0 ? opening : index === 1 ? downOctave(opening) : downOctave(downOctave(opening));
    const lengths = canonLengths.slice(0, 6).map(length => length * (4 / count));
    return line(Array(count).fill(pitches).flat(), Array(count).fill(lengths).flat(), 4,
      { label: labels[index] });
  })), '取起句首部，高、中、低层的时值比例为 1∶2∶4，高声部陈述四次，低声部陈述一次。')
};

const inventionMotive = {
  echo: demo(phrase(['C5.8 D5.8 E5.8 G5.8 E5.2 | G5.8 A5.8 B5.8 D6.8 B5.2', 'r.2 C4.8 D4.8 E4.8 G4.8 | G4.2 G4.8 A4.8 B4.8 D5.8']), '两个声部在八度上相继出现同一动机；第二组移高五度。'),
  sequence: demo(phrase(['G5.8 F5.8 E5.8 C5.8 F5.8 E5.8 D5.8 B4.8 | E5.8 D5.8 C5.8 A4.8 C5.2', 'C4.4 E4.4 B3.4 D4.4 | A3.4 C4.4 G3.4 C4.4']), '每四个八分音符形成一次下行模进，可独立跟踪上方动机与低部线条。')
};

const themeOne = 'E4.8 G4.8 E4.8 D4.8 C4.4 E4.4 | D4.8 E4.8 F4.8 D4.8 C4.2';
const themeTwo = 'C4.2 A3.4 C4.4 | B3.2 C4.2';
const upOctave = pitches => pitches.replace(/([A-G][b#]?)(\d)/g, (_, name, octave) => `${name}${Number(octave) + 1}`);

const inventionExchange = {
  first: demo(phrase([themeOne, themeTwo]), '短促的 T₁ 在上，歌唱性 T₂ 在下。'),
  exchanged: demo(phrase([upOctave(themeTwo), themeOne]), 'T₂ 升高一个八度后位于上方，两个主题各自的节奏与轮廓保持。')
};

const inventionHighEntry = 'C5.8 { txt "起句" } D5.8 E5.4 G5.2 | E5.4 G5.4 F5.4 E5.4';
const inventionMiddleEntry = 'r.2 C4.8 { txt "应句" } D4.8 E4.4 | G4.2 G4.4 C4.4';
const inventionBackground = 'C3.8 E3.8 G3.8 E3.8 C3.8 E3.8 G3.8 E3.8 | G3.8 D3.8 B3.8 D3.8 C3.8 E3.8 G3.8 E3.8';
const inventionThreeParts = {
  high: demo(phrase([inventionHighEntry, inventionMiddleEntry, inventionBackground]),
    '第一个短句在高处，中声部到第 3 拍才起奏。与这两个入口交错的，是从第 1 拍一直流动的分解和弦。'),
  middle: demo(phrase([
    'r.2 G5.8 { txt "应句" } A5.8 B5.4 | D6.2 B5.4 G5.4',
    'G4.8 { txt "起句" } A4.8 B4.4 D5.2 | B4.4 D5.4 C5.4 B4.4',
    'G3.8 B3.8 D4.8 B3.8 G3.8 B3.8 D4.8 B3.8 | D3.8 F#3.8 A3.8 F#3.8 G3.8 B3.8 D4.8 B3.8'
  ], 'G'), '题头改从中声部的 G4 开始，隔两拍在高声部的 G5 接应。低音换了和声，但仍然提供分解和弦的背景。')
};

const pentatonicInversion = {
  original: demo(phrase(['D5.4 E5.4 G5.4 A5.4 | G5.4 E5.4 C5.4 D5.4', 'D4.2 A3.2 | C4.2 D4.2']), '两个声部都由 C 宫五声音列取音，以 D 为共同轴。'),
  inverted: demo(twoTreble(['D5.4 C5.4 A4.4 G4.4 | A4.4 C5.4 E5.4 D5.4', 'D4.2 G4.2 | E4.2 D4.2']), 'D 保持，C 与 E、G 与 A 的音级相互映射。'),
  exchanged: demo(phrase(['D4.2 G4.2 | E4.2 D4.2', 'D4.4 C4.4 A3.4 G3.4 | A3.4 C4.4 E4.4 D4.4']), '原来在上方的倒影旋律下降八度，声部在不同位置重新结合。')
};

const twoThemeRoles = {
  first: inventionExchange.first,
  swapped: inventionExchange.exchanged,
  episode: demo(phrase(['E5.8 G5.8 E5.8 D5.8 F5.8 A5.8 F5.8 E5.8 | G5.8 B5.8 G5.8 F5.8 A5.8 C6.8 A5.8 G5.8', 'r.2 E4.8 G4.8 E4.8 D4.8 | F4.8 A4.8 F4.8 E4.8 G4.8 B4.8 G4.8 F4.8']), '插段只取 T₁ 的首部作卡农模进，完整主题组合可以随后返回。')
};

const answerSubject = 'C5.4 { txt "T" } G5.4 A5.4 G5.4 | E5.2 D5.4 C5.4';
const answerContinuation = 'E5.2 D5.2 | C5.2 B4.4 G4.4';
function answerPart(notes) {
  return phrase([`${answerSubject} | ${answerContinuation}`, `r.1 | r.1 | ${notes}`]);
}

const fugueAnswerTypes = {
  real: demo(answerPart('G3.4 { txt "AT" } D4.4 E4.4 D4.4 | B3.2 A3.4 G3.4'), 'C–G 的纯五度移为 G–D 的纯五度，后续各音程也保持。'),
  tonal: demo(answerPart('G3.4 { txt "AT" } C4.4 E4.4 D4.4 | B3.2 A3.4 G3.4'), 'G–C 回应 C–G，答题首段的五度改为四度。')
};

const fugueAnswerKeyPath = {
  subject: demo(phrase([
    'C5.4 E5.4 G5.2 | F#5.4 A5.4 G5.2',
    '(C3 E3 G3).1 { txt "C 大调" } | (D3 F#3 A3 C4).2 (G2 B2 D3).2 { txt "G 大调" }'
  ]), '句末的 D 属七和弦落到 G 主和弦。F♯ 和 D→G 的低音一起明确了新中心。'),
  tonal: demo(phrase([
    'G4.4 B4.4 D5.2 | B4.4 D5.4 C5.2',
    '(G2 B2 D3).1 { txt "G 大调" } | (G2 B2 D3 F3).2 (C3 E3 G3).2 { txt "C 大调" }'
  ]), '前半从 G 出发，后半以 C 大调的 B 为导音。G 属七和弦落到 C 主和弦，完成回归。')
};

const handoffSubject = 'C4.8 D4.8 E4.4 G4.2 { txt "主题末音" }';
const fugueHandoff = {
  joined: demo(twoTreble([
    'r.1 | G5.8 { txt "答题" } A5.8 B5.4 C6.2',
    `${handoffSubject} | E4.4 D4.4 E4.2`
  ]), '下方 G 响满第 3、4 拍，上方从下一小节第 1 拍起奏。两个入口的交界在小节线上。'),
  overlap: demo(twoTreble([
    'r.2 r.4 G5.8 { txt "答题" } A5.8 | B5.4 C6.2 r.4',
    `${handoffSubject} | G4.4 E4.2 E4.4`
  ]), '答题从第 4 拍开始，与下方末音重叠一拍。前半拍两部同为 G，后半拍上方走到 A，下方的 G 仍在响。'),
  bridge: demo(twoTreble([
    'r.1 | r.4 G5.8 { txt "答题" } A5.8 B5.4 C6.4 | C6{t}.4 r.2 { d }',
    `${handoffSubject} | E4.8 { txt "小结尾" } F4.8 G4.4 E4.2 | C4.1`
  ]), '第二小节第 1 拍是主题和答题之间的一拍空当，由下方 E、F 填出短句。答题从第 2 拍开始。')
};
const entryRoles = {
  subject: { label: 'T', name: '主题', beats: 'C.8 D.8 E.4 D.4 C.4' },
  answer: { label: 'AT', name: '答题', beats: 'G.8 A.8 B.4 A.4 G.4' },
  counterAnswer: { label: 'CT₁', name: '第一对题', beats: 'B.2 C.4 B.4' },
  firstCounter: { label: 'CT₁', name: '第一对题', beats: 'E.2 F.4 E.4' },
  secondCounter: { label: 'CT₂', name: '第二对题', beats: 'G.4 C.4 A.4 G.8 E.8' },
  bridge: { label: '连句', name: '连接句', beats: 'D.8 E.8 F.4 B.4 G.4' }
};
const entryVoiceNames = ['高声部', '中声部', '低声部'];

function entryScore([first, second, third]) {
  const rows = [[], [], []];
  rows[first][0] = 'subject';
  rows[first][1] = 'counterAnswer';
  rows[second][1] = 'answer';
  rows[0][2] = 'bridge';
  rows[first][3] = 'secondCounter';
  rows[second][3] = 'firstCounter';
  rows[third][3] = 'subject';

  const lanes = rows.map((row, voice) => ({
    label: entryVoiceNames[voice],
    events: row.flatMap((role, index) => {
      const { label, name } = entryRoles[role];
      return [{
        id: role === 'subject' && index === 3 ? 'returningSubject' : role,
        label, start: index + 1, length: 1,
        detail: `第 ${index + 1} 小节，${entryVoiceNames[voice]}奏${name}${role === 'subject' && index === 3 ? '，同时与另外两条对题叠置' : ''}`
      }];
    })
  }));
  const links = [
    { from: 'subject', to: 'answer', label: '第二个入口在第 2 小节唱答题 AT' },
    { from: 'answer', to: 'returningSubject', label: '第 4 小节由第三个声部重现主题 T' },
    { from: 'subject', to: 'counterAnswer', label: '答题出现时，先入声部从 T 转入 CT₁' },
    { from: 'answer', to: 'firstCounter', label: '答题声部下次改唱 CT₁' },
    { from: 'counterAnswer', to: 'secondCounter', label: '先入声部在第三次入口处从 CT₁ 转入 CT₂' }
  ];
  const voices = rows.map((row, voice) => Array.from({ length: 4 }, (_, index) => {
    const role = entryRoles[row[index]];
    if (!role) return 'r.1';
    return role.beats.replace(/([A-G])(?=\.)/g, (_, pitch) => pitch + (5 - voice))
      .replace(/^\S+/, '$& { txt "' + role.label + '" }');
  }).join(' | '));
  return {
    ...demo(phrase(voices), `第 4 小节，${entryVoiceNames[third]}奏 T，${entryVoiceNames[second]}奏 CT₁，${entryVoiceNames[first]}奏 CT₂，三条线同时进行。`),
    relations: { unitCount: 4, unitName: '小节', lanes, links }
  };
}

const fugueEntry = {
  descending: entryScore([0, 1, 2]),
  ascending: entryScore([2, 1, 0]),
  inner: entryScore([1, 0, 2]),
  innerDown: entryScore([1, 2, 0])
};

const fugueEpisode = {
  source: demo(phrase(['C5.8 D5.8 E5.4 G5.2 { txt "主题首部" } | E5.4 D5.4 C5.2', 'C4.2 C4.2 | G3.2 C4.2']), '由短音型及长时值组成的主题可分出模进单位。'),
  sequence: demo(phrase(['C5.8 D5.8 E5.4 D5.8 E5.8 F5.4 | E5.8 F5.8 G5.4 A5.4 G5.4', 'C4.2 D4.2 | E4.2 F4.4 G4.4']), '间插段截取主题首部，每两拍移高一级，由低声部支持走向。'),
  canon: demo(phrase(['C5.8 D5.8 E5.4 D5.8 E5.8 F5.4 | E5.8 F5.8 G5.4 A5.4 G5.4', 'r.2 C4.8 D4.8 E4.4 | D4.8 E4.8 F4.4 E4.8 F4.8 G4.4']), '下方迟两拍相继使用三个模进单位，构成卡农模进。')
};

const developmentPitches = ['C5', 'E5', 'G5', 'F5', 'D5', 'C5'];
const invertedPitches = ['C5', 'Ab4', 'F4', 'G4', 'Bb4', 'C5'];
const developmentLengths = [2, 1, 1, 4, 2, 6];
const reverse = items => [...items].reverse();
function subjectForm(pitches, lengths, key = 'C') {
  return phrase([line(pitches, lengths, Math.ceil(lengths.reduce((sum, length) => sum + length, 0) / bar))], key);
}

const fugueDevelopmentForms = {
  original: demo(subjectForm(developmentPitches, developmentLengths), '以 C 为首尾支点。'),
  mode: demo(subjectForm(['C5', 'Eb5', 'G5', 'F5', 'D5', 'C5'], developmentLengths, 'Cminor'), '将调式的第Ⅲ级 E 降为 E♭，主题转到同主音小调。'),
  inverted: demo(subjectForm(invertedPitches, developmentLengths), '每个音在 C 轴上翻向，时间次序保持。'),
  backwards: demo(subjectForm(reverse(developmentPitches), reverse(developmentLengths)), '音高事件及其各自时值按相反次序出现。'),
  both: demo(subjectForm(reverse(invertedPitches), reverse(developmentLengths)), '先反转音程方向，再反转时间次序。'),
  enlarged: demo(subjectForm(developmentPitches, developmentLengths.map(length => length * 2)), '所有音的时值扩大两倍。')
};

const strettoPitches = ['C5', 'E5', 'G5', 'E5', 'C5', 'D5'];
const strettoLengths = [2, 1, 1, 2, 1, 1];

function stretto(delay) {
  const bars = Math.ceil((bar + delay) / bar);
  return phrase([
    line(strettoPitches, strettoLengths, bars, { label: '第一入口' }),
    line(downOctave(strettoPitches), strettoLengths, bars, { delay, label: '第二入口' })
  ]);
}

const fugueStretto = {
  sequential: demo(stretto(8), '第二入口在第一入口完整结束后出现。'),
  overlapping: demo(stretto(4), '第二入口晚两拍，主题后半与下一次主题首部重叠。'),
  compact: demo(stretto(2), '第二入口晚一拍，两个主题重叠的范围扩大。')
};

const pedalTop = 'E5.4 G5.4 F5.4 E5.4 | D5.4 F5.4 D5.4 C5.4 | E5.4 D5.4 C5.2';
const fuguePedal = {
  dominant: demo(phrase([pedalTop, 'G3.1 | G3{t}.1 | C4.1']), '低声的 G 跨小节持续两整小节，第三小节才换到主音 C。'),
  tonic: demo(phrase([pedalTop, 'C4.1 | C4{t}.1 | C4{t}.1']), '从开始到结束都保留 C，旋律变化发生在主持续音上。')
};

const modalNotes = ['A4', 'C5', 'D5', 'E5', 'D5', 'A4'];
const modalTimes = [2, 1, 1, 2, 1, 1];
const modalStretto = {
  octave: demo(phrase([line(modalNotes, modalTimes, 2), line(downOctave(modalNotes), modalTimes, 2, { delay: 4 })]), '同一 a 羽主题相差半小节，两个声部构成八度密接。'),
  modal: demo(phrase([line(modalNotes, modalTimes, 2), line(['E4', 'G4', 'A4', 'C5', 'A4', 'E4'], modalTimes, 2, { delay: 4 })]), '应句改从 E 出发，在同一五声音列中重组主题。'),
  three: demo(phrase([line(modalNotes, modalTimes, 2), line(['E4', 'G4', 'A4', 'C5', 'A4', 'E4'], modalTimes, 2, { delay: 2 }), line(downOctave(modalNotes), modalTimes, 2, { delay: 4 })]), '三次入口各相差一拍，保持主题节奏并增加重叠。')
};

const mirrorParts = [
  { pitches: ['C5', 'D5', 'E5', 'G5', 'A5', 'G5', 'E5', 'C5'], lengths: [1, 1, 2, 4, 2, 2, 2, 2] },
  { pitches: ['C4', 'E4', 'C4', 'G3', 'B3', 'C4'], lengths: [4, 2, 2, 4, 2, 2] }
];

const mirrorFugue = {
  forward: demo(phrase(mirrorParts.map(({ pitches, lengths }) => line(pitches, lengths, 2, { pitchLabels: true }))),
    '第一小节交代短主题，第二小节接出后续音型。'),
  mirror: demo(phrase(mirrorParts.map(({ pitches, lengths }) =>
    line([...pitches, ...reverse(pitches)], [...lengths, ...reverse(lengths)], 4, { pitchLabels: true }))),
    '镜相点在第 2、3 小节之间。第 3 小节倒回第 2 小节，第 4 小节倒回第 1 小节。'),
  middle: demo(phrase(mirrorParts.map(({ pitches, lengths }, index) => [
    line(pitches, lengths, 2, { pitchLabels: true }),
    index === 0 ? 'D5.4 { txt "D" } E5.4 { txt "E" } E5.4 { txt "折返" } D5.4 { txt "D" }' : 'G3.2 G3.2',
    line(reverse(pitches), reverse(lengths), 2, { pitchLabels: true })
  ].join(' | '))), '第 3 小节前两拍先响 D、E，标记处进入第 3 拍，马上回走 E、D。接下来才逆行前面两个小节。')
};

const compoundMode = {
  major: demo(phrase(['C4.4 D4.4 E4.4 F4.4 | G4.4 A4.4 B4.4 C5.4'], 'C'),
    '自然大调的七个音是基础。末尾的 C 是高一个八度的主音。', 84),
  mixture: demo(phrase(['C4.4 Db4.4 D4.4 Eb4.4 | E4.4 F4.4 G4.4 Ab4.4 | A4.4 Bb4.4 B4.4 C5.4']),
    'Ⅱ、Ⅲ、Ⅵ、Ⅶ级各有两种高度。F 到 G 保留全音，音列共十一种音高。', 84),
  theme: demo(phrase([
    'r.8 B4.16 { gr beforebeat } C5.8 { txt "主音" } Bb4.8 { txt "B♭" } C5.8 F5.8 C5.8 r.8 G4.16 B4.16 { txt "B" } | ' +
    'C5.8 F4.8 F4{t}.16 Db4.16 { txt "D♭" } Eb4.16 F4.16 Ab4.8 F4.8 G4.8 E4.16 D4.16 | C4.8 { d } r.16 r.2 r.4'
  ]), '陈铭志《赋格》主题开头先在 C 周围使用 B♭、B，第二小节同用 D♭ 与 D，到第 3 小节开头回到 C。', 84)
};

const chainRhythms = [[1, 1, 2, 4], [2, 2, 2, 2], [4, 2, 2]];
function canonChain(fragments, labels) {
  return twoTreble([
    fragments.map((pitches, index) => line(pitches, chainRhythms[index], 1, { label: labels[index] })).join(' | '),
    ['r.1', ...fragments.slice(0, -1).map((pitches, index) =>
      line(downOctave(pitches), chainRhythms[index], 1, { label: labels[index] + '′' }))].join(' | ')
  ]);
}

const fugueCanonChain = {
  original: demo(canonChain([
    ['C5', 'D5', 'E5', 'G5'], ['E5', 'G5', 'F5', 'E5'], ['C5', 'A4', 'G4']
  ], ['A', 'B', 'C']), '第二小节上方唱 B、下方唱 A′。第三小节上方唱 C、下方唱 B′。撇号表示晚一小节的低八度副本。'),
  reflected: demo(canonChain([
    ['E5', 'D5', 'C5', 'A4'], ['C5', 'A4', 'B4', 'C5'], ['E5', 'G5', 'A5']
  ], ['A 倒影', 'B 倒影', 'C 倒影']), '以 D 为轴后，A 开头的 C–D–E 改走 E–D–C。第二小节下方同样要接它的倒影，仍晚一小节。')
};

const rhythmSubject = ['G5', 'r', 'G5', 'G5', 'G5'];
const rhythmTimes = [2, 1, 1, 2, 2];
const rhythmTheme = line(rhythmSubject, rhythmTimes, 1, { label: 'T' });
const rhythmFugue = {
  rhythm: demo(phrase([rhythmTheme]), '主题的音高反复在 G，同一节奏形状定义主题。'),
  combined: demo(twoTreble([rhythmTheme, 'A4.8 { txt "CT" } B4.8 D5.4 E5.4 D5.4']),
    'G 是单音高主题。对题补进 A、B、D、E，两部合起来是 G 宫五声音列。'),
  answer: demo(phrase([
    `${rhythmTheme} | E5.8 { txt "CT" } F#5.8 A5.4 B5.4 A5.4`,
    line(['D4', 'r', 'D4', 'D4', 'D4'], rhythmTimes, 2, { delay: 8, label: 'AT' })
  ]), '答题在 D 保留主题的长短和休止。上方换到 E、F♯、A、B，两部这时合成 D 宫五声音列。')
};

const heterophonyPlain = 'G4.4 A4.4 G4.4 E4.4 | D4.4 E4.4 D4.4 C4.4';
const heterophonyHarmonic = {
  branch: demo(twoTreble([heterophonyPlain, 'G4.4 G4.4 G4.4 E4.4 | D4.4 C4.4 D4.4 C4.4']), '同度处是支点，短促的斜向分开在同一句内汇合。'),
  layers: demo(twoTreble([heterophonyPlain, 'G4.4 E4.4 D4.4 C4.4 | G3.4 C4.4 B3.4 C4.4']), '声部从共同的 G 分开，维持上下线条，到 C 才汇合。'),
  held: demo(twoTreble([heterophonyPlain, 'G4.1 | D4.2 C4.2']), '下方保持较长的支点，上方继续移动。')
};

const decorated = 'G4.8 E4.8 A4.8 C5.8 G4.8 A4.8 E4.8 G4.8 | D4.8 G4.8 E4.8 G4.8 D4.8 E4.8 C4.4';
const heterophonyDensity = {
  plain: demo(phrase([heterophonyPlain]), '每拍的骨干音构成两个乐句的共同旋律。'),
  ornamented: demo(twoTreble([decorated, heterophonyPlain]), '下方保留原来节拍上的骨干，上方以八分音符加花。'),
  mixed: demo(phrase([decorated, heterophonyPlain, 'G3.1 | D3.2 C3.2']), '流动加花与下方长音衬托同时使用。')
};

const densitySkeleton = 'C4.4 D4.4 E4.4 G4.4 | C4.1';
function densityVariant(groups, duration, triplet = false) {
  const notes = groups.flatMap(group => group.map((pitch, index) => {
    const label = index === 0 ? `txt "${pitch[0]}"` : '';
    const effects = [triplet ? 'tu 3' : '', label].filter(Boolean).join(' ');
    return `${pitch}.${duration}${effects ? ` { ${effects} }` : ''}`;
  })).join(' ');
  return twoTreble([`${notes} | C5.1 { txt "C" }`, densitySkeleton]);
}

const heterophonyVariations = {
  quarter: demo(densityVariant([['C5'], ['D5'], ['E5'], ['G5']], 4), '两声部每拍各起音一次，骨干以八度相合。'),
  eighth: demo(densityVariant([['C5', 'E5'], ['D5', 'G5'], ['E5', 'D5'], ['G5', 'A5']], 8),
    '上方每拍多一个八分音符，谱上标出的 C、D、E、G 仍和下方在同一时刻响。'),
  triplet: demo(densityVariant([['C5', 'D5', 'E5'], ['D5', 'E5', 'D5'], ['E5', 'G5', 'A5'], ['G5', 'A5', 'G5']], 8, true),
    '上方把一拍平分为三个八分三连音。每一组的第一个音始终和下方的骨干音同时起奏。'),
  sixteenth: demo(densityVariant([
    ['C5', 'D5', 'E5', 'D5'], ['D5', 'E5', 'G5', 'E5'], ['E5', 'G5', 'A5', 'G5'], ['G5', 'A5', 'G5', 'E5']
  ], 16), '上方每拍四次起音，下方每拍一次。两条线的第 2 小节一样长，都用全音符 C 收住。')
};

const heterophonyIntervals = {
  thirds: demo(twoTreble(['G4.4 A4.4 G4.4 E4.4 | C4.1', 'G4.4 F4.4 E4.4 C4.4 | C4.1']), 'F–A、E–G、C–E 是分开的三度，最后回到同度。'),
  seconds: demo(twoTreble(['G4.4 A4.4 G4.4 E4.4 | C4.1', 'G4.4 G4.4 F4.4 D4.4 | C4.1']), 'A–G、G–F、E–D 在分开的阶段保持大二度色彩。'),
  fourths: demo(twoTreble(['G4.4 A4.4 G4.4 E4.4 | C4.1', 'G4.4 E4.4 D4.4 B3.4 | C4.1']), '相同骨干之间的分层换成纯四度。')
};

const melody = 'E5.4 G5.4 C6.2 | B5.4 A5.4 G5.2';
const baseBass = 'C3.1 | G3.1';
const secondaryMelody = {
  response: demo(phrase([melody, 'r.2 A4.8 G4.8 E4.4 | r.2 E4.8 D4.8 G4.4', baseBass]), '副旋律在主旋律的长音处进入，形成交替的活跃时段。'),
  background: demo(phrase([melody, 'C4.8 E4.8 G4.8 E4.8 A4.8 G4.8 E4.8 G4.8 | D4.8 G4.8 B4.8 G4.8 F4.8 G4.8 D4.8 G4.8', baseBass]), '持续的八分音符给主旋律提供流动背景。'),
  contrasting: demo(phrase([melody, 'A4.2 E4.2 | F4.4 G4.4 D4.2', baseBass]), '副旋律用更长的支撑点和独立的走向与上方构成对比。')
};

const contrapuntalBass = {
  harmonic: demo(phrase([melody, 'E4.2 G4.2 | D4.2 B3.2', baseBass]), '低声部的长音确立 C 和 G 两个功能支点。'),
  walking: demo(phrase([melody, 'E4.2 G4.2 | D4.2 B3.2', 'C3.4 E3.8 F3.8 G3.4 E3.8 F3.8 | G3.4 F3.8 E3.8 D3.4 G3.4']), '低声部在主要拍位保留功能音，弱位用短音连接。')
};

const contrapuntalMiddle = {
  chordTones: demo(phrase([melody, 'E4.2 { txt "E" } G4.2 | D4.2 { txt "D" } B3.2', baseBass]),
    '中声部以长 E、G 交代 C 和弦，以 D、B 交代 G 和弦。上方长音下保持稳定。'),
  response: demo(phrase([melody, 'E4.2 G4.8 { txt "G" } A4.8 { txt "A" } G4.4 | D4.2 D4.8 { txt "D" } E4.8 { txt "E" } D4.4', baseBass]),
    '主旋律和低音照旧。第一小节的中声部在上方长 C 期间唱 G–A–G，第二小节在长 G 期间用 D–E–D 呼应。')
};

const speciesBass = 'C4.1 { txt "C" } | E4.1 { txt "E" } | C4.1 { txt "C" }';
const species = upper => twoTreble([upper, speciesBass]);
const speciesCounterpoint = {
  first: demo(species('E5.1 | G5.1 | E5.1'), '上下都按小节换音，三个纵向音程都是三度类音程。'),
  second: demo(species('E5.2 F5.2 { txt "F" } | G5.2 F5.2 { txt "F" } | E5.1'),
    '每小节的第一个音和低音协和。两处 F 都落在后半小节，以级进连到下一小节。'),
  third: demo(species('E5.4 F5.4 G5.4 F5.4 | G5.4 A5.4 { txt "A" } G5.4 F5.4 | E5.1'),
    '第一小节的 F 可以连接 E 和 G。第二小节的 A 从 G 向上一步，又折回 G，是辅助音。'),
  fourth: demo(species('E5.2 A4.2 { txt "预备" } | A4{t}.2 { txt "延留" } G4.2 { txt "解决" } | G4{t}.2 E4.2'),
    '新小节的低音换成 E，上方 A 仍延续，六度变成四度。A 到 G 后解决到三度。'),
  fifth: demo(species('E5.4 C5.4 A4.2 | A4{t}.2 { txt "延留" } B4.8 A4.8 G4.4 { txt "解决" } | E4.1'),
    'B 与再次出现的短 A 装饰四度延留。真正的解决仍是 A 下行到 G，与 E 形成三度。')
};

const imitationInHomophony = {
  local: demo(phrase([melody, 'r.2 E4.4 G4.4 | D4.2 B3.2', baseBass]), '只在主旋律延长时模仿它的首部。'),
  canon: demo(phrase([melody, 'r.2 E4.4 G4.4 | C5.2 B4.4 A4.4', baseBass]), '内声继续跟进主旋律的后续音符，形成局部卡农。'),
  dialogue: demo(phrase(['E5.4 G5.4 D5.2 | r.1', 'E4.2 D4.2 | G4.2 E4.2', 'r.2 G3.2 | E3.4 G3.4 C4.2']), '上方问句停在属和声，下方以相似动机构成回主的答句。')
};

const textureMelody = 'E5.8 G5.8 E5.4 C5.8 D5.8 E5.4';
const chordal = [textureMelody, '(C3 E3 G3).1'];
const polyphonic = [textureMelody, 'C4.4 G3.8 A3.8 B3.4 C4.4'];
const orderedPair = (first, second) => phrase(first.map((voice, index) => `${voice} | ${second[index]}`));
const textureExchange = {
  polyphonyFirst: demo(orderedPair(polyphonic, chordal), '上方两小节相同。先由下方的低音线依次换音，第二次改用整小节保持的和弦。'),
  homophonyFirst: demo(orderedPair(chordal, polyphonic), '上方仍重复同一句。低部第一小节保持和弦，第二小节另外唱出一条线。')
};

const fugatoLayout = {
  opening: demo(phrase(['C5.4 { txt "T" } E5.4 G5.2 | E5.4 F5.4 G5.2 | C6.2 { txt "主调织体" } E5.2', 'r.1 | G3.4 { txt "AT" } B3.4 D4.2 | (C3 E3 G3).1']), '主题与答题先后进入，第三小节转为主旋律加和弦。'),
  middle: demo(phrase(['C6.2 { txt "主调织体" } E5.2 | C5.4 { txt "T" } E5.4 G5.2 | E5.4 F5.4 G5.2 | C6.1', '(C3 E3 G3).1 | r.1 | G3.4 { txt "AT" } B3.4 D4.2 | (C3 E3 G3).1']), '主调段先出现，赋格段居中，再回到和弦支撑的终止。')
};

const groups = {
  ...learningScores({ line, phrase, demo }),
  'miniature-texture': miniatureTexture, 'miniature-echo': miniatureEcho,
  'miniature-forms': miniatureForms,
  'canon-delay': canonDelay, 'canon-transform': canonTransform,
  'invention-motive': inventionMotive, 'invention-exchange': inventionExchange,
  'invention-three-parts': inventionThreeParts,
  'pentatonic-inversion': pentatonicInversion, 'two-theme-roles': twoThemeRoles,
  'fugue-answer-types': fugueAnswerTypes, 'fugue-answer-key-path': fugueAnswerKeyPath,
  'fugue-entry': fugueEntry, 'fugue-episode': fugueEpisode,
  'fugue-handoff': fugueHandoff,
  'fugue-development-forms': fugueDevelopmentForms, 'fugue-stretto': fugueStretto, 'fugue-pedal': fuguePedal,
  'modal-stretto': modalStretto, 'mirror-fugue': mirrorFugue, 'compound-mode': compoundMode,
  'fugue-canon-chain': fugueCanonChain, 'rhythm-fugue': rhythmFugue,
  'heterophony-harmonic': heterophonyHarmonic, 'heterophony-density': heterophonyDensity,
  'heterophony-intervals': heterophonyIntervals, 'secondary-melody': secondaryMelody,
  'heterophony-variations': heterophonyVariations,
  'contrapuntal-bass': contrapuntalBass, 'imitation-in-homophony': imitationInHomophony,
  'contrapuntal-middle': contrapuntalMiddle, 'species-counterpoint': speciesCounterpoint,
  'texture-exchange': textureExchange, 'fugato-layout': fugatoLayout
};

function mountExample(element) {
  const variants = groups[element.dataset.counterpoint];
  const controls = element.querySelector('.music-demo-toolbar');
  const select = controls.querySelector('select');
  const initial = select ?? controls.querySelector('input:checked');
  const showDefinition = mountScoreDefinition(controls, element.dataset.counterpoint);
  const cue = element.querySelector('.music-demo-cue');
  const figure = element.querySelector('figure');
  const example = variants[initial.value];
  const showRelations = mountScoreRelations(element, variants);
  const score = mountScore(figure, { notation: 'staff', tempo: example.tempo, notes: example.notes });
  showDefinition(initial.value);
  cue.textContent = example.description;
  showRelations(initial.value);
  controls.addEventListener('change', event => {
    const variant = variants[event.target.value];
    showDefinition(event.target.value);
    score.setNotes(variant.notes);
    cue.textContent = variant.description;
    showRelations(event.target.value);
  });
}

function revealLinkedExample() {
  const target = document.getElementById(location.hash.slice(1));
  const detail = target?.closest('details.lesson-aside');
  if (detail) detail.open = true;
}

revealLinkedExample();
window.addEventListener('hashchange', revealLinkedExample);

for (const element of document.querySelectorAll('[data-counterpoint]')) {
  const detail = element.closest('details.lesson-aside');
  if (!detail || detail.open) {
    mountExample(element);
    continue;
  }
  detail.addEventListener('toggle', function onToggle() {
    if (!detail.open) return;
    detail.removeEventListener('toggle', onToggle);
    mountExample(element);
  });
}
