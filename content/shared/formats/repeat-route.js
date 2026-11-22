import { enableScrollFrame } from './readable-layout.js';

const symbols = { segno: '\uE047', coda: '\uE048' };
const signNames = { segno: 'Segno', coda: 'Coda' };

const staffTop = 21;
const staffBottom = 45;
const barWidth = 76;

function barlineMarkup(x, start, end) {
  const stroke = (offset, width) =>
    `<rect x="${x + offset - width / 2}" y="${staffTop}" width="${width}" height="${staffBottom - staffTop}" fill="currentColor"/>`;
  const repeatSide = (direction) => stroke(4 * direction, 1)
    + [30, 36].map(y => `<circle cx="${x + 8 * direction}" cy="${y}" r="1.25" fill="currentColor"/>`).join('');

  return stroke(0, start || end ? 3 : 1)
    + (end ? repeatSide(-1) : '')
    + (start ? repeatSide(1) : '');
}

function staffMarkup(bars) {
  const width = barWidth * bars.length;
  const lines = [staffTop, 27, 33, 39, staffBottom].map(y => `M4 ${y}H${width - 4}`).join(' ');
  const barlines = bars.map(({ start }, index) =>
    barlineMarkup(index * barWidth + 4, start, bars[index - 1]?.end)
  ).join('') + barlineMarkup(width - 4, false, bars.at(-1).end);
  const tiles = bars.map(({ name, sign, label, ending, span = 1 }, index) => {
    const x = index * barWidth;
    const header = sign ? `<text class="route-symbol" x="35" y="15">${symbols[sign]}</text>` : '';
    const bracket = ending ? `<path d="M5 17v-7h${76 * span - 10}"/><text class="route-label" x="10" y="9">${ending}.</text>` : '';
    const instruction = label?.split('|').map((line, row) =>
      `<text class="route-label" x="38" y="${label === '×4' ? 17 : 61 + 12 * row}" text-anchor="middle">${line}</text>`).join('') ?? '';
    return `<g data-bar="${index}" transform="translate(${x} 0)">
      <rect class="route-bar-highlight" x="4" y="${staffTop}" width="${index === bars.length - 1 ? barWidth - 8 : barWidth}" height="${staffBottom - staffTop}"/>
      ${header}${bracket}
      <text class="route-bar-name" x="38" y="38" text-anchor="middle">${name}</text>
      ${instruction}
    </g>`;
  }).join('');
  const notation = bars.map(({ name, start, end, sign, label, ending }) =>
    [name, start && '起始反复线', end && '终止反复线', sign && signNames[sign], ending && `第 ${ending} 房`, label?.replace('|', ' ')].filter(Boolean).join(' ')).join('，');
  return `<svg class="inline-staff route-staff" style="--staff-min-width: ${bars.length * 3.7}rem" viewBox="0 0 ${width} 77" role="img" aria-label="谱面顺序：${notation}">
    <path class="inline-staff-lines" d="${lines}"/>${tiles}<g class="route-barlines">${barlines}</g>
  </svg>`;
}

export function mountRepeatRoute(container, routes) {
  const select = container.querySelector('select');
  const staff = container.querySelector('[data-route-staff]');
  enableScrollFrame(staff, '演奏路线五线谱');
  const sequence = container.querySelector('ol');
  const status = container.querySelector('output');
  const back = container.querySelector('[data-route-back]');
  const next = container.querySelector('[data-route-next]');
  const reset = container.querySelector('[data-route-reset]');
  let route;
  let step;

  function show() {
    const visited = route.steps.slice(0, step + 1);
    const current = visited.at(-1);
    staff.querySelectorAll('[data-bar]').forEach((bar, index) => {
      bar.classList.toggle('current', index === current);
    });
    const bar = staff.querySelector('.current .route-bar-highlight').getBoundingClientRect();
    const frame = staff.getBoundingClientRect();
    if (bar.right > frame.right) staff.scrollLeft += Math.ceil(bar.right - frame.right);
    else if (bar.left < frame.left) staff.scrollLeft -= Math.ceil(frame.left - bar.left);
    sequence.replaceChildren(...visited.map((index, visit) => {
      const item = document.createElement('li');
      item.textContent = route.bars[index].name;
      if (visit === step) item.setAttribute('aria-current', 'step');
      return item;
    }));
    status.textContent = route.cues[step] ?? `第 ${step + 1} 步：${route.bars[current].name}`;
    back.disabled = step === 0;
    reset.disabled = step === 0;
    next.disabled = step === route.steps.length - 1;
  }

  function load() {
    route = routes[select.value];
    staff.innerHTML = staffMarkup(route.bars);
    staff.scrollLeft = 0;
    step = 0;
    show();
  }

  select.addEventListener('change', load);
  back.addEventListener('click', () => { step--; show(); });
  next.addEventListener('click', () => { step++; show(); });
  reset.addEventListener('click', load);
  load();
}

