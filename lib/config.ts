import { Schema } from "effect";

/**
 * Public, build-time configuration. vinext inlines `process.env.NEXT_PUBLIC_*`
 * into both the browser and Worker bundles, so every key must be read with a
 * literal `process.env.NEXT_PUBLIC_...` expression. Never put secrets here.
 */
const PublicConfig = Schema.Struct({
  siteUrl: Schema.String,
  spacetimedbUri: Schema.String,
  spacetimedbDatabase: Schema.NonEmptyString,
  spacetimeAuthAuthority: Schema.String,
  spacetimeAuthClientId: Schema.String,
});

export type PublicConfig = typeof PublicConfig.Type;

export const publicConfig: PublicConfig = Schema.decodeUnknownSync(PublicConfig)({
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:5173",
  spacetimedbUri: process.env.NEXT_PUBLIC_SPACETIMEDB_URI ?? "ws://127.0.0.1:3000",
  spacetimedbDatabase: process.env.NEXT_PUBLIC_SPACETIMEDB_DB_NAME ?? "daily-expense-tracker",
  spacetimeAuthAuthority:
    process.env.NEXT_PUBLIC_SPACETIMEAUTH_AUTHORITY ?? "https://auth.spacetimedb.com/oidc",
  spacetimeAuthClientId: process.env.NEXT_PUBLIC_SPACETIMEAUTH_CLIENT_ID ?? "",
});

export const isAuthConfigured = publicConfig.spacetimeAuthClientId.length > 0;
