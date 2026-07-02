import { Zap } from "lucide-react";

const companyName = "PT Energy Management Indonesia";
const addressLines = [
  "Menara Sentraya. Lt 17. Jl. Iskandarsyah Raya No.1A, RT.3/RW.1, Jakarta Selatan",
  "DKI Jakarta, 12160",
];
const copyright = "© 2026 PLN EMI. All rights reserved.";

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-footer-background px-6 py-16 text-footer-foreground sm:px-8 lg:px-10 lg:py-12"
    >
      <div className="mx-auto grid max-w-7xl gap-8 text-center text-sm leading-7 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-center lg:gap-10 lg:text-left">
        <div className="flex items-center flex-row justify-center lg:justify-start gap-4">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-footer-logo-background text-footer-logo-foreground"
          >
            <Zap className="size-4" strokeWidth={1.5} />
          </span>

          <p className="text-sm font-semibold tracking-tight text-footer-foreground-strong opacity-75">
            {companyName}
          </p>
        </div>

        <address className="not-italic text-center text-xs opacity-75">
          {addressLines.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </address>

        <p className="lg:text-right text-xs opacity-75">{copyright}</p>
      </div>
    </footer>
  );
}
