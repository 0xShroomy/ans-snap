import type { ComponentProps, ReactNode } from 'react';

import { ReactComponent as FlaskFox } from '../assets/flask_fox.svg';
import { useMetaMask, useRequestSnap } from '../hooks';
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
  const { isFlask, installedSnap } = useMetaMask();

  if (!isFlask && !installedSnap) {
    return <InstallFlaskButton />;
  }

  if (!installedSnap) {
    return (
      <ConnectButton
        onClick={() => {
          requestSnap().catch(() => undefined);
        }}
      />
    );
  }

  if (shouldDisplayReconnectButton(installedSnap)) {
    return (
      <ReconnectButton
        onClick={() => {
          requestSnap().catch(() => undefined);
        }}
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm font-bold text-foreground shadow-sm backdrop-blur">
      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
      Connected
    </div>
  );
};
