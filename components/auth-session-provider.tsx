"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { User } from "oidc-client-ts";
import { AuthProvider } from "react-oidc-context";
import { publicConfig } from "@/lib/config";

export function onSigninCallback(user: User | void) {
  // Redirect callbacks return a user; silent iframe callbacks do not.
  if (user) window.location.replace("/");
}

export function AuthSessionProvider({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  // oidc-client-ts uses browser APIs and cannot initialize during SSR.
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);

  if (!origin) return <>{fallback}</>;
  return (
    <AuthProvider
      authority={publicConfig.spacetimeAuthAuthority}
      client_id={publicConfig.spacetimeAuthClientId}
      redirect_uri={`${origin}/callback`}
      post_logout_redirect_uri={origin}
      scope="openid profile email"
      response_type="code"
      automaticSilentRenew
      onSigninCallback={onSigninCallback}
    >
      {children}
    </AuthProvider>
  );
}
