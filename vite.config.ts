import { defineConfig, lazyPlugins } from "vite-plus";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";

const generated = [".cloudflare/**", "dist/**", ".vinext/**"];

export default defineConfig({
  fmt: { ignorePatterns: generated, printWidth: 100 },
  lint: {
    ignorePatterns: generated,
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    include: ["lib/**/*.test.ts"],
  },
  plugins: lazyPlugins(() => [
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ]),
});
