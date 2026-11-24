import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScore } from '../../shared/formats/score.js';

export function reharmTrack(name, bars, { program = 0, clef = 'G2', key = 'C' } = {}) {
  return {
    name, program,
    phrase: String.raw`\clef ${clef} \ks "${key}" \ts (4 4) ${bars.join(' | ')}`
  };
}

export function harmonyBars(bars, voicings, rhythms = {}, symbols = {}) {
  return bars.map(bar => {
    const events = typeof bar === 'string' ? [[bar, 4]] : bar;
    return events.flatMap(([name, beats]) => {
      const notes = voicings[name];
      if (!notes) throw new Error(`缺少和弦声位：${name}`);
      const pattern = rhythms[beats] ?? [[4 / beats]];
      return pattern.map(([duration, rest, dynamic], index) => {
        if (rest) return `r.${duration}`;
        const effects = [index === 0 ? `ch "${symbols[name] ?? name}"` : '', dynamic ? `dy ${dynamic}` : ''].filter(Boolean);
        return `(${notes}).${duration}${effects.length ? ` { ${effects.join(' ')} }` : ''}`;
      });
    }).join(' ');
  });
}

export function mountReharmDemo(id, versions, tempo, { scrollScore = false } = {}) {
  const demo = document.getElementById(id);
  const form = demo.querySelector('form');
  const cue = demo.querySelector('[data-generated-description]');
  const figure = demo.querySelector('figure');

  function selection() {
    const { arrangement } = Object.fromEntries(new FormData(form));
    const { tracks, summary } = versions[arrangement];
    cue.textContent = summary;
    return { scoreTracks: tracks };
  }

  const player = mountScore(figure, {
    notes: selection(), notation: 'staff', tempo,
    soundFontUrl: bandSoundFont, preservePosition: true,
    sectionNavigation: scrollScore ? {} : undefined
  });
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('change', () => player.setNotes(selection()));
}
