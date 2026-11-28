export const examples = [
  {
    "id": "register-tone",
    "title": "同一动机在三个音区",
    "tempo": 84,
    "variants": [
      {
        "label": "低音区",
        "right": "r.1",
        "left": "C2.4 G2.4 E2.4 C2.4",
        "description": "C2–G2 的动机在低音区，音色厚重，余响更容易连起来。"
      },
      {
        "label": "中音区",
        "right": "C4.4 G4.4 E4.4 C4.4",
        "left": "r.1",
        "description": "同一动机移到中央 C 附近，起音与余响比较均衡。"
      },
      {
        "label": "高音区",
        "right": "C6.4 G6.4 E6.4 C6.4",
        "left": "r.1",
        "description": "同一动机再高两个八度，起音清脆，余响较短。"
      }
    ]
  },
  {
    "id": "spacing-comparison",
    "title": "低音、内声和旋律的距离",
    "tempo": 79,
    "variants": [
      {
        "label": "低音密集",
        "right": "E5.2 G5.2 | C5.1",
        "left": "(C2 E2 G2).1 | (C2 E2 G2).1",
        "description": "三个伴奏音都挤在低音区，低音团块沉重，离旋律也较远。"
      },
      {
        "label": "下疏上密",
        "right": "(E4 G4 E5).2 (G4 G5).2 | (E4 G4 C5).1",
        "left": "(C2 G2 C3).1 | (C2 G2 C3).1",
        "description": "最低两音开成五度，两手分担 C3 与 E4、G4。内声接上旋律，右手顶音仍是 E、G、C。"
      },
      {
        "label": "分解与过渡",
        "right": "E5.2 G5.2 | (E4 G4 C5).1",
        "left": "C2.8 G2.8 C3.8 E3.8 G3.8 E3.8 C3.8 G2.8 | (C2 G2 C3).1",
        "description": "最低两音先分开五度，再向中音区上行，句末合为两手分担的柱式。"
      },
      {
        "label": "两端分离",
        "right": "E5.2 G5.2 | C5.1",
        "left": "(C2 G2).1 | (C2 G2).1",
        "description": "低音与旋律之间没有中间声部，结尾的 C–G 空五度也未写出大小调色彩。"
      }
    ]
  },
  {
    "id": "chord-doubling-omission",
    "title": "同一终止的厚配与简配",
    "tempo": 76,
    "variants": [
      {
        "label": "根音与五音重复",
        "right": "D5.2 B4.2 | C5.1",
        "left": "(G2 B2 D3 F3 G3).2 (G2 D3 F3 G3).2 | (C3 E3 G3 C4).1",
        "description": "属和弦的 G、D 和主和弦的 C 加厚，属七的 F 只出现于一个声部。"
      },
      {
        "label": "减少内声",
        "right": "D5.2 B4.2 | C5.1",
        "left": "(G2 B2 F3).2 (G2 F3).2 | (C3 E3).1",
        "description": "第一拍组的 D 和第二拍组的 B 由旋律分别补上。主和弦省略 G，仍借 E 清楚呈现大三和弦色彩。"
      },
      {
        "label": "主六的外声部",
        "right": "D5.2 B4.2 | C5.1",
        "left": "(G2 B2 D3 F3).1 | (E3 G3 C4).1",
        "description": "终止和弦改为 C/E，三音 E 只放低音，旋律停在 C。"
      }
    ]
  },
  {
    "id": "phrase-ending-variants",
    "title": "分解和弦的五种句末变化",
    "tempo": 89,
    "variants": [
      {
        "label": "原音型",
        "right": "E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.8 G4.8 | D4.8 G4.8 B4.8 G4.8 F4.8 G4.8 B4.8 G4.8 | E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.8 G4.8",
        "left": "C3.1 | G2.1 | C3.1",
        "description": "最后一小节延续起始的八分音型。"
      },
      {
        "label": "微调音型",
        "right": "E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.8 G4.8 | D4.8 G4.8 B4.8 G4.8 F4.8 G4.8 B4.8 G4.8 | E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.8 (E4 G4).8",
        "left": "C3.1 | G2.1 | C3.1",
        "description": "只增厚最后一个八分音，音型轮廓与起音节奏保持一致。"
      },
      {
        "label": "改节奏",
        "right": "E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.8 G4.8 | D4.8 G4.8 B4.8 G4.8 F4.8 G4.8 B4.8 G4.8 | E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.4",
        "left": "C3.1 | G2.1 | C3.1",
        "description": "末尾八分音组合改为一个四分音，最后一个 C 明显延长。"
      },
      {
        "label": "改声部走向",
        "right": "E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.8 G4.8 | D4.8 G4.8 B4.8 G4.8 F4.8 G4.8 B4.8 G4.8 | E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.8 E5.8",
        "left": "C3.1 | G2.1 | C3.1",
        "description": "末音由下行回 G 改成上行至 E，句尾往上抬。"
      },
      {
        "label": "换音型",
        "right": "E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.8 G4.8 | D4.8 G4.8 B4.8 G4.8 F4.8 G4.8 B4.8 G4.8 | E4.8 G4.8 C5.8 G4.8 (E4 G4 C5).2",
        "left": "C3.1 | G2.1 | C3.1",
        "description": "第三拍改为持续的柱式和弦，三个和弦音同时停下。"
      },
      {
        "label": "改演奏法",
        "right": "E4.8 G4.8 C5.8 G4.8 E4.8 G4.8 C5.8 G4.8 | D4.8 G4.8 B4.8 G4.8 F4.8 G4.8 B4.8 G4.8 | E4.8 G4.8 C5.8 G4.8 E4.8 G4{st}.8 C5{st}.8 G4{st}.8",
        "left": "C3.1 | G2.1 | C3.1",
        "description": "音高及时值与原音型相同，末三个八分音缩短实际发声，形成断奏收尾。"
      }
    ]
  }
];
