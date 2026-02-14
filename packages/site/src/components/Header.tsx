import { useMemo, useState } from 'react';

import { HeaderButtons } from './Buttons';
import { Toggle } from './Toggle';

type Props = {
  handleToggleClick: () => void;
};

const navItems: { label: string; href: string; external?: boolean }[] = [
  { label: 'Features', href: '#features' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Docs', href: 'https://absnameservice.com/docs', external: true },
  { label: 'Abstract', href: 'https://abs.xyz', external: true },
];

export const Header = ({ handleToggleClick }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useMemo(() => navItems, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-[72px] lg:px-8">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2.5">
            {/* Gatsby static folder: /static/logo.png becomes /logo.png */}
            <img
              src="/logo.png"
              alt="ANS Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-display text-lg font-semibold text-foreground">
              ANS
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {items.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Toggle onToggle={handleToggleClick} defaultChecked={false} />
          <HeaderButtons />

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm"
            aria-label="Open menu"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="text-lg font-bold">{mobileOpen ? '×' : '≡'}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-card/80 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="flex flex-col gap-1">
              {items.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
