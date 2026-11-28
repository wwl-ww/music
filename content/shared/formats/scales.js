import { displayPitch, getTonic, spellNote, naturalOffsets } from './pitch.js';

export const majorKeys = ['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
export const minorKeys = ['Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'];

const majorSteps = [0, 2, 4, 5, 7, 9, 11, 12];
const minorSteps = [0, 2, 3, 5, 7, 8, 10, 12];
const typeNames = { natural: '自然', harmonic: '和声', melodic: '旋律' };
export const pentatonicDegrees = [0, 1, 2, 4, 5];
export const pentatonicSteps = pentatonicDegrees.map(degree => majorSteps[degree]);
export const pentatonicModes = ['宫', '商', '角', '徵', '羽'];
export const sevenToneScales = {
  ya: { label: '雅乐', steps: [0, 2, 4, 6, 7, 9, 11] },
  qing: { label: '清乐', steps: naturalOffsets },
  yan: { label: '燕乐', steps: [0, 2, 4, 5, 7, 9, 10] }
};
const medievalModes = {
  ionian: { label: '伊奥尼亚', degree: 0 },
  dorian: { label: '多利亚', degree: 1 },
  phrygian: { label: '弗里几亚', degree: 2 },
  lydian: { label: '利底亚', degree: 3 },
  mixolydian: { label: '混合利底亚', degree: 4 },
  aeolian: { label: '爱奥尼亚', degree: 5 },
  locrian: { label: '洛克里亚', degree: 6 }
};

export { displayPitch } from './pitch.js';

export function buildMajorScale(choices) {
  return buildScale(choices, false);
}

export function buildMinorScale(choices) {
  return buildScale(choices, true);
}

function buildScale({ tonic, type, direction }, minor) {
  const root = getTonic(tonic);

  function scale(descending) {
    const melodic = type === 'melodic' && (minor ? !descending : descending);
    const harmonic = type === 'harmonic';
    const alterSixth = melodic || (!minor && harmonic);
    const alterSeventh = melodic || (minor && harmonic);
    const steps = (minor ? minorSteps : majorSteps).map((step, degree) => {
      const altered = (degree === 5 && alterSixth) || (degree === 6 && alterSeventh);
      const pitch = root.tonicPitch + step + Number(altered) * (minor ? 1 : -1);
      return spellNote(root, degree, pitch);
    });
    return descending ? steps.reverse() : steps;
  }

  const signature = minor ? tonic + 'minor' : tonic;
  const name = `${displayPitch(tonic)} ${typeNames[type]}${minor ? '小调' : '大调'}`;
  return scaleScore(scale, direction, signature, '4 4', name);
}

export function buildPentatonicScale({ gong, mode, direction }, signature = gong) {
  const start = Number(mode);
  const root = getTonic(gong);
  const ascending = rotateScale(root, pentatonicDegrees, pentatonicSteps, start);
  const name = `${displayPitch(ascending[0].name)} ${pentatonicModes[start]}调式（${displayPitch(gong)} 宫系统）`;
  const gongScale = rotateScale(root, pentatonicDegrees, pentatonicSteps, 0);
  const summary = pentatonicModes.map((modeName, index) => `${modeName} ${displayPitch(gongScale[index].name)}`).join(' · ');
  return { ...scaleScore(descending => descending ? ascending.toReversed() : ascending, direction, signature, '3 4', name), summary };
}

export function buildParallelPentatonicScale({ tonic, mode, direction }) {
  const start = Number(mode);
  const root = getTonic(tonic);
  const gong = spellNote(root, -pentatonicDegrees[start], root.tonicPitch - pentatonicSteps[start]).name;
  const standardSignature = majorKeys.includes(gong);
  const score = buildPentatonicScale({ gong, mode, direction }, standardSignature ? gong : 'C');
  const name = `${displayPitch(tonic)} ${pentatonicModes[start]}调式 · 宫音 ${displayPitch(gong)}`;
  return { ...score, summary: standardSignature ? name : `${name} · 升降号写在音符前` };
}

export function buildSevenToneScale({ type, mode, direction }) {
  const modeIndex = Number(mode);
  const label = sevenToneScales[type].label + pentatonicModes[modeIndex] + '调式';
  return buildTraditionalScale({ gong: 'C', type, degree: pentatonicDegrees[modeIndex], direction, label });
}

export function buildTraditionalScale({ gong, type, degree, direction, label }) {
  const { steps } = sevenToneScales[type];
  const degrees = steps.map((_, index) => index);
  const ascending = rotateScale(getTonic(gong), degrees, steps, degree);
  const name = `${displayPitch(ascending[0].name)} ${label}（${displayPitch(gong)} 宫系统）`;
  return scaleScore(descending => descending ? ascending.toReversed() : ascending, direction, gong, '4 4', name);
}

export function buildMedievalScale({ tonic, mode, direction }) {
  const { label, degree } = medievalModes[mode];
  const root = getTonic(tonic);
  const template = rotateScale(getTonic('C'), [0, 1, 2, 3, 4, 5, 6], naturalOffsets, degree);
  const ascending = template.map(({ pitch }, index) => spellNote(root, index, root.tonicPitch + pitch - template[0].pitch));
  const relativeMajor = spellNote(root, 7 - degree, root.tonicPitch + 12 - naturalOffsets[degree]).name;
  const signature = majorKeys.includes(relativeMajor) ? relativeMajor : 'C';
  const name = `${displayPitch(tonic)} ${label}调式`;
  return scaleScore(descending => descending ? ascending.toReversed() : ascending, direction, signature, '4 4', name);
}

function rotateScale(root, degrees, steps, start) {
  const size = degrees.length;
  const shift = root.tonicPitch + steps[start] >= 72 ? 1 : 0;
  return Array.from({ length: size + 1 }, (_, index) => {
    const position = start + index;
    const step = position % size;
    const octave = Math.floor(position / size) - shift;
    return spellNote(root, degrees[step] + 7 * octave, root.tonicPitch + steps[step] + 12 * octave);
  });
}

function scaleScore(scale, direction, signature, meter, name) {
  const scales = [];
  if (direction !== 'down') scales.push(scale(false));
  if (direction !== 'up') scales.push(scale(true));
  const measures = scales.map(notes => notes.map(({ name, octave }) => `${name}${octave}.8`).join(' '));
  const names = scales.map(notes => notes.map(({ name, octave }) => displayPitch(name) + octave).join('、'));
  return {
    notes: String.raw`\ks ${signature} \ts (${meter}) ${measures.join(' | ')}`,
    pitches: scales.flat().map(({ pitch }) => pitch),
    description: `${name}。 ${names.join('；')}`
  };
}
