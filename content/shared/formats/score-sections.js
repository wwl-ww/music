export function mountScoreSections(viewport, surface, api, { stopPlayback, isPlaying, onBarChange }) {
  const marks = document.createElement('div');
  marks.className = 'score-section-marks';
  marks.setAttribute('aria-hidden', 'true');
  surface.append(marks);
  let range = null;
  let currentBar = null;
  let viewAnchor;
  let alignedView;

  function boundsFor(number) {
    return api.boundsLookup?.findMasterBarByIndex(number - 1)?.lineAlignedBounds;
  }

  function revealBar(number, align = false) {
    const box = boundsFor(number);
    if (!box) return;
    if (align || box.y < viewport.scrollTop || box.y + box.h > viewport.scrollTop + viewport.clientHeight) {
      const topSpace = api.score?.masterBars[number - 1]?.section ? 26 : 12;
      viewport.scrollTop = Math.max(0, box.y - topSpace);
    }
    const entry = range?.entry?.bar === number && entryBeat(range.entry);
    const entryX = entry && api.boundsLookup.findBeat(entry)?.onNotesX;
    if (entryX && entryX > box.x + viewport.clientWidth - 24) {
      viewport.scrollLeft = Math.max(0, entryX - viewport.clientWidth / 2);
    } else if (align || box.x < viewport.scrollLeft || box.x + box.w > viewport.scrollLeft + viewport.clientWidth) {
      viewport.scrollLeft = Math.max(0, box.x - 12);
    }
    if (align) alignedView = { bar: number, top: viewport.scrollTop, left: viewport.scrollLeft };
  }

  function visibleBar() {
    const { scrollTop, scrollLeft, clientHeight, clientWidth } = viewport;
    if (alignedView?.top === scrollTop && alignedView.left === scrollLeft) return alignedView.bar;
    const visible = api.score?.masterBars.find(({ index }) => {
      const box = boundsFor(index + 1);
      return box && box.y + box.h > scrollTop + 16 && box.x + box.w > scrollLeft + 16
        && box.y < scrollTop + clientHeight && box.x < scrollLeft + clientWidth;
    });
    return visible && visible.index + 1;
  }

  function entryBeat(entry) {
    if (!entry) return undefined;
    const { bar, staff = 1, voice = 1, beat } = entry;
    return api.score?.tracks[0]?.staves[staff - 1]?.bars[bar - 1]?.voices[voice - 1]?.beats[beat - 1];
  }

  function paint(reveal = false) {
    marks.replaceChildren();
    if (!range) {
      if (reveal) {
        viewport.scrollTo(0, 0);
        alignedView = undefined;
      }
      return;
    }
    const { first, last, entry } = range;
    const beat = entryBeat(entry);
    const beatBounds = beat && api.boundsLookup?.findBeat(beat);
    for (let number = first; number <= last; number++) {
      const box = boundsFor(number);
      if (!box) continue;
      const mark = document.createElement('span');
      mark.className = 'score-section-mark';
      const left = number === first && beatBounds ? Math.max(box.x, beatBounds.realBounds.x) : box.x;
      mark.style.left = left + 'px';
      mark.style.top = box.y + 'px';
      mark.style.width = Math.max(0, box.x + box.w - left) + 'px';
      mark.style.height = box.h + 'px';
      marks.append(mark);
    }
    if (reveal) revealBar(first, true);
  }

  api.postRenderFinished.on(() => {
    paint();
    if (viewAnchor == null) return;
    revealBar(currentBar ?? viewAnchor, true);
    viewAnchor = undefined;
  });
  api.playerPositionChanged.on(({ currentTick, isSeek }) => {
    if (!isPlaying() || isSeek) return;
    const playbackRange = api.playbackRange;
    if (playbackRange && currentTick > playbackRange.endTick) return;
    const lookup = api.tickCache?.masterBars.findLast(bar => bar.start <= currentTick && currentTick < bar.end);
    if (!lookup) return;
    const number = lookup.masterBar.index + 1;
    if (number === currentBar) return;
    currentBar = number;
    revealBar(number);
    onBarChange?.(number);
  });
  api.playedBeatChanged.on(beat => {
    if (!isPlaying() || viewport.scrollWidth <= viewport.clientWidth) return;
    const x = api.boundsLookup?.findBeat(beat)?.onNotesX;
    if (x != null && (x < viewport.scrollLeft || x > viewport.scrollLeft + viewport.clientWidth - 18)) {
      viewport.scrollLeft = Math.max(0, x - 24);
    }
  });

  return {
    select(first, last, entry) {
      if (isPlaying()) stopPlayback();
      range = first == null ? null : { first: entry?.bar ?? first, last, entry };
      viewAnchor = range && !boundsFor(range.first) ? range.first : undefined;
      paint(true);
    },
    preserveView(change) {
      const anchor = viewAnchor ?? currentBar ?? visibleBar() ?? range?.first ?? 1;
      const width = surface.clientWidth;
      change();
      if (width === surface.clientWidth) revealBar(anchor, true);
      else viewAnchor = anchor;
    },
    preparePlayback() {
      if (!range) {
        api.playbackRange = null;
        api.tickPosition = 0;
        return true;
      }

      const { first, last, entry } = range;
      const playedBars = api.tickCache?.masterBars ?? [];
      const start = playedBars.findIndex(bar => bar.masterBar.index === first - 1);
      if (start === -1) return false;
      const beat = entryBeat(entry);
      if (entry && !beat) return false;
      const startTick = playedBars[start].start + (beat?.playbackStart ?? 0);
      const outside = playedBars.findIndex((bar, index) => index > start
        && (bar.masterBar.index < first - 1 || bar.masterBar.index > last - 1));
      api.playbackRange = {
        startTick,
        // Stop before the first onset of the next measure.
        endTick: playedBars[outside < 0 ? playedBars.length - 1 : outside - 1].end - 1
      };
      api.tickPosition = startTick;
      return true;
    },
    clearPosition() {
      if (currentBar == null) return;
      currentBar = null;
      onBarChange?.(null);
    }
  };
}
