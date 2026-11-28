export const examples = [
  {
    "id": "major-minor-major-arc",
    "title": "大调中段的 vi 与小调 i",
    "tempo": 79,
    "variants": [
      {
        "label": "始终以 C 为重心",
        "right": "G4.4 E4.4 G4.2 | D5.2 B4.2 | C5.4 E5.4 C5.2 | A4.2 F4.2 | B4.4 E5.4 B4.2 | A4.2 C5.2 | F4.4 D5.4 B4.2 | E5.4 D5.4 C5.2",
        "left": "(C3 E3 G3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1 | (F2 A2 C3).1 | (E3 G3 B3).1 | (A2 C3 E3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "开头 G7 回到 C。中段 Em–Am 有短暂小调色彩，句尾仍用 G7–C 定调。",
        "key": "C"
      },
      {
        "label": "转句确立 A 小调",
        "right": "G4.4 E4.4 G4.2 | D5.2 B4.2 | C5.4 E5.4 C5.2 | A4.2 F4.2 | B4.4 E5.4 B4.2 | A4.2 C5.2 | F4.4 D5.4 B4.2 | E5.4 D5.4 C5.2",
        "left": "(C3 E3 G3).1 | (G2 B2 D3 F3).1 | (A2 C3 E3).1 | (D3 F3 A3).1 | (E3 B3 D4 G#3).1 | (A2 C3 E3 A3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "G7 先落到 Am，随后 Dm–E7–Am 将 A 组织成一个局部小调中心。末两小节回到 C。",
        "key": "C"
      }
    ]
  },
  {
    "id": "minor-major-phrase-pair",
    "title": "同一动机的关系大调与小调句尾",
    "tempo": 76,
    "variants": [
      {
        "label": "两句都落在 A 小调",
        "right": "A4.4 C5.8 B4.8 E5.2 | A4.2 F4.2 | B4.2 D5.2 | C5.2 E5.2 | A4.4 C5.8 B4.8 E5.2 | A4.2 F4.2 | B4.2 D5.2 | C5.4 B4.4 A4.2",
        "left": "(A2 C3 E3).1 | (D3 F3 A3).1 | (E3 B3 D4 G#3).1 | (A2 C3 E3).1 | (A2 C3 E3).1 | (D3 F3 A3).1 | (E3 B3 D4 G#3).1 | (A2 C3 E3).1",
        "description": "两句都由 E7 准备 Am，虽然旋律第一次停在 E，低音仍把 A 确立为落点。",
        "key": "C"
      },
      {
        "label": "第一句落 C，第二句落 A",
        "right": "A4.4 C5.8 B4.8 E5.2 | A4.2 F4.2 | B4.2 D5.2 | C5.2 E5.2 | A4.4 C5.8 B4.8 E5.2 | A4.2 F4.2 | B4.2 D5.2 | C5.4 B4.4 A4.2",
        "left": "(A2 C3 E3).1 | (F2 A2 C3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1 | (A2 C3 E3).1 | (D3 F3 A3).1 | (E3 B3 D4 G#3).1 | (A2 C3 E3).1",
        "description": "第一句用 F–G7–C，第二句用 Dm–E7–Am。C、E 在两个落点都能成立，低音和属和弦交代新的中心。",
        "key": "C"
      }
    ]
  },
  {
    "id": "borrowed-minor-subdominant",
    "title": "同一旋律下的 IV 与借用 iv",
    "variants": [
      {
        "label": "C–F–G7–C",
        "right": "E5.4 G5.4 C5.2 | C5.4 F5.4 C5.2 | D5.4 G4.4 B4.2 | C5.2 E5.4 C5.4",
        "left": "(C3 E3 G3).1 | (F2 A2 C3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "中段保留 F 大三和弦的 A，整句使用 C 大调本身的下属。",
        "key": "C"
      },
      {
        "label": "C–Fm–G7–C",
        "right": "E5.4 G5.4 C5.2 | C5.4 F5.4 C5.2 | D5.4 G4.4 B4.2 | C5.2 E5.4 C5.4",
        "left": "(C3 E3 G3).1 | (F2 Ab2 C3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "同一个 F 低音和右手不动，伴奏的 A 降为 A♭。G7 与 C 将下一句仍接在大调上。",
        "key": "C"
      }
    ]
  },
  {
    "id": "minor-ending-major-third",
    "title": "小调终止的原三音与升高三音",
    "tempo": 73,
    "variants": [
      {
        "label": "G7 → Cm",
        "right": "G4.4 C5.2 G4.4 | Ab4.4 F4.4 C5.2 | G4.2 D5.4 B4.4 | C5.1",
        "left": "(C3 Eb3 G3).1 | (F2 Ab2 C3).1 | (G2 B2 D3 F3).1 | (C3 Eb3 G3).1",
        "description": "低音 G–C，导音 B–C，末和弦保持小三音 E♭。",
        "key": "Eb"
      },
      {
        "label": "G7 → C",
        "right": "G4.4 C5.2 G4.4 | Ab4.4 F4.4 C5.2 | G4.2 D5.4 B4.4 | C5.1",
        "left": "(C3 Eb3 G3).1 | (F2 Ab2 C3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "终止前的 C 小调和声与低音落点都相同，末和弦把 E♭ 提高为 E。",
        "key": "Eb"
      }
    ]
  }
];
