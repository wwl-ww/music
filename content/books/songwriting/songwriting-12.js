import { lyricBars, mountSongVariants } from './songwriting-score.js';
import { endExclusivePlayback, startExclusivePlayback } from '../../shared/formats/score.js';

const wordTone = (words, bars) => String.raw`\ks C \ts (4 4) ${lyricBars(words, bars)}`;

mountSongVariants('song-tone-contours', {
  natural: {
    tempo: 83,
    notes: wordTone('山头起雾', ['G4.2 F4.4/sing/head G4.4/held/head', 'E4.4 A4.4/sing/mist F4.4/held/mist r.4']),
    summary: '“头”向上，“起”低于前后相邻音，“雾”从高音下落。'
  },
  ambiguous: {
    tempo: 83,
    notes: wordTone('山头起雾', ['G4.2 A4.4/sing/head F4.4/held/head', 'E4.4 E4.4/sing/mist A4.4/held/mist r.4']),
    summary: '“头”向下，“雾”反而向上。两个字的曲调走向都反转，词义更依赖上下文。'
  },
  emphasis: {
    tempo: 83,
    notes: wordTone('山头起雾', ['G4.2 F4.4/sing/head G4.4/held/head', 'A4.4 A4.4/sing/mist F4.4/held/mist r.4']),
    summary: '只把“起”抬到 A，强调动作。“头”的上扬和“雾”的下落仍保留。'
  }
});

const voiceExample = document.getElementById('song-tone-voice');
const voiceChoice = voiceExample.querySelector('select');
const voicePlayer = voiceExample.querySelector('audio');
const voiceButton = voiceExample.querySelector('button');
const voiceStatus = voiceExample.querySelector('[role="status"]');
const voiceCue = voiceStatus.textContent;
const voiceSamples = {
  spoken: voicePlayer.src,
  matched: new URL('./audio/word-tones-matched.mp3', import.meta.url).href,
  reversed: new URL('./audio/word-tones-reversed.mp3', import.meta.url).href
};
const voicePlayback = {
  stop() {
    endExclusivePlayback(voicePlayback);
    voicePlayer.pause();
    voicePlayer.currentTime = 0;
  }
};
voiceChoice.addEventListener('change', () => {
  voicePlayback.stop();
  voicePlayer.src = voiceSamples[voiceChoice.value];
  voiceStatus.textContent = voiceCue;
});
voiceButton.addEventListener('click', async () => {
  if (!voicePlayer.paused) {
    voicePlayback.stop();
    return;
  }
  voiceStatus.textContent = voiceCue;
  startExclusivePlayback(voicePlayback);
  try {
    await voicePlayer.play();
  } catch (error) {
    if (error.name === 'AbortError') return;
    endExclusivePlayback(voicePlayback);
    voiceStatus.textContent = '暂时无法播放，请再试一次。';
  }
});
for (const event of ['play', 'pause', 'ended']) {
  voicePlayer.addEventListener(event, () => {
    const playing = !voicePlayer.paused && !voicePlayer.ended;
    if (!playing) endExclusivePlayback(voicePlayback);
    voiceButton.toggleAttribute('data-playing', playing);
    voiceButton.setAttribute('aria-label', playing ? '停止人声示范' : '播放人声示范');
  });
}
voicePlayer.hidden = true;
voiceButton.hidden = false;
voiceChoice.disabled = false;

const stanzaOpening = 'E4.8/sing/open G4.8/held/open G4.4 G4.4 E4.4';
const stanzaA = lyricBars('河边灯火', [stanzaOpening]);
const stanzaBUnchanged = lyricBars('晚风吹过', [stanzaOpening.replaceAll('/open', '/repeat')]);
const stanzaBRevised = lyricBars('晚风吹过', ['D4.8/sing/revise E4.8/held/revise G4.4 G4.4 G4.8/sing/end E4.8/held/end']);

const stanzaPair = (second) => String.raw`\ks C \ts (4 4) \section ("第一段词") ${stanzaA} | \section ("第二段词") ${second}`;

mountSongVariants('song-stanza-tone-revision', {
  unchanged: {
    tempo: 83,
    notes: stanzaPair(stanzaBUnchanged),
    summary: '两段共用原调。“晚”沿用“河”的上行，“过”沿用“火”的单音句尾。'
  },
  revised: {
    tempo: 83,
    notes: stanzaPair(stanzaBRevised),
    summary: '降低“晚”的字头，“过”改用两个下行的八分音符。中间两字、句长和收束音保持不变。'
  }
});

mountSongVariants('song-helper-words', {
  particle: {
    tempo: 78,
    notes: wordTone('远山的灯', ['G4.8 A4.8 D5.2 G4.4']),
    summary: '辅助词“的”占最高音和半音符，抢了“灯”的重音。'
  },
  noun: {
    tempo: 78,
    notes: wordTone('远山的灯', ['G4.8 A4.8 G4.8 D5.8/sing/lamp G4.2/held/lamp']),
    summary: '把“的”放在短音上，最高音和下行续腔一起落在“灯”上。'
  }
});
