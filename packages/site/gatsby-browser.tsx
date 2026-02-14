/* eslint-disable import-x/no-unassigned-import */
import type { GatsbyBrowser } from 'gatsby';
import { StrictMode } from 'react';

import { App } from './src/App';
import { Root } from './src/Root';

import './src/styles/globals.css';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <StrictMode>
    <Root>{element}</Root>
  </StrictMode>
);

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => <App>{element}</App>;
