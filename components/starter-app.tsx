"use client";

import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "react-oidc-context";
import { AppProviders } from "@/components/app-providers";
import { Guestbook } from "@/components/guestbook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isAuthConfigured } from "@/lib/config";

const loginLinkClass =
  "h-auto min-h-11 whitespace-normal focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-orange-800 motion-reduce:transition-none motion-reduce:active:translate-y-0";

function StatusCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{children}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function SignInCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isAuthConfigured
            ? "Sign in to join the realtime guestbook"
            : "Finish setup to enable sign-in"}
        </CardTitle>
        <CardDescription>
          {isAuthConfigured ? (
            "Use your Google account to continue."
          ) : (
            <>
              Set <code>NEXT_PUBLIC_SPACETIMEAUTH_CLIENT_ID</code> in <code>.env.local</code> and
              add the same client ID to <code>spacetimedb/src/auth-config.ts</code>. See the README
              for the SpacetimeAuth and Google provider steps.
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className={loginLinkClass}>
          <a href="/login">
            <LogIn aria-hidden="true" />
            Go to sign-in
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

function SignedInSession({
  user,
  onSignOut,
}: {
  user: NonNullable<ReturnType<typeof useAuth>["user"]>;
  onSignOut: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Signed in as{" "}
          <span className="font-medium text-foreground">
            {user.profile.name ?? user.profile.email}
          </span>
        </p>
        <Button variant="outline" size="sm" onClick={onSignOut}>
          <LogOut aria-hidden="true" />
          Sign out
        </Button>
      </div>
      <Guestbook idToken={user.id_token ?? ""} />
    </div>
  );
}

function hasSession(auth: ReturnType<typeof useAuth>): auth is ReturnType<typeof useAuth> & {
  user: NonNullable<ReturnType<typeof useAuth>["user"]>;
} {
  return auth.isAuthenticated && !!auth.user;
}

function SessionGate() {
  const auth = useAuth();

  if (auth.isLoading)
    return <StatusCard title="Loading session…">Checking SpacetimeAuth.</StatusCard>;
  if (auth.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign-in failed</CardTitle>
          <CardDescription>{auth.error.message}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className={loginLinkClass}>
            <a href="/login">Try again</a>
          </Button>
        </CardContent>
      </Card>
    );
  }
  if (!hasSession(auth)) {
    return <SignInCard />;
  }

  return <SignedInSession user={auth.user} onSignOut={() => void auth.signoutRedirect()} />;
}

export function StarterApp() {
  if (!isAuthConfigured) return <SignInCard />;
  return (
    <AppProviders fallback={<StatusCard title="Loading…">Starting the app.</StatusCard>}>
      <SessionGate />
    </AppProviders>
  );
}
