import { bench, describe } from 'vitest'

import {
  essentialProvider,
  ethersProvider,
  publicClient,
  web3Provider,
} from '../../_test'

import { getTransactionReceipt } from './getTransactionReceipt'

const hash =
  '0xa4b1f606b66105fa45cb5db23d2f6597075701e7f0e2367f4e6a39d17a8cf98b'

describe('Get Transaction Receipt', () => {
  bench('viem: `getTransactionReceipt`', async () => {
    await getTransactionReceipt(publicClient, {
      hash,
    })
  })

  bench('ethers: `getTransactionReceipt`', async () => {
    await ethersProvider.getTransactionReceipt(hash)
  })

  bench('web3.js: `getTransactionReceipt`', async () => {
    await web3Provider.eth.getTransactionReceipt(hash)
  })

  bench('essential-eth: `getTransactionReceipt`', async () => {
    await essentialProvider.getTransactionReceipt(hash)
  })
})
