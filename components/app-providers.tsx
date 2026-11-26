"use client";

import { useMemo, type ReactNode } from "react";
import { useAuth } from "react-oidc-context";
import { SpacetimeDBProvider } from "spacetimedb/react";
import { AuthSessionProvider } from "@/components/auth-session-provider";
import { publicConfig } from "@/lib/config";
import { DbConnection, type ErrorContext } from "@/lib/module_bindings";

/** Opens the SpacetimeDB connection only after SpacetimeAuth returns an ID token. */
function SpacetimeConnection({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const idToken = auth.user?.id_token;

  const connectionBuilder = useMemo(
    () =>
      idToken
        ? DbConnection.builder()
            .withUri(publicConfig.spacetimedbUri)
            .withDatabaseName(publicConfig.spacetimedbDatabase)
            .withToken(idToken)
            .onConnectError((_ctx: ErrorContext, error: Error) => {
              console.error("SpacetimeDB connection failed", error);
            })
        : null,
    [idToken],
  );

  if (!connectionBuilder) return <>{children}</>;
  return (
    <SpacetimeDBProvider key={idToken} connectionBuilder={connectionBuilder}>
      {children}
    </SpacetimeDBProvider>
  );
}

export function AppProviders({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  return (
    <AuthSessionProvider fallback={fallback}>
      <SpacetimeConnection>{children}</SpacetimeConnection>
    </AuthSessionProvider>
  );
}
