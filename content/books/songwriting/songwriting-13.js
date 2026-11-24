import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { lyricBars, mountSongVariants } from './songwriting-score.js';

const cCadence = '(G2 B2 D3 F3).2 (C3 E3 G3).2';
const firstBar = 'G4.4 F#4.8 G4.8 E4.4 G4.4';
const cClose = 'F4.4 D4.4 C4.2';
const sharedMelody = lyricBars('风绕回山前云落下', [firstBar, cClose]);
const towardG = '(C3 E3 G3).4 (D3 A3 C4).8 (G2 B2 D3).8 (G2 B2 D3).2';
const cIntroduction = lyricBars('微光照过旧石桥', ['C4.4 E4.4 G4.4 E4.4', cClose]);
function accompanied(melody, bass) {
  return String.raw`\ks C \ts (4 4) ${melody} || \staff { score } \tuning (none) \clef F4 ${bass}`;
}

function compareFSharp(melody, bass) {
  return accompanied(
    String.raw`\section ("C 大调") ${cIntroduction} | \section ("F♯–G") ${melody}`,
    '(C3 E3 G3).1 | ' + cCadence + ' | ' + bass
  );
}

mountSongVariants('song-chromatic-purpose', {
  neighbor: {
    tempo: 84,
    notes: compareFSharp(
      sharedMelody,
      '(C3 E3 G3).1 | ' + cCadence
    ),
    summary: '前两小节以 G7–C 收住。第 3 小节的 F♯ 从下方回到 G，伴奏始终是 C 和弦。'
  },
  passing: {
    tempo: 84,
    notes: accompanied(
      lyricBars('水映着微光落下', ['D4.4 D#4.8 E4.8 G4.2', 'F4.4 D4.4 C4.2']),
      '(C3 E3 G3).1 | ' + cCadence
    ),
    summary: 'D♯ 位于 D 与 E 之间，让向上的大二度分成两个半音。本调的归宿没有改变。'
  },
  color: {
    tempo: 84,
    notes: accompanied(
      lyricBars('青山远灯影长两岸静暮色深', ['C4.4 D4.4 E4.2', 'F4.4 D4.4 C4.2', 'C4.4 D4.4 Eb4.2', 'F4.4 D4.4 C4.2']),
      '(C3 G3).1 | ' + cCadence + ' | (C3 G3).1 | ' + cCadence
    ),
    summary: '两句的节奏和归宿相同，后一句把长音 E 换成 E♭，于是同一个主音周围出现不同色彩。'
  },
  tonicized: {
    tempo: 84,
    notes: compareFSharp(
      sharedMelody,
      towardG + ' | ' + cCadence
    ),
    summary: '旋律与下助音版本相同。第 3 小节的 F♯ 和伴奏合成 D7，再在 G 和弦上解决。第 4 小节以 G7–C 回到原调。'
  },
  modulate: {
    tempo: 84,
    notes: compareFSharp(
      lyricBars('风绕回山前云落下过溪风起回山下', [firstBar, 'F#4.4 A4.4 G4.2', 'B4.4 D5.4 A4.4 F#4.4', 'A4.4 F#4.4 G4.2']),
      towardG + ' | (D3 F#3 A3 C4).2 (G2 B2 D3).2 | (G2 B2 D3).2 (D3 F#3 A3 C4).2 | (D3 F#3 A3 C4).2 (G2 B2 D3).2'
    ),
    summary: '前 3 小节与离调版本相同。第 4 小节起围绕 G 继续展开，最后再以 D7–G 终止。'
  }
});

const opening = lyricBars('雨后溪岸草色新绿', ['C4.4 E4.4 G4.4 E4.4', 'D4.8 F4.8 E4.4 C4.2']);
const preparation = lyricBars('循着水声穿过树林', ['D4.4 F#4.4 A4.4 F#4.4', 'G4.4 A4.4 B4.4 G4.4']);
const newKey = lyricBars('岭上风起衣角飞扬天边留着最后微光', [
  'B4.4 D5.4 C5.4 B4.4', 'A4.4 G4.4 F#4.4 A4.4', 'D5.4 C5.4 A4.4 F#4.4', 'B4.8 A4.8 G4.4 G4.2'
]);

mountFormAnalysis(document.getElementById('song-modulation-layout'), {
  score: {
    tempo: 90,
    notes: accompanied(String.raw`\section ("A") ${opening} | ${preparation} | \ks G \section ("B") ${newKey}`, [
      '(C3 E3 G3).1', '(F3 A3 C4).2 (C3 E3 G3).2',
      '(D3 F#3 A3 C4).1', '(G3 B3 D4).1',
      String.raw`\ks G (G3 B3 D4).1`, '(C3 E3 G3).2 (D3 F#3 A3 C4).2',
      '(D3 F#3 A3 C4).1', '(G3 B3 D4).1'
    ].join(' | '))
  },
  sections: [
    { id: 'old-key', label: 'A · 原调', first: 1, last: 2, material: 'C 大调，回到 C 和弦完成第一句' },
    { id: 'transition', label: 'A · 转调准备', first: 3, last: 4, material: 'D7–G 已把听觉从 C 引向 G，仍处在 A 段尾句' },
    { id: 'new-key', label: 'B · 新调', first: 5, last: 8, material: 'G 大调继续展开，再以 D7–G 结束' }
  ]
});
