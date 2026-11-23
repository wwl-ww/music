import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { pathetiqueEpisode } from './pathetique-episode-notes.js';

const sections = [
  [1, 1, '插部弱起', '前段收在 C 上。低声部在小节后半以 A♭–C–E♭ 起句，接入降 A 大调插部'],
  [2, 5, '一音对一音', '主题在高声部。开头两小节上下都按二分音符起音，接近第一类对位。句尾把时值缩短，仍以对齐的起音收束'],
  [6, 9, '换位与切分', '主题移到低声部，起音从 C 到 A♭，下移大十度。上方较长的音从弱位开始，F、E♭ 各跨一条小节线，形成第四类的变强弱。末小节回到对齐的起音'],
  [10, 13, '高八度再陈', '第一句在高八度重现，两条线加入三度或六度等平行音。第 11 至 12 小节出现跨小节的切分，末尾恢复同步'],
  [14, 17, '换位句再陈', '第二句也提高八度重述，仍由下面带出主题，上面保留跨小节的切分，并加入平行音'],
  [18, 21, '模仿过渡', '短句在两条线间先后出现，把前面的对比复调推向降 E 大调。末尾低声部的短音引进下一次主题'],
  [22, 25, '四对一与二对一', '主题回到高声部。低部的八分音符先四个配一个二分音符，主题缩短时又有两个配一个四分音符。调性回到降 A 大调'],
  [26, 29, '主题下移', '主题又在低声部。上方的连续八分音符形成第三类的起音比例，下方逐渐用较长的音和八度加厚'],
  [30, 30, '转向主调织体', '连续对位让位给强调低音 G 的分解和弦。织体和调性一起改变，开始通向 c 小调主部再现的过渡']
].map(([first, last, label, material]) => ({ id: String(first), label, first, last, material }));

const { top, inner, bass } = pathetiqueEpisode;
const notes = String.raw`\ts (2 2) \ks Cminor ${top.join(' | ')} ||
  \voice ${inner.join(' | ')} ||
  \staff { score } \tuning (none) \clef F4 ${bass.join(' | ')}`;

mountFormAnalysis(document.querySelector('#pathetique-c-episode'), {
  score: { notes, tempo: 174 },
  sections,
  barCount: top.length,
  wholeLabel: '全段'
});
