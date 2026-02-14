import styled, { useTheme } from 'styled-components';

import { HeaderButtons } from './Buttons';
import { SnapLogo } from './SnapLogo';
import { Toggle } from './Toggle';
import { getThemePreference } from '../utils';

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border?.default};
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${(props) => props.theme.colors.background?.alternative};
  backdrop-filter: blur(14px);
`;

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: 1.35rem;
  }
`;

const Tagline = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.text?.muted};
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  font-weight: 800;
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.text?.muted};
  padding: 0.6rem 0.8rem;
  border-radius: 999px;
  border: 1px solid transparent;

  &:hover {
    color: ${(props) => props.theme.colors.text?.default};
    border: 1px solid ${(props) => props.theme.colors.border?.default};
  }
`;

export const Header = ({
  handleToggleClick,
}: {
  handleToggleClick: () => void;
}) => {
  const theme = useTheme();

  return (
    <HeaderWrapper>
      <Brand>
        <SnapLogo color={theme.colors.primary?.default} size={34} />
        <div>
          <Title>Abstract Name Service Snap</Title>
          <Tagline>Resolve .abs names on Abstract</Tagline>
        </div>
      </Brand>
      <RightContainer>
        <Nav>
          <NavLink
            href="https://absnameservice.com"
            target="_blank"
            rel="noreferrer"
          >
            Main site
          </NavLink>
          <NavLink
            href="https://github.com/0xShroomy/ans-snap"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </NavLink>
          <NavLink
            href="https://www.npmjs.com/package/@ans-abstract-name-service/ans-snap"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </NavLink>
        </Nav>
        <Toggle
          onToggle={handleToggleClick}
          defaultChecked={getThemePreference()}
        />
        <HeaderButtons />
      </RightContainer>
    </HeaderWrapper>
  );
};
