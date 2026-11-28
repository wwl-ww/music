export const examples = [
  {
    "id": "section-density-layout",
    "title": "主段、对比段与再现的疏密",
    "tempo": 82,
    "variants": [
      {
        "label": "全段柱式",
        "right": "E5.4 G5.8 A5.8 G5.4 E5.4 | F5.4 A5.8 C6.8 A5.4 F5.4 | E5.4 G5.8 A5.8 G5.4 C5.4",
        "left": "(C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 | (F3 A3 C4).4 (F3 A3 C4).4 (F3 A3 C4).4 (F3 A3 C4).4 | G2.4 (B2 F3).4 (C3 E3 G3).2",
        "description": "同一种四分和弦贯穿三句，段落边界主要靠旋律。"
      },
      {
        "label": "A–B–A′",
        "right": "E5.4 G5.8 A5.8 G5.4 E5.4 | F5.4 A5.8 C6.8 A5.4 F5.4 | E5.4 G5.8 A5.8 G5.4 C5.4",
        "left": "(C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 | F2.8 C3.8 F3.8 A3.8 C4.8 A3.8 F3.8 C3.8 | G2.4 (B2 F3).4 (C3 E3 G3).2",
        "description": "中间一句展开成连续分解，末段回到更疏的低音与和弦。"
      },
      {
        "label": "逐步加密后收束",
        "right": "E5.4 G5.8 A5.8 G5.4 E5.4 | F5.4 A5.8 C6.8 A5.4 F5.4 | E5.4 G5.8 A5.8 G5.4 C5.4",
        "left": "C3.2 G2.2 | F2.8 C3.8 F3.8 A3.8 C4.8 A3.8 F3.8 C3.8 | G2.8 B2.8 D3.8 F3.8 (C3 E3 G3).2",
        "description": "开头只给两处低音，第二句流动起来，到收尾的主和弦停止细分。"
      }
    ]
  },
  {
    "id": "transition-choices",
    "title": "同一个转折长音的连接处理",
    "tempo": 90,
    "variants": [
      {
        "label": "直接转换",
        "right": "E5.4 G5.8 A5.8 G5.4 E5.4 | C5.1 | F5.4 A5.8 C6.8 A5.4 F5.4",
        "left": "(C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 | (C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 | F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16",
        "description": "长音下面保持原脉冲，新句一到才突然加密。"
      },
      {
        "label": "有准备",
        "right": "E5.4 G5.8 A5.8 G5.4 E5.4 | C5.1 | F5.4 A5.8 C6.8 A5.4 F5.4",
        "left": "(C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 | C3.4 (E3 G3).4 C3.16 E3.16 G3.16 E3.16 C3.16 E3.16 G3.16 E3.16 | F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16",
        "description": "长音后半已经出现十六分，新句延续同样的起音密度。"
      },
      {
        "label": "有过门",
        "right": "E5.4 G5.8 A5.8 G5.4 E5.4 | C5.2 r.2 | F5.4 A5.8 C6.8 A5.4 F5.4",
        "left": "(C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 | C3.2 E3.16 F3.16 G3.16 A3.16 G3.16 F3.16 E3.16 C3.16 | F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16 F3.16 A3.16",
        "description": "主线先停半小节，过门把十六分引到下一段。"
      },
      {
        "label": "保留共同音",
        "right": "E5.4 G5.8 A5.8 G5.4 E5.4 | C5.1 | F5.4 A5.8 C6.8 A5.4 F5.4",
        "left": "(C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 (C3 E3 G3).4 | C3.4 E3.4 G3.4 C4.4 | (F3 A3 C4).8 C4.8 (F3 A3 C4).8 C4.8 (F3 A3 C4).8 C4.8 (F3 A3 C4).8 C4.8",
        "description": "C 先在原和弦顶部出现，换到 F 后仍回到这个音。"
      }
    ]
  },
  {
    "id": "phrase-end-variations",
    "title": "句尾的音型变化与省略",
    "tempo": 78,
    "variants": [
      {
        "label": "维持原型",
        "right": "G5.4 F5.8 E5.8 D5.4 G5.4 | C5.1",
        "left": "G2.4 B2.4 D3.4 F3.4 | C3.8 E3.8 G3.8 C4.8 G3.8 E3.8 G3.8 E3.8",
        "description": "结尾保留连续的八分分解。"
      },
      {
        "label": "改变走向与音区",
        "right": "G5.4 F5.8 E5.8 D5.4 G5.4 | C5.1",
        "left": "G2.4 B2.4 D3.4 F3.4 | C4.8 G3.8 E3.8 C3.8 G2.8 E3.8 G3.8 C4.8",
        "description": "相同起音位置从较高音区开始，先下行再回升。"
      },
      {
        "label": "改变句尾节奏",
        "right": "G5.4 F5.8 E5.8 D5.4 G5.4 | C5.1",
        "left": "G2.4 B2.4 D3.4 F3.4 | C3.4 E3.4 G3.16 E3.16 G3.16 C4.16 (C3 E3 G3).4",
        "description": "前两拍放慢，第三拍短暂加密，末拍落到柱式。"
      },
      {
        "label": "省略后半",
        "right": "G5.4 F5.8 E5.8 D5.4 G5.4 | C5.1",
        "left": "G2.4 B2.4 D3.4 F3.4 | (C3 E3 G3).2 r.2",
        "description": "琴在后半小节停下，长音自己完成收束。"
      }
    ]
  },
  {
    "id": "phrase-fill-comparison",
    "title": "长音上的节奏、连接与模仿",
    "tempo": 78,
    "variants": [
      {
        "label": "节奏性插入",
        "right": "G5.4 F5.8 E5.8 D5.4 G5.4 | C5.1",
        "left": "G2.4 B2.4 D3.4 F3.4 | C3.2 (E3 G3).8 { tu 3 } (E3 G3).8 { tu 3 } (E3 G3).8 { tu 3 } (C3 E3 G3).4",
        "description": "长音下先保留空余，后半拍出一组双音三连音。"
      },
      {
        "label": "连接性插入",
        "right": "G5.4 F5.8 E5.8 D5.4 G5.4 | C5.1",
        "left": "G2.4 B2.4 D3.4 F3.4 | C3.2 E3.8 F3.8 G3.8 B3.8",
        "description": "短上行线把句尾往后带，尾音保留继续的趋向。"
      },
      {
        "label": "动机模仿",
        "right": "G5.4 F5.8 E5.8 D5.4 G5.4 | C5.1",
        "left": "G2.4 B2.4 D3.4 F3.4 | G3.4 F3.8 E3.8 D3.4 G3.4",
        "description": "低处重现前一小节音调和节奏，旋律长音上形成回声。"
      },
      {
        "label": "节奏模仿",
        "right": "G5.4 F5.8 E5.8 D5.4 G5.4 | C5.1",
        "left": "G2.4 B2.4 D3.4 F3.4 | C3.4 E3.8 G3.8 E3.4 C3.4",
        "description": "保留四分加两八分的前句节奏，旋律音高改为主和弦内音。"
      },
      {
        "label": "走向模仿",
        "right": "G5.4 F5.8 E5.8 D5.4 G5.4 | C5.1",
        "left": "G2.4 B2.4 D3.4 F3.4 | G3.8 F3.8 E3.4 C3.8 D3.8 E3.4",
        "description": "保留下行后回升的轮廓，重写句末音高和时值。"
      }
    ]
  },
  {
    "id": "melody-register-placement",
    "title": "同一旋律的高、中、低位置",
    "tempo": 80,
    "variants": [
      {
        "label": "高层旋律",
        "right": "E5.4 G5.4 E5.4 C5.4 | F5.4 D5.4 E5.4 C5.4",
        "left": "C3.1 | G2.2 C3.2",
        "description": "旋律保持在最上面，低音只交代和声。"
      },
      {
        "label": "句间提高八度",
        "right": "E5.4 G5.4 E5.4 C5.4 | F6.4 D6.4 E6.4 C6.4",
        "left": "C3.8 E3.8 G3.8 C4.8 G3.8 E3.8 G3.8 E3.8 | G2.8 D3.8 B3.8 F4.8 C3.8 E3.8 G3.8 C4.8",
        "description": "第二句的旋律高八度再现，下面的起伏把两个音区接在一起。"
      },
      {
        "label": "中层旋律",
        "right": "E4.4 G4.4 E4.4 C4.4 | F4.4 D4.4 E4.4 C4.4 || \\voice r.4 G5.4 r.4 G4.4 | r.4 B4.4 r.4 G4.4",
        "left": "C3.1 | G2.2 C3.2",
        "description": "主线移到中声部，高处只用较疏的和弦音作背景。"
      },
      {
        "label": "低层旋律",
        "right": "r.4 (E4 G4).4 r.4 (E4 G4).4 | r.4 (D4 F4).4 r.4 (E4 G4).4",
        "left": "E3.4 G3.4 E3.4 C3.4 | F3.4 D3.4 E3.4 C3.4",
        "description": "左手完整唱出同一旋律，高处和弦出现在它的间隙。"
      }
    ]
  },
  {
    "id": "melody-harmonization-levels",
    "title": "同一旋律下的音程与和弦加厚",
    "tempo": 80,
    "variants": [
      {
        "label": "单音",
        "right": "E5.4 G5.4 E5.4 C5.4 | F5.4 D5.4 E5.4 C5.4",
        "left": "C3.1 | G2.2 C3.2",
        "description": "竖直方向只保留一个旋律音。"
      },
      {
        "label": "三度与六度",
        "right": "(C5 E5).4 (E5 G5).4 (G4 E5).4 (E4 C5).4 | (D5 F5).4 (B4 D5).4 (C5 E5).4 (E4 C5).4",
        "left": "C3.1 | G2.2 C3.2",
        "description": "每一拍仍是同一最高音，下面添一个和声相合的音。"
      },
      {
        "label": "和弦加厚",
        "right": "(G4 C5 E5).4 (C5 E5 G5).4 (G4 C5 E5).4 (E4 G4 C5).4 | (B4 D5 F5).4 (F4 B4 D5).4 (G4 C5 E5).4 (E4 G4 C5).4",
        "left": "C3.1 | G2.2 C3.2",
        "description": "较多和声内音与旋律一起起音，最高线仍可辨认。"
      },
      {
        "label": "重拍点缀",
        "right": "(G4 C5 E5).4 G5.4 (G4 C5 E5).4 C5.4 | (B4 D5 F5).4 D5.4 (G4 C5 E5).4 C5.4",
        "left": "C3.1 | G2.2 C3.2",
        "description": "只在第 1、3 拍补和弦，其他旋律音保留单音。"
      }
    ]
  },
  {
    "id": "melody-variation-choices",
    "title": "同一和声与落点上的旋律变奏",
    "tempo": 82,
    "variants": [
      {
        "label": "原型",
        "right": "E5.4 G5.8 A5.8 G5.4 E5.4 | E5.4 D5.4 C5.2",
        "left": "C3.8 E3.8 G3.8 C4.8 G3.8 E3.8 G3.8 E3.8 | G2.2 (C3 E3 G3).2",
        "description": "原旋律和低音作为对照。"
      },
      {
        "label": "经过音与辅助音",
        "right": "E5.8 F5.8 G5.8 A5.8 G5.8 F5.8 G5.8 E5.8 | E5.8 D5.8 E5.8 D5.8 C5.2",
        "left": "C3.8 E3.8 G3.8 C4.8 G3.8 E3.8 G3.8 E3.8 | G2.2 (C3 E3 G3).2",
        "description": "相邻音连接 E 与 G，G–F–G 是离开又返回的辅助音。"
      },
      {
        "label": "分解和弦与短装饰",
        "right": "E5.8 G5.8 C6.8 G5.8 E5.16 F5.16 E5.8 G5.8 E5.8 | F5.8 D5.8 B4.8 D5.8 C5.2",
        "left": "C3.8 E3.8 G3.8 C4.8 G3.8 E3.8 G3.8 E3.8 | G2.2 (C3 E3 G3).2",
        "description": "用和弦音扩出较宽的轮廓，短装饰回到长音前的 E。"
      },
      {
        "label": "附点与三连音",
        "right": "E5.8 { d } G5.16 A5.8 { tu 3 } G5.8 { tu 3 } E5.8 { tu 3 } G5.8 { d } E5.16 E5.4 | E5.8 { d } D5.16 D5.4 C5.2",
        "left": "C3.8 E3.8 G3.8 C4.8 G3.8 E3.8 G3.8 E3.8 | G2.2 (C3 E3 G3).2",
        "description": "同一落点前的音值重新划分，附点与三等分形成对比。"
      },
      {
        "label": "综合与自由变奏",
        "right": "G5.8 { d } E5.16 C5.8 E5.8 G5.8 A5.8 G5.4 | B4.8 D5.8 F5.4 E5.8 D5.8 C5.4",
        "left": "C3.8 E3.8 G3.8 C4.8 G3.8 E3.8 G3.8 E3.8 | G2.2 (C3 E3 G3).2",
        "description": "由和弦重新组织旋律，最后仍在主和弦上落到 C。"
      }
    ]
  },
  {
    "id": "climax-build",
    "title": "同一高点的蓄积、加厚与消退",
    "tempo": 82,
    "variants": [
      {
        "label": "维持原织体",
        "right": "E5.4 G5.4 A5.2 | B5.2 A5.4 G5.4 | A5.1 | G5.4 F5.4 E5.2",
        "left": "C3.1 | E3.2 A2.2 | D3.2 G2.2 | G2.2 C3.2",
        "description": "旋律已有高点，低音只划分和声，层次始终较疏。"
      },
      {
        "label": "反向低音与高点加厚",
        "right": "E5.4 { dy mp } G5.4 A5.2 | (D5 G#5 B5).2 { dy mf } (C5 E5 A5).4 (A4 C5 E5 G5).4 | (A5 A6).1 { dy f } | G5.4 { dy mp } F5.4 E5.2",
        "left": "C3.4 B2.4 A2.2 | E2.2 A2.8 E3.8 A3.8 C4.8 | D2.8 A2.8 (F#3 A3 C4).4 G2.8 D3.8 (F3 G3 B3).4 | G2.2 (C3 E3 G3).2",
        "description": "开头旋律上行而低音下行。E7 引出 Am，高点长音以右手八度和左手和弦加厚，经过 D7、G7 后恢复单线。"
      }
    ]
  }
];
