import ensembleSoundFont from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountScore } from '../../shared/formats/score.js';

const narrowViewport = matchMedia('(max-width: 42rem)');

export const genreMelody = [
  'E5.4 G5.8 A5.8 G5.4 E5.4',
  'F5.4 A5.4 G5.4 E5.4',
  'D5.4 F5.8 E5.8 D5.4 B4.4',
  'C5.2 E5.4 C5.4'
];

const baseHarmony = ['C', 'Fmaj7', 'G7', 'C'];
const baseChords = [
  '(C3 G3 C4 E4).1 { dy mp }', '(F2 A3 C4 E4).1',
  '(G2 B3 D4 F4).1', '(C3 G3 C4 E4).1'
];
const percussion = String.raw`\clef neutral
  \articulation (Kick 36) \articulation (Snare 38) \articulation (Hat 42)
  \articulation (OpenHat 46) \articulation (Ride 51) \articulation (Crash 49)
  \articulation (Rim 37) \articulation (Clap 39) \articulation (Shaker 70)
  \articulation (HighTom 50) \articulation (LowTom 45)
  \articulation (SubKick 35) \articulation (PedalHat 44)
  \articulation (Conga 64) \articulation (Triangle 81)`;

export function genreTrack({ name, program, bars, header = '', playbackOnly, tuning }) {
  const clefAndArticulations = program === 'percussion' ? percussion : '';
  return {
    name, program, playbackOnly, tuning,
    phrase: String.raw`\ks C \ts (4 4) ${clefAndArticulations} ${header} ${bars.join(' | ')}`
  };
}

export function mountGenreVersions(id, { tempo, versions, onPlaybackPosition }) {
  const container = document.getElementById(id);
  const select = container.querySelector('select');
  const cue = container.querySelector('.music-demo-cue');
  const scoreFigure = container.querySelector('figure');
  const tracksFor = value => ({ scoreTracks: versions[value].tracks.map(genreTrack) });
  const player = mountScore(scoreFigure, {
    notes: tracksFor(select.value),
    tempo,
    notation: 'staff',
    soundFontUrl: ensembleSoundFont,
    preservePosition: true,
    horizontal: narrowViewport,
    showDynamics: false,
    onPlaybackPosition
  });
  function describe() {
    cue.textContent = versions[select.value].summary;
  }
  describe();
  select.addEventListener('change', () => {
    player.setNotes(tracksFor(select.value));
    describe();
  });
  return player;
}

export function mountGenreArrangement(id, { tempo, harmony, tracks, summary, swing, reference }) {
  const melody = { name: '共同旋律', program: 73, bars: genreMelody };
  const harmonyText = labels => labels.join(' ｜ ');
  return mountGenreVersions(id, {
    tempo,
    versions: {
      arranged: {
        summary: `${harmonyText(harmony)}。 ${summary}`,
        tracks: [{ ...melody, header: swing ? String.raw`\tf ${swing}` : '' }, ...tracks]
      },
      base: {
        summary: `${harmonyText(baseHarmony)}。同速的基础稿，每小节以一个持续的钢琴和弦衬托旋律。`,
        tracks: [melody, { name: '基础和声', program: 0, bars: baseChords }]
      },
      melody: {
        summary: '十种编配共用的四小节旋律。此处采用本章速度。',
        tracks: [melody]
      },
      ...(reference && {
        reference: { summary: reference.summary, tracks: [melody, ...reference.tracks] }
      })
    }
  });
}
