import {
  Card,
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
} from '../components';
import { defaultSnapOrigin } from '../config';
import { useMetaMask, useMetaMaskContext, useRequestSnap } from '../hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

const SectionHeading = ({ id, title }: { id: string; title: string }) => (
  <div id={id} className="scroll-mt-24">
    <h2 className="font-display text-2xl font-semibold text-foreground">
      {title}
    </h2>
    <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
  </div>
);

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const handleConnect = () => {
    requestSnap().catch(() => undefined);
  };

  return (
    <main className="relative z-10">
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Abstract Name Service{' '}
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                V2
              </span>
            </div>

            <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-6xl">
              Use your <span className="text-primary">.abs</span> name inside{' '}
              MetaMask
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Install the ANS MetaMask Snap to resolve{' '}
              <span className="font-mono">*.abs</span> names on Abstract (chain
              ID <span className="font-mono">2741</span>).
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border/70 bg-card/80 px-3 py-1 text-xs font-bold text-muted-foreground shadow-sm backdrop-blur">
                Wallet-ready
              </span>
              <span className="rounded-full border border-border/70 bg-card/80 px-3 py-1 text-xs font-bold text-muted-foreground shadow-sm backdrop-blur">
                Social-first
              </span>
              <span className="rounded-full border border-border/70 bg-card/80 px-3 py-1 text-xs font-bold text-muted-foreground shadow-sm backdrop-blur">
                Zero-gas vibes
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3" id="features">
              <Card title="Name lookup">
                Resolves <span className="font-mono">name.abs</span> to an
                address via ANS V2 records (and owner fallback).
              </Card>
              <Card title="Reverse lookup">
                Resolves an address back to its primary{' '}
                <span className="font-mono">.abs</span> name when available.
              </Card>
              <Card title="Abstract chain">
                Strictly supports Abstract mainnet only (chain ID{' '}
                <span className="font-mono">2741</span>).
              </Card>
            </div>
          </div>

          <div className="animate-fade-in-up">
            <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Install / Connect
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Snap origin:{' '}
                    <span className="rounded-full bg-muted/70 px-2 py-0.5 font-mono text-xs text-foreground">
                      {defaultSnapOrigin}
                    </span>
                  </p>
                </div>
                <span className="rounded-full border border-border/70 bg-card/80 px-3 py-1 text-xs font-bold text-muted-foreground shadow-sm backdrop-blur">
                  Abstract only
                </span>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <span
                    className={[
                      'h-2 w-2 rounded-full',
                      isMetaMaskReady ? 'bg-primary' : 'bg-muted-foreground/40',
                    ].join(' ')}
                  />
                  MetaMask Snaps detected
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <span
                    className={[
                      'h-2 w-2 rounded-full',
                      installedSnap ? 'bg-primary' : 'bg-muted-foreground/40',
                    ].join(' ')}
                  />
                  Snap installed
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  npm hosted
                </span>
              </div>

              {error ? (
                <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                  <b>An error happened:</b> {error.message}
                </div>
              ) : null}

              <div className="grid gap-4">
                {isMetaMaskReady ? null : (
                  <Card
                    title="Snaps not detected"
                    footer={<InstallFlaskButton />}
                  >
                    Snaps support was not detected. If you are testing locally,
                    you may need MetaMask Flask and developer settings enabled.
                  </Card>
                )}

                {installedSnap ? null : (
                  <Card
                    title="Connect"
                    footer={
                      <ConnectButton
                        onClick={handleConnect}
                        disabled={!isMetaMaskReady}
                      />
                    }
                    disabled={!isMetaMaskReady}
                  >
                    Connect to MetaMask and install the ANS Snap.
                  </Card>
                )}

                {shouldDisplayReconnectButton(installedSnap) ? (
                  <Card
                    title="Reconnect"
                    footer={
                      <ReconnectButton
                        onClick={handleConnect}
                        disabled={!installedSnap}
                      />
                    }
                    disabled={!installedSnap}
                  >
                    While connected to a local running snap this button is shown
                    to update the installed version after changes.
                  </Card>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20">
          <SectionHeading id="ecosystem" title="Testing" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Steps">
              <ol className="list-decimal space-y-2 pl-4">
                <li>Switch MetaMask to the Abstract network.</li>
                <li>
                  Ensure your ANS V2 domain has a record set to your wallet
                  address (this is what resolves for sending).
                </li>
                <li>
                  In MetaMask, try sending to{' '}
                  <span className="font-mono">yourname.abs</span>.
                </li>
              </ol>
            </Card>
            <Card title="Notes">
              This Snap uses{' '}
              <span className="font-mono">endowment:name-lookup</span> and
              onchain <span className="font-mono">eth_call</span> (via MetaMask
              provider) to resolve ANS V2 data. No other chains are supported.
            </Card>
          </div>

          <SectionHeading id="faq" title="FAQ" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="Does it support other chains?">
              No. Abstract only.
            </Card>
            <Card title="What resolves for sending?">
              ANS V2 records (and falls back to domain owner if no record is
              set).
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
