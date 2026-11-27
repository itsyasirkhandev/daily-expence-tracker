import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it, vi } from "vite-plus/test";
import { GoogleSignIn } from "@/components/google-sign-in";

vi.mock("@/lib/config", () => ({ isAuthConfigured: true }));

it("explains how to recover when the sign-in button cannot become available", () => {
  const html = renderToStaticMarkup(createElement(GoogleSignIn));

  expect(html).toContain('disabled=""');
  expect(html).toContain("check that JavaScript is enabled, then reload the page.");
});
