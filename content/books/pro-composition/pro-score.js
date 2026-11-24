import ensembleSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { lyricBars } from '../songwriting/songwriting-score.js';

export function songScore({ tempo, melody, harmony, lead = 0, backing = 0 }) {
  const parts = [
    ['旋律', lead, melody],
    ['和声', backing, harmony]
  ];
  return {
    tempo,
    ...(lead || backing ? { soundFontUrl: ensembleSoundFont } : {}),
    notes: {
      scoreTracks: parts.filter(([, , bars]) => bars).map(([name, program, bars]) => ({
        name, program, phrase: String.raw`\clef G2 \ks C \ts (4 4) ${bars.join(' | ')}`
      }))
    }
  };
}

export function write(id, steps) {
  const { notes, ...score } = steps[0][2];
  mountScoreWritingSteps(document.getElementById(id), { score, steps: steps.map(([label, description, variant]) => ({
    label, description, notes: variant.notes
  })) });
}

export function withLyrics(bars, lyrics) {
  return bars.map((bar, index) => lyrics[index] ? lyricBars(lyrics[index], [bar]) : bar);
}

export function completed(id, tempo, parts, sounds) {
  let last = 0;
  const passages = parts.map(([label, material, melody, harmony], index) => {
    const first = last + 1;
    last += melody.length;
    return { id: `part-${index + 1}`, label, first, last, material, melody, harmony };
  });
  const score = songScore({
    tempo, ...sounds,
    melody: passages.flatMap(part => part.melody),
    harmony: passages.flatMap(part => part.harmony)
  });
  mountFormAnalysis(document.getElementById(id), { score, sections: passages });
}
