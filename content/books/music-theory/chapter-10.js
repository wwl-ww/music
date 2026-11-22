import { mountScore } from '../../shared/formats/score.js';

mountScore(document.querySelector('#key-change-score'), {
  notation: 'staff',
  tempo: 100,
  notes: String.raw`\ts (4 4) \ks (C)
    (C4 E4 G4).2 (D4 F#4 A4 C5).2 |
    (G3 D4 G4 B4).2 (G3 F4 B4 D5).2 |
    (C4 E4 G4).1 |
    (C4 E4 G4).2 (D4 F#4 A4 C5).2 |
    \ks (G) (G3 D4 G4 B4).2 (D4 F#4 A4 C5).2 |
    (G3 B3 D4 G4).1`
});
