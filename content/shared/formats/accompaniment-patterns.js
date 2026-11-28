const rhythmLabels = { attack: '起音', hold: '延音', rest: '休止' };

function element(tag, style, content) {
  const node = document.createElement(tag);
  node.className = style;
  if (content) node.textContent = content;
  return node;
}

function measure(index, beats) {
  const bar = element('div', 'pattern-measure');
  bar.style.setProperty('--pattern-beats', beats);
  const number = element('p', 'pattern-bar-number', `第 ${index + 1} 小节`);
  const ruler = element('div', 'pattern-ruler');
  ruler.setAttribute('aria-hidden', 'true');
  for (let beat = 1; beat <= beats; beat++) ruler.append(element('span', '', String(beat)));
  bar.append(number, ruler);
  return bar;
}

function roleDescription({ name, octave = 0, description }) {
  return (description ?? name) + (octave ? `${octave > 0 ? '高' : '低'}${Math.abs(octave)}个八度` : '');
}

function renderRole({ name, octave = 0 }) {
  const note = element('span', 'rhythm-role', name);
  if (octave) {
    const dots = element('span', `rhythm-octaves ${octave > 0 ? 'rhythm-octaves-above' : 'rhythm-octaves-below'}`);
    for (let i = 0; i < Math.abs(octave); i++) dots.append(element('i', ''));
    note.append(dots);
  }
  return note;
}

export function renderRhythmPattern(host, { beats, measures }) {
  host.classList.add('pattern-measures', 'rhythm-pattern');
  // Keep simultaneous roles legible even in short subdivisions. Only the chart scrolls.
  const width = Math.max(0, ...measures.flatMap(lanes => lanes.flatMap(({ events }) => events.map(({ start, end, roles = [] }) => {
    if (!roles.length) return 0;
    const labels = roles.reduce((sum, { name }) => sum + name.length * 0.82 + 0.08, 0);
    const gaps = (roles.length - 1) * 0.12 + 0.12;
    return (labels + gaps) / (end - start);
  }))));
  host.style.setProperty('--rhythm-track-min', `${width.toFixed(2)}rem`);
  host.replaceChildren(...measures.map((lanes, index) => {
    const bar = measure(index, beats);
    for (const { label, events } of lanes) {
      const lane = element('div', 'rhythm-lane');
      const track = element('span', 'pattern-track rhythm-track');
      track.setAttribute('role', 'img');
      const parts = events.map(({ start, end, type, roles = [] }) => {
        const part = element('span', 'rhythm-part');
        part.dataset.type = type;
        part.style.insetInlineStart = `${start * 100}%`;
        part.style.width = `${(end - start) * 100}%`;
        const names = roles.map(roleDescription).join('、');
        part.title = `${names || rhythmLabels[type]} · ${Number(((end - start) * beats).toFixed(2))} 拍`;
        part.append(...roles.map(renderRole));
        return part;
      });
      track.setAttribute('aria-label', `${label}，${parts.map(part => part.title).join('，')}`);
      track.append(...parts);
      lane.append(element('span', 'rhythm-lane-name', label), track);
      bar.append(lane);
    }
    return bar;
  }));
}

export function renderHarmonyPattern(host, measures, beats = 4, { showBass = false } = {}) {
  host.classList.add('pattern-measures', 'harmony-pattern');
  host.replaceChildren(...measures.map((events, index) => {
    const bar = measure(index, beats);
    const flow = element('div', 'pattern-track harmony-flow');
    flow.style.gridTemplateColumns = events.map(({ span }) => `minmax(0, ${span}fr)`).join(' ');
    for (const { degree, chord, bass, beat, inversion, continued } of events) {
      const event = element('div', 'harmony-event');
      const name = inversion ? `${chord}/${bass}` : chord;
      event.toggleAttribute('data-hold', Boolean(continued));
      event.title = `${continued ? '延续' : `第 ${beat} 拍`} · ${degree} · ${name}`;
      event.setAttribute('role', 'group');
      event.append(element('strong', 'harmony-degree', continued ? '—' : degree), element('span', 'harmony-chord', name));
      if (showBass && bass) {
        event.append(element('span', 'harmony-bass', `低音 ${bass}`));
        event.title += ` · 低音 ${bass}`;
      }
      event.setAttribute('aria-label', event.title);
      flow.append(event);
    }
    bar.append(flow);
    return bar;
  }));
}
