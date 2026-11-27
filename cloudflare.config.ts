import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "rozana-expence",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-24",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      // R2 bucket for user uploads. Local dev uses a simulated bucket;
      // `pnpm run deploy` provisions the bucket if it does not exist.
      UPLOADS: bindings.r2({ name: "rozana-expence-uploads" }),
      // Mirror public build values in Worker configuration when supplied.
      NEXT_PUBLIC_SPACETIMEAUTH_CLIENT_ID: process.env.NEXT_PUBLIC_SPACETIMEAUTH_CLIENT_ID
        ? bindings.text(process.env.NEXT_PUBLIC_SPACETIMEAUTH_CLIENT_ID)
        : undefined,
      NEXT_PUBLIC_SPACETIMEDB_DB_NAME: process.env.NEXT_PUBLIC_SPACETIMEDB_DB_NAME
        ? bindings.text(process.env.NEXT_PUBLIC_SPACETIMEDB_DB_NAME)
        : undefined,
      NEXT_PUBLIC_SPACETIMEDB_URI: process.env.NEXT_PUBLIC_SPACETIMEDB_URI
        ? bindings.text(process.env.NEXT_PUBLIC_SPACETIMEDB_URI)
        : undefined,
    },
  }),
});
