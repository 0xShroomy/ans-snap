import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  // This is required to make use of the React 17+ JSX transform.
  jsxRuntime: 'automatic',

  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Abstract Name Service Snap',
        /* eslint-disable @typescript-eslint/naming-convention */
        short_name: 'ANS Snap',
        description:
          'Install the ANS MetaMask Snap to resolve .abs names on Abstract.',
        icon: 'static/logo.png',
        theme_color: '#1cd47e',
        background_color: '#0b0f10',
        /* eslint-enable @typescript-eslint/naming-convention */
        display: 'standalone',
      },
    },
  ],
};

export default config;
