import tuttiSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { fourPartHarmony } from '../../shared/formats/four-part.js';
import { pianoMarkup } from '../../shared/formats/piano.js';
import { mountScore } from '../../shared/formats/score.js';

const instruments = {
  flute: { name: '长笛', program: 73, clef: 'G2' },
  oboe: { name: '双簧管', program: 68, clef: 'G2' },
  clarinet: { name: '单簧管', program: 71, clef: 'G2' },
  bassoon: { name: '大管', program: 70, clef: 'F4' },
  trumpet: { name: '小号', program: 56, clef: 'G2' },
  horn: { name: '圆号', program: 60, clef: 'G2' },
  trombone: { name: '长号', program: 57, clef: 'F4' },
  tuba: { name: '大号', program: 58, clef: 'F4' },
  violin: { name: '小提琴', program: 40, clef: 'G2' },
  viola: { name: '中提琴', program: 41, clef: 'C3' },
  cello: { name: '大提琴', program: 42, clef: 'F4' },
  bass: { name: '低音提琴', program: 43, clef: 'F4' }
};

function part(instrument, phrase, label = '') {
  const { name, program, clef } = instruments[instrument];
  return {
    name: name + label,
    program,
    phrase: String.raw`\clef ${clef} \ks C \ts (4 4) ${phrase}`
  };
}

function twoStaves(upper, lower, lowerClef) {
  return String.raw`\clef G2 \ks C \ts (4 4) ${upper} ||
    \staff { score } \tuning (none) \clef ${lowerClef} ${lower}`;
}

function mountVariants(id, variants, tempo, defaultGuide, type) {
  const demo = document.getElementById(id);
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  const figure = demo.querySelector('figure');

  function selectedScore() {
    const { description, tracks, guide = defaultGuide } = variants[select.value];
    cue.textContent = description;
    const scoreTracks = [
      { name: '', program: 0, phrase: guide, notationOnly: true },
      ...tracks.map(track => ({ ...track, playbackOnly: true }))
    ];
    return { scoreTracks, type };
  }

  const score = mountScore(figure, {
    notes: selectedScore(), tempo, notation: 'staff', soundFontUrl: tuttiSoundFont
  });
  select.addEventListener('change', () => score.setNotes(selectedScore()));
}

const unisonMotif = 'G4.4 { dy mf } A4.4 C5.4 A4.4';
const soloTrumpet = part('trumpet', unisonMotif);
const unisonClarinet = part('clarinet', unisonMotif);
const unisonViolin = part('violin', unisonMotif);
mountVariants('tutti-unison', {
  solo: {
    tracks: [soloTrumpet],
    description: '只有一支小号，作为三种同度混色的参照。'
  },
  wood: {
    tracks: [unisonClarinet, soloTrumpet],
    description: '单簧管在同一实际音高加入，给小号线添一层管音，音域保持不变。'
  },
  strings: {
    tracks: [soloTrumpet, unisonViolin],
    description: '小提琴与小号同度。起音仍清楚，持续部分多了一层弓弦质地。'
  },
  all: {
    tracks: [unisonClarinet, soloTrumpet, unisonViolin],
    description: '三组集中在原旋律的音域，每个起音都叠合三种音色。'
  }
}, 76, soloTrumpet.phrase);

document.getElementById('tutti-octave-keys').innerHTML = pianoMarkup(7, 19);
const highMotif = 'G5.4 { dy mf } A5.4 G5.4 E5.4';
const lowMotif = 'G4.4 { dy mf } A4.4 G4.4 E4.4';
const highFlute = part('flute', highMotif);
const lowTrumpet = part('trumpet', lowMotif, 'Ⅱ');
const pairedOctaves = [highFlute, part('clarinet', lowMotif), part('trumpet', highMotif, 'Ⅰ'), lowTrumpet];
mountVariants('tutti-octaves', {
  stacked: {
    tracks: [highFlute, part('trumpet', lowMotif)],
    description: '高层独用长笛，低层独用小号。两个音层的间距是一八度。'
  },
  paired: {
    tracks: pairedOctaves,
    description: '高层加一支小号，低层加一支单簧管。上下各层均由木管与铜管同度组成。'
  },
  'three-groups': {
    tracks: [...pairedOctaves, part('violin', highMotif, 'Ⅰ'), part('violin', lowMotif, 'Ⅱ')],
    description: '两部小提琴各叠一个音层。三个乐器组上下都参与，两层之间仍保持八度。'
  }
}, 76, twoStaves(highMotif, lowMotif, 'G2'));

function scoreNotes(...lines) {
  return lines[0].map((_, index) => {
    const pitches = [...new Set(lines.map(line => line[index]))];
    const note = pitches.length === 1 ? pitches[0] : '(' + pitches.join(' ') + ')';
    return note + '.4';
  }).join(' ');
}

function octave(line, offset) {
  return line.map(note => note.slice(0, -1) + (Number(note.at(-1)) + offset));
}

const soprano = ['G4', 'A4', 'B4', 'C5'];
const alto = ['E4', 'F4', 'G4', 'G4'];
const tenor = ['C4', 'C4', 'D4', 'E4'];
const bass = ['C3', 'F3', 'G3', 'C3'];
const highSoprano = octave(soprano, 1);
const highAlto = octave(alto, 1);
const highTenor = octave(tenor, 1);
const lowBass = octave(bass, -1);

const brassHarmony = [
  part('trumpet', scoreNotes(soprano)), part('horn', scoreNotes(alto)),
  part('trombone', scoreNotes(tenor)), part('tuba', scoreNotes(bass))
];

const sameRegisterWinds = [
  part('flute', scoreNotes(soprano)), part('oboe', scoreNotes(alto)),
  part('clarinet', scoreNotes(tenor)), part('bassoon', scoreNotes(bass))
];
const sameRegisterStrings = [
  part('violin', scoreNotes(soprano), 'Ⅰ'), part('violin', scoreNotes(alto), 'Ⅱ'),
  part('viola', scoreNotes(tenor)), part('cello', scoreNotes(bass))
];

const layeredWinds = [
  part('flute', scoreNotes(highSoprano)), part('oboe', scoreNotes(highAlto)),
  part('clarinet', scoreNotes(highTenor)), part('bassoon', scoreNotes(lowBass))
];
const outerStrings = [
  part('violin', scoreNotes(highSoprano), 'Ⅰ'), part('violin', scoreNotes(soprano), 'Ⅱ'),
  part('cello', scoreNotes(bass)), part('bass', scoreNotes(lowBass))
];
const coveringStrings = [
  part('violin', scoreNotes(highSoprano, highAlto), 'Ⅰ（分奏）'),
  part('violin', scoreNotes(highTenor, soprano), 'Ⅱ（分奏）'),
  part('viola', scoreNotes(alto, tenor), '（分奏）'),
  part('cello', scoreNotes(bass)),
  part('bass', scoreNotes(lowBass))
];

const originalUpper = [alto, soprano];
const originalLower = [bass, tenor];
const layeredUpper = [...originalUpper, highTenor, highAlto, highSoprano];
const layeredLower = [lowBass, ...originalLower];
const originalGuide = twoStaves(scoreNotes(...originalUpper), scoreNotes(...originalLower), 'F4');
const layeredGuide = twoStaves(scoreNotes(...layeredUpper), scoreNotes(...layeredLower), 'F4');

mountVariants('tutti-harmony-balance', {
  brass: {
    tracks: brassHarmony,
    description: '小号、圆号、长号和大号各奏一条，形成铜管四部骨架。'
  },
  unison: {
    tracks: [...sameRegisterWinds, ...brassHarmony, ...sameRegisterStrings],
    description: '木管与弦乐各自同度复制完整四部。缩编音高和节奏不变，同一音上加入了不同音色。'
  },
  covered: {
    guide: layeredGuide,
    tracks: [...layeredWinds, ...brassHarmony, ...coveringStrings],
    description: '高木管抬高一八度，大管延伸低端。铜管保留四部，弦乐分奏覆盖高、中、低各层。'
  },
  skeleton: {
    guide: layeredGuide,
    tracks: [...layeredWinds, ...brassHarmony, ...sameRegisterStrings],
    description: '弦乐同度重叠铜管的基本四部，高、低八度副本由木管单独承担。'
  },
  outline: {
    guide: layeredGuide,
    tracks: [...layeredWinds, ...brassHarmony, ...outerStrings],
    description: '木管与铜管保持分层。弦乐只复制高、低外声及其八度，减少对中间线条的重叠。'
  }
}, 60, originalGuide, fourPartHarmony);
