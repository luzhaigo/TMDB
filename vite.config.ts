import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { execSync } from 'child_process';

const commitHash = execSync('git rev-parse HEAD').toString().trim();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const htmlPlugin = () => {
    const env = loadEnv(mode, '.');
    env['COMMIT_HASH'] = commitHash;

    return {
      name: 'html-transform',
      transformIndexHtml(html: string) {
        return html.replace(/\{\{(.*?)\}\}/g, (_, p) => env[p]);
      },
    };
  };

  return {
    base: '/TMDB/',
    plugins: [react(), tsconfigPaths(), htmlPlugin()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      coverage: {
        provider: 'istanbul',
      },
    },
  };
});
