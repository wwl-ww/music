const layout = document.querySelector('.score-index-layout');
const form = layout.querySelector('.score-filters');
const rail = layout.querySelector('.score-book-jumps');
const bookSelect = form.elements.namedItem('book');
const search = form.elements.namedItem('query');
const clear = form.querySelector('.score-query-clear');
const count = layout.querySelector('.score-filter-count');
const empty = layout.querySelector('.score-filter-empty');

const normalize = text => text.normalize('NFKC').toLowerCase();

const books = [...rail.querySelectorAll('.score-book-group')].flatMap(group => {
  const options = document.createElement('optgroup');
  options.label = group.querySelector('h3').textContent.trim();
  bookSelect.append(options);
  return [...group.querySelectorAll('a')].map(link => readBook(link, options));
});

function readBook(link, options) {
  const id = link.hash.slice(1);
  const section = document.getElementById(id).closest('.score-book');
  const parts = [...section.querySelectorAll('.score-book-part')];
  options.append(new Option(link.textContent.trim(), id));
  link.dataset.scoreBook = id;
  const groups = [...section.querySelectorAll('.course-group')].map(group => {
    const heading = document.getElementById(group.getAttribute('aria-labelledby')).textContent;
    const items = [...group.querySelectorAll('li')].map(item => {
      const entry = item.querySelector('a');
      const chapter = new URL(entry.href).pathname.match(/-(\d+)\.html$/)?.[1];
      if (chapter) {
        const source = document.createElement('small');
        source.className = 'score-index-chapter';
        source.textContent = `第 ${chapter} ${link.dataset.sourceUnit ?? '章'}`;
        entry.append(' ', source);
      }
      return { item, text: normalize(`${heading} ${entry.textContent}`) };
    });
    return { group, items };
  });
  return { id, link, section, groups, parts };
}

const all = document.createElement('a');
all.textContent = '全部教材';
all.dataset.scoreBook = '';
rail.prepend(all);
const filters = [all, ...books.map(({ link }) => link)];

function filterURL(book = bookSelect.value) {
  const url = new URL(location.href);
  url.hash = '';
  url.searchParams.delete('book');
  url.searchParams.delete('q');
  if (book) url.searchParams.set('book', book);
  if (search.value.trim()) url.searchParams.set('q', search.value.trim());
  return url;
}

function filter() {
  const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
  let matches = 0;
  for (const { id, section, groups, parts } of books) {
    const selected = !bookSelect.value || bookSelect.value === id;
    let bookMatches = 0;
    for (const { group, items } of groups) {
      let groupMatches = 0;
      for (const { item, text } of items) {
        item.hidden = !selected || !terms.every(term => text.includes(term));
        if (!item.hidden) groupMatches++;
      }
      group.hidden = !groupMatches;
      bookMatches += groupMatches;
    }
    for (const part of parts) part.hidden = !part.querySelector('.course-group:not([hidden])');
    section.hidden = !bookMatches;
    matches += bookMatches;
  }
  for (const link of filters) {
    const { scoreBook } = link.dataset;
    link.href = filterURL(scoreBook).href;
    if (scoreBook === bookSelect.value) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
  clear.hidden = !search.value;
  empty.hidden = matches > 0;
  count.hidden = !matches;
  count.textContent = `${matches} 个谱例`;
}

function restore() {
  const url = new URL(location.href);
  const requested = url.searchParams.get('book') ?? url.hash.slice(1);
  const requestedSection = document.getElementById(requested)?.closest('.score-book');
  const book = books.find(({ id, section }) => id === requested || section === requestedSection);
  bookSelect.value = book?.id ?? '';
  search.value = url.searchParams.get('q') ?? '';
  if (book && (url.hash === `#${book.id}` || (url.searchParams.has('book') && requested !== book.id))) {
    history.replaceState(history.state, '', filterURL());
  }
  filter();
}

function update() {
  history.replaceState(history.state, '', filterURL());
  filter();
}

form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', event => { if (event.target === search) update(); });
bookSelect.addEventListener('change', update);
clear.addEventListener('click', () => {
  search.value = '';
  update();
  search.focus();
});
rail.addEventListener('click', event => {
  const link = event.target.closest('a[data-score-book]');
  if (!link || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
  event.preventDefault();
  bookSelect.value = link.dataset.scoreBook;
  update();
  layout.scrollIntoView({ block: 'nearest' });
});
window.addEventListener('popstate', restore);
window.addEventListener('hashchange', restore);
form.hidden = false;
layout.classList.add('is-filterable');
rail.setAttribute('aria-label', '筛选教材');
restore();
