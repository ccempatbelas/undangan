import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			static: resolve(__dirname, 'static')
		}
	}
});
