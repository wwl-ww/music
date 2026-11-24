import { mountFretboard } from '../../shared/formats/fretboard.js';
import { getTonic, spellNote } from '../../shared/formats/pitch.js';
import { mountProgrammaticScore } from '../../shared/formats/programmatic-score.js';
import { buildMajorScale, majorKeys, displayPitch } from '../../shared/formats/scales.js';
import { mountScoreChoiceButtons } from '../../shared/formats/score-choice-buttons.js';
import { mountScoreWritingSteps } from '../../shared/formats/score-writing-steps.js';

const sharps = ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯', 'B♯'];
const flats = ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭'];
const majorTriadSuffixes = ['', 'm', 'm', '', '', 'm', 'dim'];
mountProgrammaticScore(document.querySelector('#rock-key-signatures'), {
  lowestPitch: 60,
  octaves: 2,
  build({ tonic }) {
    const balance = majorKeys.indexOf(tonic) - majorKeys.indexOf('C');
    const written = (balance > 0 ? sharps : flats).slice(0, Math.abs(balance));
    const signature = written.length ? `调号为 ${written.join('、')}` : '无升降号';
    const scale = buildMajorScale({ tonic, type: 'natural', direction: 'up' });
    const root = getTonic(tonic);
    const triads = scale.pitches.slice(0, 7).map((pitch, degree) => {
      const { name } = spellNote(root, degree, pitch);
      return displayPitch(name) + majorTriadSuffixes[degree];
    });
    return {
      ...scale,
      summary: `${displayPitch(tonic)} 大调${signature}。各级三和弦为 ${triads.join(' · ')}。`
    };
  }
});

const phraseC = {
  key: 'C',
  melody: 'E4.4 G4.4 A4.4 G4.4 | F4.4 E4.4 D4.4 B3.4 | C4.1',
  bass: '(C3 E3 G3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1'
};
const phraseD = {
  key: 'D',
  melody: 'F#4.4 A4.4 B4.4 A4.4 | G4.4 F#4.4 E4.4 C#4.4 | D4.1',
  bass: '(D3 F#3 A3).1 | (A2 C#3 E3 G3).1 | (D3 F#3 A3).1'
};

function twoPhrases(first, second) {
  return String.raw`\ts (4 4)
    \ks ${first.key} \section ("${first.key} 大调") ${first.melody} |
    \ks ${second.key} \section ("${second.key} 大调") ${second.melody} ||
    \staff { score } \tuning (none) \clef F4 ${first.bass} | ${second.bass}`;
}

mountScoreWritingSteps(document.querySelector('#rock-transpose-modulate'), {
  score: { tempo: 110 },
  steps: [
    {
      label: 'C 大调原型',
      notes: twoPhrases(phraseC, phraseC),
      description: '两次陈述的伴奏都用 C–G7–C，旋律都由 B 上行半音到 C。'
    },
    {
      label: '整体移到 D 大调',
      notes: twoPhrases(phraseD, phraseD),
      description: '两次陈述都升高全音。伴奏换成 D–A7–D，旋律仍按半音归主，现在由 C♯ 到 D。'
    },
    {
      label: '中途转到 D 大调',
      notes: twoPhrases(phraseC, phraseD),
      description: '第 1–3 小节在 C 大调，第 4–6 小节的同一个乐句升高全音，由 A7 走向 D。一次演奏里有两个主音中心。'
    }
  ]
});

function keyCadence(key, melody, bass) {
  return String.raw`\ks ${key} \ts (4 4) ${melody} ||
    \staff { score } \tuning (none) \clef F4 ${bass}`;
}

mountScoreWritingSteps(document.querySelector('#rock-relative-keys'), {
  score: { tempo: 108 },
  steps: [
    {
      label: 'C 大调',
      notes: keyCadence('C',
        'C4.4 E4.4 F4.4 G4.4 | D4.4 F4.4 D4.4 B3.4 | C4.1',
        '(C3 E3 G3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1'),
      description: '旋律在 C 上开始，句末 B 趋向 C。低音经过 G 回到 C，结束和弦里 C–E 是大三度。'
    },
    {
      label: 'A 自然小调',
      notes: keyCadence('Aminor',
        'A3.4 C4.4 D4.4 E4.4 | B3.4 E4.4 G4.4 B3.4 | A3.1',
        '(A2 C3 E3).1 | (E2 G2 B2).1 | (A2 C3 E3).1'),
      description: '旋律仍由同一组白键音组成，句末换成 B 下行到 A。低音经过 E 回到 A，结束和弦里 A–C 是小三度。'
    }
  ]
});

const relativeBoard = document.querySelector('#rock-relative-fretboard');
const relativeChoices = [
  { label: 'C 与 Am', major: 'C', minor: 'A', fret: 3 },
  { label: 'G 与 Em', major: 'G', minor: 'E', fret: 10 },
  { label: 'D 与 Bm', major: 'D', minor: 'B', fret: 5 },
  { label: 'A 与 F♯m', major: 'A', minor: 'F♯', fret: 12 }
];
mountScoreChoiceButtons(relativeBoard.querySelector('[data-fretboard-choices]'), relativeChoices, ({ major, minor, fret }) => {
  const position = { string: 5, fret };
  const below = { string: 5, fret: fret - 3 };
  mountFretboard(relativeBoard.querySelector('[data-fretboard-figure]'), {
    startFret: Math.max(0, fret - 4),
    endFret: fret + 1,
    markers: [
      { ...position, label: major, variant: 'root' },
      { ...below, label: minor, variant: 'accent' }
    ],
    connections: [{ from: position, to: below }]
  });
  const belowLabel = below.fret === 0 ? '空弦' : `第 ${below.fret} 品`;
  relativeBoard.querySelector('[data-fretboard-description]').textContent = `同一根第 5 弦上，${major} 在第 ${fret} 品。向低音方向退三品就到${belowLabel}的 ${minor}。`;
});
