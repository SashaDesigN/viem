import { parseAbi } from 'abitype'
import { expect, test } from 'vitest'
import { simpleAccountFactoryAbi } from '../../../../test/src/abis.js'
import { altoMainnet } from '../../../../test/src/alto.js'
import { anvilMainnet } from '../../../../test/src/anvil.js'
import {
  accounts,
  simpleAccountFactoryAddress,
} from '../../../../test/src/constants.js'
import { mine, readContract, writeContract } from '../../../actions/index.js'
import { encodeFunctionData } from '../../../utils/index.js'
import { estimateUserOperationGas } from './estimateUserOperationGas.js'

const client = anvilMainnet.getClient({ account: true })
const bundlerClient = altoMainnet.getBundlerClient({ erc4337Version: '0.7.0' })

const signerAddress = accounts[1].address

test('default', async () => {
  const salt = BigInt(Math.floor(Math.random() * 1000000))

  await writeContract(client, {
    address: simpleAccountFactoryAddress,
    abi: simpleAccountFactoryAbi,
    functionName: 'createAccount',
    args: [signerAddress, salt],
  })
  await mine(client, {
    blocks: 1,
  })

  const address = await readContract(client, {
    abi: simpleAccountFactoryAbi,
    address: simpleAccountFactoryAddress,
    functionName: 'getAddress',
    args: [signerAddress, salt],
  })

  const nonce = await readContract(client, {
    abi: parseAbi(['function getNonce() pure returns (uint256)']),
    address,
    functionName: 'getNonce',
  })

  const callData = encodeFunctionData({
    abi: parseAbi(['function execute(address, uint256, bytes)']),
    functionName: 'execute',
    args: ['0x0000000000000000000000000000000000000000', 0n, '0x'],
  })

  const dummySignature =
    '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c'

  expect(
    await estimateUserOperationGas(bundlerClient, {
      account: address,
      callData,
      nonce,
      signature: dummySignature,
    }),
  ).toMatchInlineSnapshot(`
    {
      "callGasLimit": "0x13880",
      "paymasterPostOpGasLimit": "0x0",
      "paymasterVerificationGasLimit": "0x0",
      "preVerificationGas": "0xc5b5",
      "verificationGasLimit": "0x1a12a",
    }
  `)
})

test('args: factory + factoryData', async () => {
  const salt = BigInt(Math.floor(Math.random() * 1000000))

  const address = await readContract(client, {
    abi: simpleAccountFactoryAbi,
    address: simpleAccountFactoryAddress,
    functionName: 'getAddress',
    args: [signerAddress, salt],
  })

  const callData = encodeFunctionData({
    abi: parseAbi(['function execute(address, uint256, bytes)']),
    functionName: 'execute',
    args: ['0x0000000000000000000000000000000000000000', 0n, '0x'],
  })

  const dummySignature =
    '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c'

  expect(
    await estimateUserOperationGas(bundlerClient, {
      account: address,
      callData,
      factory: simpleAccountFactoryAddress,
      factoryData: encodeFunctionData({
        abi: simpleAccountFactoryAbi,
        functionName: 'createAccount',
        args: [signerAddress, salt],
      }),
      signature: dummySignature,
    }),
  ).toMatchInlineSnapshot(`
    {
      "callGasLimit": "0x13880",
      "paymasterPostOpGasLimit": "0x0",
      "paymasterVerificationGasLimit": "0x0",
      "preVerificationGas": "0xc9ef",
      "verificationGasLimit": "0x5302f",
    }
  `)
})

test('args: version', async () => {
  const bundlerClient = altoMainnet.getBundlerClient()
  const salt = BigInt(Math.floor(Math.random() * 1000000))

  const address = await readContract(client, {
    abi: simpleAccountFactoryAbi,
    address: simpleAccountFactoryAddress,
    functionName: 'getAddress',
    args: [signerAddress, salt],
  })

  const callData = encodeFunctionData({
    abi: parseAbi(['function execute(address, uint256, bytes)']),
    functionName: 'execute',
    args: ['0x0000000000000000000000000000000000000000', 0n, '0x'],
  })

  const dummySignature =
    '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c'

  expect(
    await estimateUserOperationGas(bundlerClient, {
      account: address,
      callData,
      factory: simpleAccountFactoryAddress,
      factoryData: encodeFunctionData({
        abi: simpleAccountFactoryAbi,
        functionName: 'createAccount',
        args: [signerAddress, salt],
      }),
      signature: dummySignature,
      version: '0.7.0',
    }),
  ).toMatchInlineSnapshot(`
    {
      "callGasLimit": "0x13880",
      "paymasterPostOpGasLimit": "0x0",
      "paymasterVerificationGasLimit": "0x0",
      "preVerificationGas": "0xc9ef",
      "verificationGasLimit": "0x5302f",
    }
  `)
})
