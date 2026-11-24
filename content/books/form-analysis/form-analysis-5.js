import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { preludeInEMinor } from './chopin-28-4.js';

const sections = [
  {
    id: 'opening', label: '上句', first: 1, last: 13, rangeLabel: '弱起及第 1–12 小节',
    material: '长音旋律平缓下行，伴奏各声部交替作半音移动',
    role: '第 12 小节停在属七和弦，旋律带出下句'
  },
  {
    id: 'second-phrase', label: '下句开头', first: 14, last: 17, rangeLabel: '第 13–16 小节',
    material: '旋律重复上句开头，部分和弦换得更密',
    role: '第 16 小节开始明显加紧'
  },
  {
    id: 'climax', label: '高潮与回落', first: 18, last: 21, rangeLabel: '第 17–20 小节',
    material: '第 17 小节低音 B 的八度与旋律的急速跳进形成高潮',
    role: '回落后第 20 小节才有明确的属和弦'
  },
  {
    id: 'deceptive', label: '假终止与延宕', first: 22, last: 24, rangeLabel: '第 21–23 小节',
    material: '高声部到 E，低音去 C，主音上响的是别的和弦',
    role: '第 22 小节出现终止四六，随后又转向副属和弦'
  },
  {
    id: 'close', label: '完全终止', first: 25, last: 26, rangeLabel: '第 24–25 小节',
    material: '低音从属音 B 回到主音 E',
    role: '旋律落 E，同时首次出现原位主和弦，完成全曲的收束'
  }
];

mountFormAnalysis(document.querySelector('#one-part-cadence-score'), {
  score: { tempo: 48, notes: preludeInEMinor },
  sections
});
