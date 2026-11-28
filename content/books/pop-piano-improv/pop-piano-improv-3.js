import { renderHarmonyPattern, renderRhythmPattern } from '../../shared/formats/accompaniment-patterns.js';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { pianoMarkup } from '../../shared/formats/piano.js';
import { mountPianoStudy, pianoHands } from './piano-lesson-score.js';

function study(lesson, right, variants, tempo = 84) {
  mountPianoStudy(`lesson-${lesson}-demo`, variants.map(([label, description, left, melody = right]) => ({
    label,
    description,
    notes: pianoHands(melody, left)
  })), tempo);
}

function orderedNotes(slots, positions, durations) {
  return [...positions].map((position, index) => {
    return slots[Number(position) - 1] + '.' + durations[index];
  }).join(' ');
}

const eighths = position => [...position].map(() => 8);
const threeNoteRhythm = [8, 8, 4, 8, 8, 4];
const cSlots = ['C3', 'E3', 'G3', 'C4', 'E4'];
const cOverESlots = ['E3', 'G3', 'C4', 'E4', 'G4'];
const dmSlots = ['D3', 'F3', 'A3', 'D4', 'F4'];
const am7Slots = ['A2', 'C3', 'E3', 'G3', 'A3', 'C4'];

const lesson6Melody = 'E5.2 { ch "C" } G5.4 E5.4 | F5.2 { ch "Dm" } A5.4 D5.4';
const brokenTypes = [
  ['1353', 'C 小节左手为 C3、G3、E4、G3，后半在 E4 和 G3 之间继续往返。', '13535353', eighths('13535353')],
  ['135', '同一低音和取音位置。前两个八分音符之后，以四分音符保持位置 5，再重复一次。', '135135', threeNoteRhythm],
  ['134', '位置 5 换成位置 4，C 小节用 C3、G3、C4。第一小节的 E 由右手给出。', '134134', threeNoteRhythm],
  ['1343', '在 134 的末音后回到位置 3。每个两拍音型有四个等长的八分音符。', '13431343', eighths('13431343')]
];
const brokenOptions = brokenTypes.map(([label, summary, positions, rhythm]) => [
  label, summary, [cSlots, dmSlots].map(slots => orderedNotes(slots, positions, rhythm)).join(' | ')
]);
study(6, lesson6Melody, [
  ...brokenOptions,
  ['两拍一换', '旋律保持原样。第一小节在第 3 拍转为 C/E，左手由 C3 改从 E3 起算，分别使用 134 与 1343。', [
    orderedNotes(cSlots, '134', [8, 8, 4]) + ' ' + orderedNotes(cOverESlots, '1343', eighths('1343')),
    orderedNotes(dmSlots, '13535353', eighths('13535353'))
  ].join(' | '), 'E5.2 { ch "C" } G5.4 { ch "C/E" } E5.4 | F5.2 { ch "Dm" } A5.4 D5.4']
]);

mountArrangementGrid(document.querySelector('[data-position-grid]'), {
  beats: 2,
  beatsPerBar: 2,
  subdivisions: 2,
  label: '四种分解音型的两拍骨架',
  rows: brokenTypes.map(([label, , positions, rhythm]) => {
    let step = 0;
    return {
      label,
      events: [...positions.slice(0, label.length)].map((position, index) => {
        const duration = 8 / rhythm[index];
        const event = { step, text: position, label: `音位 ${position}，C 和弦示例是 ${cSlots[Number(position) - 1]}` };
        if (duration > 1) event.length = duration;
        step += duration;
        return event;
      })
    };
  })
});

const doubleWaveC = orderedNotes(cSlots, '13435343', eighths('13435343'));
study(7, 'G5.4 { ch "C" } E5.4 D5.4 C5.4 | A4.2 { ch "Am7" } C5.4 E5.4', [
  ['1343 5343', 'C 与 Am7 各自在第 3 拍由位置 5 进入第二个波形。Am7 第三拍从 A3 起。', `${doubleWaveC} | ${orderedNotes(am7Slots, '13435343', eighths('13435343'))}`],
  ['1343 6343', 'C 不变。Am7 进入第 3 拍时把 A3 换成位置 6 的 C4，其余音和节奏保持相同。', `${doubleWaveC} | ${orderedNotes(am7Slots, '13436343', eighths('13436343'))}`],
  ['句尾 1343 53', 'Am7 前两拍如旧，后两拍收成 A3、E3 各一个四分音符，少两次起音。', `${doubleWaveC} | ${orderedNotes(am7Slots, '134353', [8, 8, 8, 8, 4, 4])}`]
], 88);

const add9Top = 'G5.2 G5.4 C6.4 | D5.2 G5.2';
const nextG = 'G2.8 D3.8 B3.4 G3.8 D3.8 B3.4';
const add9Wave = ['C3', 'G3', 'E4', 'D4'];

function compactAdd9(duration) {
  const end = add9Wave[add9Wave.length - 1];
  const shortNotes = add9Wave.map(note => `${note}.${duration}`).join(' ');
  return `${shortNotes} ${end}{t}.2${duration === 16 ? ' { d }' : ''} | ${nextG}`;
}

study(8, add9Top, [
  ['C 三和弦', '左手在 C、G 之外弹出三音 E，确定大小调色彩。', `C3.8 G3.8 E4.4 C4.8 G3.8 E4.4 | ${nextG}`],
  ['Cadd9 八分音符', '三音 E4 和九音 D4 先后出现，四次起音分布在前两拍。D4 留到小节末。', compactAdd9(8)],
  ['Cadd9 十六分音符', '第一小节左手音高不变，四次起音都放在第一拍。D4 提前出现并留到小节末。', compactAdd9(16)],
  ['Csus4', '低音 C 和五音 G 不变。F4 接替 E4，三音让位给四音。', `C3.8 G3.8 F4.4 C4.8 G3.8 F4.4 | ${nextG}`],
  ['Csus2', 'D4 接替 E4。和 Cadd9 相比，整个第一小节没有 E。', `C3.8 G3.8 D4.4 C4.8 G3.8 D4.4 | ${nextG}`],
  ['Gsus4–G', '只改第二小节。左手从 G2、D3 起，在 C4 停留，再落到 B3，后半不重新弹低音。', 'C3.8 G3.8 E4.4 C4.8 G3.8 E4.4 | G2.8 D3.8 C4.4 B3.2']
], 78);

const compressedRhythm = [['八分', 0.5], ['十六分', 0.25]].map(([label, pulse]) => ({
    label,
    events: add9Wave.map((_, index) => ({
      start: index * pulse / 4,
      end: index === add9Wave.length - 1 ? 1 : (index + 1) * pulse / 4,
      type: 'attack'
    }))
}));
renderRhythmPattern(document.querySelector('[data-compressed-rhythm]'), {
  beats: 4,
  measures: [compressedRhythm]
});

study(9, 'G5.2 { ch "C" } E5.4 C5.4 | F5.2 { ch "F/A" } A5.4 C6.4', [
  ['低音—柱式', '左手第一拍弹 C3 或 A2，后三拍把和弦音成组落下。', 'C3.4 (E3 G3 C4).4 (E3 G3 C4).4 (E3 G3 C4).4 | A2.4 (C3 F3 A3).4 (C3 F3 A3).4 (C3 F3 A3).4'],
  ['交替低音—柱式', 'C 小节的两个低音为 C3、G2。F/A 从 A2 起，第二个单音用上方 C3。两次中音和弦都在后半拍。', 'C3.8 (E3 G3 C4).8 G2.8 (E3 G3 C4).8 C3.8 (E3 G3 C4).8 G2.8 (E3 G3 C4).8 | A2.8 (C3 F3 A3).8 C3.8 (C3 F3 A3).8 A2.8 (C3 F3 A3).8 C3.8 (C3 F3 A3).8'],
  ['纯柱式', '左手只弹中音区的二分音符和弦。F/A 仍保持 A3 在和弦音的最下方。', '(C3 E3 G3).2 (C3 E3 G3).2 | (A3 C4 F4).2 (A3 C4 F4).2']
]);

const attackRoles = { 低: '指定低音', 另: '另一和弦音', 柱: '同时按下和弦' };
mountArrangementGrid(document.querySelector('[data-block-attack-grid]'), {
  beats: 4,
  subdivisions: 2,
  label: '低音与柱式和弦的拍位',
  rows: [
    ['低音柱式', [[0, '低'], [2, '柱'], [4, '柱'], [6, '柱']]],
    ['交替低音', [[0, '低'], [1, '柱'], [2, '另'], [3, '柱'], [4, '低'], [5, '柱'], [6, '另'], [7, '柱']]],
    ['纯柱式', [[0, '柱'], [4, '柱']]]
  ].map(([label, attacks]) => ({
    label,
    events: attacks.map(([step, text]) => ({ step, text, label: attackRoles[text] }))
  }))
});

const clearDm7 = 'D3.8 A3.8 C4.8 F4.8 (A3 C4).2';
study(10, 'E5.4 { ch "Am7" } C5.8 B4.8 A4.2 | F5.2 { ch "Dm7" } E5.4 D5.4', [
  ['拉开音区', 'A2 给出低音，左手其余音逐步上行，到 C4 与 E4 时右手仍在其上。', `A2.8 C3.8 E3.8 G3.8 (C4 E4).2 | ${clearDm7}`],
  ['和弦压低', '第一小节的低音和和声一起沉到低区。节奏不变，左手的低频更集中。', `A1.8 C2.8 E2.8 G2.8 (C2 E2 G2).2 | ${clearDm7}`],
  ['同键冲突（示意）', '第一小节第 3 拍双手都写到 A4。钢琴上同一个键只有一次起音，这个写法会夺走一只手的空间。', `A2.8 E3.8 A3.8 C4.8 A4.2 | ${clearDm7}`],
  ['让出旋律', '右手第 3 拍已在 A4，左手留在 C4、E4，把 A4 交给旋律。第二小节同样留出右手的活动位置。', 'A2.8 E3.8 A3.8 C4.8 (C4 E4).2 | D3.8 F3.8 A3.8 C4.8 (F3 C4).2'],
  ['改变节奏', '低音和和弦音类别保持不变。左手改用四分低音、两个八分音符与一个二分音符，第二小节的 F4 下移至 F3。', 'A2.4 C3.8 G3.8 (C4 E4).2 | D3.4 A3.8 C4.8 (F3 A3).2']
]);

const chordMelody = 'E5.2 G5.2 | A5.4 G5.4 E5.2 | D5.2 G5.2 | E5.2 C5.2';
const tonic = 'C3.2 (E3 G3 C4).2';
const minor = 'A2.2 (C3 E3 A3).2';
const dominant = 'G2.2 (B2 D3 G3).2';
study(11, chordMelody, [
  ['三和弦骨架', 'C、Am、G、C 只用基本三和弦，低音与旋律后面保持不变。', `${tonic} | ${minor} | ${dominant} | ${tonic}`],
  ['加九', 'C 的第 3 拍出现 D4，Am 的第 3 拍出现 B3，两个音提供加九色彩。', `C3.2 (E3 G3 D4).2 | A2.2 (C3 E3 B3).2 | ${dominant} | ${tonic}`],
  ['七和弦与九和弦', 'Am 改成 Am7，G 改成 G9。左手在 G 的后半给出七音 F3 与九音 A3，末尾仍落回 C。', `${tonic} | A2.2 (C3 E3 G3).2 | (G2 D3).2 (B2 F3 A3).2 | ${tonic}`],
  ['挂四再解决', '第三小节的低音 G2 保持原位，内声 C3 在后半落到 B2。之后低音移到 C3，回到主和弦。', `${tonic} | ${minor} | (G2 C3 F3).2 (G2 B2 F3).2 | ${tonic}`]
], 78);

renderHarmonyPattern(document.querySelector('[data-suspension-route]'), [
  [
    { span: 2, degree: 'V7sus4', chord: 'G7sus4', bass: 'G2', beat: 1 },
    { span: 2, degree: 'V7', chord: 'G7', bass: 'G2', beat: 3 }
  ],
  [{ span: 4, degree: 'I', chord: 'C', bass: 'C3', beat: 1 }]
]);

const doubleMelody = 'E5.4 D5.8 C5.8 G5.4 E5.4 | A5.4 G5.4 F5.4 E5.4';
const doubleBass = 'C3.4 { dy mp } G3.4 E3.4 G3.4 | F3.4 C4.4 A3.4 C4.4';
study(12, doubleMelody, [
  ['单旋律', '右手只弹主线，左手给出 C、F 低音与和弦音。', doubleBass],
  ['下八度', '所有旋律下方都有同音名的低八度，整体音域加宽。', doubleBass, '(E4 E5).4 (D4 D5).8 (C4 C5).8 (G4 G5).4 (E4 E5).4 | (A4 A5).4 (G4 G5).4 (F4 F5).4 (E4 E5).4'],
  ['重拍补和弦音', '句首 E5 下补 G4，G5 下补 C5，第二小节的 A5 下补 C5、F5 下补 A4。过渡音保持单音。', doubleBass, '(G4 E5).4 D5.8 C5.8 (C5 G5).4 E5.4 | (C5 A5).4 G5.4 (A4 F5).4 E5.4'],
  ['连续六度', '句首 E5、D5、C5 下方出现 G4、F4、E4 三个音，形成连续六度，其余仍是单旋律。', doubleBass, '(G4 E5).4 (F4 D5).8 (E4 C5).8 G5.4 E5.4 | A5.4 G5.4 F5.4 E5.4']
]);

for (const keyboard of document.querySelectorAll('[data-lower-key]')) {
  keyboard.innerHTML = pianoMarkup(9, Number(keyboard.dataset.lowerKey), 1);
}

const multiMelody = '(G4 C5 E5).4 D5.4 C5.2 | A5.4 G5.4 (A4 C5 E5).2';
const multiBass = 'C3.2 { dy mp } G3.2 | A2.2 E3.2';
study(13, multiMelody, [
  ['和弦重音', '右手只在句首 E5 与句尾 E5 下面补两个和弦音，其他时刻保留原来的轻重。', multiBass],
  ['连续多音', '第一小节每个旋律音下都出现低八度与内声六度。第二小节仍由单音走入末拍。', multiBass, '(E4 G4 E5).4 (D4 F4 D5).4 (C4 E4 C5).2 | A5.4 G5.4 (A4 C5 E5).2'],
  ['短琶音', '使用与和弦重音相同的三个音，但在两处落点由低向高依次起音。', multiBass, '(G4 C5 E5).4 { au 40 } D5.4 C5.2 | A5.4 G5.4 (A4 C5 E5).2 { au 40 }']
], 76);

const cadenceLead = 'D5.2 { ch "G7" } B4.2';
const cadenceBass = 'G2.2 (B2 D3 F3).2';
study(14, `${cadenceLead} | (E4 G4 C5).1 { ch "C" tempo 70 "放缓" dy p }`, [
  ['柱式结尾', '终止和弦中左手 C2 和右手 E4、G4、C5 在同一拍落下，随后留下余响。', `${cadenceBass} | C2.1 { dy p }`],
  ['短琶音结尾', '左手仍在小节开始给 C2，右手把同一组和弦音从 E4 快速滚到 C5。', `${cadenceBass} | C2.1 { dy p }`, `${cadenceLead} | (E4 G4 C5).1 { ch "C" tempo 70 "放缓" dy p au 40 }`],
  ['长琶音结尾', '最后一小节由左手低音和分解让出起音，右手在第 3 拍接到九音 D5，再向 E5、G5 展开。', `${cadenceBass} | C2.8 { dy p } G2.8 C3.8 E3.8 G3.2`, `${cadenceLead} | r.2 { ch "Cadd9" tempo 70 "放缓" } D5.8 { dy p } E5.8 G5.4`],
  ['重述尾句', '完整终止后，再把 D5、B4、C5 原样唱一遍。第二遍用更疏的左手，最后不加厚右手。', `${cadenceBass} | C2.1 | G2.1 { dy p } | C3.1`, `${cadenceLead} | C5.1 | D5.2 { tempo 70 "放缓" dy p } B4.2 | C5.1`],
  ['动机尾奏', '原尾句结束后，右手从 E5 上方重新发起，把原来的 D5、B4 压成较短的动机，转回 C5。', `${cadenceBass} | C2.1 | G2.2 { dy p } (B2 D3 F3).2 | C3.1`, `${cadenceLead} | C5.1 | E5.8 { tempo 70 "放缓" dy p } D5.8 B4.4 D5.4 B4.4 | C5.1`],
  ['有力收尾', '终止不放慢。左手叠 C 的八度，右手同时在强拍给出主和弦，停住后留下余响。', `${cadenceBass} | (C2 C3).1 { dy f }`, `${cadenceLead} | (E4 G4 C5).1 { ch "C" dy f }`]
], 86);

const fillBass = 'C3.2 G3.2 | G2.2 (B2 D3).2';
const fillLead = 'E5.4 { ch "C" } G5.4 C5.4';
const nextLine = 'B4.4 { ch "G" } D5.4 G4.2';
study(15, `${fillLead} r.4 | ${nextLine}`, [
  ['留白', '第一小节末留一个四分休止，主旋律 B4 仍在下一小节第一拍进入。', fillBass],
  ['分解和弦音', '右手填入 C5、E5、G5，三个音都属于第一小节的 C 和弦。', fillBass, `${fillLead} C5.16 E5.16 G5.8 | ${nextLine}`],
  ['柱式点缀', '空拍只加一个后半拍的短柱式，不延后下一句。', fillBass, `${fillLead} r.8 (C4 E4 G4).8 | ${nextLine}`],
  ['上行音阶', '右手从 E4 经 F4、G4、A4 逐级上行，B4 仍在下一小节首拍进入。', fillBass, `${fillLead} E4.16 F4.16 G4.16 A4.16 | ${nextLine}`],
  ['下行音阶', '右手用 F5、E5、D5、C5 下行，接到下一小节 G 和弦上的旋律音 B4。', fillBass, `${fillLead} F5.16 E5.16 D5.16 C5.16 | ${nextLine}`],
  ['波浪形音阶', '音型围绕 C5 上下摆动，最后由 C5 下行半音到 B4。', fillBass, `${fillLead} D5.16 C5.16 D5.16 C5.16 | ${nextLine}`],
  ['双手接力', '左手在空拍开头给 G3、C4，右手在后半拍继续 E4、G4。旋律进入时，两手恢复原分工。', 'C3.2 E3.4 G3.16 C4.16 r.8 | G2.2 (B2 D3).2', `${fillLead} r.8 E4.16 G4.16 | ${nextLine}`]
], 80);
