export const examples = [
  {
    "id": "major-common-tone-momentum",
    "title": "共同旋律下的下三度与上四度",
    "variants": [
      {
        "label": "I → vi",
        "right": "E4.4 G4.8 A4.8 G4.2 | A4.2 C5.2 | F4.2 A4.2 | D5.2 B4.2 | C5.4 G4.4 E4.2",
        "left": "(C3 E3 G3).1 | (A2 C3 E3).1 | (D3 F3 A3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "C 与 Am 共用 C、E，调性仍在主区，之后 ii–V7–I 才加快推进。"
      },
      {
        "label": "I → IV",
        "right": "E4.4 G4.8 A4.8 G4.2 | A4.2 C5.2 | F4.2 A4.2 | D5.2 B4.2 | C5.4 G4.4 E4.2",
        "left": "(C3 E3 G3).1 | (F2 A2 C3).1 | (D3 F3 A3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "C 到 F 只保留 C，根音上四度带来更明显的下属色彩，后三小节保持相同。"
      }
    ]
  },
  {
    "id": "major-motif-two-basses",
    "title": "重复乐句的 I 与 vi",
    "variants": [
      {
        "label": "两次配 I",
        "right": "C5.4 E5.8 D5.8 C5.2 | C5.4 E5.8 D5.8 C5.2 | F4.2 D5.2 | E5.1",
        "left": "(C3 E3 G3).1 | (C3 E3 G3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "前两小节旋律与和声都原样返回，低音持续指向 C。"
      },
      {
        "label": "第二次配 vi",
        "right": "C5.4 E5.8 D5.8 C5.2 | C5.4 E5.8 D5.8 C5.2 | F4.2 D5.2 | E5.1",
        "left": "(C3 E3 G3).1 | (A2 C3 E3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "第二小节低音改成 A，共同音 C 与 E 保留，原旋律多了一层关系小调色彩。"
      }
    ]
  },
  {
    "id": "major-ii-six-cadence",
    "title": "同一个 F 低音的两种属准备",
    "variants": [
      {
        "label": "IV–V7–I",
        "right": "A4.4 C5.8 B4.8 A4.2 | G4.2 B4.2 | C5.2 G4.4 E4.4",
        "left": "(F2 A2 C3 F3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "F 与 A 稳住旋律，伴奏还有 C，形成 IV。B 上行到主音 C。"
      },
      {
        "label": "ii 第一转位–V7–I",
        "right": "A4.4 C5.8 B4.8 A4.2 | G4.2 B4.2 | C5.2 G4.4 E4.4",
        "left": "(F2 A2 D3 F3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "把伴奏的 C 换成 D，保留低音 F 和 A。右手的 C、B 在短时值上经过，第二小节 D 可继续留在 G7。"
      }
    ]
  },
  {
    "id": "major-double-dominant-cadence",
    "title": "ii 与重属七引向同一个终止",
    "tempo": 76,
    "variants": [
      {
        "label": "Dm → C/G → G7",
        "right": "E5.4 G5.8 F5.8 E5.2 | A4.2 D5.2 | C5.2 B4.2 | C5.1",
        "left": "(C3 E3 G3).1 | (D3 F3 A3).1 | (G2 C3 E3 G3).2 (G2 B2 D3 F3).2 | (C3 E3 G3).1",
        "description": "D 低音仍配 F 自然音，以普通下属色彩进入 G 低音。"
      },
      {
        "label": "D7 → C/G → G7",
        "right": "E5.4 G5.8 F5.8 E5.2 | A4.2 D5.2 | C5.2 B4.2 | C5.1",
        "left": "(C3 E3 G3).1 | (D3 F#3 A3 C4).1 | (G2 C3 E3 G3).2 (G2 B2 D3 F3).2 | (C3 E3 G3).1",
        "description": "F♯ 上行到 G，终止四六保留 G 低音，随后转入 G7 再回 C。"
      }
    ]
  },
  {
    "id": "major-vi-deceptive",
    "title": "属七后的完全收束和阻碍落点",
    "variants": [
      {
        "label": "V7 → I",
        "right": "A4.4 G4.8 F4.8 A4.2 | D5.2 B4.2 | C5.4 D5.8 E5.8 C5.2",
        "left": "(F2 A2 C3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3 C4).1",
        "description": "低音 G 到 C，属七的 B 向上解决到 C，乐句落在主和弦。"
      },
      {
        "label": "V7 → vi",
        "right": "A4.4 G4.8 F4.8 A4.2 | D5.2 B4.2 | C5.4 D5.8 E5.8 C5.2",
        "left": "(F2 A2 C3).1 | (G2 B2 D3 F3).1 | (A2 C3 E3 A3).1",
        "description": "B 同样上行到 C，F 同样可以下行到 E，低音改到 A，句尾留下延续感。"
      }
    ]
  },
  {
    "id": "major-iii-tonic-option",
    "title": "同一旋律中的 I 与 iii 延伸",
    "variants": [
      {
        "label": "IV–I–vi",
        "right": "A4.2 F4.2 | G4.4 E4.8 G4.8 E4.2 | E4.4 A4.4 C5.2 | B4.2 G4.2 | C5.1",
        "left": "(F2 A2 C3).1 | (C3 E3 G3).1 | (A2 C3 E3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "IV 后回到 I，句中已经清楚交代主功能。"
      },
      {
        "label": "IV–iii–vi",
        "right": "A4.2 F4.2 | G4.4 E4.8 G4.8 E4.2 | E4.4 A4.4 C5.2 | B4.2 G4.2 | C5.1",
        "left": "(F2 A2 C3).1 | (E3 G3 B3).1 | (A2 C3 E3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "旋律的 E 和 G 仍为和弦音。低音 F–E–A 改变了句中方向，最后仍回到 C。"
      }
    ]
  },
  {
    "id": "major-descending-bass",
    "title": "同一和弦序列的原位与下行低音",
    "tempo": 78,
    "variants": [
      {
        "label": "按和弦根音",
        "right": "G4.2 E4.2 | G4.2 D4.2 | E4.2 C4.2 | E4.2 G4.2 | A4.2 F4.2 | G4.2 E4.2 | F4.2 D4.2 | E4.1",
        "left": "(C3 G3 E3).1 | (G2 B2 D3).1 | (A2 C3 E3).1 | (E3 B3 G3).1 | (F2 A2 C3).1 | (C3 G3 E3).1 | (G2 B2 D3 F3).1 | (C3 G3 E3).1",
        "description": "低音直接给出 C、G、A、E、F、C、G、C，各处和弦根音都清楚。"
      },
      {
        "label": "按音阶低音",
        "right": "G4.2 E4.2 | G4.2 D4.2 | E4.2 C4.2 | E4.2 G4.2 | A4.2 F4.2 | G4.2 E4.2 | F4.2 D4.2 | E4.1",
        "left": "(C3 G3 E3).1 | (B2 D3 G3).1 | (A2 C3 E3).1 | (G2 B2 E3).1 | (F2 A2 C3).1 | (E2 G2 C3).1 | (D2 F2 G2 B2).1 | (C2 E2 G2).1",
        "description": "和弦次序相同，四个转位把低音改成 C–B–A–G–F–E–D–C。"
      }
    ]
  },
  {
    "id": "major-ii7-stepwise-resolution",
    "title": "ii 与 ii7 的终止声部线",
    "variants": [
      {
        "label": "Dm → G7 → C",
        "right": "A4.4 D5.4 F5.2 | D5.4 G4.4 B4.2 | C5.2 G4.4 E4.4",
        "left": "(D2 F2 A2 D3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "Dm 与 G7 共用 D、F，属七的三全音最后解向 C、E。"
      },
      {
        "label": "Dm7 → G7 → C",
        "right": "A4.4 D5.4 F5.2 | D5.4 G4.4 B4.2 | C5.2 G4.4 E4.4",
        "left": "(D2 F2 A2 C3).1 | (G2 B2 D3 F3).1 | (C3 E3 G3).1",
        "description": "加入的 C 在内声下行到 B，使 ii7 到 V7 更有方向。"
      }
    ]
  }
];
