const form = document.querySelector('.score-filters');
const jumps = document.querySelector('.score-book-jumps');
const bookSelect = form.elements.namedItem('book');
const search = form.elements.namedItem('query');
const empty = document.querySelector('.score-filter-empty');
const books = [...jumps.querySelectorAll('a')].map(link => {
  const id = link.hash.slice(1);
  const heading = document.getElementById(id);
  const section = heading.closest('.score-book');
  const groups = [...section.querySelectorAll('.course-group')].map(group => ({
    group,
    heading: group.querySelector('h3').textContent.trim(),
    items: [...group.querySelectorAll('li')]
  }));
  bookSelect.add(new Option(link.textContent.trim(), id));
  return { id, heading, section, groups };
});

function filter() {
  const query = search.value.trim().toLowerCase();
  let matches = 0;
  for (const { id, section, groups } of books) {
    const selected = !bookSelect.value || bookSelect.value === id;
    let bookMatches = 0;
    for (const { group, heading, items } of groups) {
      let groupMatches = 0;
      for (const item of items) {
        item.hidden = !selected || ![heading, item.textContent].some(text => text.toLowerCase().includes(query));
        if (!item.hidden) groupMatches++;
      }
      group.hidden = !groupMatches;
      bookMatches += groupMatches;
    }
    section.hidden = !bookMatches;
    matches += bookMatches;
  }
  empty.hidden = matches > 0;
}

function openLinkedBook() {
  const linkedBook = books.find(({ id }) => `#${id}` === location.hash);
  bookSelect.value = linkedBook?.id ?? '';
  search.value = '';
  filter();
  if (linkedBook) requestAnimationFrame(() => linkedBook.heading.scrollIntoView());
}

form.addEventListener('submit', event => event.preventDefault());
bookSelect.addEventListener('change', () => {
  const url = new URL(location.href);
  url.hash = bookSelect.value;
  history.replaceState(history.state, '', url);
  filter();
});
search.addEventListener('input', filter);
window.addEventListener('hashchange', openLinkedBook);
form.hidden = false;
jumps.hidden = true;
openLinkedBook();
