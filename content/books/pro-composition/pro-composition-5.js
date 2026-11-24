import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScore } from '../../shared/formats/score.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { lyricBars, mountSongVariants } from '../songwriting/songwriting-score.js';

const tempo = 116;
const meter = String.raw`\ks C \ts (4 4)`;

const voicings = {
  Am: 'A2 E3 A3 C4',
  Am7: 'A2 E3 G3 C4',
  Am9: 'A2 G3 C4 E4 B4',
  'A6/B': 'B2 F#3 A3 C#4 E4',
  A6: 'A2 E3 F#3 C#4',
  A: 'A2 E3 A3 C#4',
  A7: 'A2 E3 G3 C#4',
  Bm: 'B2 F#3 B3 D4',
  Bm7: 'B2 F#3 A3 D4',
  B: 'B2 F#3 B3 D#4',
  Bsus4: 'B2 F#3 B3 E4',
  B7: 'B2 F#3 A3 D#4',
  C: 'C3 E3 G3 C4',
  Cmaj7: 'C3 G3 B3 E4',
  'C/D': 'D3 G3 C4 E4',
  'C♯m': 'C#3 G#3 C#4 E4',
  'C♯m7': 'C#3 G#3 B3 E4',
  D: 'D3 F#3 A3 D4',
  D6: 'D3 F#3 A3 B3',
  D7: 'D3 F#3 A3 C4',
  D9: 'D3 F#3 C4 E4',
  Dmaj7: 'D3 F#3 A3 C#4',
  Dm: 'D3 F3 A3 D4',
  Dm7: 'D3 F3 A3 C4',
  'D/E': 'E2 A3 D4 F#4',
  'D/C': 'C3 A3 D4 F#4',
  'D6/E': 'E2 A3 B3 D4 F#4',
  'D♯m': 'D#3 F#3 A#3 D#4',
  'D♯m7': 'D#3 F#3 A#3 C#4',
  Em: 'E2 G3 B3 E4',
  Em7: 'E2 G3 B3 D4',
  E: 'E2 G#3 B3 E4',
  'E/F♯': 'F#2 G#3 B3 E4',
  'E6/F♯': 'F#2 G#3 B3 C#4 E4',
  'E♭m': 'Eb2 Gb3 Bb3 Eb4',
  'E♭m7': 'Eb2 Gb3 Bb3 Db4',
  F: 'F2 A3 C4 F4',
  F7: 'F2 A3 C4 Eb4',
  Fmaj7: 'F2 A3 C4 E4',
  Fmaj9: 'F2 A3 C4 E4 G4',
  Fm: 'F2 Ab3 C4 F4',
  'F♯m': 'F#2 A3 C#4 F#4',
  'F♯m7': 'F#2 A3 C#4 E4',
  'F♯m/A': 'A2 F#3 A3 C#4',
  'F♯sus4': 'F#2 F#3 B3 C#4',
  'F♯7': 'F#2 E3 A#3 C#4',
  G: 'G2 G3 B3 D4',
  G7: 'G2 G3 B3 D4 F4',
  Gmaj7: 'G2 F#3 B3 D4',
  Gm: 'G2 G3 Bb3 D4',
  'G♯m': 'G#2 G#3 B3 D#4',
  'G♯m7': 'G#2 F#3 B3 D#4'
};

const half = (first, second) => [[first, 2], [second, 2]];
const clipped = (first, second) => [[first, 1], [null, 0.5], [second, 0.5], [null, 2]];
const turn = (first, middle, last) => [[first, 2], [middle, 1], [last, 1]];

// The lead leaves E's third to the accompaniment in both versions.
const pedalLead = ['B4.4 E4.8 F#4.8 B4.4 r.4', 'E4.4 r.4 C4.4 D4.4'];
const pedalDraft = ['Em', turn('Em', 'Am', 'D')];
const pedalRevised = ['D6/E', turn('D6/E', 'Am9', 'C/D')];
const intro = {
  melody: [
    'E4.2 B3.2', 'D4.2 A3.2', 'A3.2 E4.2', 'F4.2 C4.2',
    ...pedalLead, ...pedalLead, ...pedalLead, pedalLead[0], 'A3.4 r.8 G#3.8 r.2'
  ],
  draft: [[['Em', 4, 'E3']], 'C', 'Am', 'F', ...pedalDraft, ...pedalDraft, ...pedalDraft, 'Em', clipped('D/E', 'E/F♯')],
  revised: [[['D/E', 4, 'E3']], 'D/C', 'Am7', 'Fmaj7', ...pedalRevised, ...pedalRevised, ...pedalRevised, 'D6/E', clipped('D6/E', 'E6/F♯')]
};

const aOpening = [
  'E4.4 B3.4 A3.8 B3.8 D4.4', 'E4.8 G4.8 E4.4 D4.4 C4.4',
  'A3.4 C4.4 A3.8 D4.8 F#4.4', 'B3.2 G4.4 r.4'
];
const aTurnLead = 'E4.4 C4.4 A3.8 B3.8 F#4.4';
const aOpeningDraft = [half('Am', 'Bm'), 'C', half('Am', 'D7'), 'G'];
const aOpeningRevised = [half('Am7', 'Bm7'), 'Cmaj7', half('Am7', 'D9'), 'Gmaj7'];
const a = {
  melody: [
    ...aOpening, 'F#4.4 A3.4 B3.8 D#4.8 F#4.4', 'E4.4 G4.4 E4.8 C#4.8 E4.4', aTurnLead, 'C4.4 E4.4 F#4.4 B3.4',
    ...aOpening, 'F#4.4 A3.4 A3.8 C4.8 A3.4', 'E4.4 G4.4 F#4.8 E4.8 B3.4', aTurnLead, 'E4.2 G#4.2'
  ],
  draft: [
    ...aOpeningDraft, 'B7', 'Em', half('Am', 'Bm'), half('C', 'B'),
    ...aOpeningDraft, 'B7', 'Em', half('Am', 'Bm'), half('D/E', 'E')
  ],
  revised: [
    ...aOpeningRevised, half('F♯m7', 'B7'), half('Em', 'A7'), half('Am7', 'Bm7'), half('Cmaj7', 'A6/B'),
    ...aOpeningRevised, half('F♯m7', 'F7'), half('Em7', 'D6'), half('Am7', 'Bm7'), half('D/E', 'E')
  ]
};
const aLyrics = '起雾的街口雨打着车窗我绕过水洼往前过街的绿灯倒数到零点夜吹过屋檐路还很长冷下来的风吹斜了雨线把旧的门牌抹黑擦肩的人群渐渐走远了我停了一步再走';
const aSecond = {
  melody: a.melody.slice(8), draft: a.draft.slice(8), revised: a.revised.slice(8)
};
const aSecondLyrics = '无声的巷口雨水漫上来冲淡了门牌字迹擦肩的人群渐渐走远了我停了一步再走';

function quickFigure(notes) {
  return notes.map((note, i) => note + (i < 4 ? '.16' : '.8')).join(' ');
}

const b = {
  melody: [
    quickFigure(['E4', 'E4', 'F4', 'E4', 'C4', 'D4', 'E4', 'G4', 'A4', 'G4']),
    'E4.2 Gb4.4 Eb4.4', 'F4.4 D4.4 B3.4 G3.4', 'C4.1',
    quickFigure(['G#4', 'G#4', 'F#4', 'G#4', 'C#4', 'E4', 'C#4', 'A#3', 'C#4', 'E4']),
    'F#4.4 C#4.4 B3.4 G#3.4', 'E4.4 G#4.4 F#4.4 D#4.4', 'G4.4 E4.4 F#4.4 A#3.4'
  ],
  draft: [
    'F', half('Em', 'E♭m'), half('Dm7', 'G7'), 'C',
    half('C♯m', 'F♯7'), 'G♯m', half('C♯m', 'D♯m'), half('Em', 'F♯7')
  ],
  revised: [
    'Fmaj7', half('Em7', 'E♭m7'), half('Dm7', 'G7'), 'Cmaj7',
    half('C♯m7', 'F♯7'), half('D♯m7', 'G♯m7'), half('C♯m7', 'D♯m7'), half('Em7', 'F♯7')
  ]
};
const bLyrics = [
  '走过便利店还有路边摊有几辆车开得很慢换一条街也换不了天气手心还是没有一点暖和起来',
  '桥下的河水绕过旧围墙我看着谁在路口站风吹过空荡荡的出租房街灯亮了没有人再喊我回家'
];

const c = {
  melody: [
    'B3.4 F#4.4 C#4.4 A3.4', 'B3.2 D4.2', 'E4.4 G4.4 F#4.4 E4.4', 'D4.2 r.2',
    'E4.8 G#4.8 E4.8 C#4.8 F#4.8 E4.8 C#4.8 A#3.8', 'B3.4 D4.4 F#4.2',
    'E4.8 F#4.8 G4.8 E4.8 F#4.8 C#4.8 A3.8 C#4.8', 'D4.4 G4.4 F#4.2',
    'E4.8 E4.8 F#4.8 D4.8 C#4.4 A3.4', 'B3.1', 'r.1'
  ],
  draft: [
    half('Bm', 'F♯m/A'), 'G', half('Em', 'A7'), 'D', half('C♯m7', 'F♯7'), 'Bm',
    half('Em', 'F♯m'), half('G', 'F♯7'), half('Em', 'F♯m'), 'Bm', 'B'
  ],
  revised: [
    half('Bm', 'F♯m/A'), 'Gmaj7', half('Em7', 'A7'), 'Dmaj7', half('C♯m7', 'F♯7'), half('Bm', 'A6'),
    half('Em', 'F♯m'), turn('G', 'F♯sus4', 'F♯7'), half('Em7', 'F♯m7'), 'Bsus4', 'B'
  ]
};
const cLyrics = '沿着空街走吧脚步轻轻响窗里的灯一盏一盏都灭了我还是穿过这一场漫长夜就这样向前走吧';
const cSecond = { ...c, melody: ['C#4.4 D4.4 C#4.4 A3.4', 'A3.2 B3.2', ...c.melody.slice(2)] };
const cLast = { ...c, draft: [...c.draft.slice(0, -2), 'C', 'Am'], revised: [...c.revised.slice(0, -2), 'Cmaj7', 'Fmaj9'] };

const bridge = {
  melody: ['E4.2 G4.4 E4.4', 'D4.2 F#4.4 D4.4', 'C4.2 A3.2', 'C#4.4 r.8 D#4.8 r.2'],
  draft: ['C', 'Bm', 'Am', clipped('A6/B', 'B')]
};
const interlude = {
  melody: [
    'G4.4 E4.8 G4.8 C5.4 r.4', 'F#4.4 D#4.4 A3.4 B3.4', 'G4.4 B4.4 E4.2', 'E4.4 A4.4 C#5.4 r.4',
    'A4.4 F4.8 A4.8 D5.4 r.4', 'B4.4 G4.4 D4.4 G4.4', 'A4.4 C5.4 E4.2', 'F#4.4 A4.4 C5.4 r.4',
    'D4.4 r.8 F4.8 A4.4 D4.4', 'E4.4 r.8 G4.8 B4.4 E4.4', 'F4.4 r.8 Ab4.8 C5.4 F4.4', 'G4.4 D4.4 F#4.4 A#4.4'
  ],
  draft: ['C', 'B7', 'Em', 'A', 'Dm', 'G', 'Am', 'D7', 'Dm', 'Em', 'Fm', half('Gm', 'F♯7')]
};
const ending = {
  melody: [...pedalLead, ...pedalLead, ...pedalLead, ...pedalLead, 'E4.1 { fermata medium }'],
  draft: [...pedalDraft, ...pedalDraft, ...pedalDraft, ...pedalDraft, 'Em'],
  revised: [...pedalRevised, ...pedalRevised, ...pedalRevised, ...pedalRevised, 'Em']
};

const duration = { 0.5: 8, 1: 4, 2: 2, 4: 1 };

function chordBeat(pitches, length, effects = '') {
  return (pitches.includes(' ') ? '(' + pitches + ')' : pitches) + '.' + duration[length] + (effects ? ' { ' + effects + ' }' : '');
}

function chordBars(progression, rhythmic) {
  return progression.map(bar => {
    const groups = typeof bar === 'string' ? [[bar, 4]] : bar;
    return groups.map(([chord, length, bassOverride]) => {
      if (!chord) return chordBeat('r', length);
      const [defaultBass, ...upper] = voicings[chord].split(' ');
      const bass = bassOverride ?? defaultBass;
      const label = 'ch "' + chord + '"';
      if (!rhythmic || length < 2) return chordBeat([bass, ...upper].join(' '), length, label + ' dy p');
      const upperChord = upper.join(' ');
      if (length === 2) return [chordBeat(bass, 1, label + ' dy mp'), chordBeat(upperChord, 1, 'dy p')].join(' ');
      const pulse = chordBeat(upperChord, 0.5, 'dy p');
      return [chordBeat(bass, 0.5, label + ' dy mp'), 'r.8', 'r.8', pulse, chordBeat(bass, 0.5, 'dy mp'), pulse, 'r.8', pulse].join(' ');
    }).join(' ');
  });
}

function voices(melody, accompaniment) {
  return { scoreTracks: [
    { name: '旋律', program: 0, phrase: meter + ' ' + melody.join(' | ') },
    { name: '伴奏', program: 0, phrase: '\\clef F4 ' + meter + ' ' + accompaniment.join(' | ') }
  ] };
}

function scoreFor(music, version = 'draft') {
  return voices(music.melody, chordBars(music[version], false));
}

function steps(id, items) {
  mountScoreWritingSteps(document.getElementById(id), {
    score: { tempo },
    steps: items.map(([label, music, description]) => ({ label, description, notes: scoreFor(music) }))
  });
}

function selection(music, start, end) {
  return {
    melody: music.melody.slice(start, end),
    draft: music.draft.slice(start, end),
    revised: music.revised?.slice(start, end)
  };
}

steps('winter-theme-drafts', [
  ['A 段', a, '两次句头的节奏相同。A 段末尾 E 的三个和弦音，分别比下一段 F 的三个音低半音。'],
  ['B 段', b, '第一和第五小节的节奏相同，却横跨 C 大调与 G♯ 小调。末尾 F♯7 指向 Bm。'],
  ['C₁', c, '第一句起头跳进五度。两条四度和声路线分别落到 D 与 Bm，末句唱长音 B。'],
  ['C₂', cSecond, '前两小节收窄到 A 与 D。音区改变，起音节奏与和声骨架保持。']
]);

steps('winter-chorus-ending', [
  ['回到 B', selection(c, -2), '长音 B 在 Bm 上是根音。末小节变为 B 大三和弦，低音始终留在 B。'],
  ['转向 E 小调', selection(cLast, -2), '同一个 B 放到 C 和弦上成为大七度音。歌声停住后，Am 继续准备 E 小调的尾奏。']
]);

mountSongVariants('winter-lyric-fit', {
  original: {
    tempo,
    notes: meter + ' ' + lyricBars('我还是沿着街走去', ['G4.16 G4.16 F#4.8 G4.8 G4.8 B4.4 A4.8 G4.8']),
    summary: '为了加进「还是」，句头拆成十六分音符，随后又分割一个 G 的时值。'
  },
  trimmed: {
    tempo,
    notes: meter + ' ' + lyricBars('我沿着街走去', ['G4.8 F#4.8 G4.4 B4.4 A4.8 G4.8']),
    summary: '删字后「街」还在第三拍，「走去」也保留原句的收法。'
  }
});

steps('winter-instrumental-sections', [
  ['前奏', intro, 'E–C–A–F 连续下行三度，随后建立 E 小调。末小节两次短响后留出两拍空白。'],
  ['短过门', bridge, 'C–Bm–Am 逐级向下。最后 B 低音不动，上方从 A6 转至 B，再停拍。'],
  ['间奏', interlude, '十二小节从 E 小调走到 A 小调区域，末小节 F♯7 瞄准 B 小调的副歌。'],
  ['尾奏', ending, '前奏的后段动机再现。最后是带延长记号的 Em。']
]);

const beforeEnding = {
  melody: [...cLast.melody.slice(-2), pedalLead[0]],
  draft: [...cLast.draft.slice(-2), ending.draft[0]],
  revised: [...cLast.revised.slice(-2), ending.revised[0]]
};
const revisions = {
  intro: { music: selection(intro, 4, 6), draft: 'E 的三度 G 在伴奏里清楚标出小调。', revised: '保留 E 低音，在上面放 D6，少了 E 的三度音。' },
  a: { music: selection(a, 12, 16), draft: '后半个主歌仍用 B7–Em。', revised: '属和弦拆为 F♯m7–F7，低音 F♯–F–E 逐个半音下行。' },
  b: { music: selection(b, 4, 8), draft: '第六小节全部用 G♯m。', revised: '第六小节前两拍插入 D♯m7，旋律 F♯、C♯ 都是和弦音。' },
  c: { music: c, draft: 'Bm 用整小节，F♯7 直接把和声往 Bm 推。', revised: 'F♯ 成为 A6 的六度，属和弦上方的 B 先回落 A♯，为 Bm 作准备。' },
  last: { music: beforeEnding, draft: '最后的长音 B 留在 C 上，尾奏从 Em 起步。', revised: 'B 仍作为 C 的大七度音，后面的低音 F 再半音移到 D6/E 的 E。' }
};
const revisionDemo = document.getElementById('winter-chord-revisions');
const sectionChoice = revisionDemo.querySelector('[name=section]');
const versionChoice = revisionDemo.querySelector('[name=version]');
const cue = revisionDemo.querySelector('.music-demo-cue');

function selectedRevision() {
  const { music, ...descriptions } = revisions[sectionChoice.value];
  cue.textContent = descriptions[versionChoice.value];
  return scoreFor(music, versionChoice.value);
}

const player = mountScore(revisionDemo.querySelector('figure'), { notation: 'staff', tempo, notes: selectedRevision() });
revisionDemo.addEventListener('change', () => player.setNotes(selectedRevision()));

const route = [
  { id: 'intro', label: '前奏', music: intro, material: '三度下行后建立 E 低音与反拍。' },
  { id: 'a1', label: 'A₁', music: a, lyrics: aLyrics, material: '十六小节，两次相似的动机放在不同局部和声上。' },
  { id: 'b1', label: 'B₁', music: b, lyrics: bLyrics[0], material: '以相同的起音节奏贯穿 C 大调与 G♯ 小调。' },
  { id: 'c1', label: 'C₁', music: c, lyrics: cLyrics, material: '第一次副歌在 B 音上收束，尾部安排 Bsus4–B。' },
  { id: 'bridge', label: '短过门', music: bridge, material: '四小节下降后用 B 属和弦和停拍回到 E 小调。' },
  { id: 'a2', label: 'A₂', music: aSecond, lyrics: aSecondLyrics, material: '保留第一遍主歌的后八小节。' },
  { id: 'b2', label: 'B₂', music: b, lyrics: bLyrics[1], material: '旋律保持，歌词切到河岸。' },
  { id: 'c2', label: 'C₂', music: cSecond, lyrics: cLyrics, material: '副歌重现时收窄句头音区，随后插入独立的长间奏。' },
  { id: 'interlude', label: '间奏', music: interlude, material: '十二小节，经 E 小调、A 小调区域和 B 小调的属和弦。' },
  { id: 'c3', label: 'C₃', music: cLast, lyrics: cLyrics.replace('沿着空街', '穿过空街'), material: '末字 B 是 Cmaj7 的七音。歌声停下后，Fmaj9 的低音半音下行到尾奏的 E。' },
  { id: 'ending', label: '尾奏', music: ending, material: '前奏动机回归，最后停在 Em。' }
];

let first = 1;
const melody = [];
const accompaniment = [];
const sections = route.map(({ id, label, music, lyrics, material }) => {
  const lead = lyrics ? lyricBars(lyrics, music.melody).split(' | ') : [...music.melody];
  lead[0] = String.raw`\section ("${label}") ` + lead[0];
  const backing = chordBars(music.revised ?? music.draft, true);
  if (id === 'ending') backing[backing.length - 1] = chordBars(['Em'], false)[0];
  melody.push(...lead);
  accompaniment.push(...backing);
  const last = first + lead.length - 1;
  const section = { id, label, first, last, material };
  first = last + 1;
  return section;
});

mountFormAnalysis(document.getElementById('winter-finished-score'), {
  score: { tempo, notes: voices(melody, accompaniment) },
  sections
});
