export const examples = [
  {
    "id": "color-dd-compare",
    "title": "D 大三和弦接 G 或 Dm",
    "tempo": 80,
    "variants": [
      {
        "label": "D → G",
        "right": "A4.2 F#4.2 | D4.1 | B4.2 D5.2 | C5.1",
        "left": "(D3 F#3 A3).1 | (G2 B2 D3).1 | (G2 B2 F3).1 | (C3 E3 G3).1",
        "description": "F♯ 上行到 G 的趋向由属功能承接。"
      },
      {
        "label": "D → Dm",
        "right": "A4.2 F#4.2 | D4.1 | B4.2 D5.2 | C5.1",
        "left": "(D3 F#3 A3).1 | (D3 F3 A3).1 | (G2 B2 F3).1 | (C3 E3 G3).1",
        "description": "第二小节保留 D 低音，内声转回 F，自然接回 ii–V7–I。"
      }
    ]
  },
  {
    "id": "color-dd-leading-compare",
    "title": "重属导七后直入属或经过终止四六",
    "tempo": 80,
    "variants": [
      {
        "label": "F♯°7 → G",
        "right": "A4.2 C5.2 | G4.1 | B4.2 D5.2 | C5.1",
        "left": "(F#2 A2 C3 Eb3).1 | (G2 B2 D3).1 | (G2 B2 F3).1 | (C3 E3 G3).1",
        "description": "F♯ 到 G，第二小节直接出现属的三音 B。"
      },
      {
        "label": "F♯°7 → C/G → G7",
        "right": "A4.2 C5.2 | G4.1 | B4.2 D5.2 | C5.1",
        "left": "(F#2 A2 C3 Eb3).1 | (G2 C3 E3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "G 低音维持两小节，C、E 先形成倚留，再收向 B、D。"
      }
    ]
  },
  {
    "id": "color-iv-major-seven-compare",
    "title": "F 上保留或加入内声 E",
    "tempo": 80,
    "variants": [
      {
        "label": "F 三和弦",
        "right": "A4.2 C5.2 | G4.2 E4.2 | F4.2 D4.2 | C4.1",
        "left": "(F2 A2 C3).1 | (E3 G3 B3).1 | (D3 F3 A3).1 | (C3 E3 G3).1",
        "description": "上声部保持，低音 F–E–D–C 逐级下行。"
      },
      {
        "label": "Fmaj7",
        "right": "A4.2 C5.2 | G4.2 E4.2 | F4.2 D4.2 | C4.1",
        "left": "(F2 A2 C3 E3).1 | (E3 G3 B3).1 | (D3 F3 A3).1 | (C3 E3 G3).1",
        "description": "新增的 E 保持到 Em，再下行到 D。"
      }
    ]
  },
  {
    "id": "color-iv-borrowed-compare",
    "title": "变格结尾中的 F 与 Fm",
    "tempo": 80,
    "variants": [
      {
        "label": "F → F → C",
        "right": "C5.2 F4.2 | C5.2 F4.2 | E4.1",
        "left": "(F2 A2 C3).1 | (F2 A2 C3).1 | (C3 E3 G3).1",
        "description": "下属和弦持续到回主前。"
      },
      {
        "label": "F → Fm → C",
        "right": "C5.2 F4.2 | C5.2 F4.2 | E4.1",
        "left": "(F2 A2 C3).1 | (F2 Ab2 C3).1 | (C3 E3 G3).1",
        "description": "共同音 C 留下，内声 A–A♭–G 走两次半音。"
      }
    ]
  },
  {
    "id": "color-iihalf-compare",
    "title": "同一 ii–V–I 中的 A 与 A♭",
    "tempo": 80,
    "variants": [
      {
        "label": "Dm7",
        "right": "D5.2 F4.2 | D5.2 B4.2 | C5.1",
        "left": "(D3 F3 A3 C4).1 | (G2 B2 F3).1 | (C3 E3 G3).1",
        "description": "四个和弦音都来自 C 大调。"
      },
      {
        "label": "Dø7",
        "right": "D5.2 F4.2 | D5.2 B4.2 | C5.1",
        "left": "(D3 F3 Ab3 C4).1 | (G2 B2 F3 G3).1 | (C3 E3 G3).1",
        "description": "A♭ 到 G 的半音让属和弦前增加一层小调色彩。"
      }
    ]
  },
  {
    "id": "color-bvi-compare",
    "title": "G7 后回主或绕行 A♭",
    "tempo": 80,
    "variants": [
      {
        "label": "G7 → C",
        "right": "B4.2 D5.2 | C5.1 | C5.1",
        "left": "(G2 B2 F3).1 | (C3 E3 G3).1 | (C3 E3 G3).1",
        "description": "第二小节已经回主。"
      },
      {
        "label": "G7 → A♭ → C",
        "right": "B4.2 D5.2 | C5.1 | C5.1",
        "left": "(G2 B2 F3).1 | (Ab2 C3 Eb3).1 | (C3 E3 G3).1",
        "description": "G–A♭ 半音上行，回主推迟到第三小节。"
      }
    ]
  },
  {
    "id": "color-bvii-compare",
    "title": "C 到 Am 之间的 G 或 B♭",
    "tempo": 80,
    "variants": [
      {
        "label": "C–G–Am–C",
        "right": "E4.2 G4.2 | D5.1 | C5.2 E5.2 | C5.1",
        "left": "(C3 E3 G3).1 | (G2 B2 D3).1 | (A2 C3 E3).1 | (C3 E3 G3).1",
        "description": "低音先走属音 G 再到 A。"
      },
      {
        "label": "C–B♭–Am–C",
        "right": "E4.2 G4.2 | D5.1 | C5.2 E5.2 | C5.1",
        "left": "(C3 E3 G3).1 | (Bb2 D3 F3).1 | (A2 C3 E3).1 | (C3 E3 G3).1",
        "description": "C–B♭–A 与原旋律形成下行低音，D 留在共同旋律层。"
      }
    ]
  },
  {
    "id": "color-biii-compare",
    "title": "共同顶音 G 下的 C 与 E♭",
    "tempo": 80,
    "variants": [
      {
        "label": "C–C–F–G",
        "right": "G4.1 | G4.1 | A4.2 F4.2 | G4.1",
        "left": "(C3 E3 G3).1 | (C3 E3 G3).1 | (F2 A2 C3).1 | (G2 B2 D3).1",
        "description": "第二小节保留主和弦。"
      },
      {
        "label": "C–E♭–F–G",
        "right": "G4.1 | G4.1 | A4.2 F4.2 | G4.1",
        "left": "(C3 E3 G3).1 | (Eb3 G3 Bb3).1 | (F2 A2 C3).1 | (G2 B2 D3).1",
        "description": "共同顶音不变，E♭–F–G 的低音从新音区继续上行。"
      }
    ]
  },
  {
    "id": "color-minor-major-four-compare",
    "title": "a 小调中的 Dm 与 D",
    "tempo": 80,
    "variants": [
      {
        "label": "Am–Dm–E7–Am",
        "right": "C5.2 E5.2 | A4.2 D5.2 | B4.2 G#4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (D3 F3 A3).1 | (E3 G#3 D4).1 | (A2 C3 E3).1",
        "description": "下属和弦沿用小调的 F 自然音。"
      },
      {
        "label": "Am–D–E7–Am",
        "right": "C5.2 E5.2 | A4.2 D5.2 | B4.2 G#4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (D3 F#3 A3).1 | (E3 G#3 D4).1 | (A2 C3 E3).1",
        "description": "F♯ 提亮了第二小节，E7 仍把结尾带回小调主和弦。"
      }
    ]
  },
  {
    "id": "color-minor-flat-two-compare",
    "title": "同一句中的 Dm 与 B♭/D",
    "tempo": 80,
    "variants": [
      {
        "label": "Am–Dm–E7–Am",
        "right": "A4.2 C5.2 | D5.2 F5.2 | E5.2 B4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (D3 F3 A3).1 | (E3 G#3 D4).1 | (A2 C3 E3).1",
        "description": "第二小节用通常的下属和弦。"
      },
      {
        "label": "Am–B♭/D–E7–Am",
        "right": "A4.2 C5.2 | D5.2 F5.2 | E5.2 B4.2 | A4.1",
        "left": "(A2 C3 E3).1 | (D3 F3 Bb3).1 | (E3 G#3 B3 D4).1 | (A2 C3 E3).1",
        "description": "低音仍是 D，内声 B♭→B→C 为属前增加半音。"
      }
    ]
  }
];
