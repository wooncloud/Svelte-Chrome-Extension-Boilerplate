import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import { mkdirSync, existsSync, readFileSync, writeFileSync, rmSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'move-and-fix-html-files',
      closeBundle() {
        // Hook to move HTML files to the correct location and fix script references after build
        try {
          // Check and create directories
          if (!existsSync('dist/popup')) {
            mkdirSync('dist/popup', { recursive: true });
          }
          if (!existsSync('dist/newtab')) {
            mkdirSync('dist/newtab', { recursive: true });
          }
          
          // Modify and move popup HTML
          let popupHtml = readFileSync('dist/src/popup/popup.html', 'utf8');
          popupHtml = popupHtml.replace(/src="\.\.\/\.\.\//g, 'src="../');
          popupHtml = popupHtml.replace(/href="\.\.\/\.\.\//g, 'href="../');
          writeFileSync('dist/popup/popup.html', popupHtml);
          
          // Modify and move new tab HTML
          let newtabHtml = readFileSync('dist/src/newtab/index.html', 'utf8');
          newtabHtml = newtabHtml.replace(/src="\.\.\/\.\.\//g, 'src="../');
          newtabHtml = newtabHtml.replace(/href="\.\.\/\.\.\//g, 'href="../');
          writeFileSync('dist/newtab/index.html', newtabHtml);
          
          // Delete temporary src folder
          rmSync('dist/src', { recursive: true, force: true });
          
          console.log('HTML files successfully moved and modified!');
        } catch (error) {
          console.error('Error processing HTML files:', error);
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/popup.html'),
        background: resolve(__dirname, 'src/background/background.js'),
        content: resolve(__dirname, 'src/content_scripts/content.js'),
        newtab: resolve(__dirname, 'src/newtab/index.html')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Determine folder path based on entry point name
          if (chunkInfo.name === 'popup') return 'popup/popup.js';
          if (chunkInfo.name === 'background') return 'background/background.js';
          if (chunkInfo.name === 'content') return 'content_scripts/content.js';
          if (chunkInfo.name === 'newtab') return 'newtab/newtab.js';
          return '[name]/[name].js';
        },
        chunkFileNames: (chunkInfo) => {
          // Place shared chunks in the shared folder
          return 'shared/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];

          // Process CSS files
          if (extType === 'css') {
            if (assetInfo.name.includes('popup')) {
              return 'popup/popup.css';
            } 
            if (assetInfo.name.includes('content')) {
              return 'content_scripts/content.css';
            }
            if (assetInfo.name.includes('index') || assetInfo.name.includes('newtab')) {
              return 'newtab/newtab.css';
            }
            return '[name][extname]';
          }

          // Place other assets like images in the assets folder
          return 'assets/[name][extname]';
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    strictPort: true,
    open: '/src/newtab/index.html', // Automatically open new tab page when starting development server
    fs: {
      // Allow access to local files
      allow: ['..']
    }
  },
  base: './'
})
