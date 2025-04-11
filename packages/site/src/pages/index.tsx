import styled from 'styled-components';
import { useState } from 'react';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  ResolveDomainButton,
  Card,
} from '../components';
// Import React components instead of direct PNG imports
import { defaultSnapOrigin } from '../config';
import {
  useMetaMask,
  useInvokeSnap,
  useMetaMaskContext,
  useRequestSnap,
} from '../hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 0;
  margin-bottom: 7.6rem;
  background-color: ${({ theme }) => theme.colors.background?.default};
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Header = styled.div`
  width: 100%;
  padding: 3rem 2rem 4rem;
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2.5rem;
`;

const Span = styled.span`
  color: #1bd47d;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  max-width: 600px;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
  padding: 0 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const ResultContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: 10px;
  padding: 2rem;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 60rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ResultRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const ResultLabel = styled.div`
  font-weight: bold;
  width: 120px;
  margin-right: 1rem;
  color: #1bd47d;
`;

const ResultValue = styled.div`
  font-family: monospace;
  word-break: break-all;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.7rem;
  border-radius: 8px;
  flex: 1;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 60rem;
  margin-top: 2rem;
`;

const InputRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
`;

const DomainInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: ${({ theme }) => theme.radii.default};
  margin-right: 1rem;
  font-size: 1rem;
`;

const ResolveButton = styled.button`
  background-color: #1bd47d;
  color: black;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    opacity: 0.85;
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.background?.alternative};
    cursor: not-allowed;
  }
`;

const SampleDomainsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SampleDomain = styled.span`
  background-color: rgba(27, 212, 125, 0.1);
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  font-family: monospace;
  cursor: pointer;
  display: inline-block;
  border: 1px solid rgba(27, 212, 125, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(27, 212, 125, 0.2);
    transform: translateY(-1px);
  }
`;

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();
  
  const [domainInput, setDomainInput] = useState('');
  const [resolving, setResolving] = useState(false);
  const [resolveResult, setResolveResult] = useState<{
    domain?: string;
    address?: string;
    error?: string;
    record?: string;
  } | null>(null);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const handleResolveDomain = async () => {
    if (!domainInput) {
      return;
    }
    
    // Make sure domain has .abs extension
    const domain = domainInput.includes('.abs') ? domainInput : `${domainInput}.abs`;
    
    setResolving(true);
    try {
      // Call get_domain_info to retrieve data without showing a dialog
      const result = await invokeSnap({
        method: 'get_domain_info',
        params: { domainName: domain }
      }) as any;
      
      setResolveResult({
        domain,
        address: result?.address || 'Not resolved',
        record: result?.record || 'No record found'
      });
    } catch (err: any) {
      setResolveResult({
        domain,
        error: err.message || 'Failed to resolve domain'
      });
    } finally {
      setResolving(false);
    }
  };
  
  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleResolveDomain();
    }
  };
  
  const handleSampleClick = (domain: string) => {
    setDomainInput(domain);
  };

  return (
    <Container>
      <Header>
        <LogoContainer>
          <div style={{ width: '90px', height: '90px', marginBottom: '1rem' }}>
            <img 
              src="https://raw.githubusercontent.com/0xShroomy/ans-snap/main/packages/snap/images/ANSavatar.png" 
              alt="ANS Logo" 
              style={{ width: '100%', height: '100%', borderRadius: '50%' }} 
            />
          </div>
        </LogoContainer>
        <Heading>
          Welcome to <Span>Abstract Name Service</Span>
        </Heading>
        <Subtitle>
          Resolve <code>.abs</code> domain names within MetaMask
        </Subtitle>
      </Header>
      <CardContainer>
        {error && (
          <ErrorMessage>
            <b>An error happened:</b> {error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
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
                'Get started by connecting to and installing the example snap.',
              button: (
                <ConnectButton
                  onClick={requestSnap}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}
        {shouldDisplayReconnectButton(installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={requestSnap}
                  disabled={!installedSnap}
                />
              ),
            }}
            disabled={!installedSnap}
          />
        )}
        {installedSnap && (
          <>
            <Card
              content={{
                title: 'Test Domain Resolution',
                description: 'Enter a domain name to resolve its Ethereum address',
                button: <div />, // Use an empty div instead of null
              }}
              fullWidth
            />
            <FormContainer>
                <p>
                  <strong>Sample domains to try:</strong> (click to use)
                </p>
                <SampleDomainsContainer>
                  <SampleDomain onClick={() => handleSampleClick('example')}>example.abs</SampleDomain>
                  <SampleDomain onClick={() => handleSampleClick('hooded')}>hooded.abs</SampleDomain>
                  <SampleDomain onClick={() => handleSampleClick('test')}>test.abs</SampleDomain>
                  <SampleDomain onClick={() => handleSampleClick('sidneybout')}>sidneybout.abs</SampleDomain>
                  <SampleDomain onClick={() => handleSampleClick('shroomy97')}>shroomy97.abs</SampleDomain>
                </SampleDomainsContainer>
                <p><small>You may enter domain with or without the .abs extension</small></p>
                <InputRow>
                  <DomainInput 
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                    placeholder="Enter domain name (e.g., example)"
                    disabled={!installedSnap || resolving}
                  />
                  <ResolveButton 
                    onClick={handleResolveDomain}
                    disabled={!installedSnap || !domainInput || resolving}
                  >
                    {resolving ? 'Resolving...' : 'Resolve'}
                  </ResolveButton>
                </InputRow>
              </FormContainer>
            
            {resolveResult && (
              <ResultContainer>
                <h3 style={{ color: '#1bd47d', marginTop: 0 }}>Resolution Results</h3>
                <ResultRow>
                  <ResultLabel>Domain:</ResultLabel>
                  <ResultValue>{resolveResult.domain}</ResultValue>
                </ResultRow>
                {resolveResult.address && (
                  <ResultRow>
                    <ResultLabel>Address:</ResultLabel>
                    <ResultValue>{resolveResult.address}</ResultValue>
                  </ResultRow>
                )}
                {resolveResult.record && (
                  <ResultRow>
                    <ResultLabel>Record:</ResultLabel>
                    <ResultValue>{resolveResult.record}</ResultValue>
                  </ResultRow>
                )}
                {resolveResult.error && (
                  <ResultRow>
                    <ResultLabel>Error:</ResultLabel>
                    <ResultValue>{resolveResult.error}</ResultValue>
                  </ResultRow>
                )}
              </ResultContainer>
            )}
          </>
        )}
        
        {!installedSnap && (
          <Card
            content={{
              title: 'Resolve .abs Domain',
              description:
                'Lookup a registered Abstract Name Service domain and see its resolved address.',
              button: (
                <ResolveDomainButton
                  onClick={() => {}}
                  disabled={true}
                />
              ),
            }}
            disabled={!installedSnap}
            fullWidth={
              isMetaMaskReady &&
              Boolean(installedSnap) &&
              !shouldDisplayReconnectButton(installedSnap)
            }
          />
        )}
        <Notice>
          <p>
            <b>How it works:</b> This Snap allows you to resolve <b>.abs</b> domain names from the Abstract Name Service directly within MetaMask. 
            Once installed, you can enter domain names like <code>example.abs</code> in the transaction recipient field, 
            and the Snap will automatically resolve the address for you.
          </p>
          <p>
            <b>Two ways to use the Snap:</b>
          </p>
          <ol>
            <li>
              <b>For testing domain resolution:</b> Use the form above to directly resolve domain names to addresses.
              This doesn't require a transaction - it just checks if the domain exists and what address it points to.
            </li>
            <li>
              <b>For sending transactions:</b> Open MetaMask Flask, start a transaction, and type an <code>.abs</code> domain
              in the recipient field. The Snap will show transaction insights with the resolved address information.
            </li>
          </ol>
        </Notice>
      </CardContainer>
    </Container>
  );
};

export default Index;
