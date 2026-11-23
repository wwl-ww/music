import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { fugueVoices } from './bach-fugue-notes.js';

const sections = [
  [1, 4, '主题与答题', '第 1 小节中声部在 c 小调唱主题。第 3 小节高声部在 g 小调答题，中声部转入第一对题，低声部暂未加入'],
  [5, 6, '间插段Ⅰ', '上方把主题题头移到不同高度，下方用小结尾的倒影配合。由 g 小调回到 c 小调，引出低声部入口'],
  [7, 8, '低声部进入', '主题从第 7 小节低声部进入。高声部接第一对题，中声部接第二对题，三条线首次一起承担主题和两条固定对题'],
  [9, 10, '间插段Ⅱ', '上面两部错开呈示主题题头，组成卡农模进。低声部将小结尾材料连成十六分音符进行，从 c 小调过渡到降 E 大调'],
  [11, 12, '降 E 大调主题', '主题完整地回到高声部。第一对题在低处，第二对题在中声部。这里与第 7 小节的材料相同，声部位置和调性都变了'],
  [13, 14, '间插段Ⅲ', '间插段Ⅱ中位于低声部的小结尾材料，倒影后出现在高声部。下两部用对题材料相配，由降 E 大调转向 g 小调'],
  [15, 16, 'g 小调主题', '中声部唱完整主题，高声部唱第一对题，低声部唱第二对题。随后的间插段把音乐带回主调'],
  [17, 19, '间插段Ⅳ', '再用间插段Ⅰ的材料，先在新位置构成十二度复对位，高声部另加穿插动机。后半将下方两条线交换，由 g 小调回到 c 小调'],
  [20, 21, '主调中的主题', '高声部在 c 小调重奏完整主题，中、低声部再接两条固定对题'],
  [22, 26, '间插段Ⅴ', '前两小节再次用题头作卡农模进，上方两条线相对于间插段Ⅰ交换位置。低部从小结尾取材，经过 f 小调、降 B 大调、降 E 大调，回到 c 小调。第 26 小节后半，低声部已经接入完整主题'],
  [27, 31, '末次入口与主持续音', '从第 26 小节第 3 拍后半的低声部 C 起奏，完整呈现这次主题。第 29 小节后半，高声部作最后一次进入，低音 C 用延音线持续至曲终。结尾将主和弦第三音写作 E', {
    entry: { bar: 26, staff: 3, beat: 10 },
    rangeLabel: '26 小节第 3 拍后半至曲终'
  }]
].map(([first, last, label, material, playback]) => ({ id: String(first), label, first, last, material, ...playback }));

const notes = fugueVoices.map((bars, index) => {
  const staff = index ? String.raw`\staff { score } \tuning (none) ` : '';
  return String.raw`${staff}\clef ${index === 2 ? 'F4' : 'G2'} \ks Cminor \ts (4 4) ` + bars.join(' | ');
}).join(' ||\n');

mountFormAnalysis(document.querySelector('#bwv847'), {
  score: { notes, tempo: 94 },
  sections,
  barCount: fugueVoices[0].length
});
