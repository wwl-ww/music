import ensembleSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountWindFingering } from '../../shared/formats/instrument-techniques.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';
import { diziFingering, diziHoleLabels, diziModes } from './instrument-technique-data.js';

mountRangeKeyboards(document.getElementById('wind-range-keyboards'), document.getElementById('wind-range-data'), {
  firstOctave: 4,
  octaves: 4,
  rangeLabel: '参考'
});

const fingering = mountWindFingering(document.getElementById('dizi-fingering'), diziHoleLabels);

mountProgrammaticScore(document.getElementById('dizi-tube-tones'), {
  lowestPitch: 60,
  octaves: 2,
  soundFontUrl: ensembleSoundFont,
  onPitchesChange: fingering.markPitches,
  build({ mode }) {
    const { key, notes, description } = diziModes[mode];
    const fingerings = diziFingering(mode);
    fingering.update(fingerings);
    return {
      notes: `\\instrument 73 \\tempo 96 \\ks ${key} \\ts (4 4) :8 ${notes}`,
      pitches: fingerings.map(({ pitch }) => pitch),
      description,
      summary: `${description} 试听用长笛音色示意音高。`
    };
  }
});

mountScore(document.getElementById('guan-response-score'), {
  notes: {
    scoreTracks: [
      { name: '管子', program: 68, phrase: String.raw`\ts (4 4) G4.4 C5.4 A4.8 G4.8 E4.4 | r.1` },
      { name: '乐队', program: 40, phrase: 'r.1 | r.2 F4.8 G4.8 D4.4' }
    ]
  },
  tempo: 76,
  notation: 'staff',
  soundFontUrl: ensembleSoundFont
});

const shengVoicings = {
  single: {
    pitches: [69, 71, 74, 76],
    notes: 'A4.4 B4.4 D5.4 E5.4',
    description: '只有旋律线，各音单独发声。'
  },
  fifth: {
    pitches: [69, 71, 74, 76, 78, 81, 83],
    notes: '(A4 E5).4 (B4 F#5).4 (D5 A5).4 (E5 B5).4',
    description: '每个旋律音的上方同时奏纯五度，主线在下。'
  },
  fourth: {
    pitches: [64, 66, 69, 71, 74, 76],
    notes: '(E4 A4).4 (F#4 B4).4 (A4 D5).4 (B4 E5).4',
    description: '五度音下移一个八度后构成纯四度，主线在上。'
  },
  octave: {
    pitches: [69, 71, 74, 76, 78, 81, 83, 86, 88],
    notes: '(A4 E5 A5).4 (B4 F#5 B5).4 (D5 A5 D6).4 (E5 B5 E6).4',
    description: '在上方五度之外再加旋律的高八度，原旋律位置保持不变。'
  }
};

mountProgrammaticScore(document.getElementById('sheng-harmony'), {
  lowestPitch: 60,
  octaves: 3,
  soundFontUrl: ensembleSoundFont,
  build({ texture }) {
    const { pitches, notes, description } = shengVoicings[texture];
    return {
      notes: `\\instrument 20 \\tempo 84 \\ks D \\ts (4 4) ${notes}`,
      pitches,
      description,
      summary: `${description} 试听用簧风琴音色示意声部配置，各笙型的可用组合需核对指法。`
    };
  }
});
