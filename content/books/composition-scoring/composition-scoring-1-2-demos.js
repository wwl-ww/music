import ensembleSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScore } from '../../shared/formats/score.js';

export function part(name, program, notes, { clef = 'G2', key = 'C', meter = '4 4' } = {}) {
  return { name, program, phrase: String.raw`\clef ${clef} \ks ${key} \ts (${meter}) ${notes}` };
}

export function mountScoringChoices(id, tempo, versions, { ensemble = false } = {}) {
  const demo = document.getElementById(id);
  const figure = demo.querySelector('[data-scoring-score]');
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');

  function getNotes() {
    const { description, tracks } = versions[select.value];
    cue.textContent = description;
    return { scoreTracks: tracks };
  }

  const player = mountScore(figure, {
    notes: getNotes(),
    tempo,
    notation: 'staff',
    soundFontUrl: ensemble ? ensembleSoundFont : undefined
  });

  select.addEventListener('change', () => player.setNotes(getNotes()));
}
