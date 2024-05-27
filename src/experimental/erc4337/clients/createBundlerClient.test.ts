import { expect, test } from 'vitest'
import { altoMainnet } from '../../../../test/src/alto.js'
import { http } from '../../../clients/transports/http.js'
import { createBundlerClient } from './createBundlerClient.js'

test('creates', () => {
  const { uid, ...client } = createBundlerClient({
    transport: http(altoMainnet.rpcUrl.http),
  })

  expect(uid).toBeDefined()
  expect(client).toMatchInlineSnapshot(`
    {
      "account": undefined,
      "batch": undefined,
      "cacheTime": 4000,
      "ccipRead": undefined,
      "chain": undefined,
      "extend": [Function],
      "key": "bundler",
      "name": "Bundler Client",
      "pollingInterval": 4000,
      "request": [Function],
      "transport": {
        "fetchOptions": undefined,
        "key": "http",
        "name": "HTTP JSON-RPC",
        "request": [Function],
        "retryCount": 3,
        "retryDelay": 150,
        "timeout": 10000,
        "type": "http",
        "url": "http://localhost:4337",
      },
      "type": "bundlerClient",
    }
  `)
})

test('smoke', async () => {
  const client = createBundlerClient({
    transport: http(altoMainnet.rpcUrl.http),
  })

  const chainId = await client.request({ method: 'eth_chainId' })

  expect(chainId).toMatchInlineSnapshot(`"0x1"`)
})
