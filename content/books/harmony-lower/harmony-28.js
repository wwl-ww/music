import { labelledChordScore, mountHarmonyOptions } from '../../shared/formats/harmony-score.js';
import { mountScore } from '../../shared/formats/score.js';

const sourceTonic = { C: 'C', a: 'Am' };
const originLabels = { C: ['C: I', 'IV', 'V7', 'I'], a: ['a: i', 'iv', 'V7', 'i'] };
const keys = {
  C: 'C 大调', a: 'a 小调', G: 'G 大调', e: 'e 小调', F: 'F 大调', d: 'd 小调'
};
const degrees = {
  C: { Am: 'vi', C: 'I', Dm: 'ii', F: 'IV' },
  a: { Am: 'i', C: 'III', Dm: 'iv', F: 'VI' },
  G: { Am: 'ii', C: 'IV' },
  e: { Am: 'iv', C: 'VI' },
  F: { Am: 'iii', Dm: 'vi', F: 'I' },
  d: { Am: 'v', Dm: 'i', F: 'III' }
};
const directions = {
  dominant: { major: 'G', minor: 'e', pivots: ['Am', 'C'] },
  subdominant: { major: 'F', minor: 'd', pivots: ['Am', 'F', 'Dm'] }
};
const destinations = {
  G: { cadence: ['G: V7', 'I'], detail: 'D7 的 F♯ 上行到 G，属到主建立 G 大调。' },
  e: { cadence: ['e: iiø6/5', 'V7', 'i'], detail: 'F♯ 先出现在半减七和弦中，D♯ 再在 B7 中引向 E。' },
  F: { cadence: ['F: IV', 'K6/4', 'V7', 'I'], detail: 'B♭ 和弦引入新调的下属功能，接着终止确立 F。' },
  d: { cadence: ['d: iv', 'K6/4', 'V7', 'i'], detail: 'Gm 带来 B♭，A7 的 C♯ 在终止时引向 D。' }
};

// 每行按低音、次中音、中音、高音排列。每个中介组合都配有完整声部。
const routeVoicings = {
  'C-G-Am': [
    'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4',
    'A2 C4 E4 A4', 'D3 C4 F#4 A4', 'G3 B3 G4 G4',
  ],
  'C-G-C': [
    'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4',
    'C3 C4 E4 G4', 'D3 C4 D4 F#4', 'G3 B3 D4 G4',
  ],
  'C-e-Am': [
    'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4',
    'A2 C4 E4 A4', 'A2 C4 E4 F#4', 'B2 A3 D#4 F#4', 'E3 G3 E4 E4',
  ],
  'C-e-C': [
    'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4',
    'A2 C4 E4 F#4', 'B2 A3 D#4 F#4', 'E3 G3 E4 E4',
  ],
  'C-F-Am': [
    'C3 E4 G4 C5', 'F2 F4 A4 C5', 'G2 F4 G4 B4', 'C3 E4 G4 C5', 'A2 E4 A4 C5',
    'Bb2 D4 F4 Bb4', 'C3 C4 F4 A4', 'C3 Bb3 E4 G4', 'F3 A3 F4 F4',
  ],
  'C-F-F': [
    'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4', 'F2 C4 F4 A4',
    'Bb2 D4 F4 Bb4', 'C3 C4 F4 A4', 'C3 Bb3 E4 G4', 'F3 A3 F4 F4',
  ],
  'C-F-Dm': [
    'C3 E4 G4 C5', 'F2 F4 A4 C5', 'G2 F4 G4 B4', 'C3 E4 G4 C5', 'D3 D4 F4 A4',
    'Bb2 D4 F4 Bb4', 'C3 C4 F4 A4', 'C3 Bb3 E4 G4', 'F3 A3 F4 F4',
  ],
  'C-d-Am': [
    'C3 G3 E4 C5', 'F2 A3 F4 C5', 'G2 G3 F4 B4', 'C3 G3 E4 C5', 'A2 A3 E4 C5',
    'G2 Bb3 G4 D5', 'A2 A3 F4 D5', 'A2 G3 E4 C#5', 'D3 F3 D4 D5',
  ],
  'C-d-F': [
    'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4', 'F2 C4 F4 A4',
    'G2 Bb3 D4 G4', 'A2 A3 D4 F4', 'A2 G3 C#4 E4', 'D3 F3 D4 D4',
  ],
  'C-d-Dm': [
    'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4', 'D3 A3 D4 F4',
    'G2 Bb3 D4 G4', 'A2 A3 D4 F4', 'A2 G3 C#4 E4', 'D3 F3 D4 D4',
  ],
  'a-G-Am': [
    'A2 C4 E4 A4', 'D3 D4 F4 A4', 'E3 D4 E4 G#4',
    'A2 C4 E4 A4', 'D3 C4 F#4 A4', 'G3 B3 G4 G4',
  ],
  'a-G-C': [
    'A2 C4 E4 A4', 'D3 D4 F4 A4', 'E3 D4 E4 G#4', 'A2 C4 E4 A4',
    'C3 C4 E4 G4', 'D3 C4 D4 F#4', 'G3 B3 D4 G4',
  ],
  'a-e-Am': [
    'A2 C4 E4 A4', 'D3 D4 F4 A4', 'E3 D4 E4 G#4', 'A2 C4 E4 A4',
    'A2 C4 E4 F#4', 'B2 A3 D#4 F#4', 'E3 G3 E4 E4',
  ],
  'a-e-C': [
    'A2 C4 E4 A4', 'D3 D4 F4 A4', 'E3 D4 E4 G#4', 'A2 C4 E4 A4',
    'C3 C4 E4 G4', 'A2 C4 E4 F#4', 'B2 A3 D#4 F#4', 'E3 G3 E4 E4',
  ],
  'a-F-Am': [
    'A2 E4 A4 C5', 'D3 F4 A4 D5', 'E3 E4 G#4 D5', 'A2 E4 A4 C5',
    'Bb2 D4 F4 Bb4', 'C3 C4 F4 A4', 'C3 Bb3 E4 G4', 'F3 A3 F4 F4',
  ],
  'a-F-F': [
    'A2 C4 E4 A4', 'D3 D4 F4 A4', 'E3 D4 E4 G#4', 'A2 C4 E4 A4', 'F2 C4 F4 A4',
    'Bb2 D4 F4 Bb4', 'C3 C4 F4 A4', 'C3 Bb3 E4 G4', 'F3 A3 F4 F4',
  ],
  'a-F-Dm': [
    'A2 C4 E4 A4', 'D3 D4 F4 A4', 'E3 D4 E4 G#4', 'A2 C4 E4 A4', 'D3 D4 F4 A4',
    'Bb2 D4 F4 Bb4', 'C3 C4 F4 A4', 'C3 Bb3 E4 G4', 'F3 A3 F4 F4',
  ],
  'a-d-Am': [
    'A2 A3 E4 C5', 'D3 A3 F4 D5', 'E3 G#3 E4 D5', 'A2 A3 E4 C5',
    'G2 Bb3 G4 D5', 'A2 A3 F4 D5', 'A2 G3 E4 C#5', 'D3 F3 D4 D5',
  ],
  'a-d-F': [
    'A2 C4 E4 A4', 'D3 D4 F4 A4', 'E3 D4 E4 G#4', 'A2 C4 E4 A4', 'F2 C4 F4 A4',
    'G2 Bb3 D4 G4', 'A2 A3 D4 F4', 'A2 G3 C#4 E4', 'D3 F3 D4 D4',
  ],
  'a-d-Dm': [
    'A2 A3 E4 C5', 'D3 A3 F4 D5', 'E3 G#3 E4 D5', 'A2 A3 E4 C5', 'D3 A3 F4 D5',
    'G2 Bb3 G4 D5', 'A2 A3 F4 D5', 'A2 G3 E4 C#5', 'D3 F3 D4 D5',
  ],
};

function score(voicings, labels) {
  return labelledChordScore(voicings.map((pitches, index) => [[pitches, labels[index]]]));
}

function example(voicings, labels, description) {
  return { notes: score(voicings, labels), description };
}

function phraseExample(voicings, labels, barLengths, key, description) {
  let start = 0;
  const measures = barLengths.map(length => {
    const duration = length === 1 ? '2' : '4';
    const measure = voicings.slice(start, start + length)
      .map((pitches, index) => [pitches, labels[start + index], duration]);
    start += length;
    return measure;
  });
  return { notes: labelledChordScore(measures, key), description };
}

const cToFOpening = ['C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4'];
const cToFLabels = ['C: I', 'IV', 'V7', 'I = F: V'];

mountHarmonyOptions({
  'near-decoration': {
    plain: example([
      'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4',
      'A2 C4 E4 A4', 'D3 C4 F#4 A4', 'G3 B3 G4 G4',
    ], [
      'C: I', 'IV', 'V7', 'I', 'vi = G: ii', 'V7', 'I',
    ], '中介后直接用 G 大调的属七到主。'),
    tonicFirst: example([
      'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4',
      'A2 C4 E4 A4', 'D3 C4 F#4 A4', 'B2 B3 G4 D5', 'C3 E4 G4 C5',
      'D3 D4 G4 B4', 'D3 C4 F#4 A4', 'G3 B3 G4 G4',
    ], [
      'C: I', 'IV', 'V7', 'I', 'vi = G: ii', 'V7', 'I6', 'IV',
      'K6/4', 'V7', 'I',
    ], '第一次的 G 和弦以 B 为低音，最后以原位 G 收束。'),
    deceptive: example([
      'C3 E4 G4 C5', 'F2 F4 A4 C5', 'G2 F4 G4 B4', 'C3 E4 G4 C5',
      'A2 E4 A4 C5', 'D3 F#4 A4 C5', 'E3 G4 G4 B4', 'C3 E4 G4 C5',
      'D3 D4 G4 B4', 'D3 C4 F#4 A4', 'G3 B3 G4 G4',
    ], [
      'C: I', 'IV', 'V7', 'I', 'vi = G: ii', 'V7', 'vi', 'IV',
      'K6/4', 'V7', 'I',
    ], 'D7 第一次到 Em，延迟 G 大调主和弦的到来。'),
    throughMajor: example([
      'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4',
      'A2 C4 E4 A4', 'D3 C4 F#4 A4', 'G2 B3 G4 G4', 'C3 C4 E4 G4',
      'A2 C4 E4 F#4', 'B2 A3 D#4 F#4', 'E3 G3 E4 E4',
    ], [
      'C: I', 'IV', 'V7', 'I', 'vi = G: ii', 'V7', 'I', 'IV = e: VI',
      'iiø6/5', 'V7', 'i',
    ], 'G 大调先成立，C 和弦再从 G 大调 IV 转为 e 小调 VI。'),
    secondaryDominant: example([
      'C3 C4 E4 G4', 'F2 C4 F4 A4', 'G2 B3 F4 G4', 'C3 C4 E4 G4',
      'A2 C4 E4 A4', 'A2 C#4 G4 A4', 'D3 D4 G4 B4', 'D3 C4 F#4 A4',
      'G3 B3 G4 G4',
    ], [
      'C: I', 'IV', 'V7', 'I', 'vi = G: ii', 'V7/V', 'K6/4', 'V7',
      'I',
    ], '新调重属 A7 的 C♯ 上行到终止四六中的 D。'),
    subdominantShort: example([
      ...cToFOpening, 'F2 C4 F4 A4'
    ], [...cToFLabels, 'C: IV / F: I'], '末尾 C–F 仍可以听成旧调的 I–IV。'),
    subdominantCadence: example([
      ...cToFOpening, 'Bb2 D4 F4 Bb4', 'C3 C4 F4 A4', 'C3 Bb3 E4 G4', 'F3 A3 F4 F4'
    ], [...cToFLabels, 'F: IV', 'K6/4', 'V7', 'I'], '同一中介之后，B♭ 大三和弦补出新调 IV，再进入终止四六、属七与主。'),
  },
  'near-form': {
    openingEnd: phraseExample([
      'D3 D4 F#4 A4', 'G2 D4 G4 B4', 'A2 C#4 G4 A4', 'D3 D4 F#4 A4',
      'B2 D4 F#4 G#4', 'C#3 B3 E#4 G#4', 'F#3 A3 F#4 F#4',
    ], [
      'D: I', 'IV', 'V7', 'I = f#: VI', 'iiø6/5', 'V7', 'i',
    ], [2, 2, 2, 1], 'D', 'D 大调在呈示末转 f♯ 小调。C♯7 的 E♯ 指向 F♯，新调在结尾才得到终止。'),
    openingMid: phraseExample([
      'D3 D4 F4 A4', 'G2 D4 G4 Bb4', 'A2 C#4 G4 A4', 'D3 D4 F4 A4',
      'F3 C4 F4 A4', 'D3 B3 F4 A4', 'E3 D4 E4 G#4', 'A2 C4 E4 A4',
      'D3 D4 F4 A4', 'E3 D4 E4 G#4', 'A3 C4 E4 A4',
    ], [
      'd: i', 'iv', 'V7', 'i', 'III = a: VI', 'iiø6/5', 'V7', 'i',
      'iv', 'V7', 'i',
    ], [2, 2, 2, 1, 1, 2, 1], 'Dminor', 'd 小调较早转入属小调 a。越过第一次 a 小调终止以后，仍在新调内展开。'),
    middle: phraseExample([
      'D3 D4 F4 A4', 'G2 D4 G4 Bb4', 'A2 C#4 G4 A4', 'D3 D4 F4 A4',
      'C3 Eb4 G4 C5', 'D3 D4 G4 Bb4', 'D3 C4 F#4 A4', 'G3 Bb3 G4 G4',
      'Eb3 Bb3 G4 G4', 'G3 Bb3 G4 G4', 'D3 A3 F4 A4', 'A2 A3 G4 C#5',
      'D3 A3 F4 D5',
    ], [
      'd: i', 'iv', 'V7', 'i = g: v', 'iv', 'K6/4', 'V7', 'i',
      'VI', 'i', 'v = d: i', 'V7', 'i',
    ], [2, 1, 1, 2, 1, 1, 2, 2, 1], 'Dminor', 'd 小调在中段转下属 g，E♭ 提示新调方向。中段结束后，以 Dm 作共同和弦回到 d。'),
  }
});

const panel = document.getElementById('near-pivot');
const form = panel.querySelector('form');
const pivot = form.elements.namedItem('pivot');
const figure = panel.querySelector('figure');
const cue = panel.querySelector('output');
let playback;

function updateRoute() {
  const { source, direction, targetMode } = Object.fromEntries(new FormData(form));
  const route = directions[direction];
  const target = route[targetMode];
  const current = pivot.value;
  const selections = Array.from(pivot.options, option => option.value);
  if (selections.join(' ') !== route.pivots.join(' ')) {
    pivot.replaceChildren(...route.pivots.map(chord => new Option(chord, chord, false, chord === current)));
  }

  const bridge = pivot.value;
  const sourceDegree = degrees[source][bridge];
  const targetDegree = degrees[target][bridge];
  const change = `${source}: ${sourceDegree} = ${target}: ${targetDegree}`;
  const labels = [...originLabels[source]];
  if (sourceTonic[source] === bridge) labels[labels.length - 1] = change;
  else labels.push(change);

  const destination = destinations[target];
  const notes = score(routeVoicings[`${source}-${target}-${bridge}`], [...labels, ...destination.cadence]);
  cue.textContent = `${bridge} 在${keys[source]}是 ${sourceDegree}，在${keys[target]}是 ${targetDegree}。${destination.detail}`;
  if (playback) playback.setNotes(notes);
  else playback = mountScore(figure, { notes, notation: 'staff', tempo: 100 });
}

form.addEventListener('change', updateRoute);
updateRoute();
