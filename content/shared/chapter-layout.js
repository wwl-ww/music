import { prepareReadingContent } from './formats/readable-layout.js';

const main = document.querySelector('main');
prepareReadingContent(main);

if (main.matches('.lesson-chapter')) {
  formatChapterTitle();
  addCoursePath();
  addOutline();
  addChapterNavigation();
}

function formatChapterTitle() {
  const heading = main.querySelector(':scope > h1');
  const text = heading?.firstChild;
  const chapter = text?.nodeValue?.match(/^(第[一二三四五六七八九十百零〇\d]+章)\s*/);
  if (!chapter) return;
  const number = document.createElement('span');
  number.className = 'chapter-number';
  number.textContent = chapter[1];
  text.deleteData(0, chapter[0].length);
  heading.prepend(number, ' ');
}

function addCoursePath() {
  const bookLink = document.querySelector('.masthead .chapter-home');
  if (!bookLink) return;

  const path = document.createElement('nav');
  path.className = 'chapter-path';
  path.setAttribute('aria-label', '课程路径');
  const libraryLink = document.createElement('a');
  const readingLibrary = bookLink.dataset.libraryHref;
  libraryLink.href = readingLibrary ?? '../../';
  libraryLink.textContent = readingLibrary ? '休闲阅读' : '教材';
  libraryLink.setAttribute('aria-label', readingLibrary ? '休闲阅读' : '全部教材');
  const separator = document.createElement('span');
  separator.textContent = '›';
  separator.setAttribute('aria-hidden', 'true');
  if (location.pathname.includes('/harmony-upper/')) bookLink.textContent = '和声学 · 上册';
  if (location.pathname.includes('/harmony-lower/')) bookLink.textContent = '和声学 · 下册';
  if (location.pathname.includes('/counterpoint/')) bookLink.textContent = '复调音乐';
  bookLink.setAttribute('aria-label', `${bookLink.textContent.trim()}目录`);
  bookLink.before(path);
  path.append(libraryLink, separator, bookLink);
}

function addOutline() {
  const headings = [...main.querySelectorAll(':scope > section > h2[id]')];
  if (headings.length < 2) return;

  const outline = document.createElement('div');
  outline.className = 'chapter-outline';
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  const currentTitle = document.createElement('span');
  currentTitle.className = 'chapter-outline-current';
  summary.append('本章目录', currentTitle);
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', '本章目录');
  const title = document.createElement('p');
  title.textContent = '本章目录';
  const list = document.createElement('ul');
  const wideScreen = matchMedia('(min-width: 82rem)');
  details.open = wideScreen.matches;
  wideScreen.addEventListener('change', ({ matches }) => { details.open = matches; });

  const links = headings.map(heading => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (!wideScreen.matches) details.open = false;
      heading.focus({ preventScroll: true });
    });
    heading.tabIndex = -1;
    item.append(link);
    list.append(item);
    return link;
  });

  nav.append(title, list);
  details.append(summary, nav);
  outline.append(details);
  (main.querySelector(':scope > .intro') ?? main.querySelector('h1')).after(outline);

  let active = -1;
  let animationFrame = 0;

  function updateCurrentSection() {
    animationFrame = 0;
    const readingLine = Math.min(120, innerHeight * 0.2);
    let index = 0;
    while (index + 1 < headings.length && headings[index + 1].getBoundingClientRect().top <= readingLine) index++;
    if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 2) {
      index = headings.length - 1;
    }
    if (active === index) return;
    links[active]?.removeAttribute('aria-current');
    links[index].setAttribute('aria-current', 'location');
    currentTitle.textContent = links[index].textContent;
    active = index;
  }

  function scheduleSectionUpdate() {
    if (!animationFrame) animationFrame = requestAnimationFrame(updateCurrentSection);
  }

  window.addEventListener('scroll', scheduleSectionUpdate, { passive: true });
  window.addEventListener('resize', scheduleSectionUpdate);
  window.addEventListener('hashchange', scheduleSectionUpdate);
  scheduleSectionUpdate();
}

async function addChapterNavigation() {
  const chapter = location.pathname.match(/\/(chapter|harmony|counterpoint|orchestration|form-analysis|songwriting|pro-composition|pop-techniques|pop-rock-theory)-(\d+)\.html$/);
  const songwritingAppendix = location.pathname.endsWith('/songwriting/songwriting-reference.html');
  const proIntro = location.pathname.endsWith('/pro-composition/pro-composition-intro.html');
  const proReference = location.pathname.endsWith('/pro-composition/pro-composition-techniques.html');
  const rockIntro = location.pathname.endsWith('/pop-rock-theory/pop-rock-theory-intro.html');
  const rockReference = location.pathname.endsWith('/pop-rock-theory/pop-rock-theory-reference.html');
  if (!chapter && !songwritingAppendix && !proIntro && !proReference && !rockIntro && !rockReference) return;
  const songwritingChapterCount = 17;
  const proChapterCount = 5;
  const rockChapterCount = 7;
  const [, series = rockIntro || rockReference ? 'pop-rock-theory' : proIntro || proReference ? 'pro-composition' : 'songwriting', chapterNumber] = chapter ?? [];
  const number = proIntro || rockIntro ? 0 : proReference ? proChapterCount + 1 : rockReference ? rockChapterCount + 1 : songwritingAppendix ? songwritingChapterCount + 1 : Number(chapterNumber);
  const proBook = series === 'pro-composition';
  const rockBook = series === 'pop-rock-theory';
  const lowerVolume = location.pathname.includes('/harmony-lower/');
  const first = lowerVolume ? 24 : 1;
  const last = lowerVolume ? 44 : ({
    chapter: 16,
    harmony: 23,
    counterpoint: 19,
    songwriting: songwritingChapterCount,
    'pop-techniques': 8,
    'pro-composition': proChapterCount,
    'pop-rock-theory': rockChapterCount
  }[series] ?? number);
  const book = './index.html';
  const titles = await chapterTitles(book);
  const previousPage = `./${series}-${number - 1}.html`;
  const nextPage = `./${series}-${number + 1}.html`;
  const nav = document.createElement('nav');
  nav.className = 'chapter-pagination';
  nav.setAttribute('aria-label', '相邻章节');

  function appendLink(url, label, title, relation) {
    const link = document.createElement('a');
    link.href = url;
    if (relation) link.rel = relation;
    const caption = document.createElement('span');
    caption.textContent = label;
    const name = document.createElement('strong');
    name.textContent = title;
    link.append(caption, name);
    nav.append(link);
  }

  function appendChapter(url, label, chapter, relation) {
    const title = titles?.get(url);
    const numberLabel = `第 ${chapter} ${proBook ? '篇' : '章'}`;
    appendLink(url, title ? `${label} · ${numberLabel}` : label, title || numberLabel, relation);
  }

  if (titles ? titles.has(previousPage) : number > first) {
    appendChapter(previousPage, proBook ? '上一篇' : '上一章', number - 1, 'prev');
  } else if (proBook && number === first) {
    const intro = './pro-composition-intro.html';
    appendLink(intro, '导论', titles?.get(intro) ?? '从构思到成曲', 'prev');
  } else if (rockBook && number === first) {
    const intro = './pop-rock-theory-intro.html';
    appendLink(intro, '导论', titles?.get(intro) ?? '从乐声到乐理', 'prev');
  } else if (lowerVolume && number === first) {
    appendLink('../harmony-upper/harmony-23.html', '上册 · 第 23 章', '调式交替与调式复合', 'prev');
  } else appendLink(book, '返回', '本书目录');
  if (titles ? titles.has(nextPage) : number < last) {
    appendChapter(nextPage, proBook ? '下一篇' : '下一章', number + 1, 'next');
  } else if (!lowerVolume && series === 'harmony') {
    appendLink('../harmony-lower/harmony-24.html', '下册 · 第 24 章', '重属和弦', 'next');
  } else if (series === 'songwriting' && number === last) {
    const appendix = './songwriting-reference.html';
    appendLink(appendix, '接着读 · 附录', titles?.get(appendix) ?? '演唱、定调与歌曲题头', 'next');
  } else if (proBook && number === last) {
    appendLink('./pro-composition-techniques.html', '附录', '音乐技巧索引', 'next');
  } else if (rockBook && number === last) {
    appendLink('./pop-rock-theory-reference.html', '附录', '钢琴与吉他的音高位置', 'next');
  } else if (!nav.querySelector(`[href="${book}"]`)) appendLink(book, '返回', '本书目录');
  main.append(nav);
}

async function chapterTitles(book) {
  try {
    const response = await fetch(book);
    if (response.ok) {
      const index = new DOMParser().parseFromString(await response.text(), 'text/html');
      const links = index.querySelectorAll('.course-index li > a');
      if (links.length) return new Map([...links].map(link => {
        link.querySelector(':scope > span')?.remove();
        return [link.getAttribute('href'), link.textContent.trim()];
      }));
    }
  } catch {
    // The directory link remains available if the index cannot be read.
  }
  return null;
}
