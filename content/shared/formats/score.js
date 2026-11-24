import { AlphaTabApi, FontFileFormat, LayoutMode, NotationElement, Settings, midi, model, synth } from '@coderline/alphatab';
import bravura from '@coderline/alphatab/font/Bravura.woff2?url';
import sonivoxSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { enableScrollFrame } from './readable-layout.js';
import { encodeScore, fourPartHarmony } from './four-part.js';
import { mountScoreReading } from './score-reading.js';
import { mountScoreSections } from './score-sections.js';
import { mountScoreNoteHighlights } from './score-note-highlights.js';

const soundFont = new URL('../assets/piano-and-strings.sf3', import.meta.url).href;
const ensembleSoundFont = new URL('../assets/ensemble-with-kawai.sf3', import.meta.url).href;
const soundFontDownloads = new Map();
const views = {
  staff: ['score'],
  numbered: ['numbered'],
  both: ['score', 'numbered']
};

let activePlayer;

function downloadSoundFont(url) {
  if (!soundFontDownloads.has(url)) {
    const request = fetch(url).then(response => {
      if (!response.ok) throw new Error(`SoundFont download failed (${response.status})`);
      return response.arrayBuffer();
    }).catch(error => {
      soundFontDownloads.delete(url);
      throw error;
    });
    soundFontDownloads.set(url, request);
  }
  return soundFontDownloads.get(url);
}

export function startExclusivePlayback(player) {
  const previous = activePlayer;
  activePlayer = player;
  if (previous !== player) previous?.stop();
}

export function endExclusivePlayback(player) {
  if (activePlayer === player) activePlayer = undefined;
}

export function mountScore(figure, {
  notes, tempo = 90, notation = 'both', audio = true, onPitchesChange,
  onScoreLoaded, sectionNavigation, noteHighlights, voiceAudition,
  soundFontUrl = soundFont, preservePosition = false, notationVisible = true, onPlaybackPosition,
  horizontal = false, showDynamics = true
}) {
  const staves = views[notation];
  const tracks = staves.map((_, index) => index);
  let material = notes;
  let timbre = 'strings';
  let playingTimbre = 'piano';
  const splitVoices = Boolean(audio && voiceAudition?.length);
  let auditionVoices = null;
  let reading;
  let requestedPosition;

  figure.classList.add('score-example');
  figure.toggleAttribute('data-audio-only', !notationVisible);
  figure.innerHTML = `
    <div class="score-controls"${audio ? '' : ' hidden'}>
      <button class="score-playback" type="button" aria-label="播放谱例" disabled>
        <span class="score-playback-icon" aria-hidden="true"></span>
      </button>
      <button class="score-reading-toggle" type="button" aria-expanded="false" hidden>音名与和弦</button>
      ${splitVoices ? '<label class="score-voice-audition">试听 <select aria-label="试听声部"></select></label>' : ''}
      <label class="score-timbre" hidden>音色
        <select aria-label="四部和声音色">
          <option value="piano">钢琴</option>
          <option value="strings" selected>弦乐四重奏</option>
        </select>
      </label>
    </div>
    <div class="score-notation"${notationVisible ? '' : ' aria-hidden="true" inert'}>${sectionNavigation ? '<div class="score-render-surface"></div>' : ''}</div>
    <p class="score-status" role="status">正在加载谱例…</p>
  `;

  const viewport = figure.querySelector('.score-notation');
  const score = viewport.firstElementChild ?? viewport;
  const button = figure.querySelector('.score-playback');
  const timbreControl = figure.querySelector('.score-timbre');
  const timbreSelect = timbreControl.querySelector('select');
  const voiceSelect = figure.querySelector('.score-voice-audition select');
  const status = figure.querySelector('.score-status');
  const updateScroll = notationVisible && enableScrollFrame(viewport, '谱例', { vertical: Boolean(sectionNavigation) });

  const settings = new Settings();
  settings.fillFromJson({
    core: { smuflFontSources: new Map([[FontFileFormat.Woff2, bravura]]), enableLazyLoading: false },
    display: { padding: [5, 5, 7, 3], lastSystemPaddingBottom: 2, lastSystemFillThreshold: 0 },
    player: {
      enablePlayer: audio,
      scrollMode: 'off'
    }
  });
  const viewportLayout = typeof horizontal === 'boolean' ? null : horizontal;
  if (viewportLayout?.matches ?? horizontal) settings.display.layoutMode = LayoutMode.Horizontal;
  if (!showDynamics) settings.notation.elements.set(NotationElement.EffectDynamics, false);
  settings.display.resources.elementFonts.set(
    NotationElement.EffectLyrics, model.Font.withFamilyList(['Noto Sans SC', 'Microsoft YaHei', 'sans-serif'], 14)
  );
  const api = new AlphaTabApi(score, settings);
  viewportLayout?.addEventListener('change', ({ matches }) => {
    api.settings.display.layoutMode = matches ? LayoutMode.Horizontal : LayoutMode.Page;
    api.updateSettings();
    api.render();
  });
  function getPosition() {
    if (requestedPosition) return requestedPosition;
    const tick = api.tickPosition;
    const bar = api.tickCache?.masterBars.findLast(({ start, end }) => start <= tick && tick < end);
    if (bar) return { bar: bar.masterBar.index, fraction: (tick - bar.start) / (bar.end - bar.start) };
  }

  function findRequestedBar() {
    return api.tickCache?.masterBars.find(({ masterBar }) => masterBar.index === requestedPosition.bar);
  }

  function revealPosition() {
    if (!requestedPosition || !score.clientWidth) return;
    const bar = findRequestedBar();
    const bounds = bar && api.boundsLookup?.findMasterBarByIndex(bar.masterBar.index)?.lineAlignedBounds;
    if (!bounds) return;
    if (score.scrollWidth > score.clientWidth) score.scrollLeft = Math.max(0, bounds.x - 12);
    if (score.scrollHeight > score.clientHeight) score.scrollTop = Math.max(0, bounds.y - 12);
  }

  function setPosition(position) {
    if (position && api.score && position.bar >= api.score.masterBars.length) position = undefined;
    requestedPosition = position;
    requestAnimationFrame(revealPosition);
    return requestedPosition;
  }

  function stopPlayback() {
    endExclusivePlayback(api);
    reading?.setPlaying(false);
    api.stop();
  }
  const sections = sectionNavigation && mountScoreSections(viewport, score, api, {
    ...sectionNavigation,
    stopPlayback,
    isPlaying: () => figure.classList.contains('playing')
  });
  if (sections) figure.dataset.sectionNavigation = '';
  const clearHighlights = noteHighlights ? mountScoreNoteHighlights(score, api, noteHighlights) : undefined;

  function applyVoiceAudition() {
    if (!splitVoices || !api.isReadyForPlayback || !api.score) return;
    const voices = api.score.tracks.slice(staves.length);
    voices.forEach((track, index) => {
      const voice = material.auditionOrder?.[index] ?? index + 1;
      api.changeTrackMute([track], Boolean(auditionVoices && !auditionVoices.includes(voice)));
    });
  }

  if (voiceSelect) {
    voiceSelect.add(new Option('全部声部', ''));
    voiceAudition.forEach(({ label }, index) => voiceSelect.add(new Option(label, String(index))));
    voiceSelect.addEventListener('change', () => {
      auditionVoices = voiceAudition[voiceSelect.value]?.voices ?? null;
      applyVoiceAudition();
    });
  }

  const showError = (error) => {
    console.error(error);
    button.disabled = true;
    status.textContent = '谱例加载失败，请刷新页面重试。';
  };
  api.error.on(showError);
  api.scoreLoaded.on(scoreModel => {
    onScoreLoaded?.(scoreModel);
    reading?.load(scoreModel);
    if (playingTimbre !== 'strings') return;
    const balance = splitVoices ? [4, 6, 12, 10] : [10, 12, 6, 4];
    scoreModel.tracks.slice(staves.length).forEach((track, index) => {
      track.playbackInfo.balance = balance[index];
    });
  });
  api.midiLoad.on(file => {
    // Keep the tempo and timeline, but leave note events only on audible tracks.
    const firstSilentTrack = playingTimbre === 'strings' || splitVoices ? 0 : 1;
    const scoreTracks = material.scoreTracks;
    const isSilentTrack = index => scoreTracks
      ? Boolean(scoreTracks[index]?.notationOnly)
      : index >= firstSilentTrack && index < staves.length;
    for (const track of file.tracks) {
      const events = track.events;
      for (let i = events.length - 1; i >= 0; i--) {
        const event = events[i];
        if (isSilentTrack(event.track)
          && (event instanceof midi.NoteEvent || event instanceof midi.NoteBendEvent
            || event instanceof midi.ProgramChangeEvent)) {
          events.splice(i, 1);
        }
      }
    }
  });
  api.renderFinished.on(() => {
    if (updateScroll) updateScroll();
    if (!audio || api.isReadyForPlayback) {
      button.disabled = false;
      status.textContent = '';
    }
  });
  api.postRenderFinished.on(() => {
    reading?.renderMarker();
    if (preservePosition) revealPosition();
  });

  if (audio) {
    api.soundFontLoaded.on(() => {
      // The first score can finish preparing MIDI before the sound font is available.
      if (!api.isReadyForPlayback) api.loadMidiForScore();
    });

    api.playerReady.on(() => {
      applyVoiceAudition();
      api.masterVolume = 0.65;
      button.disabled = false;
      status.textContent = '';
    });

    api.playerStateChanged.on(({ state }) => {
      const playing = state === synth.PlayerState.Playing;
      const wasPlaying = figure.classList.contains('playing');
      figure.classList.toggle('playing', playing);
      button.toggleAttribute('data-playing', playing);
      button.setAttribute('aria-label', playing ? '停止播放' : '播放谱例');
      reading?.setPlaying(playing);
      if (!playing) onPitchesChange?.([]);
      if (!playing) onPlaybackPosition?.(null);
      if (!playing) sections?.clearPosition();
      // A score update can report its stopped state while a new play request is pending.
      if (!playing && wasPlaying) endExclusivePlayback(api);
    });

    if (onPitchesChange) {
      api.playedBeatChanged.on((beat) => onPitchesChange(beat.notes.map(note => note.realValue)));
    }
    if (onPlaybackPosition) {
      api.playerPositionChanged.on(({ currentTick }) => {
        if (figure.classList.contains('playing')) onPlaybackPosition(currentTick);
      });
    }

    button.addEventListener('click', () => {
      if (activePlayer === api) {
        if (preservePosition) requestedPosition = getPosition();
        stopPlayback();
        return;
      }
      startExclusivePlayback(api);
      applyVoiceAudition();
      reading?.preparePlayback();
      if (sections && !sections.preparePlayback()) {
        endExclusivePlayback(api);
        status.textContent = '该段落在当前演奏路线中未出现。';
        return;
      }
      if (requestedPosition) {
        const bar = findRequestedBar();
        const offset = bar && Math.round((bar.end - bar.start) * requestedPosition.fraction);
        api.tickPosition = bar ? Math.min(bar.end - 1, bar.start + offset) : 0;
      }
      if (api.play()) {
        requestedPosition = undefined;
        status.textContent = '';
      } else {
        endExclusivePlayback(api);
        status.textContent = '暂时无法播放，请再试一次。';
      }
    });
    timbreSelect.addEventListener('change', () => {
      timbre = timbreSelect.value;
      update('正在切换音色…');
    });
  }

  function render() {
    const fourPart = material.type === fourPartHarmony;
    const useTimbreControl = audio && fourPart && !material.scoreTracks;
    figure.dataset.scoreType = fourPart ? fourPartHarmony : 'standard';
    timbreControl.hidden = !useTimbreControl;
    if (useTimbreControl && !reading) reading = mountScoreReading(figure, score, api, stopPlayback);
    reading?.setMaterial(material, useTimbreControl);
    const includeNoteBounds = Boolean(noteHighlights) || useTimbreControl;
    if (api.settings.core.includeNoteBounds !== includeNoteBounds) {
      api.settings.core.includeNoteBounds = includeNoteBounds;
      api.updateSettings();
    }
    playingTimbre = fourPart && !material.scoreTracks ? timbre : 'piano';
    try {
      const visibleTracks = material.scoreTracks?.flatMap((track, index) => track.playbackOnly ? [] : [index]) ?? tracks;
      api.tex(encodeScore(material, staves, tempo, playingTimbre, splitVoices), visibleTracks);
    } catch (error) {
      showError(error);
    }
  }
  render();
  if (audio && soundFontUrl && api.player) {
    const bank = soundFontUrl === sonivoxSoundFont ? ensembleSoundFont : soundFontUrl;
    const loadSoundFont = () => {
      downloadSoundFont(bank).then(data => {
        if (!api.loadSoundFont(data)) throw new Error('Could not load SoundFont data');
      }).catch(showError);
    };
    if (api.player.isReady) loadSoundFont();
    else api.player.ready.on(loadSoundFont);
  }

  function update(message) {
    if (activePlayer === api) stopPlayback();
    clearHighlights?.();
    button.disabled = true;
    status.textContent = message;
    render();
  }

  return {
    ...(sections && { selectBars: sections.select, preserveSectionView: sections.preserveView }),
    ...(preservePosition && { getPosition, setPosition }),
    stop() {
      if (activePlayer === api) stopPlayback();
    },
    setNotes(phrase) {
      material = phrase;
      update('正在更新谱例…');
    }
  };
}
