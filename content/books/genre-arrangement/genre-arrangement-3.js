import { mountGuitarChordDiagrams } from '../../shared/formats/guitar-chord-diagram.js';
import { guitarBrush, guitarNotes, guitarTuning } from '../../shared/formats/guitar-strum.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { bandSoundFont, hits, mountGridChoices, pitchedTrack } from './genre-arrangement-foundation.js';

const eighths = Array.from({ length: 16 }, (_, index) => index * 2);
const kick = { label: '底鼓', midi: 36, events: hits([0, 8, 16, 24], [0, 16]) };
const snare = { label: '小鼓', midi: 38, events: hits([4, 12, 20, 28], [4, 12, 20, 28]) };
const closed = { label: '闭镲', midi: 42, events: hits(eighths) };
mountGridChoices('genre-drum-part', {
  groove: {
    description: '底鼓和小鼓分出低、中两层，闭镲给出持续的八分细分。',
    rows: [kick, snare, closed]
  },
  fill: {
    description: '第 1 小节后半，踩镲让出第 3、4 拍给高、低筒鼓。第 2 小节首拍由底鼓和碎音镲标出，随后恢复基础节奏。',
    rows: [kick, { ...snare, events: hits([4, 20, 28], [4, 20, 28]) },
      { ...closed, events: hits(eighths.filter(step => step < 8 || step >= 18)) },
      { label: '高筒鼓', midi: 50, events: hits([8, 10, 12], [8, 12]) },
      { label: '低筒鼓', midi: 45, events: hits([11, 13, 14], [14]) },
      { label: '碎音镲', midi: 49, events: hits([16], [16]) }
    ]
  },
  open: {
    description: '每小节在第 4 拍后半短暂换成开镲，下一拍的闭镲重新收紧细分。各个击点保持原位。',
    rows: [kick, snare,
      { ...closed, events: hits(eighths.filter(step => step % 16 !== 14)) },
      { label: '开镲', midi: 46, events: hits([14, 30], [14, 30]) }
    ]
  }
}, { bars: 2 });

const fShape = {
  label: 'F 大三和弦 · 一品横按',
  positions: [1, 3, 3, 2, 1, 1],
  degrees: ['R', '5', 'R', '3', '5', 'R'],
  barre: { fret: 1, fromString: 6, toString: 1 }
};
mountGuitarChordDiagrams(document.getElementById('genre-f-chord-diagram'), [fShape]);
const strumTempo = 90;
const strings = guitarNotes(fShape.positions);
const fChord = '(' + strings.join(' ') + ')';
const down = guitarBrush('down', strumTempo, 58);
const up = guitarBrush('up', strumTempo, 58);
const treble = '(' + strings.slice(-3).join(' ') + ')';
mountScoreWritingSteps(document.getElementById('genre-guitar-strum'), {
  score: { tempo: strumTempo, soundFontUrl: bandSoundFont },
  steps: [
    ['同时起音', fChord + '.1 { dy mp }', '六个音一起发声，音高排列保持吉他的一品横按。'],
    ['下扫', `${fChord}.1 { ${down} dy mp }`, '六根弦用同一力度。第六弦的低 F 先响，拨片向第一弦扫过。'],
    ['上扫', `${fChord}.1 { ${up} dy mp }`, '保持相同的六根弦、力度和扫过时长。第一弦的高 F 先响，拨片向第六弦扫过。'],
    ['交替刷弦', `${fChord}.4 { ${down} dy mf } r.8 ${treble}.8 { ${up} dy p } ${fChord}.4 { ${down} dy mf } r.8 ${treble}.8 { ${up} dy p }`,
      '拍头的下扫覆盖六根弦。拍后的上扫只轻扫高三弦，低音和重音留给下扫。'],
    ['分解和弦', strings.map(note => note + '.8').join(' ') + ' r.4', '保持相同的把位，改为每个八分位置拨一根弦。各音依次占据独立的节奏格。']
  ].map(([label, phrase, description]) => ({
    label, description, notes: { scoreTracks: [pitchedTrack('钢弦吉他', 25, [phrase], '', guitarTuning)] }
  }))
});

const bassBars = ['C2.1', 'F2.1'];
const keyboardVoices = ['(E4 G4 B4)', '(E4 A4 C5)'];
const variant = (label, description, program, texture) => ({
  label, description,
  notes: {
    scoreTracks: [
      pitchedTrack(label, program, texture),
      pitchedTrack('贝斯', 33, bassBars, 'F4')
    ]
  }
});
const shortChords = keyboardVoices.map(notes => notes + '.4 r.4 ' + notes + '.4 r.4');
const heldChords = keyboardVoices.map(notes => notes + '.1');
mountScoreWritingSteps(document.getElementById('genre-keys-sustain'), {
  score: { tempo: 90, soundFontUrl: bandSoundFont },
  steps: [
    variant('短钢琴', '钢琴在每小节内打两次和弦，起音分开，留出的间隙让脉搏变得清楚。', 0, shortChords),
    variant('长电钢琴', '电钢琴的和弦保持整小节，起音更柔和，音头后仍有衰减。', 4, heldChords),
    variant('弦乐持续', '弦乐把共同音 E4 连过两小节线，其余音在低音变化处更新。', 48,
      ['(E4 G4 B4).1', '(E4{t} A4 C5).1'])
  ]
});
