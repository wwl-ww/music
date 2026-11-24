import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { mountScore } from '../../shared/formats/score.js';
import { genreTrack, mountGenreArrangement } from './genre-arrangement-demo.js';
import { arrangementBar, drumBar, eighthSteps, hits, noteAt, quarterSteps } from './genre-arrangement-10-13-rhythm.js';

const tempo = 120;
const kick = hits(quarterSteps, 'Kick', 'f');
const kickLayer = hits([0, 8], 'SubKick', 'mf');
const snare = hits([4, 12], 'Snare', 'f');
const hat = [...hits(eighthSteps, 'Hat', 'mp'), ...hits([5, 13], 'Hat', 'p')];
const shaker = hits([2, 6, 10, 14], 'Shaker', 'mp');
const bassEvents = [
  noteAt(0, 'A2', 3, 'mf'), noteAt(3, 'A2', 3, 'mf'),
  noteAt(6, 'A2', 2, 'mp'), noteAt(10, 'A2', 2, 'mf'), noteAt(13, 'A2', 3, 'mf')
];
const bass = arrangementBar(bassEvents);
const allDrums = [kick, kickLayer, snare, hat, shaker];
const drums = drumBar(allDrums);
const lead = [
  'r.4 C4.8 E4.8 r.4 G4.8 E4.8',
  'r.4 C4.8 A4.8 C4.8 r.8 E4.16 G4.16 r.8'
];

mountGenreArrangement('genre-electro-house-arrangement', {
  tempo,
  harmony: ['Am', 'Am', 'Am', 'Am'],
  summary: '合成贝斯重复 A，节奏与四个底鼓拍头交错。低音音区上方是重复的两小节单音领奏。',
  tracks: [
    { name: '合成领奏', program: 81, bars: [...lead, ...lead] },
    { name: '合成贝斯', program: 38, playbackOnly: true, header: '\\clef F4', bars: [bass, bass, bass, bass] },
    { name: '合成鼓组', program: 'percussion', playbackOnly: true, bars: [drums, drums, drums, drums] }
  ]
});

const groove = document.getElementById('genre-electro-groove');
const selection = groove.querySelector('select');
const cue = groove.querySelector('.music-demo-cue');
const figure = groove.querySelector('figure');
const baseRows = [{ label: '底鼓四拍', events: kick }, { label: '贝斯 · A', events: bassEvents }];
const fullRows = [
  ...baseRows.slice(0, 1),
  { label: '加厚底鼓', events: kickLayer },
  { label: '小鼓', events: snare },
  { label: '闭镲', events: hat },
  { label: '沙铃', events: shaker },
  baseRows[1]
];
const variants = {
  foundation: {
    rows: baseRows,
    drumBar: drumBar([kick]),
    description: cue.textContent
  },
  drums: {
    rows: fullRows,
    drumBar: drums,
    description: '低音和四个底鼓拍点保持不变。第 1、3 拍多一层底鼓，第 2、4 拍有小鼓，闭镲与沙铃给出拍内分层。'
  },
  swing: {
    rows: fullRows,
    drumBar: drums,
    header: '\\tf t16',
    description: '拍头和格上的起音位置相同。两次紧邻的十六分起音改成长短组合，镲的轻击相对靠后。'
  }
};
const grid = mountArrangementGrid(groove.querySelector('[data-arrangement-grid]'), {
  rows: baseRows,
  label: '电音浩室底鼓和贝斯的十六分拍格'
});

function grooveScore() {
  const { drumBar: percussion, header } = variants[selection.value];
  return { scoreTracks: [
    genreTrack({ name: '合成鼓组', program: 'percussion', header, bars: [percussion, percussion] }),
    genreTrack({ name: '合成贝斯', program: 38, header: '\\clef F4', bars: [bass, bass] })
  ] };
}
const player = mountScore(figure, {
  tempo, soundFontUrl, notation: 'staff', notationVisible: false, notes: grooveScore(),
  onPlaybackPosition(tick) { grid.markStep(tick === null ? null : Math.floor(tick / 240) % 16); }
});
selection.addEventListener('change', () => {
  const variant = variants[selection.value];
  cue.textContent = variant.description;
  grid.update(variant.rows);
  player.setNotes(grooveScore());
});
