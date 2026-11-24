import { songScore, withLyrics, write } from './pro-score.js';

const chords = {
  C: 'C4 E4 G4', Am: 'A3 C4 E4', Dm: 'D4 F4 A4', F: 'F3 A3 C4', E: 'E4 G#4 B4',
  Cm: 'C4 Eb4 G4', Em: 'E4 G4 B4', G: 'G3 B3 D4', 'F/C': 'C4 F4 A4', 'C/D': 'D3 C4 E4 G4',
  Cmaj7: 'C4 E4 G4 B4', Dm7: 'D4 F4 A4 C5', Em7: 'E4 G4 B4 D5', Fmaj7: 'F3 A3 C4 E4',
  G7: 'G3 B3 D4 F4', Am7: 'A3 C4 E4 G4', 'Bm7(♭5)': 'B3 D4 F4 A4',
  AmMaj7: 'A3 C4 E4 G#4', 'Cmaj7(♯5)': 'C4 E4 G#4 B4', E7: 'E4 G#4 B4 D5',
  'G♯dim7': 'G#3 B3 D4 F4', Bm7: 'B3 D4 F#4 A4', D7: 'D4 F#4 A4 C5',
  'F♯m7(♭5)': 'F#3 A3 C4 E4', 'G♯m7(♭5)': 'G#3 B3 D4 F#4', 'D♭7': 'Db4 F4 Ab4 Cb5',
  'C♯dim7': 'C#4 E4 G4 Bb4', Cmaj9: 'C4 E4 G4 B4 D5', 'G7(♭9)': 'G3 B3 D4 F4 Ab4'
};

function chord(name, duration = 1) {
  return `(${chords[name]}).${duration} { ch "${name}" }`;
}

const tempo = 84;
const chordScore = bars => songScore({ tempo, harmony: bars.map(bar => typeof bar === 'string' ? chord(bar) : bar.map(name => chord(name, 2)).join(' ')) });

write('pro-diatonic', [
  ['C 大调', 'Cmaj7、Fmaj7 与 G7 分别立住主、下属和属功能。G7 中的 B 与 F 向 C 与 E 解决。', chordScore(['Cmaj7', 'Dm7', 'Em7', 'Fmaj7', 'G7', 'Am7', 'Bm7(♭5)'])],
  ['A 自然小调', '音高材料与 C 大调相同，根音次序从 A 起算。属级是 Em7，三音 G 距 A 一个全音。', chordScore(['Am7', 'Bm7(♭5)', 'Cmaj7', 'Dm7', 'Em7', 'Fmaj7', 'G7'])],
  ['A 和声小调', 'G 升为 G♯ 后，属级变成 E7，导七和弦变成 G♯dim7。', chordScore(['AmMaj7', 'Bm7(♭5)', 'Cmaj7(♯5)', 'Dm7', 'E7', 'Fmaj7', 'G♯dim7'])],
  ['A 旋律小调上行', 'F 与 G 都升高，ii 变成 Bm7、IV 变成 D7。这里使用上行的音高材料。', chordScore(['AmMaj7', 'Bm7', 'Cmaj7(♯5)', 'D7', 'E7', 'F♯m7(♭5)', 'G♯m7(♭5)'])]
]);

const passingHarmony = ['C', 'Am', 'Dm7', 'G7', 'C'];
write('pro-melodic-notes', [
  ['和弦音骨架', 'E、C、F、D、C 落在各小节重拍，构成能独立辨认的短句。', songScore({ tempo, melody: ['E4.1', 'C4.1', 'F4.1', 'D4.1', 'C4.1'], harmony: passingHarmony.map(name => chord(name)) })],
  ['弱位经过的 F', 'F 在 Am 上只占半拍，从 G 下行到 E。在下一小节的 Dm7 上，F 可以稳定停留。', songScore({ tempo, melody: ['E4.1', 'G4.4 F4.8 E4.8 C4.2', 'F4.1', 'D4.1', 'C4.1'], harmony: passingHarmony.map(name => chord(name)) })],
  ['停住的 F', '伴奏与上一版相同。F 在 Am 上占据整小节，与伴奏 E 形成持续摩擦。到下一小节换 Dm7，相同的 F 成了和弦三音。', songScore({ tempo, melody: ['E4.1', 'F4.1', 'F4.1', 'D4.1', 'C4.1'], harmony: passingHarmony.map(name => chord(name)) })],
  ['加入经过音与先现音', 'C 和弦上的 F♯、Am 上的 F 都短暂通过。第四小节末的 C 先于末小节的 C 和弦出现。', songScore({ tempo, melody: ['E4.4 F#4.8 G4.8 E4.2', 'G4.4 F4.8 E4.8 C4.2', 'F4.4 A4.4 G4.4 F4.4', 'D4.2 B3.4 C4.4', 'C4.1'], harmony: passingHarmony.map(name => chord(name)) })]
]);

write('pro-lyric-division', [
  ['五字', '「亮」落在第二小节末，时值保持两拍。', songScore({ tempo, melody: withLyrics(['E4.4 G4.4 A4.2', 'G4.2 E4.2'], ['窗外渐', '渐亮']), harmony: ['C', 'Am'].map(name => chord(name)) })],
  ['六字', '第二小节的 G 原为两拍。把它拆成两个一拍音，让「一」「点」各占一次起音，末字「亮」仍在原来的拍点。', songScore({ tempo, melody: withLyrics(['E4.4 G4.4 A4.2', 'G4.4 G4.4 E4.2'], ['窗外透', '一点亮']), harmony: ['C', 'Am'].map(name => chord(name)) })]
]);

write('pro-harmonic-revisions', [
  ['原型', 'F、Dm、G7、C 依次承担展开、准备、属与主。第四小节收束。', chordScore(['F', 'Dm', 'G7', 'C'])],
  ['持续低音', '用 C 与 F/C 建立固定的 C 低音。C 是 F 和弦的五音，换和弦时可以留着它。', chordScore(['C', 'F/C', 'C', 'F/C'])],
  ['斜线和弦', 'C/D 的 D 在低音，C、E、G 在上部。由 D 向上看，三音缺席，三颗上方音形成小七度、大九度和纯十一度。', chordScore(['C', 'C/D', 'G7', 'C'])],
  ['下属组替换', 'F 与 Dm 共有 F、A。以 Dm 代 F，和声仍可以导向 G7，低音和旋律的相对位置会变。', chordScore(['Dm', 'Dm7', 'G7', 'C'])],
  ['三全音替代', 'D♭7 的 F 和 C♭ 与 G7 的 F 和 B 构成等音的三全音。低音由 D♭ 下行半音到 C。', chordScore(['F', 'Dm', 'D♭7', 'C'])],
  ['副属与二–五–一', 'D7 的 F♯ 导向 G。第二小节把 Dm7 和 G7 合成二–五，结尾回 C。', chordScore(['D7', 'G', ['Dm7', 'G7'], 'C'])],
  ['经过减七与扩展音', 'C♯dim7 接到 Dm7，低音 C–C♯–D。G7(♭9) 加 A♭，Cmaj9 的 D 与前后旋律有共同音。', chordScore([['C', 'C♯dim7'], 'Dm7', 'G7(♭9)', 'Cmaj9'])],
  ['借用和弦', 'F♯m7(♭5) 的 F♯、A、C、E 可取自关系小调 A 的旋律小调上行。F♯–F 接到 Dm，句尾的 G7–C 仍确认 C 大调。', chordScore(['Am', 'F♯m7(♭5)', 'Dm', 'G7', 'C'])]
]);
