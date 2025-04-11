import type {
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-sdk';
import { panel, text, heading, divider, copyable } from '@metamask/snaps-sdk';

import { TLD } from './constants';
import {
  isAbstractDomain,
  extractDomainName,
  resolveDomainToAddress,
  getDomainRecord,
} from './domain';

/**
 * Returns a message with domain and address information if the
 * transaction contains a domain in the recipient field
 *
 * @param args - The transaction insights request args
 * @param args.transaction - The transaction object to get insights for
 * @returns Transaction insights containing domain resolution information
 */
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  // Check if this transaction has a recipient that might be an Abstract domain
  const { to } = transaction;

  // Skip if there's no recipient or if it doesn't look like a domain
  if (!to || !isAbstractDomain(to)) {
    return null;
  }

  try {
    // Extract domain name and attempt to resolve it
    const domainName = extractDomainName(to);
    const resolvedAddress = await resolveDomainToAddress(domainName);

    // If we couldn't resolve the address, return empty insights
    if (!resolvedAddress) {
      return null;
    }

    // Get additional record information if available
    const record = await getDomainRecord(domainName);

    // Return transaction insights with the resolved information
    return {
      content: panel([
        heading(`Abstract Domain Resolution`),
        divider(),
        text(`Domain **${domainName}.${TLD}** resolved to:`),
        copyable(`${resolvedAddress}`),
        ...(record
          ? [divider(), text(`Domain Record:`), text(`${record}`)]
          : []),
      ]),
    };
  } catch (error) {
    console.error('Error in transaction insights:', error);
    return null;
  }
};

/**
 * Handle incoming JSON-RPC requests from the dapp
 *
 * @param args - The request handler args
 * @param args.origin - The origin of the request
 * @param args.request - The request object
 * @returns The JSON-RPC response
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin: _origin, // Prefix with underscore to indicate it's unused
  request,
}) => {
  switch (request.method) {
    case 'resolve_domain': {
      // Extract domain from params
      const { domain } = request.params as { domain: string };

      if (!domain) {
        throw new Error('Domain parameter is required');
      }

      // Resolve the domain to an address
      const address = await resolveDomainToAddress(domain);

      if (!address) {
        return snap.request({
          method: 'snap_dialog',
          params: {
            type: 'alert',
            content: panel([
              text(`Domain **${domain}** could not be resolved.`),
              text(`The domain may not be registered or might not exist.`),
            ]),
          },
        });
      }

      // Get the record associated with this domain
      const record = await getDomainRecord(domain);

      // Return success dialog with resolved information
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Domain **${domain}.${TLD}** resolved to:`),
            copyable(`${address}`),
            ...(record ? [text(`Domain Record:`), text(`${record}`)] : []),
          ]),
        },
      });
    }

    case 'get_domain_info': {
      // Get all info for a domain name
      const { domainName } = request.params as { domainName: string };

      if (!domainName) {
        throw new Error('Domain name parameter is required');
      }

      const resolvedAddress = await resolveDomainToAddress(domainName);
      const domainRecord = await getDomainRecord(domainName);

      return {
        address: resolvedAddress,
        record: domainRecord,
        exists: resolvedAddress !== null,
      };
    }

    default: {
      throw new Error('Method not found.');
    }
  }
};
