import type { Address } from 'abitype'
import type { Client } from '../../../clients/createClient.js'
import type { Transport } from '../../../clients/transports/createTransport.js'
import type { ErrorType } from '../../../errors/utils.js'
import type { Account } from '../../../types/account.js'
import type { Chain } from '../../../types/chain.js'
import type { BundlerRpcSchema } from '../types/eip1193.js'

export type GetSupportedEntryPointsReturnType = readonly Address[]
export type GetSupportedEntryPointsErrorType = ErrorType

export function getSupportedEntryPoints(
  client: Client<
    Transport,
    Chain | undefined,
    Account | undefined,
    BundlerRpcSchema
  >,
) {
  return client.request({ method: 'eth_supportedEntryPoints' })
}
