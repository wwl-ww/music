const search = document.querySelector('#humor-search');
const rows = [...document.querySelectorAll('[data-entry-number]')];
const empty = document.querySelector('.humor-index-empty');

function filterEntries() {
  const query = search.value.normalize('NFKC').trim().toLowerCase();
  const isNumber = /^\d+$/.test(query);

  for (const row of rows) {
    const match = isNumber
      ? Number(row.dataset.entryNumber) === Number(query)
      : row.dataset.title.normalize('NFKC').toLowerCase().includes(query);

    row.hidden = !match;
  }

  empty.hidden = rows.some(row => !row.hidden);
}

function revealLinkedEntry() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.hidden && target.hasAttribute('data-entry-number')) {
    search.value = '';
    filterEntries();
    target.scrollIntoView();
  }
}

search.addEventListener('input', filterEntries);
window.addEventListener('hashchange', revealLinkedEntry);
search.closest('.humor-index-tools').hidden = false;
filterEntries();
revealLinkedEntry();
