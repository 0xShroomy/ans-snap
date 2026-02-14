import type { DefaultTheme } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const breakpoints = ['600px', '768px', '992px'];

/**
 * Common theme properties.
 */
const theme = {
  fonts: {
    default:
      '"Manrope", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display:
      '"Unbounded", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    code: 'ui-monospace,Menlo,Monaco,"Cascadia Mono","Segoe UI Mono","Roboto Mono","Oxygen Mono","Ubuntu Monospace","Source Code Pro","Fira Mono","Droid Sans Mono","Courier New", monospace',
  },
  fontSizes: {
    heading: '5.4rem',
    mobileHeading: '3.6rem',
    title: '2.0rem',
    large: '1.9rem',
    text: '1.6rem',
    small: '1.4rem',
  },
  radii: {
    default: '22px',
    button: '14px',
  },
  breakpoints,
  mediaQueries: {
    small: `@media screen and (max-width: ${breakpoints[0] as string})`,
    medium: `@media screen and (min-width: ${breakpoints[1] as string})`,
    large: `@media screen and (min-width: ${breakpoints[2] as string})`,
  },
  shadows: {
    default: '0 18px 60px rgba(2, 6, 23, 0.12)',
    button: '0 10px 40px rgba(2, 6, 23, 0.16)',
  },
};

/**
 * Light theme color properties.
 */
export const light: DefaultTheme = {
  mode: 'light',
  colors: {
    background: {
      default: '#fbfbf7',
      alternative: 'rgba(255, 255, 255, 0.72)',
      inverse: '#0b0f10',
    },
    icon: {
      default: '#0b0f10',
      alternative: 'rgba(2, 6, 23, 0.45)',
    },
    text: {
      default: '#0b1220',
      muted: 'rgba(2, 6, 23, 0.6)',
      alternative: 'rgba(2, 6, 23, 0.7)',
      inverse: '#fbfbf7',
    },
    border: {
      default: 'rgba(2, 6, 23, 0.12)',
    },
    primary: {
      default: '#1cd47e',
      inverse: '#0b0f10',
    },
    card: {
      default: 'rgba(255, 255, 255, 0.72)',
    },
    error: {
      default: '#d73a49',
      alternative: '#b92534',
      muted: '#d73a4919',
    },
  },
  ...theme,
};

/**
 * Dark theme color properties
 */
export const dark: DefaultTheme = {
  mode: 'dark',
  colors: {
    background: {
      default: '#070a0b',
      alternative: 'rgba(11, 15, 16, 0.72)',
      inverse: '#fbfbf7',
    },
    icon: {
      default: '#fbfbf7',
      alternative: 'rgba(248, 250, 252, 0.6)',
    },
    text: {
      default: '#f8fafc',
      muted: 'rgba(248, 250, 252, 0.72)',
      alternative: 'rgba(248, 250, 252, 0.82)',
      inverse: '#0b0f10',
    },
    border: {
      default: 'rgba(148, 163, 184, 0.16)',
    },
    primary: {
      default: '#1cd47e',
      inverse: '#0b0f10',
    },
    card: {
      default: 'rgba(11, 15, 16, 0.72)',
    },
    error: {
      default: '#d73a49',
      alternative: '#b92534',
      muted: '#d73a4919',
    },
  },
  ...theme,
};

/**
 * Default style applied to the app.
 *
 * @param props - Styled Components props.
 * @returns Global style React component.
 */
export const GlobalStyle = createGlobalStyle`
  html {
    /* 62.5% of the base size of 16px = 10px.*/
    font-size: 62.5%;
  }

  body {
    background-color: ${(props) => props.theme.colors.background?.default};
    color: ${(props) => props.theme.colors.text?.default};
    font-family: ${(props) => props.theme.fonts.default};
    font-size: ${(props) => props.theme.fontSizes.text};
    margin: 0;
    min-height: 100vh;
    position: relative;
    isolation: isolate;
    background-image: ${(props) =>
      props.theme.mode === 'dark'
        ? `radial-gradient(1200px 700px at 10% -20%, rgba(16, 185, 129, 0.2), transparent 65%),
           radial-gradient(1000px 600px at 90% 10%, rgba(236, 72, 153, 0.16), transparent 60%),
           radial-gradient(800px 400px at 50% 80%, rgba(59, 130, 246, 0.14), transparent 60%),
           linear-gradient(180deg, rgba(10, 12, 24, 0.92) 0%, rgba(6, 7, 14, 0.98) 100%)`
        : `radial-gradient(1200px 700px at 10% -20%, rgba(16, 185, 129, 0.18), transparent 65%),
           radial-gradient(1000px 600px at 90% 10%, rgba(236, 72, 153, 0.14), transparent 60%),
           radial-gradient(800px 400px at 50% 80%, rgba(59, 130, 246, 0.12), transparent 60%),
           linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.92) 100%)`};
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: ${(props) => (props.theme.mode === 'dark' ? 0.28 : 0.18)};
    mix-blend-mode: ${(props) => (props.theme.mode === 'dark' ? 'screen' : 'multiply')};
    background-image: ${(props) =>
      props.theme.mode === 'dark'
        ? `repeating-linear-gradient(0deg, rgba(148, 163, 184, 0.12), rgba(148, 163, 184, 0.12) 1px, transparent 1px, transparent 2px),
           repeating-linear-gradient(90deg, rgba(148, 163, 184, 0.08), rgba(148, 163, 184, 0.08) 1px, transparent 1px, transparent 2px)`
        : `repeating-linear-gradient(0deg, rgba(15, 23, 42, 0.06), rgba(15, 23, 42, 0.06) 1px, transparent 1px, transparent 2px),
           repeating-linear-gradient(90deg, rgba(15, 23, 42, 0.04), rgba(15, 23, 42, 0.04) 1px, transparent 1px, transparent 2px)`};
    z-index: 0;
  }

  * {
    transition: background-color 0.12s linear, color 0.12s linear, border-color 0.12s linear;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.display};
    letter-spacing: -0.03em;
  }

  code {
    background-color: ${(props) => props.theme.colors.background?.alternative};
    font-family: ${(props) => props.theme.fonts.code};
    padding: 0.15em 0.45em;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.92em;
  }

  button {
    font-size: ${(props) => props.theme.fontSizes.small};
    border-radius: ${(props) => props.theme.radii.button};
    background-color: ${(props) => props.theme.colors.background?.inverse};
    color: ${(props) => props.theme.colors.text?.inverse};
    border: 1px solid rgba(2, 6, 23, 0.14);
    font-weight: 800;
    padding: 1.05rem 1.25rem;
    min-height: 4.2rem;
    cursor: pointer;
    transition: transform 0.14s ease, background-color 0.12s linear, color 0.12s linear, border-color 0.12s linear;

    &:hover {
      background-color: transparent;
      border: 1px solid ${(props) => props.theme.colors.border?.default};
      color: ${(props) => props.theme.colors.text?.default};
      transform: translateY(-1px);
    }

    &:disabled,
    &[disabled] {
      opacity: 0.6;
      transform: none;
      cursor: not-allowed;
    }

    &:disabled:hover,
    &[disabled]:hover {
      background-color: ${(props) => props.theme.colors.background?.inverse};
      color: ${(props) => props.theme.colors.text?.inverse};
      border: 1px solid rgba(2, 6, 23, 0.14);
    }
  }

  a {
    color: inherit;
  }
`;
