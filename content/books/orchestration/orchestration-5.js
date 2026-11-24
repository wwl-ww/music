import ensembleSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { fourPartHarmony } from '../../shared/formats/four-part.js';
import { pianoMarkup } from '../../shared/formats/piano.js';
import { mountScore } from '../../shared/formats/score.js';

const instruments = {
  flute: { name: '长笛', program: 73, clef: 'G2' },
  oboe: { name: '双簧管', program: 68, clef: 'G2' },
  clarinet: { name: '单簧管', program: 71, clef: 'G2' },
  bassoon: { name: '大管', program: 70, clef: 'F4' },
  horn: { name: '圆号', program: 60, clef: 'G2' },
  violin: { name: '小提琴', program: 40, clef: 'G2' },
  viola: { name: '中提琴', program: 41, clef: 'C3' },
  cello: { name: '大提琴', program: 42, clef: 'F4' }
};

function part(instrument, line, number = '') {
  const { clef, name, program } = instruments[instrument];
  return {
    name: name + number,
    program,
    phrase: String.raw`\clef ${clef} \ks C \ts (4 4) ${line}`
  };
}

function mountVariants(id, variants, tempo) {
  const demo = document.getElementById(id);
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  const figure = demo.querySelector('figure');
  function selectedScore() {
    const { description, tracks, type } = variants[select.value];
    cue.textContent = description;
    return { scoreTracks: tracks, type };
  }
  const score = mountScore(figure, {
    notes: selectedScore(),
    tempo,
    notation: 'staff',
    soundFontUrl: ensembleSoundFont
  });
  select.addEventListener('change', () => score.setNotes(selectedScore()));
}

const hornPhrase = 'C4.4 { dy mp } E4.4 F4.4 D4.4';
const violinPhrase = 'G4.4 { dy mp } A4.4 C5.4 B4.4';
const hornSolo = part('horn', hornPhrase);
const violinSolo = part('violin', violinPhrase);
mountVariants('mixed-unison', {
  horn: {
    description: '保留圆号的原有音色，供同组的三种重叠比较。',
    tracks: [hornSolo]
  },
  'horn-bassoon': {
    description: '大管在自己的中高区与圆号同度。圆号的持续质地上加进簧片音头。',
    tracks: [part('bassoon', hornPhrase), hornSolo]
  },
  'horn-clarinet': {
    description: '单簧管在同一音高加入，合成音色仍较圆润，簧片质地比双簧管柔和。',
    tracks: [part('clarinet', hornPhrase), hornSolo]
  },
  'horn-oboe': {
    description: '双簧管的音头较集中。原旋律、音区和起音时刻与同组其他版本一致。',
    tracks: [part('oboe', hornPhrase), hornSolo]
  },
  violin: {
    description: '较高的一组以小提琴独奏为原型。两种叠加都保留这条弦乐线。',
    tracks: [violinSolo]
  },
  'violin-flute': {
    description: '长笛与小提琴同度，给弦乐添一层较柔的管音，旋律仍在原音区。',
    tracks: [part('flute', violinPhrase), violinSolo]
  },
  'violin-oboe': {
    description: '双簧管与小提琴同度。原旋律的音高和节奏保持固定，增加了较清晰的簧片音头。',
    tracks: [part('oboe', violinPhrase), violinSolo]
  }
}, 74);

const octaveHigh = 'G5.4 { dy mp } A5.4 B5.4 D6.4';
const octaveLow = 'G4.4 { dy mp } A4.4 B4.4 D5.4';
document.getElementById('mixed-octave-keys').innerHTML = pianoMarkup(7, 19);
const highFlute = part('flute', octaveHigh);
const highViolin = part('violin', octaveHigh, 'Ⅰ');
const lowViolin = part('violin', octaveLow, 'Ⅱ');
mountVariants('mixed-octaves', {
  stacked: {
    description: '高层用长笛，低层用第二小提琴。每层使用一种音色。',
    tracks: [highFlute, lowViolin]
  },
  partial: {
    description: '高层加第一小提琴，与长笛同度。低层仍由第二小提琴保持原样。',
    tracks: [highFlute, highViolin, lowViolin]
  },
  mixed: {
    description: '再用单簧管与第二小提琴同度，上下两层都形成混合音色。两层的音高与节奏保持固定。',
    tracks: [highFlute, part('clarinet', octaveLow), highViolin, lowViolin]
  }
}, 76);

const main = 'F5.4 { dy mp } G5.4 A5.4 F5.4';
const companion = 'D5.4 { dy mp } E5.4 F5.4 D5.4';
const lowMain = 'F4.4 { dy mp } G4.4 A4.4 F4.4';
const lowCompanion = 'D4.4 { dy mp } E4.4 F4.4 D4.4';
const strings = [part('violin', main, 'Ⅰ'), part('violin', companion, 'Ⅱ')];
mountVariants('mixed-melody-thickening', {
  prototype: {
    description: '上方是主线，下方在相同节奏中保持低三度。两部小提琴使这对线的质地相近。',
    tracks: strings
  },
  unison: {
    description: '两支长笛分别复制一条小提琴线。实际音域保持原样，两条线各自增加一种音色。',
    tracks: [part('flute', main, 'Ⅰ'), part('flute', companion, 'Ⅱ'), ...strings]
  },
  layered: {
    description: '两支单簧管把整组移低一个八度。上下两层内部都保留原来配好的三度关系。',
    tracks: [part('clarinet', lowMain, 'Ⅰ'), part('clarinet', lowCompanion, 'Ⅱ'), ...strings]
  }
}, 72);

const sopranoLine = 'G5.4 { dy mp } A5.4 G5.4 G5.4';
const altoLine = 'E5.4 { dy mp } F5.4 D5.4 E5.4';
const innerLine = 'C4.4 { dy mp } C4.4 B3.4 C4.4';
const bassLine = 'C3.4 { dy mp } F2.4 G2.4 C3.4';
const chorale = [
  part('violin', sopranoLine, 'Ⅰ'),
  part('violin', altoLine, 'Ⅱ'),
  part('viola', innerLine),
  part('cello', bassLine)
];
mountVariants('mixed-harmony-layers', {
  original: {
    description: '四条弦乐声部保留各自的进行，第二小提琴与中提琴的实际音域相隔较远。',
    tracks: chorale,
    type: fourPartHarmony
  },
  fill: {
    description: '圆号在两条内声之间加入 G4、A4 一带的填充线，四部原型扩为五个声部。',
    tracks: [part('horn', 'G4.4 { dy mp } A4.4 G4.4 G4.4'), ...chorale]
  },
  support: {
    description: '单簧管同音同节奏地重复中提琴。四条原有的线保持原位，次中音增加了管乐的颜色。',
    tracks: [part('clarinet', innerLine), ...chorale],
    type: fourPartHarmony
  },
  complete: {
    description: '长笛、双簧管、单簧管和大管逐线同度重叠弦乐四部。谱面保留弦乐原型，试听时每条线同时加入一支木管。',
    tracks: [...chorale, ...[
      part('flute', sopranoLine), part('oboe', altoLine), part('clarinet', innerLine), part('bassoon', bassLine)
    ].map(track => ({ ...track, playbackOnly: true }))],
    type: fourPartHarmony
  }
}, 64);
