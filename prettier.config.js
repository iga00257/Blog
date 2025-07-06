//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  printWidth: 100,
  jsxSingleQuote: true,

  // Start @trivago/prettier-plugin-sort-imports
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  // Start prettier-plugin-tailwindcss
  tailwindFunctions: ['tw', 'clsx', 'tw\\.[a-z-]+'],

  plugins: [
    'prettier-plugin-packagejson',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-css-order',
    'prettier-plugin-jsdoc',
    'prettier-plugin-tailwindcss', // MUST come last
  ],
};

module.exports = config;
