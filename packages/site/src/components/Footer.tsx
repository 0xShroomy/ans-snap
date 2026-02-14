import styled, { useTheme } from 'styled-components';

import { ReactComponent as MetaMaskFox } from '../assets/metamask_fox.svg';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 2rem 2.4rem;
  border-top: 1px solid ${(props) => props.theme.colors.border?.default};
  background: ${(props) => props.theme.colors.background?.alternative};
  backdrop-filter: blur(14px);

  ${({ theme }) => theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const MetaMaskPill = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  padding: 0.85rem 1.1rem;
  border-radius: 999px;
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  background: ${(props) => props.theme.colors.background?.alternative};
  box-shadow: ${(props) => props.theme.shadows.button};
`;

const Text = styled.p`
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.01em;
`;

const SubText = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text?.muted};
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const Link = styled.a`
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text?.muted};
  padding: 0.6rem 0.85rem;
  border-radius: 999px;
  border: 1px solid transparent;

  &:hover {
    color: ${(props) => props.theme.colors.text?.default};
    border: 1px solid ${(props) => props.theme.colors.border?.default};
  }
`;

export const Footer = () => {
  const theme = useTheme();

  return (
    <FooterWrapper>
      <Left>
        <MetaMaskPill
          href="https://docs.metamask.io/snaps/"
          target="_blank"
          rel="noreferrer"
          aria-label="MetaMask Snaps documentation"
          title="MetaMask Snaps documentation"
        >
          <MetaMaskFox />
          <div>
            <Text style={{ color: theme.colors.text?.default }}>
              Powered by MetaMask Snaps
            </Text>
            <SubText>Installer and test page</SubText>
          </div>
        </MetaMaskPill>
      </Left>
      <Right>
        <Link
          href="https://absnameservice.com"
          target="_blank"
          rel="noreferrer"
        >
          absnameservice.com
        </Link>
        <Link
          href="https://github.com/0xShroomy/ans-snap"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </Link>
        <Link
          href="https://www.npmjs.com/package/@ans-abstract-name-service/ans-snap"
          target="_blank"
          rel="noreferrer"
        >
          Package
        </Link>
      </Right>
    </FooterWrapper>
  );
};
