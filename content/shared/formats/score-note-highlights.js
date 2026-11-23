export function mountScoreNoteHighlights(viewport, api, getHighlights) {
  const layer = document.createElement('div');
  layer.className = 'score-note-highlights';
  layer.setAttribute('aria-hidden', 'true');
  viewport.append(layer);

  function clear() {
    layer.replaceChildren();
  }

  api.postRenderFinished.on(() => {
    clear();
    const staves = api.score?.tracks[0]?.staves;
    for (const { staff = 1, bar, voice = 1, beat, kind = 'change' } of getHighlights()) {
      const target = staves?.[staff - 1]?.bars[bar - 1]?.voices[voice - 1]?.beats[beat - 1];
      if (!target) continue;
      const notes = api.boundsLookup?.findBeat(target)?.notes ?? [];
      for (const { noteHeadBounds: box } of notes) {
        const highlight = document.createElement('span');
        highlight.dataset.kind = kind;
        highlight.style.left = box.x - 3 + 'px';
        highlight.style.top = box.y - 3 + 'px';
        highlight.style.width = box.w + 6 + 'px';
        highlight.style.height = box.h + 6 + 'px';
        layer.append(highlight);
      }
    }
  });

  return clear;
}
