# ANS MetaMask Snap (V2)

This repo contains a MetaMask Snap that enables ANS (`*.abs`) name resolution for
the ANSv2 contract on Abstract.

Key folders:

- `packages/snap`: the Snap (implements `onNameLookup`)
- `packages/site`: a simple site to install the Snap (local dev / review)

## Requirements

- Node.js 25.2.1 (via `nvm use` using `.nvmrc`)
- Yarn (via Corepack)

## Getting Started

```shell
nvm use
corepack enable
yarn install && yarn start
```

This will:

- serve the Snap locally
- serve the install/test site locally

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
