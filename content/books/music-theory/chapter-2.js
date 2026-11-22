import { mountScore } from '../../shared/formats/score.js';




mountScore(document.querySelector('#syncopation-score'), {
  tempo: 72,
  notes: String.raw`
    \ts 2 4
    G4.4 A4.4 | G4.8 A4.4 G4.8
  `
});

