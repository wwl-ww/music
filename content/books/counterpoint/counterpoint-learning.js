const idea = ['C5', 'D5', 'E5', 'G5'];
const ending = ['G5', 'F5', 'E5', 'C5'];
const rhythm = [1, 1, 2, 4];
const octaveBelow = pitches => pitches.map(pitch => pitch.replace(/\d$/, octave => Number(octave) - 1));
const twoPhrases = [...idea, ...ending];
const twoRhythms = [...rhythm, ...rhythm];

export function learningScores({ line, phrase, demo }) {
  function named(pitches, lengths, bars, delay = 0) {
    return line(pitches, lengths, bars, { pitchLabels: true, delay });
  }

  function score(voices, description, clef = 'G2') {
    return demo(phrase(voices, 'C', clef), description, 84);
  }

  const oneBar = named(idea, rhythm, 1);
  const subject = named(twoPhrases, twoRhythms, 2);
  const lowerIdea = octaveBelow(idea);
  const lowerSubject = octaveBelow(twoPhrases);
  const fifthAnswer = ['G4', 'A4', 'B4', 'D5'];
  const tonalAnswer = ['G4', 'A4', 'B4', 'C5'];
  const fragment = ['C5', 'D5', 'E5'];
  const sequence = [...fragment, 'D5', 'E5', 'F5'];
  const sequenceRhythm = [1, 1, 2, 1, 1, 2];
  const fixedCounterline = named(['C4', 'G3', 'C4', 'E4'], [2, 2, 2, 2], 1);

  return {
    'path-two-lines': {
      alone: score([oneBar], '第 3、4 拍都由同一个 G 占据，留出了容纳另一条线的时间。'),
      doubled: score([oneBar, named(lowerIdea, rhythm, 1)], '两个谱表在同一时刻换音，旋律的节奏仍只有一种。'),
      independent: score([oneBar, fixedCounterline], '上方的 G 延续两拍，下方在同一时段从 C 走到 E。两条线有各自的换音时刻。')
    },
    'path-canon': {
      head: score([named(twoPhrases, twoRhythms, 3), named([...lowerIdea, 'E4', 'D4'], [...rhythm, 4, 4], 3, 2)], '下方晚一拍重述第一句。到了第二句，下方改为自己的音调。'),
      continue: score([named(twoPhrases, twoRhythms, 3), named(lowerSubject, twoRhythms, 3, 2)], '下方也照着上方的第二句继续走，第二句的开头同样相差一拍。'),
      wider: score([named(twoPhrases, twoRhythms, 3), named(lowerSubject, twoRhythms, 3, 4)], '两条旋律保持原样，第二声部的两个入口都推迟到两拍以后。')
    },
    'path-motive': {
      idea: score([oneBar], '末尾的 G 是长音，前面的 C–D–E 是一个完整的短动作。'),
      sequence: score([named(sequence, sequenceRhythm, 1)], '两个三音单位的起音时值相同，第二组从高一级的 D 开始。'),
      phrase: score([named([...sequence, 'E5', 'F5', 'G5', 'C5'], [...sequenceRhythm, 1, 1, 2, 4], 2),
        named(['C4', 'D4', 'E4', 'C4'], [4, 4, 4, 4], 2)], '动机在上方连着上移，到了末尾改落回 C。低声部也回到 C，段落在这里收住。')
    },
    'path-inversion': {
      original: score([oneBar], 'D 是轴。原句的 C 在 D 下方，E 和 G 在 D 上方。'),
      reflected: score([named(['E5', 'D5', 'C5', 'A4'], rhythm, 1)], 'D 留在原位。C 和 E 互换，G 到 D 的距离翻到 D 下方得到 A。'),
      paired: score([named(['E5', 'D5', 'C5', 'A4'], rhythm, 1), named(['C4', 'E4', 'A4'], [4, 2, 2], 1)], '原来的短节奏仍在上方。下方用较长的音与它结合，在 A 上会合。')
    },
    'path-answer': {
      exact: score([named(fifthAnswer, rhythm, 2, 8), named(lowerIdea, rhythm, 2)], '下方主题先响。上方答题把每个音移高纯五度，长音落到 D。'),
      tonal: score([named(tonalAnswer, rhythm, 2, 8), named(lowerIdea, rhythm, 2)], '答题长音改在 C。主题的大支点是 C→G，答题把它调成 G→C。'),
      counter: score([named(tonalAnswer, rhythm, 2, 8), named([...lowerIdea, 'E4', 'F4', 'E4'], [...rhythm, 2, 2, 4], 2)], '上方仍唱守调答题。下方从唱主题改为唱新线条，对题开始和答题同时进行。')
    },
    'path-episode': {
      theme: score([subject], '两小节完整陈述有清楚的句尾，最后在 C 收束。'),
      fragment: score([named([...sequence, 'E5', 'F5', 'G5', 'G5'], [...sequenceRhythm, 1, 1, 2, 4], 2),
        named(['C4', 'D4', 'E4', 'G4'], [4, 4, 4, 4], 2)], '两小节只发展主题首部组成的片段，停在 G，为下一次进入留出空间。'),
      return: score([named([...sequence, 'E5', 'F5', 'G5', 'G5', ...twoPhrases], [...sequenceRhythm, 1, 1, 2, 4, ...twoRhythms], 4),
        named(['C4', 'D4', 'E4', 'G4', 'C4', 'G4', 'C4'], [4, 4, 4, 4, 8, 4, 4], 4)], '前两小节连接和铺垫。从第三小节起，熟悉的完整旋律在 C 上回来。')
    },
    'path-modal-centers': {
      gong: score([named([...idea, 'A5', 'G5', 'E5', 'C5'], twoRhythms, 2), named(['C4', 'G4', 'E4', 'C4'], [4, 4, 4, 4], 2)], 'G 是第一句的停顿音，最后落在 C，并由下方的 C 托住。'),
      yu: score([named(['A4', 'C5', 'D5', 'E5', 'G5', 'E5', 'D5', 'A4'], twoRhythms, 2), named(['A3', 'E4', 'G4', 'A3'], [4, 4, 4, 4], 2)], '仍用同样的五个音级。骨干改为 A、E，最后由两线共同收在 A。')
    },
    'path-heterophony': {
      skeleton: score([named(idea, [2, 2, 2, 2], 2), named(lowerIdea, [2, 2, 2, 2], 2)], '上下声部在每拍同时到达同名音，形成八度上的共同骨架。'),
      decorated: score([named(['C5', 'E5', 'D5', 'E5', 'E5', 'D5', 'G5'], [1, 1, 1, 1, 1, 1, 2], 2),
        named(lowerIdea, [2, 2, 2, 2], 2)], '上方多了拍内的装饰音。每拍一开始，两个声部仍到达相同的骨干音。'),
      delayed: score([named(idea, [2, 2, 2, 2], 2), named(lowerIdea, [2, 2, 2, 2], 2, 2)], '下方仍唱完全一样的音，但进入整整晚一拍，支点随整句后移。')
    },
    'path-foreground': {
      chords: score([subject, '(C3 E3 G3).1 | (G2 B2 D3).2 (C3 E3 G3).2'], '低声以和弦支撑上方旋律。两次和弦变化和乐句的收束相配。', 'F4'),
      response: score([subject, named(['E4', 'F4', 'E4', 'G4', 'E4', 'C4'], [1, 1, 2, 1, 1, 2], 2, 4)], '下方回应上方的长音。上方一回来，下方仍以衬托句为主。'),
      handoff: score([named([...idea, 'G5', 'E5', 'C5'], [...rhythm, 2, 2, 4], 2), named(lowerSubject.slice(0, 5), [...rhythm, 4], 2, 4)], '下方唱出完整的开头，随后两条线同时发展。这一小段的主题在两个声部之间交接。')
    }
  };
}
