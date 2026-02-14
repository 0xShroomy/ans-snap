import type { GatsbySSR } from 'gatsby';
import { StrictMode } from 'react';

import { App } from './src/App';
import { Root } from './src/Root';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents([
    <link
      key="fonts-preconnect-1"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="fonts-preconnect-2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="fonts-css"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@500;600;700&display=swap"
    />,
  ]);
};

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <StrictMode>
    <Root>{element}</Root>
  </StrictMode>
);

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => (
  <App>{element}</App>
);
