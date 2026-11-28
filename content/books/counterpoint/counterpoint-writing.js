import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';
import { mountVoiceRelations } from '../../shared/formats/voice-relations.js';

const a = 'C5.8 D5.8 E5.4 E5.2';
const b = 'G5.2 G5.4 E5.4';
const c = 'B4.2 D5.4 C5.4';
const rough = 'Db5.2 G5.4 E5.4';
const lowerOctave = music => music.replace(/([A-G]b?)5(?=\.)/g, (_, pitch) => pitch + '4');

function canonScore(upper, lower) {
  return String.raw`\ts (4 4) ${upper.join(' | ')} ||
    \staff { score } \tuning (none) \clef G2 ${lower.join(' | ')}`;
}

function mark(staff, bar, count, kind) {
  return Array.from({ length: count }, (_, index) => ({ staff, bar, beat: index + 1, kind }));
}

const drafting = document.querySelector('#canon-drafting');
if (drafting) {
  mountScoreWritingSteps(drafting, {
    steps: [
      {
        label: '写 A、抄 A′',
        notes: canonScore([a, 'r.1', 'r.1'], ['r.1', lowerOctave(a), 'r.1']),
        highlights: [...mark(1, 1, 4), ...mark(2, 2, 4)],
        description: 'A 的低八度副本先占住下声部第 2 小节。它是接下来写 B 的依据。'
      },
      {
        label: '写 B、抄 B′',
        notes: canonScore([a, b, 'r.1'], ['r.1', lowerOctave(a), lowerOctave(b)]),
        highlights: [...mark(1, 2, 3), ...mark(2, 3, 3)],
        description: 'B 的 G 和 A′ 开头的 C 形成纯十二度。B 写好后，低八度的 B′ 接到第 3 小节。'
      },
      {
        label: '接 C',
        notes: canonScore([a, b, c], ['r.1', lowerOctave(a), lowerOctave(b)]),
        highlights: mark(1, 3, 3),
        description: '最后在 B′ 上方写 C。第 3 小节以 B 配低音 G，句尾以 C 配低音 E。'
      }
    ]
  });
  mountScoreWritingSteps(document.querySelector('#canon-overlap-revision'), {
    steps: [
      {
        label: '完整旋律',
        notes: canonScore([a, rough, c], ['r.1', 'r.1', 'r.1']),
        description: '先有上方完整的 A、B、C。B 从 D♭ 开始。'
      },
      {
        label: '错开叠合',
        notes: canonScore([a, rough, c], ['r.1', lowerOctave(a), lowerOctave(rough)]),
        highlights: [...mark(1, 2, 1, 'conflict'), ...mark(2, 2, 1, 'conflict'), ...mark(1, 3, 1, 'conflict'), ...mark(2, 3, 1, 'conflict')],
        description: '第 2 小节强拍的 C 和 D♭ 形成小九度。第 3 小节的 D♭ 是它的副本，此时与上方的 B 形成增六度。'
      },
      {
        label: '同步修正',
        notes: canonScore([a, b, c], ['r.1', lowerOctave(a), lowerOctave(b)]),
        highlights: [...mark(1, 2, 1), ...mark(2, 3, 1)],
        description: '把 B 的 D♭ 改为 G，强拍变成协和的纯十二度。B′ 的 D♭ 同时改为低八度的 G。'
      }
    ]
  });
}

const fifthCanon = document.querySelector('#fifth-canon-writing');
if (fifthCanon) {
  const opening = 'D5.2 D#5.2';
  const preview = 'A5.2 A#5.2';
  const tail = 'C5.1';
  const previousAnswer = 'E4.4 D4.8 E4.8 C4.4 E4.4';
  mountScoreWritingSteps(fifthCanon, {
    steps: [
      {
        label: '原题头与预写题头',
        notes: canonScore([opening, preview], ['r.1', previousAnswer]),
        highlights: mark(1, 2, 2),
        description: '左边是原题头。右边上方暂放辅助谱上的 A–A♯，下方是已经抄好的 e′。'
      },
      {
        label: '配出尾句',
        notes: String.raw`\ts (4 4) ${preview} ||
          \staff { score } \tuning (none) \clef G2 ${tail} ||
          \staff { score } \tuning (none) \clef G2 ${previousAnswer}`,
        highlights: mark(2, 1, 1),
        description: '第 6 小节的草稿。最上方是预写题头，中间是新写的 C，下方是正在响的 e′。'
      },
      {
        label: '抄回并反复',
        notes: canonScore([
          opening, String.raw`\ro E5.2 r.4 D5.4`, 'C5.4 B4.8 C5.8 A4.4 C#5.4', 'D5.2 r.4 C5.4',
          'B4.4 A4.8 B4.8 G4.4 B4.4', tail, String.raw`\rc 2 ${opening}`
        ], [
          'r.1', 'G4.2 G#4.2', 'A4.2 r.4 G4.4', 'F4.4 E4.8 F4.8 D4.4 F#4.4',
          'G4.2 r.4 F4.4', previousAnswer, 'F4.1'
        ]),
        highlights: [...mark(1, 7, 2), ...mark(2, 7, 1)],
        description: '末小节两条线是草稿上方两行的低五度副本。第 7 小节之后回到第 2 小节，从题头的下方应句继续。'
      }
    ]
  });
}

const canonicEntry = document.querySelector('#canonic-entry-map');
if (canonicEntry) {
  mountVoiceRelations(canonicEntry, {
    unitCount: 8,
    unitName: '拍',
    lanes: [
      { label: '上声部', events: [
        { id: 'first-head', label: 'G–A–B', start: 1, length: 2, detail: '第 1 小节第 1 拍，上声部唱出第一组题头' },
        { id: 'first-tail', label: '长音 D', start: 3, length: 2, detail: '第 1 小节后两拍，上声部保持 D，下声部在同一时刻开始 G–A–B' },
        { id: 'next-head', label: 'F–G–A', start: 5, length: 2, detail: '第 2 小节第 1 拍，题头的三个音各下移一级，节奏保持原样' },
        { id: 'next-tail', label: '长音 C', start: 7, length: 2, detail: '第 2 小节后两拍，上声部保持 C，下声部在同一时刻开始 F–G–A' }
      ] },
      { label: '下声部', events: [
        { id: 'rest', label: '休止', start: 1, length: 2, detail: '第 1 小节前两拍只有上声部发声' },
        { id: 'first-answer', label: 'G–A–B', start: 3, length: 2, detail: '第 1 小节第 3 拍，下声部接入第一组', accessibleLabel: '下声部第一组应句 G–A–B' },
        { id: 'tail-answer', label: '长音 D', start: 5, length: 2, detail: '第 2 小节前两拍，下声部延后唱出上一组的长音 D' },
        { id: 'next-answer', label: 'F–G–A', start: 7, length: 2, detail: '第 2 小节第 3 拍，下声部接入第二组', accessibleLabel: '下声部第二组应句 F–G–A' }
      ] }
    ],
    links: [
      { from: 'first-head', to: 'first-answer', label: '应句低八度，晚两拍' },
      { from: 'first-tail', to: 'tail-answer', label: '尾音也按同样的时差和音程模仿' },
      { from: 'next-head', to: 'next-answer', label: '第二组的应句仍低八度，晚两拍' }
    ]
  });
}

const sequence = document.querySelector('#canonic-seam-map');
if (sequence) {
  mountVoiceRelations(sequence, {
    unitCount: 3,
    unitName: '小节',
    lanes: [
      { label: '上声部', events: [
        { id: 'answer', label: '应句', start: 2, length: 1, detail: '第 2 小节上方仍是原题头的应句' },
        { id: 'copy', label: '尾句副本', start: 3, length: 1, detail: '第 3 小节上方的 A–E 是尾句的高八度副本' }
      ] },
      { label: '下声部', events: [
        { id: 'head', label: '原题头', start: 1, length: 1, detail: '原型由下方的 C 题头开始' },
        { id: 'tail', label: '原尾句', start: 2, length: 1, detail: '第 2 小节下方写 A–E，起拍的 A 与上方的 C 形成小十度' },
        { id: 'next', label: '新题头', start: 3, length: 1, detail: '第 3 小节下方改唱 D 题头。起拍的 D 与上方的 A 配成五度' }
      ] },
      { label: '辅助谱表', events: [
        { id: 'preview', label: '预写题头', start: 2, length: 1, guide: true, detail: '把下一组题头提前写到草稿的同一列，供写尾句时核对' }
      ] }
    ],
    links: [
      { from: 'tail', to: 'answer', label: '第一次结合发生在第 2 小节' },
      { from: 'tail', to: 'copy', label: '尾句晚一小节在上方重现' },
      { from: 'copy', to: 'next', label: '第二次结合发生在第 3 小节' },
      { from: 'preview', to: 'next', label: '虚线里的 D 题头到第 3 小节才实际发声' }
    ]
  });
}
