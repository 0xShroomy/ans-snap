# Abstract Name Service (ANS) Snap Demo Site

<img src="../snap/images/ANSavatar.png" alt="ANS Logo" width="120" />

This package contains the demo site for the MetaMask Snap that resolves `.abs` domain names from the Abstract Name Service to Ethereum addresses.

## Overview

The demo site provides an interactive interface for users to:

- Install the ANS Snap to their MetaMask Flask wallet
- Look up `.abs` domain names and see their resolved Ethereum addresses
- Test the Snap's functionality in a user-friendly environment
- Learn how to integrate the ANS Snap into their own projects

## Features

- **Domain Resolution**: Enter any `.abs` domain name to see its corresponding Ethereum address
- **MetaMask Integration**: Easy one-click installation of the ANS Snap
- **Sample Domains**: Test with pre-configured sample domains to see immediate results
- **Responsive Design**: Works across desktop and mobile browsers

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn start
# The site will be available at http://localhost:8000

# Build for production
yarn build
# Creates optimized build in the public folder
```

## Environment Variables

The site can be configured using environment variables:

- `SNAP_ORIGIN`: Defines the origin for the ANS Snap (defaults to `local:http://localhost:8080`)
- For production builds, rename `.env.production.dist` to `.env.production` and set your variables

## Technologies Used

- **Frontend**: React, Styled Components, Gatsby
- **Integration**: MetaMask Snaps API

## Customization

The site's styling can be customized through the `src/config/theme.ts` file, allowing for easy branding adjustments.
