export const examples = [
  {
    "id": "cadence-destinations",
    "title": "同一句尾的主终止、属停顿与阻碍",
    "tempo": 86,
    "variants": [
      {
        "label": "D7→T",
        "right": "E5.4 G5.4 A5.4 C6.4 | B5.4 D6.4 B5.4 G5.4 | C6.1",
        "left": "(C3 E3 G3).2 (F3 A3 C4).2 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "属低音 G 在终点回到 C，旋律也落在主音上。"
      },
      {
        "label": "半终止",
        "right": "E5.4 G5.4 A5.4 C6.4 | B5.4 D6.4 B5.4 G5.4",
        "left": "(C3 E3 G3).2 (F3 A3 C4).2 | (G2 B2 D3).1",
        "description": "句子在属三和弦上停顿，保留返回主音的预期。"
      },
      {
        "label": "D7→vi",
        "right": "E5.4 G5.4 A5.4 C6.4 | B5.4 D6.4 B5.4 G5.4 | C6.1",
        "left": "(C3 E3 G3).2 (F3 A3 C4).2 | (G2 B2 D3 F3).1 | (A2 C3 E3).1",
        "description": "旋律仍落到 C，实际低音却走到 A，收束被延后。"
      },
      {
        "label": "S→T",
        "right": "G5.2 E5.2 | A5.2 C6.2 | C6.1",
        "left": "(C3 E3 G3).1 | (F3 A3 C4).1 | (C3 E3 G3).1",
        "description": "下属与主之间共享 C，收束不经过属导音。"
      }
    ]
  },
  {
    "id": "cadential-six-four",
    "title": "直接属七与终止四六",
    "tempo": 76,
    "variants": [
      {
        "label": "直接属七",
        "right": "(B3 D4 G4).2 (B3 D4 F4).2 | (C4 E4 G4).1",
        "left": "G2.1 | C3.1",
        "description": "第一拍已经给出属和弦的三音 B。"
      },
      {
        "label": "四六准备",
        "right": "(C4 E4 G4).2 (B3 D4 F4).2 | (C4 E4 G4).1",
        "left": "G2.1 | C3.1",
        "description": "低音 G 不动，C4、E4 分别落到 B3、D4，随后回主。"
      }
    ]
  },
  {
    "id": "suspension-versus-restrike",
    "title": "同一 F→E 的延留与倚音",
    "tempo": 75,
    "variants": [
      {
        "label": "延留音",
        "right": "G5.2 F5.2 | F5{t}.4 E5.4 C5.2",
        "left": "(G2 B2 D3).1 | (C3 E3 G3).1",
        "description": "F 从前一小节悬到新的 C 低音上，第一拍不再次触键。"
      },
      {
        "label": "强拍倚音",
        "right": "G5.2 D5.2 | F5.4 E5.4 C5.2",
        "left": "(G2 B2 D3).1 | (C3 E3 G3).1",
        "description": "F 在第二小节强拍新起音，随即下行解决到 E。"
      }
    ]
  },
  {
    "id": "slow-fast-harmony",
    "title": "四小节旋律的两种换和弦密度",
    "variants": [
      {
        "label": "一小节一换",
        "right": "E5.4 G5.4 A5.4 G5.4 | E5.4 G5.4 A5.4 C6.4 | D6.4 B5.4 G5.4 B5.4 | C6.1",
        "left": "(C3 E3 G3).1 | (F3 A3 C4).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "伴奏在各小节开头换和弦，短音归入比较长的和声单位。"
      },
      {
        "label": "半小节加密",
        "right": "E5.4 G5.4 A5.4 G5.4 | E5.4 G5.4 A5.4 C6.4 | D6.4 B5.4 G5.4 B5.4 | C6.1",
        "left": "(C3 E3 G3).2 (A2 C3 E3 G3).2 | (C3 E3 G3).2 (F3 A3 C4).2 | (G2 B2 D3).2 (G2 B2 D3 F3).2 | (C3 E3 G3).1",
        "description": "旋律不改。多出的半小节和弦增加局部活动，末小节仍完整留给 C。"
      }
    ]
  }
];
