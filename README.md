# Rozana Expence

A vinext starter on Cloudflare Workers with a browser-only guestbook demo. The landing page includes canonical, Open Graph, Twitter and JSON-LD metadata, plus robots and sitemap routes.

## Run locally

Use Node.js 22.18+ on the 22.x line, 24.11+ on the 24.x line, or 26+, and pnpm 10.34.9. Node 24 is recommended.

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open http://localhost:5173. `NEXT_PUBLIC_SITE_URL` is a public build-time value used for canonical and social URLs and the sitemap. Set it to the intended origin before building; never put secrets in `NEXT_PUBLIC_*` variables. `GET /api/health` checks only that the Worker responds.

## Demo and data safety

- Try the guestbook with sample text. Messages are kept in memory in the current tab, are not sent or synced, and disappear on reload. There are no accounts or attachments.
- There is no connection to the previous SpacetimeDB database or R2 bucket. This change does not migrate, delete, or change access to any existing data or deployment. Older deployments and previously shared attachment links are unaffected by this code change.
- Do not connect the demo to a database with personal data or restore upload routes without server-side authorization. Firebase Auth is planned but not implemented. Before restoring shared data or attachments, verify per-user access for reads and writes and plan how to handle legacy records and links.
- Before any future release, review the existing Cloudflare build/runtime configuration separately. Old database and sign-in variables and the upload binding are not used by this version.

## Checks

- `pnpm check` — formatting, linting, and typechecks
- `pnpm test` — app tests
- `pnpm run ci` — Worker type generation, checks, tests, and build; does not deploy
- `pnpm fallow` and `pnpm react:doctor` — code health checks; GitHub Actions gates new Fallow findings and reports React Doctor findings as advisory

## License

[Apache License 2.0](LICENSE).
