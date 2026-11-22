import { prepareReadingContent } from './formats/readable-layout.js';

const main = document.querySelector('main');
prepareReadingContent(main);

if (main.matches('.lesson-chapter')) {
  addOutline();
  addChapterNavigation();
}

function addOutline() {
  const headings = main.querySelectorAll(':scope > section > h2[id]');
  if (headings.length < 2) return;

  const outline = document.createElement('div');
  outline.className = 'chapter-outline';
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = '本章目录';
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', '本章目录');
  const title = document.createElement('p');
  title.textContent = '本章目录';
  const list = document.createElement('ul');
  const wideScreen = matchMedia('(min-width: 76rem)');
  details.open = wideScreen.matches;
  wideScreen.addEventListener('change', ({ matches }) => { details.open = matches; });

  for (const heading of headings) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (!wideScreen.matches) details.open = false;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
    item.append(link);
    list.append(item);
  }

  nav.append(title, list);
  details.append(summary, nav);
  outline.append(details);
  (main.querySelector(':scope > .intro') ?? main.querySelector('h1')).after(outline);
}

async function addChapterNavigation() {
  const chapter = location.pathname.match(/\/(chapter|harmony)-(\d+)\.html$/);
  if (!chapter) return;
  const [, series, chapterNumber] = chapter;
  const number = Number(chapterNumber);
  const lowerVolume = location.pathname.includes('/harmony-lower/');
  const first = lowerVolume ? 24 : 1;
  const last = series === 'harmony' ? 23 : 16;
  const book = './index.html';
  const published = lowerVolume ? await publishedChapters(book) : undefined;
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

  if (published ? published.has(previousPage) : number > first) {
    appendLink(previousPage, '上一章', `第 ${number - 1} 章`, 'prev');
  } else if (lowerVolume && number === first) appendLink('../harmony-upper/harmony-23.html', '上册', '第 23 章', 'prev');
  else appendLink(book, '返回', '本书目录');
  if (published ? published.has(nextPage) : number < last) {
    appendLink(nextPage, '下一章', `第 ${number + 1} 章`, 'next');
  } else if (!lowerVolume && series === 'harmony') appendLink('../harmony-lower/harmony-24.html', '下册', '第 24 章', 'next');
  else if (!nav.querySelector(`[href="${book}"]`)) appendLink(book, '返回', '本书目录');
  main.append(nav);
}

async function publishedChapters(book) {
  try {
    const response = await fetch(book);
    if (response.ok) {
      const index = new DOMParser().parseFromString(await response.text(), 'text/html');
      return new Set([...index.querySelectorAll('.course-index a')].map(link => link.getAttribute('href')));
    }
  } catch {
    // The directory link remains available if the index cannot be read.
  }
  return new Set();
}
