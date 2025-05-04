import { defineConfig } from 'astro/config';
import {config} from './config.js'
import {collect_content} from './integrations/integration-content-structure.js'
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  integrations: [collect_content(config.collect_content)],
  output: "static",
  outDir: config.outDir,
  base: config.base,
  site: 'https://sssstudy.com',
  trailingSlash: 'ignore',
  server: {
    host: '0.0.0.0', // すべてのネットワークインターフェースでリッスン
    port: 3500
  },
  vite: {
    plugins: [yaml()]
  }
});
