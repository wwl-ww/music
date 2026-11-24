import { mountScore } from '../../shared/formats/score.js';
import { mountScoreComparison } from '../../shared/formats/score-comparison.js';
import { mountScoreReader } from '../../shared/formats/score-reader.js';

const orchestraScore = document.querySelector('.orchestra-score');
mountScoreReader(document.getElementById('orchestra-layout-caption'), orchestraScore);

const timbre = document.querySelector('#string-timbres');
const instrument = timbre.querySelector('select');
const programs = { violin: 40, viola: 41, cello: 42 };
const stringPhrase = program => String.raw`\instrument ${program}
  \ks C \ts (4 4) C4.4 { dy mf } D4.4 E4.2 | G4.4 F4.4 E4.2`;
const timbreScore = mountScore(timbre.querySelector('figure'), {
  notes: stringPhrase(programs[instrument.value]), tempo: 80, notation: 'staff'
});
instrument.addEventListener('change', () => timbreScore.setNotes(stringPhrase(programs[instrument.value])));

const chordVoicing = (upper, lower) => String.raw`\ks C \ts (4 4) (${upper}).1 ||
  \staff { score } \tuning (none) \clef F4 (${lower}).1`;
mountScoreComparison(document.querySelector('#spacing-comparison'), {
  description: '两种排列的音名、总音数和上下跨度相同，均用钢琴演奏。低密中空版把两个内声部移低八度，低部更挤，中间的间隔更大。',
  versions: [
    { label: '低疏上密', score: { tempo: 92, notes: chordVoicing('C4 E4 G4', 'C2 G2 E3') } },
    { label: '低密中空', score: { tempo: 92, notes: chordVoicing('E4 G4', 'C2 E2 G2 C3') } }
  ]
});
