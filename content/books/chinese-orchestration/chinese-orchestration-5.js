import { mountEnsembleStudy, part } from './ensemble-study.js';

const dizi = phrase => part('曲笛', 73, phrase);
const hu = (phrase, name = '二胡') => part(name, 110, phrase);
const pipa = phrase => part('琵琶', 105, phrase);
const xiao = phrase => part('洞箫', 77, phrase);
const sheng = phrase => part('笙', 20, phrase);
const top = 'G5.4 A5.4 G5.2 | E5.2 D5.4 G5.4';
const lower = 'G4.4 A4.4 G4.2 | E4.2 D4.4 G4.4';
const decorated = 'G5.8 A5.8 A5.4 G5.2 | E5.4 G5.8 E5.8 D5.4 G5.4';
const filled = 'G4.4 A4.4 G4.8 E4.8 D4.8 G4.8 | E4.2 D4.4 G4.4';

mountEnsembleStudy('silk-texture', {
  unison: {
    detail: '笛和胡琴的骨干音、时值都相同，胡琴全句低一个八度。',
    tracks: [dizi(top), hu(lower)]
  },
  branches: {
    detail: '第一小节后两拍由胡琴加花，第二小节前两拍由笛加花。两条线在骨干音和句尾汇合。',
    tracks: [dizi('G5.4 A5.4 G5.2 | E5.8 D5.8 E5.8 G5.8 D5.4 G5.4'), hu(filled)]
  },
  chordal: {
    detail: '笛保持母句，笙用自己的时值延续和音，支持旋律的和声色彩。',
    tracks: [dizi(top), sheng('(G4 D5).2 (A4 E5).2 | (C5 G5).2 (G4 D5).2')]
  }
});

mountEnsembleStudy('silk-ban-variation', {
  ornamented: {
    detail: '笛在第一拍和第二小节加邻音，胡琴把第一小节最后的长音拆成四个八分音符。',
    tracks: [dizi(decorated), hu(filled, '四胡')]
  },
  clear: {
    detail: '两部收回到相同起音与时值，乐句仍保留原来的八度层次。',
    tracks: [dizi(top), hu(lower, '四胡')]
  }
});

mountEnsembleStudy('silk-contrast', {
  connected: {
    detail: '胡琴维持半音符长度，琵琶起音落在每个长音的后半段。',
    tracks: [hu('A4.2 G4.2 | E4.2 G4.2', '粤胡'), pipa('r.4 A4.8 E4.8 r.4 G4.8 D4.8 | r.4 E4.8 D4.8 r.4 G4.8 E4.8')]
  },
  points: {
    detail: '短拨由第一拍后半起音，声音越过第二拍即收住。下一小节胡琴和琵琶同奏短句。',
    tracks: [hu('A4.4 r.4 G4.8 E4.8 D4.4 | G4.8 A4.8 r.4 E4.8 D4.8 G4.4', '粤胡'),
      pipa('r.8 A4.4 r.8 G4.8 E4.8 D4.4 | G4.8 A4.8 r.4 E4.8 D4.8 G4.4')]
  }
}, 96);

mountEnsembleStudy('silk-joint-ending', {
  converge: {
    detail: '两部先各自分句，第二小节第三拍一起进入 D–G 合尾，相隔八度。',
    tracks: [xiao(decorated), pipa(filled)]
  },
  separate: {
    detail: '琵琶在第二小节末保持自己的细分节奏，催促感延续到最终同音。',
    tracks: [xiao(decorated), pipa('G4.4 A4.4 G4.8 E4.8 D4.8 G4.8 | E4.2 D4.8 E4.8 A4.8 G4.8')]
  }
});

mountEnsembleStudy('silk-cui', {
  plain: {
    detail: '洞箫和二弦以同一时值奏四个骨干音。',
    tracks: [xiao('G5.4 A5.4 E5.4 D5.4'), hu('G4.4 A4.4 E4.4 D4.4', '二弦')]
  },
  repeat: {
    detail: '每个骨干音在二弦上分两弓，洞箫保持四分音符。',
    tracks: [xiao('G5.4 A5.4 E5.4 D5.4'), hu('G4.8 G4.8 A4.8 A4.8 E4.8 E4.8 D4.8 D4.8', '二弦')]
  },
  fill: {
    detail: '二弦每拍用一短一长的固定节奏填邻音，每拍起点仍是原来的骨干音。',
    tracks: [xiao('G5.4 A5.4 E5.4 D5.4'), hu('G4.16 A4.8 { d } A4.16 G4.8 { d } E4.16 G4.8 { d } D4.16 E4.8 { d }', '二弦')]
  }
}, 104);
