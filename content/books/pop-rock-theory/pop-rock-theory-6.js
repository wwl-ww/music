import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

function chord(pitches, symbol, duration = 1) {
  return '(' + pitches + ').' + duration + ' { ch "' + symbol + '" }';
}

function mount(id, tempo, versions) {
  mountScoreWritingSteps(document.getElementById(id), {
    score: { tempo, soundFontUrl },
    steps: versions.map(([label, description, melody, harmony, highlights]) => {
      const scoreTracks = [{ name: '旋律', program: 73, phrase: melody.join(' | ') }];
      if (harmony) {
        scoreTracks.push({ name: '伴奏', program: 0, phrase: '\\clef F4 ' + harmony.join(' | ') });
      }
      return { label, description, highlights, notes: { scoreTracks } };
    })
  });
}

const c = chord('C3 G3 E4', 'C');
const cHalf = chord('C3 G3 E4', 'C', 2);
const am = chord('A2 E3 C4', 'Am');
const amHalf = chord('A2 E3 C4', 'Am', 2);
const em7 = chord('E3 G3 B3 D4', 'Em7');
const em7Half = chord('E3 G3 B3 D4', 'Em7', 2);
const f = chord('F3 A3 C4', 'F');
const dm7 = chord('D3 A3 C4 F4', 'Dm7');
const g7 = chord('G2 D3 F3 B3', 'G7');
const g7Half = chord('G2 D3 F3 B3', 'G7', 2);

const draft = [
  'E4.4 G4.4 A4.4 G4.4',
  'E4.4 D4.4 C4.2',
  'F4.4 A4.4 G4.4 F4.4',
  'E4.4 D4.4 C4.2'
];
const draftEnd = g7Half + ' ' + cHalf;
mount('rock-song-draft', 90, [
  ['旋律草稿', '两个两小节乐句保持同一组节奏，并在同一个 C 上停留。单看旋律，两个停顿长度相同。', draft],
  ['加入和声', '第二小节的长 C 是 Am 的三音。第四小节的长 C 出现在 G7–C 的解决上，是主和弦的根音。',
    draft, [c, am, f, draftEnd]],
  ['修订中段', '第二小节上半加 Em7，第三小节以 Dm7 接替 F。句尾、旋律及终止保持不变。',
    draft, [c, em7Half + ' ' + amHalf, dm7, draftEnd]]
]);

const twoFiveLead = ['A4.4 C5.4 A4.4 F4.4', 'G4.4 F4.4 D4.4 B4.4', 'C5.1'];
mount('rock-two-five-one', 88, [
  ['IV–V7–I', 'F 用作属前和弦。旋律先经过 A、C、F，后两小节由 G7 收束到 C。',
    twoFiveLead, [f, g7, c]],
  ['ii7–V7–I', 'Dm7 给同一段旋律换了低音。D–G–C 形成连续五度关系，G7 到 C 的旋律、节奏和解决保持一致。',
    twoFiveLead, [dm7, g7, c]]
]);

const sharedLead = [
  'G4.4 A4.4 G4.4 E4.4',
  'E4.4 G4.4 B4.4 G4.4',
  'A4.4 C5.4 E5.4 C5.4',
  'A4.4 G4.4 E4.4 F4.4',
  'G4.4 B4.4 C5.4 A4.4',
  'E4.4 G4.4 A4.4 C5.4',
  'A4.4 F4.4 A4.4 F4.4',
  'G4.4 F4.4 D4.4 B4.4',
  'C5.1'
];
const sharedHarmony = [
  c,
  em7,
  amHalf + ' ' + chord('G2 A3 C4 E4', 'Am/G', 2),
  f,
  chord('E3 B3 G4', 'Em', 2) + ' ' + amHalf,
  chord('E3 B3 G4', 'Em', 2) + ' ' + amHalf,
  dm7,
  g7,
  c
];
const localE = {
  bar: 2,
  melody: 'E4.4 G4.4 B4.4 G#4.4',
  harmony: em7Half + ' ' + chord('E3 B3 D4 G#4', 'E7', 2)
};
const localD = {
  bar: 7,
  melody: 'A4.4 F4.4 A4.4 F#4.4',
  harmony: chord('D3 A3 C4 F4', 'Dm7', 2) + ' ' + chord('D3 A3 C4 F#4', 'D7', 2)
};

function localVersion(label, description, ...alterations) {
  const melody = [...sharedLead];
  const harmony = [...sharedHarmony];
  for (const change of alterations) {
    melody[change.bar - 1] = change.melody;
    harmony[change.bar - 1] = change.harmony;
  }
  const highlights = alterations.flatMap(({ bar }) => [{ bar, beat: 4 }, { bar: bar + 1, beat: 1 }]);
  return [label, description, melody, harmony, highlights];
}

mount('rock-local-dominants', 96, [
  localVersion('调内进行', '第 2 小节 Em7 连到 Am，第 7 到第 9 小节用 Dm7–G7–C 完成原调的二五一。'),
  localVersion('E7 → Am', '第 2 小节后半的 Em7 改成 E7，旋律末音升成 G♯，接到第 3 小节 Am 上的 A。', localE),
  localVersion('D7 → G7', '第 7 小节后半变成 D7，旋律由 F♯ 上行到 G。G7 紧接着又引向原调的 C。', localD),
  localVersion('两个副属', '第 2 小节和第 7 小节各出现一次半音导向。Am、G7 都得到局部强调，原调终止仍落在 C。', localE, localD)
]);

const motifToA = 'A4.2 C5.4 E5.4';
const motifToG = 'G4.2 B4.4 D5.4';
const motifHighlights = [{ bar: 1, beat: 4 }, { bar: 2, beat: 1 }];
mount('rock-improv-dominant-motif', 88, [
  ['Em7 → Am', 'Em7 上的 G 到 Am 的 A 是全音，A 落在下一小节的强拍。',
    ['B4.4 D5.4 B4.4 G4.4', motifToA], [em7, am], motifHighlights],
  ['E7 → Am', '末拍改成 E7 的三音 G♯，到 A 的距离缩成半音，节奏和第二小节维持一致。',
    ['B4.4 D5.4 B4.4 G#4.4', motifToA], [chord('E3 B3 D4 G#4', 'E7'), am], motifHighlights],
  ['Dm7 → G7', '动机移到 Dm7 上，末拍的 F 到下一小节 G7 的根音 G 是全音。',
    ['A4.4 C5.4 A4.4 F4.4', motifToG], [dm7, g7], motifHighlights],
  ['D7 → G7', '末拍改成 D7 的三音 F♯，动机从半音下方落到 G。后续仍沿 G7 的和弦音展开。',
    ['A4.4 C5.4 A4.4 F#4.4', motifToG], [chord('D3 A3 C4 F#4', 'D7'), g7], motifHighlights]
]);
