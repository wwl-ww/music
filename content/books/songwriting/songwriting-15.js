import { lyricBars, mountSongVariants } from './songwriting-score.js';
import { labelPhrase } from './songwriting-phrase-material.js';

const bridgeLine = '山风吹过旧石桥';
const tune = (meter, text, bars) => String.raw`\ks C \ts (${meter}) ${lyricBars(text, bars)}`;
const call = labelPhrase('领', lyricBars('拉稳绳呀', ['A4.8 C5.8 A4.8 A4.8']));
const response = labelPhrase('和', lyricBars('一齐拉', ['E4.8 D4.8 C4.4']));
const theatricalVoice = [
  lyricBars('且听风声我转身', ['G4.8 E4.8 F4.8 D4.8', 'C4.8 E4.8 G4.4']),
  labelPhrase('过门', 'r.2'),
  lyricBars('又见灯火照归人', ['E4.8 G4.8 A4.8 G4.8', 'F4.8 D4.8 C4.8/sing/end D4.16/held C4.16/held/end']),
  'r.2'
].join(' | ');

mountSongVariants('song-genre-character', {
  lyrical: {
    tempo: 74,
    notes: tune('3 4', bridgeLine, ['C4.4 E4.4 G4.4', 'A4.4 G4.4 E4.4', 'D4.4/sing/bridge C4.2/held/bridge']),
    summary: '句头逐渐展开，末字唱两个音后停在 C。三拍的长度在这里承载一条舒展的抒情线。'
  },
  procession: {
    tempo: 114,
    notes: tune('2 4', bridgeLine, ['C4.8 E4.8 G4.4', 'C5.8 C5.8 G4.8 C4.8']),
    summary: '二拍脉冲清楚，围绕主三和弦写短小音型，便于多位歌者同时起声与换气。'
  },
  dance: {
    tempo: 126,
    notes: tune('3 4', bridgeLine, ['G4.4 E4.8 G4.8 A4.4', 'G4.4 E4.4 C4.4']),
    summary: '同为三拍，较明确的每小节起拍与轻快的八分音符组成短小的舞蹈律动。'
  },
  narrative: {
    tempo: 90,
    notes: tune('4 4','我沿山路去寻你',['E4.4 E4.8 E4.8 F4.4 E4.4','G4.2 E4.2']),
    summary: '短密的同音组交代叙述内容，句尾拉宽，听感由近似说话转为歌唱。'
  },
  humorous: {
    tempo: 108,
    notes: tune('2 4','猫儿踩响空纸箱',['G4.8 r.8 G4.8 C5.8','G4.8 r.8 A4.8 C5.8','G4.2']),
    summary: '两处短休止和突出的上跳形成停顿与夸张。这个片段示范幽默诙谐的节奏处理。'
  },
  work: {
    tempo: 106,
    notes: String.raw`\ks C \ts (2 4) ${call} | ${response} | ${call} | ${response}`,
    summary: '每次一小节领唱接一小节应和，应答节奏固定，方便把动作落在相同拍点。'
  },
  theatrical: {
    tempo: 82,
    notes: String.raw`\ks C \ts (2 4) ${theatricalVoice} || \staff { score } \tuning (none) \clef F4
      (C3 G3).4 G3.8 E3.8 | (C3 G3).4 E3.8 G3.8 | A3.16 G3.16 E3.8 F3.8 D3.8 |
      (C3 G3).4 G3.8 E3.8 | (G2 D3).4 (C3 G3).4 | G3.8 E3.8 C3.4`,
    summary: '上句停在 G，伴奏接一小节过门并引出下句。下句以“人”字拖腔落在 C，伴奏再接短收尾。'
  }
});
