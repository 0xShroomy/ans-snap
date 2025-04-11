import { useState } from 'react';
import styled from 'styled-components';

type CheckedProps = {
  readonly checked: boolean;
};

const SunIcon = styled.svg`
  width: 18px;
  height: 18px;
`;

const MoonIcon = styled.svg<CheckedProps>`
  width: 18px;
  height: 18px;
  fill: ${({ checked }) => (checked ? 'white' : 'black')};
`;

const ToggleWrapper = styled.div`
  touch-action: pan-x;
  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  margin-right: 2.4rem;
  ${({ theme }) => theme.mediaQueries.small} {
    margin-right: 2.4rem;
  }
`;

const ToggleInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const IconContainer = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  opacity: 0;
  transition: opacity 0.25s ease;
  & > * {
    align-items: center;
    display: flex;
    height: 22px;
    justify-content: center;
    position: relative;
    width: 22px;
  }
`;

const CheckedContainer = styled(IconContainer)<CheckedProps>`
  opacity: ${({ checked }) => (checked ? 1 : 0)};
  left: 10px;
`;

const UncheckedContainer = styled(IconContainer)<CheckedProps>`
  opacity: ${({ checked }) => (checked ? 0 : 1)};
  right: 10px;
`;

const ToggleContainer = styled.div<CheckedProps>`
  width: 68px;
  height: 36px;
  padding: 0;
  border-radius: 36px;
  background-color: ${({ checked, theme }) => checked ? '#1cd47e' : theme.colors.background?.alternative};
  transition: all 0.2s ease;
`;

const ToggleCircle = styled.div<CheckedProps>`
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: absolute;
  top: 4px;
  left: ${({ checked }) => (checked ? '36px' : '4px')};
  width: 28px;
  height: 28px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
  background-color: ${({ checked }) => (checked ? '#ffffff' : '#1cd47e')};
  box-sizing: border-box;
  transition: all 0.25s ease;
`;

export const Toggle = ({
  onToggle,
  defaultChecked = false,
}: {
  onToggle: () => void;
  defaultChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    onToggle();
    setChecked(!checked);
  };

  return (
    <ToggleWrapper onClick={handleChange}>
      <ToggleContainer checked={checked}>
        <CheckedContainer checked={checked}>
          <span>
            <SunIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="black">
              <path d="M 15 2 L 15 6 L 17 6 L 17 2 L 15 2 z M 5 5 L 5 7 L 7 7 L 7 5 L 5 5 z M 7 7 L 7 9 L 9 9 L 9 7 L 7 7 z M 25 5 L 25 7 L 27 7 L 27 5 L 25 5 z M 25 7 L 23 7 L 23 9 L 25 9 L 25 7 z M 12 8 L 12 10 L 20 10 L 20 8 L 12 8 z M 20 10 L 20 12 L 22 12 L 22 10 L 20 10 z M 22 12 L 22 20 L 24 20 L 24 12 L 22 12 z M 22 20 L 20 20 L 20 22 L 22 22 L 22 20 z M 20 22 L 12 22 L 12 24 L 20 24 L 20 22 z M 12 22 L 12 20 L 10 20 L 10 22 L 12 22 z M 10 20 L 10 12 L 8 12 L 8 20 L 10 20 z M 10 12 L 12 12 L 12 10 L 10 10 L 10 12 z M 2 15 L 2 17 L 6 17 L 6 15 L 2 15 z M 26 15 L 26 17 L 30 17 L 30 15 L 26 15 z M 7 23 L 7 25 L 9 25 L 9 23 L 7 23 z M 7 25 L 5 25 L 5 27 L 7 27 L 7 25 z M 23 23 L 23 25 L 25 25 L 25 23 L 23 23 z M 25 25 L 25 27 L 27 27 L 27 25 L 25 25 z M 15 26 L 15 30 L 17 30 L 17 26 L 15 26 z"></path>
            </SunIcon>
          </span>
        </CheckedContainer>
        <UncheckedContainer checked={checked}>
          <span>
            <MoonIcon checked={checked} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 16 4 L 16 6 L 16 10 L 18 10 L 18 6 L 22 6 L 22 4 L 16 4 z M 22 6 L 22 8 L 24 8 L 24 6 L 22 6 z M 24 8 L 24 10 L 26 10 L 26 8 L 24 8 z M 26 10 L 26 22 L 28 22 L 28 10 L 26 10 z M 26 22 L 24 22 L 24 24 L 26 24 L 26 22 z M 24 24 L 22 24 L 22 26 L 24 26 L 24 24 z M 22 26 L 10 26 L 10 28 L 22 28 L 22 26 z M 10 26 L 10 24 L 8 24 L 8 26 L 10 26 z M 8 24 L 8 22 L 6 22 L 6 24 L 8 24 z M 6 22 L 6 18 L 10 18 L 10 16 L 6 16 L 4 16 L 4 22 L 6 22 z M 10 18 L 10 20 L 16 20 L 16 18 L 10 18 z M 16 18 L 18 18 L 18 16 L 16 16 L 16 18 z M 18 16 L 20 16 L 20 10 L 18 10 L 18 16 z"></path>
            </MoonIcon>
          </span>
        </UncheckedContainer>
      </ToggleContainer>
      <ToggleCircle checked={checked} />
      <ToggleInput type="checkbox" aria-label="Toggle Button" />
    </ToggleWrapper>
  );
};
