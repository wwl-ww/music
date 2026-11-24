import percussionSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { model } from '@coderline/alphatab';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';

mountRangeKeyboards(
  document.getElementById('percussion-range-keyboards'),
  document.getElementById('percussion-range-table'),
  { rangeLabel: '示例', firstOctave: 2 }
);

const tunings = {
  c: { dominant: 'G2', tonic: 'C3', pitches: [43, 48], drums: '32 英寸鼓定为 G2，29 英寸鼓定为 C3。' },
  d: { dominant: 'A2', tonic: 'D3', pitches: [45, 50], drums: '29 英寸鼓定为 A2，26 英寸鼓定为 D3。' }
};
mountProgrammaticScore(document.getElementById('timpani-tuning'), {
  lowestPitch: 36,
  octaves: 2,
  soundFontUrl: percussionSoundFont,
  build({ tuning, ending }) {
    const { dominant, tonic, drums, pitches } = tunings[tuning];
    const roll = ending === 'roll';
    const notes = String.raw`\instrument 47 \clef F4 \ks C \ts (4 4)
      ${dominant}.4 { dy mf } ${dominant}.4 ${tonic}.2 ${roll ? '{ tp 3 }' : ''}`;
    const finish = roll
      ? '主音用滚奏维持，试听用快速重复近似滚奏。'
      : '主音只击一次，随后让鼓音自然衰减。';
    return { notes, pitches, description: drums + finish };
  }
});

function mountVariants(id, variants, { tempo, onScoreLoaded } = {}) {
  const demo = document.getElementById(id);
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  const figure = demo.querySelector('figure');

  function selectedMusic() {
    const { description, notes } = variants[select.value];
    cue.textContent = description;
    return notes;
  }

  const score = mountScore(figure, {
    notes: selectedMusic(),
    tempo,
    notation: 'staff',
    soundFontUrl: percussionSoundFont,
    onScoreLoaded
  });
  select.addEventListener('change', () => score.setNotes(selectedMusic()));
}

const highMotif = 'G5.4 { dy mf } A5.4 C6.2 | r.1';
const lowMotif = 'G4.4 { dy mf } A4.4 C5.2 | r.1';
const malletScore = (program, motif) => String.raw`\instrument ${program} \ks C \ts (4 4) ${motif}`;
mountVariants('mallet-motif', {
  xylophone: {
    notes: malletScore(13, highMotif),
    description: '木条音头短而清楚，末音即使写成长音，单击后仍会迅速衰减。'
  },
  glockenspiel: {
    notes: malletScore(9, highMotif),
    description: '保持与木琴相同的实际音高和时值。金属音条带来较亮的起音和较长的尾音。'
  },
  chimes: {
    notes: malletScore(14, lowMotif),
    description: '同一动机移低八度，落在示例排钟的音域内。击后的钟声仍可延续到后面的休止处。'
  }
}, { tempo: 84 });

function percussionPart(name, midi) {
  return {
    name,
    program: 'percussion',
    staffLines: 1,
    phrase: String.raw`\clef neutral \articulation (Strike ${midi}) \ts (4 4)
      Strike.4 { dy mf beam down } r.4 Strike.4 { beam down } r.4`
  };
}

const snare = percussionPart('小鼓', 38);
const bass = percussionPart('大鼓', 35);
const cymbal = percussionPart('钹', 49);
const triangle = percussionPart('三角铁', 81);
mountVariants('percussion-accents', {
  snare: { notes: { scoreTracks: [snare] }, description: '小鼓让重拍有清楚、短促的音头。' },
  bass: { notes: { scoreTracks: [bass] }, description: '大鼓把同样的重拍落在较低的音色里，重心更沉。' },
  cymbal: { notes: { scoreTracks: [cymbal] }, description: '钹的起音位置一样，击后的金属余响更长。' },
  both: { notes: { scoreTracks: [cymbal, bass] }, description: '大鼓与钹同一拍发声，低端冲击和高处余响相互补充。' },
  triangle: { notes: { scoreTracks: [triangle] }, description: '三角铁用较细、清亮的金属声点出同样的起音。' }
}, {
  tempo: 76,
  onScoreLoaded(score) {
    for (const track of score.tracks) {
      // Default MIDI articulations use positions from a five-line drum staff.
      // Copy them before placing this track's noteheads on its single line.
      track.percussionArticulations = track.percussionArticulations.map(articulation =>
        Object.assign(new model.InstrumentArticulation(), articulation, { staffLine: 0 })
      );
    }
  }
});
