import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

export function mountStringDemo(id, tempo, versions) {
  mountScoreWritingSteps(document.getElementById(id), {
    score: { tempo, soundFontUrl, showDynamics: false },
    steps: versions.map(([label, description, scoreTracks]) => ({
      label, description, notes: { scoreTracks }
    }))
  });
}

export function stringTrack(name, program, phrase, clef = 'G2') {
  return { name, program, phrase: String.raw`\clef ${clef} \ks D \ts (2 4) ${phrase}` };
}
