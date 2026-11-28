export const examples = [
  {
    "id": "major-primary-routes",
    "title": "主、下属、属的四种走向",
    "variants": [
      {
        "label": "正格",
        "right": "(C4 E4 G4).2 (B3 D4 G4).2 | (C4 E4 G4).1",
        "left": "C3.2 G2.2 | C3.1",
        "description": "上方 G 保留，属和弦的 B 回到 C。"
      },
      {
        "label": "变格",
        "right": "(C4 E4 G4).2 (C4 F4 A4).2 | (C4 E4 G4).1",
        "left": "C3.2 F2.2 | C3.1",
        "description": "共同音 C 连起三次和弦，缺少大调属导音的推进。"
      },
      {
        "label": "完全进行",
        "right": "(C4 E4 G4).2 (C4 F4 A4).2 | (B3 D4 F4).2 (C4 E4 G4).2",
        "left": "C3.2 F2.2 | G2.2 C3.2",
        "description": "低音先 C–F，再 G–C。属七给最终的 C 留出明确落点。"
      },
      {
        "label": "半成进行",
        "right": "(C4 F4 A4).2 (B3 D4 G4).2",
        "left": "F2.2 G2.2",
        "description": "停在 G，不提前给出回主的结果。"
      }
    ]
  },
  {
    "id": "major-eight-bar-phrase",
    "title": "先确定和声布局，再分配双手",
    "tempo": 108,
    "variants": [
      {
        "label": "两小节一组",
        "meter": "3 4",
        "right": "E5.4 G5.4 C6.4 | G5.2 E5.4 | F5.2 D5.8 C5.8 | A4.4 C5.4 F5.4 | E5.4 G5.4 C6.4 | G5.2 E5.4 | D5.4 F5.4 B4.4 | C5.2 { d }",
        "left": "(C3 E3 G3).2 { d } | (C3{t} E3{t} G3{t}).2 { d } | (F2 A2 C3 F3).2 { d } | (F2{t} A2{t} C3{t} F3{t}).2 { d } | (C3 E3 G3).2 { d } | (C3{t} E3{t} G3{t}).2 { d } | (G2 B2 D3 F3).2 { d } | (C3 E3 G3).2 { d }",
        "description": "前六小节按 C、F、C 各两小节安排，末尾两小节才逐小节换和弦并结束。"
      },
      {
        "label": "提前进入属区",
        "meter": "3 4",
        "right": "E5.4 G5.4 C6.4 | G5.2 E5.4 | F5.2 D5.8 C5.8 | A4.4 C5.4 F5.4 | E5.4 G5.4 C6.4 | G5.2 E5.4 | D5.4 F5.4 B4.4 | C5.2 { d }",
        "left": "(C3 E3 G3).2 { d } | (C3{t} E3{t} G3{t}).2 { d } | (G2 B2 D3 F3).2 { d } | (F2 A2 C3 F3).2 { d } | (C3 E3 G3).2 { d } | (C3{t} E3{t} G3{t}).2 { d } | (G2 B2 D3 F3).2 { d } | (C3 E3 G3).2 { d }",
        "description": "第三小节在 F 下提前使用 G7，第四小节回 F，句中多了一次属到下属的转折。"
      },
      {
        "label": "低音与和弦应答",
        "meter": "3 4",
        "right": "E5.4 G5.4 C6.4 | G5.2 E5.4 | F5.2 D5.8 C5.8 | A4.4 C5.4 F5.4 | E5.4 G5.4 C6.4 | G5.2 E5.4 | D5.4 F5.4 B4.4 | C5.2 { d }",
        "left": "C3.4 (E3 G3 C4).4 (E3 G3 C4).4 | C3.4 (E3 G3 C4).4 (E3 G3 C4).4 | F2.4 (A3 C4 F4).4 (A3 C4 F4).4 | F2.4 (A3 C4 F4).4 (A3 C4 F4).4 | C3.4 (E3 G3 C4).4 (E3 G3 C4).4 | C3.4 (E3 G3 C4).4 (E3 G3 C4).4 | G2.4 (B3 D4 F4).4 (B3 D4 F4).4 | (C3 E3 G3).2 { d }",
        "description": "主旋律与基本和声不变。第一拍低音，后两拍和弦应答，形成清楚的三拍脉动。"
      }
    ]
  }
];
