import type { Address } from 'abitype'
import type { Transport } from '../../../clients/transports/createTransport.js'
import { AccountNotFoundError } from '../../../errors/account.js'
import type { ErrorType } from '../../../errors/utils.js'
import type { Account, GetAccountParameter } from '../../../types/account.js'
import type {
  Chain,
  DeriveChain,
  GetChainParameter,
} from '../../../types/chain.js'
import type { Hex } from '../../../types/misc.js'
import { parseAccount } from '../../../utils/accounts.js'
import { getChainContractAddress } from '../../../utils/chain/getChainContractAddress.js'
import type { BundlerClient } from '../clients/createBundlerClient.js'
import { formatUserOperationRequest } from '../formatters/userOperation.js'
import type { UserOperationRequest } from '../types/userOperation.js'
import type { ERC4337Version, GetVersionParameter } from '../types/version.js'

export type SendUserOperationParameters<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  version extends ERC4337Version | undefined = ERC4337Version | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  versionOverride extends ERC4337Version | undefined =
    | ERC4337Version
    | undefined,
  _derivedChain extends Chain | undefined = DeriveChain<chain, chainOverride>,
> = UserOperationRequest<'0.7.0'> &
  GetAccountParameter<account> &
  GetChainParameter<chain, chainOverride> &
  GetVersionParameter<version, versionOverride> & {
    entryPointAddress?: Address
  }

export type SendUserOperationReturnType = Hex

export type SendUserOperationErrorType = ErrorType

export async function sendUserOperation<
  chain extends Chain | undefined,
  account extends Account | undefined,
  erc4337Version extends ERC4337Version | undefined,
  chainOverride extends Chain | undefined = undefined,
  erc4337VersionOverride extends ERC4337Version | undefined = undefined,
>(
  client: BundlerClient<Transport, chain, account, erc4337Version>,
  parameters: SendUserOperationParameters<
    chain,
    account,
    erc4337Version,
    chainOverride,
    erc4337VersionOverride
  >,
) {
  const {
    account: account_ = client.account,
    callData,
    callGasLimit,
    chain = client.chain,
    entryPointAddress: entryPointAddress_,
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

  if (!account_ && !sender)
    throw new AccountNotFoundError({
      docsPath: '/docs/actions/wallet/sendTransaction',
    })
  const account = parseAccount(account_! || sender!)

  const entryPointAddress = (() => {
    if (entryPointAddress_) return entryPointAddress_
    if (!chain)
      throw new Error(
        'client chain not configured. entryPointAddress is required.',
      )
    return getChainContractAddress({
      chain,
      contract: 'entryPoint070',
    })
  })()

  // TODO: `prepareUserOperationRequest`

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
    sender: account.address,
    signature,
    verificationGasLimit,
  })

  try {
    return await client.request({
      method: 'eth_sendUserOperation',
      params: [rpcParameters, entryPointAddress],
    })
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: TODO – `getUserOperationError`
    throw error
  }
}
