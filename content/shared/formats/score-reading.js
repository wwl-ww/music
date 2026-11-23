import { importer, io, model, Settings } from '@coderline/alphatab';
import { encodeScore } from './four-part.js';

const letterNames = { 0: 'C', 2: 'D', 4: 'E', 5: 'F', 7: 'G', 9: 'A', 11: 'B' };
const { ForceSharp, ForceDoubleSharp, ForceFlat, ForceDoubleFlat } = model.NoteAccidentalMode;
const accidentals = {
  [ForceSharp]: [1, '♯'],
  [ForceDoubleSharp]: [2, '𝄪'],
  [ForceFlat]: [-1, '♭'],
  [ForceDoubleFlat]: [-2, '𝄫']
};
let readerCount = 0;

const chordNames = new Map([
  ['4,7', '大三和弦'], ['3,7', '小三和弦'], ['3,6', '减三和弦'], ['4,8', '增三和弦'],
  ['4,7,11', '大七和弦'], ['4,7,10', '大小七和弦'], ['3,7,10', '小七和弦'],
  ['3,7,11', '小大七和弦'], ['3,6,10', '半减七和弦'], ['3,6,9', '减七和弦'],
  ['4,8,11', '增大七和弦'], ['4,8,10', '增小七和弦']
]);
const inversions = ['原位', '第一转位', '第二转位', '第三转位'];
const chordMembers = ['根音', '三音', '五音', '七音'];

function noteName(note) {
  const pitch = note.realValue;
  const [shift, symbol] = accidentals[note.accidentalMode] ?? [0, ''];
  const natural = pitch - shift;
  const letter = letterNames[natural % 12];
  if (letter) return letter + symbol;
  return `${letterNames[(pitch - 1) % 12]}♯`;
}

function chordAt(sounding) {
  // The sounding pitches describe the voicing. Tonal function can also depend on context.
  if (sounding.some(beat => beat.text?.trim() === '+')) return null;
  const notes = sounding.flatMap(beat => beat.notes).sort((a, b) => a.realValue - b.realValue);
  const pitches = notes.map(note => ({ name: noteName(note), midi: note.realValue }));
  const distinct = [...new Map(pitches.map(pitch => [pitch.name, pitch])).values()];
  if (distinct.length < 3 || distinct.length > 4) return null;
  const bass = pitches[0].name;

  for (const root of distinct) {
    const rootLetter = 'CDEFGAB'.indexOf(root.name[0]);
    const members = [root];
    for (const pitch of distinct) {
      const degree = ('CDEFGAB'.indexOf(pitch.name[0]) - rootLetter + 7) % 7;
      if (degree > 0 && degree % 2 === 0) members[degree / 2] = pitch;
    }
    if (Array.from({ length: distinct.length }, (_, index) => members[index]).some(member => !member)) continue;
    const intervals = members.slice(1).map(member => (member.midi - root.midi + 120) % 12);
    const name = chordNames.get(intervals.join(','));
    if (!name) continue;
    const inversion = members.findIndex(member => member.name === bass);
    return {
      name: `${root.name} ${name}`,
      inversion: inversions[inversion],
      bass: `最低音 ${bass} 是${chordMembers[inversion]}`,
      bassMidi: pitches[0].midi,
      members: members.map(member => member.name)
    };
  }
  return null;
}

function beatsIn(staff, voiceIndex) {
  return staff.bars.flatMap(bar => (bar.voices[voiceIndex]?.beats ?? []).filter(beat => !beat.isEmpty));
}

function readingSteps(display, material) {
  let track = display;
  if (material.displayPhrase) {
    // Some examples engrave the accompaniment on one stem. Use the four written parts for the labels.
    const parser = new importer.AlphaTexImporter();
    const tex = encodeScore({ ...material, displayPhrase: undefined }, ['score'], 90, 'piano');
    parser.init(io.ByteBuffer.fromString(tex), new Settings());
    track = parser.readScore().tracks[0];
  }

  const parts = track.staves.flatMap(staff => [beatsIn(staff, 0), beatsIn(staff, 1)]);
  const allBeats = parts.flat();
  const visible = new Map();
  for (const staff of display.staves) {
    for (const beat of [...beatsIn(staff, 0), ...beatsIn(staff, 1)]) {
      const tick = beat.absolutePlaybackStart;
      if (!visible.has(tick)) visible.set(tick, []);
      visible.get(tick).push(beat);
    }
  }

  const ticks = [...new Set(allBeats.map(beat => beat.absolutePlaybackStart))].sort((a, b) => a - b);
  return ticks.map(tick => {
    const written = visible.get(tick) ?? [];
    const beat = written[0] ?? allBeats.find(part => part.absolutePlaybackStart === tick);
    const sounding = parts.map(part => part.findLast(noteBeat => noteBeat.absolutePlaybackStart <= tick
      && tick < noteBeat.absolutePlaybackStart + noteBeat.playbackDuration)).filter(Boolean);
    return { tick, beat, written, chord: chordAt(sounding), rest: sounding.every(part => part.isRest) };
  });
}

export function mountScoreReading(figure, notation, api, stopPlayback) {
  const toggle = figure.querySelector('.score-reading-toggle');
  const panel = document.createElement('div');
  const marker = document.createElement('div');
  const labels = document.createElement('div');
  panel.className = 'score-reading';
  panel.id = `score-reading-${++readerCount}`;
  panel.hidden = true;
  panel.innerHTML = `
    <div class="score-reading-nav">
      <button type="button" class="score-reading-prev">上一处</button>
      <span class="score-reading-position" aria-live="polite" aria-atomic="true"></span>
      <button type="button" class="score-reading-next">下一处</button>
    </div>
    <div class="score-reading-chord">
      <strong></strong><span class="score-reading-inversion"></span><span class="score-reading-bass"></span>
      <span class="score-reading-members"></span>
    </div>`;
  toggle.setAttribute('aria-controls', panel.id);
  notation.before(panel);
  marker.className = 'score-reading-marker';
  marker.hidden = true;
  marker.setAttribute('aria-hidden', 'true');
  labels.className = 'score-reading-labels';
  labels.setAttribute('aria-hidden', 'true');
  notation.append(marker, labels);

  const prev = panel.querySelector('.score-reading-prev');
  const next = panel.querySelector('.score-reading-next');
  const position = panel.querySelector('.score-reading-position');
  const chordName = panel.querySelector('strong');
  const inversion = panel.querySelector('.score-reading-inversion');
  const bass = panel.querySelector('.score-reading-bass');
  const members = panel.querySelector('.score-reading-members');
  let material;
  let display;
  let steps = [];
  let current = 0;
  let following = false;
  let available = false;

  function renderMarker() {
    const step = steps[current];
    const bounds = panel.hidden || !step ? null : api.boundsLookup?.findBeat(step.beat);
    // The renderer can still hold bounds from the previous version of this score.
    marker.hidden = !bounds || bounds.beat !== step.beat;
    labels.replaceChildren();
    if (marker.hidden) return;
    const bar = bounds.barBounds.masterBarBounds.lineAlignedBounds;
    marker.style.left = `${bounds.onNotesX}px`;
    marker.style.top = `${bar.y - 4}px`;
    marker.style.height = `${bar.h + 8}px`;

    const heads = step.written.flatMap(beat => (api.boundsLookup.findBeat(beat)?.notes ?? []).map(note => ({
      name: noteName(note.note),
      midi: note.note.realValue,
      box: note.noteHeadBounds,
      right: beat.voice.index === 1
    }))).sort((a, b) => a.box.y - b.box.y);
    let leftY = -Infinity;
    let rightY = -Infinity;
    for (const { name, midi, box, right } of heads) {
      const y = box.y + box.h / 2;
      const onRight = right ? y - rightY >= 14 || y - leftY < 14 : y - leftY < 14 && y - rightY >= 14;
      const label = document.createElement('span');
      label.className = 'score-reading-label';
      label.textContent = name;
      label.dataset.side = onRight ? 'right' : 'left';
      if (midi === step.chord?.bassMidi) label.dataset.bass = '';
      const leftGap = name.length > 1 ? 17 : 7;
      label.style.left = `${onRight ? box.x + box.w + 7 : box.x - leftGap}px`;
      label.style.top = `${Math.max(y, (onRight ? rightY : leftY) + 14)}px`;
      if (onRight) rightY = Math.max(y, rightY + 14);
      else leftY = Math.max(y, leftY + 14);
      labels.append(label);
    }
  }

  function renderStep() {
    const step = steps[current];
    prev.disabled = !step || current === 0;
    next.disabled = !step || current === steps.length - 1;
    position.textContent = step ? `第 ${step.beat.voice.bar.index + 1} 小节 · ${current + 1}/${steps.length}` : '正在加载…';
    const chord = step?.chord;
    chordName.textContent = chord?.name ?? (step ? (step.rest ? '休止' : '当前音组') : '');
    inversion.textContent = chord?.inversion ?? '';
    bass.textContent = chord?.bass ?? '';
    members.textContent = chord ? `三度排列 ${chord.members.join('–')}` : '';
    renderMarker();
  }

  function openReader(open) {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (open && display && !steps.length) steps = readingSteps(display, material);
    renderStep();
    if (open && following) followPlayback({ currentTick: api.tickPosition });
  }

  function move(offset) {
    if (following) stopPlayback();
    current += offset;
    renderStep();
    if (!marker.hidden && notation.scrollWidth > notation.clientWidth) {
      const x = marker.offsetLeft;
      if (x < notation.scrollLeft + 12 || x > notation.scrollLeft + notation.clientWidth - 12) {
        notation.scrollLeft = x - notation.clientWidth / 2;
      }
    }
  }

  function followPlayback({ currentTick }) {
    if (!following || panel.hidden) return;
    const step = Math.max(0, steps.findLastIndex(({ tick }) => tick <= currentTick));
    if (step === current) return;
    current = step;
    renderStep();
  }

  toggle.addEventListener('click', () => openReader(panel.hidden));
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  api.beatMouseUp.on(beat => {
    if (panel.hidden || following || !beat) return;
    const selected = steps.findIndex(step => step.tick === beat.absolutePlaybackStart);
    if (selected < 0 || selected === current) return;
    current = selected;
    renderStep();
  });
  api.playerPositionChanged.on(followPlayback);

  return {
    setMaterial(nextMaterial, fourPart) {
      if (nextMaterial !== material) current = 0;
      material = nextMaterial;
      available = fourPart;
      display = null;
      steps = [];
      toggle.hidden = !available;
      toggle.disabled = true;
      if (!available && !panel.hidden) openReader(false);
      else if (!panel.hidden) renderStep();
    },
    load(score) {
      if (!available) return;
      display = score.tracks[0];
      toggle.disabled = false;
      if (panel.hidden) return;
      steps = readingSteps(display, material);
      current = Math.min(current, Math.max(0, steps.length - 1));
      renderStep();
    },
    setPlaying(playing) {
      following = playing;
      position.setAttribute('aria-live', playing ? 'off' : 'polite');
    },
    preparePlayback() {
      if (!panel.hidden && steps[current]) api.tickPosition = steps[current].tick;
    },
    renderMarker
  };
}
