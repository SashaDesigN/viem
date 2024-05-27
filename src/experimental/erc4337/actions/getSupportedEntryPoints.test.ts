import { expect, test } from 'vitest'
import { altoMainnet } from '../../../../test/src/alto.js'
import { getSupportedEntryPoints } from './getSupportedEntryPoints.js'

const client = altoMainnet.getBundlerClient()

test('default', async () => {
  expect(await getSupportedEntryPoints(client)).toMatchInlineSnapshot(`
    [
      "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
    ]
  `)
})
