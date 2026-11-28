export const examples = [
  {
    "id": "triad-character",
    "title": "固定 C 根音，改变三音和五音",
    "tempo": 72,
    "variants": [
      {
        "label": "大三",
        "right": "(C4 E4 G4).1",
        "left": "C3.1",
        "description": "E 与 G 形成大三和弦，第二个音程为小三度。"
      },
      {
        "label": "小三",
        "right": "(C4 Eb4 G4).1",
        "left": "C3.1",
        "description": "五音 G 保留，三音下降半音。"
      },
      {
        "label": "增三",
        "right": "(C4 E4 G#4).1",
        "left": "C3.1",
        "description": "在大三和弦的基础上升高五音。"
      },
      {
        "label": "减三",
        "right": "(C4 Eb4 Gb4).1",
        "left": "C3.1",
        "description": "三音和五音都低于大三和弦。"
      }
    ]
  },
  {
    "id": "chord-positions",
    "title": "同一个 C 和弦的顶音、低音与排列",
    "tempo": 72,
    "variants": [
      {
        "label": "原位密集",
        "right": "(C4 E4 G4).1",
        "left": "C3.1",
        "description": "左手 C3 决定原位，右手 G4 在最高处，是五音旋律位置。"
      },
      {
        "label": "原位开放",
        "right": "(E4 C5).1",
        "left": "(C3 G3).1",
        "description": "低音仍是 C。顶音变成 C，上方三音张开超过八度，由两手分担。"
      },
      {
        "label": "第一转位",
        "right": "(C4 E4 G4).1",
        "left": "E3.1",
        "description": "右手和第一版相同。低音换为三音 E，整体变成第一转位。"
      }
    ]
  },
  {
    "id": "chord-symbol-six",
    "title": "第一转位与加六音",
    "tempo": 72,
    "variants": [
      {
        "label": "C/E · Ⅰ⁶",
        "right": "(G3 C4 E4).1",
        "left": "E3.1",
        "description": "最低音是 E，只包含 C、E、G 三种音。"
      },
      {
        "label": "C6",
        "right": "(C4 E4 G4 A4).1",
        "left": "C3.1",
        "description": "保留 C 低音，并加入六音 A。"
      }
    ]
  },
  {
    "id": "nearby-voicings",
    "title": "共同音保留与上方声部移动",
    "tempo": 78,
    "variants": [
      {
        "label": "C→G · 保留 G",
        "right": "(C4 E4 G4).2 (B3 D4 G4{t}).2",
        "left": "C3.2 G2.2",
        "description": "高音 G4 延续，另外两个音下行，低音换到 G2。"
      },
      {
        "label": "C→G · 不留 G",
        "right": "(C4 E4 G4).2 (D4 G4 B4).2",
        "left": "C3.2 G2.2",
        "description": "上方三条线向上，G 仍是共同音，但移到内声部。"
      },
      {
        "label": "C→Am · 两个共同音",
        "right": "(C4 E4 G4).2 (C4{t} E4{t} A4).2",
        "left": "C3.2 A2.2",
        "description": "C4、E4 延续，只有顶音 G4 上行到 A4。"
      },
      {
        "label": "F→G · 无共同音",
        "right": "(C4 F4 A4).2 (B3 D4 G4).2",
        "left": "F2.2 G2.2",
        "description": "低音上行二度，上方三个音分别向下，避免齐同向上抬。"
      }
    ]
  }
];
