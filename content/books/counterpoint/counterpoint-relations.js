import { mountVoiceRelations } from '../../shared/formats/voice-relations.js';

const event = (id, label, start, length, detail) => ({ id, label, start, length, detail });
const lane = (label, ...events) => ({ label, events });
const link = (from, to, label) => ({ from, to, label });
const map = (unitName, unitCount, lanes, links, unitLabels) => ({ unitName, unitCount, lanes, links, unitLabels });
const bars = (count, lanes, links) => map('小节', count, lanes, links);
const beats = (count, lanes, links) => map('拍', count, lanes, links);
const upper = (...events) => lane('上声部', ...events);
const lower = (...events) => lane('下声部', ...events);

function phrases(offset) {
  return bars(4, [
    lane('指定旋律', event('first', '第一句', 1, 2, '第 1–2 小节是指定旋律的第一句'),
      event('second', '第二句', 3, 2, '第 3 小节开始第二句')),
    lane('对位旋律', event('counter', '对位句', 1 + offset, 2, offset
      ? '对位句晚一小节开始，跨过指定旋律的句界' : '两句一起开始，也一起收束'))
  ], [link('first', 'counter', offset ? '两句重叠一小节' : '两句的起点与收束位置对齐')]);
}

function voiceVersions(before, after, changes, version) {
  return map('版本', 2, before.map((label, index) => lane(
    ['高声部', '中声部', '低声部'].at(before.length === 2 ? index * 2 : index),
    event('before-' + index, '旋律 ' + label, 1, 1, '原位的' + label),
    event('after-' + index, '旋律 ' + after[index], 2, 1, version + '中的' + after[index])
  )), before.map((label, index) => link('before-' + index, 'after-' + after.indexOf(label), changes[index])),
  ['原位', version]);
}

const twoVoices = ['A', 'B'];
const threeVoices = ['A', 'B', 'C'];
const compareVersion = (order, changes, version) => voiceVersions(twoVoices, order, changes, version);
const originalTwoVoices = map('版本', 1, [
  upper(event('a', '旋律 A', 1, 1, '原位中 A 在上方')),
  lower(event('b', '旋律 B', 1, 1, '原位中 B 在下方'))
], [], ['原位']);

function twoVoiceEntry(unitName, unitCount, start, sourceLength, responseLength, relation, {
  source = '起句', response = '应句'
} = {}) {
  return map(unitName, unitCount, [
    upper(event('source', source, 1, sourceLength, '上声部呈示原材料')),
    lower(event('response', response, start, responseLength, '下声部呈示对应材料'))
  ], [link('source', 'response', relation)]);
}

function impliedLines(separate) {
  const layers = [
    { label: '高层', pitches: ['G', 'A', 'B', 'C'] },
    { label: '低层', pitches: ['E', 'F', 'G', 'A'] }
  ];
  return map('半拍', 8, layers.map(({ label, pitches }, voice) => lane(label,
    ...pitches.map((pitch, index) => {
      const start = index * 2 + 1 + voice;
      return event(voice + '-' + index, pitch, start, separate && start < 8 ? 2 : 1,
        label + '的 ' + pitch + ' 在第 ' + (index + 1) + ' 拍' + (voice ? '后半拍' : '起拍') + '出现');
    })
  )), layers.flatMap(({ label, pitches }, voice) => pitches.slice(1)
    .map((pitch, index) => link(voice + '-' + index, voice + '-' + (index + 1),
      label + '在下一拍同一位置接到 ' + pitch))));
}

function canonEnding(kind) {
  const first = event('a', '题头 a', 1, 1, '上声部独立呈示题头 a');
  const next = event('b', '后句 b', 2, 1, '上声部唱后句 b 时，下声部仍在唱前一小节的 a');
  const firstCopy = event('a-answer', 'a′', 2, 1, '第 2 小节，下声部低八度重复题头 a');
  const secondCopy = event('b-answer', 'b′', 3, 1, '第 3 小节，下声部低八度重复后句 b');
  const firstLink = link('a', 'a-answer', 'a′ 晚一小节、低八度');
  const secondLink = link('b', 'b-answer', 'b′ 仍晚一小节、低八度');
  if (kind === 'loop') {
    return bars(4, [
      upper(first, next, event('a-return', 'a 再现', 3, 1, '上声部回到题头 a，此时配合下方的 b′'),
        event('b-return', 'b 再现', 4, 1, '上声部继续唱 b，下声部跟进 a')),
      lower(firstCopy, secondCopy, event('a-next-copy', 'a′', 4, 1, '题头 a 再次被下声部模仿'))
    ], [firstLink, secondLink, link('a-return', 'a-next-copy', '下一轮仍晚一小节进入')]);
  }
  if (kind === 'strict') {
    return bars(3, [
      upper(first, next, event('sustain', '长音 C', 3, 1, '上声部保持 C，等下声部唱完 b′')),
      lower(firstCopy, secondCopy)
    ], [firstLink, secondLink]);
  }
  return bars(3, [
    upper(first, next, event('upper-close', 'D–C', 3, 1, '第 3 小节，上声部另写终止句')),
    lower(firstCopy, event('lower-close', 'G–C', 3, 1, '下声部结束严格模仿，与上声部同落 C'))
  ], [firstLink, link('upper-close', 'lower-close', '两部在同一拍落在主音 C')]);
}

function phraseChain(transformed = false) {
  const names = transformed ? ['A 倒影', 'B 倒影', 'C 倒影'] : ['A', 'B', 'C'];
  return bars(3, [
    upper(...names.map((label, index) => event('source-' + index, label, index + 1, 1,
      '上声部在第 ' + (index + 1) + ' 小节呈示 ' + label))),
    lower(...names.slice(0, 2).map((label, index) => event('answer-' + index, label + '′', index + 2, 1,
      '下声部接唱上声部的 ' + label)))
  ], names.slice(0, 2).map((_, index) => link('source-' + index, 'answer-' + index,
    '下声部晚一小节、低八度接唱')));
}

function multiEntry(order, notes, intervals, freeVoice) {
  const names = order.length === 4 ? ['最高声部', '次高声部', '次低声部', '最低声部'] : ['高声部', '中声部', '低声部'];
  const roles = ['起句', '第一应句', '第二应句'];
  const unitCount = order.length;
  return bars(unitCount, order.map((entry, voice) => lane(names[voice], entry === 'free'
    ? event('free', '自由声部', 1, unitCount, freeVoice)
    : event('entry-' + entry, notes[entry], entry + 1, 1,
      names[voice] + '在第 ' + (entry + 1) + ' 小节奏' + roles[entry] + '，从 ' + notes[entry] + ' 开始'))), [
    link('entry-0', 'entry-1', '第一应句晚一小节' + intervals[0]),
    link('entry-1', 'entry-2', '第二应句再晚一小节' + intervals[1])
  ]);
}

function doubleCanon(offset) {
  const rows = [
    ['A′', 2, 'A 的高两个八度的应句'],
    ['B′', 2 + offset, 'B 的高八度应句'],
    ['A', 1, '原句 A'],
    ['B', 1 + offset, '原句 B']
  ];
  return bars(4 + offset, rows.map(([name, start, description], voice) => lane(
    ['最高声部', '次高声部', '次低声部', '最低声部'][voice],
    ...[1, 2, 3].map((index) => event(name + index, name + '₁₂₃'[index - 1], start + index - 1, 1,
      description + '的第 ' + index + ' 句'))
  )), [1, 2, 3].flatMap(index => [
    link('A' + index, 'A′' + index, 'A′ 接唱前一小节的 A'),
    link('B' + index, 'B′' + index, 'B′ 接唱前一小节的 B')
  ]));
}

function imitationAndFree(voice, motif) {
  const source = event('source', motif, 1, 1, '起句从第 1 小节开始');
  const free = event('free', '自由声部', 1, 2, '自由旋律同时进行，有自己的节奏和走向');
  return bars(2, [
    upper(voice === 'high' ? source : free),
    lane('中声部', event('answer', motif, 2, 1, '中声部从第 2 小节进入，保持题头的节奏')),
    lower(voice === 'high' ? free : source)
  ], [link('source', 'answer', '应句晚一小节' + (voice === 'high' ? '，低八度' : '，高八度'))]);
}

function canonDelay(delay, continues = true) {
  return beats(8 + delay, [
    upper(event('a', '首句 A', 1, 4, '上声部从第 1 拍开始首句'),
      event('b', '后句 B', 5, 4, '上声部从第 5 拍接着唱后句')),
    lower(event('a-answer', 'A′', 1 + delay, 4, '下声部低八度接唱首句'),
      event('b-answer', continues ? 'B′' : '自由续句', 5 + delay, 4,
        continues ? '下声部按同样规则接唱后句' : '首句模仿结束，下声部换用自己的旋律'))
  ], [
    link('a', 'a-answer', '应句晚 ' + delay + ' 拍进入'),
    ...(continues ? [link('b', 'b-answer', '后句保持同样的时差')] : [])
  ]);
}

function fugueHandoff(start, filler) {
  return beats(9, [
    upper(event('answer', '答题', start, 4, '上声部在第 ' + start + ' 拍起奏答题')),
    lower(event('head', '题头', 1, 2, '主题由下声部开始'),
      event('tail', '长音 G', 3, 2, '主题的末音 G 占第 3、4 拍'), ...filler)
  ], [link('tail', 'answer', {
    4: '答题提早进入，与末音重叠一拍',
    5: '答题紧接主题末音，交界在小节线',
    6: '两者之间空一拍，由下声部小结尾填入'
  }[start])]);
}

function fugueOpening(answer, counter) {
  return bars(2, [
    upper(event('answer', answer, 2, 1, '第 2 小节，高声部接过主题轮廓')),
    lower(event('theme', '主题 C→G', 1, 1, '下声部从主音 C 到属音 G'),
      ...(counter ? [event('counter', '对题', 2, 1, '原先的声部改唱对题，与答题同时进行')] : []))
  ], [link('theme', 'answer', '答题晚一小节进入' + (answer.endsWith('D')
    ? '，整句移高五度' : '，长音落回 C'))]);
}

function stretto(delay) {
  return twoVoiceEntry('拍', 8, 1 + delay, 4, 4, delay === 4
    ? '主题唱完后才有下一入口'
    : '两次陈述重叠 ' + (4 - delay) + ' 拍',
  { source: '第一次主题', response: '第二次主题' });
}

function sharedSkeleton(delay, decorated) {
  const pitches = ['C', 'D', 'E', 'G'];
  return beats(4 + delay, [
    upper(...pitches.map((pitch, index) => event('u' + index, pitch, index + 1, 1,
      '上声部以 ' + pitch + ' 为这一拍的骨干' + (decorated && index < 3 ? '，拍内再添一个短音' : '')))),
    lower(...pitches.map((pitch, index) => event('l' + index, pitch, index + 1 + delay, 1,
      '下声部从第 ' + (index + 1 + delay) + ' 拍奏 ' + pitch)))
  ], pitches.map((_, index) => link('u' + index, 'l' + index, delay
    ? '同名音晚一拍出现，整条旋律的支点随应句后移'
    : '两部在同一拍到达这个骨干音，形成八度上的共用支点')));
}

const relations = {
  'phrase-contrast': { aligned: phrases(0), staggered: phrases(1) },
  'implied-lines': {
    combined: impliedLines(false),
    separated: impliedLines(true),
    imitative: twoVoiceEntry('半拍', 8, 2, 8, 7, '低层晚半拍、低五度进入，末音收在小节线',
      { source: 'G–A–B–C', response: 'C–D–E–F' })
  },
  'melody-combinations': {
    staggered: beats(4, [
      upper(event('high', 'G–A–B', 1, 2, '上声部的题头占前两拍'),
        event('hold', '长音 G', 3, 2, '上声部的题头结束，保持 G')),
      lower(event('bass', '长音 C', 1, 2, '下声部先保持 C'),
        event('low', 'E–F–G', 3, 2, '下声部以自己的题头进入'))
    ], [link('high', 'low', '两个独立的题头相隔两拍，各有完整的起音空间')])
  },
  'double-counterpoint': {
    original: originalTwoVoices,
    octave: compareVersion(['B', 'A'], ['A 降八度，转到 B 下方', 'B 音高照旧，从下方变成上方'], '八度换位'),
    twelfth: compareVersion(['B', 'A'], ['A 降八度', 'B 升五度，两部的相对移动是十二度'], '十二度换位')
  },
  'inversion-voices': {
    original: originalTwoVoices,
    upper: compareVersion(twoVoices, ['A 的首音 G 绕 A 轴翻成 B', 'B 保留原形，仍在下方'], '单部倒影'),
    both: compareVersion(['B', 'A'], ['A 的 G 翻成 B 并转到下方', 'B 的 E 翻成 D 并转到上方'], '两部倒影')
  },
  'retrograde-voices': {
    original: originalTwoVoices,
    upper: compareVersion(twoVoices, ['A 的末音 D 移到开头，与 B 的首音 E 相遇', 'B 维持原来的音符顺序'], '单部逆行'),
    both: compareVersion(twoVoices, ['A 的末音 D 移到开头', 'B 的末音 B 也移到开头，与 D 保持原来的配合'], '两部逆行'),
    exchanged: compareVersion(['B', 'A'], ['A 逆行后移到下方', 'B 逆行后移到上方'], '逆行后换位')
  },
  imitation: {
    ...Object.fromEntries([
      ['direct', 'G–A–B', 2, '原形应句低八度，仍占两拍'],
      ['augment', 'G–A–B', 4, '应句的每个音拉长到两倍，合计四拍'],
      ['diminish', 'GAB', 1, '应句 G–A–B 的每个音缩短为一半'],
      ['invert', 'B–A–G', 2, '以 A 为轴翻转音高方向，原有时值保持'],
      ['invertedShort', 'BAG', 1, '应句改为 B–A–G，时值同时减半'],
      ['reverse', 'B–A–G', 2, '音高顺序与每个音对应的时值一起倒排'],
      ['rhythm', 'G–E–B', 2, '应句改变走向，仍保留短短长的节奏']
    ].map(([id, response, length, relation]) => [id,
      twoVoiceEntry('拍', 8, 5, 2, length, relation, { source: 'G–A–B', response })])),
    split: beats(12, [
      upper(event('first', 'G–A–B', 1, 2, '第 1 小节前两拍为第一组题头'),
        event('second', 'D–E–F', 5, 2, '第 2 小节前两拍提出第二组题头')),
      lower(event('first-answer', 'G–A–B', 5, 2, '第 2 小节前两拍低八度照唱'),
        event('second-answer', 'F–E–D', 9, 2, '第 3 小节前两拍改用倒影'))
    ], [link('first', 'first-answer', '第一次用原形'), link('second', 'second-answer', '第二次用倒影')])
  },
  'canon-ending': Object.fromEntries(['finite', 'strict', 'loop'].map(kind => [kind, canonEnding(kind)])),
  'bitonal-sequence-score': {
    original: bars(5, [
      upper(event('a', 'a 小调', 1, 2, '第 1–2 小节，上方的中心是 A'),
        event('g', 'g 小调', 3, 2, '第 3–4 小节，上方先移动到 G')),
      lower(event('d', 'd 小调', 2, 2, '第 2–3 小节，下方以 D 为中心'),
        event('c', 'c 小调', 4, 2, '第 4–5 小节，下方才移动到 C'))
    ], [link('a', 'd', '第一组的应句晚一小节，局部调性中心低纯五度'),
      link('g', 'c', '第 3 小节同时重叠新起句 g 小调和上一组应句 d 小调')])
  },
  'three-voice-permutation': Object.fromEntries(['abc', 'acb', 'bac', 'bca', 'cab', 'cba'].map(choice => [
    choice, voiceVersions(threeVoices, [...choice.toUpperCase()],
      threeVoices.map((name, index) => choice[index].toUpperCase() === name ? name + ' 保持原来的位置'
        : name + ' 保留音序和节奏，移到' + ['高声部', '中声部', '低声部'][choice.indexOf(name.toLowerCase())]), '所选排列')
  ])),
  'multi-entry-distances': {
    same: multiEntry([2, 1, 0], ['C3', 'C4', 'C5'], ['、高八度', '、高八度']),
    mixed: multiEntry([2, 1, 0], ['C3', 'G4', 'E5'], ['、高十二度', '、高六度'])
  },
  'multi-entry-transformations': Object.fromEntries(['like', 'different'].map(choice => [choice, beats(8, [
    upper(event('high', choice === 'like' ? '紧缩' : '倒影', 5, choice === 'like' ? 1 : 2,
      choice === 'like' ? '高声部唱 G–A–B，时值减半' : '高声部唱 B–A–G，保留原时值')),
    lane('中声部', event('middle', choice === 'like' ? '紧缩' : '扩大', 5, choice === 'like' ? 1 : 4,
      choice === 'like' ? '中声部同样缩为一拍' : '中声部保留 G–A–B，时值扩大为两倍')),
    lower(event('source', 'G–A–B', 1, 2, '此题头占两拍，两条应句都由它变形'))
  ], [link('source', 'high', '高声部从第 5 拍进入'), link('source', 'middle', '中声部也从第 5 拍进入')])])),
  'double-imitation': { contrast: doubleCanon(0), imitation: doubleCanon(1) },
  'combined-texture': {
    original: imitationAndFree('high', 'G–A–B'),
    swap: imitationAndFree('low', 'G–A–B'),
    invert: imitationAndFree('low', 'B–A–G')
  },
  'triple-imitation-order': {
    original: multiEntry([0, 1, 2], ['C5', 'C4', 'C3'], ['、低八度', '、低八度']),
    reordered: multiEntry([2, 1, 0], ['C3', 'C4', 'C5'], ['、高八度', '、高八度'])
  },
  'imitation-free-four': {
    original: multiEntry(['free', 0, 1, 2], ['C5', 'C4', 'C3'], ['、低八度', '、低八度'], '自由旋律维持在最高声部'),
    swapped: multiEntry([0, 1, 2, 'free'], ['C5', 'C4', 'C3'], ['、低八度', '、低八度'], '自由旋律移到最下方，三次入口的位置保留')
  },
  'miniature-echo': {
    contrast: bars(2, [
      upper(event('theme', '主题', 1, 2, '上声部保有自己的短音题头和句尾')),
      lower(event('counter', '独立对位', 1, 2, '下声部同时进行，沿自己的音程和节奏展开'))
    ], []),
    imitation: beats(8, [
      upper(event('theme', '主题首部', 1, 2, '主题以 E–G–A–G 的短音开始'),
        event('e', '长音 E', 3, 2, '第 1 小节后半是长音 E'),
        event('next', '第二句', 5, 4, '上声部继续自己的第二句')),
      lower(event('answer', '八度应句', 3, 2, '下声部在第 3 拍低八度接唱题头'),
        event('e-copy', '长音 E', 5, 2, '第 2 小节开头接唱同一个长音'),
        event('own', '自由尾音', 7, 2, '低声部转入自由进行'))
    ], [link('theme', 'answer', '首部晚两拍、低八度应答'), link('e', 'e-copy', '模仿延续到长音 E')])
  },
  'path-canon': { head: canonDelay(1, false), continue: canonDelay(1), wider: canonDelay(2) },
  'canon-delay': { beat: canonDelay(1), half: canonDelay(2), measure: canonDelay(4) },
  'canon-transform': {
    original: twoVoiceEntry('拍', 9, 2, 8, 8, '晚一拍，低八度，音程方向和时值照旧', { response: '原形应句' }),
    inversion: twoVoiceEntry('拍', 9, 2, 8, 8, '晚一拍，以 E 为对应轴翻转方向，时值照旧', { response: '倒影应句' }),
    double: twoVoiceEntry('拍', 17, 2, 8, 16, '晚一拍，时值扩大为两倍，下声部延续得更久', { response: '两倍时值' }),
    tripleLayer: bars(4, [
      upper(...[1, 2, 3, 4].map(index => event('short-' + index, '原时值', index, 1, '高声部在第 ' + index + ' 小节重唱同一首部'))),
      lane('中声部', event('twice-1', '两倍时值', 1, 2, '中声部每两小节唱一遍'),
        event('twice-2', '两倍时值', 3, 2, '中声部在第 3 小节重唱')),
      lower(event('four-times', '四倍时值', 1, 4, '低声部四小节才唱完同一首部'))
    ], [link('short-1', 'twice-1', '时值比为 1∶2'), link('short-1', 'four-times', '时值比为 1∶4')])
  },
  'invention-three-parts': Object.fromEntries(['high', 'middle'].map(choice => {
    const fromHigh = choice === 'high';
    const source = event('source', fromHigh ? 'C–D–E' : 'G–A–B', 1, 2, '从第 1 拍呈示题头');
    const copy = event('copy', source.label, 3, 2, '另一声部从第 3 拍模仿题头');
    return [choice, beats(8, [
      upper(fromHigh ? source : copy),
      lane('中声部', fromHigh ? copy : source),
      lower(event('bass', '分解和弦背景', 1, 8, '低声部全程维持八分音符的和声层'))
    ], [link('source', 'copy', fromHigh ? '晚两拍、低八度' : '晚两拍、高八度')])];
  })),
  'two-theme-roles': {
    first: map('版本', 1, [upper(event('t1', 'T₁', 1, 1, 'T₁ 以短音型开始')), lower(event('t2', 'T₂', 1, 1, 'T₂ 用较长的音与 T₁ 结合'))], []),
    swapped: voiceVersions(['T₁', 'T₂'], ['T₂', 'T₁'], ['T₁ 保持原音高，由上方变为下方', 'T₂ 升八度到上方'], '换位'),
    episode: beats(8, [
      upper(...['E–G–E–D', 'F–A–F–E', 'G–B–G–F', 'A–C–A–G'].map((label, index) =>
        event('a' + index, label, 1 + index * 2, 2, 'T₁ 的首部在第 ' + (1 + index * 2) + ' 拍移位重现'))),
      lower(...['E–G–E–D', 'F–A–F–E', 'G–B–G–F'].map((label, index) =>
        event('b' + index, label, 3 + index * 2, 2, '下声部接过对应的动机')))
    ], [0, 1, 2].map(index => link('a' + index, 'b' + index, '低八度、晚两拍接过同一动机')))
  },
  'path-answer': {
    exact: fugueOpening('答题 G→D', false),
    tonal: fugueOpening('答题 G→C', false),
    counter: fugueOpening('答题 G→C', true)
  },
  'fugue-handoff': {
    joined: fugueHandoff(5, []),
    overlap: fugueHandoff(4, []),
    bridge: fugueHandoff(6, [event('bridge', 'E–F', 5, 1, '下方的两个八分音符填进空出的一拍')])
  },
  'fugue-episode': {
    canon: beats(8, [
      upper(...['C–D–E', 'D–E–F', 'E–F–G'].map((label, index) =>
        event('head-' + index, label, index * 2 + 1, 2, '主题首部截成两拍的模进单位'))),
      lower(...['C–D–E', 'D–E–F', 'E–F–G'].map((label, index) =>
        event('answer-' + index, label, index * 2 + 3, 2, '下声部复制已经移位的同一材料')))
    ], [0, 1, 2].map(index => link('head-' + index, 'answer-' + index, '应句晚两拍、低八度')))
  },
  'fugue-stretto': { sequential: stretto(4), overlapping: stretto(2), compact: stretto(1) },
  'modal-stretto': {
    octave: twoVoiceEntry('拍', 6, 3, 4, 4, '晚两拍、低八度重现 a 羽主题', { source: 'A 起句', response: 'A 应句' }),
    modal: twoVoiceEntry('拍', 6, 3, 4, 4, '晚两拍，从 E 起重组，同一五声音列', { source: 'A 起句', response: 'E 应句' }),
    three: beats(6, [
      upper(event('first', 'A 起句', 1, 4, '高声部从 A 开始')),
      lane('中声部', event('second', 'E 应句', 2, 4, '第二个入口从 E 开始')),
      lower(event('third', 'A 应句', 3, 4, '第三个入口回到低八度的 A'))
    ], [link('first', 'second', '中声部晚一拍，从 E 接应'), link('second', 'third', '低声部再晚一拍，从 A 接应')])
  },
  'fugue-canon-chain': { original: phraseChain(), reflected: phraseChain(true) },
  'path-heterophony': {
    skeleton: sharedSkeleton(0, false), decorated: sharedSkeleton(0, true), delayed: sharedSkeleton(1, false)
  },
  'heterophony-harmonic': {
    branch: beats(4, [
      upper(event('u1', 'G', 1, 1, '两部从 G 同时起音'), event('u2', 'A', 2, 1, '上声部离开 G'),
        event('u3', 'G', 3, 1, '上声部回到 G')),
      lower(event('l1', 'G', 1, 1, '下声部保持同一个骨干音'), event('l2', 'G', 2, 1, '第二拍仍是 G'),
        event('l3', 'G', 3, 1, '第三拍与上声部回到同度'))
    ], [link('u1', 'l1', '从共同的 G 分开'), link('u3', 'l3', '经过一拍分岔，再会合于 G')]),
    layers: beats(8, [
      upper(event('u1', 'G', 1, 1, '两部从 G 同时起音'),
        event('u2', '上方分线', 2, 6, '两条线分别用自己的音列推进'),
        event('u3', 'C', 8, 1, '上声部在句末落到 C')),
      lower(event('l1', 'G', 1, 1, '下声部也从 G 开始'),
        event('l2', '下方分线', 2, 6, '两部维持不同音高达六拍'),
        event('l3', 'C', 8, 1, '下声部在句末与上方合到 C'))
    ], [link('u1', 'l1', '第 1 拍是共同的 G'), link('u3', 'l3', '分层延续至句尾，在第 8 拍同落 C')]),
    held: beats(8, [
      upper(event('u1', 'G', 1, 1, '第一拍两部同为 G'), event('u2', '活动旋律', 2, 6, '上声部继续换音'),
        event('u3', 'C', 8, 1, '最后一拍回到 C')),
      lower(event('l1', '长音 G', 1, 4, '下声部在第一小节保持 G'),
        event('l2', '长音 D', 5, 2, '下一小节先保持 D'),
        event('l3', '长音 C', 7, 2, '低声部先到共同的 C'))
    ], [link('u1', 'l1', '从同一个音出发，下方的 G 延续四拍'), link('l3', 'u3', '最后一拍上声部也落到 C')])
  },
  'path-foreground': {
    chords: bars(2, [
      upper(event('theme', '主旋律', 1, 2, '题头和续句都在上方')),
      lower(event('chords', '和弦伴奏', 1, 2, '下方的和弦为旋律提供和声支撑'))
    ], []),
    response: beats(8, [
      upper(event('theme', '主题开头', 1, 2, '上声部呈示题头'),
        event('sustain', '长音 G', 3, 2, '上声部保持长音，给下声部留出进入空间'),
        event('continuation', '主题续句', 5, 4, '主旋律仍由上声部接着唱')),
      lower(event('answer', '短答句', 3, 2, '短答句填进长音占据的两拍'),
        event('lower-tail', '衬托句', 5, 2, '主旋律回来后，下声部继续衬托'))
    ], [link('sustain', 'answer', '短答句与长音重叠两拍，主题仍在上方')]),
    handoff: beats(8, [
      upper(event('theme', '主题开头', 1, 4, '主旋律先在上方呈示题头'),
        event('continue', '上方续句', 5, 4, '主题移到下方后，上声部继续发展')),
      lower(event('copy', '主题开头', 3, 4, '低声部从第 3 拍接过完整的题头'),
        event('continue-low', '低音 E', 7, 2, '下声部结束题头后继续发展'))
    ], [link('theme', 'copy', '主题降低八度并晚两拍出现，听觉重心转到下方')])
  },
  'imitation-in-homophony': {
    local: beats(8, [
      upper(event('head', 'E–G', 1, 2, '主旋律唱出题头'), event('c', '长音 C', 3, 2, '主旋律进入长 C')),
      lane('中声部', event('answer', 'E–G', 3, 2, '内声部晚两拍模仿题头'),
        event('own', '自由续句', 5, 4, '中声部随后改唱自己的音调'))
    ], [link('head', 'answer', '内声部只模仿前两个音')]),
    canon: beats(8, [
      upper(event('head', 'E–G', 1, 2, '主旋律唱出题头'), event('c', '长音 C', 3, 2, '主旋律进入长 C')),
      lane('中声部', event('answer', 'E–G', 3, 2, '内声部晚两拍模仿题头'),
        event('c-answer', '长音 C', 5, 2, '中声部继续模仿长音'))
    ], [link('head', 'answer', '题头晚两拍在中声部重现'), link('c', 'c-answer', '应句还接过长音，模仿进入后续材料')]),
    dialogue: bars(2, [
      upper(event('question', '问句', 1, 1, '高声部先唱，停在属和声')),
      lane('中声部', event('support', '和声衬托', 1, 2, '中声部跨过两句的交界，提供和声衬托')),
      lower(event('answer', '答句', 2, 1, '低声部接出相似动机，落回主音'))
    ], [link('question', 'answer', '问句停在属和声，答句完成回主')])
  },
  'fugato-layout': Object.fromEntries(['opening', 'middle'].map(choice => {
    const offset = choice === 'opening' ? 0 : 1;
    return [choice, bars(3 + offset, [
      upper(...(offset ? [event('opening', '主旋律', 1, 1, '赋格段前已有主调织体')] : []),
        event('theme', '主题 T', 1 + offset, 1, '高声部首先陈述主题'),
        event('continuation', '对位续句', 2 + offset, 1, '高声部延续，在下方答题旁作对位'),
        event('return', '主旋律', 3 + offset, 1, '上方恢复主旋律')),
      lower(...(offset ? [event('harmony', '和弦支撑', 1, 1, '主调段用和弦托住主旋律')] : []),
        event('answer', '答题 AT', 2 + offset, 1, '答题比主题晚一小节进入'),
        event('chord', '和弦支撑', 3 + offset, 1, '下方由答题转为和弦支撑'))
    ], [link('theme', 'answer', '两个入口构成局部赋格段')])];
  }))
};

const standalone = {
  'fifth-canon-relations': map('小节', 2, [
    lane('辅助谱表', { ...event('guide', 'A–A♯', 1, 1, '草稿预写下一轮的题头，先提高纯五度'), guide: true }),
    upper(event('tail', '尾句 C', 1, 1, '第 6 小节用长 C 配合前一句的低五度应句'),
      event('head', '题头 D–D♯', 2, 1, '第 7 小节高声部回到开头')),
    lower(event('previous', '前句 e′', 1, 1, '第 6 小节低声部仍唱前一句的应句'),
      event('answer', '应句 F', 2, 1, '下声部以 F 接唱上一小节的尾句 C'))
  ], [link('guide', 'head', '辅助题头降纯五度，得到实际唱出的 D–D♯'),
    link('tail', 'answer', '尾句也降纯五度，C 变成 F')], ['6', '7']),
  'invertible-sequence-relations': bars(3, [
    upper(event('a1', 'E–F–G', 1, 1, '第 1 小节，短短长的题头在上方'),
      event('a2', 'F–G–A', 2, 1, '原上声部在第 2 小节上移一级'),
      event('b3', 'E–G–E', 3, 1, '原下声部的较长旋律移到高处')),
    lower(event('b1', 'C–E–C', 1, 1, '第 1 小节，较长的旋律在下方'),
      event('b2', 'D–F–D', 2, 1, '原下声部也上移一级'),
      event('a3', 'G–A–B', 3, 1, '短短长的题头依旧上移一级，到了下方'))
  ], [link('a2', 'a3', '原高声部继续上移一级，并交换到低声部'),
    link('b2', 'b3', '原低声部继续模进，并交换到高声部')]),
  'bwv772-relations': map('小节', 4, [
    upper(event('a', 'C 题头', 1, 1, '第 1 小节第 1 拍内的第二个十六分音符从 C4 开始'),
      event('b', 'G 题头', 3, 1, '第 2 小节在同一位置从 G4 开始')),
    lower(event('a-copy', 'C 应句', 2, 1, '第 1 小节第 3 拍内的第二个十六分音符从 C3 开始'),
      event('b-copy', 'G 应句', 4, 1, '第 2 小节同一位置从 G3 开始'))
  ], [link('a', 'a-copy', '第一组相差两拍，低八度接应'),
    link('b', 'b-copy', '整组提高五度，应句依旧晚两拍、低八度')], ['1 前半', '1 后半', '2 前半', '2 后半']),
  'bwv777-relations': bars(8, [
    upper(event('t2', 'T₂ 切分', 1, 4, 'T₂ 晚一个十六分音符进入，并从弱位连接到下一小节'),
      event('t1-copy', 'T₁', 5, 4, '第 5–8 小节，平稳上行的 T₁ 移到上面')),
    lower(event('t1', 'T₁ 上行', 1, 4, 'T₁ 自第 1 小节开头从 E 起，以八分音符上行'),
      event('t2-copy', 'T₂', 5, 4, '切分下行的 T₂ 换到低声部'))
  ], [link('t1', 't1-copy', '同一主题的节奏保留，移到上声部'),
    link('t2', 't2-copy', '第 5 小节开始由下声部唱 T₂')]),
  'bwv791-relations': bars(4, [
    upper(event('head', 'B♭ 起句', 1, 1, '第 1 小节，高声部从第三拍前的 B♭ 起句')),
    lane('中声部', event('answer', 'F 应句', 2, 1, '第 2 小节，中声部在同一拍位从 F 接应')),
    lower(event('bass', '分解和弦背景', 1, 4, '低声部从开头就开始，以分解和弦形成贯穿的背景'))
  ], [link('head', 'answer', '中声部晚一小节，从低纯四度接应')]),
  'bwv801-relations': bars(6, [
    upper(event('b', '对题 B', 1, 2, '高声部先奏反复回到 F♯ 的对题'),
      event('c', '连接 C', 3, 1, '第 3 小节上方以连续短音连接两组材料'),
      event('a-copy', '主题 A', 4, 3, '主题移到高处，在第 6 小节初收束')),
    lower(event('a', '主题 A', 1, 3, '低声部从第 1 小节呈示主题，到第 3 小节初收束'),
      event('b-copy', '对题 B', 4, 2, '原来在高处的对题移到下方'),
      event('c-copy', '连接 C', 6, 1, '快速连接音型随对题移到低声部'))
  ], [link('a', 'a-copy', '主题从低声部移到高声部'), link('b', 'b-copy', '对题移到低声部'),
    link('c', 'c-copy', '后续连接音型也移到低声部')]),
  'modal-invention-relations': bars(10, [
    upper(event('theme', '主题 T', 1, 2, 'A 商主题先由高声部独奏'),
      event('counter', '对题 CT', 3, 2, '主题交给低声部后，上方开始固定对题'),
      event('theme-up', '主题 T', 5, 2, '主题换回高声部，从 E 起'),
      event('counter-invert', '对题倒影', 7, 2, '对题作倒影，回到上方'),
      event('theme-invert-up', '主题倒影', 9, 2, '倒影主题再次换到高声部')),
    lower(event('theme-copy', '主题 T', 3, 2, '第 3 小节由低声部低八度接过主题'),
      event('counter-copy', '对题 CT', 5, 2, '原对题换到低声部'),
      event('theme-invert', '主题倒影', 7, 2, '主题从 B 向下跳到 E，原来的上跳变成下跳'),
      event('counter-invert-copy', '对题倒影', 9, 2, '倒影对题换到低声部'))
  ], [link('theme', 'theme-copy', '主题低八度再次进入'), link('theme-copy', 'theme-up', '完整主题换回上方'),
    link('counter', 'counter-copy', '对题与主题交换位置'), link('theme-up', 'theme-invert', '变成倒影后在下方出现'),
    link('theme-invert', 'theme-invert-up', '倒影主题由下换到上'), link('counter-invert', 'counter-invert-copy', '倒影对题同时换到下方')]),
  'bwv847-relations': map('小节', 4, [
    upper(event('answer', '答题 AT', 2, 1, '第 3 小节，高声部在 g 小调答题'),
      event('ct1-high', '对题 CT₁', 4, 1, '低声部加入时，高声部改唱第一对题')),
    lane('中声部', event('t', '主题 T', 1, 1, '第 1 小节，中声部在 c 小调唱主题'),
      event('ct1', '对题 CT₁', 2, 1, '答题出现时，中声部转入第一对题'),
      event('ct2', '对题 CT₂', 4, 1, '低声部主题进入时，中声部唱第二对题')),
    lower(event('t-low', '主题 T', 4, 1, '第 7 小节主题从低声部展开，三条线首次同时承担 T、CT₁、CT₂'))
  ], [link('t', 'answer', '主题从中声部进入，继而在高声部答题'),
    link('answer', 't-low', '间插段之后，低声部作第三次主题进入'),
    link('ct1', 'ct1-high', '第一对题随后交给高声部')], ['1–2', '3–4', '5–6', '7–8'])
};

for (const panel of document.querySelectorAll('[data-counterpoint-relation]')) {
  mountVoiceRelations(panel, standalone[panel.id]);
}

export function mountScoreRelations(element, variants) {
  const region = element.querySelector('[data-score-relations]');
  if (!region) return () => {};
  const maps = new Map();
  return choice => {
    const config = variants[choice]?.relations ?? relations[element.id]?.[choice];
    region.hidden = !config;
    if (!config) return;
    if (!maps.has(choice)) {
      const panel = document.createElement('div');
      panel.innerHTML = '<div class="timeline-frame" data-voice-timeline></div><output class="music-demo-cue" data-voice-description></output>';
      region.append(panel);
      mountVoiceRelations(panel, config);
      maps.set(choice, panel);
    }
    for (const [key, panel] of maps) panel.hidden = key !== choice;
  };
}
