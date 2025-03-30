import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs#compile-time-svelte-compile for more information
  compilerOptions: {
    // Enable Svelte 4 compatibility mode
    compatibility: {
      componentApi: 4
    }
  },
  
  // Preprocessor settings
  preprocess: vitePreprocess()
};

export default config;
