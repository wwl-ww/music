import { mountScore } from './shared/formats/score.js';
import './shared/formats/keyboard-intervals.js';
import { mountRepeatRoute } from './shared/formats/repeat-route.js';

const preview = document.querySelector('#preview-width');
const showcase = document.querySelector('.format-showcase');
function setPreviewWidth() {
  showcase.dataset.previewWidth = preview.value;
}
preview.addEventListener('change', setPreviewWidth);
setPreviewWidth();

mountScore(document.querySelector('#melody-example'), {
  tempo: 88,
  notes: String.raw`
    \ks C
    \ts 4 4
    C4.4 { d } D4.8 E4.4 G4.4 |
    C5.4 G4.4 F#4.4 G4.4 |
    r.1 |
    E4.4 D4.4 C4.2
  `
});

mountRepeatRoute(document.querySelector('#library-route'), {
  repeat: {
    bars: [{ name: 'A' }, { name: 'B', start: true }, { name: 'C', end: true }, { name: 'D' }],
    steps: [0, 1, 2, 1, 2, 3],
    cues: { 3: '回到起始反复线 B。' }
  },
  straight: {
    bars: [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }],
    steps: [0, 1, 2, 3],
    cues: {}
  }
});
