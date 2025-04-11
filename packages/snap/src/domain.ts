import { ethers } from 'ethers';

import { ANS_ABI } from './abi';
import { ANS_CONTRACT_ADDRESS, RPC_URL, TLD } from './constants';

/**
 * Check if a string looks like an Abstract domain name (.abs)
 *
 * @param name - The name to check
 * @returns Whether the name is likely an Abstract domain name
 */
export const isAbstractDomain = (name: string): boolean => {
  // Check if string ends with .abs (case insensitive)
  return name.toLowerCase().endsWith(`.${TLD}`);
};

/**
 * Extract the domain name part from a full domain string (e.g., "example" from "example.abs")
 *
 * @param fullName - The full domain name with TLD
 * @returns Domain name without the TLD
 */
export const extractDomainName = (fullName: string): string => {
  // Handle if already a valid domain name without extension
  if (!fullName.includes('.')) {
    return fullName.toLowerCase();
  }

  // Extract domain part before the TLD
  const parts = fullName.toLowerCase().split('.');
  if (parts.length >= 2 && parts[parts.length - 1] === TLD) {
    return parts.slice(0, -1).join('.');
  }

  return fullName.toLowerCase();
};

/**
 * Resolve an Abstract domain name to an Ethereum address
 *
 * @param domainName - The domain name to resolve (with or without .abs extension)
 * @returns The resolved Ethereum address or null if not found
 */
export const resolveDomainToAddress = async (
  domainName: string,
): Promise<string | null> => {
  try {
    // Extract the domain name without TLD if needed
    const domain = extractDomainName(domainName);

    // Connect to the provider
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // Create contract instance with explicit type assertion for the domains method
    const contract = new ethers.Contract(
      ANS_CONTRACT_ADDRESS,
      ANS_ABI,
      provider,
    );

    // We're using the function directly from the contract
    // Using an explicit try/catch for this operation
    try {
      // Call the contract's domains mapping or getAddress function
      // Type assertion to handle the dynamic nature of ethers contract methods
      const address = await (contract as any).domains(domain);

      // If the address is the zero address, the domain doesn't exist or isn't registered
      if (address === ethers.ZeroAddress) {
        return null;
      }

      return address;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Error is intentionally not used - we're falling back to alternative method
      // If domains fails, try the getAddress method as a fallback
      try {
        const address = await (contract as any).getAddress(domain);
        if (address === ethers.ZeroAddress) {
          return null;
        }
        return address;
      } catch (addressError) {
        console.error('Error resolving domain address:', addressError);
        return null;
      }
    }
  } catch (error) {
    console.error('Error in domain resolution process:', error);
    return null;
  }
};

/**
 * Get the record associated with a domain name
 *
 * @param domainName - The domain name to check (with or without .abs extension)
 * @returns The record content or null if not found
 */
export const getDomainRecord = async (
  domainName: string,
): Promise<string | null> => {
  try {
    // Extract the domain name without TLD if needed
    const domain = extractDomainName(domainName);

    // Connect to the provider
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // Create contract instance
    const contract = new ethers.Contract(
      ANS_CONTRACT_ADDRESS,
      ANS_ABI,
      provider,
    );

    // Use explicit try/catch for the contract call
    try {
      // Call the records mapping with a type assertion
      const record = await (contract as any).records(domain);

      // If the record is empty, return null
      if (!record || record === '') {
        return null;
      }

      return record;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Error is intentionally not used - we're falling back to alternative method
      // Try the getRecord method as a fallback
      try {
        const record = await (contract as any).getRecord(domain);
        if (!record || record === '') {
          return null;
        }
        return record;
      } catch (getRecordError) {
        console.error('Error getting domain record:', getRecordError);
        return null;
      }
    }
  } catch (error) {
    console.error('Error in domain record lookup process:', error);
    return null;
  }
};
