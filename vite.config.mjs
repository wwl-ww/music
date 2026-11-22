import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { alphaTab } from '@coderline/alphatab-vite';
import { defineConfig } from 'vite';

const contentRoot = fileURLToPath(new URL('./content/', import.meta.url));
const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const alphaTabPackage = fileURLToPath(new URL('../', import.meta.resolve('@coderline/alphatab')));

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

export default defineConfig(({ command, isPreview }) => {
  const staticSite = command === 'build' || isPreview;
  return {
    root: staticSite ? contentRoot : undefined,
    base: staticSite ? '/music/' : '/',
    publicDir: false,
    plugins: [
      alphaTab({ assetOutputDir: false }),
      {
        name: 'course-entry-redirects',
        configureServer(server) { server.middlewares.use(redirectLegacyPages); }
      },
      {
        name: 'copy-static-course-assets',
        apply: 'build',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html.replace(/<script src="([^"]*\/themes\.js)"><\/script>/g, '<script vite-ignore src="$1"></script>');
          }
        },
        generateBundle() {
          const files = [
            ['shared/themes.js', resolve(contentRoot, 'shared/themes.js')],
            ['licenses/alphaTab.txt', resolve(alphaTabPackage, 'LICENSE')],
            ['licenses/Bravura.txt', resolve(alphaTabPackage, 'dist/font/Bravura-OFL.txt')]
          ];
          for (const [fileName, path] of files) {
            this.emitFile({ type: 'asset', fileName, source: readFileSync(path) });
          }
        }
      }
    ],
    build: {
      outDir: dist,
      emptyOutDir: true,
      rollupOptions: {
        input: readdirSync(contentRoot, { recursive: true, withFileTypes: true })
          .filter(entry => entry.isFile() && entry.name.endsWith('.html'))
          .map(entry => resolve(entry.parentPath, entry.name))
      }
    }
  };
});
