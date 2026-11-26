import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { GoogleSignIn } from "@/components/google-sign-in";

const { config, useAuth } = vi.hoisted(() => ({
  config: { configured: false },
  useAuth: vi.fn(),
}));

vi.mock("@/lib/config", () => ({
  get isAuthConfigured() {
    return config.configured;
  },
}));
vi.mock("@/components/auth-session-provider", () => ({
  AuthSessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("react-oidc-context", () => ({ useAuth }));

describe("Google sign-in", () => {
  beforeEach(() => {
    config.configured = true;
    useAuth.mockReset();
  });

  function renderSignIn() {
    return renderToStaticMarkup(createElement(GoogleSignIn));
  }

  it("keeps the control unavailable and explains why when auth is not configured", () => {
    config.configured = false;
    const html = renderSignIn();
    expect(html).toContain("Sign in with Google");
    expect(html).toContain('disabled=""');
    expect(html).toContain('aria-describedby="google-sign-in-status"');
    expect(html).toContain("Google sign-in isn’t set up yet.");
    expect(useAuth).not.toHaveBeenCalled();
  });

  it("explains where to choose Google when auth is configured", () => {
    useAuth.mockReturnValue({ isLoading: false, isAuthenticated: false });
    const html = renderSignIn();
    expect(html).toContain("Choose Google on the next screen.");
    expect(html).not.toContain('disabled=""');
  });

  it("keeps the redirecting control focusable while announcing progress", () => {
    useAuth.mockReturnValue({ activeNavigator: "signinRedirect", isAuthenticated: false });
    const html = renderSignIn();
    expect(html).toContain('aria-disabled="true"');
    expect(html).not.toContain('disabled=""');
    expect(html).toContain("Opening SpacetimeAuth…");
  });

  it("leaves the button available to retry after a redirect error", () => {
    useAuth.mockReturnValue({ error: new Error("Network failure"), isAuthenticated: false });
    const html = renderSignIn();
    expect(html).toContain("Couldn’t open sign-in. Try again.");
    expect(html).not.toContain('disabled=""');
  });

  it("does not ask an authenticated user to sign in again", () => {
    useAuth.mockReturnValue({ isAuthenticated: true, isLoading: false });
    const html = renderSignIn();
    expect(html).toContain("You’re already signed in.");
    expect(html).not.toContain("Sign in with Google");
  });
});
