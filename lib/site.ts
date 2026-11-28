export const site = {
  name: "Rozana Expence",
  title: "Rozana Expence",
  description:
    "Open-source vinext starter on Cloudflare Workers with a sample guestbook that runs in your browser.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:5173",
  repository: "https://github.com/itsyasirkhandev/daily-expence-tracker",
  keywords: [
    "vinext",
    "Cloudflare Workers",
    "shadcn/ui",
    "Tailwind CSS",
    "Vite+",
    "Next.js on Cloudflare",
  ],
} as const;
