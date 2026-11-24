import { mountScoringChoices, part } from './composition-scoring-1-2-demos.js';

const lead = (notes, options) => part('旋律', 0, notes, options);
const harmony = (notes, options) => part('和弦', 0, notes, options);
const low = { clef: 'F4' };
const bass = (notes, options = low) => part('低音', 0, notes, options);

const newYearHarmony = bass('(C3 G3 E4).1 | (C3 G3 E4).1');
mountScoringChoices('scoring-new-year-pentatonic', 84, {
  five: {
    description: 'E 后跳到 G，A 后跳到高音 C，省去 F 和 B。用重复的 G 和 A 保留原来的起音次数。',
    tracks: [lead('C4.4 D4.4 E4.4 G4.4 | G4.4 A4.4 A4.4 C5.4'), newYearHarmony]
  },
  seven: {
    description: '低音、速度和旋律的起音位置相同。F、B 让 E–F 和 B–C 两处半音重新出现。',
    tracks: [lead('C4.4 D4.4 E4.4 F4.4 | G4.4 A4.4 B4.4 C5.4'), newYearHarmony]
  }
});

const festivalNotes = [
  ['A4.4', 'C5.8', 'D5.8', 'E5.4', 'D5.4'],
  ['G5.4', 'E5.4', 'C5.4', 'A4.4']
];
function festivalVoice(detached) {
  return part('旋律', 73, festivalNotes.map((notes, bar) => notes.map((note, index) => {
    const [pitch, duration] = note.split('.');
    if (detached) return `${pitch}{st}.${duration}`;
    if (index === 0 || index === notes.length - 1) return `${pitch}{slur phrase${bar}}.${duration}`;
    return note;
  }).join(' ')).join(' | '));
}
const festivalBass = bass('A2.1 | A2.1');
mountScoringChoices('scoring-festival-articulation', 150, {
  detach: {
    description: 'A–C–D–E 的音高和起音位置不变，短奏缩短实际发声。',
    tracks: [festivalVoice(true), festivalBass]
  },
  legato: {
    description: '同一条旋律按原时值持续发声，一小节的音放在同一条连线下。',
    tracks: [festivalVoice(false), festivalBass]
  }
}, { ensemble: true });

const snowTheme = 'Eb3.2 G3.2 | Ab3.4 G3.4 Eb3.2';
const snowArpeggio = 'D6.8 Bb5.8 G5.8 Eb5.8 D6.8 Bb5.8 G5.8 Eb5.8 | Eb6.8 C6.8 Ab5.8 Eb5.8 Eb6.8 C6.8 Ab5.8 Eb5.8';
const movedArpeggio = 'E#6.8 C#6.8 A#5.8 F#5.8 E#6.8 C#6.8 A#5.8 F#5.8 | F#6.8 D#6.8 B5.8 F#5.8 F#6.8 D#6.8 B5.8 F#5.8';
const snowLow = { key: 'Eb', clef: 'F4' };
const snowHigh = { key: 'Eb' };
function snowScene(theme, arpeggio) {
  return [
    part('低处旋律', 35, `${snowTheme} | ${theme}`, snowLow),
    part('高处琶音', 9, `${snowArpeggio} | ${arpeggio}`, snowHigh)
  ];
}
mountScoringChoices('scoring-snow-modulation', 100, {
  upward: {
    description: '后两小节的旋律和伴奏整体上移小三度，琶音继续使用下行八分音符。',
    tracks: snowScene(String.raw`\ks F# F#3.2 A#3.2 | B3.4 A#3.4 F#3.2`, String.raw`\ks F# ${movedArpeggio}`)
  },
  repeat: {
    description: '两小节原样重现，第二次出现的拍点和音区都与前两小节相同。',
    tracks: snowScene(snowTheme, snowArpeggio)
  }
}, { ensemble: true });

const ebMajor = { key: 'Eb' };
const ebLow = { ...low, ...ebMajor };
const graduationTheme = lead('G4.2 Bb4.2 | Bb4.2 G4.2 | G4.2 Eb4.2 | F4.2 Ab4.2 | G4.2 Eb4.2', ebMajor);
mountScoringChoices('scoring-graduation-harmony', 70, {
  minor: {
    description: '旋律不变。中间三小节改用 Gm–Cm–Fm，E♭ 主和弦在末尾再次出现。',
    tracks: [graduationTheme, bass('(Eb3 G3 Bb3).1 | (G2 Bb2 D3).1 | (C3 Eb3 G3).1 | (F3 Ab3 C4).1 | (Eb3 G3 Bb3).1', ebLow)]
  },
  major: {
    description: '同一旋律用 E♭–E♭–A♭maj7–B♭7–E♭ 配和声，主功能较早建立，属和弦到末尾才推动归主。',
    tracks: [graduationTheme, bass('(Eb3 G3 Bb3).1 | (Eb3 G3 Bb3).1 | (Ab2 C3 Eb3 G3).1 | (Bb2 D3 F3 Ab3).1 | (Eb3 G3 Bb3).1', ebLow)]
  }
});

const fMajor = { key: 'F' };
function offbeats(chord) {
  return Array(4).fill(`r.8 ${chord}.8`).join(' ');
}
const marchHarmonicPulse = harmony(`${offbeats('(F4 A4 C5)')} | ${offbeats('(G4 Bb4 D5)')}`, fMajor);
const marchBassPulse = bass('F2.8 r.8 C3.8 r.8 F2.8 r.8 C3.8 r.8 | G2.8 r.8 D3.8 r.8 G2.8 r.8 D3.8 r.8', { ...low, ...fMajor });
const marchSecondBar = 'G4.4 Bb4.8 A4.8 G4.4 D5.4';
mountScoringChoices('scoring-march-texture', 150, {
  sprint: {
    description: '低音守拍，和弦落在后半拍。第 1 拍的四个十六分音符给旋律一个短冲刺。',
    tracks: [lead(`F4.16 G4.16 A4.16 C5.16 D5.8 C5.8 A4.4 G4.8 F4.8 | ${marchSecondBar}`, fMajor), marchHarmonicPulse, marchBassPulse]
  },
  even: {
    description: '伴奏不变，第一拍拍头的四个短音改成 F–C 两个八分音符，起音比较均匀。',
    tracks: [lead(`F4.8 C5.8 D5.8 C5.8 A4.4 G4.8 F4.8 | ${marchSecondBar}`, fMajor), marchHarmonicPulse, marchBassPulse]
  }
});

const valentineF = 'G4{st}.8 G4{st}.8 C5{st}.4 r.8 A4.4 G4.8 | F4.4 Bb4.4 D5.4 F5.4';
const valentineD = 'E4{st}.8 E4{st}.8 A4{st}.4 r.8 F#4.4 E4.8 | D4.4 G4.4 B4.4 D5.4';
const valentineHarmonyF = '(F3 A3 C4 E4).1 | (C3 Bb3 D4 F4).1';
const valentineHarmonyD = '(D3 F#3 A3 C#4).1 | (A2 G3 B3 D4).1';
function valentineScene(theme, chords) {
  return [lead(`${valentineF} | ${theme}`, fMajor), bass(`${valentineHarmonyF} | ${chords}`, { ...low, ...fMajor })];
}
mountScoringChoices('scoring-valentine-transpose', 140, {
  transpose: {
    description: '第二句整体移低小三度，反复和弦以及短促的起音一同保留。',
    tracks: valentineScene(String.raw`\ks D ${valentineD}`, String.raw`\ks D ${valentineHarmonyD}`)
  },
  repeat: {
    description: '第二句沿用 Fmaj7–B♭/C，跳进和短奏在原音区出现。',
    tracks: valentineScene(valentineF, valentineHarmonyF)
  }
});

const dMajor = { key: 'D' };
const halloweenHarmony = bass('(D3 F#3 A3).1 | (A2 Db3 F3 Ab3).1', { ...low, ...dMajor });
mountScoringChoices('scoring-halloween-accidentals', 120, {
  passing: {
    description: 'F 与 C 放在半拍内，很快分别接到 F♯ 与 D♭。',
    tracks: [lead('D4.4 A4.4 G#4.8 A4.8 F4.8 F#4.8 | C5.8 Db5.8 Ab4.4 F4.4 Db4.4', dMajor), halloweenHarmony]
  },
  clash: {
    description: 'F 与 C 分别停留一拍和两拍。F 和下面持续的 F♯、C 和 D♭ 形成突出的半音摩擦。',
    tracks: [lead('D4.4 A4.4 F4.4 F#4.4 | C5.2 Db5.4 F4.4', dMajor), halloweenHarmony]
  }
});

const weddingHarmony = bass('(D3 F#3 A3 C#4).1 | (G2 Bb2 D3 F3).1 | (C3 E3 G3 Bb3).1 | (D3 F#3 A3 C#4).1', { ...low, ...dMajor });
mountScoringChoices('scoring-wedding-common-tones', 85, {
  neighbor: {
    description: 'Dmaj7 到 Gm7 时保留 D，Gm7 到 C7 时保留 B♭，两次换和弦的连接都可被听见。',
    tracks: [lead('F#4.4 A4.4 D5.2 | D5.4 A4.4 Bb4.2 | Bb4.4 G4.4 E4.2 | F#4.2 D4.2', dMajor), weddingHarmony]
  },
  leap: {
    description: '和声相同。相邻两个乐句在 D–G 和 B♭–E 处跳进，换和弦的边界更醒目。',
    tracks: [lead('F#4.4 A4.4 D5.2 | G5.4 A4.4 Bb4.2 | E5.4 G4.4 E4.2 | F#4.2 D4.2', dMajor), weddingHarmony]
  }
});
