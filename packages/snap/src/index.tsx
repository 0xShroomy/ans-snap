import type { OnNameLookupHandler } from '@metamask/snaps-sdk';

import { reverseLookupAbsDomain, resolveAbsDomainToAddress } from './ans';

const PROTOCOL = 'ANS';

export const onNameLookup: OnNameLookupHandler = async (args) => {
  if ('domain' in args) {
    const result = await resolveAbsDomainToAddress(args.chainId, args.domain);
    if (!result) return null;

    return {
      resolvedAddresses: [
        {
          protocol: PROTOCOL,
          resolvedAddress: result.address,
          domainName: result.domainName,
        },
      ],
    };
  }

  const resolvedDomain = await reverseLookupAbsDomain(args.chainId, args.address);
  if (!resolvedDomain) return null;

  return {
    resolvedDomains: [
      {
        protocol: PROTOCOL,
        resolvedDomain,
      },
    ],
  };
};

