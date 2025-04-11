import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2.4rem 1.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.border?.default};
  background-color: ${({ theme }) => theme.colors.background?.alternative};
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  padding: 1rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const FooterTitle = styled.h5`
  font-weight: bold;
  color: #1bd47d;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text?.default};
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
  text-decoration: none;
  
  &:hover {
    color: #1bd47d;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  color: #1bd47d;
  font-size: 0.8rem;
  gap: 0.5rem;
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <FooterColumn>
            <FooterLogo>
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#1bd47d" />
                <text x="20" y="24" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">ANS</text>
              </svg>
            </FooterLogo>
            <SocialContainer>
              <FooterLink href="https://discord.gg/5jXUqCSR7Q" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M 10 6 L 10 8 L 14 8 L 14 6 L 10 6 z M 14 8 L 14 10 L 18 10 L 18 8 L 14 8 z M 18 8 L 22 8 L 22 6 L 18 6 L 18 8 z M 22 8 L 22 10 L 25 10 L 25 8 L 22 8 z M 25 10 L 25 15 L 27 15 L 27 10 L 25 10 z M 27 15 L 27 23 L 25 23 L 25 25 L 27 25 L 29 25 L 29 15 L 27 15 z M 25 25 L 19 25 L 19 27 L 25 27 L 25 25 z M 19 25 L 19 23 L 13 23 L 13 25 L 19 25 z M 13 25 L 7 25 L 7 27 L 13 27 L 13 25 z M 7 25 L 7 23 L 5 23 L 5 15 L 3 15 L 3 25 L 5 25 L 7 25 z M 5 15 L 7 15 L 7 10 L 5 10 L 5 15 z M 7 10 L 10 10 L 10 8 L 7 8 L 7 10 z M 13 23 L 13 21 L 9 21 L 9 23 L 13 23 z M 19 23 L 23 23 L 23 21 L 19 21 L 19 23 z M 11 14 L 11 18 L 14 18 L 14 14 L 11 14 z M 18 14 L 18 18 L 21 18 L 21 14 L 18 14 z"></path>
                </svg>
              </FooterLink>
              <FooterLink href="https://x.com/HoodedHub" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M 20 5 L 20 7 L 26 7 L 26 5 L 20 5 z M 26 7 L 26 9 L 30 9 L 30 7 L 26 7 z M 20 7 L 18 7 L 18 9 L 20 9 L 20 7 z M 18 9 L 16 9 L 16 11 L 18 11 L 18 9 z M 16 11 L 9 11 L 9 13 L 16 13 L 16 11 z M 0 10 L 0 14 L 2 14 L 2 18 L 5 18 L 5 22 L 10 22 L 10 20 L 7 20 L 7 18 L 9 18 L 9 16 L 4 16 L 4 14 L 6 14 L 6 12 L 2 12 L 2 10 L 0 10 z M 10 22 L 10 24 L 12 24 L 12 22 L 10 22 z M 10 24 L 5 24 L 5 26 L 10 26 L 10 24 z M 10 26 L 10 28 L 18 28 L 18 26 L 10 26 z M 18 26 L 22 26 L 22 24 L 18 24 L 18 26 z M 22 24 L 24 24 L 24 19 L 22 19 L 22 24 z M 24 19 L 26 19 L 26 15 L 24 15 L 24 19 z M 26 15 L 28 15 L 28 11 L 26 11 L 26 15 z"></path>
                </svg>
              </FooterLink>
            </SocialContainer>
            <Copyright>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" width="14" height="14">
                <path d="M24 8H26V10H24zM19 11H21V13H19zM19 21L14 21 14 19 12 19 12 21 14 21 14 23 19 23 19 21 21 21 21 19 19 19zM13.998 9H18.997999999999998V11H13.998zM12 13L14 13 14 11 12 11 12 13 10 13 10 19 12 19zM22 6H24V8H22zM22 24H24V26H22zM24 22H26V24H24zM10 4H22V6H10zM6 8H8V10H6zM8 6H10V8H8zM6 22H8V24H6zM8 24H10V26H8zM4 10H6V22H4zM26 10H28V22H26zM10 26H22V28H10z"/>
              </svg>
              <span>2025 Hooded Hub</span>
            </Copyright>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>HOODED HUB</FooterTitle>
            <FooterLink href="https://www.hoodedphantoms.xyz/launchpad">Launchpad</FooterLink>
            <FooterLink href="https://www.hoodedphantoms.xyz/inventory">Inventory</FooterLink>
            <FooterLink href="https://www.hoodedphantoms.xyz/domains">Domains</FooterLink>
            <FooterLink href="https://magiceden.io/collections/abstract/0xcc367ea125c60de7a0c6c4636d5f51aa3a68d0df" target="_blank">Phantom Marketplace</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>USEFUL LINKS</FooterTitle>
            <FooterLink href="https://discord.gg/5jXUqCSR7Q" target="_blank">Discord</FooterLink>
            <FooterLink href="https://twitter.com/HoodedHub" target="_blank">Twitter</FooterLink>
            <FooterLink href="https://hoodedphantoms.xyz/audits" target="_blank">Audits</FooterLink>
            <FooterLink href="https://magiceden.io/collections/abstract/0x0ebc94534eda78332e49f3bfa3a2471e52fadfbf" target="_blank">Domains Marketplace</FooterLink>
          </FooterColumn>
        </FooterContent>
      </FooterContainer>
    </FooterWrapper>
  );
};
