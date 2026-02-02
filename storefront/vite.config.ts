import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {reactRouter} from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import {fileURLToPath} from 'url';

export default defineConfig({
  plugins: [hydrogen(), oxygen(), reactRouter(), tsconfigPaths()],
  resolve: {
    dedupe: ['styled-components', 'react', 'react-dom', '@sanity/ui'],
    alias: {
      studio: fileURLToPath(new URL('../studio', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['styled-components', '@sanity/ui'],
  },
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: ['rxjs', 'set-cookie-parser', 'cookie', 'react-router', '@sanity/client', 'groqd'],
    },
    noExternal: ['styled-components', '@sanity/ui'],
  },
  server: {
    allowedHosts: ['.tryhydrogen.dev'],
  },
});
