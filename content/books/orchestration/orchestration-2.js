import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountScore } from '../../shared/formats/score.js';

mountRangeKeyboards(
  document.getElementById('string-range-keyboards'),
  document.getElementById('string-range-table')
);

function mountVariants(id, variants, tempo) {
  const demo = document.getElementById(id);
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  const initial = variants[select.value];
  const score = mountScore(demo.querySelector('figure'), {
    notes: initial.notes, tempo, notation: 'staff'
  });
  cue.textContent = initial.description;
  select.addEventListener('change', () => {
    const { notes, description } = variants[select.value];
    cue.textContent = description;
    score.setNotes(notes);
  });
}

const violin = phrase => String.raw`\instrument 40 \ks G \ts (4 4) ${phrase}`;
const melody = 'G5.4 A5.4 B5.2 | D6.4 C6.4 G5.2';
const lowerVoice = phrase => String.raw` || \voice ${phrase}`;
mountVariants('string-melody-layers', {
  single: {
    notes: violin(melody),
    description: '单线呈现原旋律。三个版本使用同一小提琴音色和拍速。'
  },
  octave: {
    notes: violin(melody + lowerVoice('G4.4 A4.4 B4.2 | D5.4 C5.4 G4.2')),
    description: '下方完整复制旋律，低一个八度。上下跨度扩大，线条仍是同一条。'
  },
  thirds: {
    notes: violin(melody + lowerVoice('E5.4 F#5.4 G5.2 | B5.4 A5.4 E5.2')),
    description: '主旋律下方每次同时奏一个调内三度，构成随主线走的附属声部。'
  }
}, 84);

const soprano = 'E5.2 F5.2 | D5.2 E5.2';
const alto = 'C5.2 C5.2 | B4.2 C5.2';
const tenor = 'G3.2 A3.2 | G3.2 G3.2';
const bass = 'C3.2 F3.2 | G2.2 C3.2';
function chorale(bassLine, filler = '') {
  return String.raw`\ks C \ts (4 4) ${soprano} || \voice ${alto}
    ${filler ? lowerVoice(filler) : ''} ||
    \staff { score } \tuning (none) \clef F4 ${tenor} || \voice ${bassLine}`;
}

mountVariants('string-chorale-layout', {
  original: {
    notes: chorale(bass),
    description: '四部原型保留四条线。试听使用同一钢琴音色，以比较声部的位置。'
  },
  filler: {
    notes: chorale(bass, 'G4.2 A4.2 | G4.2 G4.2'),
    description: '第一个和弦在 C5 和 G3 之间加 G4。其余位置按当时的和弦选择填充音，最高音和最低音都保持原位。'
  },
  extension: {
    notes: chorale('(C3 C2).2 (F3 F2).2 | (G2 G1).2 (C3 C2).2'),
    description: '每个低音都在下方再复制一个八度。弦乐编配时，这条副本可交低音提琴。'
  }
}, 80);

mountVariants('string-chord-attacks', {
  pillar: {
    notes: violin('(G3 D4).16 (B4 G5).8 { d } r.2 { d }'),
    description: '这一版本用两个相接的起音示意一弓扫过四弦的顺序：低两弦迅速带过，上两弦保持。'
  },
  pairs: {
    notes: violin('(G3 D4).8 (B4 G5).8 (G3 D4).8 (B4 G5).8 (G3 D4).8 (B4 G5).8 (G3 D4).8 (B4 G5).8'),
    description: '低两弦和高两弦成对交替，和弦转化为持续的双音律动。'
  },
  arpeggio: {
    notes: violin('G3.8 D4.8 B4.8 G5.8 G5.8 B4.8 D4.8 G3.8'),
    description: '四个音按弦序向上再向下逐个发声。'
  }
}, 88);
