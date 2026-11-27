"use client";

import Image from "next/image";
import { CircleAlert } from "lucide-react";
import { useAuth } from "react-oidc-context";
import { AuthSessionProvider } from "@/components/auth-session-provider";
import { Button } from "@/components/ui/button";
import { isAuthConfigured } from "@/lib/config";
import { cn } from "@/lib/utils";

function SignInControl({
  message,
  onSignIn,
  busy = false,
  failed = false,
}: {
  message: string;
  onSignIn?: () => void;
  busy?: boolean;
  failed?: boolean;
}) {
  return (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={!onSignIn}
        aria-disabled={busy || undefined}
        aria-busy={busy || undefined}
        aria-describedby="google-sign-in-status"
        onClick={busy ? undefined : onSignIn}
        className="h-auto min-h-11 w-full gap-3 rounded-md border-[#747775] bg-white px-3 py-2 whitespace-normal text-[#1f1f1f] hover:bg-neutral-50 hover:text-[#1f1f1f] focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-orange-800 disabled:border-neutral-300 disabled:text-neutral-600 disabled:opacity-100 aria-disabled:cursor-wait motion-reduce:transition-none motion-reduce:active:translate-y-0"
      >
        <Image
          className="shrink-0"
          src="/google-g.svg"
          width={20}
          height={20}
          alt=""
          loading="eager"
          unoptimized
        />
        Sign in with Google
      </Button>
      <p
        id="google-sign-in-status"
        role="status"
        className={cn("mt-3 flex items-start gap-2 text-sm leading-relaxed", {
          "text-neutral-700": !failed,
          "text-red-800": failed,
        })}
      >
        {failed && <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
        {message}
      </p>
    </>
  );
}

function SessionSignIn() {
  const auth = useAuth();
  const redirecting = auth.activeNavigator === "signinRedirect";
  const busy = auth.isLoading || redirecting;

  if (auth.isAuthenticated && !busy) {
    return <p role="status">You’re already signed in.</p>;
  }

  const failed = !busy && Boolean(auth.error);
  const message = redirecting
    ? "Opening SpacetimeAuth…"
    : auth.isLoading
      ? "Checking your session…"
      : failed
        ? "Couldn’t open sign-in. Try again."
        : "Choose Google on the next screen.";

  return (
    <SignInControl
      message={message}
      busy={busy}
      failed={failed}
      onSignIn={() => void auth.signinRedirect()}
    />
  );
}

export function GoogleSignIn() {
  if (!isAuthConfigured) {
    return (
      <SignInControl message="Google sign-in isn’t set up yet. Contact the site administrator." />
    );
  }

  return (
    <AuthSessionProvider
      fallback={
        <SignInControl message="If sign-in doesn’t load, check that JavaScript is enabled, then reload the page." />
      }
    >
      <SessionSignIn />
    </AuthSessionProvider>
  );
}
