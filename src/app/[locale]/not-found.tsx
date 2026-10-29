import { getLocale, getTranslations } from "next-intl/server";

import { getCopyKey } from "@/i18n/keys";
import Link from "@/i18n/navigation";
import { Footer } from "@/module/layout/components/footer";
import { Navbar } from "@/module/layout/components/navbar";
import { SectionContainer } from "@/shared/components/section-container";

export default async function NotFound() {
  const locale = await getLocale();
  const translate = await getTranslations({ locale, namespace: "copy" });
  const copy = (source: string) => translate(getCopyKey(source));

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <SectionContainer
          aria-labelledby="not-found-title"
          className="flex flex-1 items-center"
          contentClassName="flex flex-col items-center py-20 text-center"
        >
          <p className="text-accent text-2xl font-semibold">404</p>
          <h1
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            id="not-found-title"
          >
            {copy("Page not found")}
          </h1>
          <p className="text-foreground/70 mt-4 max-w-xl text-sm leading-7 sm:text-base">
            {copy(
              "The page you’re looking for doesn’t exist or may have moved.",
            )}
          </p>
          <Link className="mt-8 underline-offset-8 hover:underline" href="/">
            {copy("Back to home.")}
          </Link>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  );
}
