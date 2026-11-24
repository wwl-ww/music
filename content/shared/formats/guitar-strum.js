export const guitarTuning = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];

export function guitarNotes(positions) {
  return positions.flatMap((fret, index) => fret === null ? [] : [`${fret}.${6 - index}`]);
}

export function guitarBrush(direction, tempo, milliseconds) {
  const ticks = Math.round(milliseconds * tempo * 960 / 60000);
  return `${direction === 'down' ? 'bd' : 'bu'} ${ticks}`;
}
