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
    '--theme-font-family-base': `system-ui`,
    '--theme-font-family-heading': `system-ui`,
    '--theme-font-color-base': '0 0 0',
    '--theme-font-color-dark': '255 255 255',
    '--theme-rounded-base': '6px',
    '--theme-rounded-container': '12px',
    '--theme-border-base': '1px',
    // =~= Theme On-X Colors =~=
    '--on-primary': '255 255 255',
    '--on-secondary': '0 0 0',
    '--on-tertiary': '0 0 0',
    '--on-success': '0 0 0',
    '--on-warning': '0 0 0',
    '--on-error': '0 0 0',
    '--on-surface': '0 0 0',
    // =~= Theme Colors  =~=
    // primary | #104079
    '--color-primary-50': '219 226 235', // #dbe2eb
    '--color-primary-100': '207 217 228', // #cfd9e4
    '--color-primary-200': '195 207 222', // #c3cfde
    '--color-primary-300': '159 179 201', // #9fb3c9
    '--color-primary-400': '88 121 161', // #5879a1
    '--color-primary-500': '16 64 121', // #104079
    '--color-primary-600': '14 58 109', // #0e3a6d
    '--color-primary-700': '12 48 91', // #0c305b
    '--color-primary-800': '10 38 73', // #0a2649
    '--color-primary-900': '8 31 59', // #081f3b
    // secondary | #D66B05
    '--color-secondary-50': '249 233 218', // #f9e9da
    '--color-secondary-100': '247 225 205', // #f7e1cd
    '--color-secondary-200': '245 218 193', // #f5dac1
    '--color-secondary-300': '239 196 155', // #efc49b
    '--color-secondary-400': '226 151 80', // #e29750
    '--color-secondary-500': '214 107 5', // #D66B05
    '--color-secondary-600': '193 96 5', // #c16005
    '--color-secondary-700': '161 80 4', // #a15004
    '--color-secondary-800': '128 64 3', // #804003
    '--color-secondary-900': '105 52 2', // #693402
    // tertiary | #CEA33B
    '--color-tertiary-50': '248 241 226', // #f8f1e2
    '--color-tertiary-100': '245 237 216', // #f5edd8
    '--color-tertiary-200': '243 232 206', // #f3e8ce
    '--color-tertiary-300': '235 218 177', // #ebdab1
    '--color-tertiary-400': '221 191 118', // #ddbf76
    '--color-tertiary-500': '206 163 59', // #CEA33B
    '--color-tertiary-600': '185 147 53', // #b99335
    '--color-tertiary-700': '155 122 44', // #9b7a2c
    '--color-tertiary-800': '124 98 35', // #7c6223
    '--color-tertiary-900': '101 80 29', // #65501d
    // success | #83af41
    '--color-success-50': '236 243 227', // #ecf3e3
    '--color-success-100': '230 239 217', // #e6efd9
    '--color-success-200': '224 235 208', // #e0ebd0
    '--color-success-300': '205 223 179', // #cddfb3
    '--color-success-400': '168 199 122', // #a8c77a
    '--color-success-500': '131 175 65', // #83af41
    '--color-success-600': '118 158 59', // #769e3b
    '--color-success-700': '98 131 49', // #628331
    '--color-success-800': '79 105 39', // #4f6927
    '--color-success-900': '64 86 32', // #405620
    // warning | #f1e23b
    '--color-warning-50': '253 251 226', // #fdfbe2
    '--color-warning-100': '252 249 216', // #fcf9d8
    '--color-warning-200': '252 248 206', // #fcf8ce
    '--color-warning-300': '249 243 177', // #f9f3b1
    '--color-warning-400': '245 235 118', // #f5eb76
    '--color-warning-500': '241 226 59', // #f1e23b
    '--color-warning-600': '217 203 53', // #d9cb35
    '--color-warning-700': '181 170 44', // #b5aa2c
    '--color-warning-800': '145 136 35', // #918823
    '--color-warning-900': '118 111 29', // #766f1d
    // error | #dd4040
    '--color-error-50': '250 226 226', // #fae2e2
    '--color-error-100': '248 217 217', // #f8d9d9
    '--color-error-200': '247 207 207', // #f7cfcf
    '--color-error-300': '241 179 179', // #f1b3b3
    '--color-error-400': '231 121 121', // #e77979
    '--color-error-500': '221 64 64', // #dd4040
    '--color-error-600': '199 58 58', // #c73a3a
    '--color-error-700': '166 48 48', // #a63030
    '--color-error-800': '133 38 38', // #852626
    '--color-error-900': '108 31 31', // #6c1f1f
    // surface | #E6E6E6
    '--color-surface-50': '251 251 251', // #fbfbfb
    '--color-surface-100': '250 250 250', // #fafafa
    '--color-surface-200': '249 249 249', // #f9f9f9
    '--color-surface-300': '245 245 245', // #f5f5f5
    '--color-surface-400': '238 238 238', // #eeeeee
    '--color-surface-500': '230 230 230', // #E6E6E6
    '--color-surface-600': '207 207 207', // #cfcfcf
    '--color-surface-700': '173 173 173', // #adadad
    '--color-surface-800': '138 138 138', // #8a8a8a
    '--color-surface-900': '113 113 113' // #717171
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
    plugin(function ({ matchUtilities, theme }) {
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
