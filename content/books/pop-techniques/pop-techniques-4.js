export const sampleRate = 44100;
const beatSeconds = 60 / 108;
const phraseLength = Math.ceil((8 * beatSeconds + 0.65) * sampleRate);
const twoPi = 2 * Math.PI;
const productionLevel = 0.65;
let audioContext;
let activePlayback;

export function mountProductionAudio(id, variants) {
  const example = document.getElementById(id);
  if (!example) return;

  const choice = example.querySelector('[data-production-choice]');
  const description = example.querySelector('[data-production-description]');
  const button = example.querySelector('.score-playback');
  const status = example.querySelector('.score-status');
  const meters = example.querySelector('[data-production-meters]');
  const playLabel = button.getAttribute('aria-label');
  const cache = new Map();

  function update() {
    description.textContent = variants[choice.value].description;
    if (meters) {
      const values = variants[choice.value].meters;
      meters.textContent = values;
      meters.hidden = !values;
    }
  }

  function stop(playback) {
    if (activePlayback !== playback) return;
    activePlayback = undefined;
    if (playback.source) {
      playback.source.onended = null;
      playback.source.stop();
      playback.source.disconnect();
    }
    delete button.dataset.playing;
    button.setAttribute('aria-label', playLabel);
  }

  choice.addEventListener('change', () => {
    if (activePlayback?.button === button) activePlayback.cancel();
    status.textContent = '';
    update();
  });

  button.addEventListener('click', async () => {
    const wasPlaying = activePlayback?.button === button;
    activePlayback?.cancel();
    if (wasPlaying) return;

    const playback = { button, cancel: () => stop(playback) };
    activePlayback = playback;
    button.dataset.playing = '';
    button.setAttribute('aria-label', '停止播放');
    status.textContent = '';

    try {
      audioContext ??= new AudioContext();
      await audioContext.resume();
      if (activePlayback !== playback) return;
      const selected = choice.value;
      let buffer = cache.get(selected);
      if (!buffer) {
        const samples = await variants[selected].render();
        if (activePlayback !== playback) return;
        buffer = audioContext.createBuffer(1, samples.length, sampleRate);
        buffer.copyToChannel(samples, 0);
        cache.set(selected, buffer);
      }
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
      playback.source = source;
      source.onended = playback.cancel;
    } catch {
      if (activePlayback !== playback) return;
      playback.cancel();
      status.textContent = '音频未能启动。';
    }
  });

  button.disabled = false;
  update();
}

function spliceExample(crossfade) {
  const seam = 0.55;
  const overlapSeconds = 0.016;
  const clipSeconds = 1.05;
  const interval = 1.35;
  const samples = new Float32Array(Math.round((interval + clipSeconds) * sampleRate));
  for (let index = 0; index < samples.length; index++) {
    const time = (index / sampleRate) % interval;
    if (time >= clipSeconds) continue;
    const offset = time - seam;
    const weight = crossfade ? Math.max(0, Math.min(1, (offset + overlapSeconds / 2) / overlapSeconds)) : Number(offset >= 0);
    const edgeFade = Math.min(1, time / 0.025, (clipSeconds - time) / 0.1);
    const first = 0.29 * Math.cos(twoPi * 277 * offset) + 0.06 * Math.sin(twoPi * 554 * offset);
    const next = 0.29 * Math.cos(twoPi * 293 * offset + Math.PI) + 0.06 * Math.sin(twoPi * 586 * offset);
    samples[index] = edgeFade * (first * (1 - weight) + next * weight);
  }
  return samples;
}

if (typeof document !== 'undefined') {
  mountProductionAudio('pop-edit-crossfade', {
    cut: {
      description: '两个持续音片段在振幅相差较大的位置硬切，接缝会出现短促的杂声。同一接缝重复两次。',
      render: () => spliceExample(false)
    },
    crossfade: {
      description: '相同接缝改为 16 毫秒交叉淡化。前段渐弱、后段渐强，换音仍然清楚，突兀的接缝声减轻。',
      render: () => spliceExample(true)
    }
  });
}

function addSound(samples, time, duration, makeSample) {
  const start = Math.round(time * sampleRate);
  const length = Math.round(duration * sampleRate);
  for (let index = 0; index < length && start + index < samples.length; index++) {
    samples[start + index] += productionLevel * makeSample(index / sampleRate);
  }
}

function tone(frequency, time) {
  return Math.sin(twoPi * frequency * time);
}

export function productionTracks() {
  const lead = new Float32Array(phraseLength);
  const pad = new Float32Array(phraseLength);
  const beat = new Float32Array(phraseLength);
  const leadNotes = [
    [0, 0.7, 67], [1, 0.38, 69], [1.5, 0.54, 72], [2.25, 0.48, 71],
    [4, 0.63, 72], [4.75, 0.52, 74], [5.5, 1.0, 76], [6.75, 0.8, 72]
  ];
  const frequency = midi => 440 * 2 ** ((midi - 69) / 12);

  for (const [position, beats, pitch] of leadNotes) {
    const duration = beats * beatSeconds;
    const fundamental = frequency(pitch);
    addSound(lead, position * beatSeconds, duration, time => {
      const envelope = Math.min(1, time / 0.018, (duration - time) / 0.045);
      return 0.073 * envelope * (0.65 * tone(fundamental, time)
        + tone(fundamental * 2, time) + 0.2 * tone(fundamental * 4, time));
    });
  }

  for (const [bar, pitches] of [[0, [48, 55, 60, 64]], [1, [45, 57, 60, 64]]]) {
    const duration = 3.96 * beatSeconds;
    for (const pitch of pitches) {
      const fundamental = frequency(pitch);
      addSound(pad, bar * 4 * beatSeconds, duration, time => {
        const envelope = Math.min(1, time / 0.05, (duration - time) / 0.12);
        return 0.052 * envelope * (0.53 * tone(fundamental, time)
          + 0.55 * tone(fundamental * 3, time) + tone(fundamental * 4, time)
          + 0.3 * tone(fundamental * 5.02, time));
      });
    }
  }

  for (const [position, strength] of [[0, 0.32], [2, 0.26], [4, 0.72], [6, 0.43]]) {
    addSound(beat, position * beatSeconds, 0.26, time =>
      strength * Math.min(1, time / 0.006, (0.26 - time) / 0.035) * Math.exp(-17 * time)
        * Math.sin(twoPi * (50 * time + 67 * (1 - Math.exp(-22 * time)) / 22))
    );
  }

  let seed = 97;
  let lastNoise = 0;
  for (const [position, strength, duration] of [[1, 0.12, 0.1], [3, 0.12, 0.1], [4, 0.37, 0.5], [5, 0.15, 0.1], [7, 0.15, 0.1]]) {
    addSound(beat, position * beatSeconds, duration, time => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const noise = seed / 2147483648 - 1;
      const bright = (noise - lastNoise) / 2;
      lastNoise = noise;
      return strength * bright * Math.exp(-9 * time) * Math.min(1, time / 0.003, (duration - time) / 0.04);
    });
  }
  return { lead, pad, beat };
}

export function sumTracks(...tracks) {
  return tracks[0].map((_, index) => tracks.reduce((sum, track) => sum + track[index], 0));
}
