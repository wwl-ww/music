export const examples = [
  {
    "id": "harmonic-minor-routes",
    "title": "A 和声小调的四种基本进行",
    "tempo": 76,
    "variants": [
      {
        "label": "正格",
        "right": "C5.2 E5.2 | B4.2 G#4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (E2 G#2 B2 E3).1 | (A2 C3 E3).1",
        "description": "E 上的 G♯离 A 半音，属到主的收束清楚。"
      },
      {
        "label": "变格",
        "right": "C5.2 E5.2 | F5.2 D5.2 | C5.2 A4.2",
        "left": "(A2 C3 E3).1 | (D3 F3 A3).1 | (A2 C3 E3).1",
        "description": "Dm 回 Am 时保留共同音 A，另两声部各走一步。"
      },
      {
        "label": "完全",
        "right": "C5.2 E5.2 | F5.2 A5.2 | B4.2 G#4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (D3 F3 A3).1 | (E2 G#2 B2 D3).1 | (A2 C3 E3).1",
        "description": "Dm 先离开主区，E7 集中推动终止，最后回到 Am。"
      },
      {
        "label": "半成",
        "right": "F5.2 A4.2 | G#4.2 E5.2",
        "left": "(D3 F3 A3).1 | (E2 G#2 B2 E3).1",
        "description": "属和弦占据最后一小节，G♯没有在本句解决到主音。"
      }
    ]
  },
  {
    "id": "natural-minor-borrowing",
    "title": "小属和弦与借用大属和弦",
    "tempo": 82,
    "variants": [
      {
        "label": "自然小调正格",
        "right": "C5.2 E5.2 | B4.2 G4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (E2 G2 B2 E3).1 | (A2 C3 E3).1",
        "description": "Em 含 G，旋律的 G 与伴奏一致；G 到 A 是全音。"
      },
      {
        "label": "小属转小下属",
        "right": "C5.2 E5.2 | B4.2 G4.2 | F4.2 D5.2 | C5.2 A4.2",
        "left": "(A2 C3 E3).1 | (E2 G2 B2 E3).1 | (D3 F3 A3).1 | (A2 C3 E3).1",
        "description": "G 下行到 F，Em 转到 Dm，再以变格关系结束。"
      },
      {
        "label": "借用 E7",
        "right": "C5.2 E5.2 | B4.2 E5.2 | A4.1",
        "left": "(A2 C3 E3).1 | (E2 G#2 B2 D3).1 | (A2 C3 E3).1",
        "description": "旋律在属小节用 B、E，伴奏加入 G♯、D 来加强收束。"
      },
      {
        "label": "G 与 G♯相撞",
        "right": "C5.2 E5.2 | B4.2 G4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (E2 G#2 B2 D3).1 | (A2 C3 E3).1",
        "description": "属小节后半，旋律的 G 与和弦三音 G♯在音级上相隔半音。"
      }
    ]
  },
  {
    "id": "melodic-minor-modes",
    "title": "升六、七级与还原六、七级的配法",
    "tempo": 79,
    "variants": [
      {
        "label": "升六、七级上行",
        "right": "C5.2 E5.2 | F#5.1 | G#5.1 | A5.1",
        "left": "(A2 C3 E3).1 | (D3 F#3 A3).1 | (E2 G#2 B2 D3).1 | (A2 C3 E3).1",
        "description": "F♯是 D 的三音，G♯是 E7 的三音，二者把旋律逐步引向 A。"
      },
      {
        "label": "大下属在内声",
        "right": "C5.2 E5.2 | A5.2 D5.2 | B4.2 G#4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (D3 F#3 A3 C4).1 | (E2 G#2 B2 D3).1 | (A2 C3 E3).1",
        "description": "旋律只唱 A、D，F♯和 C 出现在伴奏内，形成 D7。"
      },
      {
        "label": "还原六、七级下行",
        "right": "A5.1 | G5.1 | F5.1 | E5.2 A4.2",
        "left": "(A2 C3 E3).1 | (E2 G2 B2 E3).1 | (D3 F3 A3).1 | (A2 C3 E3).1",
        "description": "G 与 F 分别由 Em 与 Dm 承托，句尾仍归 A 小调。"
      },
      {
        "label": "进入关系大调",
        "right": "A5.1 | G5.2 F5.2 | E5.2 C5.2",
        "left": "(A2 C3 E3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "G、F 同为 G7 和弦音，G7 解决到 C，句尾把 C 建立为主音。"
      }
    ]
  }
];
