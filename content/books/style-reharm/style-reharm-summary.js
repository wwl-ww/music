import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { baseMelody, harmonyBeat, pianoScore, primaryVoicings } from './style-reharm-base.js';

const tail = [
  harmonyBeat('G2 F3 B3 G4', 'G7'),
  harmonyBeat(primaryVoicings.F, 'F'),
  harmonyBeat(primaryVoicings.C, 'C')
];

mountScoreWritingSteps(document.getElementById('reharm-one-note'), {
  score: { tempo: 92 },
  steps: [
    {
      label: 'F · Dm7',
      description: '第 13 小节伴奏上声部是 F。Dm7 是 C 大调调内属前和弦，旋律的 A 与 C 都是它的和弦音。',
      notes: pianoScore(baseMelody.slice(12), [harmonyBeat('D3 A3 C4 F4', 'Dm7'), ...tail])
    },
    {
      label: 'F♯ · D7',
      description: '只把 F 升为 F♯。Dm7 变成 G 的副属和弦 D7，F♯ 上行到 G，七音 C 下行到 B。全段仍以 C 为主音。',
      notes: pianoScore(baseMelody.slice(12), [harmonyBeat('D3 A3 C4 F#4', 'D7'), ...tail])
    }
  ]
});

const melodyInC = ['A4.1', 'G4.2 F4.2', 'E4.2 C4.2'];
const melodyInF = ['D5.1', 'C5.2 Bb4.2', 'A4.2 F4.2'];
mountScoreWritingSteps(document.getElementById('reharm-transposed-voicings'), {
  score: { tempo: 92 },
  steps: [
    {
      label: 'C 大调',
      description: 'D7(♭9)–G7–C。F♯ 上行到 G，E♭ 下行到 D，分别说明副属导音和变化九音的去向。',
      notes: pianoScore(melodyInC, [
        harmonyBeat('D3 A3 C4 Eb4 F#4', 'D7(♭9)'),
        harmonyBeat('G2 F3 B3 D4 G4', 'G7'),
        harmonyBeat(primaryVoicings.C, 'C')
      ])
    },
    {
      label: 'F 大调 · 直接移调',
      description: 'G7(♭9)–C7–F。导音和降九音移成 B 与 A♭，仍分别走向 C 与 G。',
      notes: pianoScore(melodyInF, [
        harmonyBeat('G3 D4 F4 Ab4 B4', 'G7(♭9)'),
        harmonyBeat('C3 Bb3 E4 G4 C5', 'C7'),
        harmonyBeat('F3 A3 C4 F4', 'F')
      ], { key: 'F' })
    },
    {
      label: 'F 大调 · 重排配置',
      description: '伴奏降低部分声部，并从 G7(♭9) 省去五音 D。B→C、F→E 和 A♭→G 的连接仍然完整。',
      notes: pianoScore(melodyInF, [
        harmonyBeat('G2 F3 B3 Ab4', 'G7(♭9)'),
        harmonyBeat('C3 E3 Bb3 C4 G4', 'C7'),
        harmonyBeat('F2 C3 A3 F4', 'F')
      ], { key: 'F' })
    }
  ]
});
