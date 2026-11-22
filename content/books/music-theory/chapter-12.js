import { mountScore } from '../../shared/formats/score.js';

mountScore(document.querySelector('#tempo-contrast-score'), {
  notation: 'staff',
  tempo: 72,
  notes: String.raw`\ts (4 4)
    C4.4 D4.4 E4.4 G4.4 |
    C4.4 { tempo 120 } D4.4 E4.4 G4.4`
});

mountScore(document.querySelector('#dynamic-contrast-score'), {
  notation: 'staff',
  tempo: 92,
  notes: String.raw`\ts (4 4)
    C4.4 { dy p } D4.4 E4.4 G4.4 |
    C4.4 { dy f } D4.4 E4.4 G4.4`
});
