import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { guitarBrush, guitarNotes, guitarTuning } from '../../shared/formats/guitar-strum.js';
import { genreTrack, mountGenreArrangement, mountGenreVersions } from './genre-arrangement-demo.js';

const tempo = 190;
const bassClef = '\\clef F4';
const pulse = ['Kick OpenHat', '', 'Snare OpenHat', 'Kick', 'Kick OpenHat', '', 'Snare OpenHat', ''];
const finalPulse = ['Kick OpenHat', '', 'Snare OpenHat', 'Kick', 'Kick OpenHat', '', 'Snare Snare', 'Snare Snare'];
const roots = ['C2', 'F1', 'G1', 'C2'];
const cPower = [null, 3, 5, 5, null, null];
const powerShapes = [cPower, [1, 3, 3, null, null, null], [3, 5, 5, null, null, null], cPower];
const cTriad = [null, 3, 2, 0, 1, null];
const rhythmTriads = [cTriad, [null, null, 3, 2, 1, null], [null, null, 5, 4, 3, null], cTriad];
const openVoicings = [[8, 10, null, 9, null, 8], [13, 15, null, 14, null, 13]];
const openPowerVoicings = openVoicings.map(positions => positions.with(3, null));
const attacks = pulse.map(notes => /Kick|Snare/.test(notes));

function drums(slots) {
  return slots.map(notes => {
    if (!notes) return 'r.8';
    if (notes === 'Snare Snare') return 'Snare.16 { dy f } Snare.16 { dy f }';
    return '(' + notes.replace('OpenHat', 'OpenHat{g}') + ').8 { dy ff }';
  }).join(' ');
}

function bassLine(root) {
  return Array.from({ length: 8 }, (_, index) => root + '.8 { dy ' + (index % 2 ? 'mp' : 'f') + ' }').join(' ');
}

function guitarBar(shape, balance, right, final) {
  const chord = '(' + guitarNotes(shape).join(' ') + ')';
  return attacks.map((attack, index) => {
    if (!attack) return 'r.8';
    const brush = guitarBrush(right && index === 3 ? 'up' : 'down', tempo, right ? 14 : 9);
    const effect = ` { ${brush} dy ${index === 3 ? 'mf' : 'f'} balance ${balance} }`;
    if (final && index === 6) return chord + '.16' + effect + ' r.16';
    return chord + '.8' + effect;
  }).join(' ');
}

function rhythmSection(shapes, { final = false, rightShapes, program = 30 } = {}) {
  return [
    { name: rightShapes ? '左侧电吉他' : '电吉他', program, tuning: guitarTuning, bars: shapes.map((shape, index) =>
      guitarBar(shape, rightShapes ? 4 : 8, false, final && index === 3)) },
    ...(rightShapes ? [{
      name: '右侧电吉他', program: 29, tuning: guitarTuning, playbackOnly: true,
      bars: rightShapes.map((shape, index) => guitarBar(shape, 12, true, final && index === 3))
    }] : []),
    { name: '拨片贝斯', program: 34, header: bassClef, bars: roots.slice(0, shapes.length).map(bassLine) },
    { name: '鼓组', program: 'percussion', bars: shapes.map((_, index) => drums(final && index === 3 ? finalPulse : pulse)) }
  ];
}

mountGenreArrangement('genre-punk-arrangement', {
  tempo,
  harmony: ['C', 'F', 'G', 'C'],
  tracks: rhythmSection(powerShapes, { final: true, rightShapes: rhythmTriads }),
  summary: '左侧失真吉他的低位强力和弦与底鼓、小鼓合击。右侧电吉他用另一套驱动音色补和弦三音。电贝斯在更低的音区连续走八分。',
  reference: {
    summary: '和弦仍是 C–F–G–C，旋律和速度也相同。钢琴每小节只发一次持续和弦。',
    tracks: [{ name: '钢琴', program: 0, bars: [
      '(C3 G3 C4 E4).1 { dy mp }', '(F2 C3 A3 F4).1', '(G2 D3 B3 G4).1', '(C3 G3 C4 E4).1'
    ] }]
  }
});

mountPlayableArrangementGrid(document.getElementById('genre-punk-grid'), {
  tempo,
  subdivisions: 2,
  label: '朋克摇滚首小节的共同起音',
  rows: [
    { label: '开镲', drum: 46, events: pulse.flatMap((notes, step) => notes.includes('OpenHat') ? [{ step }] : []) },
    { label: '底鼓', drum: 36, events: pulse.flatMap((notes, step) => notes.includes('Kick') ? [{ step, accent: true }] : []) },
    { label: '小鼓', drum: 38, events: pulse.flatMap((notes, step) => notes.includes('Snare') ? [{ step, accent: true }] : []) },
    { label: '吉他',
      events: attacks.flatMap((attack, step) => attack ? [{ step, accent: step !== 3 }] : []) }
  ],
  notes: { scoreTracks: [
    genreTrack({ name: '电吉他', program: 30, tuning: guitarTuning, bars: [guitarBar(cPower, 8, false, false)] }),
    genreTrack({ name: '鼓组', program: 'percussion', bars: [drums(pulse)] })
  ] }
});

mountGenreVersions('genre-punk-voicing-demo', {
  tempo,
  versions: {
    power: {
      tracks: rhythmSection(openPowerVoicings),
      summary: '两个吉他和弦只有根音与五音，最高音加倍根音。鼓与拨片贝斯保持同一拍型。'
    },
    triad: {
      tracks: rhythmSection(openVoicings),
      summary: 'C 加入 E，F 加入 A。吉他给出大三和弦性质，最高音与原来相同。'
    },
    drive: {
      tracks: rhythmSection(openPowerVoicings, { program: 29 }),
      summary: '同一组强力和弦、拍点与鼓贝斯，切到另一套驱动音色。'
    },
    clean: {
      tracks: rhythmSection(openPowerVoicings, { program: 27 }),
      summary: '强力和弦以清音拨奏，保留同一把位和扫弦时差，拨片起音更直接。'
    }
  }
});
