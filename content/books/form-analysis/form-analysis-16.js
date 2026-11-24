import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';

const refrain = {
  upper: 'E4.8 G4.8 C5.4 G4.4 E4.4 | F4.4 A4.4 G4.4 E4.4 | D4.4 F4.4 E4.4 D4.4 | C4.1',
  lower: 'C3.2 G3.2 | F3.2 C3.2 | (G2 B2 D3).1 | (C3 E3 G3).1'
};
const firstEpisode = {
  upper: 'B4.2 A4.4 G4.4 | A4.2 G4.4 E4.4 | A4.4 C5.4 B4.4 F#4.4 | G4.1',
  lower: '(G2 B2 D3).1 | (C3 E3 G3).1 | (D3 F#3 C4).1 | (G2 B2 D3).1'
};
const middle = {
  upper: 'A4.4 E4.4 A4.4 C5.4 | B4.8 A4.8 G#4.4 E4.4 G#4.4 | A4.4 F4.4 D4.4 A4.4 | B4.4 A4.4 G4.4 F4.4',
  lower: 'A2.1 | (E3 G#3).1 | (D3 F3 A3).1 | (G2 B2 F3).1'
};
const returningEpisode = {
  upper: 'E5.2 D5.4 C5.4 | D5.2 C5.4 A4.4 | D5.4 F5.4 E5.4 B4.4 | C5.1',
  lower: '(C3 E3 G3).1 | (F3 A3 C4).1 | (G2 B2 F3).1 | (C3 E3 G3).1'
};

const passages = [
  { name: 'A', label: 'A 初呈', music: refrain, key: 'C 大调', role: '叠部以八分音符题头开头' },
  { name: 'B', label: 'B 插部', music: firstEpisode, key: 'G 大调', role: '长音题头，高声部以升 F 引向 G' },
  { name: 'A', label: 'A 回归', music: refrain, key: 'C 大调', role: '叠部回归，呈示部结束于主调' },
  { name: 'C', label: 'C 中部', music: middle, key: '从 a 小调进入', role: '属七和弦引向叠部' },
  { name: 'A', label: 'A 再现', music: refrain, key: 'C 大调', role: '再现部由叠部开始' },
  { name: 'B′', label: 'B′ 回归', music: returningEpisode, key: 'C 大调', role: 'B 的旋律移高纯四度，属七和弦伴奏换到较低音区' },
  { name: 'A', label: 'A 收束', music: refrain, key: 'C 大调', role: '最后一次叠部在主调完全收束' }
];

const upper = passages.map(({ name, music }) => String.raw`\section ("${name}") ${music.upper}`).join(' | ');
const lower = passages.map(({ music }) => music.lower).join(' | ');

mountFormAnalysis(document.getElementById('sonata-rondo-key-return'), {
  score: {
    tempo: 112,
    notes: String.raw`\ks C \ts (4 4) ${upper} ||
      \staff { score } \tuning (none) \clef F4 ${lower}`,
    onScoreLoaded(score) {
      for (let index = 1; index < passages.length; index++) score.tracks[0].addLineBreaks(index * 4);
    }
  },
  sections: passages.map(({ label, key, role }, index) => ({
    id: `part-${index + 1}`, label, first: index * 4 + 1, last: (index + 1) * 4, key, role
  }))
});
