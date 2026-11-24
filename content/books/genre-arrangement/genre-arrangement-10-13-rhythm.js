const gridDurations = [
  [16, '.1'], [12, '.2', true], [8, '.2'], [6, '.4', true],
  [4, '.4'], [3, '.8', true], [2, '.8'], [1, '.16']
];

export const quarterSteps = [0, 4, 8, 12];
export const eighthSteps = [0, 2, 4, 6, 8, 10, 12, 14];

export function noteAt(step, pitch, length = 1, dynamic) {
  return { step, pitch, length, dynamic };
}

export function hits(steps, pitch, dynamic) {
  return steps.map(step => noteAt(step, pitch, 1, dynamic));
}

export function arrangementBar(events) {
  let cursor = 0;
  const beats = [];
  function append(span, pitches = [], dynamic) {
    let tied = false;
    while (span) {
      const [size, duration, dotted] = gridDurations.find(([units]) => units <= span);
      const notes = pitches.map(pitch => tied ? pitch + '{t}' : pitch);
      const note = notes.length > 1 ? '(' + notes.join(' ') + ')' : notes[0] ?? 'r';
      const properties = [dotted && 'd', dynamic && !tied && 'dy ' + dynamic].filter(Boolean);
      const effects = properties.length ? ' { ' + properties.join(' ') + ' }' : '';
      beats.push(note + duration + effects);
      span -= size;
      tied = true;
    }
  }

  for (const { step, pitch, length, dynamic } of events) {
    if (step < cursor || step + length > 16) throw new RangeError('A rhythm event overlaps or exceeds its bar.');
    append(step - cursor);
    append(length, Array.isArray(pitch) ? pitch : [pitch], dynamic);
    cursor = step + length;
  }
  append(16 - cursor);
  return beats.join(' ');
}

export function drumBar(patterns) {
  const onsets = new Map();
  const dynamics = ['ppp', 'pp', 'p', 'mp', 'mf', 'f', 'ff', 'fff'];
  for (const { step, pitch, dynamic } of patterns.flat()) {
    if (!onsets.has(step)) onsets.set(step, noteAt(step, [], 1, dynamic));
    const event = onsets.get(step);
    event.pitch.push(pitch);
    if (dynamics.indexOf(dynamic) > dynamics.indexOf(event.dynamic)) event.dynamic = dynamic;
  }
  return arrangementBar([...onsets.values()].sort((a, b) => a.step - b.step));
}
