import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScore } from '../../shared/formats/score.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { lyricBars, mountSongVariants } from '../songwriting/songwriting-score.js';

const tempo = 84;
const meter = String.raw`\ks C \ts (3 4)`;

// Each voicing lists the bass first. The same pitches support the block-chord draft
// and the finished accompaniment, where the upper notes enter after the bass.
const voicings = {
  Am: ['A2', 'E3', 'A3', 'C4'],
  Am9: ['A2', 'G3', 'C4', 'E4', 'B4'],
  F: ['F2', 'F3', 'A3', 'C4'],
  Fadd9: ['F2', 'F3', 'A3', 'C4', 'G4'],
  Dm: ['D2', 'F3', 'A3', 'D4'],
  Dm7: ['D3', 'F3', 'A3', 'C4'],
  Dm9: ['D2', 'F3', 'A3', 'C4', 'E4'],
  Em: ['E3', 'G3', 'B3', 'E4'],
  E7: ['E3', 'G#3', 'B3', 'D4'],
  'B♭9': ['Bb2', 'Ab3', 'C4', 'D4', 'F4'],
  G: ['G2', 'G3', 'B3', 'D4'],
  'D/E': ['E3', 'F#3', 'A3', 'D4'],
  Fm: ['F2', 'F3', 'Ab3', 'C4'],
  Fm7: ['F2', 'F3', 'Ab3', 'C4', 'Eb4'],
  Gm: ['G2', 'G3', 'Bb3', 'D4'],
  Gm7: ['G2', 'F3', 'Bb3', 'D4'],
  'A♭': ['Ab2', 'Eb3', 'Ab3', 'C4'],
  'A♭maj7': ['Ab2', 'Eb3', 'G3', 'C4'],
  'B♭': ['Bb2', 'F3', 'Bb3', 'D4'],
  'B♭7': ['Bb2', 'F3', 'Ab3', 'D4'],
  'D♭maj9': ['Db3', 'F3', 'Ab3', 'C4', 'Eb4'],
  'E♭': ['Eb3', 'G3', 'Bb3', 'Eb4'],
  'E♭maj7': ['Eb3', 'G3', 'Bb3', 'D4'],
  C: ['C3', 'G3', 'C4', 'E4'],
  Cmaj7: ['C3', 'G3', 'B3', 'E4'],
  C7: ['C3', 'G3', 'Bb3', 'E4'],
  Cm: ['C3', 'G3', 'C4', 'Eb4'],
  Cm7: ['C3', 'G3', 'Bb3', 'Eb4'],
  Csus4: ['C3', 'G3', 'C4', 'F4'],
  G7: ['G2', 'F3', 'B3', 'D4'],
  'G7(♭9)': ['G2', 'F3', 'B3', 'D4', 'Ab4'],
  'F/G': ['G2', 'F3', 'A3', 'C4'],
  'Dm/G': ['G2', 'F3', 'A3', 'D4'],
  'F♯m7(♭5)': ['F#2', 'E3', 'A3', 'C4'],
  'G♯dim7': ['G#2', 'F3', 'B3', 'D4']
};

const intro = {
  melody: [
    'A4.4 E4.4 C4.4', 'F4.4 C4.4 A3.4', 'D4.4 A3.4 F3.4', 'D4.4 r.4 D4.4',
    'E4.4 G4.4 E4.4', 'D4.4 E4.2', 'C4.4 D4.4 E4.4', 'D4.2 r.4'
  ],
  draft: ['Am', 'F', 'Dm', 'Em', 'Am', 'G', 'Am', 'G'],
  revised: ['Am9', 'Fadd9', 'Dm9', 'B♭9', 'Am9', 'D/E', 'Am9', 'D/E']
};

const a = {
  melody: [
    'E4.4 G4.4 E4.4', 'D4.4 E4.2', 'A4.4 G4.4 E4.4', 'D4.2 r.4',
    'C4.2 Eb4.4', 'D4.4 G4.4 F4.4', 'Eb4.4 F4.4 Ab4.4', 'F4.2 r.4'
  ],
  draft: ['Am', 'G', 'Am', 'G', 'Fm', 'Gm', 'A♭', 'B♭'],
  revised: ['Am9', 'D/E', 'Am9', 'D/E', 'Fm7', 'Gm7', 'A♭maj7', 'D♭maj9']
};
const aSecond = a.melody.toSpliced(1, 1, 'D4.8 D4.8 E4.2');
const aLyrics = ['檐下风还凉门外的路一点点发白等太阳来', '玻璃上还留霜远处的树一寸寸醒来让天光开'];

const b = {
  melody: [
    'E4.8 D4.8 C4.8 D4.8 E4.8 G4.8', 'G4.8 E4.8 F4.8 G4.8 A4.8 G4.8',
    'A4.8 G4.8 E4.8 G4.8 E4.4', 'C5.2 E4.4',
    'Ab4.8 G4.8 F4.8 G4.8 Ab4.8 C5.8', 'G4.8 F4.8 D4.4 G4.4',
    'Ab4.4 G4.4 F4.4', 'D4.2 B4.4'
  ],
  draft: ['C', 'C', 'Am', 'Am', 'Fm', 'Gm', 'A♭', [['Dm', 2], ['G7', 1]]]
};
const bLyrics = [
  '我看见屋檐的水珠轻轻发亮我想起有人说过天总会慢慢亮长街尽头影子在摇晃',
  '我看见街角的信箱映着微光我记得你曾说过把门轻轻打开长街尽头有人在等候'
];

const c = {
  melody: [
    'A4.4 C5.4 D5.4', 'C5.4 G4.4 B4.4', 'A4.4 G4.8 E4.8 A4.4', 'F4.2 r.4',
    'F4.4 E4.4 D4.4', 'D4.4 F4.4 A4.4', 'G4.4 E4.4 C4.4', 'G4.2 G4.4',
    'A4.4 C5.4 D5.4', 'C5.4 G4.4 G4.4', 'A4.4 E4.4 G4.4', 'C5.2 r.4',
    'F4.4 A4.4 D4.4', 'D4.4 F4.4 F4.4', 'G4.4 G4.4 C5.4', 'C5.2 r.4'
  ],
  draft: ['F', 'G', 'Am', 'F', 'Dm', 'G7', 'C', 'C', 'F', 'G', 'Am', 'F', 'Dm', 'Dm/G', 'C', 'C'],
  revised: [
    'F', 'G', 'Am', 'F', 'Dm', 'F/G', 'Cmaj7', [['Gm7', 2], ['C7', 1]],
    'F', 'G', 'Am', 'F♯m7(♭5)', 'Dm', [['Dm/G', 2], ['G7(♭9)', 1]], 'Csus4', 'C'
  ]
};
const chorusLyrics = '把窗推开让光落在我手上满街风把树影吹到长街上把窗推开让风替我说话它说春天已经走到窗下';

const d = {
  melody: [
    'F4.2 C5.4', 'Bb4.4 F4.4 D4.4', 'G4.4 Bb4.4 G4.4', 'Eb4.2 r.4',
    'F4.4 E4.8 D4.8 F4.4', 'D4.4 B4.4 D4.4', 'E4.2 C5.4', 'G4.4 G4.4 E4.4',
    'F4.2 Ab4.4', 'Bb4.4 F4.4 D4.4', 'G4.4 Bb4.4 G4.4', 'Eb4.2 C4.4',
    'F4.4 E4.8 D4.8 F4.4', 'D4.4 E4.4 F4.4', 'G4.2 B4.4', 'G4.2 r.4'
  ],
  draft: ['Fm', 'B♭7', 'E♭', 'A♭', 'Dm', 'G7', 'Am', 'Am', 'Fm', 'B♭7', 'Gm', 'Cm', 'Dm', 'Dm', 'G', 'G'],
  revised: [
    'Fm7', 'B♭7', 'E♭maj7', 'A♭maj7', 'Dm7', [['G7', 2], ['G♯dim7', 1]], 'Am', [['Gm7', 2], ['C', 1]],
    'Fm7', 'B♭7', 'Gm', 'Cm7', 'Dm7', 'Dm7', 'G', 'G'
  ]
};
const bridgeLyrics = '有时我听见楼梯里面留着昨日的回声和那些走远的人我也许还记得他们但路已在晨光下慢慢亮';

const joinMotive = ['A4.4 C5.4 A4.4', 'B4.4 G4.4 D4.4', 'E4.4 G4.4 A4.4', 'A4.2 r.4'];
const interlude = {
  melody: [...joinMotive, 'F4.4 A4.4 D4.4', 'F4.2 A4.4', 'G#4.4 B4.4 G#4.4', 'G#4.2 B4.4'],
  draft: ['F', 'G', 'Am', 'Am', 'Dm', 'Dm', 'E7', 'E7']
};
const ending = {
  melody: [...joinMotive, 'F4.4 A4.4 D4.4', 'B4.4 G4.4 D4.4', 'E4.4 G4.4 C5.4', 'F4.2 G4.4', 'E4.2 { d }'],
  draft: ['F', 'G', 'Am', 'Am', 'Dm', 'G', 'C', 'Csus4', 'C']
};

function voices(melody, accompaniment) {
  return { scoreTracks: [
    { name: '旋律', program: 0, phrase: meter + ' ' + melody.join(' | ') },
    { name: '伴奏', program: 0, phrase: '\\clef F4 ' + meter + ' ' + accompaniment.join(' | ') }
  ] };
}

function chordBeat(pitches, duration, effects = []) {
  const note = pitches.length === 1 ? pitches[0] : '(' + pitches.join(' ') + ')';
  return note + '.' + duration + (effects.length ? ' { ' + effects.join(' ') + ' }' : '');
}

function chordBars(progression, rhythmic = false) {
  return progression.map(bar => {
    const groups = typeof bar === 'string' ? [[bar, 3]] : bar;
    return groups.map(([name, beats]) => {
      const pitches = voicings[name];
      const label = 'ch "' + name + '"';
      if (!rhythmic || beats < 2) {
        return chordBeat(pitches, beats === 1 ? 4 : 2, beats === 3 ? ['d', label, 'dy p'] : [label, 'dy p']);
      }
      const [bass, ...upper] = pitches;
      const beat = chordBeat(upper, 4, ['dy p']);
      return [chordBeat([bass], 4, [label, 'dy mp']), ...Array(beats - 1).fill(beat)].join(' ');
    }).join(' ');
  });
}

function scoreFor(section, version = 'draft') {
  return voices(section.melody, chordBars(section[version]));
}

function step(label, section, description) {
  return { label, description, notes: scoreFor(section) };
}

mountScoreWritingSteps(document.getElementById('ballad-theme-drafts'), {
  score: { tempo },
  steps: [
    step('A 段', a, '前四小节采用 A 小调五声，第二句保留 C，和声进入 C 小调色彩。'),
    { label: 'A 段 · 多利亚衬底', description: '前四小节的旋律照旧。D/E 加入旋律中原本没用到的 F♯，改写和声的调式色彩。',
      notes: scoreFor({ melody: a.melody.slice(0, 4), revised: a.revised.slice(0, 4) }, 'revised') },
    step('B 段', b, '从 C–Am 的明亮部分转入 Fm，末尾 Dm–G7 对准下一段的 C 大调。'),
    step('C 段', c, '两句一起唱到 D5。第二句保持第一句的低音归向，把 G7 换成 Dm/G。'),
    step('D 段', d, '前四小节沿四度移动，随后 G7 转去 Am。第二句从 Fm 再出发，以 Dm–G 给副歌留出入口。')
  ]
});

mountSongVariants('ballad-lyric-fit', {
  first: {
    tempo,
    notes: meter + ' ' + lyricBars('檐下风还凉', a.melody.slice(0, 2)),
    summary: '「还」占第二小节第一拍，「凉」在第二拍起唱并保持两拍。'
  },
  second: {
    tempo,
    notes: meter + ' ' + lyricBars('玻璃上还留霜', aSecond.slice(0, 2)),
    summary: '「还留」分占第一拍的前、后半拍，「霜」和上一段的「凉」在相同位置进入。'
  }
});

function appendSection(first, next, count) {
  return {
    melody: [...first.melody, ...next.melody.slice(0, count)],
    draft: [...first.draft, ...next.draft.slice(0, count)],
    revised: first.revised && [...first.revised, ...(next.revised ?? next.draft).slice(0, count)]
  };
}

mountScoreWritingSteps(document.getElementById('ballad-instrumental-joins'), {
  score: { tempo },
  steps: [
    step('前奏 → A', appendSection(intro, a, 2), '前三和弦的根音隔三度下行。后半已使用 A 段的 Am–G。'),
    step('间奏 → A', appendSection(interlude, a, 2), '间奏开头借副歌的 F–G–Am，末尾 E7 把 G♯ 导向后面的 A。'),
    step('尾奏', ending, '第一句复用间奏动机。第二句返回 C，以 Csus4–C 解决。')
  ]
});

const revisions = {
  intro: { music: appendSection(intro, a, 1), draft: 'Am–F–Dm–Em 后回到 Am–G。',
    revised: 'B♭9 到 Am9 时低音下行半音，D/E 里的 F♯ 出现在 A 小调五声旋律下方。' },
  a: { music: appendSection(a, a, 1), draft: '句尾旋律 F 是 B♭ 的五音。末小节后接下一句的 Am。',
    revised: '句尾 F 留在原位，成为 D♭maj9 的三音，随后低音转回 Am9。' },
  c: { music: c, draft: '两句分别经 G7 和 Dm/G 归到 C。',
    revised: '后一半的 F♯m7(♭5) 保留旋律 C，末句经过 G7(♭9) 与 Csus4 归到 C。' },
  d: { music: d, draft: 'G7 的低音从 G 直接跳到 Am 的 A。',
    revised: '第六小节第三拍插入 G♯dim7 后，低音 G–G♯–A 连续经过两个半音。' }
};
const revisionDemo = document.getElementById('ballad-chord-revisions');
const sectionChoice = revisionDemo.querySelector('[name="section"]');
const versionChoice = revisionDemo.querySelector('[name="version"]');
const revisionCue = revisionDemo.querySelector('.music-demo-cue');
function selectedRevision() {
  const revision = revisions[sectionChoice.value];
  const version = versionChoice.value;
  revisionCue.textContent = revision[version];
  return scoreFor(revision.music, version);
}
const revisionPlayer = mountScore(revisionDemo.querySelector('figure'), {
  notation: 'staff', tempo, notes: selectedRevision()
});
revisionDemo.addEventListener('change', () => revisionPlayer.setNotes(selectedRevision()));

const route = [
  { id: 'intro', label: '前奏', music: intro, material: '九度和弦铺底，B♭9 把低音带到 Am9。' },
  { id: 'a1', label: 'A₁', music: a, lyrics: aLyrics[0], material: 'A 小调五声铺开，C 小调的 Fm 改变伴奏色彩。' },
  { id: 'b1', label: 'B₁', music: b, lyrics: bLyrics[0], material: '八分音符密度增加，通过 C 大调迈向副歌。' },
  { id: 'c1', label: 'C₁', music: c, lyrics: chorusLyrics, material: '副歌首次达到 D5，随后两次归向 C。' },
  { id: 'interlude', label: '间奏', music: interlude, material: '接续副歌的 F–G–Am，最后以 E7 接回 A₂。' },
  { id: 'a2', label: 'A₂', music: { ...a, melody: aSecond }, lyrics: aLyrics[1], material: '只为第二行多出的音节拆开同一拍，保留主题的基本轮廓。' },
  { id: 'b2', label: 'B₂', music: b, lyrics: bLyrics[1], material: '保留 B 的节奏骨架，歌词由屋檐的水珠转到街角。' },
  { id: 'c2', label: 'C₂', music: c, lyrics: chorusLyrics, material: '副歌复现，随后转进低一些的桥段。' },
  { id: 'd', label: 'D', music: d, lyrics: bridgeLyrics, material: '四度进行与经过减和弦增添内省色彩，最后停在 G。' },
  { id: 'c3', label: 'C₃', music: c, lyrics: chorusLyrics, material: '桥段之后再现副歌，第三次唱出同一个开窗意象。' },
  { id: 'ending', label: '尾奏', music: ending, material: '间奏动机再现，速度放宽，Csus4 最后解到 C。' }
];

let first = 1;
const leadBars = [];
const backingBars = [];
const sections = route.map(({ id, label, music, lyrics, material }) => {
  const lead = lyrics ? lyricBars(lyrics, music.melody).split(' | ') : [...music.melody];
  lead[0] = String.raw`\section ("${label}") ` + lead[0];
  const accompaniment = chordBars(music.revised ?? music.draft, true);
  if (id === 'ending') {
    lead[lead.length - 2] = String.raw`\tempo 72 ` + lead.at(-2);
    lead[lead.length - 1] = String.raw`\tempo 62 ` + lead.at(-1);
    accompaniment[accompaniment.length - 1] = chordBars(['C'])[0];
  }
  leadBars.push(...lead);
  backingBars.push(...accompaniment);
  const last = first + lead.length - 1;
  const section = { id, label, first, last, material };
  first = last + 1;
  return section;
});

mountFormAnalysis(document.getElementById('ballad-finished-score'), {
  score: { tempo, notes: voices(leadBars, backingBars) },
  sections
});
