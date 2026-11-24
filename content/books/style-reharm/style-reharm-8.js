import { baseHarmony, baseMelody } from './style-reharm-base.js';
import { arrangement, baseChords, chord, editBars, mountReharmVersions } from './style-reharm-6-8-score.js';

const base = baseChords(baseHarmony);
const half = (symbol, bass, upper) => chord(symbol, bass, upper, 4);
const quarter = (symbol, bass, upper) => chord(symbol, bass, upper, 2);
const dance = (melody, harmony, summary, patterns) =>
  arrangement(melody, harmony, { tempo: 116, feel: 'dance', melodyProgram: 81, patterns, summary });
const fOnD = chord('Fmaj7/D', 'D3', 'F3 A3 C4 E4');
const fOnG = chord('Fmaj7/G', 'G2', 'F3 A3 C4 E4');
const cMaj9 = chord('Cmaj9', 'C3', 'G3 B3 D4 E4');
const dm7 = chord('Dm7', 'D3', 'F3 A3 C4 D4');
const g7 = chord('G7', 'G2', 'F3 G3 B3 D4');
const cMaj7 = chord('Cmaj7', 'C3', 'G3 B3 C4 E4');
const gm9 = half('Gm9', 'G2', 'F3 A3 Bb3 D4');
const c13 = half('C7(9,13)', 'C3', 'E3 A3 Bb3 D4');
const fMaj7 = chord('Fmaj7', 'F2', 'F3 A3 C4 E4');
const danceTune = editBars(baseMelody, {
  6: 'G4.4 A4.4 E4.2',
  8: 'D5.2 C5.2',
  9: 'Bb4.4 D5.4 G5.2',
  10: 'E5.2 r.2',
  12: 'G4.4 C5.4 E5.4 D5.4'
});
const fullHarmony = editBars(base, {
  2: fOnD,
  3: fOnG,
  4: cMaj9,
  5: cMaj9,
  6: [half('Am', 'A2', 'C3 E3 A3'), half('E/G#', 'G#2', 'E3 G#3 B3')],
  7: [half('C/G', 'G2', 'E3 G3 C4'), half('Dadd9/F#', 'F#2', 'E3 A3 D4')],
  8: chord('Fm6', 'F2', 'F3 Ab3 C4 D4'),
  9: chord('Bb9', 'Bb2', 'F3 Ab3 C4 D4'),
  10: [
    half('Am9', 'A2', 'G3 B3 C4 E4'),
    quarter('Abm9', 'Ab2', 'Gb3 Bb3 Cb4 Eb4'),
    quarter('Gm9', 'G2', 'F3 A3 Bb3 D4')
  ],
  11: [gm9, c13],
  12: [half('Fmaj7', 'F2', 'F3 A3 C4 E4'), quarter('Em7', 'E2', 'G3 B3 D4 E4'), quarter('Dm7', 'D2', 'A3 C4 D4 F4')],
  13: chord('Dm7', 'D2', 'A3 C4 D4 F4'),
  14: chord('Em7/A', 'A2', 'E3 G3 B3 D4'),
  15: fOnG,
  16: cMaj9
});

function syncopatedPair([opening, middle, landing], secondHalf) {
  const upper = ({ voiced, symbol }, duration) => `(${voiced.join(' ')}).${duration} { ch "${symbol}" }`;
  const tiedUpper = (duration) => `(${landing.voiced.map(pitch => pitch + '{t}').join(' ')}).${duration}`;
  const openingBar = {
    upper: `${upper(opening, 2)} r.8 ${upper(middle, 8)} r.8 ${upper(landing, 8)}`,
    bass: `${opening.bass}.2 r.8 ${middle.bass}.8 r.8 ${landing.bass}.8`
  };
  const continuation = secondHalf ? {
    upper: `${tiedUpper(2)} r.8 ${upper(secondHalf, 8)} r.8 (${secondHalf.voiced.join(' ')}).8`,
    bass: `${landing.bass}{t}.2 ${secondHalf.bass}.8 r.8 ${secondHalf.bass}.8 r.8`
  } : { upper: tiedUpper(1), bass: `${landing.bass}{t}.1` };
  return [openingBar, continuation];
}

const accents = [
  ...syncopatedPair(fullHarmony[9], c13),
  ...syncopatedPair(fullHarmony[11])
];

mountReharmVersions('reharm-jpop-dance-arrangement', {
  final: dance(danceTune, fullHarmony, '反拍和弦、正拍低音和鼓组维持脉冲。两次齐奏在后半拍切入，并跨小节延续。第 6、8、9、10、12 小节的旋律按编配调整。',
    Object.fromEntries(accents.map((bar, index) => [9 + index, bar]))),
  base: dance(baseMelody, base, '同一速度、音色和伴奏节奏下的基础三和弦。')
});

const opening = (harmony, summary) => dance(baseMelody.slice(1, 4), harmony, summary);
mountReharmVersions('reharm-jpop-dance-dominant', {
  simple: opening([dm7, g7, cMaj7], 'G7 的 B 与 F 构成三全音，保留传统二五一的属功能。'),
  added: opening([fOnD, chord('G7(9,13)', 'G2', 'F3 A3 B3 D4 E4'), cMaj9], '共同音 D、F、A、E 可从 Dm9 延续到 G7(9,13)，属三音 B 仍在。'),
  suspended: opening([fOnD, fOnG, cMaj9], '把 G 上方的 B 换成 C，两段都用 F–A–C–E，只有实际低音从 D 换到 G。')
});

const accent = (group, summary, patterns) => dance(danceTune.slice(9, 13), group, summary, patterns);
mountReharmVersions('reharm-jpop-dance-tutti', {
  flat: accent([chord('Am9', 'A2', 'G3 B3 C4 E4'), [gm9, c13], fMaj7, fullHarmony[12]],
    '第 10、12 小节各保持一个和弦，主要的变化落在小节线。'),
  onbeat: accent(fullHarmony.slice(9, 13), '第 10、12 小节末两次换和弦落在第 3、4 拍拍头。'),
  final: accent(fullHarmony.slice(9, 13),
    '保留同一组和弦，末两次共同起音移到第 3、4 拍的后半拍，最后一击越过小节线。', accents)
});

const boost = (middle, summary) => dance(danceTune.slice(9, 12), [chord('Am9', 'A2', 'G3 B3 C4 E4'), middle, fMaj7], summary);
mountReharmVersions('reharm-jpop-dance-boost', {
  plain: boost(cMaj7, '第 11 小节用 Cmaj7，主区接 Fmaj7。'),
  applied: boost([half('Cmaj7', 'C3', 'G3 B3 C4 E4'), half('C7', 'C3', 'G3 Bb3 C4 E4')],
    'C 低音保持，到后半小节把 B 降成 B♭。C7 的三全音把下一小节的 F 听成临时落点。'),
  cadence: boost([half('Gm7', 'G2', 'F3 G3 Bb3 D4'), half('C7', 'C3', 'E3 G3 Bb3 C4')],
    '前半小节也改为 Gm7，根音 G–C–F 都按四度关系前进，谱中第二次下行五度以保留低音区。'),
  extensions: boost([gm9, c13],
    'Gm9 与 C7(9,13) 保持顶音 D，内层 A 与 B♭ 左右紧邻。C7 仍保留 E–B♭ 的三全音。')
});

const close = (approach, last, summary) => dance(danceTune.slice(13), [...approach, last], summary);
mountReharmVersions('reharm-jpop-dance-close', {
  direct: close([
    [half('Em7', 'E3', 'G3 B3 D4'), half('A7', 'A2', 'G3 C#4 E4')],
    [half('Dm7', 'D3', 'F3 A3 C4'), half('G7', 'G2', 'F3 B3 D4')]
  ], cMaj7, '两组二五各在半小节处引入三全音，依次指向 Dm7 和 Cmaj7。'),
  suspended: close([fullHarmony[13], chord('Dm7/G', 'G2', 'F3 A3 C4 D4')], cMaj9,
    'A 和 G 仍作低音，两个属三音改为挂留四度。两处伴奏顶音同为 D。'),
  contrary: close(fullHarmony.slice(13, 15), cMaj9, '低音 A–G 下行，上层顶音 D–E 上行。开头和这里的 G 都配 Fmaj7 上层。')
});
