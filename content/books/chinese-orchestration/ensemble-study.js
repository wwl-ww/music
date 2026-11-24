import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScore } from '../../shared/formats/score.js';

export function part(name, program, phrase, clef = 'G2') {
  return { name, program, phrase: String.raw`\clef ${clef} \ts (4 4) ${phrase}` };
}

export function mountEnsembleStudy(id, variants, tempo = 88) {
  const demo = document.getElementById(id);
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  const figure = demo.querySelector('figure');
  cue.setAttribute('aria-live', 'polite');

  function score() {
    const { detail, tracks } = variants[select.value];
    cue.textContent = detail;
    return { scoreTracks: tracks };
  }

  const player = mountScore(figure, {
    notes: score(), tempo, notation: 'staff', soundFontUrl, showDynamics: false
  });
  select.addEventListener('change', () => player.setNotes(score()));
}
