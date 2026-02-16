import type { ComponentProps, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { LogOut } from 'lucide-react';

import { ReactComponent as FlaskFox } from '../assets/flask_fox.svg';
import { useMetaMask, useMetaMaskContext, useRequest } from '../hooks';

const PrimaryButton = ({
  children,
  ...props
}: ComponentProps<'button'> & { children: ReactNode }) => (
  <button
    {...props}
    className={[
      'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold',
      'bg-primary text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
      'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm',
      props.className ?? '',
    ].join(' ')}
  >
    {children}
  </button>
);

const SecondaryLink = ({
  children,
  ...props
}: ComponentProps<'a'> & { children: ReactNode }) => (
  <a
    {...props}
    className={[
      'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold',
      'border border-border/70 bg-card/80 text-foreground shadow-sm backdrop-blur',
      'transition-all hover:-translate-y-0.5 hover:shadow-md',
      props.className ?? '',
    ].join(' ')}
  >
    {children}
  </a>
);

export const InstallFlaskButton = () => (
  <SecondaryLink
    href="https://metamask.io/flask/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FlaskFox />
    Install MetaMask Flask
  </SecondaryLink>
);

export const ConnectButton = (props: ComponentProps<'button'>) => (
  <PrimaryButton {...props}>
    <FlaskFox />
    Install Snap
  </PrimaryButton>
);

export const ReconnectButton = (props: ComponentProps<'button'>) => (
  <PrimaryButton {...props}>
    <FlaskFox />
    Reconnect
  </PrimaryButton>
);

export const HeaderButtons = () => {
  const request = useRequest();
  const { provider } = useMetaMaskContext();
  const { isFlask } = useMetaMask();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const loadAccounts = useCallback(async () => {
    if (!provider) {
      setAccountAddress(null);
      return;
    }

    const accounts = (await request({ method: 'eth_accounts' })) as
      | string[]
      | null;
    setAccountAddress(accounts?.[0] ?? null);
  }, [provider, request]);

  useEffect(() => {
    loadAccounts().catch(() => undefined);
  }, [loadAccounts]);

  useEffect(() => {
    if (!provider || typeof provider.on !== 'function') {
      return;
    }

    const onAccountsChanged = (accounts: string[]) => {
      setAccountAddress(accounts[0] ?? null);
    };

    provider.on('accountsChanged', onAccountsChanged);
    return () => {
      provider.removeListener?.('accountsChanged', onAccountsChanged);
    };
  }, [provider]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setWalletMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', onPointerDown);
    return () => window.removeEventListener('mousedown', onPointerDown);
  }, []);

  const truncatedAddress = useMemo(() => {
    if (!accountAddress) {
      return null;
    }
    return `${accountAddress.slice(0, 6)}...${accountAddress.slice(-4)}`;
  }, [accountAddress]);

  const avatarSrc = useMemo(() => {
    if (!accountAddress) {
      return null;
    }

    const seed = accountAddress.toLowerCase().replace(/^0x/, '');
    let randSeed = 0;
    for (let i = 0; i < seed.length; i += 1) {
      randSeed = (randSeed * 31 + seed.charCodeAt(i)) >>> 0;
    }

    const rand = () => {
      randSeed ^= randSeed << 13;
      randSeed ^= randSeed >>> 17;
      randSeed ^= randSeed << 5;
      return (randSeed >>> 0) / 4294967296;
    };

    const size = 5;
    const scale = 6;
    const hue = Math.floor(rand() * 360);
    const color = `hsl(${hue}, 65%, 55%)`;
    const spot = `hsl(${(hue + 40) % 360}, 65%, 45%)`;
    const bg = `hsl(${(hue + 180) % 360}, 30%, 96%)`;
    const cellSize = scale;
    const dimension = size * cellSize;

    const rects: string[] = [
      `<rect width="${dimension}" height="${dimension}" fill="${bg}" />`,
    ];
    const columns = Math.ceil(size / 2);

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const value = Math.floor(rand() * 3);
        if (value === 0) {
          continue;
        }

        const fill = value === 1 ? color : spot;
        const px = x * cellSize;
        const py = y * cellSize;
        rects.push(
          `<rect x="${px}" y="${py}" width="${cellSize}" height="${cellSize}" fill="${fill}" />`,
        );

        const mirrorX = (size - 1 - x) * cellSize;
        if (mirrorX !== px) {
          rects.push(
            `<rect x="${mirrorX}" y="${py}" width="${cellSize}" height="${cellSize}" fill="${fill}" />`,
          );
        }
      }
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${dimension}" height="${dimension}" viewBox="0 0 ${dimension} ${dimension}" shape-rendering="crispEdges">${rects.join('')}</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [accountAddress]);

  const connected = Boolean(truncatedAddress);

  const handleConnect = async () => {
    setConnectModalOpen(false);

    if (!isFlask) {
      window.open('https://metamask.io/flask/', '_blank', 'noopener,noreferrer');
      return;
    }

    await request({ method: 'eth_requestAccounts' });
    await loadAccounts();
  };

  const handleDisconnect = async () => {
    setWalletMenuOpen(false);

    await request({
      method: 'wallet_revokePermissions',
      params: [{ eth_accounts: {} }],
    });

    setAccountAddress(null);
  };

  return (
    <div className="relative" ref={rootRef}>
      {connected ? (
        <button
          type="button"
          onClick={() => setWalletMenuOpen((open) => !open)}
          className={[
            'inline-flex h-10 items-center gap-3 rounded-full border bg-card/80 px-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-accent/30',
            walletMenuOpen
              ? 'border-primary ring-2 ring-primary/80'
              : 'border-border/70',
          ].join(' ')}
        >
          {avatarSrc ? (
            <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background/80 shadow-sm">
              <img
                src={avatarSrc}
                alt="Wallet avatar"
                className="h-full w-full object-cover"
              />
            </span>
          ) : null}
          <span className="font-mono">{truncatedAddress}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setConnectModalOpen(true)}
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_-18px_rgba(16,185,129,0.8)] transition-all hover:brightness-105 focus:outline-none"
        >
          Connect Wallet
        </button>
      )}

      {walletMenuOpen && connected ? (
        <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl">
          <button
            type="button"
            onClick={() => {
              handleDisconnect().catch(() => undefined);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 text-destructive" />
            Disconnect
          </button>
        </div>
      ) : null}

      {connectModalOpen && mounted
        ? createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <button
                type="button"
                aria-label="Close connect modal"
                className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
                onClick={() => setConnectModalOpen(false)}
              />

              <div className="relative z-10 w-full max-w-md rounded-3xl border border-border/70 bg-card/95 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-foreground">
                      Connect Wallet
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Pick a wallet to claim your .abs handle.
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close"
                    className="text-2xl leading-none text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setConnectModalOpen(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      handleConnect().catch(() => undefined);
                    }}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-sm">
                      <FlaskFox className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        MetaMask Flask
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Browser extension wallet
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary">
                      Tap to connect
                    </span>
                  </button>
                </div>

                <div className="mt-5 rounded-2xl border border-border/70 bg-background/80 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Why connect?
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    You need a wallet to register, manage records, and prove
                    ownership on-chain.
                  </p>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};
