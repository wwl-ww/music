import { renderHarmonyPattern } from '../../shared/formats/accompaniment-patterns.js';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { mountChordRevision } from '../../shared/formats/chord-revision.js';
import { pianoKeysMarkup } from '../../shared/formats/piano.js';
import { displayPitch, getTonic } from '../../shared/formats/pitch.js';
import { mountVoiceRelations } from '../../shared/formats/voice-relations.js';
import { mountPianoStudy, pianoHands } from './piano-lesson-score.js';

const theme = [
  [['C5', 4], ['D5', 8], ['E5', 8], ['F5', 2]],
  [['F5', 4], ['G5', 8], ['F5', 8], ['A5', 2]],
  [['D5', 4], ['G5', 4], ['B4', 2]],
  [['C5', 1]]
];

const sharedModePhrase = [
  [['E5', 4], ['G5', 4], ['E5', 2]],
  [['D5', 4], ['D5', 4], ['C5', 2]]
];

const leftHands = {
  C: 'C3 E3 G3',
  F: 'F3 A3 C4',
  G: 'G3 B3 D4',
  Dm: 'D3 F3 A3',
  Am: 'A2 C3 E3',
  Cm: 'C3 Eb3 G3',
  E: 'E3 G#3 B3',
  G7: 'G3 B3 D4 F4',
  E7: 'E3 G#3 B3 D4',
  Cadd9: 'C3 D3 E3 G3',
  Fmaj7: 'F3 A3 C4 E4',
  Am7: 'A2 C3 E3 G3',
  G7sus4: 'G3 C4 D4 F4',
  Cmaj9: 'C3 D3 E3 B3',
  D7: 'D3 F#3 C4',
  'F/C': 'C3 F3 A3',
  'F/A': 'A2 C3 F3',
  'Dm/A': 'A2 D3 F3',
  'G/B': 'B2 D3 G3',
  'B♭maj7': 'Bb2 D3 F3 A3',
  Gm7: 'G3 Bb3 D4 F4',
  Em7: 'E3 G3 B3 D4',
  Fm6: 'F3 Ab3 C4 D4'
};

function harmonizedScore(chordBars, melody) {
  const accompaniment = chordBars.map(chords => {
    const duration = chords.length === 2 ? 2 : 1;
    return chords.length ? chords.map(chord => `(${leftHands[chord]}).${duration}`).join(' ') : 'r.1';
  }).join(' | ');
  const right = melody.map((measure, index) => {
    const chords = chordBars[index];
    let beat = 0;
    return measure.map(([pitch, duration]) => {
      const label = beat === 0 ? chords[0] : beat === 2 ? chords[1] : undefined;
      beat += 4 / duration;
      return `${pitch}.${duration}${label ? ` { txt "${label}" }` : ''}`;
    }).join(' ');
  }).join(' | ');
  return pianoHands(right, accompaniment);
}

function version(label, description, chords, melody = theme) {
  return { label, description, notes: harmonizedScore(chords, melody) };
}

function revision(label, chordBars) {
  return {
    label,
    bars: chordBars.map(chords => chords.map((symbol, index) => {
      const span = 4 / chords.length;
      return { symbol, start: index * span, end: (index + 1) * span, voicing: leftHands[symbol] };
    })),
    score: harmonizedScore(chordBars, theme)
  };
}

function harmonyPattern(chordBars, degrees, beats = 4) {
  return chordBars.map(chords => chords.map((chord, index) => {
    const span = beats / chords.length;
    return { chord, degree: degrees[chord], bass: displayPitch(leftHands[chord].split(' ')[0]), span, beat: index * span + 1 };
  }));
}

const coarse = [['C'], ['F'], ['G'], ['C']];
const primary = [['C', 'F'], ['F'], ['G'], ['C']];
const cadence = [['C', 'F'], ['F'], ['G', 'G7'], ['C']];
const tempo = 84;

let openingStep = 0;
const openingMelody = theme[0].map(([pitch, duration]) => {
  const length = 8 / duration;
  const event = { step: openingStep, length, text: displayPitch(pitch), accent: openingStep === 0 || openingStep === 4 };
  openingStep += length;
  return event;
});
const openingOptions = harmonyPattern(primary.slice(0, 1), { C: 'I', F: 'IV' })[0].map(({ chord, beat, span }) => ({
  step: (beat - 1) * 2, text: chord, length: span * 2
}));
mountArrangementGrid(document.querySelector('[data-harmony-grid]'), {
  beats: 4,
  beatsPerBar: 4,
  subdivisions: 2,
  label: '第 1 小节右手旋律与左手换弦拍点',
  rows: [
    { label: '旋律', events: openingMelody },
    { label: '和弦', events: openingOptions }
  ]
});

mountPianoStudy('primary-harmony', [
  version('只有旋律', '第 1 小节后半的 F5 是长音。固定这条右手旋律，只改变左手的换弦位置。', [[], [], [], []]),
  version('每小节一换', '第 1 小节的 C 持续四拍，后半的 F5 和左手的 E3 持续构成摩擦，到第 2 小节的 F 才消失。', coarse),
  version('第 3 拍换和弦', '第 1 小节第 3 拍换成 F，刚好接住长音 F5。第 2 小节仍保持 F，其余位置不必继续加密。', primary)
]);

mountPianoStudy('relative-centers', [
  version('C 大调', '旋律只用两调共有的音。G7 接 C，最后的 C5 与低音 C3 处在两个八度的同音位置。', [['C'], ['G7', 'C']], sharedModePhrase),
  version('A 小调', '旋律与节奏保持不变。E7 中的 G♯ 接向 Am，句尾的 C5 成了 Am 的小三度。', [['Am'], ['E7', 'Am']], sharedModePhrase)
]);

renderHarmonyPattern(document.querySelector('#minor-primary-pattern'), harmonyPattern(
  [['Am'], ['Dm'], ['E'], ['Am']], { Am: 'i', Dm: 'iv', E: 'V' }, 3
), 3, { showBass: true });

for (const diagram of document.querySelectorAll('[data-triad-keys]')) {
  const marks = leftHands[diagram.dataset.triadKeys].split(' ').map(pitch => {
    const name = pitch.slice(0, -1);
    const common = name === 'F' || name === 'A';
    return [getTonic(name).tonicPitch % 12, common ? 'keyboard-highlight' : 'keyboard-end', common ? 'start' : 'end'];
  });
  diagram.innerHTML = pianoKeysMarkup(marks, 1);
}

mountPianoStudy('secondary-triads', [
  version('第 2 小节用 F', 'F 同时包含 A、F，左手继续保持 F3 为最低音。', primary),
  version('第 2 小节用 Dm', '左手保留同音高的 F3、A3，加入较低的 D3，下一小节仍到 G。', [['C', 'F'], ['Dm'], ['G'], ['C']])
]);

mountVoiceRelations(document.querySelector('#harmonic-function-route'), {
  unitCount: 6,
  unitName: '位置',
  lanes: [
    { label: '主功能', events: [
      { id: 'tonic', label: 'I', start: 1, length: 1, detail: 'C 建立主音' },
      { id: 'third', label: 'iii', start: 2, length: 1, detail: 'Em 与 C 共享 E、G' },
      { id: 'sixth', label: 'vi', start: 3, length: 1, detail: 'Am 与 C 共享 C、E' },
      { id: 'arrival', label: 'I', start: 6, length: 1, detail: '末尾回到 C 主和弦' }
    ] },
    { label: '下属功能', events: [
      { id: 'preparation', label: 'ii', start: 4, length: 1, detail: 'Dm 为 G7 做准备，也常由 IV 的 F 担任这一作用' }
    ] },
    { label: '属功能', events: [
      { id: 'dominant', label: 'V7', start: 5, length: 1, detail: 'G7 的三音 B 和七音 F 产生解决倾向' }
    ] }
  ],
  links: [
    { from: 'tonic', to: 'third', label: '从 I 出发，先用 iii 延伸主功能' },
    { from: 'third', to: 'sixth', label: 'vi 可接在 iii 后继续延展，也可直接接 I' },
    { from: 'sixth', to: 'preparation', label: 'ii 离开主功能，开始准备终止' },
    { from: 'preparation', to: 'dominant', label: 'ii 到根音在其下方五度的 V7' },
    { from: 'dominant', to: 'arrival', label: 'V7 到 I 收束，也可以在 V7 处暂歇' }
  ]
});

mountPianoStudy('harmonic-closure', [
  version('属到主', '第 3 小节末加上属七音 F4，末小节回 C。旋律 B4 上行到 C5，低音由 G3 回到 C3。', cadence),
  version('半终止', '乐句截在第 3 小节的 G7，B4 和 F4 的张力留待下一句。', cadence.slice(0, 3), theme.slice(0, 3)),
  version('属到 vi', '右手照样走到 C5，左手改落在 A2，C5 成了 Am 的三音。', [['C', 'F'], ['F'], ['G', 'G7'], ['Am']])
]);

mountChordRevision(document.querySelector('#chord-colors'), {
  title: '根音相同的三和弦与扩展和弦',
  tempo,
  showDynamics: false,
  versions: [
    revision('三和弦骨架', primary),
    revision('加九、挂四与七音', [['Cadd9', 'Fmaj7'], ['Fmaj7'], ['G7sus4', 'G7'], ['Cmaj9']])
  ]
});

mountPianoStudy('secondary-dominant', [
  version('F 直接接 G', '第 2 小节持住 F，下一小节起拍换到 G。旋律和低音分别完成自己的移动。', primary),
  version('第 2 小节后半加 D7', 'D7 与右手 A5 同响，再到 G。左手 F♯3 向 G3 上行，C4 向 B3 下行。', [
    ['C', 'F'], ['F', 'D7'], ['G'], ['C']
  ])
]);

const rootBass = [['C', 'F'], ['F', 'Dm'], ['G'], ['C']];
const invertedBass = [['C', 'F/C'], ['F/A', 'Dm/A'], ['G/B'], ['C']];
const bassStaffPositions = { D3: 34, G3: 26.5, C3: 36.5, A2: 41.5, B2: 39 };

function showBassLine(figure, chordBars, motion) {
  const lastChanges = chordBars.flat().slice(-3);
  const notes = lastChanges.map((chord, index) => {
    const pitch = leftHands[chord].split(' ')[0];
    return { chord, pitch, x: 42 + 57 * index, y: bassStaffPositions[pitch] };
  });
  const description = notes.map(({ chord, pitch }) => `${chord} 的最低音 ${pitch}`).join('，');
  const connector = notes.slice(1).map(({ x, y }, index) => {
    const before = notes[index];
    return `M${before.x + 7} ${before.y} L${x - 7} ${y} M${x - 11} ${y - 2.5} L${x - 7} ${y} L${x - 11} ${y + 2.5}`;
  }).join(' ');
  figure.insertAdjacentHTML('beforeend', `
    <svg class="inline-staff voice-leading-staff" viewBox="0 0 196 67" style="--voice-leading-width:196px" role="img" aria-label="${description}。${motion}">
      <path class="inline-staff-lines" d="M5 24H191 M5 29H191 M5 34H191 M5 39H191 M5 44H191"/>
      <text x="8" y="29">&#xE062;</text>
      <path class="voice-leading-connector is-bass" d="${connector}"/>
      ${notes.map(({ chord, pitch, x, y }) => `
        <text class="voice-leading-chord-name" x="${x}" y="14">${chord}</text>
        <text x="${x - 4}" y="${y}">&#xE0A2;</text>
        <text class="voice-leading-note-name is-bass" x="${x}" y="62">${pitch}</text>`).join('')}
    </svg>
    <p class="voice-leading-distance">${motion}</p>
  `);
}

showBassLine(document.querySelector('[data-bass-line="root"]'), rootBass, '上行纯四度，下行纯五度');
showBassLine(document.querySelector('[data-bass-line="inverted"]'), invertedBass, '上行全音，再上行半音');
renderHarmonyPattern(document.querySelector('#inversion-harmony-pattern'), harmonyPattern(
  invertedBass, { C: 'I', 'F/C': 'IV⁶₄', 'F/A': 'IV⁶', 'Dm/A': 'ii⁶₄', 'G/B': 'V⁶' }
), 4, { showBass: true });
mountPianoStudy('bass-inversions', [
  version('原位低音', '最后三个低音 D3–G3–C3 先跳高再跳低。', rootBass),
  version('转位低音', '首小节用 F/C 留住 C3。第 2 小节的 F/A 与 Dm/A 共用 A2，接下来的 G/B 让低音以 B2 连到 C3。', invertedBass)
]);

mountChordRevision(document.querySelector('#open-harmony'), {
  title: '同一旋律的功能、首尾与色彩',
  tempo,
  showDynamics: false,
  versions: [
    revision('主和弦首尾', cadence),
    revision('IV 起、vi 收', [['Fmaj7', 'F'], ['F'], ['G', 'G7'], ['Am7']]),
    revision('同主音改色', [['C', 'F'], ['F'], ['G', 'G7'], ['Cm']]),
    revision('色彩主导', [['Am7', 'B♭maj7'], ['Fmaj7', 'B♭maj7'], ['Gm7', 'Em7'], ['Fm6']])
  ]
});
