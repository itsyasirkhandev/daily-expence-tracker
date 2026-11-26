import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { GoogleSignIn } from "@/components/google-sign-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function Login() {
  return (
    <main className="grid min-h-svh place-items-center bg-orange-50/40 bg-radial-[ellipse_at_top] from-orange-100 to-transparent to-70% px-4 py-10 sm:px-6 sm:py-16">
      <Card className="w-full max-w-md gap-0 border py-0 ring-0 shadow-md shadow-orange-950/5">
        <CardHeader className="gap-0 px-6 pt-8 sm:px-8 sm:pt-10">
          <div className="flex items-center gap-3">
            <Image
              className="shrink-0"
              src="/icon.svg"
              width={40}
              height={40}
              alt=""
              loading="eager"
              unoptimized
            />
            <div>
              <p className="text-base leading-tight font-semibold">{site.name}</p>
              <p className="mt-1 text-sm leading-snug text-neutral-700">Daily expense tracker</p>
            </div>
          </div>
          <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Sign in</h1>
          <CardDescription className="mt-2 text-base text-neutral-700">
            Use your Google account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pt-6 pb-8 sm:px-8">
          <GoogleSignIn />
        </CardContent>
        <CardFooter className="bg-orange-50/50 px-6 py-3 sm:px-8">
          <Button
            asChild
            variant="ghost"
            className="-ml-2 h-auto min-h-11 max-w-full shrink gap-2 px-2 py-2 text-left whitespace-normal text-neutral-800 hover:bg-orange-100 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-orange-800 motion-reduce:transition-none motion-reduce:active:translate-y-0"
          >
            <a href="/">
              <ArrowLeft aria-hidden="true" />
              <span className="min-w-0">Back to home</span>
            </a>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
