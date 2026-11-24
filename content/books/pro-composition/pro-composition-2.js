import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScore } from '../../shared/formats/score.js';
import { lyricBars } from '../songwriting/songwriting-score.js';

const tempo = 104;
const meter = String.raw`\ts (4 4)`;
const rest = 'r.1';
const chordPitches = {
  F: ['F2', 'F3 A3 C4'], Fmaj7: ['F2', 'E3 A3 C4'], Fmaj9: ['F2', 'E3 A3 C4 G4'],
  Dm: ['D2', 'F3 A3 D4'], Dm7: ['D2', 'F3 A3 C4'],
  Gm: ['G2', 'G3 Bb3 D4'], Gm7: ['G2', 'F3 G3 Bb3 D4'],
  C7: ['C2', 'E3 Bb3 C4 G4'], 'B♭': ['Bb2', 'F3 Bb3 D4'], 'B♭maj7': ['Bb2', 'F3 A3 D4'],
  Am: ['A2', 'E3 A3 C4'], Am7: ['A2', 'G3 A3 C4 E4'], 'A♭m7': ['Ab2', 'Gb3 Ab3 Cb4 Eb4'],
  'A♭9': ['Ab2', 'Gb3 Bb3 C4 Eb4'], Cm7: ['C3', 'Eb3 G3 Bb3'], B7: ['B2', 'F#3 A3 D#4'],
  B9: ['B2', 'A3 C#4 D#4 F#4'], 'B♭/C': ['C2', 'F3 Bb3 D4'],
  Em: ['E2', 'G3 B3 E4'], Em7: ['E2', 'D3 G3 B3'], 'G/A': ['A2', 'D3 G3 B3'],
  A: ['A2', 'E3 A3 C#4'], A7: ['A2', 'E3 G3 C#4'], 'A/G': ['G2', 'E3 A3 C#4'],
  D: ['D2', 'D3 F#3 A3'], Dmaj9: ['D2', 'F#3 A3 C#4 E4'],
  'C♯m7♭5': ['C#3', 'E3 G3 B3'], 'F♯7': ['F#2', 'E3 A#3 C#4'],
  'F♯m': ['F#2', 'F#3 A3 C#4'], 'F♯m7': ['F#2', 'E3 A3 C#4'],
  Bm: ['B2', 'F#3 B3 D4'], Bm7: ['B2', 'A3 B3 D4 F#4'],
  'B♭m7': ['Bb2', 'Ab3 Bb3 Db4 F4'], D9: ['D2', 'C4 E4 F#4 A4'],
  G: ['G2', 'G3 B3 D4'], Gmaj7: ['G2', 'F#3 B3 D4'], 'G/D': ['D2', 'G3 B3 D4'],
  'F7(9,13)': ['F2', 'Eb3 A3 D4 G4'], 'C/D': ['D2', 'G3 C4 E4'],
  Am6: ['A2', 'F#3 C4 E4'], 'B/C♯': ['C#3', 'B3 D#4 F#4']
};

const a = [
  'G4.8 A4.8 Bb4.4 C5.8 Bb4.8 G4.4', 'A4.4 G4.8 A4.8 F4.4 D4.4',
  'Bb4.8 A4.8 G4.4 E4.8 G4.8 C5.4', 'A4.4 F4.4 r.4 D4.8 E4.8',
  'F4.8 G4.8 Bb4.4 C5.8 A4.8 G4.4', 'A4.4 C5.8 A4.8 F4.4 D4.4',
  'G4.4 Bb4.8 A4.8 G4.8 E4.8 F4.4', 'F4.2 r.2'
];
const a2 = [
  'G4.8 A4.8 Bb4.8 Bb4.8 C5.8 Bb4.8 G4.4', 'A4.4 A4.4 F4.4 D4.4',
  ...a.slice(2)
];
const b = [
  'Bb4.4 D5.8 C5.8 Bb4.4 F4.4', 'A4.4 C5.8 D5.8 E5.4 C5.4',
  'Bb4.4 A4.8 G4.8 E4.4 Bb4.4', 'A4.4 G4.8 F4.8 r.2',
  'Bb4.4 C5.8 D5.8 F5.4 D5.4', 'E5.4 C5.8 D5.8 C5.4 A4.4',
  'Bb4.4 A4.8 G4.8 G4.4 B4.4', 'B4.4 B4.4 A4.4 C#5.4'
];
const closeMotif = 'E5.4 E5.8 D5.8 C#5.4 D5.8 E5.8';
const refrain = [
  'r.8 E5.8 E5.8 G5.8 F#5.4 r.4', 'r.8 F#5.8 F#5.8 A5.8 F#5.4 r.4',
  'E5.4 D5.8 C#5.8 A#4.4 C#5.4', rest,
  'r.8 G5.8 G5.8 A5.8 F#5.4 r.4', 'F#5.8 E5.8 F#5.8 A5.8 F#5.4 D5.4',
  closeMotif, 'D5.2 r.2'
];
const refrain3 = [
  'r.2 A4.2', 'B4.2 C#5.2', ...refrain.slice(0, 5),
  'F#5.8 A5.8 B5.8 C#6.8 D6.2', 'D6{t}.2 r.2'
];
const refrain4 = [
  closeMotif, closeMotif, closeMotif, 'G5.4 E5.4 D5.2', 'D5{t}.2 r.2'
];

const aWords = ['窗边微风很轻', '茶杯冒热气', '我把窗帘拉开', '等你回来', '街口响起车铃', '影子慢慢长', '我把灯留给你', '呀'];
const a2Words = ['窗边的微风很轻', '茶正温热', '听见熟悉车铃', '想你回来', '楼道脚步渐近', '心也跟着跳', '我把门轻轻开', '呀'];
const bWords = ['风吹过门廊', '街角快看见', '远远一盏灯', '还亮着', '那熟悉声音', '是不是你呀', '我等了很久', '就要到了'];
const b2Words = ['窗外天将暗', '路口慢下来', '远远那盏灯', '还亮着', '那熟悉身影', '果然就是你', '我等了很久', '已经到了'];
const cWords = ['蜜糖云朵', '蜜糖云朵', '落在你肩上', '', '蜜糖云朵', '把这一刻收藏', '屋里灯还亮着', '呀'];
const c2Words = ['蜜糖云朵', '蜜糖云朵', '落在你手上', '', '蜜糖云朵', '把你的笑收藏', '屋里灯还亮着', '呀'];
const c3Words = ['微', '风轻', ...cWords.slice(0, 5), '这就是幸福'];
const c4Words = ['屋里灯还亮着', '街口风还吹着', '我把手交给你', '到家了'];

const drafts = {
  intro: ['Gm', 'C7', 'F', 'F', 'Gm', 'C7', 'F', 'F'],
  a: ['Gm C7', 'F Dm', 'Gm C7', 'F Dm', 'Gm C7', 'F Dm', 'Gm C7', 'F'],
  b: ['B♭', 'Am', 'Gm C7', 'F', 'B♭', 'Am', 'Gm', 'Em A'],
  c: ['Em A7', 'D Bm', 'C♯m7♭5 F♯7', 'Bm', 'G A', 'F♯m Bm', 'Em A7', 'D'],
  c3: ['D', 'G/D D', 'Em A7', 'D Bm', 'C♯m7♭5 F♯7', 'Bm', 'G A', 'F♯m Bm', 'Bm'],
  c4: ['Em F♯m', 'G F♯m', 'Em F♯m', 'C7', 'C7'],
  interlude: ['Gm C7', 'F Dm', 'Gm C7', 'F Dm', 'Gm C7', 'F Dm', 'Gm C7', 'F'],
  ending: ['D G/A', 'D G/A', 'D@2 G/A@4 D@4', 'r', 'D', 'D']
};
const revised = {
  intro: ['Gm7', 'C7', 'Fmaj9', 'F@2 Am7@4 A♭m7@4', 'Gm7', 'B♭/C', 'Fmaj7', 'F'],
  a: ['Gm7 C7', 'Fmaj9 Dm7', 'Gm7 C7', 'F@2 Am7@4 A♭9@4', 'Gm7 C7', 'Fmaj7 Dm7', 'Gm7@2 C7@4 F@4', 'F@2 Cm7@4 B9@4'],
  b: ['B♭maj7', 'Am7', 'Gm7 C7', 'Fmaj7@2 Cm7@4 B7@4', 'B♭maj7', 'Am7', 'Gm7 Em7', 'Em7@2 G/A@4 A@4'],
  c: ['Em7 A7', 'Dmaj9 Bm7', 'C♯m7♭5 F♯7', 'Bm7@4 B♭m7@4 Am7@4 D9@4', 'Gmaj7 A/G', 'F♯m7 Bm7', 'Em7@2 A7@4 D@4', 'D'],
  c3: ['D', 'G/D D', 'Em7 A7', 'Dmaj9 Bm7', 'C♯m7♭5 F♯7', 'Bm7@4 B♭m7@4 Am7@4 D9@4', 'Gmaj7 A/G', 'F♯m7 F7(9,13)', 'F7(9,13)'],
  c4: drafts.c4,
  interlude: drafts.interlude,
  ending: ['C/D@2 Am6@4 Am7@4', 'C/D Am6', 'C/D@2 Am6@4 C/D@4', 'r@8 B♭/C@8 B/C♯@8 C/D@8 B♭/C@8 r@8 B/C♯@4', 'C/D', 'C/D']
};

function chordEvents(measure) {
  const symbols = measure.split(' ');
  return symbols.map(symbol => {
    const [label, duration = symbols.length === 1 ? '1' : '2'] = symbol.split('@');
    return { label, duration };
  });
}

function writtenChord({ label, duration }) {
  if (label === 'r') return `r.${duration}`;
  const [bass, upper] = chordPitches[label];
  return `(${bass} ${upper}).${duration} { txt "${label}" }`;
}

function melodyWithWords(melody, words) {
  return melody.map((measure, index) => words?.[index] ? lyricBars(words[index], [measure]) : measure);
}

function phrase(key, melody, harmony, { words, nextKey } = {}) {
  const accompaniment = harmony.map(bar => chordEvents(bar).map(writtenChord).join(' '));
  if (melody.every(bar => bar === rest)) {
    return String.raw`\clef F4 \ks ${key} ${meter} ${accompaniment.join(' | ')}`;
  }
  const melodyBars = melodyWithWords(melody, words);
  if (nextKey) melodyBars[melodyBars.length - 1] = String.raw`\ks ${nextKey} ` + melodyBars.at(-1);
  if (nextKey) accompaniment[accompaniment.length - 1] = String.raw`\ks ${nextKey} ` + accompaniment.at(-1);
  return String.raw`\ks ${key} ${meter} ${melodyBars.join(' | ')} ||
    \staff { score } \tuning (none) \clef F4 \ks ${key} ${accompaniment.join(' | ')}`;
}

function mountVariant(id, versions) {
  const demo = document.getElementById(id);
  const controls = [...demo.querySelectorAll('select')];
  const cue = demo.querySelector('.music-demo-cue');
  function selected() {
    const [option, revision] = controls.map(control => control.value);
    const { notes, summary } = revision ? versions[option][revision] : versions[option];
    cue.textContent = summary;
    return notes;
  }
  const player = mountScore(demo.querySelector('figure'), {
    tempo,
    notation: 'staff',
    notes: selected()
  });
  controls.forEach(control => control.addEventListener('change', () => player.setNotes(selected())));
}

const version = (key, melody, harmony, summary, options) => ({
  notes: phrase(key, melody, harmony, options),
  summary
});

mountVariant('pro-bossa-themes', {
  a: version('F', a, drafts.a, 'F 大调 ii–V⁷–I–vi 的循环给 A 段稳定的拍内方向，最后停在 I。'),
  b: version('F', [...b, 'D5.2 r.2'], [...drafts.b, 'D'], 'B 的前半回 F，后半经 Em–A 转入 D。最后一个 D 和弦是下一段的到达点。', { nextKey: 'D' }),
  c: version('D', refrain, drafts.c, '副歌使用更高的音区与四个音节的题头。在 C♯m7♭5–F♯7–Bm 的小调插段后重现题头，最后回到 D。', { words: cWords }),
  c3: version('D', refrain3, drafts.c3, '开头三个逐级上行的长音为原题头蓄力，高潮 D6 持续跨过小节线。'),
  c4: version('D', refrain4, drafts.c4, '副歌尾句动机反复三次，和声避开 ii–V⁷–I，最后由 C7 把张力留给尾奏。')
});

mountVariant('pro-bossa-lyrics', {
  first: version('F', a.slice(0, 2), drafts.a.slice(0, 2), '「窗边微风很轻」共六个字。「茶杯冒热气」共五个字，中间两字落在两个八分音符上。', { words: aWords }),
  second: version('F', a2.slice(0, 2), drafts.a.slice(0, 2), '加入「的」时，原来的 B♭ 四分音符拆成两个八分音符。下一句只有四个字，原来相邻的两个八分音符合为一个四分音符。', { words: a2Words })
});

const marimba = [
  'r.4 D5.8 G5.8 A5.4 G5.8 F5.8', 'E5.4 C5.8 E5.8 G5.4 r.4',
  'r.4 C5.8 F5.8 A5.4 G5.8 F5.8', 'A4.4 C5.8 A4.8 F4.4 r.4',
  'r.4 D5.8 G5.8 A5.4 G5.8 F5.8', 'E5.4 C5.8 E5.8 G5.4 r.4',
  'r.4 C5.8 F5.8 A5.4 G5.8 F5.8', 'A4.4 C5.8 A4.8 F4.4 r.4'
];
const instrumentalMelody = Array(8).fill(rest);

mountVariant('pro-bossa-instrumental', {
  intro: version('F', instrumentalMelody.slice(0, 4), drafts.intro.slice(0, 4), '前奏取 A 段开头 Gm–C7–F 的功能骨架，每小节最多换一次和弦。'),
  interlude: version('F', instrumentalMelody.slice(0, 4), drafts.interlude.slice(0, 4), '速度相同。间奏回到 A 段每两拍换和弦的速度，F 后继续经 Dm 回到 Gm。'),
  ending: version('D', instrumentalMelody.slice(0, drafts.ending.length), drafts.ending, 'D 和 G/A 交替，上方 A、B 级进。A 仍是属低音。第四小节的停顿把往复的材料和最后持续的 D 分开。')
});

function excerpt(key, melody, before, after, start, end, beforeSummary, afterSummary) {
  return {
    draft: version(key, melody.slice(start, end), before.slice(start, end), beforeSummary),
    revised: version(key, melody.slice(start, end), after.slice(start, end), afterSummary)
  };
}

mountVariant('pro-bossa-reharm', {
  intro: excerpt('F', instrumentalMelody, drafts.intro, revised.intro, 2, 7,
    '两小节 F 连在一起，再以 Gm–C7 回到 F。',
    '在重复的 F 尾部插入 Am7–A♭m7，平行半音下行到 Gm7。B♭/C 保留 C 低音，替换下一处 C7。'),
  a: excerpt('F', [...a, rest], [...drafts.a, 'B♭'], [...revised.a, 'B♭maj7'], 3, 9,
    'F–Dm 回到 Gm，段尾停在 F。末尾的 B♭ 是 B 段的第一个和弦。',
    '两处短促的属功能替代各自指向不同目标，A♭9 到 Gm7，B9 到 B♭maj7。旋律保留不变。'),
  b: excerpt('F', b, drafts.b, revised.b, 3, 8,
    '第一次 B♭–Am–Gm 下行回 F，第二次经 Em–A 离开原调。',
    'Cm7–B7 接回 B♭maj7；临进入 A 和弦时，Em7 的 G–B–D 保留，低音先换成 A。'),
  c: excerpt('D', refrain, drafts.c, revised.c, 2, 7,
    'Bm 小调插段后回到 D 大调的 IV，旋律休止的一小节留给和声延续。',
    '旋律休止处以 Bm7–B♭m7–Am7 逐半音下降，再由 D9 解到 Gmaj7。A/G 后的 F♯m7 保留 A、C♯、E。'),
  c3: excerpt('D', [...refrain3, refrain4[0]], [...drafts.c3, drafts.c4[0]], [...revised.c3, revised.c4[0]], 6, 10,
    'D 高音落在 Bm 上，下一段照常从 Em 开始。',
    'F7 保留 B7 的三全音，以 F–E 低音下行接入 C4。9 音 G 和 13 音 D 融进原来的高音。'),
  ending: excerpt('D', instrumentalMelody, drafts.ending, revised.ending, 0, 6,
    'D–G/A 交替，短暂停顿后回到 D 三和弦。',
    '开头三小节最高音保持 E。后半拍点错开的低音 C–C♯–D，把最后的 C/D 引出来。')
});

const sections = [
  { id: 'intro', label: '前奏', key: 'F', melody: marimba, source: 'intro', material: '马林巴短句与主歌共用 ii–V–I' },
  { id: 'a1', label: 'A1', key: 'F', melody: a, source: 'a', words: aWords, material: '循环和声支撑日常叙述' },
  { id: 'b1', label: 'B1', key: 'F', melody: b, source: 'b', words: bWords, material: '从下属和弦起句，经 Em7–G/A–A 指向 D 大调' },
  { id: 'c1', label: 'C1', key: 'D', melody: refrain, source: 'c', words: cWords, material: '高音区四音题头与马林巴的前奏材料形成对照' },
  { id: 'interlude', label: '间奏', key: 'F', melody: marimba, source: 'interlude', material: '马林巴再现，每两拍换和弦，回到 F 大调的主歌' },
  { id: 'a2', label: 'A2', key: 'F', melody: a2, source: 'a', words: a2Words, material: '同一主歌旋律按第二段歌词调整起音数量' },
  { id: 'b2', label: 'B2', key: 'F', melody: b, source: 'b', words: b2Words, material: '再现 B 的下行骨架和转调接缝' },
  { id: 'c2', label: 'C2', key: 'D', melody: refrain, source: 'c', words: c2Words, material: '副歌旋律原样回归，第二段歌词交代相聚' },
  { id: 'c3', label: 'C3', key: 'D', melody: refrain3, source: 'c3', words: c3Words, material: '延长的开头和 D6 高潮加强第三次副歌，F7 通往 Em' },
  { id: 'c4', label: 'C4', key: 'D', melody: refrain4, source: 'c4', words: c4Words, material: '反复尾句动机，避免提前完全收束' },
  { id: 'ending', label: '尾奏', key: 'D', melody: instrumentalMelody.slice(0, 6), source: 'ending', material: '共通高音与半音上行低音，最终停在 D 低音上的 C 和弦' }
];

function bassNotes({ label, duration }) {
  if (label === 'r') return `r.${duration}`;
  const [bass] = chordPitches[label];
  return duration === '1' ? `${bass}.2 ${bass}.2` : `${bass}.${duration}`;
}

function guitarNotes({ label, duration }) {
  if (label === 'r') return `r.${duration}`;
  const chord = `(${chordPitches[label][1]})`;
  if (duration === '1') return `r.8 ${chord}.8 r.4 ${chord}.4 r.8 ${chord}.8`;
  if (duration === '2') return `r.8 ${chord}.8 r.8 ${chord}.8`;
  if (duration === '4') return `r.8 ${chord}.8`;
  return `${chord}.${duration}`;
}

const melodyTex = sections.map(({ label, key, melody, words }) =>
  String.raw`\section ("${label}") \ks ${key} ${melodyWithWords(melody, words).join(' | ')}`
).join(' | ');
const harmonyTex = sections.map(({ key, source }) =>
  String.raw`\ks ${key} ${revised[source].map(bar => chordEvents(bar).map(writtenChord).join(' ')).join(' | ')}`
).join(' | ');
const melodyTrack = notationOnly => ({
  name: notationOnly ? '' : '主旋律',
  program: 73,
  ...(notationOnly ? { notationOnly: true } : { playbackOnly: true }),
  phrase: notationOnly
    ? String.raw`${meter} ${melodyTex} || \staff { score } \tuning (none) \clef F4 ${harmonyTex}`
    : meter + ' ' + sections.flatMap(({ melody, source }) => melody.map(bar =>
      ['intro', 'interlude'].includes(source) ? rest : bar)).join(' | ')
});
const marimbaTrack = {
  name: '马林巴',
  program: 12,
  playbackOnly: true,
  phrase: meter + ' ' + sections.flatMap(({ melody, source }) => melody.map(bar =>
    ['intro', 'interlude'].includes(source) ? bar : rest)).join(' | ')
};
const accompanimentTrack = (name, program, render) => ({
  name,
  program,
  playbackOnly: true,
  phrase: meter + ' ' + sections.flatMap(({ source }) =>
    revised[source].map(bar => chordEvents(bar).map(render).join(' '))).join(' | ')
});

let first = 1;
const timelineSections = sections.map(({ id, label, melody, material }) => {
  const segment = { id, label, first, last: first + melody.length - 1, material };
  first = segment.last + 1;
  return segment;
});

mountFormAnalysis(document.getElementById('pro-bossa-final'), {
  sections: timelineSections,
  score: {
    tempo,
    soundFontUrl: bandSoundFont,
    notes: {
      scoreTracks: [
        melodyTrack(true),
        melodyTrack(false),
        marimbaTrack,
        accompanimentTrack('尼龙弦吉他', 24, guitarNotes),
        accompanimentTrack('贝斯', 32, bassNotes)
      ]
    }
  }
});
