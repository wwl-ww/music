import { mountProductionAudio, productionTracks, sampleRate, sumTracks } from './pop-techniques-4.js';

const { lead, pad, beat } = productionTracks();
const mix = sumTracks(lead, pad, beat);
const comparisonRms = measure(mix).rms;

function measure(samples) {
  let peak = 0;
  let energy = 0;
  for (const sample of samples) {
    peak = Math.max(peak, Math.abs(sample));
    energy += sample ** 2;
  }
  return { peak, rms: Math.sqrt(energy / samples.length) };
}

function limitPeaks(samples, ceiling) {
  const envelope = new Float32Array(samples.length);
  const anticipation = Math.exp(-1 / (0.003 * sampleRate));
  const release = Math.exp(-1 / (0.105 * sampleRate));
  let gain = 1;
  // Anticipate transients with a short gain ramp before applying the release.
  for (let index = samples.length - 1; index >= 0; index--) {
    gain = Math.min(ceiling / Math.abs(samples[index]), 1 - (1 - gain) * anticipation);
    envelope[index] = gain;
  }
  gain = 1;
  return samples.map((sample, index) => {
    gain = Math.min(envelope[index], 1 - (1 - gain) * release);
    return sample * gain;
  });
}

function matchedVariant(samples, description) {
  const gain = comparisonRms / measure(samples).rms;
  const matched = samples.map(sample => sample * gain);
  const { peak, rms } = measure(matched);
  const decibels = amplitude => (20 * Math.log10(amplitude)).toFixed(1).replace('-', '−');
  return {
    description,
    meters: `采样峰值 ${decibels(peak)} dBFS · RMS ${decibels(rms)} dBFS · 峰均差 ${decibels(peak / rms)} dB`,
    render: () => matched
  };
}

mountProductionAudio('pop-master-limits', {
  mix: matchedVariant(mix, '第 2 小节开头的底鼓和钹比前一小节更强，音头和随后的尾音清楚分开。'),
  mild: matchedVariant(limitPeaks(mix, 0.36), '轻度限制削低最高的几个尖峰。第 2 小节第一拍仍明显强于前一小节。'),
  heavy: matchedVariant(limitPeaks(mix, 0.10), '重度限制削弱第 2 小节第一拍，鼓点的冲击减小。补偿电平后，持续的伴奏更突出。')
});
