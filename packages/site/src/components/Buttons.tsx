import type { ComponentProps, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ReactComponent as FlaskFox } from '../assets/flask_fox.svg';
import { useMetaMask, useMetaMaskContext, useRequest, useRequestSnap } from '../hooks';
import { shouldDisplayReconnectButton } from '../utils';

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
    Connect
  </PrimaryButton>
);

export const ReconnectButton = (props: ComponentProps<'button'>) => (
  <PrimaryButton {...props}>
    <FlaskFox />
    Reconnect
  </PrimaryButton>
);

export const HeaderButtons = () => {
  const requestSnap = useRequestSnap();
  const request = useRequest();
  const { provider } = useMetaMaskContext();
  const { isFlask, installedSnap } = useMetaMask();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const loadAccounts = useCallback(async () => {
    if (!provider || !installedSnap) {
      setAccountAddress(null);
      return;
    }

    const accounts = (await request({ method: 'eth_accounts' })) as
      | string[]
      | null;
    setAccountAddress(accounts?.[0] ?? null);
  }, [installedSnap, provider, request]);

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
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
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

  const reconnectNeeded = installedSnap
    ? shouldDisplayReconnectButton(installedSnap)
    : false;
  const connected = Boolean(installedSnap && truncatedAddress && !reconnectNeeded);

  const handleConnect = async () => {
    setMenuOpen(false);

    if (!isFlask) {
      window.open('https://metamask.io/flask/', '_blank', 'noopener,noreferrer');
      return;
    }

    await requestSnap();
    await loadAccounts();
  };

  const handleDisconnect = async () => {
    setMenuOpen(false);

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
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 items-center gap-3 rounded-full border border-border/70 bg-card/80 px-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-accent/30"
        >
          <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background/80 shadow-sm">
            <FlaskFox />
          </span>
          <span className="font-mono">{truncatedAddress}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 items-center gap-3 rounded-full border border-border/70 bg-card/80 px-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-accent/30"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Connect Wallet
        </button>
      )}

      {menuOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl">
          {connected ? (
            <button
              type="button"
              onClick={() => {
                handleDisconnect().catch(() => undefined);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
            >
              Disconnect
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                handleConnect().catch(() => undefined);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-accent/40"
            >
              <FlaskFox />
              MetaMask
            </button>
          )}
        </div>
      )}
    </div>
  );
};
