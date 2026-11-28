export const examples = [
  {
    "id": "bass-contours",
    "title": "低音的跳进、级进与反复",
    "tempo": 80,
    "variants": [
      {
        "label": "跳进",
        "right": "(C4 E4 G4).1 | (B3 D4 G4).1",
        "left": "C3.4 G2.4 C3.4 G2.4 | G3.4 D3.4 G3.4 D3.4",
        "description": "两小节分别用主和属的根音、五音交替，低音多为四、五度跳进。"
      },
      {
        "label": "和弦音级进",
        "description": "C–G/D–C/E–F 的低音 C–D–E–F 都是各自的和弦音。",
        "right": "(E4 G4 C5).1 | (D4 G4 B4).1 | (E4 G4 C5).1 | (F4 A4 C5).1",
        "left": "C3.1 | D3.1 | E3.1 | F3.1"
      },
      {
        "label": "跳进后加经过音",
        "right": "(C4 E4 G4).1 | (F4 A4 C5).1",
        "left": "C3.4 G2.4 C3.4 D3.8 E3.8 | F3.1",
        "description": "C–G 为跳进；弱部 D 是 C 和弦外的经过音，连接 C 与 E，随后到 F。"
      },
      {
        "label": "固定低音",
        "right": "(C4 E4 G4).1 | (C4 F4 A4).1 | (C4 E4 G4).1",
        "left": "C3.4 G2.4 A2.4 G2.4 | C3.4 G2.4 A2.4 G2.4 | C3.4 G2.4 A2.4 G2.4",
        "description": "上方从 C 转 F/C，再回 C；低音型每小节仍按 C–G–A–G 反复。"
      }
    ]
  },
  {
    "id": "six-four-roles",
    "title": "同一转位结构的四种位置",
    "tempo": 82,
    "variants": [
      {
        "label": "交替",
        "right": "(E4 G4 C5).4 (E4 G4 C5).4 (E4 G4 C5).4 (E4 G4 C5).4 | (D4 G4 B4).1",
        "left": "C3.4 G2.4 C3.4 G2.4 | G3.1",
        "description": "第 1 小节用 C、G 交替；下一小节的 G 提高八度，属和弦落点更清楚。"
      },
      {
        "label": "经过",
        "right": "(E4 G4 C5).2 (D4 G4 B4).4 (E4 G4 C5).4 | (C4 F4 A4).1",
        "left": "C3.2 D3.4 E3.4 | F3.1",
        "description": "主和弦原位与第一转位间加入短的 G/D，低音 C–D–E–F。"
      },
      {
        "label": "辅助",
        "right": "(E4 G4 C5).2 (F4 A4 C5).4 (E4 G4 C5).4 | (E4 G4 C5).1",
        "left": "C3.2 C3.4 C3.4 | C3.1",
        "description": "F/C 的两个上方音离开 C 和弦再回来，低音一直是 C。"
      },
      {
        "label": "终止",
        "right": "(E4 G4 C5).2 (D4 F4 B4).2 | (E4 G4 C5).1",
        "left": "G2.2 G2.2 | C3.1",
        "description": "第一拍的 C/G 在同一属低音上转为 G7，然后回原位主和弦。"
      }
    ]
  },
  {
    "id": "first-inversion-routes",
    "title": "第一转位低音的连接",
    "tempo": 79,
    "variants": [
      {
        "label": "辅助 C–G/B–C",
        "description": "低音由 C 下行至 B，再回到 C。",
        "right": "(E4 G4 C5).1 | (D4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | B2.1 | C3.1"
      },
      {
        "label": "经过 C–G/B–Am",
        "description": "中间同样是 G/B，这次 B 继续下行到 A。",
        "right": "(E4 G4 C5).1 | (D4 G4 B4).1 | (E4 A4 C5).1",
        "left": "C3.1 | B2.1 | A2.1"
      },
      {
        "label": "接上四度 C–C/E–F",
        "description": "第一转位把低音移到 E，再级进到 F。",
        "right": "(E4 G4 C5).1 | (E4 G4 C5).1 | (F4 A4 C5).1",
        "left": "C3.1 | E3.1 | F3.1"
      },
      {
        "label": "接下四度 F–C/E–C",
        "description": "F 先下行半音到 E，转为原位后低音落在 C。",
        "right": "(F4 A4 C5).1 | (E4 G4 C5).1 | (E4 G4 C5).1",
        "left": "F3.1 | E3.1 | C3.1"
      }
    ]
  },
  {
    "id": "dominant-seventh-bass",
    "title": "属七转位中的低音走向",
    "tempo": 84,
    "variants": [
      {
        "label": "根音与五音交替",
        "right": "(B3 D4 F4 G4).4 (B3 D4 F4 G4).4 (B3 D4 F4 G4).4 (B3 D4 F4 G4).4 | (C4 E4 G4).1",
        "left": "G2.4 D3.4 G2.4 D3.4 | C3.1",
        "description": "G7 保持四拍，低音用 G 和 D 交替，最后下行到 C。"
      },
      {
        "label": "辅助属六五",
        "description": "低音 C–B–C，把短暂的属和声包在两个主和弦内。",
        "right": "(E4 G4 C5).1 | (D4 F4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | B2.1 | C3.1"
      },
      {
        "label": "经过属四三",
        "description": "低音 C–D–E 逐级上行，最后仍是主功能。",
        "right": "(E4 G4 C5).1 | (D4 F4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | D3.1 | E3.1"
      },
      {
        "label": "属二到主六",
        "description": "G7/F 直接接 C/E，七音 F 在最低处下行半音到 E。",
        "right": "(D4 F4 G4 B4).1 | (E4 G4 C5).1 | (E4 G4 C5).1",
        "left": "F3.1 | E3.1 | C3.1"
      },
      {
        "label": "属二转换低音",
        "description": "属七先从 F 换到 D，而后才进入主六；七音的解决发生在上方。",
        "right": "(D4 F4 G4 B4).1 | (D4 F4 G4 B4).1 | (E4 G4 C5).1 | (E4 G4 C5).1",
        "left": "F3.1 | D3.1 | E3.1 | C3.1"
      }
    ]
  },
  {
    "id": "major-inversion-vocabulary",
    "title": "C 大调的转位进行",
    "tempo": 108,
    "variants": [
      {
        "label": "C–G/B–G–C",
        "description": "先以 B 进入属区，再用 G 原位强化收束。",
        "right": "(E4 G4 C5).1 | (D4 G4 B4).1 | (D4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | B2.1 | G2.1 | C3.1"
      },
      {
        "label": "C–G–G/B–C",
        "description": "属区由 G 移到 B，导音低音上行到主音 C。",
        "right": "(E4 G4 C5).1 | (D4 G4 B4).1 | (D4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | G2.1 | B2.1 | C3.1"
      },
      {
        "label": "C–F/C–G7/B–C",
        "description": "前段保持 C，后段低音 B–C 形成半音收束。",
        "right": "(E4 G4 C5).1 | (F4 A4 C5).1 | (D4 F4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | C3.1 | B2.1 | C3.1"
      },
      {
        "label": "C–G7/D–C/E–F",
        "description": "低音 C–D–E–F 级进，将主区接到下属。",
        "right": "(E4 G4 C5).1 | (D4 F4 G4 B4).1 | (E4 G4 C5).1 | (F4 A4 C5).1",
        "left": "C3.1 | D3.1 | E3.1 | F3.1"
      },
      {
        "label": "C–C/E–G7/D–G7",
        "description": "主和弦三音 E 下行至 D，随后停在属区。",
        "right": "(E4 G4 C5).1 | (E4 G4 C5).1 | (D4 F4 G4 B4).1 | (D4 F4 G4 B4).1",
        "left": "C3.1 | E3.1 | D3.1 | G2.1"
      },
      {
        "label": "C–G7/D–C/E–C",
        "description": "低音 C–D–E 逐级上行，再由 E 回 C。",
        "right": "(E4 G4 C5).1 | (D4 F4 G4 B4).1 | (E4 G4 C5).1 | (E4 G4 C5).1",
        "left": "C3.1 | D3.1 | E3.1 | C3.1"
      },
      {
        "label": "C–C/G–F/A–G",
        "description": "第二小节起保持低音 G–A–G 的轮廓，句末停在属。",
        "right": "(E4 G4 C5).1 | (E4 G4 C5).1 | (F4 A4 C5).1 | (D4 G4 B4).1",
        "left": "C3.1 | G2.1 | A2.1 | G2.1"
      },
      {
        "label": "C/E–C–G7/D–G7",
        "description": "主六先回原位，转到属四三后再落到属根音。",
        "right": "(E4 G4 C5).1 | (E4 G4 C5).1 | (D4 F4 G4 B4).1 | (D4 F4 G4 B4).1",
        "left": "E3.1 | C3.1 | D3.1 | G2.1"
      },
      {
        "label": "C–C/E–F–G–C",
        "description": "低音 C–E–F–G 接上主到下属、属、主的完全进行。",
        "right": "(E4 G4 C5).1 | (E4 G4 C5).1 | (F4 A4 C5).1 | (D4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | E3.1 | F3.1 | G3.1 | C4.1"
      },
      {
        "label": "C–C/G–F/A–G/B–C",
        "description": "低音进入 G 后，沿 G–A–B–C 逐级上行。",
        "right": "(E4 G4 C5).1 | (E4 G4 C5).1 | (F4 A4 C5).1 | (D4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | G2.1 | A2.1 | B2.1 | C3.1"
      },
      {
        "label": "C–C/E–F–G7/D–C",
        "description": "到达下属 F 后，低音改走 D–C 收束。",
        "right": "(E4 G4 C5).1 | (E4 G4 C5).1 | (F4 A4 C5).1 | (D4 F4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | E3.1 | F3.1 | D3.1 | C3.1"
      },
      {
        "label": "C–G7/F–C/E–G7/D–C",
        "description": "低音 F–E–D–C 下行，属二的七音先解决到 E。",
        "right": "(E4 G4 C5).1 | (D4 F4 G4 B4).1 | (E4 G4 C5).1 | (D4 F4 G4 B4).1 | (E4 G4 C5).1",
        "left": "C3.1 | F3.1 | E3.1 | D3.1 | C3.1"
      }
    ]
  },
  {
    "id": "minor-inversion-vocabulary",
    "title": "A 小调的转位进行",
    "tempo": 108,
    "variants": [
      {
        "label": "Am–E/G♯–E–Am",
        "description": "G♯先进入低音，再换为 E 原位，最后回主。",
        "right": "(E4 A4 C5).1 | (E4 G#4 B4).1 | (E4 G#4 B4).1 | (E4 A4 C5).1",
        "left": "A2.1 | G#2.1 | E2.1 | A2.1"
      },
      {
        "label": "Am–E–E/G♯–Am",
        "description": "属根音换成导音低音，G♯上行半音到 A。",
        "right": "(E4 A4 C5).1 | (E4 G#4 B4).1 | (E4 G#4 B4).1 | (E4 A4 C5).1",
        "left": "A2.1 | E2.1 | G#2.1 | A2.1"
      },
      {
        "label": "Am–Dm/A–E7/G♯–Am",
        "description": "先延续低音 A，再以 G♯–A 收束。",
        "right": "(E4 A4 C5).1 | (D4 F4 A4).1 | (D4 E4 G#4 B4).1 | (E4 A4 C5).1",
        "left": "A2.1 | A2.1 | G#2.1 | A2.1"
      },
      {
        "label": "Am–E7/B–Am/C–Dm",
        "description": "低音 A–B–C–D 逐级接到下属。",
        "right": "(E4 A4 C5).1 | (D4 E4 G#4 B4).1 | (E4 A4 C5).1 | (D4 F4 A4).1",
        "left": "A2.1 | B2.1 | C3.1 | D3.1"
      },
      {
        "label": "Am–Am/C–E7/B–E7",
        "description": "主六低音 C 先下行到 B，句尾停在属。",
        "right": "(E4 A4 C5).1 | (E4 A4 C5).1 | (D4 E4 G#4 B4).1 | (D4 E4 G#4 B4).1",
        "left": "A2.1 | C3.1 | B2.1 | E2.1"
      },
      {
        "label": "Am–E7/B–Am/C–Am",
        "description": "低音 A–B–C 之后回 A，上方回到主和弦。",
        "right": "(E4 A4 C5).1 | (D4 E4 G#4 B4).1 | (E4 A4 C5).1 | (E4 A4 C5).1",
        "left": "A2.1 | B2.1 | C3.1 | A2.1"
      },
      {
        "label": "Am–Am/E–Dm/F–E",
        "description": "低音 E–F–E 形成邻音轮廓，句末停在属。",
        "right": "(E4 A4 C5).1 | (E4 A4 C5).1 | (D4 F4 A4).1 | (E4 G#4 B4).1",
        "left": "A2.1 | E2.1 | F2.1 | E2.1"
      },
      {
        "label": "Am/C–Am–E7/B–E7",
        "description": "主六先回原位，属四三再转属七原位。",
        "right": "(E4 A4 C5).1 | (E4 A4 C5).1 | (D4 E4 G#4 B4).1 | (D4 E4 G#4 B4).1",
        "left": "C3.1 | A2.1 | B2.1 | E2.1"
      },
      {
        "label": "Am–Am/C–Dm–E–Am",
        "description": "C–D–E 逐级支撑下属到属，最终回到 Am。",
        "right": "(E4 A4 C5).1 | (E4 A4 C5).1 | (D4 F4 A4).1 | (E4 G#4 B4).1 | (E4 A4 C5).1",
        "left": "A2.1 | C3.1 | D3.1 | E3.1 | A2.1"
      },
      {
        "label": "Am–Am/E–D/F♯–E/G♯–Am",
        "description": "大下属提供升六级，E–F♯–G♯–A 上行进入主音。",
        "right": "(E4 A4 C5).1 | (E4 A4 C5).1 | (D4 F#4 A4).1 | (E4 G#4 B4).1 | (E4 A4 C5).1",
        "left": "A2.1 | E2.1 | F#2.1 | G#2.1 | A2.1"
      },
      {
        "label": "Am–Am/C–Dm–E7/B–Am",
        "description": "低音 A–C–D 上行，后经 B 回到 A。",
        "right": "(E4 A4 C5).1 | (E4 A4 C5).1 | (D4 F4 A4).1 | (D4 E4 G#4 B4).1 | (E4 A4 C5).1",
        "left": "A2.1 | C3.1 | D3.1 | B2.1 | A2.1"
      },
      {
        "label": "Am–E7/D–Am/C–E7/B–Am",
        "description": "低音 D–C–B–A 下行，属二的七音 D 先解决至 C。",
        "right": "(E4 A4 C5).1 | (D4 E4 G#4 B4).1 | (E4 A4 C5).1 | (D4 E4 G#4 B4).1 | (E4 A4 C5).1",
        "left": "A2.1 | D3.1 | C3.1 | B2.1 | A2.1"
      }
    ]
  }
];
