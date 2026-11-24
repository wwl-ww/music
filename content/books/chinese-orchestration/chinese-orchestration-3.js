import { pianoKeysMarkup } from '../../shared/formats/piano.js';
import { mountRangeKeyboards } from '../../shared/formats/range-keyboards.js';
import { mountStringDemo, stringTrack } from './string-demos.js';

mountRangeKeyboards(
  document.getElementById('plucked-range-keyboards'),
  document.getElementById('plucked-range-table'),
  { firstOctave: 2, octaves: 5, rangeLabel: '标示', caption: '弹拨乐器的音域与空弦位置' }
);

const zhengKeyboard = document.getElementById('zheng-open-keys');
const zhengOpenNotes = [2, 4, 6, 9, 11, 14, 16, 18, 21, 23, 26, 28, 30, 33, 35, 38, 40, 42, 45, 47, 50];
const zhengKeyboardRow = zhengKeyboard.querySelector('.range-keyboard-row');
zhengKeyboardRow.innerHTML = pianoKeysMarkup(
  zhengOpenNotes.map(semitone => [semitone, 'keyboard-highlight', 'start']), 5
);
zhengKeyboardRow.querySelector('svg').setAttribute('preserveAspectRatio', 'none');
zhengKeyboard.hidden = false;

const pipa = phrase => stringTrack('琵琶', 105, phrase);
mountStringDemo('pipa-articulation-demo', 84, [
  ['单弹', '各音只在写明的位置弹一次。每小节最后一拍由拨弦的余音延续。', [
    pipa('A3.8 D4.8 F#4.4 | A4.8 F#4.8 D4.4')
  ]],
  ['滚奏音型', '每小节第二拍内快速弹挑同一音，使原来逐渐衰减的 F♯4 与 D4 被反复补强。', [
    pipa('A3.8 D4.8 F#4.16 F#4.16 F#4.16 F#4.16 | A4.8 F#4.8 D4.16 D4.16 D4.16 D4.16')
  ]],
  ['和弦强调', '每小节第一个音仍在上方，低弦同响增加句首分量。两处都用到可以留余音的空弦。', [
    pipa(String.raw`A3.8 D4.8 F#4.4 | A4.8 F#4.8 D4.4 ||
      \staff { score } \tuning (none) \clef F4 (A2 D3 E3).8 r.8 r.4 | (A2 D3 E3).8 r.8 r.4`)
  ]]
]);

const yangqin = phrase => stringTrack('扬琴', 15, phrase);
const yangqinTune = yangqin('D5.8 r.8 F#5.8 r.8 | A5.8 r.8 D5.8 r.8');
mountStringDemo('yangqin-filler-demo', 96, [
  ['单线', '每拍前半击主音，后半留空，作为两种写法的共同旋律。', [yangqinTune]],
  ['低八度衬音', '在每个主音后半拍加低八度，衬音力度轻，主音起点保持原位。', [
    yangqin('D5.8 D4.8 { dy p } F#5.8 { dy mf } F#4.8 { dy p } | A5.8 { dy mf } A4.8 { dy p } D5.8 { dy mf } D4.8 { dy p }')
  ]]
]);
