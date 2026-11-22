const example = document.querySelector('.tuning-audio');
const button = example.querySelector('.score-playback');
const status = example.querySelector('.score-status');
const steps = [...example.querySelectorAll('.tuning-steps li')];
const choice = document.getElementById('tuning-interval');
const tonic = 440 * 2 ** (-9 / 12);
const tunings = ['纯律', '十二平均律', '五度相生律'];
const intervals = {
  third: [5 / 4, 2 ** (4 / 12), 81 / 64],
  fifth: [3 / 2, 2 ** (7 / 12), 3 / 2],
  sixth: [5 / 3, 2 ** (9 / 12), 27 / 16],
  seventh: [15 / 8, 2 ** (11 / 12), 243 / 128]
};
const segment = 2.1;
const sounding = 1.8;
let context;
let active;

function stop() {
  if (!active) return;
  cancelAnimationFrame(active.frame);
  active.gain?.disconnect();
  active = undefined;
  example.classList.remove('playing');
  button.setAttribute('aria-label', '播放律制对照');
  for (const step of steps) step.classList.remove('current');
}

function showCents() {
  stop();
  const ratios = intervals[choice.value];
  steps.forEach((step, index) => {
    const cents = Math.round(1200 * Math.log2(ratios[index]));
    step.textContent = `${tunings[index]} · ${cents} 音分`;
  });
}

choice.addEventListener('change', showCents);
showCents();

button.addEventListener('click', async () => {
  if (active) {
    stop();
    return;
  }

  const playback = {};
  const ratios = intervals[choice.value];
  active = playback;
  example.classList.add('playing');
  button.setAttribute('aria-label', '停止播放');
  status.textContent = '';
  try {
    context ??= new AudioContext();
    await context.resume();
    if (active !== playback) return;

    const start = context.currentTime + 0.04;
    const real = new Float32Array([0, 1, 0.32, 0.19, 0.14, 0.11]);
    const wave = context.createPeriodicWave(real, new Float32Array(real.length));
    const gain = context.createGain();
    gain.connect(context.destination);
    playback.gain = gain;

    ratios.forEach((ratio, index) => {
      const begin = start + segment * index;
      const end = begin + sounding;
      gain.gain.setValueAtTime(0, begin);
      gain.gain.linearRampToValueAtTime(0.11, begin + 0.04);
      gain.gain.setValueAtTime(0.11, end - 0.08);
      gain.gain.linearRampToValueAtTime(0, end);
      for (const frequency of [tonic, tonic * ratio]) {
        const note = context.createOscillator();
        note.setPeriodicWave(wave);
        note.frequency.value = frequency;
        note.connect(gain);
        note.start(begin);
        note.stop(end);
      }
    });

    function follow() {
      if (active !== playback) return;
      const elapsed = context.currentTime - start;
      if (elapsed >= segment * (ratios.length - 1) + sounding) {
        stop();
        return;
      }
      const index = Math.floor(elapsed / segment);
      steps.forEach((step, position) => step.classList.toggle('current', position === index));
      playback.frame = requestAnimationFrame(follow);
    }
    follow();
  } catch {
    if (active !== playback) return;
    stop();
    status.textContent = '音频未能启动。';
  }
});
