import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import i18next from 'eslint-plugin-i18next';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  i18next.configs['flat/recommended'],
  {
    rules: {
      'no-unused-vars': ['error'],
      'i18next/no-literal-string': [
        'error',
        {
          mode: 'jsx-only',
          'jsx-attributes': {
            includes: ['label', 'title'],
            exclude: [
              'className',
              'styleName',
              'alt',
              'lang',
              'dir',
              'href',
              /^on-/,
              'variant',
              'size',
              'color',
              'attribute',
              'role',
              'style',
              'type',
              'key',
              'id',
              'width',
              'height',
              /^data-/,
              /^aria-/,
            ],
          },
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
