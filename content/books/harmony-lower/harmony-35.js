import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';
import { mountScore } from '../../shared/formats/score.js';

function scored(key, rows, description) {
  return { notes: labelledChordScore(rows.map(row => [row]), key), description };
}

const cMajor = ['C3 E4 G4 C5', 'I'];
const cMinor = ['C3 Eb4 G4 C5', 'i'];
const largeSubdominant = ['F3 F4 A4 C5', 'IV'];
const smallSubdominant = ['F3 F4 Ab4 C5', 'iv'];
const largeDominant = ['G3 D4 G4 B4', 'V'];
const smallDominant = ['G3 D4 G4 Bb4', 'v'];
const majorClose = ['C4 E4 G4 C5', 'I'];
const minorClose = ['C4 Eb4 G4 C5', 'i'];
const minorSixthOpening = ['C3 G3 Eb4 C5', 'i'];
const minorSixthCadence = [
  ['D3 A3 F4 D5', 'ii'], ['G2 B3 F4 D5', 'V7'], ['C3 C4 Eb4 C5', 'i']
];

const majorExamples = {
  natural: scored('C', [cMajor, largeSubdominant, largeDominant, majorClose],
    'A 属于大下属，B 保留为属三音。'),
  minorSubdominant: scored('C', [cMajor, smallSubdominant, largeDominant, majorClose],
    'A♭ 进入下属和弦后向 G 解决，大属与大主仍保留。'),
  loweredSubmediant: scored('C', [
    ['C3 G3 E4 C5', 'I'], ['G2 F3 D4 B4', 'V7'], ['Ab2 Eb3 C4 C5', '♭VI'],
    ['F2 Ab3 F4 C5', 'iv'], ['G2 F3 D4 B4', 'V7'], ['C3 E3 C4 C5', 'I']
  ], '第一次属七去向 ♭VI，产生阻碍进行。A♭ 大三和弦保留 E♭，随后通过小下属回到 C 大调终止。'),
  minorDominant: scored('C', [cMajor, largeSubdominant, smallDominant, majorClose],
    '小属 v 的 B♭ 到 C 是全音，收束比大属柔和。'),
  loweredLeading: scored('C', [
    cMajor, smallSubdominant, ['Bb2 D4 F4 D5', '♭VII'], ['C3 G3 E4 E5', 'I']
  ], '低音从 B♭ 上行全音到 C。♭VII 以全音靠近主音，收束仍落在大主和弦。'),
  loweredMediant: scored('C', [
    ['C3 G3 E4 C5', 'I'], ['Eb3 G3 Eb4 Bb4', '♭III'],
    ['G2 G3 D4 Bb4', 'v'], ['C3 G3 E4 G4', 'I']
  ], '♭III 接小属时保持 G 和 B♭。最后 E 回到大主和弦。'),
  phrygian: scored('C', [
    cMajor, ['F3 F4 Ab4 Db5', '♭II6'], ['G3 E4 G4 C5', 'K6/4'],
    ['G3 D4 F4 B4', 'V7'], ['C4 C4 E4 C5', 'I']
  ], 'D♭ 进入下属方向，先到终止四六中的 C，主和弦性质仍是大三和弦。')
};

const minorExamples = {
  natural: scored('Cminor', [cMinor, smallSubdominant, smallDominant, minorClose],
    '自然小调的属三音是 B♭。'),
  majorDominant: scored('Cminor', [cMinor, smallSubdominant, largeDominant, minorClose],
    '只提高第Ⅶ级。B 变为半音导音，小主和弦的 E♭ 保留。'),
  raisedMediant: scored('Cminor', [
    minorSixthOpening, ['E3 G3 E4 B4', '♮iii'], ['G2 D4 F4 B4', 'V7'], ['C3 C4 Eb4 C5', 'i']
  ], 'E♭ 升回 E，借来 Em。它的 B 保持到 V₇，再向小主和弦的 C 解决。'),
  majorSubdominant: scored('Cminor', [cMinor, largeSubdominant, largeDominant, minorClose],
    'A 使下属变成大三和弦，与升高的第Ⅶ级 B 同属旋律小调上行使用的音。'),
  supertonic: scored('Cminor', [
    cMinor, ['D3 C4 F4 A4', 'ii7'], ['G2 B3 F4 D5', 'V7'], ['C3 C4 Eb4 C5', 'i']
  ], '上主小七使用 A。七音 C 下行到 B，随后 B 上行回到主音。'),
  raisedSixth: scored('Cminor', [
    minorSixthOpening, ['A2 C4 Eb4 C5', '♮vi°'], ...minorSixthCadence
  ], '根音 A 升回本位，五音仍是 E♭，形成减三和弦。'),
  borrowedSixth: scored('Cminor', [
    minorSixthOpening, ['A2 C4 E4 C5', '♮vi'], ...minorSixthCadence
  ], '同主音大调的 vi 同时使用 A 和 E，形成小三和弦。末尾仍收在 c 小调。'),
  majorTonic: scored('Cminor', [
    cMinor, smallSubdominant, ['G3 D4 F4 B4', 'V7'], ['C4 C4 E4 C5', 'I']
  ], '全句仍围绕 C。末和弦的 E♭ 升为 E，收束呈大三和弦色彩。')
};

const functionTonic = ['C3 G3 E4 C5', 'I'];
const functionDominant = ['G2 F3 D4 B4', 'V7'];
const functionClose = ['C3 E3 C4 C5', 'I'];
const submediant = ['A2 E3 C4 C5', 'vi'];
const mediant = ['E3 G3 E4 B4', 'iii'];
const functionExamples = {
  submediantPredominant: scored('C', [
    ['E3 G3 C4 G4', 'I6'], submediant, functionDominant, functionClose
  ], 'Am 放在属七之前，承担下属方向的作用，属七最后归主。'),
  submediantDeceptive: scored('C', [
    functionTonic, functionDominant, submediant
  ], '同一配置的 Am 承接属七，落在原来预期归主的位置。'),
  mediantTonic: scored('C', [
    functionTonic, mediant, functionTonic
  ], 'Em 与前后两个 I 保持 E、G，整段延长主功能。'),
  mediantDominant: scored('C', [
    ['A2 F3 C4 C5', 'IV6'], mediant, ['G2 D4 F4 B4', 'V7'], ['C3 C4 E4 C5', 'I']
  ], 'Em 把高音 B 延续到 V₇，随后 B 上行到 C，与属组的归主方向相连。')
};

mountHarmonyOptions({
  'parallel-major-harmony': majorExamples,
  'parallel-minor-harmony': minorExamples,
  'mixture-function-context': functionExamples
});

const naturalMajor = 'C D E F G A B';
const naturalMinor = 'C D Eb F G Ab Bb';
const combined = 'C Db D Eb E F G Ab A Bb B';
const forms = {
  naturalMajor: { tones: naturalMajor, cue: 'Ⅲ、Ⅵ、Ⅶ均使用自然大调音高。' },
  harmonicMajor: { tones: 'C D E F G Ab B', cue: '降Ⅵ级 A♭ 与Ⅶ级 B 之间是增二度。' },
  melodicMajor: { tones: naturalMajor, down: 'C D E F G Ab Bb', cue: '下行降Ⅵ、Ⅶ级，上行保留自然大调。' },
  naturalMinor: { tones: naturalMinor, minor: true, cue: 'Ⅲ、Ⅵ、Ⅶ均比同主音自然大调低半音。' },
  harmonicMinor: { tones: 'C D Eb F G Ab B', minor: true, cue: '升回Ⅶ级 B，与 A♭ 之间是增二度。' },
  melodicMinor: { tones: 'C D Eb F G A B', down: naturalMinor, minor: true, cue: '上行提高Ⅵ、Ⅶ级，下行回到自然小调。' },
  phrygian: { tones: 'C Db Eb F G Ab Bb', minor: true, cue: 'D♭ 离主音 C 是半音，提供降Ⅱ级和弦所需的根音。' },
  combinedMajor: { tones: combined, tonicChord: 'C4 E4 G4', cue: '综合音列的十一音都可使用。首尾的大主和弦保留 E。' },
  combinedMinor: { tones: combined, minor: true, tonicChord: 'C4 Eb4 G4', cue: '综合音列与大调示范相同。首尾的小主和弦使用 E♭。' }
};

function buildScale({ form, direction }) {
  const { tones, down, minor, tonicChord, cue } = forms[form];
  const ascending = direction === 'up';
  let pitches = (ascending ? tones : down ?? tones).split(' ').map(note => note + '4');
  pitches.push('C5');
  if (!ascending) pitches.reverse();
  const bars = Array.from({ length: pitches.length / 4 }, (_, bar) =>
    pitches.slice(bar * 4, bar * 4 + 4).map(note => note + '.4').join(' '));
  if (tonicChord) {
    const anchor = `(${tonicChord}).1`;
    bars.unshift(anchor);
    bars.push(anchor);
  }
  const signature = minor ? 'Cminor' : 'C';
  return { notes: String.raw`\ks ${signature} \ts (4 4) ${bars.join(' | ')}`, description: cue };
}

const panel = document.getElementById('parallel-scale-colors');
if (panel) {
  const form = panel.querySelector('form');
  const figure = panel.querySelector('figure');
  const cue = panel.querySelector('output');
  let playback;

  function render() {
    const { notes, description } = buildScale(Object.fromEntries(new FormData(form)));
    cue.textContent = description;
    if (playback) playback.setNotes(notes);
    else playback = mountScore(figure, { notes, notation: 'staff', tempo: 100 });
  }

  form.addEventListener('change', render);
  render();
}
