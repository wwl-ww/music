import ensembleSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';

mountRangeKeyboards(document.getElementById('wind-range-keyboards'), document.getElementById('wind-range-data'), {
  firstOctave: 4,
  octaves: 4,
  rangeLabel: '参考'
});

const tubeModes = {
  sol: {
    key: 'D',
    pitches: [69, 71, 73, 74, 76, 78, 79, 81],
    notes: 'A4 B4 C#5 D5 E5 F#5 G5 A5',
    description: '筒音 A4 作 sol，第三孔 D5 作 do。C♯5、F♯5 属于 D 宫七声音列。'
  },
  re: {
    key: 'G',
    pitches: [69, 71, 72, 74, 76, 78, 79, 81],
    notes: 'A4 B4 C5 D5 E5 F#5 G5 A5',
    description: '筒音仍是 A4，在 G 宫七声音列里改唱 re，原来的 C♯5 换为 C5。'
  },
  do: {
    key: 'A',
    pitches: [69, 71, 73, 74, 76, 78, 80, 81],
    notes: 'A4 B4 C#5 D5 E5 F#5 G#5 A5',
    description: '筒音 A4 就是 do，A5 是它的高八度，G♯5 属于 A 宫七声音列。'
  }
};

mountProgrammaticScore(document.getElementById('dizi-tube-tones'), {
  lowestPitch: 60,
  octaves: 2,
  soundFontUrl: ensembleSoundFont,
  build({ mode }) {
    const { key, pitches, notes, description } = tubeModes[mode];
    return {
      notes: `\\instrument 73 \\tempo 96 \\ks ${key} \\ts (4 4) :8 ${notes}`,
      pitches,
      description,
      summary: `${description} 谱与键盘均标实际音高，试听用长笛音色示意音高。`
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
