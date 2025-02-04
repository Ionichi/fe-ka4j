import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
	const hash = Math.floor(Math.random() * 90000) + 10000;
	// eslint-disable-next-line no-undef
	const env = loadEnv(mode, process.cwd(), "");

	return {
		server: {
			proxy: {
				"/api/v1": {
					target: env.VITE_API_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api\/v1/, ""),
				},
			},
			https: false,
		},
		plugins: [vue()],
		build: {
			rollupOptions: {
				output: {
					entryFileNames: `[name]` + hash + `.js`,
					chunkFileNames: `[name]` + hash + `.js`,
					assetFileNames: `[name]` + hash + `.[ext]`,
				},
			},
		},
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
	};
});
