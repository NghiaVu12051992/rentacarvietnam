import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hanoicarbusrental.com',
  output: 'static',
  server: {
    host: true,
    port: 4321,
  },
});
