# ANS MetaMask Snap (V2)

MetaMask name resolution Snap for ANS (`*.abs`) using ANSv2 on Abstract.

## What It Does

- Resolves `name.abs` to a wallet address inside MetaMask using the `onNameLookup` handler.
- Reverse lookup: resolves an address to `name.abs` (if set in ANSv2).

Resolution rules (forward lookup):

1. Read `records(name)` from ANSv2.
2. If the record is a valid `0x...` address string, return it.
3. Otherwise, fall back to `domains(name)` (the domain owner).

## Networks

- Abstract mainnet only (`eip155:2741`)

## Permissions

- `endowment:name-lookup` (TLD matcher: `abs`, chain allowlist: `eip155:2741`)
- `endowment:network-access` (direct RPC calls to Abstract)

External HTTP is used only for direct JSON-RPC to the Abstract endpoint.

## Install (Production)

Snap ID:

`npm:@ans-abstract-name-service/ans-snap`

## Local Development

```sh
nvm use

# Yarn is vendored in this repo.
node .yarn/releases/yarn-3.2.1.cjs install
node .yarn/releases/yarn-3.2.1.cjs start
```

## Testing

```sh
node .yarn/releases/yarn-3.2.1.cjs workspace @ans-abstract-name-service/ans-snap test
```
