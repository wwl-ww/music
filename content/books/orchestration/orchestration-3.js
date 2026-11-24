import woodwindSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { fourPartHarmony } from '../../shared/formats/four-part.js';
import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';

mountRangeKeyboards(
  document.getElementById('woodwind-range-keyboards'),
  document.getElementById('woodwind-range-table'),
  { rangeLabel: '参考' }
);

const woodwinds = {
  flute: { label: '长笛', program: 73, clef: 'G2' },
  oboe: { label: '双簧管', program: 68, clef: 'G2' },
  clarinet: { label: '单簧管', program: 71, clef: 'G2' },
  bassoon: { label: '大管', program: 70, clef: 'F4' }
};

function part(instrument, melody, number = '') {
  const { label, program, clef } = woodwinds[instrument];
  return {
    name: label + number,
    program,
    phrase: String.raw`\clef ${clef} \ks C \ts (4 4) ${melody}`
  };
}

function mountVariants(id, variants, tempo, type) {
  const container = document.getElementById(id);
  const choice = container.querySelector('select');
  const cue = container.querySelector('.music-demo-cue');
  const figure = container.querySelector('figure');
  const { description, scoreTracks } = variants[choice.value];
  cue.textContent = description;
  const score = mountScore(figure, {
    notes: { type, scoreTracks },
    tempo,
    notation: 'staff',
    soundFontUrl: woodwindSoundFont
  });
  choice.addEventListener('change', () => {
    const selected = variants[choice.value];
    cue.textContent = selected.description;
    score.setNotes({ type, scoreTracks: selected.scoreTracks });
  });
}

const sharedPhrase = 'D4.4 { dy mf } F4.4 G4.2 | F4.4 E4.4 D4.2';
mountVariants('woodwind-timbres', {
  flute: {
    scoreTracks: [part('flute', sharedPhrase)],
    description: 'D4–G4 在长笛的低区，声音较轻，音头带有气流的质感。四个版本的实际音高、节奏和力度相同。'
  },
  oboe: {
    scoreTracks: [part('oboe', sharedPhrase)],
    description: '同一乐句落在双簧管较低的位置，簧片音色集中，音头的轮廓更明显。'
  },
  clarinet: {
    scoreTracks: [part('clarinet', sharedPhrase)],
    description: '这段实际音高在单簧管的低区，声音偏圆而有簧片色彩。谱例按实际音高显示。'
  },
  bassoon: {
    scoreTracks: [part('bassoon', sharedPhrase)],
    description: '同一组音在大管较高的位置，听到的是相对轻的高区音色。'
  }
}, 84);

const choraleVoices = [
  'G5.4 { dy mp } A5.4 G5.4 G5.4',
  'E5.4 { dy mp } F5.4 D5.4 E5.4',
  'C4.4 { dy mp } C4.4 B3.4 C4.4',
  'E3.4 { dy mp } F3.4 G3.4 E3.4'
];

function choraleParts(assignments) {
  return assignments.map(([instrument, number], voice) => part(instrument, choraleVoices[voice], number));
}

mountVariants('woodwind-chorale-voicing', {
  single: {
    scoreTracks: choraleParts([['flute'], ['oboe'], ['clarinet'], ['bassoon']]),
    description: '高到低由长笛、双簧管、单簧管、大管各奏一条。四条线各自保留一种音色。'
  },
  paired: {
    scoreTracks: choraleParts([['flute', 'Ⅰ'], ['flute', 'Ⅱ'], ['clarinet', 'Ⅰ'], ['clarinet', 'Ⅱ']]),
    description: '两条上声部同为长笛，两条下声部同为单簧管。音与节奏和单管式相同。'
  },
  mixed: {
    scoreTracks: choraleParts([['flute'], ['oboe'], ['clarinet', 'Ⅰ'], ['clarinet', 'Ⅱ']]),
    description: '下方两线保留同色，双簧管在中音声部重新出现，与高音长笛分开。'
  }
}, 60, fourPartHarmony);

const originalLine = 'G4.4 { dy mp } A4.4 B4.2 | D5.4 B4.4 G4.2';
const higherLine = 'G5.4 { dy mp } A5.4 B5.2 | D6.4 B5.4 G5.2';
const clarinetLine = part('clarinet', originalLine);
mountVariants('woodwind-octave-doubling', {
  solo: {
    scoreTracks: [clarinetLine],
    description: '单簧管在中高位置独奏，整段只有一个实际音高层。'
  },
  unison: {
    scoreTracks: [part('flute', originalLine), clarinetLine],
    description: '长笛以同一组实际音高加入，音色与密度改变，音域的上下限保持原位。'
  },
  octave: {
    scoreTracks: [part('flute', higherLine), clarinetLine],
    description: '单簧管保留原位，长笛的每一个音比它高八度。增加的是同一旋律的高音层。'
  }
}, 88);

function chordParts(flutes, clarinets) {
  const pairs = [['flute', flutes], ['clarinet', clarinets]];
  return pairs.flatMap(([instrument, pitches]) =>
    pitches.map((pitch, index) => part(instrument, pitch + '.1 { dy mf }', index === 0 ? 'Ⅰ' : 'Ⅱ'))
  );
}

mountVariants('woodwind-chord-spacing', {
  stacked: {
    scoreTracks: chordParts(['G5', 'E5'], ['C5', 'G4']),
    description: '高到低是 G5、E5、C5、G4。两支长笛在上，两支单簧管在下，形成两个连续的色层。'
  },
  interlocked: {
    scoreTracks: chordParts(['G5', 'C5'], ['E5', 'G4']),
    description: '固定四个音，长笛与单簧管逐音交替。两种音色都出现在和弦的内部。'
  },
  enclosed: {
    scoreTracks: chordParts(['G5', 'G4'], ['E5', 'C5']),
    description: '两支长笛占据最高和最低音，两支单簧管在内层。相同的音色出现在两个外缘。'
  }
}, 72);
