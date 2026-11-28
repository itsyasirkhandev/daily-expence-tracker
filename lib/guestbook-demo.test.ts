import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import Home from "@/app/page";

const render = () => renderToStaticMarkup(createElement(Home));

describe("guestbook demo for visitors", () => {
  it("renders the tab-only guestbook on the landing page without signing in", () => {
    const html = render();
    expect(html).toContain("Guestbook demo");
    expect(html).toContain("Messages stay in this tab and disappear when you reload.");
    expect(html).toMatch(/<label[^>]+for="guestbook-text"[^>]*>Message<\/label>/);
    const field = html.match(/<input\b[^>]*\bid="guestbook-text"[^>]*>/)?.[0];
    expect(field).toBeDefined();
    expect(field).not.toMatch(/\sname=/);
    expect(html).toContain("No messages yet");
    expect(html).not.toContain('href="/login"');
    expect(html).not.toContain('type="file"');
  });
});
