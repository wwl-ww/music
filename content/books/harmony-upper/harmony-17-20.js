import { labelledChordScore, mountHarmonyOptions, scoreWithAccompaniment } from '../../shared/formats/harmony-score.js';
import { mountScore } from '../../shared/formats/score.js';
import { displayPitch, getTonic, spellNote } from '../../shared/formats/pitch.js';

function passage(rows, description) {
  return { notes: labelledChordScore(rows.map(row => [row]), 'C'), description };
}

const gongTonic = ['C3 G3 E4 C5', 'I'];
const gongDominant = ['G2 G3 D4 B4', 'V'];
const shangChord = ['D3 F3 F4 A4', 'ii'];
const jueChord = ['E3 G3 E4 B4', 'iii'];
const yuOnGong = ['A2 E3 C4 C5', 'vi'];

const gongCenters = {
  gong: passage([['C3 C4 G4 E5', 'I'], ['G2 D4 G4 B4', 'V'], ['C3 E4 G4 C5', 'I']],
    '徵和弦 V 在结尾承担属功能，归向 C 宫。'),
  shang: passage([['C4 C4 G4 E5', 'I'], ['G3 D4 G4 B4', 'V'], ['D3 F4 A4 D5', 'ii']],
    'C 宫 · d 商。I 交代宫音系统，末尾的 ii 成为当地的主和弦。'),
  yu: passage([gongTonic, jueChord, ['A2 A3 E4 C5', 'vi'], ['G2 D4 G4 B4', 'V'], ['C3 E4 G4 C5', 'I']],
    'iii–vi 暂时突出羽和弦；最后由 V–I 确立宫音中心。')
};

const gongRootMoves = {
  fourth: passage([gongDominant, gongTonic], '根音 G–C，原位低音上四度，G 保留为后和弦的五音。'),
  inverted: passage([['D3 G3 D4 B4', 'V6/4'], gongTonic], '根音仍是 G–C，低音改成 D–C，原位上四度的力度减弱。'),
  second: passage([shangChord, gongTonic], '根音 D–C 下行二度，两个和弦没有共同音。'),
  fifth: passage([['C3 G3 E4 E4', 'I'], ['G3 G3 D4 B4', 'V']], '根音 C–G 上行五度，前和弦的五音 G 成为后和弦的根音。'),
  thirdUp: passage([['C3 C4 G4 E5', 'I'], jueChord], '根音 C–E 上行三度。后和弦的根音 E 已在前和弦出现。'),
  thirdDown: passage([jueChord, gongTonic], '根音 E–C 下行三度。和弦仍有两个共同音，C 在后一和弦才出现。')
};

const gongCadences = {
  dominant: passage([['G2 F3 D4 B4', 'V7'], ['C3 E3 C4 C5', 'I']], '变宫上行到宫，清角下行到角。'),
  compound: passage([
    ['C3 E4 G4 C5', 'I'], ['D3 F4 F4 A4', 'ii'], ['G3 E4 G4 C5', 'K6/4'],
    ['G3 D4 G4 B4', 'V'], ['C4 E4 G4 C5', 'I']
  ], 'ii 承担下属作用，接在属低音上的终止四六之前。'),
  supertonic: passage([shangChord, gongTonic], '低音商下行到宫，旋律由羽上行到宫。'),
  mediant: passage([jueChord, gongTonic], '低音角下行到宫，上方保留 G、E，变宫上行到宫。'),
  mediantSixth: passage([['G2 G3 E4 B4', 'iii6'], gongTonic], '改用 iii₆ 后，根音仍是角，低音改由徵到宫。'),
  subdominant: passage([['F3 F3 C4 A4', 'IV'], gongTonic], '旋律仍由羽到宫，低音改由清角跳到宫。'),
  ninthUp: passage([['G3 D4 F4 A4', 'V9'], ['C4 E4 G4 C5', 'I']],
    'V₉ 省三音 B，羽音 A 上行小三度归宫，外声部由九度归八度；清角 F 也上行到 G。'),
  ninthWithoutSeventh: passage([['G2 B3 D4 A4', 'V9'], ['C3 C4 E4 C5', 'I']],
    '保留五音 D、省去七音 F。上方的羽音 A 与变宫 B 都归向宫音。'),
  ninthDown: passage([['G2 F3 B3 A4', 'V9'], ['C3 E3 C4 G4', 'I']],
    '大调写法对照。省五音 D，九音 A 下行到 G，七音 F 下行到 E。'),
  submediant: passage([['A2 C4 E4 C5', 'vi'], gongTonic], '低音羽上行三度到宫，高音 C 和中音 E 保持。'),
  inserted: {
    notes: labelledChordScore([
      [['G2 D4 F4 B4', 'V7', '4'], ['A2 C4 E4 C5', 'vi', '4']],
      [gongTonic]
    ], 'C'),
    description: 'vi 在弱拍引入主和弦的 C、E，低音走成徵–羽–宫。'
  }
};

const gongPhrases = {
  qingjiao: passage([['C3 C4 G4 E5', 'I'], ['D3 A3 F4 F5', 'ii'], ['C3 C4 G4 E5', 'I']],
    '旋律 E–F–E 完全相同。这里的清角是 ii 的三音，低音不经过清角。'),
  sameMelody: passage([['C3 C4 G4 E5', 'I'], ['F3 C4 A4 F5', 'IV'], ['C3 C4 G4 E5', 'I']],
    '清角同时出现在旋律与低音，清角和弦的变格色彩更明晰。'),
  yuFocus: passage([gongTonic, jueChord, yuOnGong, shangChord, ['A2 G3 E4 C5', 'vi7'], gongTonic],
    '先用 iii–vi 局部收束在羽，再用 ii–vi₇–I 归宫。')
};

const yuTonic = ['A3 C4 E4 A4', 'vi'];
const yuDominant = ['E3 B3 E4 G4', 'iii'];
const yuMajorDominant = ['E3 B3 E4 G#4', 'III'];
const yuMajorTonic = ['A3 C#4 E4 A4', 'VI'];

const yuCadences = {
  dominant: passage([yuDominant, yuTonic], '小属三音 G 到 A 相隔大二度。'),
  compound: passage([
    ['D3 F4 A4 F5', 'ii'], ['E3 E4 G4 B4', 'iii'], ['A3 C4 E4 C5', 'vi']
  ], 'D–E–A 构成下属—小属—主的低音骨架。'),
  plagal: passage([['D3 A3 F4 F5', 'ii'], ['A2 C4 A4 E5', 'vi']], '旋律中的清角 F 下行半音到角 E。'),
  turnaround: passage([
    ['A3 C4 E4 C5', 'vi'], ['E3 E4 G4 B4', 'iii'], ['D3 F4 A4 F5', 'ii'], ['A2 E4 C5 C5', 'vi']
  ], '属和弦先接下属和弦，再由下属回主。'),
  zhi: passage([gongDominant, yuOnGong], '徵和弦的根音 G 上行到 A，变宫 B 同时上行到 C。'),
  zhiSeventh: passage([
    ['E3 E4 G4 B4', 'iii'], ['G3 D4 F4 B4', 'V7'], ['A3 C4 E4 C5', 'vi']
  ], '先用小属，再由徵七解决到羽。七音 F 下行到 E。'),
  gong: passage([['C3 E3 C4 G4', 'I'], ['A2 E3 C4 A4', 'vi']], '宫和弦两个上方音保持，低音 C–A 下行三度。'),
  gongSixth: passage([['E3 C4 E4 G4', 'I6'], yuTonic], '宫和弦重复转位低音 E，低音 E–A 的上四度加强属向作用。')
};

const yuAlterations = {
  natural: passage([yuDominant, yuTonic], 'G–A 之间为全音，终点保留小主和弦。'),
  majorDominant: passage([yuMajorDominant, yuTonic], 'G♯ 成为导音，半音上行到 A。'),
  majorTonic: passage([yuDominant, yuMajorTonic], '保持小属和弦，终点小三度 A–C 改为大三度 A–C♯。'),
  majorSeventh: passage([['E3 D4 E4 G#4', 'III7'], yuTonic], '大属七省五音 B；G♯ 上行到 A，七音 D 下行到 C。'),
  both: passage([yuMajorDominant, yuMajorTonic], '半音导音与大主和弦相继出现，接近 A 大调的正格终止。'),
  half: passage([['A3 C4 E4 C5', 'vi'], ['E3 E4 G4 B4', 'iii'], ['E3 E4 G#4 B4', 'III']],
    '属和弦的三音在句中升高，保持在属功能上停顿。')
};

const exchangeStart = [['A3 A3 E4 C5', 'vi'], yuDominant];
const exchangeEnd = ['A2 E3 C4 A4', 'vi'];
const gongYuExchange = {
  local: passage([
    ...exchangeStart, ['G2 E3 C4 G4', 'I6/4'], ['C3 A3 C4 E4', 'vi6'],
    ['E3 G3 B3 G4', 'iii'], exchangeEnd
  ], '中段 I 用四六位置，E 随即成为 vi₆ 的五音，羽中心保持连贯。'),
  phrase: passage([
    ...exchangeStart, ['G3 B3 D4 G4', 'V'], ['C3 G3 C4 E4', 'I'],
    ['E3 E3 B3 G4', 'iii'], exchangeEnd
  ], '旋律相同。中间以原位 V–I 短暂确立宫，再由 iii–vi 回到羽。')
};

const textureMelody = ['E5', 'B4', 'A4'];

function chordTexture(voices, labels, description) {
  const melody = textureMelody.map((pitch, index) => `${pitch}.2 { txt "${labels[index]}" }`).join(' | ');
  return { notes: scoreWithAccompaniment(melody, voices), description };
}

const pentatonicChordTexture = {
  full: chordTexture(['A2 C4 E4', 'E3 G3 E4', 'A2 E3 C4'], ['vi', 'iii', 'vi'],
    '三音 C、G 保留，羽和弦与角和弦的小三和弦性质明确。'),
  added: chordTexture(['A2 D3 C4 E4', 'E3 G3 A3 E4', 'A2 D3 E3 C4'], ['vi⁴', 'iii⁴', 'vi⁴'],
    '三音保留，在 A、E 上分别加入纯四度 D、A。'),
  replaced: chordTexture(['A2 D3 E4', 'E3 A3 E4', 'A2 D3 E3'], ['◦vi⁴', '◦iii⁴', '◦vi⁴'],
    'D、A 取代原来的三音，终止仍由角和弦到羽和弦。'),
  open: chordTexture(['A2 E3 E4', 'E3 B3 E4', 'A2 E3 E4'], ['◦vi', '◦iii', '◦vi'],
    '根音和纯五度支撑相同的旋律，三音省去。'),
  openSeventh: chordTexture(['A2 E3 G3', 'E3 B3 D4', 'A2 E3 G3'], ['◦vi₇', '◦iii₇', '◦vi₇'],
    '三音省去，内声部保留小七度；收束时高音仍是主音 A。')
};

mountHarmonyOptions({
  gongCenters, gongRootMoves, gongCadences, gongPhrases,
  yuCadences, yuAlterations, gongYuExchange, pentatonicChordTexture
});

const degrees = ['宫', '商', '角', '清角', '徵', '羽', '变宫'];
const scaleOffsets = [0, 2, 4, 5, 7, 9, 11];
const pentatonicDegrees = [0, 1, 2, 4, 5];

function inKey(tonic, degree, semitones) {
  return spellNote(tonic, degree, tonic.tonicPitch + semitones);
}

function pitchToken({ name, octave }) {
  return name + octave;
}

function buildGongModes({ gong, mode, size }) {
  const isSeven = size === 'seven';
  const start = Number(mode);
  const tonic = getTonic(gong, start >= 4 ? 3 : 4);
  const order = isSeven ? degrees.map((_, index) => index) : pentatonicDegrees;
  const startIndex = order.indexOf(start);
  const ascending = [...order.slice(startIndex), ...order.slice(0, startIndex).map(index => index + 7), start + 7];
  const notes = ascending.map(degree => {
    const step = degree % 7;
    const pitch = inKey(tonic, degree, scaleOffsets[step] + (degree >= 7 ? 12 : 0));
    const text = degree === start || degree === start + 7 ? '主音' : degrees[step];
    return `${pitchToken(pitch)}.4 { txt "${text}" }`;
  });
  const beats = isSeven ? 4 : 3;
  const notation = String.raw`\ks ${gong} \ts (${beats} 4) ${notes.slice(0, beats).join(' ')} | ${notes.slice(beats).join(' ')}`;
  const modeTonic = displayPitch(inKey(tonic, start, scaleOffsets[start]).name);
  const modeName = `${start === 4 ? modeTonic : modeTonic.toLowerCase()} ${degrees[start]}`;
  const prefix = start === 0 ? `${gong} 宫` : `${gong} 宫 · ${modeName}`;
  const colorTones = [3, 6].map(index => `${degrees[index]} ${displayPitch(inKey(tonic, index, scaleOffsets[index]).name)}`);
  return { notes: notation, description: isSeven ? `${prefix}。偏音为${colorTones.join('、')}。` : `${prefix}。五个正音构成循环，末尾回到主音。` };
}

const shapes = {
  major: { root: 'C', label: 'I', third: 4, seventh: false },
  minor: { root: 'A', label: 'vi', third: 3, seventh: false },
  seventh: { root: 'A', label: 'vi', third: 3, seventh: true }
};
const alterations = {
  second: { text: '二度', superscript: '²', degrees: [[1, 2]] },
  fourth: { text: '四度', superscript: '⁴', degrees: [[3, 5]] },
  sixth: { text: '六度', superscript: '⁶', degrees: [[5, 9]] },
  secondSixth: { text: '二度与六度', superscript: '²⁺⁶', degrees: [[1, 2], [5, 9]] },
  secondFourth: { text: '二度与四度', superscript: '²⁺⁴', degrees: [[1, 2], [3, 5]] },
  none: { text: '无三音', superscript: '', degrees: [] }
};

function updateShapeVariants(form) {
  const { base, operation, variant } = Object.fromEntries(new FormData(form));
  const variantSelect = form.elements.namedItem('variant');
  let choices;
  if (operation === 'open') choices = ['none'];
  else if (operation === 'replace') choices = ['fourth', 'second', 'secondFourth'];
  else choices = base === 'major' ? ['second', 'sixth', 'secondSixth'] : ['fourth'];

  const rare = choice => base === 'seventh' && operation === 'replace' && choice !== 'fourth';
  variantSelect.replaceChildren(...choices.map(choice => {
    const text = alterations[choice].text;
    return new Option(rare(choice) ? `${text}（少用）` : text, choice, false, choice === variant);
  }));
  variantSelect.disabled = choices.length === 1;
}

function buildShape({ base, operation, variant }) {
  const shape = shapes[base];
  const change = alterations[variant];
  const frame = [[0, 0], [4, 7]];
  if (shape.seventh) frame.push([6, 10]);
  const third = [2, shape.third];
  const original = [...frame, third];
  const modified = operation === 'add' ? [...original, ...change.degrees] : [...frame, ...change.degrees];
  const root = getTonic(shape.root, 4);

  function chord(tones, label) {
    const pitches = tones.toSorted((first, next) => first[0] - next[0]).map(([degree, semitones]) => inKey(root, degree, semitones));
    return `(${pitches.map(pitchToken).join(' ')}).2 { txt "${label}" }`;
  }

  const originalLabel = shape.label + (shape.seventh ? '₇' : '');
  const variantLabel = (operation === 'add' ? '' : '◦') + originalLabel + change.superscript;
  const notes = String.raw`\ks C \ts (2 4) ${chord(original, originalLabel)} | ${chord(modified, variantLabel)}`;
  const description = operation === 'open'
    ? (shape.seventh ? '去掉三音 C，保留 A–E 与小七度 A–G。' : '去掉三音，保留原位纯五度。')
    : operation === 'add'
      ? `保留原和弦各音，加入根音上方的${change.text}。`
      : `保留框架，以根音上方的${change.text}替代三音。`;
  return { notes, description };
}

function mountProgram(id, build, prepare) {
  const panel = document.getElementById(id);
  if (!panel) return;
  const form = panel.querySelector('form');
  const figure = panel.querySelector('figure');
  const cue = panel.querySelector('output');
  let player;

  function update(event) {
    if (!event || event.target.name !== 'variant') prepare?.(form);
    const selections = Object.fromEntries(Array.from(form.elements, select => [select.name, select.value]));
    const { notes, description } = build(selections);
    cue.textContent = description;
    if (player) player.setNotes(notes);
    else player = mountScore(figure, { notes, notation: 'staff', tempo: 100 });
  }

  form.addEventListener('change', update);
  update();
}

mountProgram('gongModes', buildGongModes);
mountProgram('pentatonicChordShapes', buildShape, updateShapeVariants);
