import { completed, songScore, withLyrics, write } from './pro-score.js';
import { mountScore } from '../../shared/formats/score.js';

const tempo = 116;
const voicings = {
  Cm: 'C3 G3 C4 Eb4', 'F/G': 'G2 F3 A3 C4', 'E♭m9': 'Eb3 Gb3 Bb3 Db4 F4',
  'A♭/B♭': 'Bb2 Ab3 C4 Eb4', Gm7: 'G2 F3 Bb3 D4', A7: 'A2 G3 C#4 E4',
  Dm: 'D3 F3 A3 D4', 'B♭': 'Bb2 F3 Bb3 D4', Dm9: 'D3 F3 A3 C4 E4', 'B♭/C': 'C3 F3 Bb3',
  Fm7: 'F3 Ab3 C4 Eb4', 'B♭7': 'Bb2 F3 Ab3 D4', 'E♭': 'Eb3 G3 Bb3',
  'E♭m7': 'Eb3 Gb3 Bb3 Db4', 'A♭7': 'Ab2 Gb3 C4 Eb4', 'D♭': 'Db3 F3 Ab3',
  'E♭maj7': 'Eb3 G3 Bb3 D4', 'D♭maj7': 'Db3 F3 Ab3 C4', 'G♭/A♭': 'Ab2 Gb3 Bb3 Db4',
  Em: 'E3 B3 E4 G4', F: 'F3 A3 C4 F4', G: 'G2 B3 D4 G4', G7: 'G2 B3 F4 G4',
  C: 'C3 E3 C4 G4', D: 'D3 A3 D4 F#4', Dm7: 'D3 F3 A3 C4', Bm: 'B2 F#3 D4 F#4',
  Am: 'A2 C4 E4 A4', B7: 'B2 D#4 F#4 A4', Cmaj7: 'C3 E3 G3 B4', 'D/C': 'C3 D4 F#4 A4',
  Bm7: 'B2 D3 F#3 A4', Am7: 'A2 C4 E4 G4', Em7: 'E3 B3 D4 G4',
  'C/D': 'D3 G3 C4 E4', 'D/E': 'E3 A3 D4 F#4', 'E♭/F': 'F3 Bb3 Eb4 G4'
};

function chord(name, duration = '1', { dotted = false, tied = false } = {}) {
  const pitches = tied ? voicings[name].split(' ').map(pitch => `${pitch}{t}`).join(' ') : voicings[name];
  const effects = [dotted ? 'd' : '', tied ? '' : `ch "${name}"`].filter(Boolean).join(' ');
  return `(${pitches}).${duration}${effects ? ' { ' + effects + ' }' : ''}`;
}

function harmony(bars) {
  return bars.map(bar => typeof bar === 'string' ? chord(bar) : bar.map(event => {
    if (event === '休止') return 'r.4';
    return chord(...event);
  }).join(' '));
}

const pair = (a, b) => [[a, '2'], [b, '2']];
const late = (a, b) => [[a, '2', { dotted: true }], [a, '8', { tied: true }], [b, '8']];
const continueChord = name => [[name, '1', { tied: true }]];
const score = (melody, chords, arrangement = {}) => songScore({ tempo, melody, harmony: harmony(chords), ...arrangement });

const aMelody = [
  'E4.4 F4.4 A4.2', 'G4.8 A4.8 G4.4 E4.4 D4.4', 'F4.4 G4.4 F4.2', 'E4.4 D4.2 r.4',
  'E4.8 F4.8 A4.4 G4.2', 'F4.4 E4.4 D4.4 E4.4', 'F4.4 G4.8 F4.8 D4.2', 'C4.2 D4.4 r.4'
];
const a1 = aMelody.toSpliced(0, 1, 'E4.8 E4.8 F4.4 A4.2');
const aDraft = ['Dm', 'Dm', 'B♭', 'B♭', 'Dm', 'Dm', 'B♭', 'B♭'];
const aRevised = ['Dm9', 'Dm9', 'B♭/C', 'B♭/C', 'Dm9', 'Dm9', 'B♭/C', 'B♭/C'];

const bStart = [
  'G4.4 G4.8 F4.8 Eb4.2', 'G4.4 Bb4.4 G4.2', 'F4.4 F4.8 Eb4.8 Db4.2', 'F4.4 Ab4.4 F4.2',
  'G4.4 A4.4 Bb4.4 C5.4', 'C#5.4 C#5.8 B4.8 A4.2'
];
const b1 = [...bStart, 'A4.4 G4.4 F4.2', 'F4.4 E4.4 D4.2'];
const b2 = [...bStart, 'D4.4 E4.4 F4.4 A4.4', 'F4.4 G4.4 A4.2'];
const bOpening = [pair('Fm7', 'B♭7'), 'E♭', pair('E♭m7', 'A♭7'), 'D♭', 'Gm7', 'A7'];
const bRevised = [late('A♭/B♭', 'E♭maj7'), continueChord('E♭maj7'), late('G♭/A♭', 'D♭maj7'), continueChord('D♭maj7'), late('Gm7', 'A7'), continueChord('A7')];
const b1Draft = [...bOpening, 'Dm', 'B♭'];
const b2Draft = [...bOpening, pair('Dm', 'Em'), pair('F', 'G')];
const b1Chords = [...bRevised, late('Dm9', 'B♭/C'), continueChord('B♭/C')];
const b2Chords = [...bRevised, pair('C/D', 'D/E'), pair('E♭/F', 'F/G')];

const chorus = [
  'G4.8 B4.8 D5.4 B4.4 A4.4', 'G4.4 B4.4 A4.2', 'G4.8 B4.8 D5.4 B4.4 A4.4', 'G4.2 A4.4 B4.4',
  'G4.8 B4.8 D5.4 B4.4 A4.4', 'G4.4 B4.4 A4.2', 'C5.4 B4.4 A4.4 G4.4', 'F#4.4 A4.4 B4.2'
];
const cStart = [pair('C', 'D'), [['Em', '2'], ['Dm7', '4'], ['G7', '4']], pair('C', 'D'), [['Em', '2'], ['Dm7', '4'], ['G7', '4']], pair('C', 'D'), [['Em', '2'], ['Dm7', '4'], ['G7', '4']], pair('C', 'Bm'), [['Am', '2'], ['D', '4'], ['Bm', '4']]];
const cEnd = cStart.map((bar, index) => [2, 4].includes(index) ? pair('C', 'B7') : bar);
const c3Draft = [pair('C', 'D'), pair('Bm', 'Em'), pair('Am', 'D'), 'G', pair('C', 'D'), pair('Bm', 'Em'), pair('Am', 'Bm'), [['C', '2'], ['D', '4'], ['Bm', '4']]];
const c3Final = [pair('Cmaj7', 'D/C'), pair('Bm7', 'Em'), pair('Am7', 'D'), pair('G', 'G7'), pair('Cmaj7', 'D/C'), pair('Bm7', 'Em'), pair('Am7', 'Bm7'), [['Cmaj7', '2'], ['D', '4'], ['Bm7', '4']]];

const introMotif = ['C4.2 Eb4.4 G4.4', 'F4.2 Eb4.2', 'A4.2 G4.4 F4.4', 'G4.1'];
const intro1 = [...introMotif, ...introMotif];
const intro1Chords = ['Cm', 'Cm', 'F/G', 'F/G', 'Cm', 'Cm', 'F/G', 'F/G'];
const intro2 = ['C4.4 Eb4.4 G4.2', 'A4.4 G4.4 F4.2', 'G4.4 Eb4.4 C4.2', 'A4.4 G4.4 F4.2', 'Eb4.4 F4.4 Gb4.2', 'C5.4 Bb4.4 Ab4.2', 'Bb4.4 A4.4 G4.2', 'E4.4 G4.4 C#5.2'];
const intro2Chords = ['Cm', 'F/G', 'Cm', 'F/G', 'E♭m9', 'A♭/B♭', 'Gm7', 'A7'];
const interlude = ['G4.2 E4.2', 'A4.2 G4.2', 'F#4.2 A4.2', 'G4.2 E4.2', 'A4.2 C5.2', 'B4.2 A4.2', 'G4.2 E4.2', 'E4.8 E4.8 r.4 F#4.2'];
const interludeChords = [pair('C', 'D/C'), pair('Bm7', 'Em7'), pair('Am', 'D'), pair('G', 'G7'), pair('C', 'D/C'), pair('Bm', 'Em'), 'A7', [['C/D', '8'], ['C/D', '8'], '休止', ['Bm', '2']]];
const ending = [...intro1, 'C4.1 { fermata medium }'];
const endingChords = [...intro1Chords, 'Cm'];
const sounds = { lead: 81, backing: 89 };

write('pro-electro-themes', [
  ['A · 两个和弦', 'Dm 与 B♭ 每两个小节交替。旋律第一音 E 是 Dm 的九音，段尾的 D 让乐句又回到原点。', score(aMelody, aDraft)],
  ['B₁ · 返回 A', 'E♭ 大调与 D♭ 大调各有二–五–一，相同旋律轮廓随之降低全音。末两小节 Dm–B♭ 接回 A。', score(b1, b1Draft)],
  ['B₂、B₃ · 通向副歌', '前六小节保留。末两小节的低音 D–E–F–G 上行，句尾同样抬升。', score(b2, b2Draft)],
  ['C₁、C₂ · 副歌前半', '同一个高音 D 多次出现在相同的动机上，Em 后的 Dm7–G7 短暂把和声引向 C。', score(chorus, cStart)],
  ['C₁、C₂、C₄ · 副歌后半', '第三、第五小节后半的 D 变为 B7。旋律没有脱离原来的副歌，B7 的 D♯ 把下一和弦引向 Em。', score(chorus, cEnd)],
  ['C₃ · 副歌再现', '同一高音动机回归，改用 C–D–Bm–Em，结尾改由 Am–Bm–C–D 上行准备 C₄。', score(chorus, c3Draft)]
]);

write('pro-electro-lyrics', [
  ['四字句头', '第一拍拆成两次同音起唱，容纳「踌躇」两字。「前」仍落在半小节长音上。', score(withLyrics(a1.slice(0, 2), ['踌躇不前', '我又回原点']), aDraft.slice(0, 2))],
  ['三字句头', '第一拍恢复一次起唱。「暗」占原位置的长音，第二小节沿用相同节奏。', score(withLyrics(aMelody.slice(0, 2), ['路微暗', '灯在我身边']), aDraft.slice(0, 2))]
]);

write('pro-electro-connectors', [
  ['第一前奏', 'C 多利亚的 A 自然音在 F/G 上显露。每两小节才换一次和弦，留出合成声部铺陈。', score(intro1, intro1Chords, sounds)],
  ['第二前奏', '前四小节把变化频率提高到每小节一次。E♭ 多利亚的片段之后，Gm7–A7 为 Dm 做准备。', score(intro2, intro2Chords, sounds)],
  ['再现前奏', '作为第一次间奏时，和弦顺序不动，只给第二前奏的线条换一个句尾。', score(intro2.toSpliced(1, 1, 'A4.4 C5.4 G4.2'), intro2Chords, sounds)],
  ['独立间奏', '取副歌改配的和弦，另写短促的线条。末小节两个 C/D 起音后，第二拍让所有声部空出，Bm 在第三拍重新进入。', score(interlude, interludeChords, sounds)],
  ['尾奏', '回用第一前奏的 Cm–F/G，在 C 音与 Cm 上延长后结束。', score(ending, endingChords, sounds)]
]);

const revisions = {
  verse: { melody: aMelody, draft: aDraft, revised: aRevised,
    descriptions: ['低音在 D 与 B♭ 之间跳进。', '低音改成 D–C，Dm 增加七音和九音。B♭/C 省去上方 B♭ 三和弦的三音 D。'] },
  firstBridge: { melody: b1, draft: b1Draft, revised: b1Chords,
    descriptions: ['两组二–五–一各在下一小节第 1 拍落到主和弦。', '省去两组进行的 ii。主和弦在前一小节第 4 拍后半起音，下小节第 1 拍只延续。'] },
  returningBridge: { melody: b2, draft: b2Draft, revised: b2Chords,
    descriptions: ['前六小节与 B₁ 相同，末两小节让根音 D–E–F–G 上行。', '末两小节保留 D–E–F–G 的低音，上方改用 C、D、E♭、F。'] },
  chorus: { melody: chorus, draft: c3Draft, revised: c3Final,
    descriptions: ['旋律保持副歌轮廓，C 与 D 先各用自己的根音。', 'Cmaj7–D/C 保持 C 低音。最初四个和弦的顶音是 B、A、A、G。'] }
};

const revisionDemo = document.getElementById('pro-electro-revisions');
const sectionChoice = revisionDemo.querySelector('[name="section"]');
const versionChoice = revisionDemo.querySelector('[name="version"]');
const revisionCue = revisionDemo.querySelector('.music-demo-cue');
const comparison = revisionDemo.querySelector('.chord-revision-table');

function chordChanges(bar) {
  let beat = 1;
  const events = typeof bar === 'string' ? [[bar, '1']] : bar;
  const changes = [];
  for (const [name, duration, { dotted = false, tied = false } = {}] of events) {
    if (!tied || beat === 1) changes.push({ name, beat, tied });
    beat += (dotted ? 6 : 4) / Number(duration);
  }
  return changes;
}

function renderRevisionTable() {
  const { draft, revised } = revisions[sectionChoice.value];
  comparison.caption.textContent = `${sectionChoice.selectedOptions[0].textContent} 和声修订的逐小节对照`;
  const before = draft.map(chordChanges);
  const after = revised.map(chordChanges);
  for (const [version, bars] of [['draft', before], ['revised', after]]) {
    const row = comparison.querySelector(`[data-electro-chords="${version}"]`);
    row.replaceChildren(row.cells[0]);
    bars.forEach((changes, index) => {
      const cell = row.insertCell();
      for (const { name, beat, tied } of changes) {
        const event = document.createElement('span');
        const position = document.createElement('small');
        position.textContent = `${Math.floor(beat)} 拍${Number.isInteger(beat) ? '' : '后半'}`;
        const changed = version === 'revised' && !before[index].some(previous =>
          previous.beat === beat && previous.name === name && previous.tied === tied);
        const chordLabel = document.createElement(changed ? 'mark' : 'span');
        chordLabel.textContent = tied ? `${name}（延续）` : name;
        event.append(position, chordLabel);
        cell.append(event);
      }
    });
  }
}

function currentRevision() {
  const revision = revisions[sectionChoice.value];
  const version = versionChoice.value;
  revisionCue.textContent = revision.descriptions[versionChoice.selectedIndex];
  return score(revision.melody, revision[version]);
}

renderRevisionTable();
const revisionPlayer = mountScore(revisionDemo.querySelector('figure'), { notation: 'staff', ...currentRevision() });
sectionChoice.addEventListener('change', () => {
  renderRevisionTable();
  revisionPlayer.setNotes(currentRevision().notes);
});
versionChoice.addEventListener('change', () => revisionPlayer.setNotes(currentRevision().notes));

const sungA1 = withLyrics(a1, ['踌躇不前', '我又回原点', '照见了', '旧墙', '无人作伴', '楼梯昏暗', '我还是在', '回看']);
const sungA2 = withLyrics(aMelody, ['路微暗', '灯在我身边', '风经过', '街角', '我问自己', '沿途脚印', '能否通向', '天亮']);
const sungA3 = withLyrics(aMelody, ['夜渐浅', '心已不打转', '迈一步', '向前', '沿路的墙', '逐渐退远', '我循着光', '出发']);
const sungB1 = withLyrics(b1, ['走了很久', '又迷路', '听见雨声', '落身后', '何处能留', '哪一个我', '还记得', '怎么走']);
const sungB2 = withLyrics(b2, ['走了很久', '别停步', '越过街口', '见灯火', '抬头就有', '一片星河', '就在眼前', '照着我']);
const sungC = withLyrics(chorus, ['奔向那道光', '穿过雨', '一扇门打开', '迎着风', '看见新的路', '在脚下', '哪怕再远', '也抵达']);
const sungCEnd = withLyrics(chorus, ['奔向那道光', '穿过雨', '一扇门打开', '迎着风', '我想继续走', '过今夜', '把每一步', '走成歌']);

completed('pro-electro-finished', tempo, [
  ['前奏一', 'C 多利亚，每两小节换和弦', intro1, harmony(intro1Chords)],
  ['前奏二', '同材料加快和弦更换，尾部接到 Dm', intro2, harmony(intro2Chords)],
  ['A₁', '低处的九音动机，写出仍在原地打转的状态', sungA1, harmony(aRevised)],
  ['B₁', '两组相差全音的调区，最后回到 A', sungB1, harmony(b1Chords)],
  ['A₂', '同主题换词，保留较短的句头', sungA2, harmony(aRevised)],
  ['B₂', '结尾的低音阶梯推向副歌', sungB2, harmony(b2Chords)],
  ['C₁', '高音动机和重复的副歌，后半加入 B7', [...sungC, ...sungCEnd], harmony([...cStart, ...cEnd])],
  ['前奏一再现', '原前奏改作段间连接', intro1, harmony(intro1Chords)],
  ['前奏二再现', '原和声上的旋律变体', intro2.toSpliced(1, 1, 'A4.4 C5.4 G4.2'), harmony(intro2Chords)],
  ['A₃', '最后一轮只唱一次 A–B', sungA3, harmony(aRevised)],
  ['B₃', '上行斜线和弦再次预告副歌', sungB2, harmony(b2Chords)],
  ['C₂', '重唱副歌，建立最后一次回归前的参照', [...sungC, ...sungCEnd], harmony([...cStart, ...cEnd])],
  ['间奏', '取 C₃ 的和声骨架，末小节全体停一拍', interlude, harmony(interludeChords)],
  ['C₃', '旋律原样回归，换用持续低音与七和弦', sungC, harmony(c3Final)],
  ['C₄', '回到副歌后半的旋律和属功能', sungCEnd, harmony(cEnd)],
  ['尾奏', '重现第一前奏，最后在 C 处延长', ending, harmony(endingChords)]
], sounds);
