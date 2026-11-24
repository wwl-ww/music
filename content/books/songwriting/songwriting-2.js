import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { lyricBars, mountSongVariants } from './songwriting-score.js';

const shortText = '河风轻过灯影摇动';
const riverText = '小河绕过旧石桥风把灯影送回家';

function song(words, bars, { key = 'C', meter = '4 4' } = {}) {
  return String.raw`\ks ${key} \ts (${meter}) ${lyricBars(words, bars)}`;
}

mountSongVariants('song-word-rhythm', {
  even: {
    tempo: 84,
    notes: song(shortText, ['G4.4 G4.4 G4.4 G4.4', 'G4.4 G4.4 G4.4 G4.4']),
    summary: '每字一拍。两个四字词组各占一小节，形成均衡的陈述。'
  },
  spaced: {
    tempo: 84,
    notes: song(shortText, ['G4.4 G4.2 G4.4', 'G4.2 r.2', 'G4.4 G4.4 G4.4 G4.4']),
    summary: '“风”和“过”各占两拍，两个词组间多出两拍停顿。前一组铺开，后一组仍按每字一拍收拢。'
  },
  compact: {
    tempo: 84,
    notes: song(shortText, ['G4.8 G4.8 G4.8 G4.8 G4.8 G4.8 G4.8 G4.8']),
    summary: '每字半拍，两个词组压进同一小节。第二组直接承接第一组。'
  },
  syncopated: {
    tempo: 84,
    notes: song(shortText, ['r.8 G4.4 G4.8 G4.8 G4.4 r.8', 'r.8 G4.4 G4.8 G4.8 G4.4 r.8']),
    summary: '“河”和“灯”都从第一拍后半起音，长音跨到第二拍。两个词组均采用这一词位，形成相同的弹性重音。'
  }
});

const crossingBar = 'G4.16/sing/first A4.16/held/first G4.8/sing/cross E4.4/held/cross';
const alignedBar = 'G4.16/sing/first A4.16/held G4.8/held/first E4.4';
const secondHalf = 'G4.4 C4.4';
mountSongVariants('song-word-sync', {
  plain: {
    tempo: 76,
    notes: song('灯影微摇', [`G4.4 E4.4 ${secondHalf}`]),
    summary: '“灯”和“影”各在正拍起音，每字一拍。'
  },
  decorated: {
    tempo: 76,
    notes: song('灯影微摇', [`${alignedBar} ${secondHalf}`]),
    summary: '第一拍的“灯”增加两个短音。“影”仍在第二拍起唱，词的起音位置保持原样。'
  },
  crossing: {
    tempo: 76,
    notes: song('灯影微摇', [`${crossingBar} ${secondHalf}`]),
    summary: '音符与上一版相同。“影”改在第一拍后半起唱，跨过第二拍，切分落在歌词的音节上。'
  }
});

function evenNotes(pitchGroups, denominator = 4) {
  return pitchGroups.map(group => group.split(' ').map(pitch => `${pitch}.${denominator}`).join(' '));
}

mountSongVariants('song-mode-choice', {
  major: {
    tempo: 84,
    notes: song(shortText, evenNotes(['C4 D4 E4 G4', 'F4 E4 D4 C4'])),
    summary: '以 C 为主音，E 保留大三度。结尾逐级回到 C。'
  },
  minor: {
    tempo: 84,
    notes: song(shortText, evenNotes(['C4 D4 Eb4 G4', 'F4 Eb4 D4 C4']), { key: 'Cminor' }),
    summary: '主音和词位保留。E 改成 E♭，主音上方的小三度改变了这一句的调式色彩。'
  },
  gong: {
    tempo: 84,
    notes: song(shortText, evenNotes(['C4 D4 E4 G4', 'A4 G4 D4 C4'])),
    summary: 'C 作宫音和主音，曲线用 C、D、E、G、A 五个正音组织。'
  },
  zhi: {
    tempo: 84,
    notes: song(shortText, evenNotes(['C4 D4 F4 G4', 'A4 G4 D4 C4'])),
    summary: 'C 是 F 宫音列的徵音，也是本句的主音。调式音列取 C、D、F、G、A。'
  },
  color: {
    tempo: 84,
    notes: song(shortText, evenNotes(['C4 D4 Eb4 G4', 'Ab4 E4 D4 C4'])),
    summary: 'C 仍是主音，E♭ 与 E 都在同一句出现，另有 A♭ 增加半音色彩。'
  }
});

const contourVariants = {
  level: ['G4 G4 G4 G4 G4 G4 G4 G4', '同一个音连续起音。轮廓平稳，重心主要来自拍位和歌词本身。'],
  step: ['C4 D4 E4 F4 G4 F4 E4 C4', '前半连续级进上行，到 G 后反向下行。小幅步进让上扬有连续感。'],
  leap: ['G4 C5 B4 A4 E5 D5 B4 C5', '前半从 G 跳到 C，后半从 A 跳到 E。两处大跳后都有反向级进。'],
  chord: ['C4 E4 G4 C5 G4 E4 C4 C4', '以 C 大三和弦音向上分解、然后回折。音高间隔较开，和弦色彩仍集中。'],
  wave: ['C4 E4 G4 C5 E5 D5 B4 C5', '从 C4 抬高到 E5 再回落。整句跨度为十度，属于大幅度波浪。'],
  echo: ['C4 D4 C4 E4 D4 F4 E4 D4', '小上扬接回折，重复的锯齿逐渐移高，然后回落。'],
  passing: ['E4 F4 F4 G4 G4 F4 F4 E4', '前拍后半出现的 F、G、F 各在下一拍重新起音。同音的先现让相邻两拍接得更柔和。']
};
mountSongVariants('song-melodic-contour', Object.fromEntries(Object.entries(contourVariants).map(([id, [pitches, summary]]) => [id, {
  tempo: 68,
  notes: song(shortText, evenNotes([pitches], 8)),
  summary
}])));

const squareOpening = ['G4.4 A4.4 G4.4 E4.4', 'D4.4 E4.4 G4.2'];
const squareClosing = ['E4.4 D4.4 C4.4 E4.4', 'G4.4 E4.4 C4.2'];
mountSongVariants('song-phrase-shape', {
  balanced: {
    tempo: 92,
    notes: song(riverText, [...squareOpening, ...squareClosing]),
    summary: '两句词分成两个两小节的乐句。第一句在 G 上暂歇，第二句回到 C。'
  },
  extended: {
    tempo: 92,
    notes: song(riverText, [...squareOpening, squareClosing[0], 'G4.4 E4.4 C4.2/sing/home', 'E4.4/held D4.4/held C4.2/held/home']),
    summary: '第一句仍为两小节。“家”字从第四小节拖到第五小节，收束被推迟，形成 2＋3 的非方正安排。'
  },
  combined: {
    tempo: 92,
    notes: song(riverText, ['G4.8 A4.8 G4.8 E4.8 D4.8 E4.8 G4.8 A4.8', 'A4.8 G4.8 E4.8 F4.8 D4.4 C4.4']),
    summary: '“桥”字一带而过，第二句的“风”紧接其后。两句词在同一次音乐收束内唱完。'
  }
});

const modelBars = ['E4.8 G4.8 A4.4 G4.4 E4.4', 'F4.4 D4.4 C4.2'];
const adaptedBars = ['G4.8 A4.8 G4.4 E4.4 G4.4', 'C5.4 G4.4 E4.2'];
const adaptedText = '山路渐暗星光初起';
mountScoreWritingSteps(document.getElementById('song-model-writing'), {
  score: { tempo: 82 },
  steps: [
    { label: '节奏范型', notes: song('远山落日斜照归途', modelBars), description: '范句前两字各半拍，随后三个字各占一拍，最后一个字在两拍长音上收住。' },
    { label: '新歌词词位', notes: song(adaptedText, modelBars), description: '暂用范句的起音位置安排新词。“山路”“渐暗”和“星光初起”能接成一句完整的描写。' },
    { label: '重写曲调', notes: song(adaptedText, adaptedBars), description: '保留前紧后松的时值布局。重写音高，让“光”处成为新的高点，最后落在 E 上，给下一句留下空间。' }
  ]
});
