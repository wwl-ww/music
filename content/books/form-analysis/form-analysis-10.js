import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const theme = {
  upper: 'C5.8 D5.8 E5.4 G5.4 E5.4 | D5.4 B4.4 C5.2',
  lower: '(C3 E3 G3).1 | (G2 B2 D3).2 (C3 E3 G3).2'
};
const firstEpisode = {
  upper: 'A4.4 C5.4 B4.4 A4.4 | G#4.4 B4.4 A4.2',
  lower: '(A2 C3 E3).1 | (E2 G#2 B2).2 (A2 C3 E3).2'
};
const secondEpisode = {
  upper: 'F5.4 E5.8 D5.8 C5.4 A4.4 | Bb4.4 G4.4 F4.2',
  lower: '(F3 A3 C4).1 | (C3 E3 Bb3).2 (F3 A3).2'
};
const themeInE = {
  upper: 'E5.8 F#5.8 G#5.4 B5.4 G#5.4 | F#5.4 D#5.4 E5.2',
  lower: '(E3 G#3 B3).1 | (B2 D#3 F#3).2 (E3 G#3 B3).2'
};
const thirdEpisode = {
  upper: 'Bb4.8 A4.8 G4.4 D5.8 C5.8 Bb4.4 | A4.4 F#4.4 G4.2',
  lower: '(G2 Bb2 D3).1 | (D3 F#3 C4).2 (G2 Bb2).2'
};

function miniature(parts, { showKeys = false } = {}) {
  const keySignature = key => showKeys ? String.raw`\ks (${key}) ` : '';
  const upper = parts.map(([label, part, key]) =>
    String.raw`\section ("${label}") ${keySignature(key)}${part.upper}`
  ).join(' | ');
  const lower = parts.map(([, part, key]) => `${keySignature(key)}${part.lower}`).join(' | ');
  return String.raw`\ks C \ts (4 4) ${upper} || \staff { score } \tuning (none) \clef F4 ${lower}`;
}

const a = ['A', theme, 'C'];
const b = ['B', firstEpisode, 'Aminor'];
const c = ['C', secondEpisode, 'F'];
const d = ['D', thirdEpisode, 'Gminor'];
const traditionalOrder = [a, b, a, c, a];

mountScoreWritingSteps(document.querySelector('#rondo-refrain-and-episodes'), {
  score: { tempo: 112 },
  steps: [
    { label: 'ABACA', notes: miniature(traditionalOrder), description: 'A 出现三次。第一次回返之后，C 引入不同于 B 的旋律和节奏，末尾仍由 A 收束。' },
    { label: 'ABA', notes: miniature([a, b, a]), description: 'A 只有一次回返。B 位于两次 A 之间，形成三段式的呈示、对比、再现。' },
    { label: 'ABABA', notes: miniature([a, b, a, b, a]), description: 'A 回返两次，两次间隔都采用同一个 B。这组材料关系可形成双三段式。' }
  ]
});

function tambourin(upper, lower) {
  return String.raw`\ks Eminor \ts (2 2) ${upper} || \staff { score } \tuning (none) \clef F4 \ks Eminor ${lower}`;
}

mountScoreWritingSteps(document.querySelector('#rondo-tambourin-excerpts'), {
  score: { tempo: 132 },
  steps: [
    {
      label: 'A 叠部',
      notes: tambourin(String.raw`\ac E4.8 F#4.8 G4.8 F#4.8 | E4.4 B4.4 B4.4 A4.4 | G4.4 F#4.4 E4.8 F#4.8 G4.8 A4.8`, String.raw`\ac r.2 | (E2 B2 E3).2 D#3.2 | (E2 B2 E3).2 r.2`),
      description: '四个八分音符的弱起开启舞曲。E 低音与朴素的主属交替确立 e 小调。'
    },
    {
      label: 'B 第一插部',
      notes: tambourin(String.raw`\ac E5.8 F#5.8 G5.8 F#5.8 | E5.4 B4.4 C5.4 B4.4`, String.raw`\ac r.2 | (E2 B2 E3).2 D#3.2`),
      description: '弱起仍是叠部的音型，高一个八度进入。后续以叠部的副动机组织两句，停在属功能上。'
    },
    {
      label: 'C 第二插部',
      notes: tambourin('A#4.4 B4.4 B4.4 A4.4 | G#4.4 A4.4 A4.4 G4.4', 'E2.1 | E2.1'),
      description: '短音型连续降低，A♯—B 与 G♯—A 的相邻进行在 E 持续低音上改变色彩。'
    },
    {
      label: 'D 第三插部',
      notes: tambourin('E5.4 B4.4 G5.4 F#5.4', '(E2 B2 E3).4 r.4 r.2'),
      description: '高音区以跳进和重复积累动力。此后延续的八分音符下行，并渗入最后一次叠部。'
    }
  ]
});

mountScoreWritingSteps(document.querySelector('#rondo-expanded-refrain'), {
  score: { tempo: 112 },
  steps: [
    { label: '主部原调回返', notes: miniature(traditionalOrder, { showKeys: true }), description: 'A 的三次出现均用 C 大调。两个插部转换调性，和同一主调建立对照。' },
    { label: '主部变调回返', notes: miniature([a, b, ['A′', themeInE, 'E'], c, a], { showKeys: true }), description: '中间一次 A 保留节奏和音程轮廓，移到 E 大调。最后一次 A 回到 C 大调。' },
    { label: '两个插部连缀', notes: miniature([a, b, a, c, d, a], { showKeys: true }), description: 'C 收束后直接接新的 D，两个插部之间暂时略过 A。主部最后回返，仍把全曲联系起来。' }
  ]
});
