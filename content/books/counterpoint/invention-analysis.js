import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { bachInventionNotes } from './bach-invention-notes.js';
import { modalInventionNotes } from './modal-invention-notes.js';

const description = {
  bwv772: [
    [1, 2, '主题与接应', '第 1 小节高声部从 C 起，低声部晚两拍低八度接应。第 2 小节的同一布局提高五度，把主、属两端都交代出来'],
    [3, 4, '倒影模进', '高声部把题头的上行改成下行，并连续向低处移位。低声部把这个下行轮廓拉长，跟着模进'],
    [5, 6, '属调终止', '第 5 小节把原形与倒影放在一起。第 6 小节末高声部落到 G，低声部落到 D，显示部收在 G 大调'],
    [7, 10, '从属调展开', '第 7 小节低声部先从 G 重新起句，高声部晚两拍在高八度接应。到第 9、10 小节，先后进入的改为倒影'],
    [11, 14, '复对位与小调', '第 11、12 小节把第 3、4 小节的分工交换。较密的倒影模进在下方，拉长后的轮廓在上方，调性由 d 小调走向 a 小调'],
    [15, 18, '下行模进', '倒影和原形先后在不同音区得到回答，第 17、18 小节把上一对句移低大二度，向下属方向过渡'],
    [19, 22, '回到 C 大调', '第 19、20 小节高声部把原形连续推高。末次原形与倒影模仿之后，低音 G→C 和最后的 C 大三和弦确立主调']
  ],
  bwv777: [
    [1, 4, '双主题结合', 'T₁ 在低声部，以均匀的八分音符上行。T₂ 在高声部，晚一个十六分音符起句，并把短音跨小节连住。E 大调'],
    [5, 8, '主题换位', '原来在下方的 T₁ 翻到上方，与下方切分下行的 T₂ 形成八度复对位。第 4、8 小节的小尾巴是后文的连接材料'],
    [9, 20, '切分模进', '截取两条主题结合时的切分节奏，在不同高度重现。第 18–20 小节改用主题尾部的材料收在 B 大调'],
    [21, 28, '属调上的换位', '两主题在 B 大调重新结合。第 21 小节 T₁ 在上，第 25 小节 T₁ 转到下方，各与 T₂ 继续配合'],
    [29, 42, '展开与小调', '主题尾部的短音继续模进，依次经过升 g、升 c、b 小调，第 37 小节以后重新稳定在升 g 小调'],
    [43, 50, '主题回到主调', '第 43 小节在 E 大调带回两条主题，第 47 小节再换位置。与第 1–8 小节相比，两条主题出现的上下次序对调了'],
    [51, 62, '主调结束句', '第 51–60 小节换位再用显示部的模进材料。第 60–62 小节呼应第 18–20 小节的结束句，落点由 B 改为 E']
  ],
  bwv791: [
    [1, 4, '下方四度接应', '最低声部先展开分解和弦。第 1 小节第三拍前一个十六分音符，高声部从 B♭ 起句。第 2 小节同一位置，中声部从低四度的 F 接应'],
    [5, 9, '下方五度接应', '第二个模仿句把入口距离改为低五度，时差拉长为两小节。第 9 小节收在 E♭ 大调'],
    [10, 13, '上方二度接应', '中声部先带出新句，高声部从上方二度接应。低部继续维持分解和弦，终止到达 c 小调'],
    [14, 17, '收在属调', '高声部改用上方四度接应。第 17 小节 B♭ 上的收束标出显示部终点'],
    [18, 24, '展开到 f 小调', '高声部重新发起模仿，中声部以低五度跟进。后一句把听感稳定到 f 小调'],
    [25, 28, '下属方向', '换为中声部发起、高声部在上方四度回答，乐句朝 A♭ 大调过渡'],
    [29, 38, '再现与回归', '上两部重新采用开头两句的模仿布局，从 A♭ 大调起，和低音一起回到 E♭']
  ],
  bwv801: [
    [1, 6, '主题、对题与小结尾', 'A 是低声部的主题，B 是高声部反复跳回 F♯ 的对题，C 是第 3 小节高声部快速的连接音型。第 4–6 小节交换两线的分工'],
    [7, 10, '对题的卡农模进', '上面两个声部用 B 先后追唱。下面的声部继续用 A 的材料，随上方下移。调性由 A 大调走向 G 大调'],
    [11, 13, '小结尾发展为插句', '把第 3 小节的 C 单独拿来作卡农模进，收在 D 大调。完整主题暂时让开'],
    [14, 19, '移位再陈', '重新结合开篇的材料。先从 D 大调转向 A 大调，再把这一组提高五度，变奏到 e 小调'],
    [20, 25, '卡农模进与倒影', '先把第 7–9 小节的模进移低五度。上部继续追唱 B 时，低部把 A 的方向反过来，最后走回 b 小调'],
    [26, 32, '主调中的倒影插句', '从第 26 小节开始主调已稳定。第 26–28 小节让 C 以倒影形式追唱，第 29–32 小节再用 A、B 推向高潮'],
    [33, 38, '材料重组与终止', '两小节 C 的模仿接出 A 与 B 的再次结合。结尾的 F♯→B 和两端的 B 把它们收在 b 小调']
  ],
  'modal-invention': [
    [1, 2, 'A 商主题', '主题 T 由高声部单独唱出。用的是 G、A、B、D、E 五个音，长音 A 落在第一小节末'],
    [3, 4, '低处主题与固定对题', '第 3 小节低声部低八度接过 T。上方的 CT 以较长的 A 起步，进入自己的连续短音，两条线的起落错开'],
    [5, 6, '换位与 E 商', 'T 回到高声部，从 E 起。低声部唱 CT，在新音区保留此前的轮廓。F♯ 进入五声音列，显示部在 E 商结束'],
    [7, 8, '倒影与 B 商', '低声部的主题从 B 向下跳到 E。原主题第一次是从 A 向上跳到 E，跳进的方向倒过来了。上声部同时唱 CT 的倒影'],
    [9, 10, '倒影材料换位', '倒影主题回到上方，从 E 向下跳到 A，下方接过倒影对题。两部交换以后仍保留各自反过来的走向'],
    [11, 12, '回到 A 商', '原形由低声部回到 A，开头又是向上跳到 E。主题重新使用 B，保持 G 宫系统里的 A 商音列'],
    [13, 14, '主题回到上方', 'T 回到高声部，CT 接到下面。第 13、14 小节可以与第 11、12 小节逐拍对照谁唱哪一条线'],
    [15, 16, '主题尾部与终止', '主题末尾的短音继续在两部穿插。低处的 A 和高处的 A 共同收束，末尾的高音琶音延长主音感']
  ]
};

function analysisScore({ key, meter, tempo, clefs, voices, innerVoices = [] }) {
  const notes = voices.map((bars, index) => {
    const staff = index > 0 ? String.raw`\staff { score } \tuning (none) ` : '';
    const principal = String.raw`${staff}\clef ${clefs[index]} \ks ${key} \ts (${meter}) ` + bars.join(' | ');
    return innerVoices[index] ? principal + String.raw` || \voice ` + innerVoices[index].join(' | ') : principal;
  }).join(' ||\n');
  return { tempo, notes };
}

const scores = { ...bachInventionNotes, 'modal-invention': modalInventionNotes };
const mounted = new WeakSet();

function mountWork(target) {
  if (mounted.has(target)) return;
  mounted.add(target);
  observer.unobserve(target);
  const piece = scores[target.id];
  const sections = description[target.id].map(([first, last, label, material]) => ({
    id: String(first), first, last, label, material
  }));
  mountFormAnalysis(target, { score: analysisScore(piece), sections, barCount: piece.bars });
}

const observer = new IntersectionObserver(entries => {
  for (const { target, isIntersecting } of entries) {
    if (isIntersecting) mountWork(target);
  }
}, { rootMargin: '240px' });

for (const example of document.querySelectorAll('[data-invention-analysis]')) observer.observe(example);

function revealLinkedWork() {
  const work = document.getElementById(location.hash.slice(1));
  if (!work?.hasAttribute('data-invention-analysis')) return;
  mountWork(work);
  requestAnimationFrame(() => work.scrollIntoView({ block: 'start' }));
}

revealLinkedWork();
window.addEventListener('hashchange', revealLinkedWork);
