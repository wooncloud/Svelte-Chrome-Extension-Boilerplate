import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs#compile-time-svelte-compile for more information
  compilerOptions: {
    // 스벨트 4 호환성 모드 활성화
    compatibility: {
      componentApi: 4
    }
  },
  
  // 전처리기 설정
  preprocess: vitePreprocess()
};

export default config;
