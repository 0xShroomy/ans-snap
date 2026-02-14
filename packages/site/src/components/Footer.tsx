export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-card via-card to-accent/30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8 lg:py-16">
        <div className="mb-10 rounded-3xl border border-border/70 bg-gradient-to-r from-primary/10 via-card to-accent/40 p-6 shadow-sm md:flex md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              MetaMask Snap installer
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Install the ANS Snap to resolve{' '}
              <span className="font-mono">*.abs</span> names on Abstract.
            </p>
          </div>
          <a
            href="https://absnameservice.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:mt-0"
          >
            Visit ANS
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="ANS Logo"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="font-display text-lg font-semibold text-foreground">
                ANS
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              An independent naming service built on Abstract Chain. Your
              onchain identity starts here.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80">
              ANS is not affiliated with, endorsed by, or sponsored by Abstract
              Foundation or Abstract Chain.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://absnameservice.com/register"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Register Name
                </a>
              </li>
              <li>
                <div className="space-y-2">
                  <a
                    href="https://abscan.org/address/0x0ebc94534eda78332e49f3bfa3a2471e52fadfbf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Explorer (V1)
                  </a>
                  <a
                    href="https://abscan.org/address/0x86a282845a61302Ba4735d111b1a1417f6e617Ad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Explorer (V2)
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Community
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://x.com/absnameservice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/5jXUqCSR7Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://abs.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Abstract
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Developers
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://absnameservice.com/docs"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://docs.metamask.io/snaps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  MetaMask Snaps
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/0xShroomy/ans-snap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Source
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {'Abstract Name Service, Copyright, 2026. All Rights Reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://absnameservice.com/legal/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </a>
            <a
              href="https://absnameservice.com/legal/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
