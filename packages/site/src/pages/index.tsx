import styled from 'styled-components';

import {
  Card,
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
} from '../components';
import { defaultSnapOrigin } from '../config';
import { useMetaMask, useMetaMaskContext, useRequestSnap } from '../hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 6rem 2.4rem 7rem;
  position: relative;
  z-index: 1;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 2.2rem 1.6rem 3.2rem;
  }
`;

const Max = styled.div`
  width: 100%;
  max-width: 1120px;
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 2.4rem;
  align-items: start;
  ${({ theme }) => theme.mediaQueries.small} {
    grid-template-columns: 1fr;
  }
`;

const Kicker = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  border-radius: 999px;
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  background: ${(props) => props.theme.colors.background?.alternative};
  padding: 0.7rem 1.1rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.text?.muted};
  width: fit-content;
`;

const Heading = styled.h1`
  margin: 1.6rem 0 1.3rem;
  font-size: 5.2rem;
  line-height: 1.02;
  letter-spacing: -0.04em;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: 3.4rem;
  }
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const Subtitle = styled.p`
  font-size: 1.85rem;
  font-weight: 700;
  margin: 0;
  color: ${(props) => props.theme.colors.text?.muted};
  line-height: 1.45;
`;

const HeroRight = styled.aside`
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  background: ${(props) => props.theme.colors.card?.default};
  border-radius: ${(props) => props.theme.radii.default};
  box-shadow: ${(props) => props.theme.shadows.default};
  padding: 2rem;
  backdrop-filter: blur(14px);
`;

const PanelTitle = styled.h2`
  margin: 0 0 0.8rem;
  font-size: 1.9rem;
`;

const PanelText = styled.p`
  margin: 0 0 1.6rem;
  color: ${(props) => props.theme.colors.text?.muted};
  font-weight: 700;
  line-height: 1.45;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  border-radius: 999px;
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  background: ${(props) => props.theme.colors.background?.alternative};
  padding: 0.6rem 0.9rem;
  font-weight: 900;
  font-size: 1.15rem;
  color: ${(props) => props.theme.colors.text?.alternative};
`;

const Dot = styled.span<{ active: boolean }>`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: ${(props) =>
    props.active
      ? props.theme.colors.primary?.default
      : 'rgba(148, 163, 184, 0.7)'};
`;

const PanelButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Grid = styled.section`
  margin-top: 3.2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    grid-template-columns: 1fr;
  }
`;

const MiniCard = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  background: ${(props) => props.theme.colors.card?.default};
  border-radius: ${(props) => props.theme.radii.default};
  box-shadow: ${(props) => props.theme.shadows.default};
  padding: 1.8rem;
  backdrop-filter: blur(14px);
`;

const MiniTitle = styled.h3`
  margin: 0 0 0.7rem;
  font-size: 1.65rem;
`;

const MiniText = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.text?.muted};
  font-weight: 700;
  line-height: 1.45;
`;

const InstallSection = styled.section`
  margin-top: 2.4rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    grid-template-columns: 1fr;
  }
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.card?.default};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 1120px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.default};
  backdrop-filter: blur(14px);

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const NoticeTitle = styled.p`
  font-weight: 900;
  margin-bottom: 1rem !important;
`;

const Steps = styled.ol`
  margin: 0;
  padding-left: 1.8rem;
  display: grid;
  gap: 0.6rem;
  color: ${(props) => props.theme.colors.text?.muted};
  font-weight: 700;
  line-height: 1.55;
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 1120px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  return (
    <Page>
      <Max>
        <Hero>
          <div>
            <Kicker>Abstract only</Kicker>
            <Heading>
              Use your <Span>.abs</Span> name inside MetaMask
            </Heading>
            <Subtitle>
              This Snap resolves ANS V2 domains on Abstract so users can send to{' '}
              <code>yourname.abs</code> instead of a long address.
            </Subtitle>
            <Grid>
              <MiniCard>
                <MiniTitle>Name lookup</MiniTitle>
                <MiniText>
                  Resolves <code>name.abs</code> to an address via ANS V2
                  records (and owner fallback).
                </MiniText>
              </MiniCard>
              <MiniCard>
                <MiniTitle>Reverse lookup</MiniTitle>
                <MiniText>
                  Resolves an address back to its primary <code>.abs</code> name
                  when available.
                </MiniText>
              </MiniCard>
              <MiniCard>
                <MiniTitle>Abstract chain</MiniTitle>
                <MiniText>
                  Strictly supports Abstract mainnet only (chain ID{' '}
                  <code>2741</code>).
                </MiniText>
              </MiniCard>
            </Grid>
          </div>

          <HeroRight>
            <PanelTitle>Install / Connect</PanelTitle>
            <PanelText>
              Snap origin: <code>{defaultSnapOrigin}</code>
            </PanelText>

            <BadgeRow>
              <Badge>
                <Dot active={isMetaMaskReady} />
                MetaMask Snaps detected
              </Badge>
              <Badge>
                <Dot active={Boolean(installedSnap)} />
                Snap installed
              </Badge>
              <Badge>
                <Dot active={!isLocalSnap(defaultSnapOrigin)} />
                npm hosted
              </Badge>
            </BadgeRow>

            <PanelButtons>
              {!isMetaMaskReady && (
                <Card
                  content={{
                    title: 'Snaps not detected',
                    description:
                      'If you are testing locally you may need MetaMask Flask and developer settings enabled.',
                    button: <InstallFlaskButton />,
                  }}
                  fullWidth
                />
              )}

              {!installedSnap && (
                <Card
                  content={{
                    title: 'Connect',
                    description:
                      'Connect to MetaMask and install the ANS Snap.',
                    button: (
                      <ConnectButton
                        onClick={requestSnap}
                        disabled={!isMetaMaskReady}
                      />
                    ),
                  }}
                  disabled={!isMetaMaskReady}
                  fullWidth
                />
              )}

              {shouldDisplayReconnectButton(installedSnap) && (
                <Card
                  content={{
                    title: 'Reconnect',
                    description:
                      'If you are connected to a local snap, this updates the installed version after changes.',
                    button: (
                      <ReconnectButton
                        onClick={requestSnap}
                        disabled={!installedSnap}
                      />
                    ),
                  }}
                  disabled={!installedSnap}
                  fullWidth
                />
              )}
            </PanelButtons>
          </HeroRight>
        </Hero>

        {error && (
          <ErrorMessage>
            <b>An error happened:</b> {error.message}
          </ErrorMessage>
        )}

        <InstallSection>
          <CardGrid>
            <Card
              content={{
                title: 'How it works',
                description: (
                  <div>
                    This Snap uses <code>endowment:name-lookup</code> and
                    onchain <code>eth_call</code> (via MetaMask provider) to
                    resolve ANS V2 data. No other chains are supported.
                  </div>
                ),
              }}
              fullWidth
            />
            <Card
              content={{
                title: 'Reviewer checklist',
                description: (
                  <div>
                    1) Install the Snap. <br />
                    2) Switch MetaMask to <b>Abstract</b>. <br />
                    3) Send to <code>yourname.abs</code>.
                  </div>
                ),
              }}
              fullWidth
            />
          </CardGrid>

          <Notice>
            <NoticeTitle>Testing</NoticeTitle>
            <Steps>
              <li>Switch MetaMask to the Abstract network.</li>
              <li>
                Ensure your ANS V2 domain has a record set to your wallet
                address (this is what resolves for sending).
              </li>
              <li>
                In MetaMask, try sending to <code>yourname.abs</code>.
              </li>
            </Steps>
          </Notice>
        </InstallSection>
      </Max>
    </Page>
  );
};

export default Index;
