import soundFontUrl from '@coderline/alphatab/soundfont/sonivox.sf3?url';
import { mountFormAnalysis } from '../../shared/formats/form-analysis.js';
import { mountArrangementGrid } from '../../shared/formats/arrangement-grid.js';
import { arrangementCaseScore, caseOpeningRows, caseTempo } from './arrangement-case-music.js';

const cues = {
  melody: {
    whole: '长笛示范主旋律。第 2、4、7 小节后半都有留白。',
    verse: '长笛在第 2 小节停两拍。切到「节拍骨架」，同一处留白下面会有持续的拍感。',
    entry: '第 4 小节后半留两拍，可以放过门。这个片段会一直播放到第 5 小节。',
    chorus: '第 6 小节最后一拍空出来，可以让钢琴短暂接一句。',
    turnaround: '第 7 小节留出两拍，第 8 小节回到开头的旋律轮廓。'
  },
  foundation: {
    whole: '底鼓和贝斯对齐第 1、3 拍，吉他与钢琴交替给出短和弦。',
    verse: '第 1、3 拍的底鼓和贝斯同时起音。主旋律在第 2 小节停下时，这两个拍点仍在。切到「乐句布置」，同一处就有吉他接句。',
    entry: '第 4、5 小节沿用同样的节拍。切到「乐句布置」，第 4 小节后半会有吉他和鼓的过门。',
    chorus: '第 6 小节的留白里仍是基础伴奏。切到「乐句布置」才会出现钢琴填句。',
    turnaround: '贝斯在第 7 小节保留基础节奏，第 8 小节随和声回到 C。'
  },
  phrases: {
    whole: '吉他在主歌留白接句，鼓组加入转段过门，副歌末尾由钢琴接句。',
    verse: '第 2 小节后两拍，吉他用三个上行音接住主旋律。与「节拍骨架」相比，底鼓和贝斯的拍点相同。',
    entry: '第 4 小节后半加入吉他与鼓的过门。吉他留出半拍时，桶鼓仍在敲击。切到「乐队合奏」可比较共同重音。',
    chorus: '第 6 小节第 4 拍，吉他也在高处连续起音，和钢琴填句挤在同一处。切到「乐队合奏」，同一拍就留给钢琴。',
    turnaround: '第 7 小节后半由吉他奏出回转句，贝斯照常支撑和声。'
  },
  ensemble: {
    whole: '转段对齐起音，副歌给钢琴让位，回转加入八度齐奏。',
    verse: '第 2 小节仍由吉他接句，底鼓和贝斯保留节拍骨架。',
    entry: '第 4 小节后半，吉他和钢琴下行、贝斯上行，鼓击对齐。大家一起留出半拍，下一次共同起音更清楚。',
    chorus: '第 6 小节只改吉他。两个短和弦之后，吉他留空最后一拍。与「乐句布置」对照，钢琴填句和贝斯完全一样。',
    turnaround: '第 7 小节后半，吉他、钢琴、贝斯分三个八度奏同一句，第 8 小节交还主旋律。'
  }
};

const sections = [
  { id: 'verse', label: '主歌', first: 1, last: 2 },
  { id: 'entry', label: '转段', first: 3, last: 4, playback: { first: 3, last: 5 } },
  { id: 'chorus', label: '副歌', first: 5, last: 6 },
  { id: 'turnaround', label: '回转', first: 7, last: 8 }
];

const demo = document.getElementById('case-score');
const version = demo.querySelector('[data-analysis-version]');
const openingGrid = demo.querySelector('[data-case-opening-grid]');
const grid = mountArrangementGrid(openingGrid.querySelector('[data-case-grid]'), {
  beats: 8, subdivisions: 1, rows: [], label: '第 1–2 小节底鼓和贝斯的起音'
});
const params = new URL(location.href).searchParams;
const requested = params.get('stage');
version.value = Object.hasOwn(cues, requested) ? requested : 'melody';
let passage;

function showPassage() {
  openingGrid.hidden = passage !== 'verse' || version.value === 'melody';
  const url = new URL(location.href);
  if (passage) url.searchParams.set('passage', passage);
  else url.searchParams.delete('passage');
  if (version.value !== 'melody' || url.searchParams.has('stage')) url.searchParams.set('stage', version.value);
  if (url.href !== location.href) history.replaceState(history.state, '', url);
}

const player = mountFormAnalysis(demo, {
  score: {
    notes: arrangementCaseScore(version.value), tempo: caseTempo, soundFontUrl,
    onScoreLoaded(score) { grid.update(caseOpeningRows(score)); },
    onPlaybackPosition: grid.markTick
  },
  sections,
  wholeLabel: '整段',
  initialSection: params.get('passage'),
  describeSection(section) { return cues[version.value][section?.id ?? 'whole']; },
  onSelectionChange(section) {
    passage = section?.id;
    showPassage();
  }
});

version.addEventListener('change', () => {
  player.setNotes(arrangementCaseScore(version.value));
  showPassage();
});
