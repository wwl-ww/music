import { contrastTrack, mountScoringContrast } from './composition-scoring-daily-fantasy.js';

const chordLayer = notes => contrastTrack('和声', notes, { program: 48, clef: 'F4' });
const pedalBass = notes => contrastTrack('低音', notes, { program: 42, clef: 'F4' });

const spaceHarmony = chordLayer('(A3 C4 E4 G4).1 { dy p } | (D4 F4 A4 C5).1 | (A3 C4 E4 G4).1');
const spaceSpecks = contrastTrack('高音闪动', 'r.4 E5.16 G5.16 E5.16 A5.16 r.4 C5.16 E5.16 G5.16 E5.16 | r.4 F5.16 A5.16 F5.16 D5.16 r.4 E5.16 F5.16 D5.16 C5.16 | r.4 E5.16 G5.16 E5.16 A5.16 r.4 C5.16 E5.16 G5.16 E5.16', { program: 98 });
mountScoringContrast('fantasy-space-bass', {
  parallel: {
    tracks: [
      chordLayer('(Ab3 C4 Eb4 G4).1 { dy mp } | (Gb3 Bb3 Db4 F4).1 | (E3 G#3 B3 D#4).1 | (D3 F#3 A3 C#4).1'),
      pedalBass('Bb2.1 { ch "Abmaj7/Bb" dy mp } | Ab2.1 { ch "Gbmaj7/Ab" } | F#2.1 { ch "Emaj7/F#" } | E2.1 { ch "Dmaj7/E" }')
    ],
    summary: '和弦上层和下面的低音一同下降。各和弦距低音的七、九、十一、十三音保持原样。'
  },
  moving: {
    tracks: [spaceSpecks, spaceHarmony, pedalBass('A2.1 { ch "Am7" dy mp } | D3.1 { ch "Dm7" } | A2.1 { ch "Am7" }')],
    summary: '转入第二段时，高音和弦各自闪动，低音换到 D 再返回 A。'
  },
  pedal: {
    tracks: [spaceSpecks, spaceHarmony, pedalBass('A2.1 { ch "Am7" dy mp } | A2{t}.1 { ch "Dm7/A" } | A2{t}.1 { ch "Am7" }')],
    summary: 'A 由延音线保持三小节。第二小节和声仍为 Dm7，A 成为整个段落的底座。'
  }
}, { tempo: 90 });

const gateLine = notes => contrastTrack('羽管键琴', notes, { program: 6 });
const gateChords = contrastTrack('和声支点', '(D3 F#3 A3).1 { ch "D" dy mp } | (G2 B2 D3).1 { ch "G" } | (D3 F#3 A3).1 { ch "D" }', { program: 6, clef: 'F4' });
mountScoringContrast('fantasy-gate-articulation', {
  plain: {
    tracks: [
      gateLine('D4.8 F#4.8 A4.8 F#4.8 E4.8 G4.8 F#4.8 D4.8 | G4.8 B4.8 D5.8 B4.8 A4.8 B4.8 G4.8 D4.8 | F#4.8 A4.8 D5.8 C#5.8 B4.8 A4.8 F#4.8 D4.8'),
      gateChords
    ],
    summary: '均匀的八分音符让每小节的内部脉冲保持同样密度。'
  },
  carved: {
    tracks: [
      gateLine('D4.16 E4.16 F#4.16 A4.16 F#4{st}.8 D4{st}.8 E4.8 { tu 3 } G4.8 { tu 3 } F#4.8 { tu 3 } E4{st}.8 D4{st}.8 | G4.16 A4.16 B4.16 D5.16 B4{st}.8 G4{st}.8 A4.8 { tu 3 } B4.8 { tu 3 } A4.8 { tu 3 } G4{st}.8 D4{st}.8 | F#4.16 G4.16 A4.16 D5.16 D5{st}.8 C#5{st}.8 B4.8 { tu 3 } A4.8 { tu 3 } G4.8 { tu 3 } F#4{st}.8 D4{st}.8'),
      gateChords
    ],
    summary: '十六分、断奏八分和一拍的三连音形成不同疏密，和声与羽管键琴音色保持一致。'
  }
}, { tempo: 88, key: 'D' });

const ufoChords = contrastTrack('减七和弦', '(E3 G3 Bb3 Db4).1 { ch "Edim7" dy mp } | (F3 Ab3 Cb4 Ebb4).1 { ch "Fdim7" } | (F#3 A3 C4 Eb4).1 { ch "F#dim7" } | (G3 Bb3 Db4 Fb4).1 { ch "Gdim7" }', { program: 48, clef: 'F4' });
mountScoringContrast('fantasy-ufo-diminished', {
  chords: {
    tracks: [ufoChords],
    summary: '减七和弦的结构不变，所有声部随新根音逐次升半音。'
  },
  scale: {
    tracks: [
      contrastTrack('减音阶线条', 'E4.16 F#4.16 G4.16 Bb4.16 C5.16 Db5.16 Bb4.16 G4.16 A4.16 C5.16 D#5.16 E5.16 D#5.16 C5.16 Bb4.16 G4.16 | F4.16 G4.16 Ab4.16 B4.16 Db5.16 D5.16 B4.16 Ab4.16 Bb4.16 Db5.16 E5.16 F5.16 E5.16 Db5.16 B4.16 Ab4.16 | F#4.16 G#4.16 A4.16 C5.16 D5.16 Eb5.16 C5.16 A4.16 B4.16 D5.16 F5.16 F#5.16 F5.16 D5.16 C5.16 A4.16 | G4.16 A4.16 Bb4.16 Db5.16 Eb5.16 E5.16 Db5.16 Bb4.16 C5.16 Eb5.16 F#5.16 G5.16 F#5.16 Eb5.16 Db5.16 Bb4.16', { program: 11 }),
      ufoChords
    ],
    summary: '旋律在每小节全半减音阶中折返。四个片段用相同的间距依次移高。'
  }
}, { tempo: 90 });

const jungleChords = chordLayer('(E3 G3 B3).2 { ch "Em" dy p } (D3 F#3 A3).2 { ch "D" } | (E3 G3 B3).1 { ch "Em" } | (D3 F#3 A3).1 { ch "D" } | (E3 G3 B3).1 { ch "Em" }');
function jungleLine(sixth) {
  return contrastTrack('木管旋律', 'E5.2 B4.2 | G4.2 D5.4 E5.4 | B4.4 ' + sixth + '.8 B4.8 A4.4 ' + sixth + '.8 D5.8 | E5.2 { d } r.4', { program: 71 });
}
mountScoringContrast('fantasy-jungle-dorian', {
  minor: {
    tracks: [jungleLine('C5'), jungleChords],
    summary: '第六级 C 仍属于自然小调，前后两端仍有较疏的长音。'
  },
  dorian: {
    tracks: [jungleLine('C#5'), jungleChords],
    summary: '第六级升高半音至 C♯，第三小节的两个 C 改变色彩；长音布局保持原样。'
  }
}, { tempo: 94, key: 'Eminor' });

const adventureCall = contrastTrack('小号主题', 'D5{ac}.4 { dy mf } F#5{st}.8 A5{st}.8 A5.2 | B5{ac}.4 A5{st}.8 G5{st}.8 D5.2 | G5{ac}.4 D5{st}.8 G5{st}.8 A5.2 | F#5{st}.8 E5{st}.8 D5{ac}.2 { d }', { program: 56 });
const adventureChords = '(F#3 A3 D4).1 { ch "D" dy mp } | (G3 B3 D4).1 { ch "G/D" } | ';
const adventureBass = pedalBass('D3.1 { dy mf } | D3{t}.1 | D3{t}.1 | D3{t}.1');
mountScoringContrast('fantasy-adventure-cadence', {
  major: {
    tracks: [
      adventureCall,
      chordLayer(adventureChords + '(G3 B3 D4).1 { ch "G/D" } | (F#3 A3 D4).1 { ch "D" }'),
      adventureBass
    ],
    summary: '大下属持续到第三小节，内声 B 最后直接下行全音到 A。'
  },
  borrowed: {
    tracks: [
      adventureCall,
      chordLayer(adventureChords + '(G3 Bb3 D4 E4).1 { ch "Gm6/D" } | (F#3 A3 D4).1 { ch "D" }'),
      adventureBass
    ],
    summary: '第三小节改为小下属，B–B♭–A 构成连续半音。低音 D 留在同一位置。'
  }
}, { tempo: 118, key: 'D' });
