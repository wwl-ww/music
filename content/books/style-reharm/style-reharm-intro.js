import { mountScore } from '../../shared/formats/score.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { baseMelody, baseScore, harmonyBeat, pianoScore, primaryVoicings } from './style-reharm-base.js';

mountScore(document.querySelector('#reharm-base figure'), {
  notation: 'staff',
  tempo: 92,
  notes: baseScore(),
  sectionNavigation: {}
});

const chordForms = [
  ['C', 'C3 E3 G3', 'C–E–G。根音、三音和五音组成大三和弦。'],
  ['Cmaj7', 'C3 E3 G3 B3', '保留 C 大三和弦，加入距根音大七度的 B。'],
  ['C7', 'C3 E3 G3 Bb3', '七音 B 降为 B♭。它与大三音 E 构成三全音。'],
  ['Cm7', 'C3 Eb3 G3 Bb3', '七音仍是 B♭，三音 E 降为 E♭，骨架成为小三和弦。']
];

mountScoreWritingSteps(document.getElementById('reharm-seventh-compare'), {
  score: { tempo: 92 },
  steps: chordForms.map(([label, pitches, description]) => ({
    label,
    description,
    notes: {
      scoreTracks: [{ name: '钢琴', program: 0, phrase: String.raw`\ts (4 4) \clef F4 ${harmonyBeat(pitches, label)}` }]
    }
  }))
});

const tonic = harmonyBeat(primaryVoicings.C, 'C');
const subdominant = harmonyBeat(primaryVoicings.F, 'F');
const dominant = harmonyBeat(primaryVoicings.G, 'G');
const minorSeventh = harmonyBeat('D3 A3 C4 F4', 'Dm7');
const dominantSeventh = harmonyBeat('G2 D3 B3 F4', 'G7');
const closeDominantSeventh = harmonyBeat('G2 F3 B3 D4', 'G7');

const cadenceMelody = ['F4.1', 'E4.2 C5.2'];
mountScoreWritingSteps(document.getElementById('reharm-cadence-types'), {
  score: { tempo: 92 },
  steps: [
    {
      label: '下属回主 · F–C',
      description: '同一个旋律长音 F，在 F 和弦上是根音。F→C 的收束保留共同音 C。',
      notes: pianoScore(cadenceMelody, [harmonyBeat('F2 F3 A3 C4', 'F'), tonic])
    },
    {
      label: '属七回主 · G7–C',
      description: '旋律的长音 F 成为 G7 的七音。伴奏中的 F→E 与 B→C 同时走半音。',
      notes: pianoScore(cadenceMelody, [closeDominantSeventh, tonic])
    }
  ]
});

const middleMelody = baseMelody.slice(4, 10);
const middleTail = [subdominant, dominant, dominant, tonic];
mountScoreWritingSteps(document.getElementById('reharm-choice-in-context'), {
  score: { tempo: 92 },
  steps: [
    {
      label: '第 6 小节用 C',
      description: 'C–C–F–G–G–C。第 6 小节延续主功能，F 与 G 依次承担推进，到第 10 小节才回主。',
      notes: pianoScore(middleMelody, [tonic, tonic, ...middleTail])
    },
    {
      label: '第 6 小节用 G',
      description: 'C–G–F–G–G–C。长音 G 仍是和弦音，低音却提前到属音，下一小节先去 F。',
      notes: pianoScore(middleMelody, [tonic, dominant, ...middleTail])
    }
  ]
});

const splitCadence = String.raw`(${primaryVoicings.F}).2 {d ch "F"} ${harmonyBeat('G2 F3 B3 D4', 'G7', 4)}`;
const ending = baseMelody.slice(12);

mountScoreWritingSteps(document.getElementById('reharm-basic-cadence'), {
  score: { tempo: 92 },
  steps: [
    {
      label: '主要三和弦',
      description: 'F–G–F–C。句尾的 F→C 由下属回主，保留第 15 小节拉长的 A。',
      notes: pianoScore(ending, [subdominant, dominant, subdominant, tonic])
    },
    {
      label: '七和弦替换',
      description: '第 13、14 小节改为 Dm7–G7。属前到属的走向保留，D3 和 F4 留在原位，句尾仍然是 F→C。',
      notes: pianoScore(ending, [minorSeventh, dominantSeventh, subdominant, tonic])
    },
    {
      label: '属七收尾',
      description: '第 15 小节最后一拍插入 G7，旋律 F 成为七音。旋律下一拍仍走 G，伴奏的 F 与 B 分别走向 E 与 C。',
      notes: pianoScore(ending, [minorSeventh, dominantSeventh, splitCadence, tonic])
    }
  ]
});
