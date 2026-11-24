import { mountStringDemo, stringTrack } from './string-demos.js';

const huqin = phrase => stringTrack('胡琴', 110, phrase);
const pipa = phrase => stringTrack('琵琶', 105, phrase);
const zheng = phrase => stringTrack('筝', 107, phrase);
const sanxian = phrase => stringTrack('三弦', 24, phrase, 'F4');
const yangqin = phrase => stringTrack('扬琴', 15, phrase);
const liuqin = phrase => stringTrack('柳琴', 25, phrase);
const main = huqin('D5.4 F#5.8 E5.8 | A4.8 B4.8 D5.4');
const strict = pipa('D5.4 { dy p } F#5.8 E5.8 | A4.8 B4.8 D5.4');
const ornamented = pipa('D5.8 { dy p } E5.16 D5.16 F#5.8 E5.8 | A4.8 B4.8 D5.8 E5.16 D5.16');
const reduced = pipa('D4.4 { dy p } F#4.4 | A3.4 D4.4');
const free = pipa('D4.8 { dy p } A4.8 F#4.4 | A4.8 B4.16 D5.16 r.8 D5.8');

mountStringDemo('strings-doubling-demo', 76, [
  ['严格重复', '琵琶在同一音区复制胡琴的音高与节奏，两个声部的各次起音对齐。', [main, strict]],
  ['加花重复', '琵琶利用每小节的长 D 加两个短音，保留原来的支点。', [main, ornamented]],
  ['简化重复', '琵琶移低八度并省略 E、B，只在每拍保留一个音。', [main, reduced]],
  ['自由重复', '琵琶首拍在低八度，后来暂时翻高，并分割和错开节奏，于最后一个八分音符与胡琴重新相合。', [main, free]]
]);

mountStringDemo('strings-texture-demo', 76, [
  ['齐奏式', '两件乐器同度，音序与节奏相同，听成一条加厚的旋律。', [main, strict]],
  ['和音式', '琵琶在下方按拍交替奏 A3＋D4 和 A3＋F♯4，随后改成 A3＋E4，再回到 A3＋D4。胡琴继续原旋律。', [
    main, pipa('(A3 D4).4 { dy p } (A3 F#4).4 | (A3 E4).4 (A3 D4).4')
  ]],
  ['支声复调', '同一骨干由胡琴延长，琵琶与筝错开进入。两部有各自的短线，在句尾 D 上合回。', [
    main, free, zheng('r.8 A4.8 { dy p } B4.16 D5.16 F#5.8 | r.8 D5.8 F#5.16 E5.16 D5.8')
  ]],
  ['另加对位线', '胡琴仍奏原句。筝另走较慢的 F♯4、A4、B4、E4、F♯4，可以独立跟随。', [
    main, zheng('F#4.4 { dy p } A4.4 | B4.8 E4.8 F#4.4')
  ]]
]);

mountStringDemo('strings-repertoire-demo', 84, [
  ['固定对位', '前两小节提出原型，后两小节胡琴和琵琶改变节奏。筝的低音对位原样重来。', [
    huqin('D5.4 F#5.8 E5.8 | A4.8 B4.8 D5.4 | D5.8 E5.8 F#5.8 E5.8 | A4.4 D5.4'),
    pipa('D4.4 { dy p } F#4.4 | A3.4 D4.4 | D4.8 A4.8 F#4.4 | A3.8 B3.8 D4.4'),
    zheng(String.raw`\clef F4 F#3.4 { dy mp } A3.4 | B3.8 E3.8 F#3.4 | F#3.4 A3.4 | B3.8 E3.8 F#3.4`)
  ]],
  ['繁简互补', '胡琴和三弦给出句子的骨干。琵琶与筝避开起音密集的位置，在主部延长时添上短音。', [
    main, pipa('r.8 B4.16 A4.16 r.4 | r.4 r.8 A4.16 D5.16'),
    zheng('r.8 F#4.8 r.4 | r.4 A4.8 r.8'),
    sanxian('D3.4 { dy mp } F#3.8 E3.8 | A2.8 B2.8 D3.4')
  ]],
  ['旋律交接', '第一小节由胡琴唱出 D5、F♯5、E5，第二小节柳琴接 A4、B4、D5。胡琴缩为一句短应答，扬琴保持低位分解和声。', [
    huqin('D5.4 F#5.8 E5.8 | r.4 F#4.8 E4.8'),
    liuqin('r.2 | A4.8 B4.8 D5.4'),
    yangqin('D4.8 { dy p } A4.8 F#4.8 A4.8 | A3.8 E4.8 D4.8 A4.8')
  ]]
]);
