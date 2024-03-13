import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { execSync } from 'child_process';

const commitHash = execSync('git rev-parse HEAD').toString().trim();

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html.replace(/\{\{COMMIT_HASH\}\}/, commitHash);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/TMDB/',
  plugins: [react(), tsconfigPaths(), htmlPlugin()],
});
