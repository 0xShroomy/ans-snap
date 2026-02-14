import { expect } from '@jest/globals';

import { onNameLookup } from './index';

describe('onNameLookup', () => {
  it('exports a handler function', () => {
    expect(typeof onNameLookup).toBe('function');
  });
});

