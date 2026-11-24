import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

export function scoringPart(name, program, notes, { meter = '4 4', key = 'C', clef = 'G2' } = {}) {
  const phrase = String.raw`\displaytranspose 0 \clef ${clef} \ks ${key} \ts (${meter}) ${notes}`;
  return { name, program, phrase };
}

export function accompaniment(notes, settings) {
  return scoringPart('和声', 0, notes, { ...settings, clef: 'F4' });
}

export function mountScoringComparison(id, tempo, versions) {
  mountScoreWritingSteps(document.getElementById(id), {
    steps: versions.map(([label, description, ...tracks]) => ({
      label, description, notes: { scoreTracks: tracks }
    })),
    score: { tempo, soundFontUrl }
  });
}
