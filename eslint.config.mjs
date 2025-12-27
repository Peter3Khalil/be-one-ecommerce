import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import i18next from 'eslint-plugin-i18next';
import pluginQuery from '@tanstack/eslint-plugin-query'


const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  i18next.configs['flat/recommended'],
    ...pluginQuery.configs['flat/recommended'],
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
              "options",
              "defaultValues",
              'side',
              'mode',
              'alt',
              'lang',
              'dir',
              'href',
              'onClick',
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
              'value',
              'onValueChange',
              'name',
              'defaultTheme',
              'locale',
              'defaultValue',
              'htmlFor',
              /^data-/,
              /^aria-/,
            ],
          },
        },
      ],
      'import/no-anonymous-default-export': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
