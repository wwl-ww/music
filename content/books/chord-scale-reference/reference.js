import { mountScore } from '../../shared/formats/score.js';
import { pianoKeysMarkup } from '../../shared/formats/piano.js';
import { chordBassRoles, chordPositions, invertChordNotes } from '../../shared/formats/chords.js';
import { chordTypes } from './chord-data.js';
import { scaleTypes } from './scale-data.js';
import { displayPitch, referenceNotes, referenceScore, tonicGroups, tonics } from './reference-pitches.js';

const catalog = document.querySelector('[data-reference]');
const scale = catalog.dataset.reference === 'scales';
const types = scale ? scaleTypes : chordTypes;
const typeById = new Map(types.map(type => [type.id, type]));
const controls = catalog.querySelector('form');
const root = controls.elements.root;
const query = controls.elements.query;
const family = controls.elements.family;
const direction = catalog.querySelector('[name="direction"]');
const inversion = catalog.querySelector('[name="inversion"]');
const bass = catalog.querySelector('[data-reference-bass]');
const keyLegend = catalog.querySelector('[data-reference-key-legend]');
const list = catalog.querySelector('[data-reference-list]');
const status = catalog.querySelector('[data-reference-status]');
const result = catalog.querySelector('[data-reference-result]');
const title = catalog.querySelector('[data-reference-title]');
const category = catalog.querySelector('[data-reference-category]');
const noteList = catalog.querySelector('[data-reference-notes]');
const note = catalog.querySelector('[data-reference-note]');
const staff = catalog.querySelector('[data-reference-score]');
const keyboard = catalog.querySelector('[data-reference-keyboard]');
let selected;
let inversionIndex = 0;
let score;
let renderedKey;
let keyboardBase;
let keys = new Map();
let playing = [];
let items = new Map();

for (const group of tonicGroups) {
  for (const tonic of group) {
    const equivalent = group.find(other => other !== tonic);
    root.add(new Option(equivalent ? `${displayPitch(tonic)}（=${displayPitch(equivalent)}）` : tonic, tonic));
  }
}
const families = type => [type.family, ...(type.also ?? [])];
for (const name of new Set(types.flatMap(families))) family.add(new Option(name, name));
const positionsFor = type => type.family === '三和弦' || type.family === '七和弦' ? type.degrees.length : 0;
if (inversion) chordPositions.forEach((label, index) => inversion.add(new Option(label, index)));

function normalize(text) {
  return text.normalize('NFKC')
    .replaceAll('♭', 'b').replaceAll('♯', '#')
    .replace(/[Δ△∆]/g, 'maj')
    .replace(/^[−-](?=\d|$)/g, 'm')
    .replace(/M(?=\d|\()/g, 'maj')
    .toLowerCase()
    .replace(/[\s-]/g, '');
}

const searchTerms = new Map(types.map(type => [
  type.id, [type.name, type.suffix, type.id, ...families(type), ...(type.aliases ?? [])].filter(Boolean).map(normalize)
]));

function searchQuery(text) {
  const match = text.trim().match(/^([a-gA-G])([#♯b♭]?)(.*)$/);
  if (!match) return { term: normalize(text) };
  const [, letter, accidental, tail] = match;
  const tonic = letter.toUpperCase() + accidental.replace('♯', '#').replace('♭', 'b');
  const term = normalize(tail.trim());
  const exactTail = types.some(type => searchTerms.get(type.id).includes(term));
  const explicitRoot = !tail || exactTail || /^(\s|[0-9(°+Δ△∆ø−\p{Script=Han}]|-(?=\d|$)|(?:m(?:aj|in)?|dim|aug|sus|add)(?:[0-9(]|$))/iu.test(tail);
  if (!explicitRoot || !tonics.includes(tonic)) return { term: normalize(text) };
  return { tonic, term, tail: tail.trim(), rootOnly: !term };
}

function entryTitle(type) {
  const name = displayPitch(root.value);
  return scale ? `${name} ${type.name}` : name + type.suffix;
}

function locationFor(type) {
  const params = new URLSearchParams({ root: root.value, type: type.id });
  if (scale && family.value) params.set('family', family.value);
  if (direction?.value === 'down') params.set('direction', 'down');
  if (type === selected && inversionIndex) params.set('inversion', inversionIndex);
  return '?' + params;
}

function restoreLocation() {
  const params = new URLSearchParams(location.search);
  const tonic = params.get('root');
  root.value = tonics.includes(tonic) ? tonic : 'C';
  if (direction) direction.value = params.get('direction') === 'down' ? 'down' : 'up';
  query.value = '';
  const requestedFamily = params.get('family');
  family.value = [...family.options].some(option => option.value === requestedFamily) ? requestedFamily : '';
  selected = typeById.get(params.get('type')) ?? types[0];
  const requestedInversion = Number(params.get('inversion'));
  inversionIndex = Number.isInteger(requestedInversion) && requestedInversion > 0 && requestedInversion < positionsFor(selected)
    ? requestedInversion : 0;
  update();
}

function setPlaying(pitches) {
  for (const key of playing) key.classList.remove('keyboard-playing');
  playing = pitches.map(pitch => keys.get(pitch - keyboardBase)).filter(Boolean);
  for (const key of playing) key.classList.add('keyboard-playing');
}

function show(type) {
  const currentKey = `${root.value}/${type.id}/${direction?.value ?? ''}/${inversionIndex}`;
  if (renderedKey === currentKey) return;
  renderedKey = currentKey;
  const sourceNotes = referenceNotes(root.value, type, direction?.value);
  const notes = inversionIndex ? invertChordNotes(sourceNotes, inversionIndex) : sourceNotes;
  const bassName = displayPitch(notes[0].name);
  title.textContent = entryTitle(type) + (inversionIndex ? '/' + bassName : '');
  category.textContent = scale ? type.family + (type.supplemental ? ' · 补充' : '') : type.name;
  if (inversion) {
    const positions = positionsFor(type);
    inversion.parentElement.hidden = !positions;
    for (const [index, option] of [...inversion.options].entries()) {
      option.hidden = index >= positions;
      option.disabled = option.hidden;
    }
    inversion.value = inversionIndex;
    bass.hidden = !positions;
    bass.textContent = positions ? `低音 ${bassName}（${chordBassRoles[inversionIndex]}）` : '';
    keyLegend.textContent = inversionIndex ? ' · 圆点为根音，菱形为低音' : '';
  }
  const gong = notes.find(({ degree }) => degree === type.gongDegree);
  note.textContent = (type.note ?? '') + (gong ? '宫音为 ' + displayPitch(gong.name) + '。' : '');
  note.hidden = !note.textContent;
  noteList.replaceChildren(...notes.map(({ name, degree }) => {
    const item = document.createElement('div');
    const label = document.createElement('dt');
    const value = document.createElement('dd');
    label.textContent = degree;
    value.textContent = displayPitch(name);
    item.append(label, value);
    return item;
  }));

  const pitches = notes.map(({ pitch }) => pitch);
  const octaves = Math.floor(Math.max(...pitches) / 12) - Math.floor(Math.min(...pitches) / 12) + 1;
  keyboardBase = Math.floor(Math.min(...pitches) / 12) * 12;
  const marked = [...new Map(notes.map(({ pitch, degree }) => [pitch, degree]))].map(([pitch, degree]) => {
    const isBass = inversionIndex && pitch === notes[0].pitch;
    return [pitch - keyboardBase, isBass ? 'keyboard-end' : 'keyboard-highlight', isBass ? 'end' : degree === '1' ? 'start' : ''];
  });
  setPlaying([]);
  keyboard.innerHTML = pianoKeysMarkup(marked, octaves);
  keyboard.style.setProperty('--reference-keyboard-width', Math.min(octaves * 15, 34) + 'rem');
  keys = new Map([...keyboard.querySelectorAll('[data-pitch]')].map(key => [Number(key.dataset.pitch), key]));
  staff.setAttribute('aria-label', `${title.textContent}的五线谱`);
  const notation = referenceScore(notes, scale);
  if (score) score.setNotes(notation);
  else {
    score = mountScore(staff, { notes: notation, notation: 'staff', tempo: 84, onPitchesChange: setPlaying, showDynamics: false });
    catalog.querySelector('[data-reference-playback]').append(staff.querySelector('.score-controls'));
  }
}

function select(type, historyMethod) {
  if (type !== selected) inversionIndex = 0;
  selected = type;
  for (const [id, link] of items) {
    link.href = locationFor(typeById.get(id));
    if (id === type.id) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
  show(type);
  if (historyMethod) history[historyMethod](null, '', locationFor(type));
}

function update({ bestMatch = false, historyMethod } = {}) {
  const { term, rootOnly } = searchQuery(query.value);
  const matches = types.filter(type => (!family.value || families(type).includes(family.value))
    && (!term || searchTerms.get(type.id).some(key => key.includes(term))));
  const exact = matches.find(type => searchTerms.get(type.id).includes(term));
  status.hidden = Boolean(matches.length);
  result.hidden = !matches.length;
  if (!matches.length) score?.stop();
  items = new Map(matches.map(type => {
    const link = document.createElement('a');
    link.dataset.entry = type.id;
    const symbol = document.createElement('strong');
    symbol.textContent = scale ? type.name : entryTitle(type);
    link.append(symbol);
    if (!scale) {
      const name = document.createElement('span');
      name.textContent = type.name;
      link.append(name);
    }
    return [type.id, link];
  }));
  list.replaceChildren(...[...items.values()].map(link => {
    const item = document.createElement('li');
    item.append(link);
    return item;
  }));
  if (!matches.length) return;
  const next = bestMatch && rootOnly
    ? matches[0]
    : (bestMatch && exact) || (matches.includes(selected) && selected) || matches[0];
  select(next, historyMethod);
  const marked = list.querySelector('[aria-current]');
  if (marked.offsetTop < list.scrollTop) list.scrollTop = marked.offsetTop;
  const bottom = marked.offsetTop + marked.offsetHeight;
  if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
}

query.addEventListener('input', event => {
  if (event.isComposing) return;
  const { tonic } = searchQuery(query.value);
  if (tonic) root.value = tonic;
  update({ bestMatch: true, historyMethod: 'replaceState' });
});
query.addEventListener('compositionend', () => query.dispatchEvent(new Event('input')));
root.addEventListener('change', () => {
  const { tonic, tail } = searchQuery(query.value);
  if (tonic) query.value = tail;
  update({ historyMethod: 'pushState' });
});
family.addEventListener('change', () => update({ historyMethod: 'replaceState' }));
direction?.addEventListener('change', () => update({ historyMethod: 'pushState' }));
inversion?.addEventListener('change', () => {
  inversionIndex = Number(inversion.value);
  select(selected, 'pushState');
});
controls.addEventListener('submit', event => event.preventDefault());
list.addEventListener('click', event => {
  const link = event.target.closest('[data-entry]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  select(typeById.get(link.dataset.entry), 'pushState');
});
window.addEventListener('popstate', restoreLocation);
restoreLocation();
