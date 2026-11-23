export function mountScoreChoiceButtons(host, items, onSelect) {
  const buttons = items.map((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.scoreChoice = '';
    button.textContent = item.label;
    button.addEventListener('click', () => choose(index));
    return button;
  });
  host.replaceChildren(...buttons);

  function choose(position) {
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === position)));
    onSelect(items[position], position);
  }

  choose(0);
}
