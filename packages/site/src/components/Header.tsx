import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { HeaderButtons } from './Buttons';
import { Toggle } from './Toggle';
import { getThemePreference } from '../utils';

type Props = {
  handleToggleClick: () => void;
};

export const Header = ({ handleToggleClick }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const readHash = () => {
    if (typeof window === 'undefined') {
      return '';
    }
    return window.location.hash.replace(/^#/u, '');
  };

  useEffect(() => {
    const onHashChange = () => setActiveHash(readHash());
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navClassDesktop = (id: string) =>
    [
      'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
      activeHash === id
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
    ].join(' ');

  const navClassMobile = (id: string) =>
    [
      'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
      activeHash === id
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
    ].join(' ');

  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-border/60 bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/99">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-[72px] lg:px-8">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2.5">
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
            <a href="/#features" className={navClassDesktop('features')}>
              Features
            </a>
            <a href="/#ecosystem" className={navClassDesktop('ecosystem')}>
              Ecosystem
            </a>
            <a href="/#faq" className={navClassDesktop('faq')}>
              FAQ
            </a>
            <a
              href="https://absnameservice.xyz/docs"
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Docs
            </a>
            <a
              href="https://absnameservice.xyz/"
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              ANS
            </a>
            <a
              href="https://abs.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Abstract
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Toggle
            onToggle={handleToggleClick}
            defaultChecked={getThemePreference()}
          />
          <HeaderButtons />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/80 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-primary/40 hover:text-foreground md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full z-40 h-[calc(100dvh-64px)] overflow-auto border-t border-border bg-card px-4 pb-8 pt-6 md:hidden">
          <nav className="flex flex-col gap-1">
            <a
              href="/#features"
              className={navClassMobile('features')}
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              href="/#ecosystem"
              className={navClassMobile('ecosystem')}
              onClick={() => setMobileOpen(false)}
            >
              Ecosystem
            </a>
            <a
              href="/#faq"
              className={navClassMobile('faq')}
              onClick={() => setMobileOpen(false)}
            >
              FAQ
            </a>
            <a
              href="https://absnameservice.xyz/docs"
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Docs
            </a>
            <a
              href="https://absnameservice.xyz/"
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileOpen(false)}
            >
              ANS
            </a>
            <a
              href="https://abs.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Abstract
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
