import { AlphaTabApi, FontFileFormat, midi, synth } from '@coderline/alphatab';
import bravura from '@coderline/alphatab/font/Bravura.woff2?url';
import { enableScrollFrame } from './readable-layout.js';
import { encodeScore, fourPartHarmony } from './four-part.js';
import { mountScoreReading } from './score-reading.js';

const soundFont = new URL('../assets/piano-and-strings.sf3', import.meta.url).href;
const views = {
  staff: ['score'],
  numbered: ['numbered'],
  both: ['score', 'numbered']
};

let activePlayer;

export function mountScore(figure, { notes, tempo = 90, notation = 'both', audio = true, onPitchesChange }) {
  const staves = views[notation];
  const tracks = staves.map((_, index) => index);
  let material = notes;
  let timbre = 'strings';
  let playingTimbre = 'piano';
  let reading;

  figure.classList.add('score-example');
  figure.innerHTML = `
    <div class="score-controls"${audio ? '' : ' hidden'}>
      <button class="score-playback" type="button" aria-label="播放谱例" disabled>
        <span class="score-playback-icon" aria-hidden="true"></span>
      </button>
      <button class="score-reading-toggle" type="button" aria-expanded="false" hidden>标出音名和和弦</button>
      <label class="score-timbre" hidden>音色
        <select aria-label="四部和声音色">
          <option value="piano">钢琴</option>
          <option value="strings" selected>弦乐四重奏</option>
        </select>
      </label>
    </div>
    <div class="score-notation"></div>
    <p class="score-status" role="status">正在加载谱例…</p>
  `;

  const score = figure.querySelector('.score-notation');
  const button = figure.querySelector('.score-playback');
  const timbreControl = figure.querySelector('.score-timbre');
  const timbreSelect = timbreControl.querySelector('select');
  const status = figure.querySelector('.score-status');
  const updateScroll = enableScrollFrame(score, '谱例');

  const api = new AlphaTabApi(score, {
    core: { smuflFontSources: new Map([[FontFileFormat.Woff2, bravura]]), enableLazyLoading: false },
    display: { padding: [5, 5, 7, 3], lastSystemPaddingBottom: 2, lastSystemFillThreshold: 0 },
    player: {
      enablePlayer: audio,
      soundFont,
      scrollMode: 'off'
    }
  });
  function stopPlayback() {
    if (activePlayer === api) activePlayer = undefined;
    reading?.setPlaying(false);
    api.stop();
  }

  const showError = (error) => {
    console.error(error);
    button.disabled = true;
    status.textContent = '谱例加载失败，请刷新页面重试。';
  };
  api.error.on(showError);
  api.scoreLoaded.on(scoreModel => {
    reading?.load(scoreModel);
    if (playingTimbre !== 'strings') return;
    const balance = [10, 12, 6, 4];
    scoreModel.tracks.slice(staves.length).forEach((track, index) => {
      track.playbackInfo.balance = balance[index];
    });
  });
  api.midiLoad.on(file => {
    // Keep the tempo and timeline, but leave note events only on audible tracks.
    const firstSilentTrack = playingTimbre === 'strings' ? 0 : 1;
    for (const track of file.tracks) {
      const events = track.events;
      for (let i = events.length - 1; i >= 0; i--) {
        const event = events[i];
        if (event.track >= firstSilentTrack && event.track < staves.length
          && (event instanceof midi.NoteEvent || event instanceof midi.NoteBendEvent
            || event instanceof midi.ProgramChangeEvent)) {
          events.splice(i, 1);
        }
      }
    }
  });
  api.renderFinished.on(() => {
    updateScroll();
    reading?.renderMarker();
    if (!audio || api.isReadyForPlayback) {
      button.disabled = false;
      status.textContent = '';
    }
  });

  if (audio) {
    api.playerReady.on(() => {
      api.masterVolume = 0.65;
      button.disabled = false;
      status.textContent = '';
    });

    api.playerStateChanged.on(({ state }) => {
      const playing = state === synth.PlayerState.Playing;
      const wasPlaying = figure.classList.contains('playing');
      figure.classList.toggle('playing', playing);
      button.setAttribute('aria-label', playing ? '停止播放' : '播放谱例');
      reading?.setPlaying(playing);
      if (!playing) onPitchesChange?.([]);
      // A score update can report its stopped state while a new play request is pending.
      if (!playing && wasPlaying && activePlayer === api) activePlayer = undefined;
    });

    if (onPitchesChange) {
      api.playedBeatChanged.on((beat) => onPitchesChange(beat.notes.map(note => note.realValue)));
    }

    button.addEventListener('click', () => {
      if (activePlayer === api) {
        stopPlayback();
        return;
      }
      activePlayer?.stop();
      activePlayer = api;
      reading?.preparePlayback();
      if (api.play()) {
        status.textContent = '';
      } else {
        activePlayer = undefined;
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
    figure.dataset.scoreType = fourPart ? fourPartHarmony : 'standard';
    timbreControl.hidden = !audio || !fourPart;
    if (audio && fourPart && !reading) reading = mountScoreReading(figure, score, api, stopPlayback);
    reading?.setMaterial(material, fourPart);
    if (api.settings.core.includeNoteBounds !== (audio && fourPart)) {
      api.settings.core.includeNoteBounds = audio && fourPart;
      api.updateSettings();
    }
    playingTimbre = fourPart ? timbre : 'piano';
    try {
      api.tex(encodeScore(material, staves, tempo, playingTimbre), tracks);
    } catch (error) {
      showError(error);
    }
  }
  render();

  function update(message) {
    if (activePlayer === api) stopPlayback();
    button.disabled = true;
    status.textContent = message;
    render();
  }

  return {
    setNotes(phrase) {
      material = phrase;
      update('正在更新谱例…');
    }
  };
}
