import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { lyricBars, mountSongVariants } from './songwriting-score.js';

function song(words, bars, meter = '4 4') {
  return String.raw`\ks C \ts (${meter}) ${lyricBars(words, bars)}`;
}

const rhythmText = '河风渐起灯影轻摇远山明亮归路还长';
const openingRhythm = ['r.8 E4.8 G4.8 A4.8 G4.2', 'r.8 F4.8 E4.8 D4.8 C4.2'];
const contrastRhythm = ['r.8 C5.8 E5.8 D5.8 G4.2', 'r.8 A4.8 G4.8 E4.8 C4.2'];
mountSongVariants('song-rhythm-thread', {
  stable: {
    tempo: 86,
    notes: song(rhythmText, [...openingRhythm, ...contrastRhythm]),
    summary: '每小节都从第一拍后半起音，第三拍延长，形成一贯的节奏。后半段抬高音区并改变旋律方向，仍可听出新段。'
  },
  peak: {
    tempo: 86,
    notes: song(rhythmText, [...openingRhythm, 'G4.4 A4.8 C5.8 E5.2', contrastRhythm[1]]),
    summary: '第三小节从第一拍正点进入，长音移到全曲最高的 E5。固定节奏在高潮处让位，第四小节恢复原型。'
  }
});

const motifText = '河风掠过石桥暮色落在窗前';
const core = 'G4.8 G4.8 A4.8 G4.8';
const coreLate = 'G4.8 A4.8 G4.4';
mountSongVariants('song-motif-thread', {
  heads: {
    tempo: 76,
    notes: song(motifText, [core, 'D4.4 G4.4', core, 'E4.4 C4.4'], '2 4'),
    summary: '两句开头用同一个 G–G–A–G 动机。句尾的音另行组织，第一句给后一句留出继续的余地。'
  },
  tails: {
    tempo: 76,
    notes: song(motifText, ['C4.8 D4.8 E4.4', coreLate, 'D4.8 F4.8 A4.4', coreLate], '2 4'),
    summary: '两句的开头不同，都用 G–A–G 收尾。重复出现的后半句让前面的曲调听起来彼此呼应。'
  },
  shifted: {
    tempo: 76,
    notes: song(motifText, [core, 'D4.4 G4.4', 'E4.4 G4.4', 'C5.8 C5.8 D5.8 C5.8'], '2 4'),
    summary: '开头的 G–G–A–G 在结尾上移纯四度成为 C–C–D–C，时值和内部音程保留。动机同时换了高度和位置。'
  }
});

const quoteText = '小河绕过旧石桥';
const quote = ['E4.8 G4.8 A4.8 G4.8', 'F4.8 E4.8 G4.4'];
const leadIntoQuote = 'D4.8 E4.8 F4.8 G4.8';
const resolveQuote = 'F4.8 D4.8 C4.4';
const scene = `暮色渐浓${quoteText}人未归`;
const markTheme = bar => [1, 2, 3, 4].map(beat => ({ bar, beat }));
mountScoreWritingSteps(document.getElementById('song-theme-quotation'), {
  score: { tempo: 78 },
  steps: [
    { label: '已有音调', notes: song(quoteText, quote, '2 4'), highlights: markTheme(1), description: '第三章出现过的原创主题句。标出的四音题头在三份谱里都保留。' },
    { label: '同词重新谱曲', notes: song(scene, [leadIntoQuote, 'C4.8 D4.8 E4.8 C4.8', 'D4.8 F4.8 G4.4', resolveQuote], '2 4'), description: '暮色、石桥和等候由歌词交代。中间两小节采用新曲调。' },
    { label: '同词引用音调', notes: song(scene, [leadIntoQuote, ...quote, resolveQuote], '2 4'), highlights: markTheme(2), description: '同一位置换成前面听过的曲调。旧题头唤回河桥的写景，前后的旋律带出新的等候情境。' },
    { label: '改作结句', notes: song(`暮色渐浓${quoteText}`, [leadIntoQuote, quote[0], resolveQuote], '2 4'), highlights: markTheme(2), description: '保留引用的题头，把收腔改到主音 C。可辨的开头仍在，引用直接完成新段的收束。' }
  ]
});
