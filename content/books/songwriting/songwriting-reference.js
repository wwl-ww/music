import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';

mountRangeKeyboards(
  document.getElementById('song-voice-range-keyboards'),
  document.getElementById('song-voice-range-table'),
  {
    firstOctave: 2,
    octaves: 4,
    caption: '独唱实音与齐唱记谱音区',
    upperLabel: '向上扩展至',
    markLimits: false
  }
);
