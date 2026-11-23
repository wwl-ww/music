// 黄阮《小创意曲》, transcribed from the sixteen-bar score.
const theme = [
  'A4.8 E5.16 E5.16 D5.8 { d } D5.16 B4.16 E5.16 D5.16 B4.16 A4.4',
  'G4.16 { d } B4.32 A4.16 G4.16 E4.16 D4.16 E4.16 G4.16 A4.8 D5.8 B4.16 A4.16 G4.16 B4.16'
];
const countertheme = [
  'A4.4 B4.16 A4.16 G4.16 A4.16 B4.16 G4.16 A4.16 B4.16 D5.8 E4.16 D4.16',
  'E4.4 G4.16 A4.16 G4.16 E4.16 D4.16 D5.16 B4.16 A4.16 G4.16 A4.16 B4.16 D5.16'
];
const octaveDown = music => music.replace(/([A-G]#?)(\d)(?=\.)/g, (_, pitch, octave) => pitch + (Number(octave) - 1));
const tag = (music, label) => music.replace(/^\S+/, '$& { txt "' + label + '" }');
const markTheme = music => tag(music, 'T');
const markCountertheme = music => music.replace(/(B[34]\.16|F#4\.16)(?= )/, '$& { txt "CT" }');

const treble = [
  markTheme(theme[0]), theme[1],
  markCountertheme(countertheme[0]), countertheme[1],
  'E5.8 { txt "T" } B5.16 B5.16 A5.8 { d } A5.16 F#5.16 B5.16 A5.16 F#5.16 E5.4',
  'D5.16 { d } F#5.32 E5.16 D5.16 B4.16 A4.16 B4.16 D5.16 E5.8 A5.8 F#5.16 E5.16 D5.16 F#5.16',
  'E5.4 A4.16 { txt "对题倒影" } B4.16 C#5.16 B4.16 A4.16 C#5.16 B4.16 A4.16 F#4.8 E5.16 F#5.16',
  'E5.4 C#5.16 B4.16 C#5.16 E5.16 F#5.16 G4.16 A4.16 B4.16 C#5.16 B4.16 A4.16 F#5.16',
  'E5.8 { txt "主题倒影" } A4.16 A4.16 B4.8 { d } B4.16 D5.16 A4.16 B4.16 D5.16 E5.4',
  'F#5.16 { d } D5.32 E5.16 F#5.16 A5.16 B5.16 A5.16 F#5.16 E5.8 A4.8 D5.16 E5.16 F#5.16 D5.16',
  markCountertheme(countertheme[0].replace('A4.4', 'E5.8 A4.8')), countertheme[1].replace(/D5\.16$/, 'G4.16'),
  markTheme(theme[0]), theme[1],
  'A4.4 E4.16 D4.16 E4.16 G4.16 A4.8 D5.8 B4.16 A4.16 G4.16 B4.16',
  'A4.8 D5.8 B4.16 A4.16 G4.16 A4.16 A4.4 { fermata medium } (A5 D6 E6 A6).4 { ot 8va au 60 }'
];
const bass = [
  'r.1', 'r.1',
  markTheme(octaveDown(theme[0])), octaveDown(theme[1]),
  String.raw`\clef G2 A3.4 F#4.16 { txt "CT" } E4.16 D4.16 E4.16 F#4.16 D4.16 E4.16 F#4.16 A4.8 B3.16 A3.16`,
  'B3.4 D4.16 E4.16 D4.16 B3.16 A3.16 A4.16 F#4.16 E4.16 D4.16 E4.16 F#4.16 A3.16',
  String.raw`\clef F4 B3.8 { txt "主题倒影" } E3.16 E3.16 F#3.8 { d } F#3.16 A3.16 E3.16 F#3.16 A3.16 B3.4`,
  'C#4.16 { d } A3.32 B3.16 C#4.16 E4.16 F#4.16 E4.16 C#4.16 B3.8 F#3.8 A3.16 B3.16 C#4.16 A3.16',
  String.raw`\clef G2 B3.4 D4.16 { txt "对题倒影" } E4.16 F#4.16 E4.16 D4.16 F#4.16 E4.16 D4.16 B3.8 A4.16 B4.16`,
  'A4.4 F#4.16 E4.16 F#4.16 A4.16 B4.16 C4.16 D4.16 E4.16 F#4.16 E4.16 D4.16 C4.16',
  String.raw`\clef F4 A3.8 { txt "T" } E4.16 E4.16 D4.8 { d } D3.16 B3.16 E4.16 D4.16 B3.16 A3.4`,
  octaveDown(theme[1]),
  markCountertheme(octaveDown(countertheme[0])), octaveDown(countertheme[1]),
  'E4.16 D4.16 B3.16 A3.16 G3.16 A3.16 G3.16 E3.16 D3.16 D4.16 B3.16 A3.16 G3.16 A3.16 B3.16 D4.16',
  'D4{t}.4 A3.8 E3.8 A3.2 { fermata medium }'
];

export const modalInventionNotes = {
  meter: '4 4', key: 'G', tempo: 77, bars: 16, clefs: ['G2', 'F4'], voices: [treble, bass],
  innerVoices: [
    [...Array(14).fill(''), 'r.2 { d } r.8 G4.8', 'A4.4 A4.8 E4.8 E4{t}.2'],
    [...Array(15).fill(''), 'A3.8 G3.8 D3.8 B2.8 A2.2']
  ]
};
