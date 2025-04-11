# Abstract Name Service (ANS) Resolver Snap

<img src="/packages/snap/images/ANSavatar.png" alt="ANS Logo" width="120" />

This repository contains the MetaMask Snap for resolving `.abs` domain names from the Abstract Name Service to Ethereum addresses.

## Installation

https://snaps.metamask.io/snap/npm/@hooded-phantoms/abstract-name-service-snap/

## What It Does

This Snap allows MetaMask users to:
- Send transactions directly to `.abs` domain names instead of Ethereum addresses
- See resolved addresses in transaction insights
- Look up records associated with domain names

## Usage

After installing the ANS Snap, you can use it in two ways:

### 1. Direct Domain Resolution

Use the Snap to lookup information about a domain:

1. Click on the MetaMask extension
2. Navigate to the Snaps section
3. Select the ANS Resolver Snap
4. Enter a domain name (e.g., `example.abs`) to resolve

### 2. Transaction Sending

Send transactions using domain names:

1. Start a transaction in MetaMask
2. In the "Send to" field, enter an `.abs` domain name
3. The Snap will automatically resolve the domain and show you the corresponding address
4. Confirm the transaction details and proceed as normal

## Development

```bash
# Install dependencies
yarn install

# Build the snap
yarn build

# Start development server
yarn start
```

## Release

1. Bump version in `packages/snap/package.json` and `packages/snap/snap.manifest.json`
2. Run `yarn build`
3. Run `yarn publish` from the `packages/snap` directory

```shell
yarn install && yarn start
```


