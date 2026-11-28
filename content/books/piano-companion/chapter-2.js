export const examples = [
  {
    "id": "five-patterns",
    "title": "同一个 C 和弦的五种音型",
    "tempo": 88,
    "variants": [
      {
        "label": "柱式",
        "right": "(E4 G4 C5).4 (E4 G4 C5).4 (E4 G4 C5).4 (E4 G4 C5).4",
        "left": "C3.4 C3.4 C3.4 C3.4",
        "description": "四次起音都由左右手同时落下。"
      },
      {
        "label": "带低音",
        "right": "r.4 (E4 G4 C5).4 r.4 (E4 G4 C5).4",
        "left": "C3.2 G2.2",
        "description": "低音落在第一、三拍，另两拍由上层整组和弦回答。"
      },
      {
        "label": "半分解",
        "right": "C4.8 (E4 G4).8 C4.8 (E4 G4).8 C4.8 (E4 G4).8 C4.8 (E4 G4).8",
        "left": "C3.1",
        "description": "C4 单奏，与 E4、G4 的双音交替。"
      },
      {
        "label": "分解",
        "right": "C4.8 E4.8 G4.8 E4.8 C4.8 E4.8 G4.8 E4.8",
        "left": "C3.1",
        "description": "同一组音一次只出现一个。"
      },
      {
        "label": "综合式",
        "right": "C4.8 E4.8 G4.8 E4.8 (C4 E4 G4).2",
        "left": "C3.2 C3.2",
        "description": "前半逐音展开，后半两手同时落下。"
      }
    ]
  },
  {
    "id": "texture-layer-example",
    "title": "同一旋律下的音型层次",
    "variants": [
      {
        "label": "单层分解",
        "right": "G5.4 E5.4 G5.2",
        "left": "C3.8 E3.8 G3.8 E3.8 C3.8 E3.8 G3.8 E3.8",
        "description": "一条左手分解同时提供根音和其他和弦音。"
      },
      {
        "label": "低音与和声分层",
        "right": "G5.4 E5.4 G5.2",
        "left": "C3.4 (E3 G3 C4).4 C3.4 (E3 G3 C4).4",
        "description": "同一旋律下，左手的深位根音和中音区柱式回答分两层出现。"
      },
      {
        "label": "钢琴留出旋律",
        "right": "r.4 (E4 G4 C5).4 r.4 (E4 G4 C5).4",
        "left": "C3.2 G2.2",
        "description": "钢琴提供两层和声背景，主旋律可由另一件乐器或人声承担。"
      }
    ]
  },
  {
    "id": "pattern-from-voicing",
    "title": "和弦骨架、半分解与八度分解",
    "variants": [
      {
        "label": "柱式骨架",
        "right": "(C4 E4 G4).1 | (C4 F4 A4).1 | (B3 D4 G4).1 | (C4 E4 G4).1",
        "left": "C3.1 | F2.1 | G2.1 | C3.1",
        "description": "上方各音与低音齐奏，各声部间的距离清楚可辨。"
      },
      {
        "label": "半分解",
        "right": "r.8 C4.8 (E4 G4).8 C4.8 r.8 C4.8 (E4 G4).8 C4.8 | r.8 C4.8 (F4 A4).8 C4.8 r.8 C4.8 (F4 A4).8 C4.8 | r.8 B3.8 (D4 G4).8 B3.8 r.8 B3.8 (D4 G4).8 B3.8 | r.8 C4.8 (E4 G4).8 C4.8 r.8 C4.8 (E4 G4).8 C4.8",
        "left": "C3.1 | F2.1 | G2.1 | C3.1",
        "description": "右手保持原来的近位连接，把内侧单音与上侧双音拆开。"
      },
      {
        "label": "八度分解",
        "right": "C4.8 E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 E4.8 | C4.8 F4.8 A4.8 C5.8 A4.8 F4.8 A4.8 F4.8 | B3.8 D4.8 G4.8 B4.8 G4.8 D4.8 G4.8 D4.8 | C4.8 E4.8 G4.8 C5.8 G4.8 E4.8 C4.4",
        "left": "C3.1 | F2.1 | G2.1 | C3.1",
        "description": "原和弦一个音一次出现，高八度再现使上层的音域展开。"
      }
    ]
  }
];
