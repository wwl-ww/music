import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { model } from '@coderline/alphatab';
import { mountPlayableArrangementGrid } from '../../shared/formats/arrangement-grid-playback.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const metre = String.raw`\ts (2 4)`;
const pipe = (phrase, name = '管子') => ({ name, program: 68, phrase: metre + ' ' + phrase });
const flute = phrase => ({ name: '笛', program: 73, phrase: metre + ' ' + phrase });
const sheng = phrase => ({ name: '笙', program: 20, phrase: metre + ' ' + phrase });
const suona = (name, phrase) => ({ name, program: 111, phrase: metre + ' ' + phrase });

function percussion(name, pitch, phrase) {
  return {
    name,
    program: 'percussion',
    staffLines: 1,
    phrase: String.raw`\clef neutral \articulation (Hit ${pitch}) ${metre} ${phrase}`
  };
}

function compare(id, tempo, versions) {
  mountScoreWritingSteps(document.getElementById(id), {
    score: {
      tempo,
      soundFontUrl,
      onScoreLoaded(score) {
        for (const track of score.tracks) {
          if (!track.isPercussion) continue;
          // Place MIDI articulations on the single percussion line.
          track.percussionArticulations = track.percussionArticulations.map(articulation =>
            Object.assign(new model.InstrumentArticulation(), articulation, { staffLine: 0 })
          );
        }
      }
    },
    steps: versions.map(([label, description, scoreTracks]) => ({
      label, description, notes: { scoreTracks }
    }))
  });
}

const subject = 'D5.8 F5.8 G5.4 | A5.8 G5.8 D5.4';
const main = pipe(subject);
compare('wind-same-melody', 90, [
  ['管子独奏', '管子独奏只有一个音区，旋律的起伏和起音清楚。', [main]],
  ['笛高八度重叠', '笛在相同位置把每个音翻高八度，加入明亮的上方音区。', [
    flute('D6.8 { dy p } F6.8 G6.4 | A6.8 G6.8 D6.4'), main
  ]],
  ['笙和音相随', '笙在每拍提供和音。管子的短音经过时，笙仍保留一个比较平稳的底。', [
    main, sheng('(G4 D5).4 { dy p } (C5 G5).4 | (D5 A5).4 (G4 D5).4')
  ]]
]);

const rest = 'r.2';
const board = phrase => percussion('梆子', 75, phrase);
const drum = phrase => percussion('鼓', 38, phrase);
const gong = phrase => percussion('锣', 81, phrase);
compare('wind-texture-compare', 100, [
  ['主奏式', '管子始终领奏。笙在有旋律的拍上托底，梆子只在各小节拍头点出板眼。', [
    main, sheng('(G4 D5).2 { dy p } | (G4 D5).2'), board('Hit.4 { dy p } r.4 | Hit.4 r.4')
  ]],
  ['鼓段间奏式', '第一小节是管子的一句，第二小节管子停奏，由鼓回答。', [
    pipe('D5.8 F5.8 G5.4 | ' + rest), drum(rest + ' | Hit.8 Hit.16 Hit.16 Hit.4')
  ]],
  ['齐奏式', '笛比管子高八度，却和管子同时起音。鼓只随旋律的重要落点。', [
    flute('D6.8 { dy p } F6.8 G6.4 | A6.8 G6.8 D6.4'), main,
    drum('Hit.4 { dy p } Hit.4 | Hit.4 Hit.4')
  ]],
  ['复调式', '吹管用长音展开，鼓在长音下面继续自己的短音型，锣在第二小节的弱位加入。', [
    pipe('D5.4 G5.4 | D5.2'),
    drum('r.8 Hit.8 Hit.8 { dy p } Hit.8 | Hit.8 r.8 Hit.16 Hit.16 r.8'),
    gong(rest + ' | r.8 Hit.8 { dy p } r.4')
  ]]
]);

const held = suona('唢呐主奏', 'D5.8 F5.8 G5.4 | D5.2');
const answer = 'D5.8 F5.8 G5.4 | D5.4 A4.8 D5.8';
compare('wind-repertoire-methods', 108, [
  ['紧打慢唱', '中心音在第二小节拉开唱腔，鼓点按原来距离继续推进。', [
    held, drum('Hit.16 { dy p } Hit.16 Hit.16 Hit.16 Hit.8 Hit.8 | Hit.16 Hit.16 Hit.16 Hit.16 Hit.8 Hit.8')
  ]],
  ['长音填空', '唢呐把尾音维持住，笛只在这个长音后半段填出短句。', [
    held, flute(rest + ' | r.4 A5.16 { dy p } G5.16 F5.16 D5.16')
  ]],
  ['活通鼓', '相同的两小节吹管声部完整出现两遍。第一遍由梆子标拍，第二遍由鼓与锣填弱位，吹管骨架保持。', [
    suona('唢呐主奏', 'D5.8 F5.8 G5.4 | D5.2 | D5.8 F5.8 G5.4 | D5.2'),
    suona('唢呐答部', answer + ' | ' + answer),
    board('Hit.4 { dy p } Hit.4 | Hit.4 Hit.4 | r.2 | r.2'),
    drum('r.2 | r.2 | r.8 Hit.8 { dy p } r.8 Hit.8 | r.8 Hit.8 Hit.4'),
    gong('r.2 | r.2 | r.4 r.8 Hit.8 { dy p } | r.4 Hit.4')
  ]]
]);

const hit = (step, accent = false) => ({ step, accent });
mountPlayableArrangementGrid(document.getElementById('wind-cymbal-exchange-grid'), {
  beats: 6,
  beatsPerBar: 2,
  subdivisions: 2,
  tempo: 96,
  label: '两副钹的齐击、花式互补与分工调换',
  rows: [
    { label: '第一副钹', drum: 49, events: [hit(0, true), hit(2), hit(4, true), hit(6), hit(9), hit(11)] },
    { label: '第二副钹', drum: 55, events: [hit(0, true), hit(2), hit(5), hit(7), hit(8, true), hit(10)] }
  ]
});

mountPlayableArrangementGrid(document.getElementById('wind-drums-overlay-grid'), {
  beats: 8,
  beatsPerBar: 2,
  subdivisions: 2,
  tempo: 96,
  label: '吹管与锣鼓的穿插、重叠、问答',
  rows: [
    { label: '吹管', program: 111, events: [
      { step: 0, pitch: 'D5' }, { step: 2, pitch: 'G5' },
      { step: 4, pitch: 'A5', length: 2 }, { step: 6, pitch: 'G5', length: 2 },
      { step: 8, pitch: 'F5', length: 2 }, { step: 10, pitch: 'D5', length: 2 }
    ] },
    { label: '鼓', drum: 38, events: [hit(1), hit(3), hit(4), hit(5), hit(7), hit(12, true), hit(13), hit(15)] },
    { label: '锣', drum: 81, events: [hit(7), hit(14, true)] }
  ]
});
