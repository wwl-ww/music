export const examples = [
  {
    "id": "minor-applied-chain",
    "title": "从关系大调转回小调主音",
    "tempo": 80,
    "variants": [
      {
        "label": "连续副属",
        "right": "E4.1 | F4.2 D4.2 | E4.1 | G4.2 Bb4.2 | A4.1 | G4.2 E4.2 | F4.1 | F#4.2 B4.2 | G#4.2 B4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (G2 B2 F3).1 | (C3 E3 G3).1 | (C3 E3 Bb3).1 | (F2 A2 C3).1 | (A2 C#3 G3).1 | (D3 F3 A3).1 | (B2 D#3 A3).1 | (E3 G#3 D4).1 | (A2 C3 E3).1",
        "description": "C、F、Dm 都得到临时准备，末段相邻的 B7、E7 把和声拉回 Am。"
      }
    ]
  },
  {
    "id": "minor-iv-approach",
    "title": "Am 与 A7 接向 Dm",
    "variants": [
      {
        "label": "保持小调主和弦",
        "right": "E5.2 A4.2 | F4.2 A4.2 | G#4.2 B4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (D3 F3 A3).1 | (E3 G#3 D4).1 | (A2 C3 E3).1",
        "description": "Am→Dm 是 i→iv。"
      },
      {
        "label": "先形成 A7",
        "right": "E5.2 A4.2 | F4.2 A4.2 | G#4.2 B4.2 | A4.1",
        "left": "(A2 C#3 G3).1 | (D3 F3 A3).1 | (E3 G#3 D4).1 | (A2 C3 E3).1",
        "description": "C♯→D 与 G→F 把第二小节的 Dm 凸显为局部目标。"
      }
    ]
  },
  {
    "id": "minor-iii-or-i",
    "title": "G7 通向 C 或 Am",
    "variants": [
      {
        "label": "落在关系大调",
        "right": "A4.2 F4.2 | D5.2 F5.2 | E5.2 C5.2",
        "left": "(D3 F3 A3).1 | (G2 B2 F3).1 | (C3 E3 G3).1",
        "description": "Dm–G7–C 组成临时的大调 ii–V–I。"
      },
      {
        "label": "回到小调主和弦",
        "right": "A4.2 F4.2 | D5.2 F5.2 | E5.2 C5.2",
        "left": "(D3 F3 A3).1 | (G2 B2 F3).1 | (A2 C3 E3).1",
        "description": "旋律 E、C 保持，低音走 G–A，最后的重心落在 Am。"
      }
    ]
  }
];
