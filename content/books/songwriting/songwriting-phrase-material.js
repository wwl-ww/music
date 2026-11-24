import { lyricBars } from './songwriting-score.js';

export const bridgeVerses = [
  '山风吹过旧石桥',
  '桥边灯影落深潮',
  '忽见远岸渔灯起',
  '一声归鸟入烟霄',
  '明朝沿水寻春早',
  '小船载梦过平桥',
  '回身记取归时路',
  '长歌随水入今宵'
];

export const bridgeMelodies = {
  opening: ['C4 E4 G4 E4', 'D4 E4 G4'],
  continuation: ['E4 G4 A4 G4', 'F4 E4 D4'],
  turn: ['G4 A4 C5 B4', 'A4 C5 A4'],
  return: ['C4 E4 G4 E4', 'G4 D4 C4'],
  close: ['G4 F4 E4 D4', 'E4 D4 C4'],
  lift: ['C5 D5 E5 D5', 'C5 A4 G4']
};

export function bridgePhrase(verse, melody) {
  const bars = melody.map((pitches, index) => {
    const durations = index === 0 ? [8, 8, 8, 8] : [8, 8, 4];
    return pitches.split(' ').map((pitch, position) => `${pitch}.${durations[position]}`).join(' ');
  });
  return lyricBars(verse, bars);
}

export function labelPhrase(label, phrase) {
  return String.raw`\section ("${label}") ${phrase}`;
}

export function bridgeScore(phrases) {
  return String.raw`\ks C \ts (2 4) ${phrases.join(' | ')}`;
}
