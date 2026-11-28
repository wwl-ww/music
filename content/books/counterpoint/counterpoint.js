import { model } from '@coderline/alphatab';
import { fourPartHarmony } from '../../shared/formats/four-part.js';
import { mountScore } from '../../shared/formats/score.js';
import { chapterOneScores } from './chapter-one-scores.js';
import { chaptersTwoToFourScores } from './chapters-two-to-four-scores.js';
import { renderCounterpointAxis } from './counterpoint-axis.js';
import { mountScoreDefinition } from './counterpoint-definitions.js';
import { mountScoreRelations } from './counterpoint-relations.js';
import { upperReviewScores } from './upper-review-scores.js';
import { addedSequenceScores, combinationScores, sequenceDraft } from './counterpoint-combinations.js';

const motif = 'G4.8 A4.8 B4.4';
const motifDown = 'G3.8 A3.8 B3.4';
const theme = `${motif} G4.2 | E4.2 D4.4 C4.4`;
const mirrorNotes = [['G4', 8], ['A4', 8], ['B4', 4], ['D5', 2]];
const reverseNotes = [...mirrorNotes].reverse();
const namedMeasure = notes => notes.map(([pitch, length]) => `${pitch}.${length} { txt "${pitch}" }`).join(' ');
const originalMeasure = namedMeasure(mirrorNotes);
const reversedMeasure = namedMeasure(reverseNotes);

const thirdsUpper = 'E4.4 F4.4 G4.4 E4.4 | F4.2 E4.2';
const thirdsLower = 'C4.4 D4.8 D4.8 E4.4 C4.4 | D4.4 D4.4 C4.2';
const thirdsUpperDown = 'E3.4 F3.4 G3.4 E3.4 | F3.2 E3.2';
const thirdsLowerUp = 'G4.4 A4.8 A4.8 B4.4 G4.4 | A4.4 A4.4 G4.2';

const voiceAuditions = {
  'double-counterpoint': [
    { label: '旋律 A · 原上声部', voices: [1] },
    { label: '旋律 B · 原下声部', voices: [2] }
  ],
  'double-imitation': [
    { label: 'A 与 A′', voices: [1, 3] },
    { label: 'B 与 B′', voices: [2, 4] }
  ]
};

const imitationUpper = `${motif} G4.2 | D4.4 D4.4 G4.2`;
const canonA = `${motif} G4.2`;
const canonB = 'E4.4 D4.4 E4.2';
const canonAnswerA = `${motifDown} G3.2`;
const canonAnswerB = 'E3.4 D3.4 E3.2';

// Voices are listed from the top staff to the bottom staff.
const scores = {
  ...chapterOneScores,
  ...chaptersTwoToFourScores,
  ...upperReviewScores,
  ...combinationScores,
  'melodic-roles': {
    derived: {
      cue: '上声部保持长音 G 时，低声部以缩短的时值再现题头 G–A–B。',
      voices: [theme, 'E3.2 G3.16 A3.16 B3.8 B3.4 | C3.4 E3.8 D3.8 B2.4 C3.4']
    },
    background: {
      cue: '下方连续使用八分音符和重复的分解和弦，主题的起伏仍在上方。',
      voices: [theme, 'E3.8 B3.8 G3.8 B3.8 E3.8 B3.8 G3.8 B3.8 | C3.8 G3.8 E3.8 G3.8 B2.8 G3.8 C3.8 E3.8']
    },
    complement: {
      cue: '下方从长音开始，随后向上展开自己的乐句。上方的起伏与下方的连续走向相互补充。',
      voices: [theme, 'E3.2 C3.4 E3.4 | G3.4 A3.4 B3.4 C4.4']
    },
    antagonistic: {
      cue: '上方以连贯的短句陈述主题，下方用间断的跳进拉开音区和重音的差别。',
      voices: [theme, 'E3.8 r.8 G2.8 r.8 C3.8 r.8 E3.8 r.8 | C3.8 r.8 E3.8 r.8 G2.8 r.8 C3.4']
    }
  },
  'double-counterpoint': {
    original: {
      cue: '四分和二分音符的旋律在上，较多起音的旋律在下。结构音程为三度。',
      voices: [thirdsUpper, thirdsLower],
      clefs: ['G2', 'G2']
    },
    octave: {
      cue: '原上声部下移八度，成为低声部。结构音程由三度变为六度。',
      voices: [thirdsLower, thirdsUpperDown],
      auditionOrder: [2, 1]
    },
    twelfth: {
      cue: '原上声部下移八度，原下声部上移五度。结构音程由三度变为十度。',
      voices: [thirdsLowerUp, thirdsUpperDown],
      auditionOrder: [2, 1]
    }
  },
  'melodic-transform': {
    joined: {
      cue: '第一小节为原形，第二小节为逆行。分界线两侧各有一个二分音符 D。',
      voices: [`${originalMeasure} | ${reversedMeasure}`]
    },
    original: {
      cue: 'G–A–B 是开篇的题头。这里接一个长音 D，便于分辨逆行时长音的位置。',
      voices: [originalMeasure]
    },
    inversion: {
      cue: '以 A 为轴，原形的上行变成下行，各个音的时值保留。',
      voices: [namedMeasure([['B4', 8], ['A4', 8], ['G4', 4], ['E4', 2]])]
    },
    pitchesOnly: {
      cue: '开头的 D 只响半拍，是八分音符。结尾的 G 响两拍。',
      voices: [namedMeasure(reverseNotes.map(([pitch], index) => [pitch, mirrorNotes[index][1]]))]
    },
    retrograde: {
      cue: '原来在末尾的二分音符 D 搬到了开头，仍然响两拍。',
      voices: [reversedMeasure]
    },
    invertedRetrograde: {
      cue: '末尾的 D5 先绕 A4 翻成 E4，再连同原来的两拍移到开头。',
      voices: [namedMeasure([['E4', 2], ['G4', 4], ['A4', 8], ['B4', 8]])]
    }
  },
  imitation: {
    direct: {
      cue: '下声部晚一小节进入并低八度复制起句。',
      voices: [imitationUpper, `r.1 | ${motifDown} r.2`]
    },
    augment: {
      cue: '应句的每个音变成原时值的两倍。',
      voices: [imitationUpper, 'r.1 | G3.4 A3.4 B3.2']
    },
    diminish: {
      cue: '应句的每个音减半，原来两拍的动机缩为一拍。',
      voices: [imitationUpper, 'r.1 | G3.16 A3.16 B3.8 r.4 r.2']
    },
    invert: {
      cue: '以下方的 A 为轴，上行 G–A–B 变成下行 B–A–G，时值保持原形。',
      voices: [imitationUpper, 'r.1 | B3.8 A3.8 G3.4 r.2']
    },
    invertedShort: {
      cue: '下方既把走向翻成 B–A–G，又把每个音的时值减半。第二小节开头的一拍唱完了整个应句。',
      voices: [imitationUpper, 'r.1 | B3.16 A3.16 G3.8 r.4 r.2']
    },
    split: {
      voices: [
        'G4.8 A4.8 B4.4 D4.2 | D4.8 E4.8 F4.4 G4.2 | E4.2 F4.2',
        'r.1 | G3.8 A3.8 B3.4 r.2 | F3.8 E3.8 D3.4 r.2'
      ],
      cue: '低声部先在低八度照唱 G–A–B；下一次把 D–E–F 倒影为 F–E–D。手法分在两个入口。'
    },
    reverse: {
      cue: '应句把起句的三个音和对应时值一起倒序。',
      voices: [imitationUpper, 'r.1 | B3.4 A3.8 G3.8 r.2']
    },
    rhythm: {
      cue: '起句 G–A–B 连续上行，应句 G–E–B 有下行也有上行。两次都用两个八分音符和一个四分音符。',
      voices: [imitationUpper, 'r.1 | G3.8 E3.8 B3.4 r.2']
    }
  },
  'canon-ending': {
    finite: {
      cue: '低声部比起句晚一小节。末小节结束严格模仿，两部同落在 C。',
      voices: [`${canonA} | ${canonB} | D4.2 C4.2`, `r.1 | ${canonAnswerA} | G3.2 C3.2`]
    },
    strict: {
      voices: ['C5.8 D5.8 E5.4 G5.2 | E5.2 G5.4 C5.4 | C5.1',
        'r.1 | C4.8 D4.8 E4.4 G4.2 | E4.2 G4.4 C4.4'],
      clefs: ['G2', 'G2'],
      cue: '下方最后一小节仍照唱上方前一小节。上方的 C 持续到结束，两部最后同落主音。'
    },
    loop: {
      cue: '第三小节高声部回到开头，低声部仍在重复上一小节的旋律。谱面示范两次交接。',
      voices: [
        `${canonA} | ${canonB} | ${canonA} | ${canonB} | ${canonA}`,
        `r.1 | ${canonAnswerA} | ${canonAnswerB} | ${canonAnswerA} | ${canonAnswerB}`
      ]
    }
  },
  sequence: {
    ...addedSequenceScores,
    'contrast-tonal': {
      cue: '两条线依次上移一个自然音级，仍在 C 大调的音集合内。',
      voices: [
        'E4.8 F4.8 G4.4 E4.2 | F4.8 G4.8 A4.4 F4.2 | G4.8 A4.8 B4.4 G4.2',
        'C4.4 E4.4 C4.2 | D4.4 F4.4 D4.2 | E4.4 G4.4 E4.2'
      ],
      clefs: ['G2', 'G2']
    },
    'canonic-tonal': {
      cue: '同一小节内，低声部的应句比起句晚两拍。进入下一小节时，题头下移一级，应句时差不变。',
      voices: [
        `${motif} D4.2 | F4.8 G4.8 A4.4 C4.2 | E4.8 F4.8 G4.4 B3.2 | G4.2 C4.2`,
        `r.2 ${motifDown} | D3.2 F3.8 G3.8 A3.4 | C3.2 E3.8 F3.8 G3.4 | B2.2 C3.2`
      ]
    },
    'contrast-modulating': {
      cue: '两部每组精确上移大二度，先后落在 C、D、E，前一拍的导音标明各组的调性重心。',
      voices: [
        'F4.8 E4.8 D4.4 B4.4 C5.4 | G4.8 F#4.8 E4.4 C#5.4 D5.4 | A4.8 G#4.8 F#4.4 D#5.4 E5.4',
        'G3.2 G3.4 C4.4 | A3.2 A3.4 D4.4 | B3.2 B3.4 E4.4'
      ]
    },
    'invertible-tonal': {
      cue: '第三小节两部继续上移一级，再交换高低位置。原来高声部的短音题头移到低声部。',
      voices: [
        'E4.8 F4.8 G4.4 E4.2 | F4.8 G4.8 A4.4 F4.2 | E5.4 G5.4 E5.2',
        'C4.4 E4.4 C4.2 | D4.4 F4.4 D4.2 | G3.8 A3.8 B3.4 G3.2'
      ]
    }
  },
  'three-part-rhythm': {
    sync: {
      cue: '第一拍的 E、G、C 同时起音。三个声部的四分音符都在同一拍开始，容易听成一组和弦。',
      voices: [
        'E5.4 { txt "E" } E5.4 A5.4 A5.4 | B5.4 B5.4 C6.4 C6.4',
        'G4.4 { txt "G" } G4.4 F4.4 F4.4 | D4.4 D4.4 E4.4 E4.4',
        'C3.4 C3.4 F3.4 F3.4 | G3.4 G3.4 C3.4 C3.4'
      ]
    },
    mixed: {
      cue: '上两声部使用同一种节奏，下方用二分音符维持和声。',
      voices: [
        'E5.8 { txt "E" } E5.8 E5.4 A5.8 A5.8 A5.4 | B5.8 B5.8 B5.4 C6.8 C6.8 C6.4',
        'G4.8 { txt "G" } G4.8 G4.4 F4.8 F4.8 F4.4 | D4.8 D4.8 D4.4 E4.8 E4.8 E4.4',
        'C3.2 F3.2 | G3.2 C3.2'
      ]
    },
    independent: {
      cue: '第一拍开始时高音 E 和低音 C 都在响，中声部的 G 晚半拍才进来。第 3 拍后高处短音变密，低音保持。',
      voices: [
        'E5.4 { txt "E" } E5.4 A5.8 A5.8 A5.4 | B5.8 B5.8 B5.4 C6.8 C6.8 C6.4',
        'r.8 G4.8 { txt "G" } G4.4 F4.2 | D4.2 r.8 E4.8 E4.4',
        'C3.2 F3.2 | G3.2 C3.2'
      ]
    }
  },
  'combined-texture': {
    original: {
      cue: '高声部先奏 G–A–B，中声部隔一小节在低八度应答。自由声部在低处。',
      voices: [
        'G5.8 A5.8 B5.4 G5.2 | D5.4 D5.4 G5.2',
        `r.1 | ${motif} G4.2`,
        'B2.2 C3.4 E3.4 | E3.2 C3.4 C3.4'
      ]
    },
    swap: {
      cue: '高、低声部交换位置，中声部的应句保持原位。',
      voices: [
        'B4.2 C5.4 E5.4 | E5.2 C5.4 C5.4',
        `r.1 | ${motif} G4.2`,
        `${motifDown} G3.2 | D3.4 D3.4 G3.2`
      ]
    },
    invert: {
      cue: '在换位基础上，模仿组以 A 为轴倒影。两次题头都由 G–A–B 变为 B–A–G。',
      voices: [
        'B4.2 C5.4 E5.4 | E5.2 C5.4 C5.4',
        'r.1 | B4.8 A4.8 G4.4 B4.2',
        'B3.8 A3.8 G3.4 B3.2 | E4.4 E4.4 B3.2'
      ]
    }
  }
};

function notation({ voices, clefs, meter = '4 4', key = 'C' }) {
  if (voices.length === 4) {
    return { type: fourPartHarmony, key, meter, voices: [...voices].reverse() };
  }

  return voices.map((voice, index) => {
    const clef = clefs?.[index] ?? (index > 0 && index === voices.length - 1 ? 'F4' : 'G2');
    const staff = index === 0 ? '' : String.raw`\staff { score } \tuning (none) `;
    return String.raw`${staff}\clef ${clef} \ks ${key} \ts (${meter}) ${voice}`;
  }).join(' ||\n');
}

function colorDissonance(score, { staff = 0, bar, beat }) {
  const note = score.tracks[0].staves[staff].bars[bar].voices[0].beats[beat].notes[0];
  note.style ??= new model.NoteStyle();
  note.style.colors.set(model.NoteSubElement.StandardNotationNoteHead, new model.Color(211, 50, 62));
}

const draft = document.querySelector('[data-sequence-draft]');
if (draft) mountScore(draft, { notes: notation(sequenceDraft), notation: 'staff', audio: false });

for (const demo of document.querySelectorAll('[data-counterpoint-score]')) {
  const variants = scores[demo.id];
  const toolbar = demo.querySelector('.music-demo-toolbar');
  const showDefinition = toolbar.querySelector('select, input') && mountScoreDefinition(toolbar, demo.id);
  const cue = demo.querySelector('.music-demo-cue');
  const figure = demo.querySelector('figure:not([data-counterpoint-axis])');
  const axis = demo.querySelector('[data-counterpoint-axis]');
  const voiceAudition = voiceAuditions[demo.id];
  const showRelations = mountScoreRelations(demo, variants);
  let playback;
  let sample;

  function update() {
    const choice = Array.from(toolbar.querySelectorAll('select, input:checked'), control => control.value).join('-') || 'original';
    sample = variants[choice];
    showDefinition?.(choice);
    showRelations(choice);
    cue.textContent = sample.cue;
    if (axis) renderCounterpointAxis(axis, sample.axis);
    const fullScore = notation(sample);
    const notes = voiceAudition ? {
      ...(typeof fullScore === 'string' ? { scoreNotation: fullScore, voices: sample.voices, key: sample.key, meter: sample.meter } : fullScore),
      auditionOrder: sample.auditionOrder
    } : fullScore;
    if (playback) playback.setNotes(notes);
    else playback = mountScore(figure, {
      notes,
      notation: 'staff',
      tempo: sample.tempo ?? 84,
      voiceAudition,
      onScoreLoaded(score) {
        sample.dissonances?.forEach(position => colorDissonance(score, position));
      }
    });
  }

  toolbar.addEventListener('change', update);
  update();
}
