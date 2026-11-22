const themeKey = 'music-theory-theme';
const themeIds = new Set(['paper', 'ivory', 'mist', 'lilac', 'rose', 'mint', 'amber', 'slate', 'midnight']);

document.documentElement.dataset.theme = 'paper';
try {
  const savedTheme = localStorage.getItem(themeKey);
  if (themeIds.has(savedTheme)) document.documentElement.dataset.theme = savedTheme;
} catch {
  // Theme selection still works for the current page if storage is unavailable.
}

document.addEventListener('DOMContentLoaded', () => {
  const choices = document.querySelector('#theme-choices');
  const current = document.documentElement.dataset.theme || 'paper';
  choices.querySelector(`[value="${current}"]`).checked = true;

  choices.addEventListener('change', ({ target }) => {
    if (!themeIds.has(target.value)) return;
    document.documentElement.dataset.theme = target.value;
    try {
      localStorage.setItem(themeKey, target.value);
    } catch {
      // The selected theme is already applied.
    }
  });
});
