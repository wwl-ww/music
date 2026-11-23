import { prepareReadingContent } from './formats/readable-layout.js';

const main = document.querySelector('main');
prepareReadingContent(main);

if (main.matches('.lesson-chapter')) {
  addCoursePath();
  addOutline();
  addChapterNavigation();
}

function addCoursePath() {
  const bookLink = document.querySelector('.masthead .chapter-home');
  if (!bookLink) return;

  const path = document.createElement('nav');
  path.className = 'chapter-path';
  path.setAttribute('aria-label', '课程路径');
  const libraryLink = document.createElement('a');
  libraryLink.href = '../../';
  libraryLink.textContent = '教材';
  libraryLink.setAttribute('aria-label', '全部教材');
  const separator = document.createElement('span');
  separator.textContent = '›';
  separator.setAttribute('aria-hidden', 'true');
  if (location.pathname.includes('/harmony-upper/')) bookLink.textContent = '和声学 · 上册';
  if (location.pathname.includes('/harmony-lower/')) bookLink.textContent = '和声学 · 下册';
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
  const wideScreen = matchMedia('(min-width: 76rem)');
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
  const chapter = location.pathname.match(/\/(chapter|harmony|counterpoint)-(\d+)\.html$/);
  if (!chapter) return;
  const [, series, chapterNumber] = chapter;
  const number = Number(chapterNumber);
  const lowerVolume = location.pathname.includes('/harmony-lower/');
  const first = lowerVolume ? 24 : 1;
  const last = lowerVolume ? 44 : { chapter: 16, harmony: 23, counterpoint: 19 }[series];
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
    const numberLabel = `第 ${chapter} 章`;
    appendLink(url, title ? `${label} · ${numberLabel}` : label, title || numberLabel, relation);
  }

  if (titles ? titles.has(previousPage) : number > first) {
    appendChapter(previousPage, '上一章', number - 1, 'prev');
  } else if (lowerVolume && number === first) {
    appendLink('../harmony-upper/harmony-23.html', '上册 · 第 23 章', '调式交替与调式复合', 'prev');
  } else appendLink(book, '返回', '本书目录');
  if (titles ? titles.has(nextPage) : number < last) {
    appendChapter(nextPage, '下一章', number + 1, 'next');
  } else if (!lowerVolume && series === 'harmony') {
    appendLink('../harmony-lower/harmony-24.html', '下册 · 第 24 章', '重属和弦', 'next');
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
