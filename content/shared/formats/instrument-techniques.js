import { displayPitch } from './pitch.js';

const holeStates = { open: '开孔', half: '半孔', closed: '闭孔' };

function append(parent, tag, text = '', className = '') {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  parent.append(node);
  return node;
}

function holeMark(parent, state) {
  const mark = append(parent, 'span', '', 'wind-hole-mark');
  mark.dataset.state = state;
  mark.setAttribute('aria-hidden', 'true');
}

export function mountWindFingering(figure, holeLabels) {
  figure.classList.add('instrument-technique', 'wind-fingering');
  const table = append(figure, 'table', '', 'wind-fingering-table');
  table.setAttribute('aria-label', figure.querySelector('figcaption').textContent);
  const header = table.createTHead().insertRow();
  for (const text of ['实音', '唱名']) append(header, 'th', text).scope = 'col';
  const fingeringHeading = append(header, 'th', '指孔', 'wind-fingering-column');
  fingeringHeading.scope = 'col';
  const numbering = append(fingeringHeading, 'span', '', 'wind-hole-set');
  for (const label of holeLabels) append(numbering, 'span', label);
  const body = table.createTBody();
  const legend = append(figure, 'ul', '', 'wind-hole-legend');
  for (const [state, label] of Object.entries(holeStates)) {
    const item = append(legend, 'li');
    holeMark(item, state);
    append(item, 'span', label);
  }

  function update(notes) {
    body.replaceChildren();
    for (const { note, pitch, syllable, holes, breath } of notes) {
      const row = body.insertRow();
      row.dataset.pitch = pitch;
      const heading = append(row, 'th', displayPitch(note));
      heading.scope = 'row';
      if (breath) append(heading, 'small', breath);
      row.insertCell().textContent = syllable;
      const marks = append(row.insertCell(), 'span', '', 'wind-hole-set');
      marks.setAttribute('role', 'img');
      marks.setAttribute('aria-label', holes.map((state, index) => `${holeLabels[index]}：${holeStates[state]}`).join('，'));
      for (const state of holes) holeMark(marks, state);
    }
  }

  function markPitches(pitches) {
    for (const row of body.rows) {
      row.toggleAttribute('data-playing', pitches.includes(Number(row.dataset.pitch)));
    }
  }

  return { update, markPitches };
}

export function mountStringSounds(figure, examples) {
  figure.classList.add('instrument-technique', 'string-sounds');
  const list = append(figure, 'ul', '', 'string-sound-list');
  for (const { technique, position, attack, arrival, description } of examples) {
    const row = append(list, 'li');
    const source = append(row, 'div', '', 'string-sound-source');
    append(source, 'strong', technique);
    append(source, 'small', position);
    const sound = append(row, 'div', '', 'string-sound-pitches');
    const first = displayPitch(attack);
    const last = arrival && displayPitch(arrival);
    append(sound, 'small', last ? '起音至实响' : '实响');
    const path = append(sound, 'span', first, 'string-sound-path');
    if (last) {
      const arrow = append(path, 'span', ' → ', 'string-sound-arrow');
      arrow.setAttribute('aria-label', '滑向');
      append(path, 'span', last);
    }
    append(row, 'p', description);
  }
}
