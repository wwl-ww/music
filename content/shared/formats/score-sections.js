export function mountScoreSections(viewport, api, { stopPlayback, isPlaying, onBarChange }) {
  const marks = document.createElement('div');
  marks.className = 'score-section-marks';
  marks.setAttribute('aria-hidden', 'true');
  viewport.append(marks);
  let range = null;
  let currentBar = null;

  function entryBeat(entry) {
    if (!entry) return undefined;
    const { bar, staff = 1, voice = 1, beat } = entry;
    return api.score?.tracks[0]?.staves[staff - 1]?.bars[bar - 1]?.voices[voice - 1]?.beats[beat - 1];
  }

  function paint(reveal = false) {
    marks.replaceChildren();
    if (!range) {
      if (reveal) viewport.scrollTo(0, 0);
      return;
    }
    const { first, last, entry } = range;
    const beat = entryBeat(entry);
    const beatBounds = beat && api.boundsLookup?.findBeat(beat);
    for (let number = first; number <= last; number++) {
      const bounds = api.boundsLookup?.findMasterBarByIndex(number - 1);
      const box = bounds?.lineAlignedBounds;
      if (!box) continue;
      const mark = document.createElement('span');
      mark.className = 'score-section-mark';
      const left = number === first && beatBounds ? Math.max(box.x, beatBounds.realBounds.x) : box.x;
      mark.style.left = left + 'px';
      mark.style.top = box.y + 'px';
      mark.style.width = Math.max(0, box.x + box.w - left) + 'px';
      mark.style.height = box.h + 'px';
      marks.append(mark);
      if (reveal && number === first) {
        viewport.scrollTop = bounds.staffSystemBounds?.realBounds.y ?? bounds.visualBounds.y;
        viewport.scrollLeft = Math.max(0, box.x - 12);
      }
    }
  }

  api.postRenderFinished.on(() => paint());
  api.playerPositionChanged.on(({ currentTick, isSeek }) => {
    if (!isPlaying() || isSeek) return;
    const playbackRange = api.playbackRange;
    if (playbackRange && currentTick > playbackRange.endTick) return;
    const lookup = api.tickCache?.masterBars.findLast(bar => bar.start <= currentTick && currentTick < bar.end);
    if (!lookup) return;
    const number = lookup.masterBar.index + 1;
    if (number === currentBar) return;
    currentBar = number;
    const box = api.boundsLookup?.findMasterBarByIndex(number - 1)?.lineAlignedBounds;
    if (box && (box.y < viewport.scrollTop || box.y + box.h > viewport.scrollTop + viewport.clientHeight)) {
      viewport.scrollTop = Math.max(0, box.y - 18);
    }
    onBarChange?.(number);
  });

  return {
    select(first, last, entry) {
      if (isPlaying()) stopPlayback();
      range = first == null ? null : { first: entry?.bar ?? first, last, entry };
      paint(true);
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
