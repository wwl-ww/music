import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { mountGenreArrangement, mountGenreVersions } from './genre-arrangement-demo.js';

const bassClef = '\\clef F4';
const pulse = ['Kick OpenHat', '', 'Snare OpenHat', 'Kick', 'Kick OpenHat', '', 'Snare OpenHat', ''];
const finalPulse = ['Kick OpenHat', '', 'Snare OpenHat', 'Kick', 'Kick OpenHat', '', 'Snare Snare', 'Snare Snare'];
const roots = ['C2', 'F2', 'G2', 'C2'];
const powerVoicings = ['C3 G3 C5', 'F3 C4 F5', 'G3 D4 G5', 'C3 G3 C5'];
const openVoicings = ['C3 G3 E4 C5', 'F3 C4 A4 F5', 'G3 D4 B4 G5', 'C3 G3 E4 C5'];
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

function guitarBar(voicing, balance, variation, final) {
  return attacks.map((attack, index) => {
    if (!attack) return 'r.8';
    const note = '(' + voicing + ')';
    const effect = ' { dy ' + (index === 3 ? 'mf' : 'f') + ' balance ' + balance + ' }';
    if (final && index === 6) return note + '.16' + effect + ' r.16';
    if (variation && index === 3) return 'r.16 ' + note + '.16' + effect;
    return note + '.8' + effect;
  }).join(' ');
}

function rhythmSection(voicings, { final = false, double = false } = {}) {
  return [
    { name: double ? '失真吉他左' : '失真吉他', program: 30, bars: voicings.map((voicing, index) =>
      guitarBar(voicing, double ? 3 : 8, false, final && index === 3)) },
    ...(double ? [{
      name: '失真吉他右', program: 29, playbackOnly: true, bars: voicings.map((voicing, index) =>
        guitarBar(voicing, 13, true, final && index === 3))
    }] : []),
    { name: '拨片贝斯', program: 34, header: bassClef, bars: roots.slice(0, voicings.length).map(bassLine) },
    { name: '鼓组', program: 'percussion', bars: voicings.map((_, index) => drums(final && index === 3 ? finalPulse : pulse)) }
  ];
}

mountGenreArrangement('genre-punk-arrangement', {
  tempo: 190,
  harmony: ['C', 'F', 'G', 'C'],
  tracks: rhythmSection(openVoicings, { final: true, double: true }),
  summary: '电贝斯持续根音八分，拍头强、拍后轻。吉他和底鼓、小鼓在主要拍点共同起音，最后一小节用小鼓连打收口。',
  reference: {
    summary: '和弦仍是 C–F–G–C，旋律和速度也相同。钢琴每小节只发一次持续和弦。',
    tracks: [{ name: '钢琴', program: 0, bars: [
      '(C3 G3 C4 E4).1 { dy mp }', '(F2 C3 A3 F4).1', '(G2 D3 B3 G4).1', '(C3 G3 C4 E4).1'
    ] }]
  }
});

mountPlayableArrangementGrid(document.getElementById('genre-punk-grid'), {
  tempo: 190,
  subdivisions: 2,
  label: '朋克摇滚首小节的共同起音',
  rows: [
    { label: '开镲', drum: 46, events: pulse.flatMap((notes, step) => notes.includes('OpenHat') ? [{ step }] : []) },
    { label: '底鼓', drum: 36, events: pulse.flatMap((notes, step) => notes.includes('Kick') ? [{ step, accent: true }] : []) },
    { label: '小鼓', drum: 38, events: pulse.flatMap((notes, step) => notes.includes('Snare') ? [{ step, accent: true }] : []) },
    { label: '吉他', program: 30, pitch: openVoicings[0].split(' '),
      events: attacks.flatMap((attack, step) => attack ? [{ step, accent: step !== 3 }] : []) }
  ]
});

mountGenreVersions('genre-punk-voicing-demo', {
  tempo: 190,
  versions: {
    power: {
      tracks: rhythmSection(powerVoicings.slice(0, 2)),
      summary: '两个吉他和弦只有根音与五音，最高音加倍根音。鼓与拨片贝斯保持同一拍型。'
    },
    triad: {
      tracks: rhythmSection(openVoicings.slice(0, 2)),
      summary: 'C 加入 E，F 加入 A。吉他给出大三和弦性质，最高音与原来相同。'
    }
  }
});
