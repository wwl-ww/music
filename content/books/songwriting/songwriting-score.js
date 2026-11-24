import { mountScore } from '../../shared/formats/score.js';

export function lyricBars(verses, bars) {
  const lines = [verses].flat().map(line => Array.from(line));
  let syllable = 0;
  const tex = bars.map(bar => bar.split(/\s+/).map(token => {
    const [note, property, slur] = token.split('/');
    const props = [];
    if (!note.startsWith('r.') && property !== 'held') {
      for (const [index, line] of lines.entries()) {
        if (!line[syllable]) throw new Error('词曲未对齐，谱例有未配词的音符。');
        props.push(`lyrics (${index} "${line[syllable]}")`);
      }
      syllable++;
    }
    if (property === 'triplet') props.push('tu 3');
    const writtenNote = slur ? note.replace('.', ` { slur "${slur}" }.`) : note;
    return props.length ? `${writtenNote} { ${props.join(' ')} }` : writtenNote;
  }).join(' ')).join(' | ');
  if (lines.some(line => line.length !== syllable)) throw new Error('词曲未对齐，谱例有未谱写的歌词。');
  return tex;
}

export function mountSongVariants(id, versions) {
  const demo = document.getElementById(id);
  const select = demo.querySelector('select');
  const cue = demo.querySelector('.music-demo-cue');
  function selectedNotes() {
    const { summary, tempo, notes } = versions[select.value];
    cue.textContent = summary;
    return String.raw`\tempo ${tempo} ${notes}`;
  }
  const player = mountScore(demo.querySelector('figure'), { notation: 'staff', notes: selectedNotes() });
  select.addEventListener('change', () => player.setNotes(selectedNotes()));
}
