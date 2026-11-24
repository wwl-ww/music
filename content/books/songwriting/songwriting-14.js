import { lyricBars, mountSongVariants } from './songwriting-score.js';

function songPhrase(words, bars) {
  return String.raw`\ks C \ts (4 4) ${lyricBars(words, bars)}`;
}

mountSongVariants('song-melisma-length', {
  syllabic: {
    tempo: 78,
    notes: songPhrase('风过石桥', ['G4.4 A4.4 G4.4 C4.4']),
    summary: '每个字配一个音，四个字和乐句在一小节内收束。'
  },
  short: {
    tempo: 78,
    notes: songPhrase('风过石桥', ['G4.4 A4.4 G4.4 E4.8/sing/bridge C4.8/held/bridge']),
    summary: '“桥”在两个音高上唱，整句仍保持一小节。'
  },
  extended: {
    tempo: 78,
    notes: songPhrase('风过石桥', [
      'G4.4 A4.4 G4.4/sing/stone A4.8/held B4.8/held',
      'C5.4/held B4.8/held A4.8/held G4.4/held E4.4/held/stone',
      'C4.2 r.2'
    ]),
    summary: '“石”字的行腔跨过小节线，先上扬再回落。第 3 小节才唱“桥”，结尾因而推迟。'
  }
});

const firstStatement = 'G4.8 A4.8 C5.4 B4.4 G4.4';
const finalStatement = 'E4.4 D4.4 C4.2';

mountSongVariants('song-word-repeat', {
  once: {
    tempo: 86,
    notes: songPhrase('岸边灯亮了', [firstStatement]),
    summary: '末字停在 G，保留继续推进的空间。'
  },
  cadence: {
    tempo: 86,
    notes: songPhrase('岸边灯亮了灯亮了', [firstStatement, finalStatement]),
    summary: '同一词尾重新起音，第二次放慢到半音符并落在主音 C，完成收束。'
  },
  contrast: {
    tempo: 86,
    notes: songPhrase('岸边灯亮了灯亮了', ['G4.8 A4.8 C5.8 B4.8 G4.4 r.4', finalStatement]),
    summary: '前一句的“灯亮”收紧为两个八分音符，词尾复唱保留较宽的时值。句中多了一处呼吸间隔。'
  }
});

const mainVerse = lyricBars('小船沿水走一盏晚灯留', ['E4.8 G4.8 A4.4 G4.4 E4.4', 'F4.8 E4.8 D4.4 E4.4 C4.4']);
const fillerVerse = lyricBars('啦啦啦啦啦啦啦啦啦', ['G4.8 A4.8 C5.4 B4.4 A4.4', 'G4.4 E4.4 D4.4 C4.4']);

mountSongVariants('song-filler-structure', {
  padding: {
    tempo: 86,
    notes: songPhrase('河上呀晚风来', ['G4.8 A4.8 G4.8 E4.8 D4.4 C4.4']),
    summary: '“呀”插在“河上”和“晚风来”之间，仍在一小节内完成一句。'
  },
  section: {
    tempo: 86,
    notes: String.raw`\ks C \ts (4 4) \section ("A · 正词") ${mainVerse} | \section ("B · 衬词") ${fillerVerse}`,
    summary: '正词已在 C 收束。随后的“啦”段从较高的音区重新起句，自成两小节，再落回 C。'
  }
});
