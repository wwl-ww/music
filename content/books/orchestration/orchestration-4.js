import hornSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { fourPartHarmony } from '../../shared/formats/four-part.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';

const hornProgram = 60;
const pitchNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

function pitchName(midi) {
  return pitchNames[midi % 12] + (Math.floor(midi / 12) - 1);
}

const openFundamental = 29; // F1 on the F side.
const partials = Array.from({ length: 15 }, (_, index) => index + 2);
const harmonicKeyboard = document.getElementById('horn-harmonic-series');
mountProgrammaticScore(harmonicKeyboard, {
  lowestPitch: 24,
  octaves: 5,
  soundFontUrl: hornSoundFont,
  build({ valves }) {
    const drop = Number(valves);
    const base = openFundamental - drop;
    const pitches = partials.map(partial => base + Math.round(12 * Math.log2(partial)));
    const events = pitches.map((pitch, index) => `${pitchName(pitch)}.8 { txt "${partials[index]}" }`);
    const measure = start => events.slice(start, start + 4).join(' ');
    const phrase = String.raw`\instrument ${hornProgram} \ts (2 4) \clef F4
      ${measure(0)} | \clef G2 ${measure(4)} | ${measure(8)} | ${measure(12)} r.8`;
    const span = [pitches[0], pitches[pitches.length - 1]].map(pitchName).join('–');
    const range = span.replaceAll('b', '♭').replaceAll('#', '♯');
    const summary = drop === 0
      ? `空按的第 2 至 16 分音覆盖 ${range}。换指后，整列位置随管长移动。`
      : `这组指法把整列降低 ${drop} 个半音。第 2 至 16 分音覆盖 ${range}。`;
    const description = `${summary} 谱面与键盘按实际音高和十二平均律显示。`;
    return { notes: phrase, pitches, summary, description };
  }
});

mountRangeKeyboards(
  document.getElementById('horn-range-keyboards'),
  document.getElementById('horn-range-table'),
  { octaves: 5, lowerLabel: '下限' }
);

const main = 'A4.4 { dy mp } Bb4.4 C5.4 F4.4';
const lowerOctave = 'A3.4 { dy mp } Bb3.4 C4.4 F3.4';
const lowerThird = 'F4.4 { dy mp } G4.4 A4.4 D4.4';
function hornPart(number, line, clef = 'G2') {
  return {
    name: '圆号' + number,
    program: hornProgram,
    phrase: String.raw`\clef ${clef} \ks F \ts (4 4) ${line}`
  };
}

const melody = hornPart('Ⅰ', main);
const textures = {
  solo: {
    cue: '第一圆号独奏。全段只保留一条旋律。',
    tracks: [melody]
  },
  unison: {
    cue: '第一、第三圆号同奏，音高与节奏一致，增加同一条线的分量。',
    tracks: [melody, hornPart('Ⅲ', main)]
  },
  octave: {
    cue: '第二圆号逐音低一个八度。两层都奏原旋律，整体音域向下展开。',
    tracks: [melody, hornPart('Ⅱ', lowerOctave, 'F4')]
  },
  thirds: {
    cue: '第二圆号与主线同向，始终保持低三度。每个位置都多一个具有和声作用的音。',
    tracks: [melody, hornPart('Ⅱ', lowerThird)]
  },
  chorale: {
    cue: '同一主线下方加入三条独立声部。第一、第三圆号配较高声部，第二、第四配较低声部。',
    tracks: [
      melody,
      hornPart('Ⅱ', 'C4.4 { dy mp } D4.4 E4.4 A3.4'),
      hornPart('Ⅲ', 'F4.4 { dy mp } G4.4 G4.4 C4.4'),
      hornPart('Ⅳ', 'F3.4 { dy mp } Bb2.4 C3.4 F3.4', 'F4')
    ],
    type: fourPartHarmony
  }
};

const textureDemo = document.getElementById('horn-textures');
const select = textureDemo.querySelector('select');
const cue = textureDemo.querySelector('.music-demo-cue');
function buildTexture({ tracks, type, cue: description }) {
  cue.textContent = description;
  return { scoreTracks: tracks, type };
}
const textureScore = mountScore(textureDemo.querySelector('figure'), {
  notes: buildTexture(textures[select.value]),
  tempo: 66,
  notation: 'staff',
  soundFontUrl: hornSoundFont
});
select.addEventListener('change', () => textureScore.setNotes(buildTexture(textures[select.value])));
