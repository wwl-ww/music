// Four independent voices, ordered bass, tenor, alto, soprano.
// Bar lines delimit the original phrases. Only the sustained voice carries a tie.
export const harmonizedMelodies = {
  gMinor: [
    'G3.4 D3.4 G3.4 | D3.2 G2.4 | C3.4 G2.4 D3.4 | G3.2 { d }',
    'Bb3.4 A3.4 Bb3.4 | D4.2 { d } | Eb4.4 D4.4 D4.4 | Bb3.2 { d }',
    'D4.2 { d } | F#4.2 G4.4 | G4.2 F#4.4 | G4.2 { d }',
    'G4.4 { txt "i" } F#4.4 { txt "V" } G4.4 { txt "i" } | A4.2 { txt "V" } Bb4.4 { txt "i" } | C5.4 { txt "iv" } Bb4.4 { txt "i" } A4.4 { txt "V" } | G4.2 { d txt "i" }'
  ],
  aFlat: [
    'Ab3.4 | Eb3.4 Ab3.4 | Db3.4 Eb3.4 | Ab2.4 Db3.4 | Ab3.4',
    'Eb4.4 | G4.4 Eb4.4 | F4.4 Eb4.4 | Eb4.4 F4.4 | Eb4.4',
    'Ab4.4 | Bb4.4 Ab4.4 | Ab4.4 G4.4 | Ab4.2 | Ab4.4',
    String.raw`\ac C5.4 { txt "I" } | Eb5.4 { txt "V" } C5.4 { txt "I" } | Db5.4 { txt "IV" } Bb4.4 { txt "V" } | C5.4 { txt "I" } Db5.4 { txt "IV" } | C5.4 { txt "I" }`
  ]
};

export const redistributionStudies = {
  flexible: [
    'C3.2 G2.2 | C3.2 G3.2 | C3.2 F3.2 | G3.2 C3.2',
    'E4.2 B3.2 | C4.2 D4.2 | E4.2 C4.2 | B3.2 C4.2',
    'G4.1 | G4{t}.1 | G4{t}.2 F4.2 | D4.2 C4.2',
    'C5.2 { txt "I" } D5.4 { txt "V" } G5.4 | E5.2 { txt "I" } B4.2 { txt "V" } | C5.4 { txt "I" } G4.4 A4.4 { txt "IV" } C5.4 | G4.4 { txt "V" } D4.4 E4.2 { txt "I" }'
  ],
  clear: [
    'C3.1 | F2.1 | G2.1 | C3.1',
    'C4.2 E4.2 | C4.2 { d } A3.4 | G3.2 B3.2 | C4.1',
    'G4.2 C5.2 | A4.2 F4.2 | D4.2 G4.2 | E4.1',
    'E5.4 { txt "I" } C5.4 G5.2 | F5.4 { txt "IV" } C5.4 A4.4 C5.4 | B4.2 { txt "V" } D5.2 | C5.1 { txt "I" }'
  ],
  flawed: [
    'C3.1 | F2.1 | G2.1 | C3.1',
    'G4.4 E4.4 C4.2 | F4.2 C4.4 F4.4 | D4.2 B3.2 | G3.1',
    'C5.4 G4.4 E5.2 | A4.2 F4.4 A4.4 | G4.1 | E4.1',
    'E5.4 { txt "I" } C5.4 G5.2 | F5.4 { txt "IV" } C5.4 A4.4 C5.4 | B4.2 { txt "V" } D5.2 | C5.1 { txt "I" }'
  ]
};
