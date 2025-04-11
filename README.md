# Abstract Name Service (ANS) Resolver Snap

![ANS Logo](/packages/snap/images/ANSavatar.png)

A MetaMask Snap that allows users to resolve `.abs` domain names from the Abstract Name Service to Ethereum addresses. This Snap makes it easier to send transactions to human-readable domain names instead of long hexadecimal addresses.

## Features

- **Domain Resolution**: Resolve `.abs` domain names to Ethereum addresses
- **Transaction Insights**: See domain resolution information directly in MetaMask when sending to `.abs` domains
- **Record Lookup**: View additional records associated with domain names

## Installation

The ANS Snap requires [MetaMask Flask](https://metamask.io/flask/), a distribution of MetaMask that provides access to the Snaps system.

1. Install [MetaMask Flask](https://metamask.io/flask/)
2. Visit [our website](https://abstractnamingservice.xyz) or the [MetaMask Snap Directory](https://snaps.metamask.io)
3. Click "Install Snap" to add the ANS Resolver to your MetaMask

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

```shell
yarn install && yarn start
```

## Cloning

This repository contains GitHub Actions that you may find useful, see
`.github/workflows` and [Releasing & Publishing](https://github.com/MetaMask/template-snap-monorepo/edit/main/README.md#releasing--publishing)
below for more information.

If you clone or create this repository outside the MetaMask GitHub organization,
you probably want to run `./scripts/cleanup.sh` to remove some files that will
not work properly outside the MetaMask GitHub organization.

If you don't wish to use any of the existing GitHub actions in this repository,
simply delete the `.github/workflows` directory.

## Contributing

### Testing and Linting

Run `yarn test` to run the tests once.

Run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and
fix any automatically fixable issues.

### Using NPM packages with scripts

Scripts are disabled by default for security reasons. If you need to use NPM
packages with scripts, you can run `yarn allow-scripts auto`, and enable the
script in the `lavamoat.allowScripts` section of `package.json`.

See the documentation for [@lavamoat/allow-scripts](https://github.com/LavaMoat/LavaMoat/tree/main/packages/allow-scripts)
for more information.
