import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { endExclusivePlayback, mountScore, startExclusivePlayback } from '../../shared/formats/score.js';
import { genreTrack, mountGenreArrangement } from './genre-arrangement-demo.js';
import { arrangementBar, drumBar, hits, noteAt, quarterSteps } from './genre-arrangement-10-13-rhythm.js';

const tempo = 128;
const voicings = [
  ['A3', 'C4', 'E4'], ['A3', 'C4', 'F4'], ['G3', 'B3', 'D4'], ['G3', 'C4', 'E4']
];
const synthChords = voicings.map((pitches, bar) => arrangementBar([
  noteAt(0, pitches, 2, 'mp'), noteAt(3, pitches, 1, 'p'), noteAt(6, pitches, 2, 'mp'),
  noteAt(8, pitches, 2, 'mp'), noteAt(11, pitches, 1, 'p'),
  noteAt(14, voicings[bar + 1] ?? pitches, 2, 'mf')
]));
const bassPitches = [
  ['A2', 'A3', 'F2'], ['F2', 'F3', 'G2'], ['G2', 'G3', 'C3'], ['C3', 'C4', 'C3']
];
const synthBass = bassPitches.map(([root, octave, pickup]) => arrangementBar([
  noteAt(0, root, 3, 'mf'), noteAt(6, octave, 2, 'mp'),
  noteAt(8, root, 3, 'mf'), noteAt(14, pickup, 2, 'mp')
]));
const drumParts = [
  hits(quarterSteps, 'Kick', 'f'), hits([2, 6, 10, 14], 'OpenHat', 'mp'),
  hits([6, 14], 'Shaker', 'p'), hits([7, 15], 'Hat', 'p')
];
const earlyDrums = drumBar(drumParts);
const fullDrums = drumBar([...drumParts, hits([4, 12], 'Clap', 'mf')]);

mountGenreArrangement('genre-edm-arrangement', {
  tempo,
  harmony: ['Am', 'F', 'G', 'C'],
  summary: '前三个小节的最后半拍先进入下一和弦。底鼓的拍头保持不动，贝斯在根音与上方八度之间跳进。',
  tracks: [
    { name: '锯齿合成和弦', program: 81, bars: synthChords },
    { name: '合成贝斯', program: 38, playbackOnly: true, header: '\\clef F4', bars: synthBass },
    { name: '电子鼓组', program: 'percussion', playbackOnly: true, bars: [earlyDrums, earlyDrums, fullDrums, fullDrums] }
  ]
});

const snareRoll = (duration, count, dynamic) =>
  ['Snare.' + duration + ' { dy ' + dynamic + ' }', ...Array(count - 1).fill('Snare.' + duration)].join(' ');
const buildRoll = [
  ...Array(4).fill(snareRoll(4, 4, 'mp')),
  ...Array(2).fill(snareRoll(8, 8, 'mf')),
  snareRoll(16, 16, 'f'),
  snareRoll(32, 28, 'f') + ' r.8'
];
mountScore(document.querySelector('#genre-edm-roll figure'), {
  tempo,
  notation: 'staff',
  notationVisible: false,
  soundFontUrl,
  notes: { scoreTracks: [
    genreTrack({
      name: '小鼓与落拍', program: 'percussion',
      bars: [...buildRoll, '(Kick Crash).4 { dy ff } Kick.4 Kick.4 Kick.4']
    }),
    genreTrack({
      name: '合成贝斯', program: 38, header: '\\clef F4',
      bars: [...Array(8).fill('r.1'), 'A2.8 { dy f } r.8 A3.8 r.8 A2.8 r.8 A3.8 r.8']
    })
  ] }
});

const ducking = document.getElementById('genre-edm-ducking');
const select = ducking.querySelector('select');
const button = ducking.querySelector('button');
const cue = ducking.querySelector('.music-demo-cue');
const status = ducking.querySelector('[role="status"]');
const descriptions = {
  'bass-dry': '贝斯持续同一音高，四个拍头不改变音量。',
  'bass-duck': '贝斯发音保持连贯，每次拍头音量下陷，随后恢复。',
  'pad-dry': '衬底和弦持续播放，音量在拍内保持平直。',
  'pad-duck': '衬底和弦在每个拍头变轻，随后恢复。所有音同时受同一条增益曲线影响。'
};
let context;
let current;
const player = {
  stop() {
    const previous = current;
    current = undefined;
    if (previous) {
      previous.output.disconnect();
      previous.oscillators.forEach(oscillator => oscillator.stop());
    }
    endExclusivePlayback(player);
    button.removeAttribute('data-playing');
    button.setAttribute('aria-label', '播放侧链试听');
  }
};

function play() {
  const [timbre, shape] = select.value.split('-');
  const bass = timbre === 'bass';
  const output = context.createGain();
  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = bass ? 620 : 1200;
  filter.connect(output);
  output.connect(context.destination);

  const beat = 60 / tempo;
  const start = context.currentTime + 0.025;
  const end = start + 8 * beat;
  const level = bass ? 0.20 : 0.10;
  output.gain.setValueAtTime(0, start);
  output.gain.linearRampToValueAtTime(level, start + 0.015);
  if (shape === 'duck') {
    for (let count = 0; count < 8; count++) {
      const onset = start + count * beat;
      output.gain.setValueAtTime(count ? level : 0, onset);
      output.gain.linearRampToValueAtTime(level * 0.11, onset + 0.015);
      output.gain.setValueAtTime(level * 0.11, onset + 0.04);
      output.gain.exponentialRampToValueAtTime(level, onset + 0.30);
    }
  }
  output.gain.setValueAtTime(level, end - 0.06);
  output.gain.linearRampToValueAtTime(0, end);

  const frequencies = bass ? [110] : [220, 261.6256, 329.6276];
  const oscillators = frequencies.map(frequency => {
    const oscillator = context.createOscillator();
    oscillator.type = bass ? 'sawtooth' : 'triangle';
    oscillator.frequency.value = frequency;
    oscillator.connect(filter);
    oscillator.start(start);
    oscillator.stop(end);
    return oscillator;
  });
  const instance = { oscillators, output };
  current = instance;
  oscillators[0].addEventListener('ended', () => {
    if (current === instance) player.stop();
  }, { once: true });
  button.setAttribute('data-playing', '');
  button.setAttribute('aria-label', '停止侧链试听');
}

select.addEventListener('change', () => {
  player.stop();
  cue.textContent = descriptions[select.value];
  status.textContent = '';
});
button.addEventListener('click', async () => {
  if (current) {
    player.stop();
    return;
  }
  button.disabled = true;
  status.textContent = '';
  try {
    context ??= new AudioContext();
    await context.resume();
    startExclusivePlayback(player);
    play();
  } catch {
    player.stop();
    status.textContent = '暂时无法播放，请再试一次。';
  } finally {
    button.disabled = false;
  }
});
select.disabled = false;
button.disabled = false;
