import { baseHarmony, baseMelody } from './style-reharm-base.js';
import { harmonyBars, mountReharmDemo, reharmTrack } from './style-reharm-3-5.js';

const voicings = {
  C: ['C3', 'G3 C4 E4'], F: ['F3', 'A3 C4 F4'], G: ['G2', 'G3 B3 D4'],
  Gmaj7: ['G2', 'G3 B3 D4 F#4'],
  'C/E': ['E3', 'G3 C4 E4'], 'F/D': ['D3', 'A3 C4 F4'], 'F/C': ['C3', 'A3 C4 F4'],
  Am: ['A2', 'A3 C4 E4'], Am7: ['A2', 'A3 C4 E4 G4'], Am9: ['A2', 'G3 B3 C4 E4'],
  D7: ['D3', 'F#3 A3 C4'], D9: ['D3', 'F#3 A3 C4 E4'],
  'D9(13)': ['D3', 'F#3 B3 C4 E4'], Dm7: ['D3', 'F3 A3 C4'], Dm9: ['D3', 'F3 A3 C4 E4'],
  Fmaj7: ['F3', 'A3 C4 E4'], 'Bm7(♭5)': ['B2', 'F3 A3 D4'],
  E7: ['E2', 'G#3 B3 D4'], 'E7(♭9)': ['E2', 'G#3 B3 D4 F4'],
  'E7(♭9,♭13)': ['E2', 'G#3 D4 F4 C5'],
  Em7: ['E2', 'G3 B3 D4'], 'Em7(9,11)': ['E2', 'G3 D4 F#4 A4 B4'],
  F7: ['F2', 'A3 C4 Eb4'], 'B♭7': ['Bb2', 'Ab3 D4 F4'], 'B♭9': ['Bb2', 'Ab3 C4 D4 F4']
};
const keys = Object.fromEntries(Object.entries(voicings).map(([name, [, upper]]) => [name, upper]));
const basses = Object.fromEntries(Object.entries(voicings).map(([name, [bass]]) => [name, bass]));
const pair = (first, second) => [[first, 2], [second, 2]];
const cadence = [['Em7(9,11)', 2], ['E7(♭9,♭13)', 1], ['E7(♭9)', 1]];
const minor = [
  'Am7', 'D7', 'Am7', 'D7', 'Am7', 'Fmaj7', 'Fmaj7', 'Bm7(♭5)',
  'E7', 'Am7', 'E7', 'Am7', 'D7', 'Dm7', 'Em7', 'Am7'
];
const turn = [
  ...minor.slice(0, 5), pair('F', 'C/E'), pair('F/D', 'F/C'), 'Bm7(♭5)',
  'E7', 'Am7', pair('Bm7(♭5)', 'B♭7'), 'Am7', 'D7', 'Dm7', cadence, 'Am7'
];
const final = [
  'Am7', 'D9', 'Am7', 'D9', 'Am7', ...turn.slice(5, 8),
  'E7(♭9)', 'Am9', pair('Bm7(♭5)', 'B♭9'), 'Am9',
  'D9(13)', 'Dm9', cadence, 'Am7', 'D9', 'Am7', 'D9', 'Am9'
];

function bassBars(chords) {
  return chords.map(bar => {
    const events = typeof bar === 'string' ? [[bar, 4]] : bar;
    return events.map(([name, beats]) => `${basses[name]}.${4 / beats} { dy mp }`).join(' ');
  });
}

const syncopation = {
  4: [[4, false, 'mp'], [8, true], [8, false, 'p'], [4, false, 'p'], [4, true]],
  2: [[8, false, 'mp'], [8, true], [4, false, 'p']]
};

function arrangement(harmony, summary, { line = baseMelody, key = 'Aminor', rhythm } = {}) {
  return {
    summary,
    tracks: [
      reharmTrack('主旋律', line, { key }),
      reharmTrack('电钢琴', harmonyBars(harmony, keys, rhythm), { key, program: 4 }),
      reharmTrack('合成器低音', bassBars(harmony), { key, clef: 'F4', program: 38 })
    ]
  };
}

mountReharmDemo('reharm-rnb-comparison', {
  base: arrangement(baseHarmony, '电钢琴按 C、F、G 的三和弦配置，结尾的 C 是主和弦根音。', { key: 'C' }),
  relative: arrangement(minor, '前段反复 Am7–D7，主音落在 A。旋律最后的 C 由大调主音变成小调主和弦的三音。'),
  turn: arrangement(turn, '第 6 至 8 小节低音 F–E–D–C–B 暂引向 C。第 11 小节用 Bm7(♭5)–B♭7，低音继续下行到 Am7。'),
  final: arrangement(final, '电钢琴使用反拍与短休止，Am9–D9(13)–Dm9 保留上方 E，末尾是 D9 与 Am 的四小节回应。', {
    rhythm: syncopation, line: [...baseMelody, 'r.1', 'r.1', 'r.1', 'r.1']
  })
}, 90, { scrollScore: true });

const centers = ['A4.2 C5.4 A4.4', 'B4.2 D5.4 G4.4', 'E4.4 G4.4 C5.2'];
mountReharmDemo('reharm-rnb-centers', {
  major: arrangement(['F', 'G', 'C'], 'F–G–C 使 C 成为归宿。最后的长 C 与低音 C 同属主音。', { line: centers, key: 'C' }),
  minor: arrangement(['F', 'G', 'Am'], '末和弦改成 Am。同一个长 C 落在 Am 的小三音，低音 A 把句子引入小调。', { line: centers })
}, 78);

function functionExample(harmony, summary) {
  return {
    summary,
    tracks: [
      reharmTrack('电钢琴', harmonyBars(harmony, keys), { key: 'Aminor', program: 4 }),
      reharmTrack('低音', bassBars(harmony), { key: 'Aminor', clef: 'F4', program: 38 })
    ]
  };
}

mountReharmDemo('reharm-rnb-function-score', {
  loop: functionExample(['Am7', 'D7', 'Am7'], 'F♯ 只给 A 中心的循环染色，D 低音回到 A。A 小调里是 i7–IV7–i7。'),
  major: functionExample(['Am7', 'D7', 'Gmaj7'], '前两个和弦相同。D7 的三音 F♯接 G，G 大调的 ii7–V7–Imaj7 成立。'),
  minor: functionExample(['Bm7(♭5)', 'E7', 'Am7'], 'B–E–A 的低音和 G♯→A 的内声给出小调终止。准备和弦里的 F 来自自然或和声小调。')
}, 78);

const ending = ['A4.2 C5.4 B4.4', 'A4.1'];
mountReharmDemo('reharm-rnb-cadence-score', {
  twoFive: arrangement([pair('Bm7(♭5)', 'E7(♭9)'), 'Am7'], '低音 B–E–A。小调 iiø7 准备属七，G♯由属和弦指向 A。', { line: ending }),
  replacement: arrangement([pair('F7', 'E7(♭9)'), 'Am7'], 'F7 保留 B7 的三全音 A 与 E♭（等音 D♯）。低音由 F 半音下到 E 再解决。', { line: ending }),
  fixedBass: arrangement([cadence, 'Am7'], 'E 低音保持一小节。先用小属 Em7，随后转换为 E7。旋律 C 到 B 时，伴奏也移去降十三音 C。', { line: ending })
}, 78);
