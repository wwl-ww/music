import bandSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { mountScore } from '../../shared/formats/score.js';
import { lyricBars } from '../songwriting/songwriting-score.js';

const tempo = 116;
const meter = String.raw`\ts (4 4)`;
const key = name => String.raw`\ks ${name}`;
const silentBar = 'r.1';

const chords = {
  Eb: 'Eb3 G3 Bb3 Eb4',
  Ebmaj7: 'Eb3 G3 Bb3 D4',
  Fm: 'F3 Ab3 C4',
  Fm7: 'F3 Ab3 C4 Eb4',
  Gm: 'G3 Bb3 D4',
  Gm7: 'G3 Bb3 D4 F4',
  Ab: 'Ab2 Eb3 Ab3 C4',
  'Ab/Eb': 'Eb3 Ab3 C4 Eb4',
  'Ab/Bb': 'Bb2 Ab3 C4 Eb4',
  Abm: 'Ab2 Eb3 Ab3 Cb4',
  Bb: 'Bb2 F3 Bb3 D4',
  'Bb/Ab': 'Ab2 F3 Bb3 D4',
  Bbm: 'Bb2 F3 Bb3 Db4',
  Bbm7: 'Bb2 Db4 F4 Ab4',
  Bb7: 'Bb2 F3 Ab3 D4',
  Eb7: 'Eb3 G3 Bb3 Db4',
  G7: 'G2 F3 B3 D4',
  Cm: 'C3 G3 C4 Eb4',
  Cm7: 'C3 G3 Bb3 Eb4',
  F7: 'F3 A3 C4 Eb4',
  Db7: 'Db3 F3 Ab3 Cb4',
  Db9: 'Db3 F3 Ab3 Cb4 Eb4',
  Gb: 'Gb3 Bb3 Db4',
  Db: 'Db3 Db4 F4 Ab4',
  Ebm: 'Eb3 Gb3 Bb3 Eb4',
  Ebm7: 'Eb3 Gb3 Bb3 Db4',
  'F#m': 'F#3 A3 C#4',
  'F#m7': 'F#3 A3 C#4 E4',
  'C#m': 'C#3 G#3 C#4 E4',
  'C#m7(add9,11)': 'C#3 E3 B3 D#4 F#4',
  Dm9: 'D3 F3 A3 C4 E4',
  C7: 'C3 G3 Bb3 E4',
  Dbmaj7: 'Db3 F3 Ab3 C4',
  Cmaj9: 'C3 E3 G3 B3 D4'
};

const introDraft = ['Ab', 'Bb', 'Gm', 'Cm', 'Fm', 'Gm', 'Ab', 'Fm Bb7'];
const introRevised = ['Ab', 'Bb/Ab', 'Gm7', 'Cm7', 'Fm7', 'Db9', 'Dm9', 'Fm7 Bb7'];
const verse = ['Eb', 'Fm7', 'Gm7', 'Fm7 Ab/Bb', 'Eb', 'Fm7', 'Gm7', 'Bbm7 Eb7'];
const preChorus = ['Ab', 'G7', 'Cm', 'F7', 'Abm', 'Db7', 'Gb', 'Fm Bb'];
const refrainDraft = ['Ab Bb', 'Gm Cm', 'Fm G7', 'Cm', 'Ab Bb', 'Gm Cm', 'Fm Bb', 'Eb', 'Fm Bb', 'Eb', 'Fm', 'Bb'];
const refrainRevised = ['Ab Bb/Ab', 'Gm7 Cm7', 'Fm7 G7', 'Cm Bbm7 Eb7', 'Ab Bb/Ab', 'Gm7 Cm7', 'Fm7 Bb', 'Ebmaj7 C7', 'Fm7 Bb', 'Eb Cm7', 'Fm7', 'Bb'];
const interlude = ['Ab', 'Gm', 'Fm', 'Eb', 'Db', 'Cm', 'Fm Gm', 'Abm Bbm'];
const bridgeDraft = ['Ebm', 'Db', 'Ebm', 'Db', 'F#m', 'C#m', 'Fm', 'Bb7'];
const bridgeRevised = ['Ebm7', 'Bbm7', 'Ebm7', 'Bbm7', 'F#m7', 'C#m7(add9,11)', 'Fm7', 'Db9 Bb7'];
const outroDraft = ['Eb', 'Ab', 'Eb', 'Ab', 'Eb', 'Ab', 'Eb', 'Ab', 'Eb'];
const outroRevised = ['Ebmaj7', 'Ab/Eb', 'Ebmaj7', 'Ab/Eb', 'Ebmaj7', 'Ab/Eb', 'Ebmaj7', 'Dbmaj7', 'Cmaj9'];

const preChorusKeys = { 1: 'Eb', 5: 'Gb', 8: 'Eb' };
const bridgeKeys = { 1: 'Ebminor', 5: 'C#minor', 7: 'Eb' };

const verseMelody = [
  'r.8 G4.8 G4.8 F4.8 Eb4.8 F4.8 G4.4',
  'Ab4.8 Ab4.8 G4.8 F4.8 Ab4.8 F4.8 Eb4.4',
  'Bb4.8 G4.8 Bb4.8 C5.8 Bb4.4 r.4',
  silentBar,
  'r.8 G4.8 G4.8 F4.8 Eb4.8 F4.8 Bb4.4',
  'Ab4.8 Ab4.8 G4.8 F4.8 Ab4.8 C5.8 Eb5.4',
  'D5.8 Bb4.8 A4.8 G4.8 Bb4.4 r.4',
  'r.2 G4.8 Bb4.8 Db5.8 C5.8'
];
const verseLyrics = [
  ['这念头又回来', '绕过一盏昏黄灯', '怎么停不下', '', '路灯落在窗外', '影子走了又回来', '心里总是绕', '我想知道'],
  ['窗影又转回来', '还是没有新答案', '找不到出口', '', '夜深我还醒着', '钟声敲了整一轮', '谁会看见我', '我想知道']
];

const preChorusMelody = [
  'C5.4 Ab4.4 Eb4.4 Ab4.4',
  'B4.4 r.4 G4.8 F4.8 G4.8 B4.8',
  'C5.8 Bb4.8 G4.8 Eb4.8 G4.8 Bb4.8 C5.8 G4.8',
  'A4.2 r.4 C5.8 Eb5.8',
  'Eb5.4 Cb5.4 Ab4.4 Bb4.8 Cb5.8',
  'Db5.8 Cb5.8 Bb4.8 Cb5.8 Db5.8 Eb5.8 F5.8 Db5.8',
  'Bb4.4 Gb4.2 r.4',
  'Ab4.8 C5.8 Bb4.4 D5.2'
];
const preChorusLyrics = [
  ['路还很远', '能往哪儿走', '绕了几圈又回这里', '抬起头', '天还没全亮', '看见云缝漏下一点', '天光', '再向前走'],
  ['路还很远', '心里还在转', '碰到旧问题的边缘', '抬起头', '风慢慢吹来', '看见云缝漏下一点', '天光', '再向前走']
];

const refrainMelody = [
  'r.8 C5.8 C5.8 Eb5.8 D5.8 F5.8 Bb4.4',
  'D5.8 Bb4.8 G4.4 G4.8 Bb4.8 C5.4',
  'Ab4.8 Ab4.8 C5.8 Ab4.8 G4.8 B4.8 D5.4',
  'Eb5.4 C5.4 Db5.8 F5.8 Eb5.4',
  'r.8 C5.8 C5.8 Eb5.8 D5.8 F5.8 Bb4.4',
  'D5.8 Bb4.8 G4.4 G4.8 Bb4.8 C5.4',
  'C5.8 C5.8 Eb5.8 C5.8 Bb4.8 F4.8 D5.4',
  'Eb5.4 Bb4.8 G4.8 E4.4 G4.4',
  'Ab4.8 C5.8 Ab4.8 F4.8 G4.8 Bb4.8 D5.4',
  'Eb5.2 G4.4 r.4',
  'r.8 Ab4.8 C5.8 C5.8 Eb5.8 C5.8 Ab4.4',
  'F4.4 r.4 G4.8 F4.8 D4.4',
  'Eb4.1'
];
const refrainSecond = [
  ...refrainMelody.slice(0, 4),
  'r.8 C5.8 C5.8 Eb5.8 D5.8 F5.8 Bb4.8 Bb4.8',
  'D5.8 Bb4.8 G4.8 G4.8 G4.8 Bb4.8 C5.4',
  ...refrainMelody.slice(6)
];
const refrainLyrics = [
  '让窗外的风来', '吹开一扇窗吧', '那道阴影会变浅', '不必有答案',
  '让街灯亮起来', '照着我的脚步', '穿过那道旧栅栏', '让光落在手',
  '我把昨天轻放下', '就此', '向街角走过去', '今天就出', '发'
];
const refrainLyricsSecond = [
  ...refrainLyrics.slice(0, 4),
  '让这条街亮起来', '照着我慢慢走路',
  ...refrainLyrics.slice(6)
];

const bridgeMelody = [
  'r.8 Gb4.8 Gb4.8 Gb4.8 Ab4.8 Bb4.8 Db5.8 Gb4.8',
  'F4.8 Ab4.8 Db5.4 Ab4.4 F4.4',
  'r.8 Gb4.8 Gb4.8 Gb4.8 Ab4.8 Bb4.8 Db5.8 Bb4.8',
  'Ab4.2 F4.4 r.4',
  'A4.8 A4.8 A4.8 B4.8 C#5.8 B4.8 F#4.8 E4.8',
  'E4.8 G#4.8 F#4.4 E4.2',
  'F4.8 Ab4.8 Ab4.8 Bb4.8 C5.8 Bb4.8 Ab4.8 G4.8',
  'F4.1'
];
const bridgeLyrics = [
  '那一天我坐很久', '看着窗外黑', '我以为这场长夜', '无尽',
  '多少没说完的叹息', '落进空房', '我才发现仍有微弱', '光'
];

const introMotif = [
  'Eb5.8 r.8 C5.8 Eb5.8 r.4 G5.4', 'F5.8 r.8 D5.8 F5.8 r.4 Bb4.4',
  'D5.8 r.8 Bb4.8 D5.8 r.4 G5.4', 'Eb5.8 r.8 C5.8 Eb5.8 r.4 G5.4',
  'Ab4.8 r.8 C5.8 F5.8 r.4 Ab5.4', 'Ab4.8 r.8 Cb5.8 F5.8 r.4 Eb5.4',
  'A4.8 r.8 C5.8 F5.8 r.4 E5.4', 'Ab4.8 r.8 C5.8 F5.8 D5.4 Ab4.4'
];
const interludeMotif = [
  'r.4 Eb5.8 C5.8 Eb5.4 Ab4.4', 'r.4 D5.8 Bb4.8 D5.4 G4.4',
  'r.4 C5.8 Ab4.8 C5.4 F4.4', 'r.4 Bb4.8 G4.8 Bb4.4 Eb4.4',
  'r.4 Ab4.8 F4.8 Ab4.4 Db4.4', 'r.4 G4.8 Eb4.8 G4.4 C4.4',
  'F4.8 Ab4.8 C5.4 G4.8 Bb4.8 D5.4', 'Ab4.8 Cb5.8 Eb5.4 Bb4.8 Db5.8 F5.4'
];
const interludeVariation = [
  'r.2 Eb5.8 C5.8 Ab4.4', 'r.2 D5.8 Bb4.8 G4.4', 'r.2 C5.8 Ab4.8 F4.4', 'r.2 Bb4.8 G4.8 Eb4.4',
  ...interludeMotif.slice(4)
];
const stringAnswer = [
  'r.2 Eb5.2 { dy mp }', 'F5.2 G5.2', 'Ab5.2 B5.2', 'G5.2 { d } r.4',
  'r.2 Eb5.2', 'F5.2 G5.2', 'Ab5.2 F5.2', 'G5.2 E5.2',
  'F5.2 D5.2', 'Eb5.2 C5.2', 'C5.2 Ab4.2', 'D5.2 F5.2'
];

const keyBars = (bars, changeKeys = { 1: 'Eb' }) => bars.map((bar, index) => {
  const name = changeKeys[index + 1];
  return name ? `${key(name)} ${bar}` : bar;
});

function harmonyBars(progression) {
  return progression.map(bar => {
    const names = bar.split(' ');
    const durations = names.length === 3 ? [2, 4, 4] : names.length === 2 ? [2, 2] : [1];
    return names.map((name, index) => `(${chords[name]}).${durations[index]} { ch "${name}" dy mp }`).join(' ');
  });
}

function outroPedal() {
  return harmonyBars(outroRevised).map((bar, index) => (
    index > 0 && index < 7 ? bar.replace('Eb3', 'Eb3{t}') : bar
  ));
}

function melodyBars(melody, lyrics) {
  return lyrics ? melody.map((bar, index) => lyricBars(lyrics[index], [bar])) : melody;
}

const rests = count => Array(count).fill(silentBar);
const track = (name, program, bars, options = {}) => ({
  name, program, phrase: `${meter} ${bars.join(' | ')}`, ...options
});
const harmonyTrack = bars => track('和声', 4, bars.map((bar, index) => index ? bar : String.raw`\clef F4 ${bar}`));

function songFragment(melody, progression, { lyrics, keys, instrument = 0, harmony = harmonyBars(progression) } = {}) {
  return {
    scoreTracks: [
      ...(melody ? [track('旋律', instrument, keyBars(melodyBars(melody, lyrics), keys))] : []),
      harmonyTrack(keyBars(harmony, keys))
    ]
  };
}

const rhythmBar = 'Strike.4 r.8 Strike.8 Strike.4 r.8 Strike.8';
const rhythmBreak = 'Strike.4 r.8 Strike.8 Strike.8 Strike.8 Strike.4';
const rhythmIntro = [rhythmBar, rhythmBar, rhythmBar, rhythmBreak];
function drumTrack(bars, playbackOnly = false) {
  const setup = String.raw`\clef neutral \articulation (Strike 37) \articulation (Kick 36)`;
  return track('节奏', 'percussion', [`${setup} ${bars[0]}`, ...bars.slice(1)], { staffLines: 1, playbackOnly });
}

const draftEnding = { 1: 'Eb' };
const revisedEnding = { 1: 'Eb', 9: 'C' };
const mountSteps = (id, steps) => mountScoreWritingSteps(document.getElementById(id), {
  score: { tempo, soundFontUrl: bandSoundFont },
  steps
});
const step = (label, description, notes) => ({ label, description, notes });

mountSteps('pro-pop-themes', [
  step('A · 徘徊', '前四小节回到主和弦再次起步，最后一小节改用 B♭m7–E♭7，接向 B 段的 A♭。', songFragment(verseMelody, verse)),
  step('B · 转向', '在 c 小调出现后，A♭m–D♭7–G♭ 建立新的主音。末小节的 Fm–B♭ 预告 E♭ 调性，副歌稍后才落到 E♭。', songFragment(preChorusMelody, preChorus, { keys: preChorusKeys })),
  step('C · 展开', 'Cm 从 E♭ 大调的 vi 变为 c 小调的 i，随后 Fm–B♭–E♭ 把和声拉回大调。谱例多展示一小节，对应下一段入口上的副歌尾字。', songFragment(refrainMelody, [...refrainDraft, 'Ab'])),
  step('D · 低谷', '同一个主音 E♭ 转入小调。到第 5 小节，引出低一个全音的 c♯ 小调。最后两小节的 Fm–B♭7 为副歌回归蓄势。', songFragment(bridgeMelody, bridgeDraft, { keys: bridgeKeys }))
]);

mountSteps('pro-pop-lyric-fit', [
  step('C1、C3', '“来”和“的”各占一拍。句头仍从后半拍起，末字“步”落在长音上。', songFragment(refrainMelody.slice(4, 6), refrainDraft.slice(4, 6), { lyrics: refrainLyrics.slice(4, 6) })),
  step('C2', '把“起来”和“我慢”各放进两个相同音高的八分音符，容纳多出的字。音高轮廓、句长与句尾长音都保留。', songFragment(refrainSecond.slice(4, 6), refrainDraft.slice(4, 6), { lyrics: refrainLyricsSecond.slice(4, 6) }))
]);

mountSteps('pro-pop-connectors', [
  step('前奏Ⅰ · 节奏', '四小节只建立反复的起音型。最后一小节压紧后半部的起音，导向下一段。', { scoreTracks: [drumTrack(rhythmIntro)] }),
  step('前奏Ⅱ · 和声与旋律', '开头把副歌两个一小节的和声拉成四小节。后四小节上行，末尾的 Fm–B♭7 接向主歌的 E♭。', songFragment(introMotif, introDraft, { instrument: 12 })),
  step('间奏Ⅰ · 下行再上行', '开头的 A♭ 接住副歌的 E♭。前六小节低音逐级下行，最后两小节每两拍换一次和弦。', songFragment(interludeMotif, interlude, { instrument: 12 })),
  step('间奏Ⅱ · 变换音色', '和声顺序保留。吉他从每小节后半才起音，前半留出空间，准备只出现一次的 D 段。', songFragment(interludeVariation, interlude, { instrument: 24 })),
  step('尾奏 · 主下属交替', 'E♭ 与 A♭ 各占一小节，反复后以 E♭ 收束。', songFragment(null, outroDraft))
]);

const revisions = {
  'intro-draft': ['前奏的 A♭–B♭ 采用根音上行，后半在 Fm–Gm–A♭ 上逐步抬升。', songFragment(null, introDraft)],
  'intro-revised': ['第二小节保留 A♭ 低音。第六小节的 D♭9 暗示 c 小调，第七小节转出 C 大调的 Dm9 色彩，第八小节重新引向 E♭。', songFragment(null, introRevised)],
  'refrain-draft': ['第四小节的 Cm 保持整小节，第八和第十小节也各维持一个 E♭。', songFragment(refrainMelody, [...refrainDraft, 'Ab'])],
  'refrain-revised': ['旋律固定。第四小节后半插入 B♭m7–E♭7，引向 A♭。第八小节后半加入 C7，引向 Fm7。第十小节后半从 E♭ 换到 Cm7。', songFragment(refrainMelody, [...refrainRevised, 'Ab'])],
  'bridge-draft': ['第二、四小节以 D♭ 作根音，最后一小节只有 B♭7。', songFragment(bridgeMelody, bridgeDraft, { keys: bridgeKeys })],
  'bridge-revised': ['原来 D♭ 大三和弦的上方音不动，低音换作 B♭，得到 B♭m7。末小节的 F 同时适合 D♭9 和 B♭7。', songFragment(bridgeMelody, bridgeRevised, { keys: bridgeKeys })],
  'outro-draft': ['E♭ 与 A♭ 交替，各用自己的根音。第九小节回到 E♭。', songFragment(null, outroDraft, { keys: draftEnding })],
  'outro-revised': ['E♭ 低音持续七小节。大七和弦 E♭maj7–D♭maj7 平行下行，再到 Cmaj9，在 C 大调结束。', songFragment(null, outroRevised, { keys: revisedEnding, harmony: outroPedal() })]
};
const revisionDemo = document.getElementById('pro-pop-reharmony');
const revisionChoice = revisionDemo.querySelector('select');
const revisionCue = revisionDemo.querySelector('.music-demo-cue');
const revisionScore = mountScore(revisionDemo.querySelector('figure'), {
  notation: 'staff', tempo, soundFontUrl: bandSoundFont, notes: revisions[revisionChoice.value][1]
});
function showRevision() {
  const [description, notes] = revisions[revisionChoice.value];
  revisionCue.textContent = description;
  revisionScore.setNotes(notes);
}
revisionCue.textContent = revisions[revisionChoice.value][0];
revisionChoice.addEventListener('change', showRevision);

const blankLead = progression => rests(progression.length);
const lastWord = ['Eb4.1 { lyrics (0 "发") }', ...rests(7)];
const verseTail = ['r.2 G4.2 { dy mp }', 'Ab4.1', 'Bb4.2 D5.2', 'C5.2 Bb4.2', ...rests(4)];
const refrainTake = (melody, lyrics) => melodyBars(melody.slice(0, 12), lyrics.slice(0, 12));

const sections = [
  { id: 'intro-rhythm', label: '前奏Ⅰ', material: '节奏独奏四小节', lead: rests(4), harmony: rests(4) },
  { id: 'intro-melody', label: '前奏Ⅱ', material: '马林巴加入，和声先扩大副歌的换和弦间隔', lead: blankLead(introRevised), harmony: harmonyBars(introRevised), marimba: introMotif },
  { id: 'a1', label: 'A1', material: '短句与循环和声建立反复思量的状态', lead: melodyBars(verseMelody, verseLyrics[0]), harmony: harmonyBars(verse), strings: verseTail },
  { id: 'b1', label: 'B1', material: 'c 小调之后转到 G♭ 大调，变化后回到 E♭', lead: melodyBars(preChorusMelody, preChorusLyrics[0]), harmony: harmonyBars(preChorus), keys: preChorusKeys },
  { id: 'c1', label: 'C1', material: '副歌在大小调之间转换，弦乐在主旋律长音下延续', lead: refrainTake(refrainMelody, refrainLyrics), harmony: harmonyBars(refrainRevised), strings: stringAnswer },
  { id: 'break1', label: '间奏Ⅰ', material: '副歌末字延续到这一段。低音下行后转为两拍一个和弦', lead: lastWord, harmony: harmonyBars(interlude), marimba: interludeMotif },
  { id: 'a2', label: 'A2', material: '保留 A1 的旋律和和声，换用第二轮歌词', lead: melodyBars(verseMelody, verseLyrics[1]), harmony: harmonyBars(verse), strings: verseTail },
  { id: 'b2', label: 'B2', material: '保留 B1 的转调路线与句尾', lead: melodyBars(preChorusMelody, preChorusLyrics[1]), harmony: harmonyBars(preChorus), keys: preChorusKeys },
  { id: 'c2', label: 'C2', material: '第 5、6 小节拆分长音，容纳较长的两句词', lead: refrainTake(refrainSecond, refrainLyricsSecond), harmony: harmonyBars(refrainRevised), strings: stringAnswer },
  { id: 'break2', label: '间奏Ⅱ', material: '和声保留，改用拨弦音色并后移前几小节起音，随后进入 D 段', lead: lastWord, harmony: harmonyBars(interlude), guitar: interludeVariation },
  { id: 'd', label: 'D · 桥段', material: '只出现一次。转入同主音小调，再下行全音，随后引回副歌', lead: melodyBars(bridgeMelody, bridgeLyrics), harmony: harmonyBars(bridgeRevised), keys: bridgeKeys },
  { id: 'c3', label: 'C3', material: '第一次副歌的词曲回归', lead: refrainTake(refrainMelody, refrainLyrics), harmony: harmonyBars(refrainRevised), strings: stringAnswer },
  { id: 'ending', label: '尾奏', material: '副歌末字之后，低音延续并由平行大七和弦带到 C 大调', lead: [...lastWord, silentBar], harmony: outroPedal(), keys: revisedEnding }
];
const fullLead = sections.flatMap(({ lead, keys }) => keyBars(lead, keys));
const fullHarmony = sections.flatMap(({ harmony, keys }) => keyBars(harmony, keys));
const fillPart = name => sections.flatMap(section => keyBars(section[name] ?? rests(section.lead.length), section.keys));
let first = 1;
const form = sections.map(({ id, label, material, lead }, index) => {
  const last = first + lead.length - 1;
  const entry = { id, label, material, first, last };
  if (id.startsWith('c')) entry.playback = { first, last: last + 1 };
  first = last + 1;
  fullLead[entry.first - 1] = String.raw`\section ("${label}") ${fullLead[entry.first - 1]}`;
  return entry;
});
const regularBeat = 'Kick.4 Strike.4 Kick.4 Strike.4 { dy p }';
const fullRhythm = sections.flatMap(({ id, lead }) => {
  if (id === 'intro-rhythm') return rhythmIntro;
  if (id === 'ending') return rests(lead.length);
  return Array(lead.length).fill(id === 'd' ? 'Kick.2 { dy p } r.2' : regularBeat);
});
const fullScore = {
  scoreTracks: [
    track('主旋律', 0, fullLead),
    harmonyTrack(fullHarmony),
    track('弦乐副旋律', 48, fillPart('strings'), { playbackOnly: true }),
    track('马林巴', 12, fillPart('marimba'), { playbackOnly: true }),
    track('吉他', 24, fillPart('guitar'), { playbackOnly: true }),
    drumTrack(fullRhythm, true)
  ]
};
mountFormAnalysis(document.getElementById('pro-pop-complete'), {
  score: { tempo, notes: fullScore, soundFontUrl: bandSoundFont },
  sections: form
});
