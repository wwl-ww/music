import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountArrangementGrid } from './arrangement-grid.js';
import { mountScore } from './score.js';

const cellDurations = { 1: '.4', 2: '.8', 3: '.8', 4: '.16', 6: '.16' };

function gridTrack(row, beats, subdivisions, beatsPerBar) {
  const { label, program = 0, pitch, drum, events } = row;
  const percussion = drum !== undefined;
  const articulation = percussion ? String.raw`\clef neutral \articulation (Strike ${drum}) ` : '';
  const tuplets = subdivisions === 3 || subdivisions === 6;
  const onsets = new Map(events.map(event => [event.step, event]));
  const bars = [];
  let end = 0;
  let playing = [];

  for (let beat = 0; beat < beats; beat += beatsPerBar) {
    const barBeats = Math.min(beatsPerBar, beats - beat);
    const cells = [];
    for (let step = beat * subdivisions; step < (beat + barBeats) * subdivisions; step++) {
      const event = onsets.get(step);
      if (event) {
        playing = percussion ? ['Strike'] : [event.pitch ?? pitch].flat();
        end = step + (event.length ?? 1);
      }
      const notes = step < end ? playing.map(note => event ? note : note + '{t}') : [];
      const token = notes.length > 1 ? '(' + notes.join(' ') + ')' : notes[0] ?? 'r';
      const dynamic = event && (event.dynamic ?? (event.accent ? 'f' : 'mp'));
      const properties = [tuplets && 'tu 3', dynamic && 'dy ' + dynamic].filter(Boolean);
      cells.push(token + cellDurations[subdivisions] + (properties.length ? ' { ' + properties.join(' ') + ' }' : ''));
    }
    const meter = beat === 0 || barBeats !== beatsPerBar ? String.raw`\ts (${barBeats} 4) ` : '';
    bars.push(meter + cells.join(' '));
  }

  return {
    name: label,
    program: percussion ? 'percussion' : program,
    phrase: articulation + bars.join(' | ')
  };
}

export function mountPlayableArrangementGrid(frame, {
  beats = 4, subdivisions = 4, beatsPerBar = 4, rows, label, tempo = 90, notes
}) {
  const grid = mountArrangementGrid(frame, { beats, subdivisions, beatsPerBar, rows, label });
  const playback = document.createElement('div');
  playback.className = 'arrangement-grid-playback';
  playback.setAttribute('role', 'group');
  playback.setAttribute('aria-label', label);
  const heading = frame.parentElement.querySelector(':scope > .music-demo-toolbar, :scope > figcaption');
  if (heading) {
    heading.classList.add('arrangement-grid-heading');
    heading.append(playback);
  } else {
    frame.before(playback);
  }

  mountScore(playback, {
    notes: notes ?? {
      scoreTracks: rows.filter(row => !row.notationOnly && row.events.length)
        .map(row => gridTrack(row, beats, subdivisions, beatsPerBar))
    },
    tempo,
    soundFontUrl,
    notation: 'staff',
    notationVisible: false,
    onPlaybackPosition: grid.markTick
  });
}
