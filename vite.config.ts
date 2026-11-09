import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

const __root = fileURLToPath(new URL('.', import.meta.url));

// Vite plugin to ensure GitHub Pages serves SPA correctly with 404 fallback and .nojekyll
function githubPagesHelper(): Plugin {
  return {
    name: 'github-pages-helper',
    closeBundle() {
      const distDir = path.resolve(__root, 'dist');
      if (fs.existsSync(distDir)) {
        // Ensure .nojekyll exists
        fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
        // Duplicate index.html to 404.html so GitHub Pages routing and direct refreshes work
        const indexPath = path.join(distDir, 'index.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, path.join(distDir, '404.html'));
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_PATH || './',
    plugins: [react(), tailwindcss(), githubPagesHelper()],
    resolve: {
      alias: {
        '@': __root,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
