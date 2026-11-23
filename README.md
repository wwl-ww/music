# 乐理教程

这个项目把《基本乐理教程》《和声学基础教程》和《复调音乐基础教程》改编成中文网页教程。正文负责讲清概念、规则和例外。简谱、五线谱和声音用于解释具体知识点。

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

[下篇学习路径](./content/books/counterpoint/index.html#counterpoint-study-route)用同一个四音材料贯穿九章。每章先完成一项谱面对照，完整分类和延伸分析集中在相应的选读块中。

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

**谱键对照图**把五线谱与钢琴键盘画在同一个坐标系里，让符头中心纵向对齐对应琴键中心。第三章「全音列的谱键对照」是静态样板，大谱表和键盘在窄屏一起滚动。基础音列示例只画自然音。讲音阶、音程或和弦时，按需要标出对应的白键或黑键，琴键轮廓继续复用 `content/shared/formats/piano.svg`。

批量生成两音对照时，可复用 `content/shared/formats/piano.js` 的 `pianoMarkup(start, end, octaves)`。两个位置用距键盘第一个 C 的半音数填写，C 为 0。第四章的局部对照和一至十二度图鉴都使用这套键盘。为每张图保留可见的音名和音程说明。

复制格式样板页的 `figure.keyboard-example`。底图的白键、黑键和各琴键轮廓都来自 `content/shared/formats/piano.svg`。在白键和黑键两组底图之间，用 `keyboard-highlight` 引用要标记的白键，例如 `#key-c`。高亮黑键时，在黑键底图之后用 `keyboard-highlight-black` 引用对应琴键，例如 `#key-f-sharp`。按需更新音名标签和替代文本。这个格式只显示键位，无需 JavaScript。

### 正文补充说明

复制格式样板页的 `details.lesson-aside`。在 `summary` 写清展开后能查到什么。补充细节通常用列表，一条讲一件事。有连贯解释时可用短段落。默认折叠，适合偶尔需要查阅的记法、排版惯例或背景。理解后续内容所需的知识放正文，删掉没有学习或查阅价值的材料。

### 重点提示

复制格式样板页的 `aside.lesson-callout`。用简短标题写出读者要记住的规则，正文补上适用条件、关键步骤或容易混淆的地方。提示块始终可见，颜色随主题变化。


