import { model } from '@coderline/alphatab';
import { displayPitch, getTonic, spellNote } from '../../shared/formats/pitch.js';
import { pianoKeysMarkup, pianoMarkup } from '../../shared/formats/piano.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { mountScoreComparison } from '../../shared/formats/score-comparison.js';
import { chordTypes } from './chord-data.js';
import { scaleTypes } from './scale-data.js';
import { referenceNotes, referenceScore } from './reference-pitches.js';

const reference = document.querySelector('[data-interval-reference]');
const start = reference.querySelector('[data-interval-start]');
const intervalKeyboard = reference.querySelector('.interval-keyboard');
const intervalKeys = reference.querySelector('[data-interval-keys]');
const intervalCaption = reference.querySelector('[data-interval-key-caption]');
const upperNotes = [...reference.querySelectorAll('[data-interval-upper]')];
const intervals = upperNotes.map(pitch => {
  const distance = pitch.closest('td').previousElementSibling;
  const semitones = Number(distance.textContent);
  distance.style.setProperty('--semitones', semitones);
  const row = distance.parentElement;
  const heading = row.querySelector('th');
  const name = heading.firstChild.textContent.trim();
  const button = document.createElement('button');
  button.className = 'interval-choice';
  button.type = 'button';
  button.setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-controls', 'interval-keyboard');
  button.append(...heading.childNodes);
  heading.append(button);
  return { pitch, degree: Number(pitch.dataset.intervalUpper), semitones, row, button, name };
});

const tonics = [...'CDEFGAB'].flatMap(letter => ['b', '', '#'].map(accidental => letter + accidental));
start.replaceChildren(...tonics.map(tonic => new Option(displayPitch(tonic), tonic, tonic === 'C', tonic === 'C')));

let current;
function selectInterval(interval) {
  current?.button.setAttribute('aria-pressed', 'false');
  current?.row.removeAttribute('data-current');
  current = interval;
  current.button.setAttribute('aria-pressed', 'true');
  current.row.dataset.current = '';
  const startKey = getTonic(start.value).tonicPitch % 12;
  intervalKeys.innerHTML = pianoMarkup(startKey, startKey + current.semitones);
  const above = (current.degree === 7 ? '高八度 ' : '') + current.pitch.textContent;
  intervalCaption.textContent = `${displayPitch(start.value)} → ${above} · ${current.name} · ${current.semitones} 个半音`;
}

for (const interval of intervals) interval.row.addEventListener('click', () => selectInterval(interval));
start.addEventListener('change', () => {
  const tonic = getTonic(start.value);
  for (const { pitch, degree, semitones } of intervals) {
    const note = spellNote(tonic, degree, tonic.tonicPitch + semitones);
    pitch.textContent = displayPitch(note.name);
  }
  selectInterval(current);
});
selectInterval(intervals.find(interval => interval.semitones === 7));
intervalKeyboard.hidden = false;

document.querySelector('[data-enharmonic-keys]').innerHTML = pianoKeysMarkup([
  [0, 'keyboard-highlight', 'start'], [6, 'keyboard-end', 'end']
], 1);

const scales = new Map(scaleTypes.map(type => [type.id, type]));
for (const keyboard of document.querySelectorAll('[data-foundation-scale]')) {
  const { foundationScale, compareWith } = keyboard.dataset;
  const original = compareWith ? referenceNotes('C', scales.get(compareWith)) : [];
  const marked = referenceNotes('C', scales.get(foundationScale)).slice(0, -1).map(({ pitch, degree }, index) => {
    const different = compareWith && pitch !== original[index].pitch;
    return [pitch - 60, different ? 'keyboard-end' : 'keyboard-highlight', different ? 'end' : degree === '1' ? 'start' : ''];
  });
  keyboard.innerHTML = pianoKeysMarkup(marked, 1);
}

mountScoreComparison(document.querySelector('#added-or-extended'), {
  description: '两者都有 C、E、G 和九音 D。C9 还保留属七骨架的 B♭，因此 E 与 B♭ 构成三全音。',
  versions: ['add-nine', 'dominant-ninth'].map(id => {
    const type = chordTypes.find(item => item.id === id);
    const notes = referenceNotes('C', type);
    const seventh = notes.find(note => note.degree === '♭7');
    return {
      label: 'C' + type.suffix,
      score: {
        notes: referenceScore(notes, false), tempo: 76, showDynamics: false,
        onScoreLoaded: seventh && (score => {
          const chordNotes = score.tracks[0].staves[0].bars[0].voices[0].beats[0].notes;
          const highlighted = chordNotes.find(note => note.realValue === seventh.pitch);
          highlighted.style = new model.NoteStyle();
          highlighted.style.colors.set(model.NoteSubElement.StandardNotationNoteHead, new model.Color(166, 41, 61));
        })
      }
    };
  })
});

const gongPitches = [60, 62, 64, 67, 69];
const modeTonics = {
  'pentatonic-gong': 'C',
  'pentatonic-shang': 'D',
  'pentatonic-jue': 'E',
  'pentatonic-zhi': 'G',
  'pentatonic-yu': 'A'
};
mountProgrammaticScore(document.querySelector('#five-modes-comparison'), {
  lowestPitch: 60,
  octaves: 2,
  showDynamics: false,
  build({ relationship, mode }) {
    const sameGong = relationship === 'same-gong';
    const tonic = sameGong ? modeTonics[mode] : 'C';
    const type = scales.get(mode);
    const notes = referenceNotes(tonic, type, 'up', 4);
    const gong = notes.find(({ degree }) => degree === type.gongDegree);
    const summary = `${tonic} ${type.name}。主音 ${tonic}，宫音 ${displayPitch(gong.name)}。`;
    const pitches = sameGong ? gongPitches.flatMap(pitch => [pitch, pitch + 12]) : notes.map(({ pitch }) => pitch);
    const gongPitch = sameGong ? gongPitches[0] : gong.pitch;
    const keyboardMarks = [[notes[0].pitch, 'start']];
    if (gongPitch !== notes[0].pitch) keyboardMarks.push([gongPitch, 'end']);
    return {
      notes: referenceScore(notes, true), pitches, keyboardMarks, summary,
      description: summary + notes.map(({ name }) => displayPitch(name)).join('、')
    };
  }
});
