// vite.config.ts
import react from "file:///home/developers/Downloads/keycloak-open-source/keycloak/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.1_vite@5.4.11_@types+node@22.9.0_lightningcss@1.28.1_terser@5.36.0_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { defineConfig, loadEnv } from "file:///home/developers/Downloads/keycloak-open-source/keycloak/node_modules/.pnpm/vite@5.4.11_@types+node@22.9.0_lightningcss@1.28.1_terser@5.36.0/node_modules/vite/dist/node/index.js";
import { checker } from "file:///home/developers/Downloads/keycloak-open-source/keycloak/node_modules/.pnpm/vite-plugin-checker@0.8.0_eslint@9.14.0_optionator@0.9.4_typescript@5.6.3_vite@5.4.11_@types+_kpdrpxfjxj4y2fd76kkxuxidtm/node_modules/vite-plugin-checker/dist/esm/main.js";
import dts from "file:///home/developers/Downloads/keycloak-open-source/keycloak/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.9.0_rollup@4.25.0_typescript@5.6.3_vite@5.4.11_@types+no_ihzlzlgykigvwgxbrmjfmtfk2e/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/home/developers/Downloads/keycloak-open-source/keycloak/js/apps/admin-ui";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const external = ["react", "react/jsx-runtime", "react-dom"];
  const plugins = [react(), checker({ typescript: true })];
  const input = env.LIB ? void 0 : "src/main.tsx";
  if (env.LIB) {
    external.push("react-router-dom");
    external.push("react-i18next");
    plugins.push(dts({ insertTypesEntry: true }));
  }
  const lib = env.LIB ? {
    outDir: "lib",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es"]
    }
  } : {
    outDir: "target/classes/theme/keycloak.v2/admin/resources",
    external: ["src/index.ts"]
  };
  return {
    base: "",
    server: {
      origin: "http://localhost:5174",
      port: 5174
    },
    build: {
      ...lib,
      sourcemap: true,
      target: "esnext",
      modulePreload: false,
      cssMinify: "lightningcss",
      manifest: true,
      rollupOptions: {
        input,
        external
      }
    },
    plugins,
    test: {
      watch: false,
      environment: "jsdom",
      server: {
        deps: {
          inline: [/@patternfly\/.*/]
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kZXZlbG9wZXJzL0Rvd25sb2Fkcy9rZXljbG9hay1vcGVuLXNvdXJjZS9rZXljbG9hay9qcy9hcHBzL2FkbWluLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9kZXZlbG9wZXJzL0Rvd25sb2Fkcy9rZXljbG9hay1vcGVuLXNvdXJjZS9rZXljbG9hay9qcy9hcHBzL2FkbWluLXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2RldmVsb3BlcnMvRG93bmxvYWRzL2tleWNsb2FrLW9wZW4tc291cmNlL2tleWNsb2FrL2pzL2FwcHMvYWRtaW4tdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBjaGVja2VyIH0gZnJvbSBcInZpdGUtcGx1Z2luLWNoZWNrZXJcIjtcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xuICBjb25zdCBleHRlcm5hbCA9IFtcInJlYWN0XCIsIFwicmVhY3QvanN4LXJ1bnRpbWVcIiwgXCJyZWFjdC1kb21cIl07XG4gIGNvbnN0IHBsdWdpbnMgPSBbcmVhY3QoKSwgY2hlY2tlcih7IHR5cGVzY3JpcHQ6IHRydWUgfSldO1xuICBjb25zdCBpbnB1dCA9IGVudi5MSUIgPyB1bmRlZmluZWQgOiBcInNyYy9tYWluLnRzeFwiO1xuICBpZiAoZW52LkxJQikge1xuICAgIGV4dGVybmFsLnB1c2goXCJyZWFjdC1yb3V0ZXItZG9tXCIpO1xuICAgIGV4dGVybmFsLnB1c2goXCJyZWFjdC1pMThuZXh0XCIpO1xuICAgIHBsdWdpbnMucHVzaChkdHMoeyBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlIH0pKTtcbiAgfVxuICBjb25zdCBsaWIgPSBlbnYuTElCXG4gICAgPyB7XG4gICAgICAgIG91dERpcjogXCJsaWJcIixcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIDoge1xuICAgICAgICBvdXREaXI6IFwidGFyZ2V0L2NsYXNzZXMvdGhlbWUva2V5Y2xvYWsudjIvYWRtaW4vcmVzb3VyY2VzXCIsXG4gICAgICAgIGV4dGVybmFsOiBbXCJzcmMvaW5kZXgudHNcIl0sXG4gICAgICB9O1xuICByZXR1cm4ge1xuICAgIGJhc2U6IFwiXCIsXG4gICAgc2VydmVyOiB7XG4gICAgICBvcmlnaW46IFwiaHR0cDovL2xvY2FsaG9zdDo1MTc0XCIsXG4gICAgICBwb3J0OiA1MTc0LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIC4uLmxpYixcbiAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgIHRhcmdldDogXCJlc25leHRcIixcbiAgICAgIG1vZHVsZVByZWxvYWQ6IGZhbHNlLFxuICAgICAgY3NzTWluaWZ5OiBcImxpZ2h0bmluZ2Nzc1wiLFxuICAgICAgbWFuaWZlc3Q6IHRydWUsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGlucHV0LFxuICAgICAgICBleHRlcm5hbCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zLFxuICAgIHRlc3Q6IHtcbiAgICAgIHdhdGNoOiBmYWxzZSxcbiAgICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgZGVwczoge1xuICAgICAgICAgIGlubGluZTogWy9AcGF0dGVybmZseVxcLy4qL10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlksT0FBTyxXQUFXO0FBQy9aLE9BQU8sVUFBVTtBQUNqQixTQUFTLGNBQWMsZUFBZTtBQUN0QyxTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBSmhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxRQUFNLFdBQVcsQ0FBQyxTQUFTLHFCQUFxQixXQUFXO0FBQzNELFFBQU0sVUFBVSxDQUFDLE1BQU0sR0FBRyxRQUFRLEVBQUUsWUFBWSxLQUFLLENBQUMsQ0FBQztBQUN2RCxRQUFNLFFBQVEsSUFBSSxNQUFNLFNBQVk7QUFDcEMsTUFBSSxJQUFJLEtBQUs7QUFDWCxhQUFTLEtBQUssa0JBQWtCO0FBQ2hDLGFBQVMsS0FBSyxlQUFlO0FBQzdCLFlBQVEsS0FBSyxJQUFJLEVBQUUsa0JBQWtCLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDOUM7QUFDQSxRQUFNLE1BQU0sSUFBSSxNQUNaO0FBQUEsSUFDRSxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLEVBQ0YsSUFDQTtBQUFBLElBQ0UsUUFBUTtBQUFBLElBQ1IsVUFBVSxDQUFDLGNBQWM7QUFBQSxFQUMzQjtBQUNKLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsTUFDVixlQUFlO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLGFBQWE7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLE1BQU07QUFBQSxVQUNKLFFBQVEsQ0FBQyxpQkFBaUI7QUFBQSxRQUM1QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
