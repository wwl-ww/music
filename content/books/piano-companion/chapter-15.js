export const examples = [
  {
    "id": "major-applied-chain",
    "title": "同一句中的连续临时属—主",
    "tempo": 78,
    "variants": [
      {
        "label": "调内连接",
        "right": "G4.2 r.2 | B4.2 E5.2 | E5.2 C5.2 | C5.2 A4.2 | A4.2 F4.2 | A4.2 C5.2 | G4.2 F4.2 | E4.1",
        "left": "(C3 E3 G3).1 | (E3 G3 B3).1 | (A2 E3 A3).1 | (F2 A2 C3).1 | (D3 F3 A3).1 | (F2 A2 C3).1 | (G2 B2 F3).1 | (C3 E3 G3).1",
        "description": "旋律在原有拍点推进，低音沿调内根音移动。"
      },
      {
        "label": "连续副属",
        "right": "G4.2 r.2 | B4.2 E5.2 | E5.2 C5.2 | C5.2 A4.2 | A4.2 F4.2 | A4.2 C5.2 | G4.2 F4.2 | E4.1",
        "left": "(C3 E3 G3).2 (B2 D#3 A3).2 | (E3 G3 B3).1 | (E3 G#3 D4).2 (A2 E3 A3).2 | (C3 E3 Bb3).2 (F2 A2 C3).2 | (A2 C#3 G3).2 (D3 F3 A3).2 | (D3 F#3 A3 C4).1 | (G2 B2 F3).1 | (C3 E3 G3).1",
        "description": "B7、E7、C7、A7 分别凸显 Em、Am、F、Dm。末尾 D7–G7–C 仍确立 C。"
      }
    ]
  },
  {
    "id": "major-vi-two-resolutions",
    "title": "E7 的正常解决与阻碍走向",
    "variants": [
      {
        "label": "E7 → Am",
        "right": "G4.2 E4.2 | B4.2 E5.2 | A4.2 C5.2",
        "left": "(C3 E3 G3).1 | (E3 G#3 D4).1 | (A2 C3 E3 A3).1",
        "description": "低音 E 跳向 A，内声 G♯、D 分别进入 A、C。"
      },
      {
        "label": "E7 → F",
        "right": "G4.2 E4.2 | B4.2 E5.2 | A4.2 C5.2",
        "left": "(C3 E3 G3).1 | (E3 G#3 D4).1 | (F3 A3 C4).1",
        "description": "右手 A、C 也是 F 的和弦音，低音改成 E–F 半音上行。"
      }
    ]
  },
  {
    "id": "major-ii-approach",
    "title": "同一终止前的 Am 与 A7",
    "variants": [
      {
        "label": "Am → Dm",
        "right": "A4.2 E5.2 | F5.2 A4.2 | B4.2 D5.2 | C5.1",
        "left": "(A2 C3 E3).1 | (D3 F3 A3).1 | (G2 B2 F3).1 | (C3 E3 G3).1",
        "description": "Am 到 Dm 保留调内色彩，句末由 G7–C 收束。"
      },
      {
        "label": "A7 → Dm",
        "right": "A4.2 E5.2 | F5.2 A4.2 | B4.2 D5.2 | C5.1",
        "left": "(A2 C#3 E3 G3).1 | (D3 F3 A3).1 | (G2 B2 F3).1 | (C3 E3 G3).1",
        "description": "多出的 C♯ 与 G 把 Dm 的入口提前勾出；末尾仍是同一个 G7–C。"
      }
    ]
  },
  {
    "id": "major-iv-join",
    "title": "同一段落接缝的 C 与 C7",
    "variants": [
      {
        "label": "C → F",
        "right": "E4.2 G4.2 | A4.2 F4.2 | E4.1",
        "left": "(C3 E3 G3).1 | (F3 A3 C4).1 | (C3 E3 G3).1",
        "description": "C–F 从主功能走向下属功能，前一段的结束感仍在。"
      },
      {
        "label": "C7 → F",
        "right": "E4.2 G4.2 | A4.2 F4.2 | E4.1",
        "left": "(C3 E3 Bb3).1 | (F3 A3 C4).1 | (C3 E3 G3).1",
        "description": "内声 B♭ 下行到 A，F 的开头更像临时落点。"
      }
    ]
  },
  {
    "id": "major-iii-resolution",
    "title": "B7 后的 Em 与 C",
    "variants": [
      {
        "label": "到 Em",
        "right": "B4.2 A4.2 | G4.2 E4.2 | A4.1",
        "left": "(B2 D#3 F#3 A3).1 | (E3 G3 B3).1 | (A2 C3 E3).1",
        "description": "低音 B–E 确立 Em 的局部落点，D♯ 走到同音区的 E。"
      },
      {
        "label": "到 C",
        "right": "B4.2 A4.2 | G4.2 E4.2 | A4.1",
        "left": "(B2 D#3 F#3 A3).1 | (C3 E3 G3).1 | (A2 C3 E3).1",
        "description": "右手 G、E 保持，低音 B–C 级进，回到大调主和弦。"
      }
    ]
  }
];
