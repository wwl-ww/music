import { baseHarmony, baseMelody } from './style-reharm-base.js';
import { arrangement, baseChords, chord, editBars, mountReharmVersions } from './style-reharm-6-8-score.js';

const base = baseChords(baseHarmony);
const half = (symbol, bass, upper) => chord(symbol, bass, upper, 4);
const quarter = (symbol, bass, upper) => chord(symbol, bass, upper, 2);
const piano = (melody, harmony, summary) => arrangement(melody, harmony, { tempo: 72, summary });

const cMaj = chord('Cmaj7', 'C3', 'G3 B3 C4 E4');
const eMinor = chord('Em7', 'E3', 'G3 B3 D4 E4');
const aMinor = chord('Am7', 'A2', 'G3 A3 C4 E4');
const dm = chord('Dm7', 'D2', 'A3 C4 F4');
const dmOverG = chord('Dm7/G', 'G2', 'F3 A3 C4 D4');
const cAdd = chord('Cadd9', 'C3', 'C4 E4 G4 D5');
const fAdd = chord('Fmaj7(9,13)', 'F2', 'A3 C4 D4 E4 G4 E5');
const synthE = quarter('E7(b9,b13)', 'E2', 'G#3 C4 D4 F4');
const aPhrase = [
  quarter('Dm7/G', 'G2', 'F3 A3 C4 D4'),
  quarter('Dm7/G', 'G2', 'F3 A3 C4 D4'),
  quarter('Fmaj7', 'F2', 'A3 C4 E4'),
  synthE
];
const fullTune = editBars(baseMelody, {
  4: 'E4.4 G4.4 C5.4 B4.4', 9: 'r.4 D5.4 E5.4 F5.4',
  11: 'F5.4 E5.4 D5.4 C5.4', 15: 'C5.2 C5.4 F4.4'
});
const fullHarmony = editBars(base, {
  2: [half('C', 'C3', 'G3 C4 E4'), half('Bb/C', 'C3', 'F3 Bb3 D4')],
  3: chord('F/C', 'C3', 'F3 A3 C4'),
  4: [half('Am', 'A2', 'E3 A3 C4'), quarter('Gsus4', 'G2', 'D3 G3 C4'), quarter('G', 'G2', 'D3 G3 B3')],
  5: [half('F', 'F2', 'C3 F3 A3'), half('C/E', 'E2', 'C3 E3 G3')],
  6: dm,
  7: dm,
  8: dmOverG,
  9: aPhrase,
  10: [half('Am7(11)', 'A2', 'D3 G3 C4 E4'), half('G/B', 'B2', 'D3 G3 B3')],
  11: [half('Cadd9', 'C3', 'D3 G3 C4 E4'), quarter('Bb', 'Bb2', 'F3 Bb3 D4'), quarter('F/A', 'A2', 'F3 A3 C4')],
  12: chord('C/G', 'G2', 'G3 C4 E4'),
  13: [half('F#m7b5', 'F#2', 'A3 C4 E4'), half('Fmaj7', 'F2', 'A3 C4 E4')],
  14: [half('Em7', 'E2', 'G3 B3 D4'), half('Ebmaj7', 'Eb2', 'G3 Bb3 D4')],
  15: [half('Dm7', 'D2', 'F3 A3 C4'), half('F/G', 'G2', 'F3 A3 C4')],
  16: cAdd
});

mountReharmVersions('reharm-jpop-ballad-arrangement', {
  final: piano([...fullTune, 'r.1', 'r.1', 'r.1', 'r.1'], [...fullHarmony, fAdd, cAdd, fAdd, cAdd],
    'A 段形成铺垫，B 段转向更宽的排列，C 段以半音低音收束。第 4、9、11、15 小节的旋律按编配调整。'),
  base: piano(baseMelody, base, '同一速度下的 16 小节基础稿，段落交界处仍用原来的三和弦。')
});

const entrance = (target, summary) => piano(fullTune.slice(8, 10), [dmOverG, target], summary);
mountReharmVersions('reharm-jpop-ballad-tonic', {
  c: entrance(cMaj, 'Cmaj7 以 C 作低音，向主音的归属最直接。'),
  e: entrance(eMinor, '低音改为 E，旋律 E 成为 Em7 的根音，保留与 Cmaj7 共有的 E、G、B。'),
  a: entrance(aMinor, '低音落在 A，E 成为 Am7 的五音。正文把这一路线用作副歌入口。')
});

const sameDirection = [
  quarter('Dm7/G', 'G2', 'F3 A3 C4 D4'),
  quarter('Dm7', 'D3', 'F3 A3 C4'),
  quarter('Em7', 'E3', 'G3 B3 D4'),
  quarter('F', 'F3', 'A3 C4 F4')
];
const bridge = (opening, summary) => piano(fullTune.slice(8, 10), [opening, fullHarmony[9]], summary);
mountReharmVersions('reharm-jpop-ballad-motion', {
  parallel: bridge(sameDirection, '第 9 小节第 2–4 拍的旋律与低音都按 D–E–F 上行。'),
  contrary: bridge(aPhrase, '第 9 小节第 2–4 拍的旋律 D–E–F 上行，低音 G–F–E 下行，E7 接向 Am7。')
});

const chorus = (middle, summary) => piano(fullTune.slice(9, 13),
  [fullHarmony[9], middle, fullHarmony[11], fullHarmony[12]], summary);
mountReharmVersions('reharm-jpop-ballad-chorus-line', {
  upward: chorus([fullHarmony[10][0], half('Dm7', 'D3', 'F3 A3 C4')],
    '低音每两拍一级，A–B–C–D 上行。第 11 小节的 Dm7 持续两拍。'),
  diatonic: chorus([fullHarmony[10][0], quarter('Dm7', 'D3', 'F3 A3 C4'), quarter('C', 'C3', 'G3 C4 E4')],
    '按旋律第 3、4 拍的 D–C 给出同名根音，得到 Dm7–C。'),
  borrowed: chorus(fullHarmony[10],
    'D 作为 B♭ 的三音，C 作为 F 的五音。低音转为 B♭–A–G，F/A 还在副歌内部短暂落稳。')
});

const cadence = (approach, plan, summary) => piano(fullTune.slice(12), [...approach, plan, cAdd], summary);
const closeApproach = [chord('Fmaj7', 'F2', 'A3 C4 E4'), chord('Em7', 'E2', 'G3 B3 D4')];
mountReharmVersions('reharm-jpop-ballad-cadence', {
  single: cadence(closeApproach, dm, '第 15 小节一直留在 Dm7，下属直接接主和弦。'),
  dominant: cadence(closeApproach, [fullHarmony[14][0], half('G7', 'G2', 'F3 B3 D4')],
    '第 15 小节后半的 G7 加入 B 与 F，明确指向末小节 C。第 3 拍的旋律 C 与属三音 B 保留半音张力。'),
  suspended: cadence(closeApproach, fullHarmony[14],
    '同一个上方 F–A–C 先配 D，再配 G。移到属低音时保留 C 的挂留音响。'),
  chromatic: cadence(fullHarmony.slice(12, 14), fullHarmony[14],
    '终止前先走 F♯–F–E–E♭–D。上层分组保留 A–C–E，随后保留 G 与顶音 D。')
});
