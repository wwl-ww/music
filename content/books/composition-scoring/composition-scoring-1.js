import { mountScoringChoices, part } from './composition-scoring-1-2-demos.js';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';

mountArrangementGrid(document.getElementById('scoring-breakbeat-grid'), {
  beats: 4,
  subdivisions: 2,
  label: '鼓组起音与贝斯延续，每拍分两格',
  rows: [
    { label: 'A · 底鼓', events: [{ step: 0, accent: true }, { step: 5 }] },
    { label: 'A · 小鼓', events: [{ step: 2 }, { step: 6 }] },
    { label: 'B · 手鼓', events: [{ step: 3 }, { step: 7 }] },
    { label: '贝斯', events: [{ step: 0, length: 6 }] }
  ]
});

const triple = { meter: '3 4' };
const low = { clef: 'F4' };
const lead = (notes, options) => part('旋律', 0, notes, options);
const harmony = (notes, options) => part('和弦', 0, notes, options);
const bass = (notes, options = low) => part('低音', 0, notes, options);

const openingTheme = lead('E4.4 G4.4 E4.4 | B4.4 G4.2 | A4.4 F4.2 | F4.4 D4.2 | C4.4 E4.2', triple);
const openingEnd = '(E3 G3 B3 D4).2 { d } | (D3 F3 A3 C4).2 { d } | (G3 B3 D4 F4).2 { d } | (C3 E3 G3 B3).2 { d }';
mountScoringChoices('scoring-subdominant-start', 100, {
  iv: {
    description: 'Fmaj7 起始，旋律沿原来的音高前进，主和弦到末尾才出现。',
    tracks: [openingTheme, bass(`(F3 A3 C4 E4).2 { d } | ${openingEnd}`, { ...low, ...triple })]
  },
  i: {
    description: 'Cmaj7 起始，C 大调的中心在第一小节就得到确认。后四小节沿用同一进行。',
    tracks: [openingTheme, bass(`(C3 E3 G3 B3).2 { d } | ${openingEnd}`, { ...low, ...triple })]
  }
});

const pedalHarmony = harmony('(A3 C4 E4 G4).1 | (D4 F#4 A4).1 | (A3 C4 E4 G4).1 | (G3 B3 D4).1');
mountScoringChoices('scoring-pedal-view', 130, {
  pedal: {
    description: '四小节低音均为 A，上方 Am7、D、Am7、G 照常变化。',
    tracks: [pedalHarmony, bass('A2.1 | A2.1 | A2.1 | A2.1')]
  },
  roots: {
    description: '上方声部相同，低音按 A–D–A–G 运动，和弦的重心随它改变。',
    tracks: [pedalHarmony, bass('A2.1 | D3.1 | A2.1 | G2.1')]
  }
});

const farewellTheme = harmony('(A3 C4 E4).2 (C4 E4 C5).2 | (A3 C4 E4).2 (A3 C4 E4).2 | (A3 C4 E4).2 (G3 B3 D4).2');
mountScoringChoices('scoring-chromatic-descent', 80, {
  descent: {
    description: '低音逐半音从 A 下降到 E，上层声部缓慢改变。',
    tracks: [farewellTheme, bass('A2.2 Ab2.2 | G2.2 F#2.2 | F2.2 E2.2')]
  },
  held: {
    description: '上层保持原样，低音六次都弹 A。开头的大跳仍在，半音下行的暗线消失。',
    tracks: [farewellTheme, bass('A2.2 A2.2 | A2.2 A2.2 | A2.2 A2.2')]
  }
});

const dateHarmony = bass('(C3 E3 G3).2 (Bb2 D3 F3).2 | (C3 E3 G3).2 (Bb2 D3 F3).2 | (C3 E3 G3).1');
mountScoringChoices('scoring-first-date-density', 150, {
  spaced: {
    description: '♩＝150，和弦仍每两拍往返，旋律给若干拍留出空间。',
    tracks: [lead('E4.4 G4.4 F4.2 | E4.8 G4.8 C5.4 D5.4 r.4 | E5.2 C5.2'), dateHarmony]
  },
  filled: {
    description: '速度、和弦与句尾落音相同。前两小节都改为持续八分音符，拍间不再留空。',
    tracks: [lead('E4.8 G4.8 E4.8 G4.8 F4.8 D4.8 F4.8 D4.8 | E4.8 G4.8 C5.8 E5.8 D5.8 Bb4.8 D5.8 F5.8 | E5.2 C5.2'), dateHarmony]
  }
});

const fMajor = { key: 'F' };
const firstLoveBass = bass('Bb2.1 | F2.1', { ...low, ...fMajor });
mountScoringChoices('scoring-fsus-ending', 90, {
  held: {
    description: 'B♭ 和弦的 B♭ 在 F 低音上多留两拍，随后落到 A。',
    tracks: [harmony('(D4 F4 Bb4).1 | (C4 F4 Bb4).2 (C4 F4 A4).2', fMajor), firstLoveBass]
  },
  plain: {
    description: 'F 低音一来，顶音就从 B♭ 直接落到 A。和弦仍按 IV–I 进行。',
    tracks: [harmony('(D4 F4 Bb4).1 | (C4 F4 A4).2 (C4 F4 A4).2', fMajor), firstLoveBass]
  }
});

const gMajor = { key: 'G' };
const coastBass = { ...gMajor, clef: 'F4' };
const coastTheme = lead('B4.2 D5.2 | C5.4 B4.4 A4.2 | D5.2 F#5.2', gMajor);
mountScoringChoices('scoring-driving-bass', 130, {
  moving: {
    description: '低音反复起音并穿过拍间，主旋律和 G–A–B 的根音方向保持。',
    tracks: [coastTheme, bass(
      'G2.8 G2.8 D3.8 G2.8 B2.16 A2.16 G2.8 D3.8 G2.8 | A2.8 A2.8 E3.8 A2.8 C3.16 B2.16 A2.8 E3.8 A2.8 | B2.8 B2.8 F#3.8 B2.8 D3.16 C3.16 B2.8 F#3.8 B2.8',
      coastBass)]
  },
  open: {
    description: '根音仍是 G–A–B，每个根音持续一小节。前进感更多来自旋律和和弦方向。',
    tracks: [coastTheme, bass('G2.1 | A2.1 | B2.1', coastBass)]
  }
});

const tensionBass = bass('A2.1 | A2.1 | G#2.2 E2.2 | E2.2 A2.2');
const tensionEnding = '(B3 D4 G#4).2 (B3 D4 G#4).2 | (D4 G#4 F5 C6).2 (A3 C4 E4).2';
mountScoringChoices('scoring-diminished-tension', 90, {
  diminished: {
    description: 'Am 到 Adim 时只降五音，上声部围绕 E 产生半音摆动。后半句再经过 G♯dim 和 E7 回到 Am。',
    tracks: [harmony(`(A3 C4 E4).2 (A3 C4 Eb4).2 | (A3 C4 E4).2 (A3 C4 Eb4).2 | ${tensionEnding}`), tensionBass]
  },
  constant: {
    description: '前两小节重复同一 Am 和弦，起音与时值保持。后两小节仍采用原来的和声。',
    tracks: [harmony(`(A3 C4 E4).2 (A3 C4 E4).2 | (A3 C4 E4).2 (A3 C4 E4).2 | ${tensionEnding}`), tensionBass]
  }
});

const arpeggioBass = bass('E3.1 | C3.1 | A2.1 | E3.1');
const slowArpeggios = '(G#3 B3 D#4).1';
mountScoringChoices('scoring-arpeggio-leap', 96, {
  leaps: {
    description: 'Em9、Cmaj9、Am9 上依次跳高、折返，末尾改用持续的大七和弦。',
    tracks: [harmony(`G4.8 D5.8 F#5.8 D5.8 G4.8 D5.8 F#5.8 D5.8 | E4.8 B4.8 D5.8 B4.8 E4.8 B4.8 D5.8 B4.8 | C4.8 G4.8 B4.8 G4.8 C4.8 G4.8 B4.8 G4.8 | ${slowArpeggios}`), arpeggioBass]
  },
  held: {
    description: '低音沿用 E–C–A，几处跳跃音型提前换成持续的大七和弦，场景更早静下来。',
    tracks: [harmony(`${slowArpeggios} | (E4 G4 B4).1 | (C#4 E4 G#4).1 | ${slowArpeggios}`), arpeggioBass]
  }
});

const bbMajor = { key: 'Bb' };
const parkBass = bass('Bb2.4 Bb2.4 Bb2.4 Bb2.4 | G2.4 G2.4 G2.4 G2.4', { ...low, ...bbMajor });
mountScoringChoices('scoring-park-syncopation', 120, {
  sync: {
    description: '和弦从第 1 拍后半发音，延续越过第 2 拍的拍头，低音保持正拍。',
    tracks: [harmony('r.8 (Bb4 Eb5).4 (Bb4 D5).8 r.8 (A4 C5).4 (Bb4 D5).8 | r.8 (Bb4 Eb5).4 (Bb4 D5).8 r.8 (A4 C5).4 (Bb4 D5).8', bbMajor), parkBass]
  },
  straight: {
    description: '顶音仍然是 E♭–D–C–D，和弦与低音同时落在每一拍拍头。',
    tracks: [harmony('(Bb4 Eb5).4 (Bb4 D5).4 (A4 C5).4 (Bb4 D5).4 | (Bb4 Eb5).4 (Bb4 D5).4 (A4 C5).4 (Bb4 D5).4', bbMajor), parkBass]
  }
});
