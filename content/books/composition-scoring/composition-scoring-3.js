import { contrastTrack, mountScoringContrast } from './composition-scoring-daily-fantasy.js';

const melody = notes => contrastTrack('旋律', notes);
const chords = notes => contrastTrack('和声', notes);
const bass = (notes, program = 0) => contrastTrack('低音', notes, { program, clef: 'F4' });

const exerciseChords = bass('(D3 F#3 A3).1 { ch "D" dy mp } | (G2 B2 D3).1 { ch "G" }');
mountScoringContrast('daily-exercise-articulation', {
  compact: {
    tracks: [
      melody('F#4{st}.8 A4{st}.8 B4.4 A4{st}.8 F#4{st}.8 E4.4 | G4{st}.8 B4{st}.8 D5.4 B4{st}.8 A4{st}.8 G4.4'),
      exerciseChords
    ],
    summary: '断开的短音接向较长的落点，便于在同一拍速里区分起动和伸展。'
  },
  breathe: {
    tracks: [melody('F#4.2 A4.2 | D5.2 G4.2'), exerciseChords],
    summary: 'D、G 仍各占一小节。旋律改为每小节两个半音符，留给每次动作更长的时间。'
  }
}, { tempo: 90, key: 'D' });

const childMelody = contrastTrack('音乐盒旋律', 'A4.4 C5.8 A4.8 F4.4 | G4.2 E4.4 | F4.4 A4.8 D5.8 A4.4 | E5.4 C5.4 A4.4 | G4.2 { d }', { program: 10 });
const childChords = chords('(F4 A4 C5).2 { d dy p } | (E4 G4 C5).2 { d } | (F4 A4 D5).2 { d } | (E4 A4 C5).2 { d } | (D4 G4 Bb4).2 { d }');
mountScoringContrast('daily-inverted-bass', {
  roots: {
    tracks: [childMelody, childChords, bass('F3.2 { d ch "F" } | C3.2 { d ch "C" } | D3.2 { d ch "Dm" } | A2.2 { d ch "Am" } | G2.2 { d ch "Gm" }')],
    summary: '上层保持五个和弦与同一条旋律，最低音按五个和弦的根音移动。'
  },
  steps: {
    tracks: [childMelody, childChords, bass('F3.2 { d ch "F" } | E3.2 { d ch "C/E" } | D3.2 { d ch "Dm" } | C3.2 { d ch "Am/C" } | Bb2.2 { d ch "Gm/Bb" }')],
    summary: '最低音按 F–E–D–C–B♭ 下行，第二、四、五个和弦用其他构成音作低音。'
  }
}, { tempo: 118, meter: '3 4', key: 'F' });

const countryMelody = melody('C5.4 { d } F4.4 { d } | F4.4 { d } D4.4 { d } | Eb4.2 { d }');
mountScoringContrast('daily-country-secondary', {
  diatonic: {
    tracks: [countryMelody, bass('(F3 A3 C4).2 { d ch "F" } | (Bb2 F3 Bb3 D4).2 { d ch "Bb" } | (Eb3 G3 Bb3).2 { d ch "Eb" }')],
    summary: '原调的 F、B♭ 接向下属和弦 E♭。中间和弦保留 B♭ 大三和弦。'
  },
  secondary: {
    tracks: [countryMelody, bass('(F3 Ab3 C4).2 { d ch "Fm" } | (Bb2 F3 Ab3 D4).2 { d ch "Bb7" } | (Eb3 G3 Bb3).2 { d ch "Eb" }')],
    summary: '第二小节在 B♭ 上引入七音 A♭。中间和弦的 D 和 A♭ 分别向 E♭ 和 G 解决。'
  }
}, { tempo: 96, meter: '6 8', key: 'Bb' });

const cityLine = melody('r.8 F#4.16 A4.16 C#5.16 E5.16 C#5.16 B4.16 A4.8 C#5{ac}.8 C#5{t}.4 | C#5.16 B4.16 G#4.16 E4.16 F#4.8 G#4.8 E5.4 C#5.4 | r.8 A4.16 C#5.16 E5.16 D#5.16 C#5.16 A4.16 G#4.8 E4.8 F#4.4 | G#4.8 B4.8 E5.4 G#4.8 F#4.8 C#5.4');
mountScoringContrast('daily-city-approach', {
  loop: {
    tracks: [cityLine, bass('(F#2 E3 A3 C#4).1 { ch "F#m7" dy mp } | (C#3 E3 G#3 B3 F#4).1 { ch "C#m7(11)" } | (F#2 E3 A3 C#4).1 { ch "F#m7" } | (C#3 E3 G#3 B3 F#4).1 { ch "C#m7(11)" }')],
    summary: '经过切分的短句跨过规整的 F♯m7–C♯m7(11) 循环。'
  },
  approach: {
    tracks: [cityLine, bass('(F#2 E3 A3 C#4).1 { ch "F#m7" dy mp } | (C#3 E3 G#3 B3 F#4).2 { ch "C#m7(11)" } (G2 F3 A3 B3 D4).2 { ch "G9" } | (F#2 E3 A3 C#4).2 { ch "F#m7" } (D3 F#3 C4 E4 A4).2 { ch "D9" } | (C#3 E3 G#3 B3 F#4).1 { ch "C#m7(11)" }')],
    summary: 'G9 从高半音接入 F♯m7，D9 从高半音接入 C♯m7(11)，两次都落回原循环。'
  }
}, { tempo: 139, key: 'C#minor' });

const kitchenLine = melody('Ab4.8 G4.16 { tu 3 } Ab4.16 { tu 3 } C5.16 { tu 3 } Eb5.8 D5.8 C5.8 Bb4.8 | G4.8 Bb4.8 C5.8 Eb5.4 { d }');
const kitchenChords = chords('(Ab3 C4 Eb4).4 { d ch "Fm7" dy p } (Ab3 Bb3 D4 F4).4 { d ch "Bb7" } | (G3 Bb3 D4 Eb4).2 { d ch "Ebmaj7" }');
mountScoringContrast('daily-kitchen-walking', {
  roots: {
    tracks: [kitchenLine, kitchenChords, bass('F2.4 { d } Bb2.4 { d } | Eb3.2 { d }', 33)],
    summary: '低音在每次换和弦时起一次音，重点落在 F、B♭、E♭。'
  },
  walking: {
    tracks: [kitchenLine, kitchenChords, bass('F2.8 Ab2.8 A2.8 Bb2.8 D3.8 F3.8 | Eb3.8 D3.8 C3.8 Bb2.8 G2.8 Eb2.8', 33)],
    summary: '起音增加但换和弦位置不变。A 半音接向 B♭，F 下行到 E♭ 后继续向低处走。'
  }
}, { tempo: 114, meter: '6 8', key: 'Eb' });

const livingLine = melody('B4.8 C5{ac}.8 C5{t}.8 G4.8 r.8 E4{ac}.8 E4{t}.8 G4.8 | G4.8 G4{ac}.8 G4{t}.8 A4.8 r.8 G4.8 F4.4 | F4.8 A4{ac}.8 A4{t}.8 C5.8 A4.4 D5.4');
const livingStart = '(C3 G3 B3 E4).1 { ch "Cmaj7" dy mp } | ';
const livingEnd = ' | (D3 F3 A3 C4 D4).1 { ch "Dm7" }';
mountScoringContrast('daily-living-substitution', {
  plain: {
    tracks: [livingLine, bass(livingStart + '(A2 E3 G3 C4).1 { ch "Am7" }' + livingEnd)],
    summary: 'Am7 是 C 大调的 vi。中间一小节保留调内音，低音 A 到 D。'
  },
  dominant: {
    tracks: [livingLine, bass(livingStart + '(A2 E3 G3 C#4).1 { ch "A7" }' + livingEnd)],
    summary: '只把 Am7 的 C 升高到 C♯，与七音 G 组成引向 Dm 的三全音。'
  },
  tritone: {
    tracks: [livingLine, bass(livingStart + '(Eb3 Bb3 G3 Db4).1 { ch "Eb7" }' + livingEnd)],
    summary: 'C♯ 写为等音 D♭，G 保持。低音改为 E♭，到 Dm7 时出现半音下行。'
  }
}, { tempo: 118 });

const cafeTop = melody('G4.8 G4.8 r.8 G4.8 G4.8 G4.8 r.8 G4.8 | G4.4 A4.8 Ab4.8 G4.4 C5.4');
mountScoringContrast('daily-cafe-common-tone', {
  sevenths: {
    tracks: [cafeTop, bass('(D3 F3 A3 C4).2 { ch "Dm7" dy mp } (G2 F3 B3 D4).2 { ch "G7" } | (C3 E3 B3 C4).1 { ch "Cmaj7" }')],
    summary: '三个七和弦改变重复 G 的角色：从十一音移到根音，再成为五音。'
  },
  extensions: {
    tracks: [cafeTop, bass('(D3 F3 C4 E4 A4).2 { ch "Dm9" dy mp } (G2 F3 B3 D4 E4).2 { ch "G7(13)" } | (C3 E3 B3 D4 G4).1 { ch "Cmaj9" }')],
    summary: 'Dm 与 C 增加九音，G7 增加十三音。重复的 G 保留原来的进入位置。'
  }
}, { tempo: 124 });

const duskOpening = '(Db3 F3 Ab3 C4).1 { ch "Dbmaj7" dy p } | (C3 Eb3 G3 Bb3).1 { ch "Cm7" } | ';
const duskMelody = melody('Ab4.4 F4.8 G4.8 Ab4.4 C5.4 | Bb4.4 G4.4 Eb4.2 | Ab4.2 Bb4.4 C5.4 | C5.1');
mountScoringContrast('daily-dusk-cadence', {
  away: {
    tracks: [duskMelody, bass(duskOpening + '(Db3 F3 Ab3 C4).1 { ch "Dbmaj7" } | (F2 Eb3 Ab3 C4).1 { ch "Fm7" }')],
    summary: '尾句停在 A♭ 大调的 vi。如果继续回到 D♭maj7，仍可延长这一段等待。'
  },
  home: {
    tracks: [duskMelody, bass(duskOpening + '(Bb2 Ab3 Db4 F4).2 { ch "Bbm7" } (Eb3 G3 Bb3 Db4).2 { ch "Eb7" } | (Ab2 Eb3 Ab3 C4).1 { ch "Ab" }')],
    summary: 'ii7 和 V7 在倒数第二小节先后出现。属七的 D♭ 解决到 C，低音落在 A♭。'
  },
  suspended: {
    tracks: [duskMelody, bass(duskOpening + '(Bb2 Ab3 Db4 F4).2 { ch "Bbm7" } (Eb3 Db4 F4 Ab4).4 { ch "Db/Eb" } (Eb3 G3 Bb3 Db4).4 { ch "Eb7" } | (Ab2 Eb3 Ab3 C4).1 { ch "Ab" }')],
    summary: '属位先出现带九、十一音的 D♭/E♭，再交代 E♭7 的三音 G 后回到 A♭。'
  }
}, { tempo: 84, key: 'Ab' });

const gymHit = '(E2{st} E3{st} G3{st} B3{st} D4{st}).4';
const gymBass = bass(`${gymHit} { ch "Em7" dy mp } r.4 ${gymHit} r.4 | ${gymHit} r.4 ${gymHit} r.4`, 4);
const gymPattern = (first, second) => `r.8 ${first}{ac}.4 G4.8 B4.8 D5.8 ${second}.4`;
const gymMelody = (first, second) => melody(gymPattern(first, second) + ' | ' + gymPattern(first, second));
mountScoringContrast('daily-gym-repetition', {
  basic: {
    tracks: [gymMelody('E5', 'B4'), gymBass],
    summary: '两小节复用同一模板，旋律的音高来自 Em7 的 E、G、B 与 D。'
  },
  tension: {
    tracks: [gymMelody('F#5', 'A4'), gymBass],
    summary: '以 F♯ 和 A 代替原模板的 E 与 B。九音和十一音突出，机械的重复速度与下方拍点一致。'
  }
}, { tempo: 136, key: 'Eminor' });
