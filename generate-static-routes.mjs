import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { staticRoutes } from './static-route-data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

const headerNav = `
  <header class="boot-header">
    <div class="boot-header-inner">
      <div>
        <strong>UFSBD Hérault</strong>
        <div style="color:#475569; margin-top:6px;">Union Française pour la Santé Bucco-Dentaire</div>
      </div>
      <nav class="boot-nav" aria-label="Navigation principale">
        <a href="https://ufsbd34.fr/">Accueil</a>
        <a href="https://ufsbd34.fr/blog">Actualités</a>
        <a href="https://ufsbd34.fr/organigramme">Organisation</a>
        <a href="https://ufsbd34.fr/contact">Contact</a>
        <a href="https://ufsbd34.fr/prevention">Prévention</a>
        <a href="https://ufsbd34.fr/formation">Formation</a>
        <a href="https://ufsbd34.fr/interventions">Interventions</a>
      </nav>
    </div>
  </header>
`;

const footerNav = `
  <footer class="boot-footer">
    <div class="boot-footer-inner">
      <strong>UFSBD Hérault</strong>
      <div class="boot-footer-links">
        <a href="https://ufsbd34.fr/blog">Actualités</a>
        <a href="https://ufsbd34.fr/contact">Contact</a>
        <a href="https://ufsbd34.fr/organigramme">Organisation</a>
        <a href="https://ufsbd34.fr/politique-confidentialite">Confidentialité</a>
        <a href="https://ufsbd34.fr/mentions-legales">Mentions légales</a>
        <a href="https://ufsbd34.fr/sitemap.xml">Sitemap</a>
      </div>
    </div>
  </footer>
`;

function buildFallback(route) {
  return `
    <div class="boot-fallback route-fallback route-fallback-${route.bodyClass}">
      ${headerNav}
      <main class="boot-main">
        ${route.html}
      </main>
      ${footerNav}
    </div>
  `;
}

function replaceTag(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

async function generate() {
  const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');

  for (const route of staticRoutes) {
    if (route.path === '/') {
      continue;
    }

    let html = baseHtml;
    html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
    html = replaceTag(
      html,
      /<meta name="description" content="[\s\S]*?" \/>/,
      `<meta name="description" content="${route.description}" />`,
    );
    html = replaceTag(
      html,
      /<link rel="canonical" href="[\s\S]*?" \/>/,
      `<link rel="canonical" href="${route.canonical}" />`,
    );
    html = replaceTag(
      html,
      /<meta property="og:title" content="[\s\S]*?" \/>/,
      `<meta property="og:title" content="${route.title}" />`,
    );
    html = replaceTag(
      html,
      /<meta property="og:description" content="[\s\S]*?" \/>/,
      `<meta property="og:description" content="${route.description}" />`,
    );
    html = replaceTag(
      html,
      /<meta property="og:url" content="[\s\S]*?" \/>/,
      `<meta property="og:url" content="${route.canonical}" />`,
    );
    html = replaceTag(
      html,
      /<meta name="twitter:title" content="[\s\S]*?" \/>/,
      `<meta name="twitter:title" content="${route.title}" />`,
    );
    html = replaceTag(
      html,
      /<meta name="twitter:description" content="[\s\S]*?" \/>/,
      `<meta name="twitter:description" content="${route.description}" />`,
    );
    html = replaceTag(
      html,
      /<div class="boot-fallback">[\s\S]*?<\/footer>\s*<\/div>/,
      buildFallback(route),
    );

    const outputDir = path.join(distDir, route.path.replace(/^\//, ''));
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, 'index.html'), html, 'utf8');
  }
}

generate().catch((error) => {
  console.error('Static route generation failed:', error);
  process.exit(1);
});
