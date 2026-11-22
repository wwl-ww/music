import { mountScore } from './score.js';
import { fourPartHarmony } from './four-part.js';

export function fourPartScore(voices, key, meter, { pickup = false, displayPhrase } = {}) {
  return { type: fourPartHarmony, voices, key, meter, pickup, displayPhrase };
}

// A row contains bass, tenor, alto and soprano. Each array is one measure.
export function labelledChordScore(measures, key = 'C', meter = '2 4', options) {
  const voices = Array.from({ length: 4 }, (_, voice) => measures.map(measure =>
    measure.map(([pitches, label, duration = '2']) => {
      const pitch = pitches.split(' ')[voice];
      const effects = [duration.includes('.') ? 'd' : '', voice === 3 && label ? `txt "${label}"` : ''].filter(Boolean);
      return `${pitch}.${duration.replace('.', '')}${effects.length ? ` { ${effects.join(' ')} }` : ''}`;
    }).join(' ')).join(' | '));
  return fourPartScore(voices, key, meter, options);
}

export function scoreWithAccompaniment(melody, chords) {
  const accompaniment = chords.map(chord => `(${chord}).2`).join(' | ');
  const displayPhrase = String.raw`\ks C \ts (2 4) ${melody} ||
    \staff { score } \tuning (none) \clef F4 ${accompaniment}`;
  const parts = chords.map(chord => chord.split(' '));
  if (parts.every(chord => chord.length === 3)) {
    const voices = [0, 1, 2].map(voice => parts.map(chord => `${chord[voice]}.2`).join(' | '));
    return fourPartScore([...voices, melody], 'C', '2 4', { displayPhrase });
  }
  return displayPhrase;
}

function attach(figure, notes) {
  const container = document.createElement('div');
  figure.append(container);
  return mountScore(container, { notation: 'staff', tempo: 100, notes });
}

export function mountHarmonyOptions(groups, fixedExamples = {}) {
  for (const figure of document.querySelectorAll('[data-harmony-example]')) {
    attach(figure, fixedExamples[figure.dataset.harmonyExample]);
  }

  for (const demo of document.querySelectorAll('[data-harmony-options]')) {
    const options = groups[demo.dataset.harmonyOptions];
    const select = demo.querySelector('select');
    const cue = demo.querySelector('output');
    const initial = options[select.value];
    const playback = attach(demo.querySelector('figure'), initial.notes);
    cue.textContent = initial.description;

    select.addEventListener('change', () => {
      const { notes, description } = options[select.value];
      playback.setNotes(notes);
      cue.textContent = description;
    });
  }
}
