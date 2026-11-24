import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScore } from '../../shared/formats/score.js';

export function contrastTrack(name, notes, { program = 0, clef = 'G2' } = {}) {
  return { name, notes, program, clef };
}

export function mountScoringContrast(id, versions, { tempo, meter = '4 4', key = 'C' }) {
  const demo = document.getElementById(id);
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');

  function material() {
    const { tracks, summary } = versions[select.value];
    cue.textContent = summary;
    return {
      scoreTracks: tracks.map(({ name, notes, program, clef }) => ({
        name,
        program,
        phrase: String.raw`\clef ${clef} \ks "${key}" \ts (${meter}) ${notes}`
      }))
    };
  }

  const player = mountScore(demo.querySelector('figure'), {
    notes: material(),
    notation: 'staff',
    tempo,
    soundFontUrl: bandSoundFont
  });
  select.addEventListener('change', () => player.setNotes(material()));
}
