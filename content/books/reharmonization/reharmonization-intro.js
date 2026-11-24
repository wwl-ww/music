import { displayPitch, getTonic, spellNote } from '../../shared/formats/pitch.js';
import { majorKeys, minorKeys } from '../../shared/formats/scales.js';
import { mountReharmExamples } from './reharmonization-example.js';

const scales = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  harmonic: [0, 2, 3, 5, 7, 8, 11],
  melodic: [0, 2, 3, 5, 7, 9, 11]
};
const degrees = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const suffixes = {
  '4,7,11': 'maj7', '4,7,10': '7', '3,7,10': 'm7', '3,7,11': 'm(maj7)',
  '3,6,10': 'm7(♭5)', '3,6,9': 'dim7', '4,8,11': 'maj7(♯5)'
};

function scaleChords(tonic, type) {
  const root = getTonic(tonic);
  const intervals = scales[type];
  const scale = [...intervals, ...intervals.map(step => step + 12)]
    .map((step, degree) => spellNote(root, degree, root.tonicPitch + step));
  return intervals.map((step, index) => {
    const notes = [index, index + 2, index + 4, index + 6].map(position => scale[position]);
    const distances = notes.slice(1).map(note => note.pitch - notes[0].pitch);
    const suffix = suffixes[distances.join(',')];
    const symbol = displayPitch(notes[0].name) + suffix;
    const accidental = step < scales.major[index] ? '♭' : '';
    const degree = accidental + (distances[0] === 3 ? degrees[index].toLowerCase() : degrees[index]);
    const quality = suffix === 'dim7' ? '°7' : suffix.startsWith('m') && !suffix.startsWith('maj') ? suffix.slice(1) : suffix;
    return { degree: degree + quality, symbol, notes };
  });
}

function mountKeyTable(id, listRows) {
  const host = document.getElementById(id);
  const mode = host.querySelector('[data-scale]');
  const tonic = host.querySelector('[data-tonic]');
  const body = host.querySelector('tbody');

  function render() {
    body.replaceChildren(...listRows(scaleChords(tonic.value, mode.value), mode.value).map(([label, ...cells]) => {
      const row = document.createElement('tr');
      const header = document.createElement('th');
      header.scope = 'row';
      header.textContent = label;
      row.append(header);
      for (const text of cells) row.insertCell().textContent = text;
      return row;
    }));
  }

  function setKeys() {
    const keys = mode.value === 'major' ? majorKeys : minorKeys;
    const previous = tonic.value;
    tonic.replaceChildren(...keys.map(name => new Option(displayPitch(name), name)));
    tonic.value = keys.includes(previous) ? previous : mode.value === 'major' ? 'C' : 'A';
    render();
  }

  mode.addEventListener('change', setKeys);
  tonic.addEventListener('change', render);
  setKeys();
}

mountKeyTable('diatonic-by-key', chords => chords.map(({ degree, symbol, notes }) =>
  [degree, symbol, notes.map(note => displayPitch(note.name)).join('–')]));

mountKeyTable('secondary-by-key', (chords, mode) => {
  const targets = mode === 'major' ? [3, 4, 5, 1, 2] : [3, 4, 5, 6, 2];
  return targets.map(index => {
    const { notes: [tonic], degree, symbol } = chords[index];
    const dominant = spellNote(getTonic(tonic.name, tonic.octave), 4, tonic.pitch + 7);
    return [degree, `${displayPitch(dominant.name)}7 → ${symbol}`];
  });
});

mountReharmExamples([
  {
    id: 'reharm-intro-comparison', title: '保留旋律，延长终止准备',
    melody: ['E5:4 G5:4 E5:2', 'G5:4 A5:4 C5:2', 'D5:2 B4:2', 'C5:4 E5:4 C5:2'],
    original: ['C', 'C', 'G', 'C'],
    revised: ['C', 'Am7', ['Dm7:2', 'G7:2'], 'C']
  },
  {
    id: 'reharm-intro-cadence', title: '从属–主到二–五–一',
    melody: ['A4:4 C5:4 A4:2', 'D5:2 B4:4 D5:4', 'C5:2 G4:2'],
    original: ['Am', 'G7', 'C'], revised: ['Dm7', 'G7', 'C']
  },
  {
    id: 'reharm-intro-slash', title: '转位低音与附加低音',
    melody: ['G5:2 E5:2', 'A4:4 C5:4 G5:2', 'G5:2 B4:2'],
    original: ['C', 'D7sus4', 'G'], revised: ['C/E', 'C/D', 'G']
  },
  {
    id: 'reharm-intro-tritone', title: 'G7 和 D♭7 的共同解决',
    melody: ['F5:2 F5:4 B4:4', 'C5:2 E5:2'],
    original: [{ symbol: 'G7', notes: ['G2', 'F3', 'B3', 'D4'] }, { symbol: 'C', notes: ['C3', 'E3', 'G3', 'C4'] }],
    revised: [{ symbol: 'Db7', notes: ['Db3', 'F3', 'Cb4', 'Ab4'] }, { symbol: 'C', notes: ['C3', 'E3', 'G3', 'C4'] }]
  }
]);
