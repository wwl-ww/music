import { mountScore } from './score.js';
import { mountTimeline } from './timeline.js';
import { mountScoreReader } from './score-reader.js';

export function mountFormAnalysis(container, {
  score, sections, barCount = sections.at(-1).last, wholeLabel = '全曲',
  initialSection = null, describeSection, onSelectionChange
}) {
  const scoreFigure = container.querySelector('[data-analysis-score]');
  const whole = container.querySelector('[data-analysis-whole]');
  const jump = container.querySelector('[data-analysis-jump]');
  const version = container.querySelector('[data-analysis-version]');
  const heading = container.querySelector('[data-analysis-section]');
  const summary = container.querySelector('[data-analysis-description]');
  const status = container.querySelector('[data-analysis-status]');
  const frame = container.querySelector('[data-analysis-timeline]');
  let selection = null;

  if (jump) {
    jump.add(new Option(wholeLabel, ''));
    for (const { id, label, first, last, rangeLabel } of sections) {
      jump.add(new Option(label + ' · ' + (rangeLabel ?? first + '–' + last + ' 小节'), id));
    }
  }
  let described;

  const timeline = mountTimeline(frame, {
    unitCount: barCount,
    unitName: '小节',
    lanes: [{
      events: sections.map(({ id, label, first, last, rangeLabel }) => ({
        id, label, start: first, length: last - first + 1,
        accessibleLabel: label + '，' + (rangeLabel ?? '第 ' + first + ' 至 ' + last + ' 小节')
      }))
    }],
    onSelect: select
  });

  function describe(section, refresh = false) {
    if (!refresh && described === section) return;
    described = section;
    heading.textContent = section?.label ?? wholeLabel;
    const parts = [section?.material, section?.voice, section?.key, section?.role].filter(Boolean);
    summary.textContent = describeSection?.(section)
      ?? (section ? parts.join('。') : sections.map(({ label }) => label).join(' → '));
  }

  const player = mountScore(scoreFigure, {
    notation: 'staff',
    ...score,
    onScoreLoaded(loaded) {
      const matches = loaded.masterBars.length === barCount;
      for (const element of timeline.events.values()) element.disabled = !matches;
      if (jump) jump.disabled = !matches;
      status.textContent = matches ? '' : '段落时间轴与谱面小节数不一致。';
      score.onScoreLoaded?.(loaded);
    },
    sectionNavigation: {
      onBarChange(number) {
        timeline.markUnit(number);
        if (!selection) describe(sections.find(({ first, last }) => first <= number && number <= last));
      }
    }
  });

  function select(id) {
    selection = sections.find(section => section.id === id) ?? null;
    whole?.setAttribute('aria-pressed', String(!selection));
    if (jump) jump.value = selection?.id ?? '';
    timeline.select(id);
    const button = timeline.events.get(id);
    if (button) {
      const cell = button.getBoundingClientRect();
      const viewport = frame.getBoundingClientRect();
      if (cell.left < viewport.left || cell.right > viewport.right) {
        frame.scrollLeft += cell.left - viewport.left - (frame.clientWidth - cell.width) / 2;
      }
    } else {
      frame.scrollLeft = 0;
    }
    describe(selection);
    const playback = selection?.playback ?? selection;
    player.selectBars(playback?.first, playback?.last, playback?.entry);
    onSelectionChange?.(selection);
  }

  whole?.addEventListener('click', () => select(null));
  jump?.addEventListener('change', () => select(jump.value));
  select(initialSection);

  const title = container.querySelector('.music-demo-toolbar :is(h3, h4)');
  mountScoreReader(title, scoreFigure, {
    controls: [
      scoreFigure.querySelector('.score-controls'),
      version?.closest('label'),
      jump?.closest('label') ?? whole
    ].filter(Boolean),
    navigation: jump ? null : frame,
    preserveView: player.preserveSectionView
  });
  return {
    setNotes(notes) {
      player.setNotes(notes);
      describe(selection, true);
    }
  };
}
