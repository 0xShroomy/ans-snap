# Abstract Name Service (ANS) MetaMask Snap

This snap enables MetaMask users to resolve `.abs` domain names to Ethereum addresses. The Abstract Name Service (ANS) is a decentralized domain name system built on the Abstract blockchain that allows users to register and manage domains with user-friendly names.

## Features

- Resolve `.abs` domain names to Ethereum addresses
- View domain records associated with ANS domains
- Seamless integration with MetaMask Flask

## Usage

This snap provides the following JSON-RPC methods:

- `get_domain_info`: Retrieves address and record information for a domain without showing a dialog
- `resolve_domain`: Resolves a domain name and displays the results in a confirmation dialog

## Testing

The snap includes tests to verify domain resolution functionality. To run tests:

```bash
yarn test
```

## Development

Built with:
- TypeScript
- MetaMask Snaps SDK
- Ethers.js for blockchain interactions

For more information, visit [https://github.com/0xShroomy/ans-snap](https://github.com/0xShroomy/ans-snap)
