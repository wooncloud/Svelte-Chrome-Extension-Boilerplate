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
        // 빌드 후 HTML 파일을 올바른 위치로 옮기고 스크립트 참조를 수정하는 훅
        try {
          // 디렉토리 확인 및 생성
          if (!existsSync('dist/popup')) {
            mkdirSync('dist/popup', { recursive: true });
          }
          if (!existsSync('dist/newtab')) {
            mkdirSync('dist/newtab', { recursive: true });
          }
          
          // 팝업 HTML 수정 및 이동
          let popupHtml = readFileSync('dist/src/popup/popup.html', 'utf8');
          popupHtml = popupHtml.replace(/src="\.\.\/\.\.\//g, 'src="../');
          popupHtml = popupHtml.replace(/href="\.\.\/\.\.\//g, 'href="../');
          writeFileSync('dist/popup/popup.html', popupHtml);
          
          // 새 탭 HTML 수정 및 이동
          let newtabHtml = readFileSync('dist/src/newtab/index.html', 'utf8');
          newtabHtml = newtabHtml.replace(/src="\.\.\/\.\.\//g, 'src="../');
          newtabHtml = newtabHtml.replace(/href="\.\.\/\.\.\//g, 'href="../');
          writeFileSync('dist/newtab/index.html', newtabHtml);
          
          // 임시 src 폴더 삭제
          rmSync('dist/src', { recursive: true, force: true });
          
          console.log('HTML 파일이 성공적으로 이동 및 수정되었습니다!');
        } catch (error) {
          console.error('HTML 파일 처리 중 오류 발생:', error);
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
          // 진입점 이름에 따라 폴더 경로 결정
          if (chunkInfo.name === 'popup') return 'popup/popup.js';
          if (chunkInfo.name === 'background') return 'background/background.js';
          if (chunkInfo.name === 'content') return 'content_scripts/content.js';
          if (chunkInfo.name === 'newtab') return 'newtab/newtab.js';
          return '[name]/[name].js';
        },
        chunkFileNames: (chunkInfo) => {
          // 공유 청크는 shared 폴더에 배치
          return 'shared/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];

          // CSS 파일 처리
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

          // 이미지 등 다른 에셋은 assets 폴더에 배치
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
    open: '/src/newtab/index.html', // 개발 서버 시작시 자동으로 새 탭 페이지 열기
    fs: {
      // 로컬 파일 접근 허용
      allow: ['..']
    }
  },
  base: './'
})
