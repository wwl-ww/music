import { mountScore } from '../../shared/formats/score.js';
import { renderHarmonyPattern } from '../../shared/formats/accompaniment-patterns.js';
import { majorKeys } from '../../shared/formats/scales.js';
import { displayPitch } from '../../shared/formats/pitch.js';
import { buildProgressionScore, describeHarmony, showChordDegree } from './progression-score.js';
import { rhythmCategories, harmonyCategories } from './categories.js';
import { entries as first } from './group-01.js';
import { entries as second } from './group-02.js';
import { entries as third } from './group-03.js';
import { entries as fourth } from './group-04.js';

const entries = new Map([...first, ...second, ...third, ...fourth].map(entry => [entry.id, entry]));
const labels = { pattern: '节奏型', harmony: '和弦进行', combined: '组合简谱' };
const url = new URL(location.href);
const search = url.searchParams;
const requestedMode = search.get('mode');
const mode = Object.hasOwn(labels, requestedMode) ? requestedMode
  : url.hash === '#workbench' || url.hash === '#combination-examples' || search.has('progression') ? 'combined' : 'pattern';
const root = document.querySelector('#workbench');
const form = root.querySelector('form');
const pattern = form.elements.namedItem('pattern');
const progression = form.elements.namedItem('progression');
const key = form.elements.namedItem('key');
const navigation = [...document.querySelectorAll('[data-mode]')];
const formerRange = /^#entries-(01|26|51|76)$/.exec(url.hash);
const initialPattern = entries.get(Number(search.get('pattern')))?.id ?? Number(formerRange?.[1] ?? 1);
const initialProgression = entries.get(Number(search.get('progression')))?.id ?? 1;
const initialKey = mode === 'combined' && !requestedMode ? entries.get(initialPattern).key : 'C';
const tempoUnits = { '8': '八分音符', '8.': '附点八分音符', '4.': '附点四分音符' };
const notationOptions = { showDynamics: false, justifyLastSystem: false };

key.append(...majorKeys.map(name => new Option(displayPitch(name), name)));
key.value = majorKeys.includes(search.get('key')) ? search.get('key') : initialKey;
if (!key.value) key.value = 'C';
root.dataset.view = mode;
root.querySelector('h2').textContent = labels[mode];
form.hidden = mode === 'pattern';
pattern.closest('label').hidden = mode !== 'combined';
progression.closest('label').hidden = mode !== 'combined';
root.querySelector('[data-combination]').hidden = mode !== 'combined';
root.querySelector('[data-composition-rule]').hidden = mode !== 'combined';
document.querySelector('[data-examples]').hidden = mode !== 'combined';
for (const disclosure of document.querySelectorAll('details[id]')) {
  if (`#${disclosure.id}` === url.hash) disclosure.open = true;
}

function progressionName({ bars }) {
  return bars.map(bar => bar ? bar.split(/\s+/).map(code => showChordDegree(code.split('@')[0])).join(' ') : '—').join(' ｜ ');
}

function meterCaption(shape) {
  const unit = tempoUnits[shape.tempoUnit] ?? '四分音符';
  return `${shape.meter} · ${unit} = ${shape.tempo}${shape.swing ? ' · Swing' : ''}${shape.tempoNote ? ` · ${shape.tempoNote}` : ''}`;
}

function viewURL(view, { category, patternId, progressionId, display, hash = '' } = {}) {
  const next = new URL(location.href);
  next.search = '';
  next.searchParams.set('mode', view);
  next.searchParams.set('pattern', patternId ?? (pattern.value || initialPattern));
  next.searchParams.set('progression', progressionId ?? (progression.value || initialProgression));
  next.searchParams.set('key', key.value);
  if (category) next.searchParams.set('category', category);
  if (display) next.searchParams.set('display', display);
  next.hash = hash;
  return next;
}

function updateNavigation(current = {}) {
  for (const link of navigation) {
    link.href = viewURL(link.dataset.mode, link.dataset.mode === mode ? current : {});
    if (link.dataset.mode === mode) link.setAttribute('aria-current', 'page');
  }
}

function fillSelect(control, groups, name, initial) {
  for (const group of groups) {
    const options = document.createElement('optgroup');
    options.label = group.label;
    options.append(...group.entries.map(id => new Option(name(entries.get(id)), id)));
    control.append(options);
  }
  control.value = initial;
}

function showCombination() {
  fillSelect(pattern, rhythmCategories, entry => entry.title, initialPattern);
  fillSelect(progression, harmonyCategories, progressionName, initialProgression);
  const figure = root.querySelector('[data-combination] figure');
  const title = root.querySelector('[data-example-title]');
  const caption = root.querySelector('[data-example-caption]');
  let player;
  function render() {
    const shape = entries.get(Number(pattern.value));
    const chords = entries.get(Number(progression.value));
    title.textContent = shape.title;
    caption.textContent = `${progressionName(chords)} · ${meterCaption(shape)} · 1 = ${displayPitch(key.value)}`;
    figure.setAttribute('aria-label', `${shape.title} · 双手简谱`);
    const notes = buildProgressionScore(shape, chords, key.value, 'combined');
    if (player) player.setNotes(notes);
    else player = mountScore(figure, { ...notationOptions, notes, notation: 'numbered' });
    updateNavigation();
  }
  form.addEventListener('change', () => {
    history.replaceState(history.state, '', viewURL(mode, { hash: location.hash }));
    render();
  });
  render();
}

function showCatalog() {
  const rhythms = mode === 'pattern';
  const groups = rhythms ? rhythmCategories : harmonyCategories;
  const linkedId = rhythms ? initialPattern : initialProgression;
  const hasLinkedEntry = search.has(rhythms ? 'pattern' : 'progression') || Boolean(formerRange);
  const category = groups.find(group => group.id === search.get('category'))
    ?? (hasLinkedEntry ? groups.find(group => group.entries.includes(linkedId)) : undefined) ?? groups[0];
  const options = rhythms ? ['numbered', 'staff'] : ['chart', 'numbered', 'staff'];
  let display = options.includes(search.get('display')) ? search.get('display') : options[0];
  const catalog = root.querySelector('[data-catalog]');
  const categoryNav = catalog.querySelector('.numbered-categories');
  const displayButtons = [...catalog.querySelectorAll('[data-display]')];
  if (!rhythms) catalog.querySelector('.numbered-catalog-tools').prepend(form);
  const container = catalog.querySelector('.numbered-cards');
  const audio = catalog.querySelector('.numbered-catalog-audio');
  const status = catalog.querySelector('[data-audio-status]');
  let player;
  let active;

  function setPlaying(card, state) {
    card.button.toggleAttribute('data-playing', state === 'playing');
    card.button.setAttribute('aria-busy', String(state === 'loading'));
    card.button.setAttribute('aria-label', `${state === 'idle' ? '播放' : '停止'} ${card.title}`);
  }

  function clearActive() {
    if (active) setPlaying(active, 'idle');
    active = undefined;
  }

  function stop() {
    player?.stop();
    clearActive();
  }

  function notesFor(card, notation) {
    const entry = card.entry;
    return buildProgressionScore(entry, entry, rhythms ? 'C' : key.value, mode, notation);
  }

  function play(card) {
    const previous = active;
    stop();
    status.textContent = '';
    if (previous === card) return;
    active = card;
    setPlaying(card, 'loading');
    const notes = notesFor(card, 'numbered');
    if (player) player.setNotes(notes);
    else player = mountScore(audio, {
      ...notationOptions, notes, notation: 'numbered', notationVisible: false, useWorkers: false,
      onPlaybackStateChange(playing) {
        if (!active) return;
        if (playing) setPlaying(active, 'playing');
        else if (active.button.hasAttribute('data-playing')) clearActive();
      },
      onPlaybackError() {
        stop();
        status.textContent = '暂时无法播放谱例。';
      }
    });
    player.play();
  }

  function makeCard(id) {
    const entry = entries.get(id);
    const article = document.createElement('article');
    article.className = 'numbered-card';
    article.id = `${mode}-${id}`;
    article.innerHTML = `<div class="numbered-card-heading">
      <button type="button" class="score-playback numbered-card-play"><span class="score-playback-icon" aria-hidden="true"></span></button>
      <div><h4></h4><p class="numbered-caption"></p></div>
    </div><div class="numbered-card-chart"></div><figure data-pending></figure><a class="numbered-card-combine">用于组合<span aria-hidden="true"> →</span></a>`;
    const title = rhythms ? entry.title : progressionName(entry);
    const heading = article.querySelector('h4');
    heading.textContent = title;
    const caption = article.querySelector('.numbered-caption');
    caption.hidden = !rhythms;
    if (rhythms) caption.textContent = meterCaption(entry);
    const card = {
      entry, article, title, button: article.querySelector('button'), chart: article.querySelector('.numbered-card-chart'),
      figure: article.querySelector('figure'), combine: article.querySelector('a')
    };
    card.figure.setAttribute('aria-label', title);
    setPlaying(card, 'idle');
    card.button.addEventListener('click', () => play(card));
    return card;
  }

  function showScore(card) {
    if (display === 'chart') return;
    const notes = notesFor(card, display);
    if (card.score) card.score.setNotes(notes, { notation: display });
    else {
      delete card.figure.dataset.pending;
      card.score = mountScore(card.figure, { ...notationOptions, notes, notation: display, audio: false, useWorkers: false });
    }
  }

  catalog.hidden = false;
  catalog.querySelector('[data-category-title]').textContent = category.label;
  catalog.querySelector('[data-category-description]').textContent = rhythms ? `${category.description} 各例固定用 C 和弦试听。` : category.description;
  const categoryLinks = groups.map(group => {
    const link = document.createElement('a');
    link.textContent = group.label;
    if (group === category) link.setAttribute('aria-current', 'page');
    categoryNav.append(link);
    return [group, link];
  });
  const cards = category.entries.map(makeCard);
  const cardByFigure = new Map(cards.map(card => [card.figure, card]));
  const observer = new IntersectionObserver(visible => {
    for (const { isIntersecting, target } of visible) {
      if (!isIntersecting || display === 'chart') continue;
      showScore(cardByFigure.get(target));
      observer.unobserve(target);
    }
  }, { rootMargin: '450px 0px' });
  container.append(...cards.map(card => card.article));

  function render() {
    for (const [group, link] of categoryLinks) link.href = viewURL(mode, { category: group.id, display });
    for (const button of displayButtons) {
      button.hidden = !options.includes(button.dataset.display);
      button.setAttribute('aria-pressed', String(display === button.dataset.display));
    }
    for (const card of cards) {
      const chartVisible = display === 'chart';
      card.figure.hidden = chartVisible;
      card.chart.hidden = !chartVisible;
      card.combine.href = viewURL('combined', rhythms ? { patternId: card.entry.id } : { progressionId: card.entry.id });
      card.combine.setAttribute('aria-label', `将 ${card.title} 用于组合`);
      if (chartVisible) renderHarmonyPattern(card.chart, describeHarmony(card.entry, key.value));
      else if (card.score) showScore(card);
      else observer.observe(card.figure);
    }
    updateNavigation({ category: category.id, display });
  }

  function saveAndRender() {
    stop();
    history.replaceState(history.state, '', viewURL(mode, { category: category.id, display }));
    render();
  }
  form.addEventListener('change', saveAndRender);
  for (const button of displayButtons) button.addEventListener('click', () => {
    if (display === button.dataset.display) return;
    display = button.dataset.display;
    saveAndRender();
  });
  render();
  if (!search.has('category') && hasLinkedEntry) {
    requestAnimationFrame(() => cards.find(card => card.entry.id === linkedId)?.article.scrollIntoView());
  }
}

form.addEventListener('submit', event => event.preventDefault());
if (mode === 'combined') showCombination();
else showCatalog();
