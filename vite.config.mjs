import { defineConfig } from 'vite';

const legacyPages = new Map([
  ['/', '/content/'],
  ['/index.html', '/content/'],
  ['/music-theory.html', '/content/books/music-theory/'],
  ['/harmony.html', '/content/books/harmony-upper/'],
  ['/format-library.html', '/content/format-library.html'],
  ['/programmatic-scores.html', '/content/programmatic-scores.html']
]);

function redirectLegacyPages(req, res, next) {
  const [pathname, query = ''] = (req.url ?? '').split(/\?(.*)/s, 2);
  const chapter = pathname.match(/^\/(chapter|harmony)-(\d+)\.html$/);
  const book = chapter?.[1] === 'chapter' ? 'music-theory'
    : Number(chapter?.[2]) >= 24 ? 'harmony-lower' : 'harmony-upper';
  const target = legacyPages.get(pathname) ?? (chapter && `/content/books/${book}${pathname}`);
  if (!target) return next();

  res.writeHead(302, { Location: target + (query ? `?${query}` : '') });
  res.end();
}

export default defineConfig({
  plugins: [{
    name: 'course-entry-redirects',
    configureServer(server) { server.middlewares.use(redirectLegacyPages); },
    configurePreviewServer(server) { server.middlewares.use(redirectLegacyPages); }
  }]
});
