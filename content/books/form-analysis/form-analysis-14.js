import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const primary = {
  upper: 'C4.8 E4.8 G4.8 C5.8 G4.4 E4.4 | D4.4 B3.4 C4.2',
  lower: '(C3 E3 G3).1 | (G2 B2 F3).2 (C3 E3 G3).2'
};

function grandStaff(upper, lower, key = 'C') {
  return String.raw`\ks (${key}) \ts (4 4) ${upper} ||
    \staff { score } \tuning (none) \clef F4 \ks (${key}) ${lower}`;
}

const development = grandStaff(String.raw`
  \section ("主部题头") ${primary.upper} |
  \section ("引入") G4.8 B4.8 D5.8 G5.8 D5.4 B4.4 | B4.4 C5.4 D5.4 G#4.4 |
  \section ("展开中心") A4.8 C5.8 A4.8 C5.8 A4.8 C5.8 A4.8 C5.8 |
  D5.8 F5.8 D5.8 F5.8 D5.8 F5.8 D5.8 F5.8 |
  F5.8 A5.8 F5.8 A5.8 F5.8 A5.8 F5.8 A5.8 |
  D5.8 F5.8 D5.8 F5.8 F#4.4 A4.4 |
  \section ("属准备") D5.4 E5.4 D5.4 F5.4 | B4.2 D5.4 B4.4 |
  \section ("再现开始") ${primary.upper}
`, `${primary.lower} |
  (G2 B2 D3).1 | (E3 G#3 D4).1 |
  (A2 C3 E3).1 | (D3 F3 A3).1 | (F3 A3 C4).1 | (D3 F3).2 (D3 F#3 C4).2 |
  (G2 D3 F3).1 | (G2 B2 F3).1 |
  ${primary.lower}
`);

mountFormAnalysis(document.querySelector('#sonata-development-return'), {
  score: {
    tempo: 108,
    notes: development,
    onScoreLoaded(score) {
      score.tracks[0].addLineBreaks(4);
      score.tracks[0].addLineBreaks(8);
    }
  },
  sections: [
    { id: 'primary-motif', label: '题头参照', first: 1, last: 2, material: '四个八分音符组成上行分解和弦', key: 'C 大调' },
    { id: 'development-opening', label: '展开引入', first: 3, last: 4, material: '题头在 G 大调出现，承接呈示部的副调', role: 'E7 引向 a 小调' },
    { id: 'development-core', label: '中心展开', first: 5, last: 8, material: '从四音题头抽出两个八分音符并反复、移位', key: 'a 小调 → d 小调 → F 大调', role: '结束处用 D7 引向 G' },
    { id: 'dominant-preparation', label: '属准备', first: 9, last: 10, material: 'G 低音持续，其他声部反复勾勒属七和弦', role: '把主调的解决留给再现开头' },
    { id: 'first-return', label: '再现起点', first: 11, last: 12, material: '四音题头恢复原样', key: '回到 C 大调', role: '主调主和弦在再现起点落定' }
  ],
  wholeLabel: '示范全谱'
});

const exposition = grandStaff(String.raw`
  \section ("主部") ${primary.upper} |
  \section ("连接部") C4.8 E4.8 G4.8 C5.8 B4.4 A4.4 | A4.8 C5.8 A4.8 F#4.8 D4.2 |
  \section ("副部") \ks G D5.2 B4.4 A4.4 | G4.2 A4.2 | B4.4 D5.4 C5.4 B4.4 | A4.4 F#4.4 G4.2 |
  \section ("结束部") D5.8 B4.8 G4.4 A4.4 G4.4 | F#4.4 A4.4 G4.2
`, String.raw`${primary.lower} |
  C3.2 (A2 E3).2 | (D3 F#3 C4).1 |
  \ks G (G2 B2 D3).1 | (G2 B2).2 (D3 F#3).2 | (G2 B2).2 (C3 E3).2 | (D3 F#3 C4).2 (G2 B2 D3).2 |
  (G2 B2 D3).2 (D3 F#3 C4).2 | (D3 F#3 C4).2 (G2 B2 D3).2
`);

const recapitulation = grandStaff(String.raw`
  \section ("主部再现") ${primary.upper} |
  \section ("连接改写") C4.8 E4.8 G4.8 C5.8 B4.4 A4.4 | D4.8 F4.8 D4.8 B3.8 G4.2 |
  \section ("副部归主") G4.2 E4.4 D4.4 | C4.2 D4.2 | E4.4 G4.4 F4.4 E4.4 | D4.4 B3.4 C4.2 |
  \section ("结束部归主") G4.8 E4.8 C4.4 D4.4 C4.4 | B3.4 D4.4 C4.2
`, `${primary.lower} |
  C3.2 (F3 A3).2 | (G2 B2 F3).1 |
  (C3 E3 G3).1 | (C3 E3).2 (G2 B2).2 | (C3 E3).2 (F3 A3).2 | (G2 B2 F3).2 (C3 E3 G3).2 |
  (C3 E3 G3).2 (G2 B2 F3).2 | (G2 B2 F3).2 (C3 E3 G3).2
`);

mountScoreWritingSteps(document.querySelector('#sonata-recapitulation-tonal-return'), {
  score: { tempo: 108 },
  steps: [
    {
      label: '呈示部',
      notes: exposition,
      description: '主部建立 C 大调。连接转向 D7，副部与结束部均在 G 大调上收束。',
      highlights: [{ staff: 2, bar: 4, beat: 1 }, { staff: 1, bar: 5, beat: 1 }, { staff: 2, bar: 10, beat: 2 }]
    },
    {
      label: '再现部',
      notes: recapitulation,
      description: '主部保留。连接以 G7 为目标，副部和结束部的原材料移到 C 大调。',
      highlights: [{ staff: 2, bar: 4, beat: 1 }, { staff: 1, bar: 5, beat: 1 }, { staff: 2, bar: 10, beat: 2 }]
    }
  ]
});

mountScoreWritingSteps(document.querySelector('#sonata-f-minor-secondary-comparison'), {
  score: { tempo: 132 },
  steps: [
    {
      label: '呈示（降 A 大调）',
      notes: grandStaff(
        String.raw`\ac Fb5.4 | Eb5.4 Db5.4 Bb4.4 G4.4 | Fb4.4 { d } Eb4.8 Ab4.4 r.4`,
        String.raw`\ac r.4 | (Eb3 G3 Bb3 Db4).1 | (Eb3 G3 Db4).2 (Ab2 C3 Eb3).4 r.4`,
        'Abmajor'
      ),
      description: '上方旋律用了降六级 F♭，没有唱出调式三音。低声部主和弦中的 C 提供降 A 大调色彩。',
      highlights: [{ staff: 1, bar: 1, beat: 1 }, { staff: 2, bar: 3, beat: 2 }]
    },
    {
      label: '再现（f 小调）',
      notes: grandStaff(
        String.raw`\ac Db5.4 | C5.4 Bb4.4 G4.4 E4.4 | Db4.4 { d } C4.8 F4.4 r.4`,
        String.raw`\ac r.4 | (C3 E3 G3 Bb3).1 | (C3 E3 Bb3).2 (F2 Ab2 C3).4 r.4`,
        'Fminor'
      ),
      description: '旋律的音程与节奏保持一致，整体移低小三度。主和弦中的 A♭ 确认 f 小调色彩。',
      highlights: [{ staff: 1, bar: 1, beat: 1 }, { staff: 2, bar: 3, beat: 2 }]
    }
  ]
});
