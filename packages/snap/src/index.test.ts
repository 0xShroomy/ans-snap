import { expect } from '@jest/globals';

import { onNameLookup } from '.';

describe('onNameLookup', () => {
  it('exports a handler function', () => {
    expect(typeof onNameLookup).toBe('function');
  });
});
