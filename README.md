# 乐理教程

这个项目把《基本乐理教程》《和声学基础教程》《复调音乐基础教程》《配器法基础教程》《曲式学基础教程》《歌曲写作教程》和《图解编曲入门》改编成中文网页教程。正文负责讲清概念、规则和例外。谱面、图表和声音用于解释具体知识点。

## 运行课程网页

```sh
npm ci
npm run dev
```

打开终端显示的本地地址，先选择教材，再进入章节。复调音乐的上、下两篇共用同一个课程目录。[复调音乐基础教程](./content/books/counterpoint/index.html) · [格式样板页](./content/format-library.html)

课程内容集中放在 `content/`。教材的章节和专用脚本归入各自的目录，参考 PDF 可留在本地的 `sources/`，并由 Git 忽略。课程网页由同一套 Vite 配置运行。

发布版用 `npm run build` 生成到 `dist/`，可用 `npm run preview` 在本地的 `/music/` 子路径预览。GitHub Pages 在 `main` 有新提交时自动部署。[线上课程](https://wwl-ww.github.io/music/)

| 目录 | 内容 |
| --- | --- |
| `content/` | 教材首页、程序谱目录、格式样板 |
| `content/books/music-theory/` | 《基本乐理教程》章节、专用资产与参考 PDF |
| `content/books/harmony-upper/` | 《和声学基础教程 · 上》章节、专用脚本与参考 PDF |
| `content/books/harmony-lower/` | 《和声学基础教程 · 下》章节、四部和声谱例与参考 PDF |
| `content/books/counterpoint/` | 《复调音乐基础教程》上下篇、全书目录与可调谱例 |
| `content/books/orchestration/` | 《配器法基础教程》章节、总谱示意与音响对照 |
| `content/books/songwriting/` | 《歌曲写作教程》章节、词曲逐字对齐谱与歌曲结构分析 |
| `content/books/form-analysis/` | 《曲式学基础教程》章节与曲式分析谱 |
| `content/books/arrangement/` | 《图解编曲入门》导论、三篇正文与制作流程 |
| `content/shared/` | 共用的排版、主题、谱例组件与钢琴音源 |

## 课程

下列页码用于核对教材范围。页面正文按知识点组织，练习和答案全部省略。

| 章节 | 已逐页核对的印刷页 | PDF 页 |
| --- | --- | --- |
| [第一章 音的长短](./content/books/music-theory/chapter-1.html) | 1–12 | 18–29 |
| [第二章 节奏与节拍](./content/books/music-theory/chapter-2.html) | 13–27 | 30–44 |
| [第三章 音的高低](./content/books/music-theory/chapter-3.html) | 28–39 | 45–56 |
| [第四章 音程](./content/books/music-theory/chapter-4.html) | 40–55 | 57–72 |
| [第五章 大小调体系（一）——调式、大调式](./content/books/music-theory/chapter-5.html) | 56–69 | 73–86 |
| [第六章 大小调体系（二）——小调式、平行调](./content/books/music-theory/chapter-6.html) | 70–83 | 87–100 |
| [第七章 民族调式、中古调式](./content/books/music-theory/chapter-7.html) | 84–102 | 101–119 |
| [第八章 和弦](./content/books/music-theory/chapter-8.html) | 103–119 | 120–136 |
| [第九章 调的关系](./content/books/music-theory/chapter-9.html) | 120–132 | 137–149 |
| [第十章 调的转换](./content/books/music-theory/chapter-10.html) | 133–157 | 150–174 |
| [第十一章 调式变音与半音阶](./content/books/music-theory/chapter-11.html) | 158–169 | 175–186 |
| [第十二章 速度、力度与演奏法记号](./content/books/music-theory/chapter-12.html) | 170–180 | 187–197 |
| [第十三章 装饰音与略写记号](./content/books/music-theory/chapter-13.html) | 181–195 | 198–212 |
| [第十四章 近现代乐理知识](./content/books/music-theory/chapter-14.html) | 196–211 | 213–228 |
| [第十五章 中国古代乐理知识](./content/books/music-theory/chapter-15.html) | 212–225 | 229–242 |
| [第十六章 律学常识](./content/books/music-theory/chapter-16.html) | 226–236 | 243–253 |

第五至八章的章末练习均与讲解共页。各章从下列「练习」标题起省略，标题之前的讲解和谱例纳入改编。

| 章节 | 讲解与练习的分界 | 续页 |
| --- | --- | --- |
| 第五章 | 印刷 66 / PDF 83，唱名法及例 5-23 后为练习五 | 印刷 67–69 / PDF 84–86 |
| 第六章 | 印刷 80 / PDF 97，辨认调式的补充说明后为练习六 | 印刷 81–83 / PDF 98–100 |
| 第七章 | 印刷 97 / PDF 114，例 7-16 结束后为练习七 | 印刷 98–102 / PDF 115–119 |
| 第八章 | 印刷 114 / PDF 131，导七和弦解决及例 8-28 后为练习八 | 印刷 115–119 / PDF 132–136 |

### 和声学基础教程 · 上

| 章节 | 已逐页核对的印刷页 | PDF 页 | 练习起点 |
| --- | --- | --- | --- |
| [第一章 和弦](./content/books/harmony-upper/harmony-1.html) | 1–7 | 18–24 | 印刷 7 / PDF 24，声部音域说明后 |
| [第二章 正三和弦](./content/books/harmony-upper/harmony-2.html) | 9–17 | 25–33 | 印刷 15 / PDF 31，声部交错与超越说明后 |
| [第三章 正三和弦的和声](./content/books/harmony-upper/harmony-3.html) | 18–25 | 34–41 | 印刷 24 / PDF 40，旋律配和声示范后 |
| [第四章 和弦换位与三音跳进](./content/books/harmony-upper/harmony-4.html) | 26–35 | 42–51 | 印刷 33 / PDF 49，三音跳进示范后 |
| [第五章 终止式与终止四六和弦](./content/books/harmony-upper/harmony-5.html) | 36–45 | 52–61 | 印刷 43 / PDF 59，例 5-13 后 |
| [第六章 正三和弦的第一转位](./content/books/harmony-upper/harmony-6.html) | 46–56 | 62–72 | 印刷 54 / PDF 70，例 6-18 后 |
| [第七章 旋律中的和弦外音及经过、辅助四六和弦](./content/books/harmony-upper/harmony-7.html) | 57–68 | 73–84 | 印刷 65 / PDF 81，例 7-14 后 |
| [第八章 属七和弦](./content/books/harmony-upper/harmony-8.html) | 69–77 | 85–93 | 印刷 75 / PDF 91，例 8-9 后 |
| [第九章 属七和弦的转位](./content/books/harmony-upper/harmony-9.html) | 78–84 | 94–100 | 印刷 82 / PDF 98，例 9-10 后 |
| [第十章 属九和弦](./content/books/harmony-upper/harmony-10.html) | 85–91 | 101–107 | 印刷 90 / PDF 106，页首 |
| [第十一章 导七和弦、属七—十三和弦](./content/books/harmony-upper/harmony-11.html) | 92–99 | 108–115 | 印刷 98 / PDF 114，页首 |
| [第十二章 大调副三和弦](./content/books/harmony-upper/harmony-12.html) | 100–110 | 116–126 | 印刷 109 / PDF 125，例 12-14 分析和四六扩展说明后 |
| [第十三章 小调副三和弦](./content/books/harmony-upper/harmony-13.html) | 111–117 | 127–133 | 印刷 116 / PDF 132，弗里几亚进行谱例后 |
| [第十四章 副七和弦](./content/books/harmony-upper/harmony-14.html) | 118–127 | 134–143 | 印刷 126 / PDF 142，例 14-18 后 |
| [第十五章 模进](./content/books/harmony-upper/harmony-15.html) | 128–135 | 144–151 | 印刷 133 / PDF 149，模进写作原则总结后 |
| [第十六章 和声分析](./content/books/harmony-upper/harmony-16.html) | 136–150 | 152–166 | 印刷 146 / PDF 162，例 16-7 分析后 |
| [第十七章 同宫系统自然调式](./content/books/harmony-upper/harmony-17.html) | 151–165 | 167–181 | 印刷 165 / PDF 181，各级和弦的功能关系之后 |
| [第十八章 宫调式和声](./content/books/harmony-upper/harmony-18.html) | 166–181 | 182–197 | 印刷 178 / PDF 194，宫调式和声原则总结之后 |
| [第十九章 羽调式和声](./content/books/harmony-upper/harmony-19.html) | 182–191 | 198–207 | 印刷 189 / PDF 205，例 19-9 谱例之后 |
| [第二十章 五声性变异结构和弦](./content/books/harmony-upper/harmony-20.html) | 192–203 | 208–219 | 印刷 203 / PDF 219，例 20-18 谱例之后 |
| [第二十一章 徵调式和声](./content/books/harmony-upper/harmony-21.html) | 204–216 | 220–232 | 印刷 214 / PDF 230，例 21-13 谱例之后 |
| [第二十二章 商调式、角调式和声](./content/books/harmony-upper/harmony-22.html) | 217–228 | 233–244 | 印刷 225 / PDF 241，页首 |
| [第二十三章 调式交替与调式复合](./content/books/harmony-upper/harmony-23.html) | 229–247 | 245–263 | 印刷 244 / PDF 260，同宫体系总结之后 |

印刷页 7 后直接进入印刷页 9。上册附录从印刷页 248 / PDF 264 开始。

### 和声学基础教程 · 下

下册沿用全套教材的编号，从第二十四章开始。[下册目录](./content/books/harmony-lower/index.html)

| 章节 | 印刷页 | PDF 页 | 讲解与练习的分界 |
| --- | --- | --- | --- |
| [第二十四章 重属和弦](./content/books/harmony-lower/harmony-24.html) | 1–10 | 13–22 | 印刷 7 / PDF 19，例 24–17 后 |
| [第二十五章 副属和弦](./content/books/harmony-lower/harmony-25.html) | 11–22 | 23–34 | 印刷 19 / PDF 31，例 25–21 后 |
| [第二十六章 离调](./content/books/harmony-lower/harmony-26.html) | 23–35 | 35–47 | 印刷 32 / PDF 44，从页首开始 |
| [第二十七章 转调（一）· 平行关系转调](./content/books/harmony-lower/harmony-27.html) | 36–44 | 48–56 | 印刷 42 / PDF 54，例 27–7 后 |
| [第二十八章 转调（二）· 近关系转调](./content/books/harmony-lower/harmony-28.html) | 45–57 | 57–69 | 印刷 53 / PDF 65，例 28–16 与小结之后 |
| [第二十九章 转调（三）· 半音转调、中介离调](./content/books/harmony-lower/harmony-29.html) | 58–64 | 70–76 | 印刷 62 / PDF 74，中介离调谱例分析之后 |
| [第三十章 转调（四）· 次近关系转调](./content/books/harmony-lower/harmony-30.html) | 65–74 | 77–86 | 印刷 72 / PDF 84，页首 |
| [第三十一章 和弦外音的运用](./content/books/harmony-lower/harmony-31.html) | 75–89 | 87–101 | 印刷 85 / PDF 97，页首 |
| [第三十二章 和声音型、持续音](./content/books/harmony-lower/harmony-32.html) | 90–104 | 102–116 | 印刷 100 / PDF 112，例 32–14 后 |
| [第三十三章 变和弦（一）· 变属和弦](./content/books/harmony-lower/harmony-33.html) | 105–112 | 117–124 | 印刷 110 / PDF 122，例 33–14 后 |
| [第三十四章 变和弦（二）· 增六和弦](./content/books/harmony-lower/harmony-34.html) | 113–124 | 125–136 | 印刷 120 / PDF 132，页首 |
| [第三十五章 同主音综合调式（一）· 概论](./content/books/harmony-lower/harmony-35.html) | 125–130 | 137–142 | 本章无练习，下一页为第 36 章 |
| [第三十六章 同主音综合调式（二）· 和声大调](./content/books/harmony-lower/harmony-36.html) | 131–139 | 143–151 | 印刷 138 / PDF 150，页首 |

可调四部谱根据同节所讲的和声骨架重新配写，谱面和播放共用同一组声部数据。

### 复调音乐基础教程 · 上篇

教材目录在 PDF 12–16，上篇的篇题与导言在印刷 1–2 / PDF 17–18。根据目录、每章起页和练习标题核对了第 1–19 章的 403 张扫描页，含章末练习。上下篇下表均记到各章讲解及示范谱例的末页，包含与练习共页的部分。

| 章节 | 印刷页 | PDF 页 | 练习起点 |
| --- | --- | --- | --- |
| [第一章 对位旋律写作原则](./content/books/counterpoint/counterpoint-1.html) | 3–19 | 19–35 | 印刷 20 / PDF 36，页首 |
| [第二章 对位中旋律的类型](./content/books/counterpoint/counterpoint-2.html) | 22–41 | 38–57 | 印刷 41 / PDF 57，写作示范说明之后 |
| [第三章 二声部复对位](./content/books/counterpoint/counterpoint-3.html) | 45–57 | 61–73 | 印刷 57 / PDF 73，十二度复对位的续谱之后 |
| [第四章 倒影与逆行](./content/books/counterpoint/counterpoint-4.html) | 60–73 | 76–89 | 印刷 73 / PDF 89，主题变形谱例及说明之后 |
| [第五章 二声部模仿](./content/books/counterpoint/counterpoint-5.html) | 75–88 | 91–104 | 印刷 89 / PDF 105，页首 |
| [第六章 卡农](./content/books/counterpoint/counterpoint-6.html) | 92–102 | 108–118 | 印刷 102 / PDF 118，五度无终卡农的说明之后 |
| [第七章 模进](./content/books/counterpoint/counterpoint-7.html) | 105–119 | 121–135 | 印刷 119 / PDF 135，先复对位再模进的谱例及说明之后 |
| [第八章 多声部对比式写作](./content/books/counterpoint/counterpoint-8.html) | 121–132 | 137–148 | 印刷 133 / PDF 149，页首 |
| [第九章 多声部模仿](./content/books/counterpoint/counterpoint-9.html) | 136–148 | 152–164 | 印刷 149 / PDF 165，页首 |
| [第十章 多声部综合织体写作](./content/books/counterpoint/counterpoint-10.html) | 150–160 | 166–176 | 印刷 160 / PDF 176，最后一例的转位结合续谱之后 |

章节用文本内谱呈现音程与动机，用可调谱比较声部节奏、进入顺序和原位与变形。程序谱使用为相应概念配写的短句。

### 复调音乐基础教程 · 下篇

下篇题页为印刷 163 / PDF 179。第 19 章之后从印刷 407 / PDF 423 起为附录。

| 章节 | 印刷页 | PDF 页 | 讲解与练习的分界 |
| --- | --- | --- | --- |
| [第十一章 复调小曲](./content/books/counterpoint/counterpoint-11.html) | 164–184 | 180–200 | 印刷 182 / PDF 198，倒影再现的分析之后 |
| [第十二章 卡农小曲](./content/books/counterpoint/counterpoint-12.html) | 185–204 | 201–220 | 印刷 204 / PDF 220，复合调式示意谱末行之后 |
| [第十三章 创意曲（一）· 巴赫的创意曲](./content/books/counterpoint/counterpoint-13.html) | 205–225 | 221–241 | 印刷 225 / PDF 241，第三部创意曲分析图的图例之后 |
| [第十四章 创意曲（二）· 民族调式创意曲](./content/books/counterpoint/counterpoint-14.html) | 226–250 | 242–266 | 印刷 249 / PDF 265，双主题序曲的结构图之后 |
| [第十五章 赋格曲（一）· 显示部分](./content/books/counterpoint/counterpoint-15.html) | 251–271 | 267–287 | 印刷 269 / PDF 285，页首 |
| [第十六章 赋格曲（二）· 间插段、中部与再现部](./content/books/counterpoint/counterpoint-16.html) | 272–294 | 288–310 | 印刷 293 / PDF 309，结束句分析之后 |
| [第十七章 赋格曲（三）· 民族调式赋格](./content/books/counterpoint/counterpoint-17.html) | 295–336 | 311–352 | 印刷 336 / PDF 352，节奏赋格的结构图之后 |
| [第十八章 支声复调](./content/books/counterpoint/counterpoint-18.html) | 337–364 | 353–380 | 本章无练习 |
| [第十九章 复调写法在主调音乐中的运用](./content/books/counterpoint/counterpoint-19.html) | 365–406 | 381–422 | 本章无练习，下一页为附录 |

技法示范多用重新配写的短句。第十三、十四、十六、十九章另有曲式分析谱，可选择小节范围，在同一份谱上查看声部、音型和调性变化。第十四章的黄阮《小创意曲》据教材谱例转录。

巴赫谱例按音乐声部分谱表重排，并加入分析标签。下列许可适用于对应谱例的转录数据。

- BWV 772、777 来自 Jeff Covey 为 Mutopia 排印的 Bach-Gesellschaft 版，转录沿用 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)。[BWV 772](https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=40) · [BWV 777](https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=159)
- BWV 791、801 来自 Olivier Vermersch 为 Mutopia 排印的公有领域版本。[BWV 791](https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=204) · [BWV 801](https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=145)
- BWV 847 来自 Urs Metzger 为 Mutopia 排印的 Edition Peters 版。按声部重排并加上分析标记，转录沿用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)。[BWV 847](https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=1941)
- 贝多芬《悲怆奏鸣曲》第三乐章第 78–107 小节转录自 Chris Sawer 为 Mutopia 排印的公有领域版本（Berners 1908 年版）。[Op. 13 第三乐章](https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=296)

### 配器法基础教程

| 章节 | 印刷页 | PDF 页 | 练习起点 |
| --- | --- | --- | --- |
| [第一章 管弦乐队概述](./content/books/orchestration/orchestration-1.html) | 1–11 | 11–21 | 印刷 11 / PDF 21，力度说明之后 |
| [第二章 弓弦乐器与弓弦乐器组](./content/books/orchestration/orchestration-2.html) | 13–87 | 23–97 | 四节分别从印刷 34、57、76、87 页起，印刷 35、77、87 页按正文／习题分界处理 |
| [第三章 木管乐器与木管乐器组](./content/books/orchestration/orchestration-3.html) | 90–146 | 100–156 | 习题从印刷 103、118、135、145 页起，104、135 页按正文／习题分界处理 |
| [第四章 圆号](./content/books/orchestration/orchestration-4.html) | 147–158 | 157–168 | 印刷 157 / PDF 167，合唱型多声部范例之后 |
| [第五章 木管乐器、圆号与弓弦乐器的组合](./content/books/orchestration/orchestration-5.html) | 159–186 | 169–196 | 印刷 185 / PDF 195 起为习题 |
| [第六章 铜管乐器与铜管乐器组](./content/books/orchestration/orchestration-6.html) | 187–232 | 197–242 | 各节习题从印刷 198、208、222、231 页起，198、222、223 页按正文与习题分界处理 |
| [第七章 打击乐器及其在乐队中的运用](./content/books/orchestration/orchestration-7.html) | 233–259 | 243–269 | 习题从印刷 244、259 页起，244、245、259 页按正文与习题分界处理 |
| [第八章 管弦乐全奏中的音质组合](./content/books/orchestration/orchestration-8.html) | 260–294 | 270–304 | 两节习题从印刷 278、293 页起，278、280 页按正文与习题分界处理 |

第二章的[乐器音域图](./content/books/orchestration/orchestration-2.html#string-ranges)沿同一实际音高轴比较不同乐器。可复用 `.instrument-range` 的 SVG 结构，实线色带表示常用音域，虚线表示扩展或极限，圆点为空弦等明确的定弦音，轴上相邻的 C 标记相隔一个八度。移调乐器用实际音高绘图，另用表格标明记谱关系与精确边界。

第三章的木管程序谱为每支管指定独立的谱表和音色。可复用 `mountScore` 的 `notes.scoreTracks`，每条包含谱表名 `name`、MIDI 音色编号 `program` 和 alphaTex 片段 `phrase`。木管试听用 alphaTab 附带的 SONiVOX 音库，随构建输出版权声明和 Apache 2.0 许可说明。

第四章沿用音域键盘和 SONiVOX 音库。F 管活塞程序谱按分音频率比计算键位，并以十二平均律近似播放。现代双重圆号的管路和旧式低音谱号换算已另行核对。[雅马哈圆号构造](https://www.yamaha.com/en/musical_instrument_guide/horn/mechanism/mechanism003.html) · [瑞典音乐遗产圆号四重奏校勘说明](https://www.swedishmusicalheritage.com/downloadMedia.php?f=Crusell_Bernhard-Tre_kvartetter_for_fyra_horn-%28hn%29-%28SMH-ed%29-%28SMH-M1828%29.pdf&m=1828)

第六章的音域键盘可用 `data-range-gap` 标记连续音域中的断档，如无附加阀长号的 B1–E♭2。单 F 阀与双阀低音长号的可用音、常规滑奏条件已另行核对。[雅马哈长号把位指南](https://www.yamaha.com/en/musical_instrument_guide/trombone/play/play003.html) · [维也纳交响音库低音长号手册](https://www.vsl.co.at/academy/brass/bass-trombone) · [次中音长号手册](https://www.vsl.co.at/academy/brass/tenor-trombone)

第七章按现代定音鼓实音写法和排钟的击音记法说明，调音范围选用一组踏板鼓实例。无固定音高试听沿用标准 MIDI 打击映射，`scoreTracks` 支持 `program: 'percussion'` 和指定谱线数 `staffLines`。[雅马哈定音鼓调音表](https://data.yamaha.com/files/download/other_assets/1/332701/Timpani_E_om_web.pdf) · [定音鼓记谱](https://www.vsl.co.at/academy/percussion/timpani) · [排钟记谱](https://www.vsl.co.at/academy/percussion/tubular-bells) · [木琴记谱](https://www.vsl.co.at/academy/percussion/xylophone)

第八章用 `scoreTracks` 保留各乐器的独立音色，`notationOnly` 标记可见且静音的缩编谱，`playbackOnly` 标记只用于试听的乐器轨。

### 曲式学基础教程

| 章节 | 已逐页核对的印刷页 | PDF 页 |
| --- | --- | --- |
| [第一章 绪论](./content/books/form-analysis/form-analysis-1.html) | 1–9 | 11–19 |
| [第二章 乐段（一）](./content/books/form-analysis/form-analysis-2.html) | 10–26 | 20–36 |
| [第三章 乐段（二）](./content/books/form-analysis/form-analysis-3.html) | 27–49 | 37–59 |
| [第四章 乐段（三）](./content/books/form-analysis/form-analysis-4.html) | 50–70 | 60–80 |
| [第五章 一段曲式](./content/books/form-analysis/form-analysis-5.html) | 71–82 | 81–92 |
| [第六章 二段曲式](./content/books/form-analysis/form-analysis-6.html) | 83–105 | 93–115 |
| [第七章 三段曲式](./content/books/form-analysis/form-analysis-7.html) | 106–131 | 116–141 |
| [第八章 多段结构](./content/books/form-analysis/form-analysis-8.html) | 132–139 | 142–149 |
| [第九章 三部曲式](./content/books/form-analysis/form-analysis-9.html) | 140–165 | 150–175 |
| [第十章 回旋曲式](./content/books/form-analysis/form-analysis-10.html) | 166–179 | 176–189 |
| [第十一章 变奏曲（一）](./content/books/form-analysis/form-analysis-11.html) | 180–217 | 190–227 |
| [第十二章 变奏曲（二）](./content/books/form-analysis/form-analysis-12.html) | 218–233 | 228–243 |
| [第十三章 奏鸣曲式（一）](./content/books/form-analysis/form-analysis-13.html) | 234–261 | 244–271 |
| [第十四章 奏鸣曲式（二）](./content/books/form-analysis/form-analysis-14.html) | 262–278 | 272–288 |
| [第十五章 奏鸣曲式（三）](./content/books/form-analysis/form-analysis-15.html) | 279–285 | 289–295 |
| [第十六章 奏鸣回旋曲式](./content/books/form-analysis/form-analysis-16.html) | 286–294 | 296–304 |
| [第十七章 套曲——组曲](./content/books/form-analysis/form-analysis-17.html) | 295–311 | 305–321 |
| [第十八章 奏鸣（交响）套曲](./content/books/form-analysis/form-analysis-18.html) | 312–323 | 322–333 |
| [第十九章 声乐套曲与大合唱](./content/books/form-analysis/form-analysis-19.html) | 324–357 | 334–367 |

第一章的十二小节钢琴教学例为本课程编写，用于比较相同的开头材料在半终止和主调收束中的不同作用。

第二章印刷第 26 页、第三章印刷第 48 页下半至第 49 页、第四章印刷第 70 页后半为作业。第 48、70 页保留作业标题前的正文和谱例说明。
第五至第八章各章末页的「分析曲目」清单已省略，保留清单之前的作品分析。第五章的肖邦 e 小调前奏曲按 Roland Goretzki 的公版乐谱转录重排。[肖邦 Op.28 No.4](https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=921)
第九、第十一、第十二章保留各章末页「分析曲目」之前的正文。第十章的清单从印刷第 178 页中部开始，第 179 页是清单续页。
第十三至第十八章各章末的「分析曲目」清单已省略。第十九章正文止于印刷第 357 页。

### 歌曲写作教程

| 章节 | 印刷页 | PDF 页 | 练习起点或分界 |
| --- | --- | --- | --- |
| [第一章 歌曲写作的整体构思](./content/books/songwriting/songwriting-1.html) | 3–13 | 17–27 | 第 12 页起 |
| [第二章 主题乐句的写作](./content/books/songwriting/songwriting-2.html) | 14–43 | 28–57 | 第 40 页起 |
| [第三章 旋律发展手法](./content/books/songwriting/songwriting-3.html) | 44–72 | 58–86 | 第 70 页后段起 |
| [第四章 乐段结构歌曲的写作（上）](./content/books/songwriting/songwriting-4.html) | 73–96 | 87–110 | 第 95 页起 |
| [第五章 乐段结构歌曲的写作（中）](./content/books/songwriting/songwriting-5.html) | 97–119 | 111–133 | 无 |
| [第六章 乐段结构歌曲的写作（下）](./content/books/songwriting/songwriting-6.html) | 120–147 | 134–161 | 第 145 页后段起 |
| [第七章 两段体歌曲写作](./content/books/songwriting/songwriting-7.html) | 148–209 | 162–223 | 第 207 页后段起 |
| [第八章 三段体歌曲写作](./content/books/songwriting/songwriting-8.html) | 210–284 | 224–298 | 第 281 页后段起 |
| [第九章 多段体歌曲写作和歌曲结构布局](./content/books/songwriting/songwriting-9.html) | 285–331 | 299–345 | 第 327 页起 |
| [第十章 固定音调、固定节奏的贯串和音调引用](./content/books/songwriting/songwriting-10.html) | 332–343 | 346–357 | 无 |
| [第十一章 前奏（引子）、间奏、后奏（尾声）](./content/books/songwriting/songwriting-11.html) | 344–378 | 358–392 | 无。第 377–378 页为下篇分隔及空白 |
| [第十二章 曲调与声调](./content/books/songwriting/songwriting-12.html) | 379–388 | 393–402 | 无 |
| [第十三章 装饰变音、色彩变音、离调、特性调式变音和转调](./content/books/songwriting/songwriting-13.html) | 389–410 | 403–424 | 无 |
| [第十四章 拖腔、重复歌词、衬词](./content/books/songwriting/songwriting-14.html) | 411–423 | 425–437 | 无 |
| [第十五章 歌曲的常见体裁](./content/books/songwriting/songwriting-15.html) | 424–430 | 438–444 | 无 |
| [第十六章 艺术歌曲特征](./content/books/songwriting/songwriting-16.html) | 431–468 | 445–482 | 无 |
| [第十七章 通俗歌曲特征](./content/books/songwriting/songwriting-17.html) | 469–491 | 483–505 | 无 |
| [附录一、二 演唱、定调与歌曲题头](./content/books/songwriting/songwriting-reference.html) | 492–497 | 506–511 | 第 498 页起为习题解答提示 |

歌曲写作教学例使用原创歌词和旋律。`songwriting-score.js` 的 `lyricBars` 将每个唱词字挂到相应音符，休止及同字延续的音不推进歌词。分节歌可把多段歌词排到同一谱面，结构对照复用 `mountFormAnalysis`。

### 图解编曲入门

| 课程 | 印刷页 | PDF 页 |
| --- | --- | --- |
| [导论 流行乐团编曲的基本知识](./content/books/arrangement/arrangement-intro.html) | 13–23 | 14–24 |
| [第一篇 明快节拍](./content/books/arrangement/arrangement-1.html) | 25–77 | 26–78 |
| [第二篇 可哼唱乐句](./content/books/arrangement/arrangement-2.html) | 79–129 | 80–130 |
| [第三篇 流行乐团合奏](./content/books/arrangement/arrangement-3.html) | 131–173 | 132–174 |
| [附录 编曲构思与制作流程](./content/books/arrangement/arrangement-3-appendix.html) | 174–177 | 175–178 |

课程用短句示范鼓、贝斯、吉他与钢琴的编写，以及主副旋律和合奏重心的变化。原书教材曲的分析保留编配手法和听辨目标，网页另配便于比较的短谱。

## 预制格式库

课程中的可调谱例集中列在[程序谱目录](./content/programmatic-scores.html)，每项链接到原章的谱面。

章节页面引入 `content/shared/formats/formats.css`，在 `style.css` 里统一管理颜色和字体。各章填写谱例数据、时间轴事件或表格内容。[格式样板页](./content/format-library.html)演示这些共用组件。

### 阅读尺寸与验收

- 文本内短谱使用 `svg.inline-staff`，较长的短谱使用 `inline-staff-wide`。独立音阶使用 `scale-overlap` 统一字号与线距。其他宽谱可加 `long-staff` 接入局部横向滚动。给谱例设置 `aria-label` 后，滚动容器使用同一个描述。
- 四栏以上的教学表采用可横向滚动的容器。仅在实际溢出时加入键盘顺序，聚焦后可用方向键滚动。
- 基本定义、关键步骤和代表谱例放在正文。短规则可写在强调块。速查全表、组合记号、例外和详细推导放进默认折叠的选学。
- [格式样板页](./content/format-library.html)可以切换实际窗口宽度与 320 像素预览，也可使用右上角设置切换九个主题。控件区可验证键盘焦点、路线按钮及播放的加载、就绪、播放和失败状态。

### 谱例

可播放谱例使用本地音库 `content/shared/assets/piano-and-strings.sf3`。钢琴采用 FreePats 的 Kawai 立式钢琴录音，由 Gonzalo 与 Roberto 录制。项目将左右声道混合为单声道采样，保留轻奏、强奏两个力度层及原循环设置。弦乐采用 Versilian Studios 的 VSCO 2 Community Edition 弦乐组持续音，经裁剪、循环及电平校准后与钢琴一起封装。两套音源均为 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)。[FreePats 钢琴](https://freepats.zenvoid.org/Piano/acoustic-grand-piano.html) · [VSCO 2 Community Edition](https://versilian-studios.com/vsco-community/)

四部谱通过 `fourPartScore` 或 `labelledChordScore` 创建，固定三部伴奏加单旋律的谱例可用 `scoreWithAccompaniment`。播放器会设置 `data-score-type="four-part-harmony"`，默认用弦乐四重奏，读者可在谱面右上角切换为钢琴。弦乐模式将高音、次高音、次中音、低音分别分送到第一小提琴、第二小提琴、中提琴、大提琴。两种音色共用原谱的声部数据。

在页面放入 `<figure id="example" aria-label="C 大调上行四音"></figure>`。在该页的 JavaScript 模块中挂载谱例，按模块所在目录调整导入路径。

```js
import { mountScore } from './formats/score.js';

mountScore(document.querySelector('#example'), {
  notation: 'both',
  tempo: 88,
  notes: String.raw`
    \ks C
    \ts 4 4
    C4.4 D4.4 E4.4 F4.4
  `
});
```

`notation` 可选 `staff`（五线谱）、`numbered`（简谱）或 `both`（默认双谱对照）。纯读谱示例可设 `audio: false`。谱面与试听共用一份 alphaTex，双谱的小节线由 alphaTab 对齐。页面有多条谱例时，开始下一条会停止当前试听。

可播放谱可用 `voiceAudition` 开启分声部试听。每项填写 `label` 和 `voices`，后者是选中时发声的声部编号。例如 `{ label: 'A 与 A′', voices: [1, 3] }`。声部从上到下自 1 编号。四部和声可直接复用现有数据。其他谱可传入 `notes: { scoreNotation, voices, key, meter }`，用生成完整谱面的同一组声部字符串填写 `voices`。若新版本交换了旋律位置，用 `auditionOrder` 指定新的声部顺序，使选择仍跟随原来的旋律。

### 程序性谱子

第五章的[大调音阶](chapter-5.html#major-scale-example)与第六章的[小调音阶](chapter-6.html#minor-scale-example)共用 `mountProgrammaticScore`。复用时，在容器内放置含命名控件的 `form`、`[data-generated-score]` 谱例和 `[data-generated-piano]` 键盘容器。传入 `build(choices)`，返回同一音列生成的 alphaTex（`notes`）、MIDI 音高（`pitches`）和可读的谱例描述（`description`）。`lowestPitch` 是键盘最左侧 C 的 MIDI 音高，`octaves` 决定键盘范围。

### 编曲网格

[编曲网格样板](./content/format-library.html#arrangement-grid-samples)展示底鼓和贝斯的落点。`mountArrangementGrid` 复用主题和横向滚动框，横轴标拍点与细分，纵轴可标鼓件、音高或乐器。圆点表示击打，色块的长度表示持续时间。

传入 `beats`（总拍数）、`beatsPerBar`（每小节拍数）、`subdivisions`（每拍格数）、`label` 和 `rows`。每行用 `label` 标明鼓件或音高，`events` 里的 `step` 从 0 开始计，`length` 按格计，`accent` 标出重音。切换版本时调用 `update(rows)`。

需要试听时可复用 `mountScore`，以 `notationVisible: false` 仅显示播放键。用 `onPlaybackPosition(tick)` 把 MIDI 时钟换算成格号，再调用网格的 `markStep(step)`。停止时回调提供 `null`，清除播放位置。

### 曲式分析谱与声部关系图

两种格式从共用时间轴继承等长分格、选择状态、键盘操作和窄屏滚动。曲式分析谱另外复用可播放谱；声部关系图在时间轴上叠加连接箭头。主题颜色和控件样式由 `formats.css` 统一提供。两种格式的页面结构和调用数据可从[曲式与声部关系样板](./content/format-library.html#analysis-samples)复制。

| 格式 | 接口与数据 | 何时使用 |
|---|---|---|
| 共用时间轴 | `mountTimeline` 接收 `unitCount`、`unitName`、`lanes` 和 `onSelect`。每个事件填写 `id`、`label`、`start` 和 `length`。位置从 1 开始，长度以时间单位计。 | 多组材料需要在同一时间尺度上比较。 |
| 曲式分析谱 | `mountFormAnalysis` 接收一个 `score` 与按时间排列的 `sections`。段落填写首末小节 `first`、`last`，以及 `material`、`voice`、`key`、`role` 中与分析有关的说明。 | 追踪同一首作品的呈示、发展、再现等结构。可定位并试听所选段或全曲。 |
| 声部关系图 | `mountVoiceRelations` 接收时间单位、各声部的事件和 `links`。连接写明 `from`、`to`，并在 `label` 说明时差、音程或关系。辅助谱表事件可用 `guide: true`。 | 对照几个声部的起句、应句、移位或重叠。 |

曲式分析谱按写在谱上的小节编号定位，选段试听从所选小节的首次进入开始，演奏路线离开所选小节范围时停止。全曲播放遵循谱中的演奏路线。

段落起点在小节内部时，可用 `entry: { bar, staff, voice, beat }` 指定从哪一个记谱事件起播，编号从 1 开始，`staff` 和 `voice` 默认取 1。`first` 和 `last` 仍用于排布时间轴，可用 `rangeLabel` 显示准确的拍内起点。

### 对照谱与分步写作谱

两种格式共用可播放谱、谱面高亮与切换按钮。容器、控件和传入数据的示范见[对照与写作样板](./content/format-library.html#comparison-samples)。

| 格式 | 接口与数据 | 何时使用 |
|---|---|---|
| 对照谱 | `mountScoreComparison` 接收两份 `versions` 和一段 `description`。每份填写 `label`、`score` 与 `highlights`。两份谱同时显示，选择对应版本试听。 | 同一材料经过换位、变形或修正，需要直接比对相应音符。 |
| 分步写作谱 | `mountScoreWritingSteps` 接收共用 `score` 设置与按写作顺序排列的 `steps`。每步填写 `label`、`notes`、`description` 与 `highlights`。 | 一条写作规则需要通过材料的加入、重叠与修正来说明。各步使用同一个谱面和播放键。 |

高亮位置使用 `{ staff, bar, voice, beat }`，所有编号从 1 开始，`staff` 和 `voice` 默认取 1。`beat` 对应谱上该声部的第几个记谱事件，八分音符和休止各占一个事件。需要标出冲突时可加 `kind: 'conflict'`，并在说明中交代涉及的音和音程。

程序谱按正文的判断维度组织选择。可以同时成立的属性分别说明，例如模进的声部写法和调性处理。只提供若干预设时，用示例名称和简短说明交代可比较的组合。

### 教学表格

复制格式样板页的 `<table class="lesson-table">`，替换标题、列名和内容。用 `caption` 说明比较对象，用 `th scope="col"` 标记列标题，有行标题时用 `th scope="row"`。适合并列比较定义、时值和记号。

表格里可以用 `music-symbol` 显示 Bravura 字形，例如 `<span class="music-symbol" aria-hidden="true">&#xE1D5;</span>四分音符`。二分、四分、八分音符的代码分别为 `E1D3`、`E1D5`、`E1D7`。有相邻文字说明时可用 `aria-hidden="true"`，避免重复朗读。

### 静态记号与谱面片段

**文本内五线谱**用 `svg.inline-staff`，直接放在段落或列表条目里。只画五条线及需要说明的符头、符干或记号，省略谱号和小节线。第一章的「五线谱手写规范」有七个可以复制的示例。使用 `aria-label` 描述图示要点。

- 展示记号的写法时，用 `music-symbol`。可以嵌进正文、表格，或像格式样板页的休止符那样用 `figure.notation-sample` 并排展示。只写要讲的符号，可省略谱号、拍号和小节线。这种格式只依赖 HTML、CSS 和 Bravura 字体。
- 需要表现音符在五线谱上的位置或保留片段的精确排版时，可嵌入预先制好的 SVG 谱例片段。给图片附上说明它所展示内容的替代文本。片段可以只包含教学需要的部分。
- 需要试听和同步高亮时，再使用 `mountScore`。已有 alphaTex 且只需要浏览器制谱时，也可用 `audio: false`，它仍会运行 alphaTab 排版。

### 钢琴键盘

**音域键盘**用于在同一音高轴上比较不同乐器。[弓弦乐器](./content/books/orchestration/orchestration-2.html#string-ranges)和[木管乐器](./content/books/orchestration/orchestration-3.html#woodwind-ranges)共用 `mountRangeKeyboards(figure, table)`。在音域表里用 `data-range-main` 标记音域单元格（如 C4–C7），用 `data-range-high` 标记高端极限音。低音扩展写在该行的 `data-range-low`，空弦通过 `data-range-open` 标记（如 G3 · D4 · A4 · E5）。键盘使用实际发声音高。

**谱键对照图**把五线谱与钢琴键盘画在同一个坐标系里，让符头中心纵向对齐对应琴键中心。第三章「全音列的谱键对照」是静态样板，大谱表和键盘在窄屏一起滚动。基础音列示例只画自然音。讲音阶、音程或和弦时，按需要标出对应的白键或黑键，琴键轮廓继续复用 `content/shared/formats/piano.svg`。

**共用谱表音域图**用静态大谱表统一纵向音高，每件乐器占一列。实线连接参考音域的两端，虚线与空心符头标延伸，圆点标空弦，断档留空。图内以实际音高比较乐器，若要比较分谱，则给书写音另列一栏。样板见[木管音域](./content/books/orchestration/orchestration-3.html#woodwind-vertical-ranges)，图下的键盘可单独查找连续半音。

[配器法乐器音域总览](./content/books/orchestration/instrument-ranges.html)的三种图以本页音域表的 `data-range-main`、`data-range-low`、`data-range-high`、`data-range-gap` 和 `data-range-open` 为数据源。没有固定音域的条目用 `data-no-range`。常用乐器沿用各章的参照范围，变形乐器和民乐补充数据按所注明的型号、定弦和记谱换算。[维也纳交响音库乐器手册](https://www.vsl.co.at/academy/) · [香港中乐团乐器音域及编制表](https://www.hkco.org/uploads/docs/682542ced6d771.pdf) · [古典吉他音域](https://www.yamaha.com/en/musical_instrument_guide/classical_guitar/play/play003.html) · [曼多林型号规格](https://www.eastmanguitars.com/mandolin_a_style) · [音乐会钦巴隆](https://www.cimbalom.net/en/pages/about-cimbalom/)

批量生成两音对照时，可复用 `content/shared/formats/piano.js` 的 `pianoMarkup(start, end, octaves)`。两个位置用距键盘第一个 C 的半音数填写，C 为 0。第四章的局部对照和一至十二度图鉴都使用这套键盘。为每张图保留可见的音名和音程说明。

复制格式样板页的 `figure.keyboard-example`。底图的白键、黑键和各琴键轮廓都来自 `content/shared/formats/piano.svg`。在白键和黑键两组底图之间，用 `keyboard-highlight` 引用要标记的白键，例如 `#key-c`。高亮黑键时，在黑键底图之后用 `keyboard-highlight-black` 引用对应琴键，例如 `#key-f-sharp`。按需更新音名标签和替代文本。这个格式只显示键位，无需 JavaScript。

### 正文补充说明

复制格式样板页的 `details.lesson-aside`。在 `summary` 写清展开后能查到什么。补充细节通常用列表，一条讲一件事。有连贯解释时可用短段落。默认折叠，适合偶尔需要查阅的记法、排版惯例或背景。理解后续内容所需的知识放正文，删掉没有学习或查阅价值的材料。

### 重点提示

复制格式样板页的 `aside.lesson-callout`。用简短标题写出读者要记住的规则，正文补上适用条件、关键步骤或容易混淆的地方。提示块始终可见，颜色随主题变化。


