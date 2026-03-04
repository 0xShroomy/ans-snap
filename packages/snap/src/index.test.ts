import { expect, jest } from '@jest/globals';

import { onNameLookup } from '.';
import * as ans from './ans';

describe('onNameLookup', () => {
  it('exports a handler function', () => {
    expect(typeof onNameLookup).toBe('function');
  });

  it('returns null instead of throwing when domain lookup errors', async () => {
    const spy = jest
      .spyOn(ans, 'resolveAbsDomainToAddress')
      .mockRejectedValue(new Error('boom'));

    await expect(
      onNameLookup({
        chainId: 'eip155:2741',
        domain: 'alice.abs',
      } as never),
    ).resolves.toBeNull();

    spy.mockRestore();
  });

  it('returns null instead of throwing when reverse lookup errors', async () => {
    const spy = jest
      .spyOn(ans, 'reverseLookupAbsDomain')
      .mockRejectedValue(new Error('boom'));

    await expect(
      onNameLookup({
        chainId: 'eip155:2741',
        address: '0x0000000000000000000000000000000000000001',
      } as never),
    ).resolves.toBeNull();

    spy.mockRestore();
  });
});
