import { naturalOffsets } from '../../shared/formats/pitch.js';
import { pentatonicDegrees, pentatonicModes, pentatonicSteps, sevenToneScales } from '../../shared/formats/scales.js';

function scale(id, name, family, formula, aliases, note) {
  return { id, name, family, degrees: formula.split(' '), aliases, note, supplemental: true };
}

function relativeDegree(index, semitones) {
  const adjustment = semitones - naturalOffsets[index];
  return (adjustment < 0 ? '♭'.repeat(-adjustment) : '♯'.repeat(adjustment)) + (index + 1);
}

function chineseModes({ prefix, label, steps, positions }) {
  const scaleDegrees = steps.length === 5 ? pentatonicDegrees : [0, 1, 2, 3, 4, 5, 6];
  return positions.map((start, modeIndex) => {
    const mode = pentatonicModes[modeIndex];
    const degrees = steps.map((_, offset) => {
      const index = (start + offset) % steps.length;
      return relativeDegree(
        (scaleDegrees[index] - scaleDegrees[start] + 7) % 7,
        (steps[index] - steps[start] + 12) % 12
      );
    });
    const short = label + mode;
    const family = prefix === 'pentatonic' ? '中国五声调式' : '中国七声调式';
    const item = scale(`${prefix}-${['gong', 'shang', 'jue', 'zhi', 'yu'][modeIndex]}`,
      (label || '五声') + mode + '调式', family, [...degrees, '8'].join(' '), [short + '调', mode + '调式'],
      (label ? '沿用' + label + '音列，' : '') + '以' + mode + '音为主音。');
    item.gongDegree = degrees[(steps.length - start) % steps.length];
    return item;
  });
}

const japanese = '日本五声音阶';
const jazz = '爵士音阶';
const symmetric = '对称与半音音阶';
const harmonic = '和声变体与其他七声音阶';

export const supplementalScales = [
  scale('harmonic-major', '和声大调', '大小调', '1 2 3 4 5 ♭6 7 8', ['harmonic major'],
    '自然大调的第六级降低半音。降六级到七级相隔增二度。'),
  {
    ...scale('melodic-major', '旋律大调', '大小调', '1 2 3 4 5 6 7 8', ['melodic major'],
      '上行沿用自然大调。下行把第七级和第六级各降半音。'),
    descendingDegrees: ['8', '♭7', '♭6', '5', '4', '3', '2', '1']
  },
  ...chineseModes({ prefix: 'pentatonic', label: '', steps: pentatonicSteps, positions: [0, 1, 2, 3, 4] }),
  ...Object.entries(sevenToneScales).flatMap(([prefix, { label, steps }]) =>
    chineseModes({ prefix, label, steps, positions: pentatonicDegrees })),
  scale('minyo', '民谣音阶', japanese, '1 ♭3 4 5 ♭7 8', ['民謡音階', 'minyo', '日本民谣'],
    '与小调五声使用同样的键位。C 例中，C 与 F、G 与高音 C 分别构成纯四度框架。'),
  scale('ritsu', '律音阶', japanese, '1 2 4 5 6 8', ['律音階', 'ritsu', '律旋'],
    'C 例在 C–F 中间放 D，在 G–C 中间放 A。'),
  scale('miyakobushi', '都节音阶', japanese, '1 ♭2 4 5 ♭6 8', ['都節', 'miyakobushi', 'miyako bushi', '日本都节'],
    '常见的八度音列中，两个四度框架内侧的音分别距下方支点一个半音。'),
  scale('ryukyu', '琉球音阶', japanese, '1 3 4 5 7 8', ['ryukyu', '冲绳音阶', '沖縄音階'],
    'C 例的两个半音是 E–F 与 B–C。钢琴谱示意十二平均律中的音列。'),
  scale('hirajoshi', '平调子', japanese, '1 2 ♭3 5 ♭6 8', ['平調子', 'hirajoshi', 'hirajōshi'],
    '这里按以 G–A–B♭–D–E♭ 为例的起点排列。筝的调弦可以从不同音起算。'),
  scale('insen', '阴旋（Insen）', japanese, '1 ♭2 4 5 ♭7 8', ['陰旋', 'in sen'],
    '这里采用 Insen 的 1、♭2、4、5、♭7 排列。它与本页都节音阶的区别是第五个音。'),
  scale('iwato', '岩户音阶', japanese, '1 ♭2 4 ♭5 ♭7 8', ['岩戸', '岩戶', 'iwato'],
    '它与本页的 Insen 相比，第五级降低一个半音。'),
  scale('jazz-melodic-minor', '爵士旋律小调', jazz, '1 2 ♭3 4 5 6 7 8',
    ['jazz minor', 'ascending melodic minor'], '上下行使用同一组音，保留大六度和大七度。'),
  scale('dorian-flat-two', '多利亚降二', jazz, '1 ♭2 ♭3 4 5 6 ♭7 8', ['dorian b2', 'phrygian natural 6'],
    '爵士旋律小调的第二调式。降二级与自然六级同时出现。'),
  scale('lydian-augmented', '利底亚增音阶', jazz, '1 2 3 ♯4 ♯5 6 7 8', ['lydian augmented', '利底亚升五'],
    '爵士旋律小调的第三调式。利底亚的升四级保留，五级也升高半音。'),
  scale('lydian-dominant', '利底亚属音阶', jazz, '1 2 3 ♯4 5 6 ♭7 8',
    ['lydian dominant', 'acoustic scale', '声学音阶', '利底亚降七'], '爵士旋律小调的第四调式。升四级和降七级是特征音。'),
  scale('mixolydian-flat-six', '混合利底亚降六', jazz, '1 2 3 4 5 ♭6 ♭7 8',
    ['mixolydian b6', 'aeolian dominant'], '爵士旋律小调的第五调式。在混合利底亚的基础上再降六级。'),
  scale('locrian-natural-two', '洛克里亚还原二级', jazz, '1 2 ♭3 4 ♭5 ♭6 ♭7 8',
    ['locrian natural 2', 'locrian #2', '洛克里亚升二'], '爵士旋律小调的第六调式。降五级保留，第二级为大二度。'),
  scale('altered', '变化属音阶', jazz, '1 ♭2 ♭3 ♭4 ♭5 ♭6 ♭7 8',
    ['altered scale', 'super locrian', '超级洛克里亚', '变音音阶'], '爵士旋律小调的第七调式。按音阶级数写成 ♭4 的音，与属七和弦的大三度等音。'),
  scale('bebop-major', '比博普大调音阶', jazz, '1 2 3 4 5 ♯5 6 7 8', ['bebop major', '比波普大调'],
    '在自然大调的五级与六级之间加半音经过音。'),
  scale('bebop-dominant', '比博普属音阶', jazz, '1 2 3 4 5 6 ♭7 7 8', ['bebop dominant', '比波普属'],
    '在混合利底亚的降七级与主音之间加自然七级。'),
  scale('phrygian-dominant', '弗里几亚属音阶', harmonic, '1 ♭2 3 4 5 ♭6 ♭7 8',
    ['phrygian dominant', '和声小调第五调式'], '从和声小调的第五级起算。降二级与大三度之间相隔增二度。'),
  scale('double-harmonic-major', '双和声大调', harmonic, '1 ♭2 3 4 5 ♭6 7 8',
    ['double harmonic major', '拜占庭音阶'], '降二级到三级、降六级到七级各相隔增二度。'),
  scale('hungarian-minor', '匈牙利小调', harmonic, '1 2 ♭3 ♯4 5 ♭6 7 8',
    ['hungarian minor', 'double harmonic minor', '双和声小调'], '在和声小调的基础上升高四级。'),
  scale('whole-tone', '全音音阶', symmetric, '1 2 3 ♯4 ♯5 ♭7 8', ['whole tone', '六声音阶'],
    '相邻音一律相差两个半音，按同一间隔连续走六步回到高八度主音。'),
  scale('octatonic-half-whole', '八声音阶（半–全）', symmetric, '1 ♭2 ♭3 3 ♯4 5 6 ♭7 8',
    ['half whole diminished', 'octatonic half whole', '半全减音阶', '减音阶'],
    '从半音开始，半音与全音交替。另一个版本从全音开始。'),
  scale('octatonic-whole-half', '八声音阶（全–半）', symmetric, '1 2 ♭3 4 ♭5 ♭6 6 7 8',
    ['whole half diminished', 'octatonic whole half', '全半减音阶', '减音阶'], '从全音开始，全音与半音交替。'),
  scale('augmented', '增六声音阶', symmetric, '1 ♯2 3 5 ♯5 7 8', ['augmented scale', '六声音阶'],
    '小三度与半音交替。C 例可以看成 C–E–G♯ 与 E♭–G–B 两个增三和弦的音高集合。'),
  {
    ...scale('chromatic', '半音音阶', symmetric, '1 ♯1 2 ♯2 3 4 ♯4 5 ♯5 6 ♭7 7 8',
      ['chromatic', '十二半音'], '两个相邻音都相隔半音。上下行用不同的音名拼写，琴键位置相同。'),
    descendingDegrees: '8 7 ♭7 6 ♭6 5 ♭5 4 3 ♭3 2 ♭2 1'.split(' ')
  }
];
