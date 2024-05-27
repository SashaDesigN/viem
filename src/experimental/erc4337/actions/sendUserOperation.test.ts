import { test } from 'vitest'
import { altoMainnet } from '../../../../test/src/alto.js'
import { anvilMainnet } from '../../../../test/src/anvil.js'
import { estimateFeesPerGas } from '../../../actions/index.js'
import { sendUserOperation } from './sendUserOperation.js'

const client = anvilMainnet.getClient()
const bundlerClient = altoMainnet.getBundlerClient()

test('default', async () => {
  const fees = await estimateFeesPerGas(client)
  await sendUserOperation(bundlerClient, {
    ...fees,
    account: '0x',
    callData: '0x',
  })
})
