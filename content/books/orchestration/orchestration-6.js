import brassSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { fourPartHarmony } from '../../shared/formats/four-part.js';
import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';

mountRangeKeyboards(
  document.getElementById('brass-range-keyboards'),
  document.getElementById('brass-range-table'),
  { firstOctave: 0, lowerLabel: '下限' }
);

const brass = {
  trumpet: { name: '小号', program: 56, clef: 'G2' },
  trombone: { name: '长号', program: 57, clef: 'F4' },
  tuba: { name: '大号', program: 58, clef: 'F4' },
  horn: { name: '圆号', program: 60, clef: 'G2' }
};

function part(instrument, line, number = '') {
  const { name, program, clef } = brass[instrument];
  return {
    name: name + number,
    program,
    phrase: String.raw`\clef ${clef} \ks C \ts (4 4) ${line}`
  };
}

function mountVariants(id, variants, tempo, type) {
  const demo = document.getElementById(id);
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  const figure = demo.querySelector('figure');

  function selectedScore() {
    const { tracks, description } = variants[select.value];
    cue.textContent = description;
    return { scoreTracks: tracks, type };
  }

  const score = mountScore(figure, {
    notes: selectedScore(), tempo, notation: 'staff', soundFontUrl: brassSoundFont
  });
  select.addEventListener('change', () => score.setNotes(selectedScore()));
}

const chorale = [
  'G4.4 { dy mp } A4.4 B4.4 C5.4',
  'E4.4 { dy mp } F4.4 G4.4 G4.4',
  'C4.4 { dy mp } C4.4 D4.4 E4.4',
  'C3.4 { dy mp } F3.4 G3.4 C3.4'
];
const mixedChorale = [
  part('trumpet', chorale[0]),
  part('horn', chorale[1]),
  part('trombone', chorale[2], 'Ⅰ'),
  part('trombone', chorale[3], 'Ⅲ')
];
mountVariants('brass-chorale-voicing', {
  hard: {
    tracks: [
      part('trumpet', chorale[0], 'Ⅰ'),
      part('trumpet', chorale[1], 'Ⅱ'),
      part('trombone', chorale[2], 'Ⅰ'),
      part('trombone', chorale[3], 'Ⅱ')
    ],
    description: '上方两条线用小号，下方两条线用长号。四条线都保持比较集中的铜管音头。'
  },
  soft: {
    tracks: [
      part('horn', chorale[0], 'Ⅰ'),
      part('horn', chorale[1], 'Ⅲ'),
      part('horn', chorale[2], 'Ⅱ'),
      part('tuba', chorale[3])
    ],
    description: '三支圆号在上，大号支撑低音。声部的实际音高与节奏保持固定。'
  },
  mixed: {
    tracks: mixedChorale,
    description: '小号保留高音旋律的轮廓，以圆号接到下面两条长号线。'
  },
  expanded: {
    tracks: [...mixedChorale, part('tuba', 'C2.4 { dy mp } F2.4 G2.4 C2.4')],
    description: '大号把第三长号的低音线向下复制一个八度。四条原声部仍保持原位。'
  }
}, 66, fourPartHarmony);

const melody = 'C4.4 { dy mf } E4.4 G4.4 E4.4';
const trumpetMelody = part('trumpet', melody);
mountVariants('brass-melody-doubling', {
  solo: {
    tracks: [trumpetMelody],
    description: '保留一支小号的音头和音色，作为三种叠加的原型。'
  },
  horn: {
    tracks: [trumpetMelody, part('horn', melody)],
    description: '圆号在同一实际音高加入，旋律的宽度保持原样，音色增加圆润感。'
  },
  trombone: {
    tracks: [trumpetMelody, part('trombone', melody)],
    description: '长号在同一实际音高加入，硬音质集中在一个音高层。'
  },
  octave: {
    tracks: [trumpetMelody, part('trombone', 'C3.4 { dy mf } E3.4 G3.4 E3.4')],
    description: '长号把整条线移低八度，低层支撑小号，首音分别是 C3 和 C4。'
  }
}, 80);

const octaveSpan = [
  part('trumpet', 'G5.1 { dy f }', 'Ⅰ'),
  part('trumpet', 'E5.1 { dy f }', 'Ⅱ'),
  part('trumpet', 'C5.1 { dy f }', 'Ⅲ'),
  part('tuba', 'C3.1 { dy f }')
];
const innerHorn = part('horn', 'G3.1 { dy f }', 'Ⅱ');
mountVariants('brass-chord-balance', {
  bright: {
    tracks: octaveSpan,
    description: '三支小号在高处密集成和弦，大号保留低音，中间的间距较大。'
  },
  filled: {
    tracks: [innerHorn, ...octaveSpan],
    description: '圆号填入 G3，接近原来空着的内层。小号和大号的音都保持原位。'
  },
  softened: {
    tracks: [part('horn', 'C5.1 { dy f }', 'Ⅰ'), innerHorn, ...octaveSpan],
    description: '高处的 C5 由圆号与第三小号同度，向原来的和弦加入较柔的颜色，音高间距保持原样。'
  }
}, 64);
