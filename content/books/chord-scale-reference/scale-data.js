import { supplementalScales } from './supplemental-scales.js';

export const scaleTypes = [
  {
    id: 'ionian',
    name: '自然大调（伊奥尼亚）',
    family: '大小调',
    also: ['教会调式'],
    degrees: ['1', '2', '3', '4', '5', '6', '7', '8'],
    aliases: ['Ionian', 'major scale', '大调音阶', '大调', '自然大调'],
    note: '自然大调是这里标记音级的基准。其他音阶中的升降号表示相应音级相对它升高或降低。'
  },
  {
    id: 'dorian',
    name: '多利亚',
    family: '教会调式',
    degrees: ['1', '2', '♭3', '4', '5', '6', '♭7', '8'],
    aliases: ['Dorian', '多里亚'],
    note: '与同主音自然小调相比，保留小三度和小七度，第六级高半音。'
  },
  {
    id: 'phrygian',
    name: '弗里几亚',
    family: '教会调式',
    degrees: ['1', '♭2', '♭3', '4', '5', '♭6', '♭7', '8'],
    aliases: ['Phrygian', '弗里吉亚'],
    note: '同主音自然小调的第二级降低半音，主音与第二级相邻半音。'
  },
  {
    id: 'lydian',
    name: '利底亚',
    family: '教会调式',
    degrees: ['1', '2', '3', '♯4', '5', '6', '7', '8'],
    aliases: ['Lydian', '利地亚', '利迪亚', '利狄亚'],
    note: '自然大调的第四级升高半音，与主音构成增四度。'
  },
  {
    id: 'mixolydian',
    name: '混合利底亚',
    family: '教会调式',
    degrees: ['1', '2', '3', '4', '5', '6', '♭7', '8'],
    aliases: ['Mixolydian', '混合利地亚', '混合利迪亚', '米索利底亚'],
    note: '自然大调的第七级降低半音，仍保留主音上方的大三度。'
  },
  {
    id: 'aeolian',
    name: '自然小调（爱奥尼亚）',
    family: '大小调',
    also: ['教会调式'],
    degrees: ['1', '2', '♭3', '4', '5', '♭6', '♭7', '8'],
    aliases: ['Aeolian', 'natural minor', '爱奥利亚', '小调音阶', '小调', '自然小调'],
    note: '自然小调的第三级、第六级和第七级分别在同主音自然大调相应音级的低半音处。'
  },
  {
    id: 'locrian',
    name: '洛克里亚',
    family: '教会调式',
    degrees: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭7', '8'],
    aliases: ['Locrian', '洛克利亚'],
    note: '比弗里几亚再降低第五级。主音到第五级是减五度，主音三和弦是减三和弦。'
  },
  {
    id: 'harmonic-minor',
    name: '和声小调',
    family: '大小调',
    degrees: ['1', '2', '♭3', '4', '5', '♭6', '7', '8'],
    aliases: ['harmonic minor'],
    note: '升高自然小调的第七级，使它距高八度主音半音。第六级与第七级相隔增二度。'
  },
  {
    id: 'melodic-minor',
    name: '旋律小调',
    family: '大小调',
    degrees: ['1', '2', '♭3', '4', '5', '6', '7', '8'],
    descendingDegrees: ['8', '♭7', '♭6', '5', '4', '♭3', '2', '1'],
    aliases: ['melodic minor'],
    note: '古典旋律小调上行时升高自然小调的第六、第七级，下行时恢复自然小调的第六、第七级。'
  },
  {
    id: 'major-pentatonic',
    name: '大调五声音阶',
    family: '五声音阶',
    degrees: ['1', '2', '3', '5', '6', '8'],
    aliases: ['major pentatonic', '大调五声'],
    note: '由自然大调去掉第四级和第七级得到。首尾两个主音相隔八度，音级仍只有五个。'
  },
  {
    id: 'minor-pentatonic',
    name: '小调五声音阶',
    family: '五声音阶',
    degrees: ['1', '♭3', '4', '5', '♭7', '8'],
    aliases: ['minor pentatonic', '小调五声'],
    note: '由自然小调去掉第二级和第六级得到。'
  },
  {
    id: 'minor-blues',
    name: '小调布鲁斯音阶',
    family: '布鲁斯音阶',
    degrees: ['1', '♭3', '4', '♭5', '5', '♭7', '8'],
    aliases: ['minor blues', '小调布鲁斯', '小调蓝调'],
    note: '在小调五声的第四级与第五级之间加入 ♭5，保留原有的 5。'
  },
  {
    id: 'major-blues',
    name: '大调布鲁斯音阶',
    family: '布鲁斯音阶',
    degrees: ['1', '2', '♭3', '3', '5', '6', '8'],
    aliases: ['major blues', '大调布鲁斯', '大调蓝调'],
    note: '在大调五声的第二级和第三级之间加入 ♭3，保留原有的 3。'
  },
  ...supplementalScales
];
