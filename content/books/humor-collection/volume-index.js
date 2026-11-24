const search = document.querySelector('#humor-search');
const rows = [...document.querySelectorAll('[data-entry-number]')];
const count = document.querySelector('.humor-index-count');

function filterEntries() {
  const query = search.value.normalize('NFKC').trim().toLowerCase();
  const isNumber = /^\d+$/.test(query);
  let hits = 0;

  for (const row of rows) {
    const match = isNumber
      ? Number(row.dataset.entryNumber) === Number(query)
      : row.dataset.title.normalize('NFKC').toLowerCase().includes(query);

    row.hidden = !match;
    if (match) hits += 1;
  }

  count.textContent = hits === rows.length
    ? `共 ${rows.length} 条`
    : hits ? `找到 ${hits} 条，共 ${rows.length} 条` : '没有匹配条目';
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
