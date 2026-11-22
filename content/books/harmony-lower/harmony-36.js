import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';
import { getTonic, spellNote, displayPitch } from '../../shared/formats/pitch.js';
import { mountScore } from '../../shared/formats/score.js';
import { majorKeys } from '../../shared/formats/scales.js';

function progression(rows, description) {
  return { notes: labelledChordScore(rows.map(row => [row]), 'C'), description };
}

const tonic = ['C3 G3 E4 C5', 'I'];
const plagalSubdominant = ['F3 Ab3 F4 C5', 'iv'];
const fourthDegree = ['F3 F4 A4 C5', 'IV'];
const loweredFourth = ['F3 F4 Ab4 C5', 'iv'];
const fifthDegree = ['G3 D4 G4 B4', 'V'];
const cadentialSixFour = ['G3 E4 G4 C5', 'K6/4'];
const fullDominant = ['G3 D4 F4 B4', 'V7'];
const closeOnC = ['C4 C4 E4 C5', 'I'];
const neighborIv = ['C3 Ab3 F4 C5', 'iv6/4'];
const dominantClose = ['C3 C4 E4 G4', 'I'];

const contrast = {
  natural: progression([['C3 E4 G4 C5', 'I'], fourthDegree, fifthDegree, ['C4 E4 G4 C5', 'I']],
    'IV 的三音为 A。属与主的连接保持自然大调。'),
  substitute: progression([['C3 E4 G4 C5', 'I'], loweredFourth, fifthDegree, ['C4 E4 G4 C5', 'I']],
    '同一个位置换成 iv，A♭ 向相邻的 G 解决。'),
  juxtapose: progression([
    tonic, ['A2 F3 F4 C5', 'IV6'], ['Ab2 F3 F4 C5', 'iv6'], tonic
  ], '低音在同一条声部线上下行 A–A♭，上方 F、C 保持。'),
  crossRelation: progression([
    ['A2 C4 F4 F5', 'IV6'], ['F2 C4 Ab4 F5', 'iv']
  ], '对照写法。自然Ⅵ级在低音，降Ⅵ级改由中音奏出，形成对斜。'),
  augmentedSecond: progression([
    ['F3 C4 F4 Ab4', 'iv'], ['G2 D4 G4 B4', 'V']
  ], '对照写法。高音 A♭ 上行到 B，形成增二度。'),
  corrected: progression([
    ['F3 C4 F4 Ab4', 'iv'], ['G2 B3 D4 G4', 'V'], dominantClose
  ], '高音 A♭ 改为下行半音到 G，属三音 B 由次中音承担。')
};

const subdominant = {
  plagal: progression([tonic, plagalSubdominant, tonic], '小下属原位重复根音 F，C 作为共同音留在高音。'),
  firstRoot: progression([
    tonic, ['Ab2 F3 F4 C5', 'iv6'], tonic
  ], '第一转位以 A♭ 为低音，重复根音 F。'),
  firstFifth: progression([
    tonic, ['Ab2 F3 C4 C5', 'iv6'], tonic
  ], '仍以 A♭ 为低音，这次重复五音 C。'),
  dominantSeventh: progression([
    ['F3 C4 F4 Ab4', 'iv'], ['G2 B3 F4 G4', 'V7'], dominantClose
  ], 'F 留在中音成为属七的七音，下一个和弦再把它解决到 E。'),
  dominantNinth: progression([
    ['F3 C4 F4 Ab4', 'iv'], ['G3 B3 F4 Ab4', 'V♭9'], dominantClose
  ], '原来的 A♭ 保留为属九的降九音，F 成为七音。两声部分别下行到 G、E。'),
  leadingSeventh: progression([
    ['F3 C4 F4 Ab4', 'iv'], ['B2 D4 F4 Ab4', 'vii°7'], dominantClose
  ], '导减七与小下属共有 F、A♭。导音 B 在低音进入，再上行解决到 C。'),
  cadential: progression([
    loweredFourth, cadentialSixFour, fullDominant, closeOnC
  ], '终止四六保留上方 C，A♭ 转为 G；低音已在属音上。'),
  firstCadential: progression([
    ['Ab2 F3 F4 C5', 'iv6'], ['G2 G3 E4 C5', 'K6/4'],
    ['G2 F3 D4 B4', 'V7'], ['C3 E3 C4 C5', 'I']
  ], '这次降Ⅵ级在低音，A♭–G 的半音直接引出终止四六的属音低音。'),
  auxiliary: progression([
    tonic, neighborIv, tonic
  ], '主音低音不变。中间的小下属四六重复五音 C。'),
  extension: progression([
    ['G2 D4 F4 B4', 'V7'], ['C3 C4 E4 C5', 'I'],
    ['C3 A3 F4 C5', 'IV6/4'], neighborIv, ['C3 G3 G4 E5', 'I']
  ], '主音低音上对置大、小下属四六，形成补充变格终止。最后的大主和弦把高音移到 E。')
};

const supertonic = {
  plagal: progression([
    tonic, ['F3 Ab3 F4 D5', 'ii°6'], tonic
  ], '上主减六重复三音 F，低音归到主音。'),
  juxtapose: progression([
    ['E3 G3 G4 C5', 'I6'], ['F3 A3 F4 D5', 'ii6'], ['F3 Ab3 F4 D5', 'ii°6'], tonic
  ], '两个上主六和弦的低音相同。五音由次中音的 A 下行半音到 A♭。'),
  toDominant: progression([
    tonic, ['F3 Ab3 F4 D5', 'ii°6'], ['G2 G3 F4 B4', 'V7'], tonic
  ], '上主六可接属七。F 作为共同音保持，降Ⅵ级 A♭ 下行到 G。'),
  fromSubdominant: progression([
    ['C3 E4 G4 C5', 'I'], loweredFourth, ['F3 F4 Ab4 D5', 'ii°6'],
    cadentialSixFour, fullDominant, closeOnC
  ], 'iv、ii°₆ 都以 F 为低音。C 在高音移动到 D，其余声部保留，然后接终止四六。'),
  seventhCadence: progression([
    ['C3 E4 G4 C5', 'I'], ['D3 F4 Ab4 C5', 'iiø7'], cadentialSixFour, fullDominant, closeOnC
  ], '上主半减七用原位，四个和弦音都保留。七音 C 先保持到终止四六，再下行。'),
  firstCadence: progression([
    ['F3 D4 Ab4 C5', 'iiø6/5'], fullDominant, closeOnC
  ], '半减五六的低音为 F，七音 C 在高音下行到 B。'),
  seventhContrast: progression([
    ['E3 G3 C4 G4', 'I6'], ['D3 F3 C4 A4', 'ii7'], ['D3 F3 C4 Ab4', 'iiø7'],
    ['G2 E3 C4 G4', 'K6/4'], ['G2 D3 B3 F4', 'V7'], ['C3 C3 C4 E4', 'I']
  ], '高音 A–A♭–G 连续下行。在同级七和弦变换中，D、F、C 都保持。'),
  passing: progression([
    ['E3 C4 G4 G4', 'I6'], ['D3 C4{t} F4 Ab4', 'iiø7'], ['C3 C4{t} E4 C5', 'I']
  ], '低音 E–D–C 与上声部上行相反，次中音 C 始终保持。')
};

mountHarmonyOptions({
  'harmonic-major-contrast': contrast,
  'harmonic-major-subdominant': subdominant,
  'harmonic-major-supertonic': supertonic
});

const subdominantDegrees = [[3, 5], [5, 9], [7, 12]];
const supertonicDegrees = [[1, 2], [3, 5], [5, 9], [7, 12]];
const structures = {
  iv: { tones: subdominantDegrees, inversion: 0, labels: ['IV', 'iv'] },
  iv6: { tones: subdominantDegrees, inversion: 1, labels: ['IV6', 'iv6'] },
  iv64: { tones: subdominantDegrees, inversion: 2, labels: ['IV6/4', 'iv6/4'] },
  ii6: { tones: supertonicDegrees.slice(0,3), inversion: 1, labels: ['ii6', 'ii°6'] },
  ii7: { tones: supertonicDegrees, inversion: 0, labels: ['ii7', 'iiø7'] },
  ii65: { tones: supertonicDegrees, inversion: 1, labels: ['ii6/5', 'iiø6/5'] }
};

function buildStructure(key, shape) {
  const keyCenter = getTonic(key, ['C', 'D'].includes(key[0]) ? 4 : 3);
  const { tones, inversion, labels } = structures[shape];
  const order = [...tones.slice(inversion), ...tones.slice(0, inversion).map(([degree, note]) => [degree+7,note+12])];
  const chords = labels.map((label, altered) => {
    const pitches = order.map(([degree, distance]) => {
      const change = degree % 7 === 5 ? altered : 0;
      const { name, octave } = spellNote(keyCenter, degree, keyCenter.tonicPitch + distance - change);
      return name + octave;
    });
    return `(${pitches.join(' ')}).2 { txt "${label}" }`;
  });
  const sixth = delta => displayPitch(spellNote(keyCenter, 5, keyCenter.tonicPitch + delta).name);
  const member = shape.startsWith('iv') ? '下属和弦的三音' : '上主和弦的五音';
  const notes = String.raw`\ks ${key} \ts (2 4) ${chords.join(' | ')}`;
  return { notes, description: `${sixth(9)} → ${sixth(8)}，降低${member}，其余构成音与转位保持。` };
}

const panel = document.getElementById('harmonic-major-structures');
if (panel) {
  const form = panel.querySelector('form');
  const figure = panel.querySelector('figure');
  const cue = panel.querySelector('output');
  const tonicMenu = form.elements.namedItem('tonic');
  tonicMenu.replaceChildren(...majorKeys.map(key => new Option(displayPitch(key), key, false, key === tonicMenu.value)));
  let playback;

  function render() {
    const { tonic, shape } = Object.fromEntries(new FormData(form));
    const { notes, description } = buildStructure(tonic, shape);
    cue.textContent = description;
    if (playback) playback.setNotes(notes);
    else playback = mountScore(figure, { notes, notation: 'staff', tempo: 100 });
  }

  form.addEventListener('change', render);
  render();
}
