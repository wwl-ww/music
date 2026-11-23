import { getTonic, naturalOffsets, spellNote } from '../../shared/formats/pitch.js';

const voicePair = ['G2', 'G2'];
const originalMotif = ['G','A','B'];
const lengths = [8,8,4];
const noteRun = pitches => pitches.map((note,index) => note + '.' + lengths[index]).join(' ');
const shiftedMotif = (tonic, octave, steps) => {
  const start = getTonic(tonic,octave);
  const degreePitch = start.tonicLetter + steps;
  const pitch = (octave + 1) * 12 + naturalOffsets[degreePitch % 7] + 12 * Math.floor(degreePitch / 7);
  return spellNote(start,steps,pitch);
};

const imitations = Object.fromEntries(['同度','二度','三度','四度','五度','六度','七度','八度'].map((name,steps) => {
  const head = originalMotif.map(note => shiftedMotif(note,4,steps)).map(({ name, octave }) => name + octave);
  const source = noteRun(['G4','A4','B4']);
  return [String(steps), {
    voices: [source + ' r.2', 'r.2 ' + noteRun(head)], clefs: voicePair,
    cue: '起句是 G4–A4–B4。上方音区的应句晚两拍，从 ' + head[0] + ' 进入，向上相隔' + name + '。两次节奏相同。'
  }];
}));

const rhythmGroup = 'E4.8 F4.8 G4.4 E4.2 | F4.8 G4.8 A4.4 F4.2 | G4.8 A4.8 B4.4 G4.2';
const chordSequence = '(C3 E3 G3).2 (C3 E3 G3).2 | (D3 F3 A3).2 (D3 F3 A3).2 | (E3 G3 B3).2 (E3 G3 B3).2';
const contrarySequence = 'C3.4 G3.4 C3.2 | D3.4 A3.4 D3.2 | E3.4 B3.4 E3.2';

const threeLines = [
  ['E','G','E','C'], ['C','E','G','E'], ['A','C','C','A']
];
const permutations = { abc:[0,1,2], acb:[0,2,1], bac:[1,0,2], bca:[1,2,0], cab:[2,0,1], cba:[2,1,0] };
const openingHarmony = ['第二转位', '第一转位', '原位'];
const inversions = Object.fromEntries(Object.entries(permutations).map(([id,order]) => [id,{
  voices: order.map((line,position) => threeLines[line].map((note,index) =>
    note + (5-position) + '.4' + (index === 0 ? ' { txt "' + 'ABC'[line] + ' · ' + note + '" }' : '')
  ).join(' ')),
  clefs: ['G2','G2','F4'],
  cue: '第一拍仍是 A、C、E 组成的 A 小三和弦。最低音是 ' + threeLines[order[2]][0] + '，所以是' + openingHarmony[order[2]] + '。'
}]));

const triadTheme = ['C5.8 D5.8 E5.4 G5.2','C4.8 D4.8 E4.4 G4.2','C3.8 D3.8 E3.4 G3.2'];
const entryLabel = (music, name) => music.replace('.8 ', `.8 { txt "${name}" } `);
const threeEntries = [
  `${entryLabel(triadTheme[0], '起句')} | E5.2 G5.2 | E5.2 B5.2`,
  `r.1 | ${entryLabel(triadTheme[1], '第一应句')} | E4.2 G4.2`,
  `r.1 | r.1 | ${entryLabel(triadTheme[2], '第二应句')}`
];
const moveOctaves = (music, distance) =>
  music.replace(/([A-G])(\d)/g, (_, pitch, octave) => pitch + (Number(octave) + distance));
const tail = ['E5.2 F5.4 E5.4','E4.2 F4.4 E4.4'];

function overC(upper, middle, beat, cue, upperOnly = false) {
  const dissonances = [{ bar: 0, beat }];
  if (!upperOnly) dissonances.push({ staff: 1, bar: 0, beat });
  return { voices: [upper, middle, 'C3.1 { txt "C" }'], dissonances, cue };
}

export const upperReviewScores = {
  'imitation-distances': imitations,
  'sequence-textures': {
    melodic: { voices:[rhythmGroup], cue:'只有上方旋律移位。' },
    harmonic: { voices:[rhythmGroup,chordSequence], cue:'上方旋律和下方和弦按同样步伐一起上移。' },
    polyphonic: { voices:[rhythmGroup,contrarySequence], cue:'下方有自己的音序和节奏，两条旋律作为一组共同移位。' }
  },
  'polyphonic-nonchord': {
    single: overC('G5.4 F5.4 { txt "F" } E5.2', 'E4.2 C4.2', 1,
      '第二拍只有上方的 F 离开 C 大三和弦。中、低声部仍在 E、C 上。', true),
    passing: overC('G5.4 F5.4 { txt "F" } E5.2', 'E4.4 D4.4 { txt "D" } C4.2', 1,
      '第二拍同时出现 F、D。上方从 G 经 F 到 E，中间从 E 经 D 到 C，两部都沿同一方向继续走。'),
    neighbor: overC('G5.4 A5.4 { txt "A" } G5.2', 'E4.4 D4.4 { txt "D" } E4.2', 1,
      'A 与 D 分别离开 G 和 E，下一拍两条线都回到自己的原音，重新奏出完整的 C 大三和弦。'),
    appoggiatura: overC('F5.4 { txt "F" } E5.2 { d }', 'D4.4 { txt "D" } C4.2 { d }', 0,
      'F 与 D 在第一拍同时新奏。上方 F 下行到 E，中间 D 下行到 C。'),
    escape: overC('G5.4 D5.4 { txt "D" } E5.2', 'E4.4 F4.4 { txt "F" } C4.2', 1,
      '上方先跳到 D 再向上走一步，中间先走一步到 F 再向下跳。两部都换了方向。'),
    suspension: {
      voices: [
        'D5.1 { txt "D" } | D5{t}.4 { txt "D" } C5.2 { d }',
        'F4.1 { txt "F" } | F4{t}.4 { txt "F" } E4.2 { d }',
        'Bb2.1 { txt "B♭" } | C3.1 { txt "C" }'
      ],
      dissonances: [{ bar: 1, beat: 0 }, { staff: 1, bar: 1, beat: 0 }],
      cue: '第一小节的 B♭、D、F 构成大三和弦。低音换成 C 后，D 和 F 才变红。它们接着分别下行到 C 和 E。'
    }
  },
  'three-voice-permutation': inversions,
  'multi-entry-distances': {
    same: {
      voices: ['r.1 | r.1 | '+triadTheme[0], 'r.1 | '+triadTheme[1]+' | '+tail[1],
        triadTheme[2]+' | E3.2 F3.4 E3.4 | C3.1'],
      cue: '先后从 C3、C4、C5 开始，相邻入口都差八度，也都晚一小节。'
    },
    mixed: {
      voices: ['r.1 | r.1 | E5.8 F5.8 G5.4 B5.2', 'r.1 | G4.8 A4.8 B4.4 D5.2 | '+tail[1],
        triadTheme[2]+' | E3.2 F3.4 E3.4 | C3.1'],
      cue: '先后从 C3、G4、E5 开始。C3 到 G4 是十二度，G4 到 E5 是六度。两段时间仍都相隔一小节。'
    }
  },
  'triple-imitation-order': {
    original: {
      voices: threeEntries,
      cue: '起句在高声部，中声部晚一小节开始第一应句，低声部再晚一小节唱第二应句。'
    },
    reordered: {
      voices: [moveOctaves(threeEntries[2], 2), threeEntries[1], moveOctaves(threeEntries[0], -2)],
      cue: '第一小节现在由低声部起句，第三小节的第二应句出现在高处。中声部仍在第二小节进入。'
    }
  },
  'multi-entry-transformations': {
    like: {
      voices: ['r.1 | G5.16 A5.16 B5.8 r.4 r.2', 'r.1 | G4.16 A4.16 B4.8 r.4 r.2',
        'G3.8 A3.8 B3.4 G3.2 | E3.1'],
      cue: '两条应句都压缩为一拍，保留原来的上行轮廓。'
    },
    different: {
      voices: ['r.1 | B4.8 A4.8 G4.4 r.2', 'r.1 | G4.4 A4.4 B4.2',
        'G3.8 A3.8 B3.4 G3.2 | E3.1'],
      cue: '高声部的应句作倒影，中声部扩大音值。用同一个题头的两种变化重叠。'
    }
  },
  'imitation-free-exchange': {
    initial: {
      voices: ['E5.2 C5.4 E5.4 | G5.2 E5.2',triadTheme[1]+' | E4.2 G4.2','r.1 | '+triadTheme[2]],
      cue: '中、低声部先后以八度唱同一题头。上方用独立的长音句作对比。'
    },
    swapped: {
      voices: [triadTheme[0]+' | E5.2 G5.2',
        'r.1 | '+triadTheme[1],'E3.2 C3.4 E3.4 | G3.2 E3.2'],
      cue: '自由旋律整条移到低处，两条模仿声部依次上移，题头仍相隔一小节。'
    }
  }
};
