export function enableScrollFrame(frame, label, { vertical = false } = {}) {
  frame.classList.add('scroll-frame');
  const hint = document.createElement('small');
  hint.className = 'scroll-frame-hint';
  hint.textContent = '横向滚动查看';
  hint.setAttribute('aria-hidden', 'true');
  frame.after(hint);
  const update = () => {
    const horizontalOverflow = frame.clientWidth > 0 && frame.scrollWidth > frame.clientWidth + 1;
    const verticalOverflow = vertical && frame.clientHeight > 0 && frame.scrollHeight > frame.clientHeight + 1;
    const overflow = horizontalOverflow || verticalOverflow;
    frame.classList.toggle('is-scrollable', overflow);
    hint.hidden = !overflow;
    if (overflow) {
      const direction = horizontalOverflow && verticalOverflow ? '' : horizontalOverflow ? '横向' : '纵向';
      hint.textContent = direction + '滚动查看';
      frame.tabIndex = 0;
      frame.setAttribute('role', 'region');
      frame.setAttribute('aria-label', `${label}，可${direction}滚动`);
    } else {
      frame.removeAttribute('tabindex');
      frame.removeAttribute('role');
      frame.removeAttribute('aria-label');
    }
  };
  const observer = new ResizeObserver(update);
  function observeContents() {
    observer.disconnect();
    observer.observe(frame);
    for (const child of frame.children) observer.observe(child);
    update();
  }
  new MutationObserver(observeContents).observe(frame, { childList: true });
  observeContents();
  return update;
}

function frameContent(content, label, kind) {
  const frame = document.createElement('div');
  frame.className = kind;
  content.before(frame);
  frame.append(content);
  enableScrollFrame(frame, label);
}

export function prepareReadingContent(main) {
  for (const table of main.querySelectorAll('.lesson-table')) {
    const columns = [...table.rows[0]?.cells ?? []].reduce((count, cell) => count + cell.colSpan, 0);
    if (columns >= 4) table.style.setProperty('--table-min-width', `${columns * 4.75}rem`);
    frameContent(table, table.caption?.textContent.trim() || '对照表', 'table-scroll');
  }
  const longStaves = [
    'svg.scale-overlap',
    'svg.medieval-comparison-staff',
    'svg.mode-range-staff',
    'svg.long-staff'
  ];
  for (const score of main.querySelectorAll(longStaves.join(','))) {
    const width = score.viewBox.baseVal.width;
    if (score.matches('.scale-overlap:not(.mode-phrase)')) {
      score.classList.add('sized-staff');
      score.style.setProperty('--staff-units', width);
    }
    if (width <= 280 && !score.matches('.sized-staff')) continue;
    const scale = score.matches('.mode-phrase') ? 0.7 : 0.9;
    score.style.setProperty('--staff-min-width', `${Math.min(34, width * scale / 16)}rem`);
    frameContent(score, score.getAttribute('aria-label') || '五线谱', 'staff-scroll');
  }
}
