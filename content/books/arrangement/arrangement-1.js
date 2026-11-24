import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';

const stepsPerBar = 16;
const ticksPerStep = 240;
const durations = [16, 8, 4, 2, 1];
const meter = String.raw`\ts (4 4)`;
const makeHit = (step, accent = false) => ({ step, accent });
const makeNote = (step, length, accent = false) => ({ step, length, accent });
const strikes = steps => steps.map(step => makeHit(step));
const drum = (label, midi, events) => ({ label, midi, events });
const pitched = (label, program, pitch, events) => ({ label, program, pitch, events });
const four = [0, 4, 8, 12];
const eight = [0, 2, 4, 6, 8, 10, 12, 14];
const sixteen = Array.from({ length: 16 }, (_, step) => step);
const repeated = events => [...events, ...events.map(event => ({ ...event, step: event.step + stepsPerBar }))];

function rhythmPhrase(events, bars) {
  const beats = [];
  let cursor = 0;

  function appendSpan(length, sounds = [], dynamic, brush) {
    let held = false;
    while (length > 0) {
      const toBarLine = stepsPerBar - cursor % stepsPerBar;
      const count = durations.find(size => size <= Math.min(length, toBarLine));
      const tones = sounds.map(pitch => pitch + (held ? '{t}' : ''));
      const note = tones.length > 1 ? '(' + tones.join(' ') + ')' : tones[0] ?? 'r';
      const effects = [dynamic && 'dy ' + dynamic, brush].filter(Boolean).join(' ');
      if (cursor && cursor % stepsPerBar === 0) beats.push('|');
      beats.push(note + '.' + (stepsPerBar / count) + (tones.length && !held && effects ? ' { ' + effects + ' }' : ''));
      cursor += count;
      length -= count;
      held = true;
    }
  }

  for (const { step, length = 1, pitch, accent, dynamic, brush } of events) {
    if (step < cursor || step + length > bars * stepsPerBar) {
      throw new RangeError('Rhythm events must fit their lane without overlapping.');
    }
    appendSpan(step - cursor);
    appendSpan(length, Array.isArray(pitch) ? pitch : [pitch], dynamic ?? (accent ? 'f' : 'mf'), brush);
  }
  appendSpan(bars * stepsPerBar - cursor);
  return beats.join(' ');
}

function trackFromRow({ label, midi, program, pitch, events }, bars) {
  const isDrum = midi !== undefined;
  const setup = isDrum ? String.raw`\clef neutral \articulation (Strike ${midi})` : String.raw`\ks C`;
  const sounds = events.map(event => ({ ...event, pitch: isDrum ? 'Strike' : (event.pitch ?? pitch) }));
  return {
    name: label,
    program: isDrum ? 'percussion' : program,
    staffLines: isDrum ? 1 : undefined,
    phrase: [setup, meter, rhythmPhrase(sounds, bars)].join(' ')
  };
}

function mountVariants(id, variants, { bars = 1, tempo = 106, soundFontUrl = bandSoundFont } = {}) {
  const demo = document.getElementById(id);
  const selector = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  const figure = demo.querySelector('figure');
  const gridElement = demo.querySelector('[data-arrangement-grid]');
  const active = () => variants[selector.value];
  const notes = () => active().notes ?? {
    scoreTracks: (active().sounds ?? active().rows).map(row => trackFromRow(row, bars))
  };
  const describe = () => { cue.textContent = active().summary; };
  describe();
  const grid = gridElement && mountArrangementGrid(gridElement, {
    beats: bars * 4,
    subdivisions: 4,
    rows: active().rows,
    label: demo.querySelector('h3').textContent
  });
  const player = mountScore(figure, {
    notes: notes(),
    tempo,
    notation: 'staff',
    notationVisible: !grid,
    ...(soundFontUrl && { soundFontUrl }),
    onPlaybackPosition: grid ? tick => {
      const step = Math.floor(tick / ticksPerStep);
      grid.markStep(tick === null || step >= bars * stepsPerBar ? null : step);
    } : undefined
  });
  selector.addEventListener('change', () => {
    grid?.update(active().rows);
    describe();
    player.setNotes(notes());
  });
}

const click = drum('四分拍点', 37, repeated(strikes(four).map(event => ({ ...event, dynamic: 'p' }))));
function groove(events, summary) {
  return { rows: [click, pitched('节奏音', 0, 'E5', events)], summary };
}
const pulse = (steps, length) => repeated(steps.map(step => makeNote(step, length, step === 4 || step === 12)));
mountVariants('arrangement-groove-pattern', {
  quarter: groove(pulse(four, 2), '四分拍点与节奏音同时起音。声音简单，四个拍头容易辨认。'),
  eighth: groove(pulse(eight, 1), '节奏音在每拍中间多一次起音，第 2、4 拍的拍头仍然突出。'),
  sixteenth: groove(pulse(sixteen, 1), '每拍四次起音，速度与四分拍点保持原样，声音密度明显增大。'),
  sync: groove(repeated([
    makeNote(0, 3), makeNote(4, 2, true), makeNote(6, 4), makeNote(10, 2), makeNote(12, 3, true)
  ]), '第 2 拍后半起音，声音跨过第 3 拍拍头。拍点照常出现，节奏音在该拍头不重新起音。'),
  across: groove([
    makeNote(0, 3), makeNote(4, 2, true), makeNote(6, 4), makeNote(10, 2), makeNote(12, 2, true),
    makeNote(14, 4, true), makeNote(20, 2, true), makeNote(22, 4), makeNote(26, 2), makeNote(28, 3, true)
  ], '第 1 小节末提前半拍出现重音，延续到第 2 小节。两小节之间的拍点仍然均匀。')
}, { bars: 2, tempo: 96 });

const hatPulses = repeated(eight.map(step => ({
  step,
  dynamic: step % 4 === 0 ? 'mf' : 'mp'
})));
const regularSnare = repeated([makeHit(4, true), makeHit(12, true)]);
const verseKick = [makeHit(0, true), makeHit(10), makeHit(14), makeHit(18, true), makeHit(24), makeHit(26)];
const chorusKick = repeated([makeHit(0, true), makeHit(6), makeHit(10)]);
mountVariants('arrangement-drum-pattern', {
  verse: {
    rows: [drum('闭镲', 42, hatPulses), drum('小鼓', 38, regularSnare), drum('底鼓', 36, verseKick)],
    summary: '第一小节第 3 拍拍头没有底鼓，低处重音移到拍后半。闭镲较短，持续八分音符仍有轻重。'
  },
  contrast: {
    rows: [drum('叮叮镲', 51, hatPulses), drum('小鼓', 38, repeated([
      makeHit(4, true), { step: 6, dynamic: 'p' }, makeHit(12, true)
    ])), drum('底鼓', 36, repeated([makeHit(0, true), makeHit(8), makeHit(10)]))],
    summary: '第 2 拍的小鼓之后多一次轻击，叮叮镲取代闭镲，和上一段形成对比。'
  },
  chorus: {
    rows: [drum('开放踩镲', 46, hatPulses), drum('小鼓', 38, regularSnare), drum('底鼓', 36, chorusKick)],
    summary: '底鼓在第 2 拍后半多击一次，开镲的较长余响把高音区铺开。小鼓仍守第 2、4 拍。'
  },
  join: {
    rows: [
      drum('强音钹', 49, [makeHit(14, true)]),
      drum('开放踩镲', 46, hatPulses.filter(({ step }) => step !== 14 && step !== 16)),
      drum('小鼓', 38, regularSnare),
      drum('底鼓', 36, [...chorusKick.filter(({ step }) => step !== 16), makeHit(14, true)].sort((a, b) => a.step - b.step))
    ],
    summary: '底鼓和强音钹在第 4 拍后半合击，钹声越过小节线。下一小节第 1 拍没有重复的底鼓。'
  }
}, { bars: 2 });

function bassAgainstKick(kicks, notes, summary) {
  return {
    rows: [
      drum('闭镲', 42, eight.map(step => ({ step, dynamic: 'p' }))),
      drum('小鼓', 38, strikes([4, 12])),
      drum('底鼓', 36, [makeHit(kicks[0], true), ...strikes(kicks.slice(1))]),
      pitched('贝斯 C2', 33, 'C2', notes)
    ],
    summary
  };
}
const evenBass = four.map(step => makeNote(step, 4, step === 0));
mountVariants('arrangement-bass-pattern', {
  support: bassAgainstKick([0, 8, 12], evenBass, '低音持续整小节。第 2 拍没有底鼓，贝斯仍可起音。'),
  gaps: bassAgainstKick([0, 8, 12], [makeNote(2, 5), makeNote(10, 2), makeNote(14, 2)],
    '底鼓第 1、3、4 拍开始时，贝斯都在休止。鼓点仍清楚，底部的持续性变弱。'),
  'kick-sync': bassAgainstKick([0, 6, 12], evenBass, '底鼓在第 2 拍后半提前进入，贝斯继续用各拍拍头支撑。'),
  'bass-sync': bassAgainstKick([0, 8, 12], [makeNote(0, 4, true), makeNote(4, 2), makeNote(6, 4, true), makeNote(12, 4)],
    '贝斯在第 2 拍后半发音，延续过第 3 拍拍头，同时底鼓仍在第 3 拍准时落下。')
});

const harmony = pitched('和弦', 0, null, [
  { step: 0, length: 16, pitch: ['C4', 'E4', 'G4'], dynamic: 'p' },
  { step: 16, length: 16, pitch: ['G3', 'B3', 'D4'], dynamic: 'p' }
]);
const pitchLabels = ['C3', 'B2', 'G2', 'F#2'];
function bassPitchVersion(lowC, lowB, summary) {
  const bassEvents = [
    { step: 0, length: lowC ? 9 : 16, pitch: 'C3', accent: true },
    ...(lowC ? [{ step: 10, length: 2, pitch: lowC }, { step: 12, length: 4, pitch: 'C3', accent: true }] : []),
    { step: 16, length: lowB ? 9 : 16, pitch: 'B2', accent: true },
    ...(lowB ? [{ step: 26, length: 2, pitch: lowB }, { step: 28, length: 4, pitch: 'B2', accent: true }] : [])
  ];
  return {
    rows: pitchLabels.map(pitch => ({ label: pitch.replace('#', '♯'), events: bassEvents.filter(event => event.pitch === pitch) })),
    sounds: [harmony, pitched('贝斯', 33, null, bassEvents)],
    summary
  };
}
mountVariants('arrangement-bass-pitches', {
  roots: bassPitchVersion(null, null, '上方从 C 大三和弦换到 G 大三和弦，贝斯从 C3 下行到 B2，形成 G/B。'),
  fifths: bassPitchVersion('G2', 'F#2', '两个低音都下探纯四度再回原位。G2 是 C 的五度音，F♯2 则会给 G/B 增添大七度色彩。'),
  chord: bassPitchVersion('G2', 'G2', '第二小节用 G2 代替 F♯2，经过的是 G 和弦已有的根音，主要低音仍是 B2。')
}, { bars: 2, tempo: 90 });

const guitarChord = ['3.5', '2.4', '0.3', '1.2', '0.1'];
const guitarTuning = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];
function strumVersion(down, up, summary) {
  const downEvents = down.map(step => ({ step, length: 2, pitch: guitarChord, accent: true, brush: 'bd 42' }));
  const upEvents = up.map(step => ({ step, length: 2, pitch: guitarChord.slice(-3), dynamic: 'mp', brush: 'bu 27' }));
  const events = [...downEvents, ...upEvents].sort((a, b) => a.step - b.step);
  const phrase = String.raw`\ks C ${meter} ${rhythmPhrase(events, 1)}`;
  return {
    rows: [{ label: '下扫', events: down.map(step => makeHit(step, true)) }, { label: '上扫', events: strikes(up) }],
    notes: { scoreTracks: [{ name: '木吉他', program: 25, tuning: guitarTuning, phrase }] },
    summary
  };
}
mountVariants('arrangement-guitar-pattern', {
  basic: strumVersion([0, 4, 12], [6, 10], '拍头的下扫覆盖五根弦，两次拍后半的上扫只扫高处三根弦，留下长短交替的轮廓。'),
  continuous: strumVersion(four, [2, 6, 10, 14], '下扫和上扫依次用满八个位置。和弦与速度一样，伴奏的起音更密。')
});

const pianoLeft = [
  { step: 0, length: 4, pitch: 'C2', accent: true },
  { step: 4, length: 2, pitch: 'C3', accent: true },
  { step: 6, length: 4, pitch: 'C2' },
  { step: 10, length: 2, pitch: 'C2' },
  { step: 12, length: 4, pitch: 'C3', accent: true }
];
const pianoOctaves = [
  { step: 0, length: 3, pitch: ['C2', 'C3'], accent: true },
  { step: 3, length: 1, pitch: 'G2', dynamic: 'p' },
  ...pianoLeft.slice(1)
];
const pianoRight = [
  { step: 0, length: 4, pitch: 'C5', accent: true },
  { step: 4, length: 4, pitch: ['E4', 'G4', 'C5'] },
  { step: 12, length: 4, pitch: ['E4', 'G4', 'C5'], accent: true }
];
const pianoRightEarly = [...pianoRight.slice(0, 2), { ...pianoRight[2], step: 10, length: 6 }];
const pianoLeftSpace = pianoOctaves.filter(event => event.step !== 10);
function pianoVersion(left, right, summary) {
  return {
    notes: String.raw`\ks C ${meter} ${rhythmPhrase(right, 1)} ||
      \staff { score } \tuning (none) \clef F4 \ks C ${meter} ${rhythmPhrase(left, 1)}`,
    summary
  };
}
mountVariants('arrangement-piano-pattern', {
  left: pianoVersion(pianoLeft, [], '左手用低 C 对应底鼓，用高 C 对应小鼓。第 2 拍后半的低 C 延续到第 3 拍。'),
  octave: pianoVersion(pianoOctaves, [], '第 1 拍用八度增加重量，接近第 2 拍时轻触五度音 G。轻音填过渡，主要拍点未动。'),
  right: pianoVersion(pianoOctaves, pianoRight, '右手用较高的 C 与简短的和弦点出重音，左手保留原有律动。'),
  anticipate: pianoVersion(pianoLeftSpace, pianoRightEarly, '右手把第 4 拍和弦提前到第 3 拍后半，同位置的左手起音省去，右手的切分更轻。'),
  together: pianoVersion(pianoOctaves, pianoRightEarly, '右手和弦与左手低音同时在第 3 拍后半发声，为提前进入增加重量。'),
  quarter: pianoVersion(four.map((step, index) => ({
    step, length: 4, pitch: index % 2 === 0 ? 'C2' : 'C3'
  })), pianoRight, '左手收回到四分音符拍头，右手抓住和弦支点。这样可以和更活跃的切分段落形成对比。')
}, { soundFontUrl: null });

mountRangeKeyboards(
  document.getElementById('arrangement-piano-keyboards'),
  document.getElementById('arrangement-piano-ranges'),
  { rangeLabel: '示例', firstOctave: 1, octaves: 5, caption: '键盘上的声部音区' }
);
