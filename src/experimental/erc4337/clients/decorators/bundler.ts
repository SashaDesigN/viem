import type { Address } from 'abitype'
import {
  type GetChainIdReturnType,
  getChainId,
} from '../../../../actions/public/getChainId.js'
import type { Client } from '../../../../clients/createClient.js'
import type { Transport } from '../../../../clients/transports/createTransport.js'
import type { Chain } from '../../../../types/chain.js'

export type BundlerActions = {
  /**
   * Returns the chain ID associated with the bundler.
   *
   * - Docs: https://viem.sh/docs/actions/public/getChainId
   * - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid)
   *
   * @returns The current chain ID. {@link GetChainIdReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'viem'
   * import { mainnet } from 'viem/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const chainId = await client.getChainId()
   * // 1
   */
  getChainId: () => Promise<GetChainIdReturnType>
}

export type BundlerActionsParameters = {
  entryPoint: Address
}

export function bundlerActions() {
  return <
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
  >(
    client: Client<transport, chain>,
  ): BundlerActions => {
    return {
      getChainId: () => getChainId(client),
    }
  }
}
