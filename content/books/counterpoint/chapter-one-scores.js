const upperLine = 'E5.4 F5.4 G5.4 A5.4';
const lensMelody = 'G4.8 A4.8 B4.4 G4.2 | E4.2 D4.4 C4.4';
const sentence = [
  'E5.4 { txt "起句" } G5.4 E5.2',
  'G5.4 E5.4 C5.2 { txt "收句" }',
  'E5.4 { txt "再起" } G5.4 C5.2',
  'E5.4 D5.4 C5.2'
].join(' | ');
const answer = 'C4.4 { txt "起句" } G3.4 C4.2 | E4.4 C4.4 E4.2 { txt "收句" }';

function twoTreble(variants) {
  return Object.fromEntries(Object.entries(variants).map(([key, sample]) =>
    [key, { ...sample, clefs: ['G2', 'G2'] }]));
}

function writingExample(upper, lower, { lowerClef = 'G2', meter = '4 4', tempo, cue }) {
  const common = { meter, tempo };
  return {
    both: { ...common, voices: [upper, lower], clefs: ['G2', lowerClef], cue },
    given: { ...common, voices: [upper], clefs: ['G2'], cue: '指定旋律 · 上声部' },
    counter: { ...common, voices: [lower], clefs: [lowerClef], cue: '对位旋律 · 下声部' }
  };
}

const dance = [
  'E5.4 E5.4 G5.4 G5.4',
  'G5.8 F5.4 F5.8 G5.8 F5.4 F5.8',
  'D5.4 D5.4 F5.4 F5.4',
  'F5.8 E5.4 E5.8 F5.8 E5.4 E5.8',
  'C5.4 C5.4 E5.4 E5.4',
  'E5.8 D5.4 D5.8 E5.8 D5.4 D5.8',
  'G5.4 G4.4 A4.4 B4.4',
  'D5.8 C5.4 C5.8 D5.8 C5.8 C5.4'
].join(' | ');
const danceCounter = [
  'C5.2 B4.2', 'A4.1', 'B4.2 A4.2', 'G4.1',
  'A4.2 G4.2', 'F#4.1', 'F#4{t}.4 F4.4 E4.4 D4.4', 'G4.4 G3.4 C4.2'
].join(' | ');

const drumDance = [
  'G4.8 E4.8 G4.8 C5.16 D5.16 E5.8 G5.8',
  'E5.8 C5.16 E5.16 A4.8 G4.4 E4.8',
  'E5.8 D5.8 E5.8 C5.16 E5.16 A4.8 G4.8',
  'E4.8 G4.8 C5.16 E5.16 D5.4 { d }',
  'G5.16 E5.16 D5.8 E5.8 C5.16 E5.16 A4.8 G4.8',
  'E4.8 G4.8 C5.16 D5.16 E5.4 G5.8',
  'A5.8 G5.8 E5.8 C5.16 E5.16 A4.8 G4.8',
  'E4.8 E5.8 C5.16 A4.16 C5.4 { d }',
  '\\ac C5{t}.8 r.8 r.8'
].join(' | ');
const drumCounter = [
  'r.4 r.8 E4.4 { d }',
  'E4{t}.4 { d } E4{t}.8 E4.8 D4.8',
  'C4.4 { d } A3.4 { d }',
  'A3{t}.4 { d } A3{t}.8 G3.8 A3.8',
  'E3.4 G3.8 A3.4 C4.8',
  'C4.4 G4.8 E4.8 C4.8 Bb3.8',
  'A3.4 { d } A3{t}.4 { d }',
  'G3.4 { d } E3.8 G3.16 A3.16 G3.8',
  '\\ac C3.8 r.8 r.8'
].join(' | ');

export const chapterOneScores = {
  'interval-contrast': twoTreble({
    octaves: {
      voices: [upperLine, 'E4.4 F4.4 G4.4 A4.4'],
      cue: '下声部逐音低八度重复，四次同向起音听起来接近一条旋律加倍。'
    },
    thirds: {
      voices: [upperLine, 'C5.4 D5.4 E5.4 F5.4'],
      cue: '两部仍然同向上行，平行三度保留了两个音的厚度。'
    },
    contrary: {
      voices: [upperLine, 'C5.4 A4.4 B4.4 C5.4'],
      cue: '第一拍到第二拍，上声部上行、下声部下行，由三度张开为六度。'
    }
  }),
  'dissonance-contrast': twoTreble({
    passing: {
      voices: ['E5.4 { txt "E" } F5.4 { txt "F" } G5.2 { txt "G" }', 'C5.1 { txt "C" }'],
      dissonances: [{ bar: 0, beat: 1 }],
      cue: '第二拍的 F 和低音 C 构成四度。F 继续上行到 G，四度解决到五度。'
    },
    neighbor: {
      voices: ['E5.4 { txt "E" } F5.4 { txt "F" } E5.2 { txt "E" }', 'C5.1 { txt "C" }'],
      dissonances: [{ bar: 0, beat: 1 }],
      cue: '第二拍的 F 和低音 C 构成四度。上方折回 E 后，恢复原来的三度。'
    },
    escape: {
      voices: ['G5.4 { txt "G" } D5.4 { txt "D" } E5.2 { txt "E" }', 'C5.1 { txt "C" }'],
      dissonances: [{ bar: 0, beat: 1 }],
      cue: '谱例中先向下跳到 D，再向上级进到 E。也可以先级进再反向跳进，例如 E → F → C。'
    },
    appoggiatura: {
      voices: ['F5.4 { txt "F" } E5.2 { d txt "E" }', 'C5.1 { txt "C" }'],
      dissonances: [{ bar: 0, beat: 0 }],
      cue: '第一拍的 F 和低音 C 构成四度。F 下行到 E，四度解决到三度。'
    },
    suspension: {
      voices: ['D5.1 { txt "D" } | D5{t}.4 { txt "D" } C5.2 { d txt "C" }', 'G4.1 { txt "G" } | A4.1 { txt "A" }'],
      dissonances: [{ bar: 1, beat: 0 }],
      cue: '上方 D 和低音 G 构成五度。下一小节的强拍上，低音换成 A，持续的 D 和 A 构成四度。D 下行到 C，四度解决到三度。'
    }
  }),
  'rhythm-contrast': {
    together: {
      voices: [lensMelody, 'E3.8 C3.8 D3.4 E3.2 | C3.2 B2.4 C3.4'],
      cue: '第一小节的四个起音上下对齐，末尾一起停留两拍。'
    },
    alternating: {
      voices: [lensMelody, 'E3.2 C3.8 D3.8 E3.4 | C3.2 B2.4 C3.4'],
      cue: '前两拍由上声部活动，后两拍由下声部活动。第二小节与同步版相同。'
    },
    upperBusy: {
      voices: ['G4.8 A4.8 G4.4 E4.8 F4.8 E4.4', 'C3.1'],
      cue: '上方一拍内可以多次起音。下方的长 C 托住整小节。'
    },
    lowerBusy: {
      voices: ['G4.1', 'C3.8 D3.8 C3.4 E3.8 F3.8 E3.4'],
      cue: '上方保持长 G，下方用较密的音符维持运动。'
    }
  },
  'phrase-contrast': {
    aligned: {
      voices: [sentence, answer + ' | r.1 | r.1'],
      cue: '上、下两部都在第 1 小节起句，第 2 小节末一起收句。'
    },
    staggered: {
      voices: [sentence, 'r.1 | ' + answer + ' | r.1'],
      cue: '下声部晚一小节进入。上声部换句时下声部仍在进行，随后才收束。'
    }
  },
  'czech-writing': writingExample(dance, danceCounter, {
    tempo: 104,
    cue: '第 1–2 小节的下行长音成为对位旋律的核心。第 7–8 小节从属功能收回主音。'
  }),
  'copper-writing': writingExample(drumDance, drumCounter, {
    meter: '6 8',
    lowerClef: 'F4',
    tempo: 138,
    cue: '低声部在第 1 小节次强拍进入，第 3 小节收在 C，恰逢上声部以 E 开始下一句。'
  })
};
