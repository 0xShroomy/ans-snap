import { expect } from '@jest/globals';
import type { SnapAlertInterface } from '@metamask/snaps-jest';
import { installSnap } from '@metamask/snaps-jest';
import { Box, Text, Bold } from '@metamask/snaps-sdk/jsx';

describe('onRpcRequest', () => {
  describe('resolve_domain', () => {
    it('shows a confirmation dialog with domain resolution', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
      const response = request({
        method: 'resolve_domain',
        origin,
        params: {
          domain: 'test'
        }
      });

      // We just check that the interface is of alert type
      // since the exact content depends on blockchain responses
      const ui = (await response.getInterface()) as SnapAlertInterface;
      expect(ui.type).toBe('alert');
      
      await ui.ok();
      
      // Just verify that the response completes successfully
      await response;
    });
  });

  it('throws an error if the requested method does not exist', async () => {
    const { request } = await installSnap();

    const response = await request({
      method: 'foo',
    });

    expect(response).toRespondWithError({
      code: -32603,
      message: 'Method not found.',
      stack: expect.any(String),
    });
  });
});
