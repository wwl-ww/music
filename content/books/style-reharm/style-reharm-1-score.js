export const half = (left, right) => [[left, 2], [right, 2]];

export function chord(pitches, label, duration) {
  return `(${pitches}).${duration}${label ? ` { ch "${label}" }` : ''}`;
}

export function harmonicScore(melody, bars, voicings, {
  swing = false,
  leadProgram = 0,
  chordProgram = 0,
  bassProgram = 0,
  playChords = (pitches, duration, _, label) => chord(pitches, label, duration),
  playBass = (pitch, duration) => `${pitch}.${duration}`
} = {}) {
  const meter = String.raw`\ks C \ts (4 4)`;
  const harmony = [];
  const bass = [];
  bars.forEach((bar, measure) => {
    const events = typeof bar === 'string' ? [[bar, 1]] : bar;
    const harmonyBar = [];
    const bassBar = [];
    events.forEach(([label, duration], change) => {
      const [bassPitch, ...upper] = voicings[label].split(' ');
      harmonyBar.push(playChords(upper.join(' '), duration, change, label.split(' · ')[0]));
      bassBar.push(playBass(bassPitch, duration, measure, change));
    });
    harmony.push(harmonyBar.join(' '));
    bass.push(bassBar.join(' '));
  });
  return {
    scoreTracks: [
      { name: '旋律', program: leadProgram, phrase: `${meter}${swing ? String.raw` \tf t8` : ''} ${melody.join(' | ')}` },
      { name: '和声', program: chordProgram, phrase: `${meter} ${harmony.join(' | ')}` },
      { name: '低音', program: bassProgram, phrase: String.raw`${meter} \clef F4 ${bass.join(' | ')}` }
    ]
  };
}
