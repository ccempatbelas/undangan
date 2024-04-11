import { skeleton } from '@skeletonlabs/tw-plugin';
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const theme: CustomThemeConfig = {
	name: 'theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': 'Alice, system-ui',
		'--theme-font-family-heading': 'Alice, system-ui',
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #ffd700
		'--color-primary-50': '255 249 217', // #fff9d9
		'--color-primary-100': '255 247 204', // #fff7cc
		'--color-primary-200': '255 245 191', // #fff5bf
		'--color-primary-300': '255 239 153', // #ffef99
		'--color-primary-400': '255 227 77', // #ffe34d
		'--color-primary-500': '255 215 0', // #ffd700
		'--color-primary-600': '230 194 0', // #e6c200
		'--color-primary-700': '191 161 0', // #bfa100
		'--color-primary-800': '153 129 0', // #998100
		'--color-primary-900': '125 105 0', // #7d6900
		// secondary | #38571a
		'--color-secondary-50': '225 230 221', // #e1e6dd
		'--color-secondary-100': '215 221 209', // #d7ddd1
		'--color-secondary-200': '205 213 198', // #cdd5c6
		'--color-secondary-300': '175 188 163', // #afbca3
		'--color-secondary-400': '116 137 95', // #74895f
		'--color-secondary-500': '56 87 26', // #38571a
		'--color-secondary-600': '50 78 23', // #324e17
		'--color-secondary-700': '42 65 20', // #2a4114
		'--color-secondary-800': '34 52 16', // #223410
		'--color-secondary-900': '27 43 13', // #1b2b0d
		// tertiary | #006d8f
		'--color-tertiary-50': '217 233 238', // #d9e9ee
		'--color-tertiary-100': '204 226 233', // #cce2e9
		'--color-tertiary-200': '191 219 227', // #bfdbe3
		'--color-tertiary-300': '153 197 210', // #99c5d2
		'--color-tertiary-400': '77 153 177', // #4d99b1
		'--color-tertiary-500': '0 109 143', // #006d8f
		'--color-tertiary-600': '0 98 129', // #006281
		'--color-tertiary-700': '0 82 107', // #00526b
		'--color-tertiary-800': '0 65 86', // #004156
		'--color-tertiary-900': '0 53 70', // #003546
		// success | #77bb41
		'--color-success-50': '235 245 227', // #ebf5e3
		'--color-success-100': '228 241 217', // #e4f1d9
		'--color-success-200': '221 238 208', // #ddeed0
		'--color-success-300': '201 228 179', // #c9e4b3
		'--color-success-400': '160 207 122', // #a0cf7a
		'--color-success-500': '119 187 65', // #77bb41
		'--color-success-600': '107 168 59', // #6ba83b
		'--color-success-700': '89 140 49', // #598c31
		'--color-success-800': '71 112 39', // #477027
		'--color-success-900': '58 92 32', // #3a5c20
		// warning | #c96e00
		'--color-warning-50': '247 233 217', // #f7e9d9
		'--color-warning-100': '244 226 204', // #f4e2cc
		'--color-warning-200': '242 219 191', // #f2dbbf
		'--color-warning-300': '233 197 153', // #e9c599
		'--color-warning-400': '217 154 77', // #d99a4d
		'--color-warning-500': '201 110 0', // #c96e00
		'--color-warning-600': '181 99 0', // #b56300
		'--color-warning-700': '151 83 0', // #975300
		'--color-warning-800': '121 66 0', // #794200
		'--color-warning-900': '98 54 0', // #623600
		// error | #ff4013
		'--color-error-50': '255 226 220', // #ffe2dc
		'--color-error-100': '255 217 208', // #ffd9d0
		'--color-error-200': '255 207 196', // #ffcfc4
		'--color-error-300': '255 179 161', // #ffb3a1
		'--color-error-400': '255 121 90', // #ff795a
		'--color-error-500': '255 64 19', // #ff4013
		'--color-error-600': '230 58 17', // #e63a11
		'--color-error-700': '191 48 14', // #bf300e
		'--color-error-800': '153 38 11', // #99260b
		'--color-error-900': '125 31 9', // #7d1f09
		// surface | #252530
		'--color-surface-50': '222 222 227', // #dedee3
		'--color-surface-100': '211 211 218', // #d3d3da
		'--color-surface-200': '200 200 208', // #c8c8d0
		'--color-surface-300': '167 167 180', // #a7a7b4
		'--color-surface-400': '100 100 124', // #64647c
		'--color-surface-500': '34 34 68', // #222244
		'--color-surface-600': '31 31 61', // #1f1f3d
		'--color-surface-700': '26 26 51', // #1a1a33
		'--color-surface-800': '20 20 41', // #141429
		'--color-surface-900': '17 17 33' // #111121
	}
};

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			screens: {
				xs: '420px'
			},
			backgroundImage: {
				stars: "url('/images/cover.jpg')"
			},
			fontFamily: {
				glester: ['Glester', ...defaultTheme.fontFamily.serif],
				alice: ['Alice', ...defaultTheme.fontFamily.serif]
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)'
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		plugin(function({ matchUtilities, theme }) {
			matchUtilities(
				{
					'text-shadow': (value) => ({
						textShadow: value
					})
				},
				{ values: theme('textShadow') }
			);
		}),
		skeleton({
			themes: {
				custom: [theme]
			}
		}) // Append the Skeleton plugin (after other plugins)
	]
} satisfies Config;

export default config;
