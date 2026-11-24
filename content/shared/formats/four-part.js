export const fourPartHarmony = 'four-part-harmony';

const stringParts = [
  ['大提琴', 42],
  ['中提琴', 41],
  ['第二小提琴', 40],
  ['第一小提琴', 40]
];

export function encodeScore(material, staves, tempo, timbre, splitVoices = false) {
  if (material.scoreTracks) {
    const tracks = material.scoreTracks.map(({ name, program, phrase }) => String.raw`
      \track "${name}"
      \staff { score }
      \instrument ${program}
      \tuning (none)
      ${phrase}
    `).join('');
    return String.raw`\tempo ${tempo}` + tracks;
  }

  const fourPart = material.type === fourPartHarmony;
  const useStrings = fourPart && timbre === 'strings';
  let phrase = material.scoreNotation ?? material;

  if (fourPart) {
    const { voices: [bass, tenor, alto, soprano], key, meter, pickup, displayPhrase } = material;
    phrase = displayPhrase ?? String.raw`\ks ${key} \ts (${meter}) ${pickup ? '\\ac ' : ''}${soprano} ||
      \voice ${alto} ||
      \staff { score } \tuning (none) \clef F4 \ks ${key} ${tenor} ||
      \voice ${bass}`;
  }

  const displayTracks = staves.map((staff, index) => String.raw`
    \track "" ${index > 0 || useStrings || splitVoices ? '{ mute }' : ''}
    \staff { ${staff} }
    \instrument 0
    \tuning (none)
    ${phrase}
  `).join('');

  // The visible grand staff stays in place for layout and the synchronized cursor.
  // Playback-only tracks give each of the same four voices its own MIDI channel.
  const voiceParts = splitVoices && fourPart ? [...material.voices].reverse() : material.voices;
  const playbackTracks = useStrings || splitVoices ? voiceParts.map((voice, index) => {
    const [name, instrument] = useStrings ? stringParts[splitVoices ? 3 - index : index] : ['', 0];
    return String.raw`
    \track "${name}"
    \staff { score }
    \instrument ${instrument}
    \tuning (none)
    \ks ${material.key ?? 'C'}
    ${splitVoices && material.meter ? '\\ts (' + material.meter + ')' : ''}
    ${splitVoices && material.pickup ? '\\ac ' : ''}
    ${voice}
  `;
  }).join('') : '';

  return String.raw`\tempo ${tempo}` + displayTracks + playbackTracks;
}
