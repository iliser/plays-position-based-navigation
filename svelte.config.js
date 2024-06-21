import adapter from '@sveltejs/adapter-static';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(
			{
				pages: 'docs',
				assets: 'docs',
				fallback: undefined,
				precompress: false,
				strict: true,
				base: process.env.NODE_ENV === 'production' ? '/plays-position-based-navigation' : '',
			}
		)
	}
};

export default config;
