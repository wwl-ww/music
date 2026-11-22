# 乐理教程

这个项目把《基本乐理教程》和《和声学基础教程》上下册改编成中文网页教程。正文负责讲清概念、规则和例外。简谱、五线谱和声音用于解释具体知识点。

## 运行课程网页

```sh
npm ci
npm run dev
```

打开终端显示的本地地址，先选择教材，再进入章节。[基本乐理教程](./content/books/music-theory/index.html)与[和声学基础教程 · 上](./content/books/harmony-upper/index.html)各有独立目录。预制格式在[格式样板页](./content/format-library.html)查看。

课程内容集中放在 `content/`。教材的章节和专用脚本归入各自的目录，参考 PDF 可留在本地的 `sources/`，并由 Git 忽略。课程网页由同一套 Vite 配置运行。

| 目录 | 内容 |
| --- | --- |
| `content/` | 教材首页、程序谱目录、格式样板 |
| `content/books/music-theory/` | 《基本乐理教程》章节、专用资产与参考 PDF |
| `content/books/harmony-upper/` | 《和声学基础教程 · 上》章节、专用脚本与参考 PDF |
| `content/books/harmony-lower/` | 《和声学基础教程 · 下》章节、四部和声谱例与参考 PDF |
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

## 预制格式库

课程中的可调谱例集中列在[程序谱目录](./content/programmatic-scores.html)，每项链接到原章的谱面。

章节页面引入 `content/shared/formats/formats.css`，在 `style.css` 里统一管理颜色和字体。各章只填写谱例数据或表格内容。[格式样板页](./content/format-library.html)同时演示了两种格式。

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

### 程序性谱子

第五章的[大调音阶](chapter-5.html#major-scale-example)与第六章的[小调音阶](chapter-6.html#minor-scale-example)共用 `mountProgrammaticScore`。复用时，在容器内放置含命名控件的 `form`、`[data-generated-score]` 谱例和 `[data-generated-piano]` 键盘容器。传入 `build(choices)`，返回同一音列生成的 alphaTex（`notes`）、MIDI 音高（`pitches`）和可读的谱例描述（`description`）。`lowestPitch` 是键盘最左侧 C 的 MIDI 音高，`octaves` 决定键盘范围。

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


