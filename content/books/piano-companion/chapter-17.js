export const examples = [
  {
    "id": "pentatonic-center-compare",
    "title": "同一组骨干音在 C 与 A 上收束",
    "variants": [
      {
        "label": "C 宫",
        "right": "E4.4 G4.4 A4.4 G4.4 | E4.4 D4.4 C4.2",
        "left": "(C3 G3).1 | (C3 G3).1",
        "description": "句尾 C 与 C 低音重合，E 成为主音上方的大三度。"
      },
      {
        "label": "A 羽",
        "right": "E4.4 G4.4 A4.4 G4.4 | E4.4 C4.4 A3.2",
        "left": "(A2 E3).1 | (A2 E3).1",
        "description": "句尾与低音集中于 A，C 成为主音上方的小三度。"
      }
    ]
  },
  {
    "id": "pentatonic-add-replace",
    "title": "三度和弦与五声性加音",
    "variants": [
      {
        "label": "C–F–C",
        "right": "E4.4 G4.4 A4.4 G4.4 | A4.4 G4.4 E4.4 D4.4 | C4.1",
        "left": "(C3 E3 G3).1 | (F2 A2 C3).1 | (C3 E3 G3).1",
        "description": "中段 F 作为低音，制造明确的下属方向。"
      },
      {
        "label": "Cadd9 与换音",
        "right": "E4.4 G4.4 A4.4 G4.4 | A4.4 G4.4 E4.4 D4.4 | C4.1",
        "left": "(C3 D3 E3 G3).1 | (A2 D3 E3 G3).1 | (C3 D3 G3).1",
        "description": "低音和加音来自 C 宫骨干，结尾省三音后仍以 C 定点。"
      }
    ]
  },
  {
    "id": "pentatonic-bass-motion",
    "title": "长低音与五声低音回应",
    "variants": [
      {
        "label": "持续低音",
        "right": "E4.4 G4.4 A4.2 | G4.1 | E4.4 D4.4 C4.2",
        "left": "C3.1 | A2.1 | C3.1",
        "description": "旋律负责所有的走向，低音明确每小节的支点。"
      },
      {
        "label": "五声低音回应",
        "right": "E4.4 G4.4 A4.2 | G4.1 | E4.4 D4.4 C4.2",
        "left": "C3.2 G2.4 A2.4 | A2.4 C3.4 D3.4 E3.4 | C3.1",
        "description": "右手持 G 时，左手沿 A–C–D–E 延续五声轮廓，回到 C 时停止填充。"
      }
    ]
  }
];
