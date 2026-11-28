import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import NotFound from "../app/not-found";
import { NotFoundSpotlight } from "../components/ui/not-found-spotlight";

describe("not found", () => {
  it("renders a meaningful heading and a home link", () => {
    const html = renderToStaticMarkup(createElement(NotFound));
    expect(html).toContain("<main");
    expect(html).toMatch(/<h1[^>]*>Page not found<\/h1>/);
    expect(html).toMatch(/href="\/"[^>]*>Back to home<\/a>/);
    expect(html).not.toContain("Browse");
  });

  it("renders an optional browse link when provided", () => {
    const html = renderToStaticMarkup(
      createElement(NotFoundSpotlight, { browseHref: "/explore", browseLabel: "Explore" }),
    );
    expect(html).toMatch(/href="\/explore"[^>]*>Explore<\/a>/);
  });
});
