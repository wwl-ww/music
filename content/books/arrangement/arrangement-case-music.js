export const caseTempo = 104;
export const ticksPerBeat = 960;

const progression = [
  { root: 'C2', fifth: 'G2', guitar: 'C4 E4 G4', piano: 'G3 C4 E4' },
  { root: 'A2', fifth: 'E3', guitar: 'C4 E4 A4', piano: 'A3 C4 E4' },
  { root: 'F2', fifth: 'C3', guitar: 'C4 F4 A4', piano: 'A3 C4 F4' },
  { root: 'G2', fifth: 'D3', guitar: 'B3 D4 G4', piano: 'G3 B3 D4' },
  { root: 'C2', fifth: 'G2', guitar: 'C4 E4 G4', piano: 'G3 C4 E4' },
  { root: 'F2', fifth: 'C3', guitar: 'C4 F4 A4', piano: 'A3 C4 F4' },
  { root: 'G2', fifth: 'D3', guitar: 'B3 D4 G4', piano: 'G3 B3 D4' },
  { root: 'C2', fifth: 'G2', guitar: 'C4 E4 G4', piano: 'G3 C4 E4' }
];

const lead = [
  'E5.4 { dy mf } G5.4 A5.4 G5.4', 'E5.4 D5.4 r.2',
  'C5.4 E5.4 F5.4 E5.4', 'D5.2 r.2',
  'G5.4 G5.4 A5.4 G5.4', 'F5.2 E5.4 r.4',
  'D5.2 r.2', 'E5.4 G5.4 A5.4 C6.4'
];
const drumsBasic = '(Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8 (Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8';
const drumsOpening = '(Kick Hat).8 Hat.8 (Snare Hat).8 Hat.8';
const foundation = {
  guitar: progression.map(({ guitar }) => `(${guitar}).4 { dy p } r.4 (${guitar}).4 r.4`),
  piano: progression.map(({ piano }) => `r.4 (${piano}).4 { dy p } r.4 (${piano}).4`),
  bass: progression.map(({ root, fifth }) => `${root}.2 { dy mp } ${fifth}.2`),
  drums: progression.map(() => drumsBasic)
};

const phrases = {
  guitar: foundation.guitar.map((bar, index) => ({
    1: '(C4 E4 A4).4 { dy p } r.4 E4.8 { dy mf } G4.8 A4.4',
    3: '(B3 D4 G4).4 { dy p } r.4 B4.8 { dy mf } r.8 A4.8 G4.8',
    5: 'A4.8 { dy mf } C5.8 D5.8 C5.8 A4.8 C5.8 E5.8 G5.8',
    6: '(B3 D4 G4).4 { dy p } r.4 D5.8 { dy mf } C5.8 B4.4'
  }[index] ?? bar)),
  piano: foundation.piano.with(5, '(A3 C4 F4).2 { dy p } r.4 E5.8 { dy mf } F5.8'),
  bass: foundation.bass.with(5, 'F2.4 { dy mp } C3.4 A2.4 C3.4'),
  drums: foundation.drums
    .with(3, `${drumsOpening} (Kick Snare).8 HighTom.8 MidTom.8 FloorTom.8`)
    .with(4, drumsBasic.replace('(Kick Hat)', '(Kick Crash)'))
};

const ensemble = {
  guitar: phrases.guitar.with(5, '(A3 C4 F4).4 { dy p } r.4 (A3 C4 F4).8 r.8 r.4'),
  piano: phrases.piano
    .with(3, `r.4 (G3 B3 D4).4 { dy p } B3.8 { dy mf } r.8 A3.8 G3.8`)
    .with(6, `r.4 (G3 B3 D4).4 { dy p } D4.8 { dy mf } C4.8 B3.4`),
  bass: phrases.bass
    .with(3, 'G2.2 { dy mp } G2.8 { dy mf } r.8 A2.8 B2.8')
    .with(6, 'G2.2 { dy mp } D3.8 { dy mf } C3.8 B2.4'),
  drums: phrases.drums
    .with(3, `${drumsOpening} Kick.8 r.8 HighTom.8 FloorTom.8`)
    .with(6, `${drumsOpening} Kick.8 Snare.8 (Kick Crash).4`)
};

function track(name, program, bars, header = '') {
  return { name, program, phrase: String.raw`\ts (4 4) ${header} ${bars.join(' | ')}` };
}

const versions = { melody: null, foundation, phrases, ensemble };

export function arrangementCaseScore(version, barCount = lead.length) {
  const parts = versions[version];
  const melody = track('主旋律', 73, lead.slice(0, barCount));
  if (!parts) return { scoreTracks: [melody] };
  return { scoreTracks: [
    melody,
    track('吉他', 27, parts.guitar.slice(0, barCount)),
    track('钢琴', 0, parts.piano.slice(0, barCount)),
    track('贝斯', 33, parts.bass.slice(0, barCount), String.raw`\clef F4`),
    track('鼓组', 'percussion', parts.drums.slice(0, barCount),
      String.raw`\clef neutral \articulation (Kick 36) \articulation (Snare 38) \articulation (Hat 42)
        \articulation (HighTom 50) \articulation (MidTom 47) \articulation (FloorTom 43) \articulation (Crash 49)`)
  ] };
}

function openingEvents(track, kickOnly = false) {
  const isKick = note => track.percussionArticulations[note.percussionArticulation]?.outputMidiNumber === 36;
  return track?.staves[0].bars.slice(0, 2).flatMap((bar, index) => {
    let step = index * 4;
    const events = [];
    for (const beat of bar.voices[0].beats) {
      const length = beat.playbackDuration / ticksPerBeat;
      if (kickOnly) {
        if (beat.notes.some(isKick)) events.push({ step });
      } else if (beat.notes.length) {
        events.push({ step, length });
      }
      step += length;
    }
    return events;
  }) ?? [];
}

export function caseOpeningRows(score, { includeMelody = false } = {}) {
  const track = name => score.tracks.find(track => track.name === name);
  const rows = [
    { label: '底鼓', events: openingEvents(track('鼓组'), true) },
    { label: '贝斯', events: openingEvents(track('贝斯')) }
  ];
  if (includeMelody) rows.unshift({ label: '主旋律', events: openingEvents(track('主旋律')) });
  return rows;
}
