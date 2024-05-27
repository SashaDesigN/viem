import type { Address } from 'abitype'
import type { Client } from '../../../clients/createClient.js'
import type { Transport } from '../../../clients/transports/createTransport.js'
import type { ErrorType } from '../../../errors/utils.js'
import type { Account, GetAccountParameter } from '../../../types/account.js'
import type {
  Chain,
  DeriveChain,
  GetChainParameter,
} from '../../../types/chain.js'
import type { Hex } from '../../../types/misc.js'
import { getChainContractAddress } from '../../../utils/index.js'
import { formatUserOperationRequest } from '../formatters/userOperation.js'
import type { BundlerRpcSchema } from '../types/eip1193.js'
import type { UserOperationRequest } from '../types/userOperation.js'

export type SendUserOperationParameters<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>,
> = UserOperationRequest &
  GetAccountParameter<account> &
  GetChainParameter<chain, chainOverride> & {
    entrypoint070Address?: Address
  }

export type SendUserOperationReturnType = Hex

export type SendUserOperationErrorType = ErrorType

export async function sendUserOperation<
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
>(
  client: Client<Transport, chain, account, BundlerRpcSchema>,
  parameters: SendUserOperationParameters<chain, account, chainOverride>,
) {
  const {
    account: _account = client.account,
    callData,
    callGasLimit,
    chain = client.chain,
    entrypoint070Address: entrypoint070Address_,
    factory,
    factoryData,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    paymaster,
    paymasterData,
    paymasterPostOpGasLimit,
    paymasterVerificationGasLimit,
    preVerificationGas,
    sender,
    signature,
    verificationGasLimit,
  } = parameters

  const entrypoint070Address = (() => {
    if (entrypoint070Address_) return entrypoint070Address_
    if (!chain)
      throw new Error(
        'client chain not configured. entrypoint070Address is required.',
      )
    return getChainContractAddress({
      chain,
      contract: 'entrypoint070',
    })
  })()

  const rpcParameters = formatUserOperationRequest({
    callData,
    callGasLimit,
    factory,
    factoryData,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    paymaster,
    paymasterData,
    paymasterPostOpGasLimit,
    paymasterVerificationGasLimit,
    preVerificationGas,
    sender,
    signature,
    verificationGasLimit,
  })

  try {
    return await client.request({
      method: 'eth_sendUserOperation',
      params: [rpcParameters, entrypoint070Address],
    })
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: TODO – `getUserOperationError`
    throw error
  }
}
