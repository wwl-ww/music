const picker = document.querySelector('.scan-repertoire-picker');
const summary = picker.querySelector('summary');
const songs = [...picker.querySelectorAll('[data-song]')];
const songsById = new Map(songs.map(link => [link.dataset.song, link]));
const preview = document.querySelector('[data-repertoire-score]');
const heading = preview.querySelector('h2');
const scoreLink = preview.querySelector('.scan-page a');
let currentSong;

function renderSong() {
  const song = songsById.get(location.hash.slice(1)) ?? songs[0];
  if (song === currentSong) return;

  currentSong?.removeAttribute('aria-current');
  song.setAttribute('aria-current', 'true');
  currentSong = song;

  const name = song.textContent.trim();
  const { song: id, width, height } = song.dataset;
  heading.id = id;
  heading.textContent = name;
  preview.setAttribute('aria-labelledby', id);

  const image = new Image(Number(width), Number(height));
  image.alt = `《${name}》完整弹唱谱`;
  image.decoding = 'async';
  scoreLink.href = song.href;
  scoreLink.setAttribute('aria-label', `放大查看${image.alt}（新标签页）`);
  scoreLink.replaceChildren(image);
  image.src = song.href;
  preview.hidden = false;
}

picker.addEventListener('click', event => {
  const song = event.target.closest('[data-song]');
  if (!song || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;

  event.preventDefault();
  const hash = `#${song.dataset.song}`;
  if (location.hash !== hash) history.pushState(null, '', hash);
  renderSong();
  picker.open = false;
  summary.focus();
});

window.addEventListener('popstate', renderSong);
window.addEventListener('hashchange', renderSong);
renderSong();
