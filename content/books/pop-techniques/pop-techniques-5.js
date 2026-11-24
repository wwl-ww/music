import { mountProductionAudio, productionTracks, sampleRate, sumTracks } from './pop-techniques-4.js';

const { lead, pad, beat } = productionTracks();
const dry = sumTracks(lead, pad, beat);

function addLeadDelay() {
  const result = dry.slice();
  for (const [seconds, gain] of [[0.28, 0.53], [0.56, 0.33], [0.84, 0.2]]) {
    const offset = Math.round(seconds * sampleRate);
    for (let index = offset; index < result.length; index++) {
      result[index] += gain * lead[index - offset];
    }
  }
  return result;
}

async function trimPadMidrange() {
  const context = new OfflineAudioContext(1, pad.length, sampleRate);
  const source = context.createBufferSource();
  source.buffer = context.createBuffer(1, pad.length, sampleRate);
  source.buffer.copyToChannel(pad, 0);

  const filter = context.createBiquadFilter();
  filter.type = 'peaking';
  filter.frequency.value = 920;
  filter.Q.value = 1.25;
  filter.gain.value = -10;
  source.connect(filter).connect(context.destination);
  source.start();
  const processed = await context.startRendering();
  return sumTracks(lead, processed.getChannelData(0), beat);
}

mountProductionAudio('pop-mix-ambience', {
  dry: {
    description: '旋律、伴奏和节拍的默认平衡不含额外延迟，句间有明显空档。',
    render: () => dry
  },
  delay: {
    description: '只在前景旋律上加延迟。第 1 小节旋律停下后，重复音会进入原来的句间空档。',
    render: addLeadDelay
  }
});

mountProductionAudio('pop-mix-masking', {
  bypass: {
    description: '前景旋律的音量固定。较密的伴奏中频会盖住旋律较弱的起音。',
    render: () => dry
  },
  notch: {
    description: '只衰减伴奏在 920 Hz 附近的频率，旋律的起音和音高变得容易辨认。该频率由本例的音色决定。',
    render: trimPadMidrange
  }
});
