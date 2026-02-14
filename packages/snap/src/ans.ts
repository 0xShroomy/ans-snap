const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const DEAD_ADDRESS = '0x000000000000000000000000000000000000dead';

// Abstract mainnet (from this repo's chain config): https://api.mainnet.abs.xyz
export const ABSTRACT_CAIP2_CHAIN_ID = 'eip155:2741';

// TODO: Confirm this is the final ANSv2 proxy address for Abstract mainnet.
// This address appears throughout this repo (ABScan links / scripts).
const ANS_V2_CONTRACT_BY_CHAIN: Record<string, string> = {
  [ABSTRACT_CAIP2_CHAIN_ID]: '0x86a282845a61302Ba4735d111b1a1417f6e617Ad',
};

// Function selectors (computed via `cast sig "<signature>"`).
const SELECTOR_RECORDS_STRING = '0x541e771d'; // records(string)
const SELECTOR_DOMAINS_STRING = '0x26449235'; // domains(string)
const SELECTOR_GET_NAME_BY_ADDRESS = '0x7c80bb4f'; // getNameByAddress(address)

type EthereumRequest = (args: {
  method: string;
  params?: unknown[] | Record<string, unknown>;
}) => Promise<unknown>;

declare const ethereum: { request: EthereumRequest };

function strip0x(hex: string): string {
  return hex.startsWith('0x') ? hex.slice(2) : hex;
}

function pad32(hexWithout0x: string): string {
  return hexWithout0x.padStart(64, '0');
}

function bigIntToWord(value: bigint): string {
  return pad32(value.toString(16));
}

function bytesToHex(bytes: Uint8Array): string {
  let out = '';
  for (const b of bytes) {
    out += b.toString(16).padStart(2, '0');
  }
  return out;
}

function hexToBytes(hex: string): Uint8Array {
  const clean = strip0x(hex);
  if (clean.length % 2 !== 0) {
    throw new Error('Invalid hex string.');
  }
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byteHex = clean.slice(i * 2, i * 2 + 2);
    out[i] = Number.parseInt(byteHex, 16);
  }
  return out;
}

function decodeAddressReturn(data: string): string {
  const clean = strip0x(data);
  if (clean.length < 64) {
    throw new Error('Invalid ABI-encoded address return.');
  }
  const word = clean.slice(0, 64);
  return `0x${word.slice(24)}`;
}

function decodeStringReturn(data: string): string {
  const clean = strip0x(data);
  if (clean.length < 64) {
    throw new Error('Invalid ABI-encoded string return.');
  }

  const offsetBytes = BigInt(`0x${clean.slice(0, 64)}`);
  const offsetHex = Number(offsetBytes) * 2;
  if (!Number.isSafeInteger(offsetHex) || offsetHex < 0) {
    throw new Error('Invalid string offset.');
  }

  const lenHexIndex = offsetHex;
  const lenHex = clean.slice(lenHexIndex, lenHexIndex + 64);
  if (lenHex.length !== 64) {
    throw new Error('Invalid string length.');
  }

  const lenBytes = BigInt(`0x${lenHex}`);
  const start = lenHexIndex + 64;
  const end = start + Number(lenBytes) * 2;
  if (!Number.isSafeInteger(end) || end > clean.length) {
    throw new Error('Invalid string data bounds.');
  }

  const valueHex = clean.slice(start, end);
  const valueBytes = hexToBytes(valueHex);
  return new TextDecoder().decode(valueBytes);
}

function encodeStringArg(value: string): string {
  const bytes = new TextEncoder().encode(value);
  const head = bigIntToWord(32n); // offset to tail
  const len = bigIntToWord(BigInt(bytes.length));

  const dataHex = bytesToHex(bytes);
  const paddedDataHex = dataHex.padEnd(Math.ceil(dataHex.length / 64) * 64, '0');
  return `${head}${len}${paddedDataHex}`;
}

function encodeAddressArg(value: string): string {
  if (!isHexAddress(value)) {
    throw new Error('Invalid address.');
  }
  return pad32(strip0x(value).toLowerCase());
}

function encodeCall(selector: string, encodedArgsWithout0x: string): string {
  return `${selector}${encodedArgsWithout0x}`;
}

function isHexAddress(value: string): value is `0x${string}` {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

function normalizeNamePartFromDomain(domain: string): string | null {
  const trimmed = domain.trim();
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();
  if (!lower.endsWith('.abs')) return null;

  const namePart = lower.slice(0, -4); // remove ".abs"
  if (!namePart || namePart.endsWith('.')) return null;

  // Contract normalizes by ASCII-lowercasing only. Here we already lowercased,
  // so we just return it.
  return namePart;
}

async function ethCall(to: string, data: string): Promise<string> {
  const result = await ethereum.request({
    method: 'eth_call',
    params: [{ to, data }, 'latest'],
  });

  if (typeof result !== 'string') {
    throw new Error('Invalid eth_call result.');
  }
  return result;
}

export async function resolveAbsDomainToAddress(
  chainId: string,
  domain: string,
): Promise<{ address: string; domainName: string } | null> {
  const contract = ANS_V2_CONTRACT_BY_CHAIN[chainId];
  if (!contract) return null;

  const namePart = normalizeNamePartFromDomain(domain);
  if (!namePart) return null;

  const ownerData = encodeCall(
    SELECTOR_DOMAINS_STRING,
    encodeStringArg(namePart),
  );
  const owner = decodeAddressReturn(await ethCall(contract, ownerData)).toLowerCase();
  if (owner === ZERO_ADDRESS || owner === DEAD_ADDRESS) return null;

  const recordData = encodeCall(
    SELECTOR_RECORDS_STRING,
    encodeStringArg(namePart),
  );
  const record = decodeStringReturn(await ethCall(contract, recordData)).trim();

  const resolved = isHexAddress(record) ? record.toLowerCase() : owner;
  return { address: resolved, domainName: `${namePart}.abs` };
}

export async function reverseLookupAbsDomain(
  chainId: string,
  address: string,
): Promise<string | null> {
  const contract = ANS_V2_CONTRACT_BY_CHAIN[chainId];
  if (!contract) return null;
  if (!isHexAddress(address)) return null;

  const data = encodeCall(
    SELECTOR_GET_NAME_BY_ADDRESS,
    encodeAddressArg(address),
  );
  const namePart = decodeStringReturn(await ethCall(contract, data))
    .trim()
    .toLowerCase();

  return namePart ? `${namePart}.abs` : null;
}

