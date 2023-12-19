import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    server: {
      host: true,
      port: 3000,
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        components: "/src/components",
        pages: "/src/pages",
        utils: "/src/utils",
        hooks: "/src/hooks",
        services: "/src/services",
      },
    },
  });
};
