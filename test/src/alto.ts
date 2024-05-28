import { resolve } from 'node:path'
import { execa } from 'execa'
import { mainnet } from '../../src/chains/index.js'
import type {
  BundlerClient,
  BundlerClientConfig,
} from '../../src/experimental/erc4337/clients/createBundlerClient.js'
import {
  http,
  type Account,
  type Address,
  type Chain,
  type Client,
  type ClientConfig,
  type ExactPartial,
  type ParseAccount,
  type Transport,
  createClient,
} from '../../src/index.js'
import { anvilMainnet } from './anvil.js'
import { accounts } from './constants.js'

export const altoMainnet = defineAlto({
  chain: mainnet,
  rpcUrl: anvilMainnet.rpcUrl.http,
  port: 4337,
})

////////////////////////////////////////////////////////////
// Utilities

type DefineAltoParameters<chain extends Chain> = {
  chain: chain
  rpcUrl: string
  port: number
}

type DefineAltoReturnType<chain extends Chain> = {
  chain: chain
  clientConfig: BundlerClientConfig<Transport, chain, undefined>
  getBundlerClient<
    config extends ExactPartial<
      Omit<BundlerClientConfig, 'chain'> & {
        chain?: false | undefined
      }
    >,
  >(
    config?: config | undefined,
  ): BundlerClient<
    config['transport'] extends Transport ? config['transport'] : Transport,
    config['chain'] extends false ? undefined : chain,
    undefined,
    config['erc4337Version'],
    undefined
  >
  rpcUrl: {
    http: string
  }
  start(): Promise<() => void>
}

function defineAlto<const chain extends Chain>({
  chain: chain_,
  port,
  rpcUrl,
}: DefineAltoParameters<chain>): DefineAltoReturnType<chain> {
  const chain = {
    ...chain_,
    name: `${chain_.name} (Local)`,
    rpcUrls: {
      default: {
        http: [rpcUrl],
      },
    },
  } as const satisfies Chain

  const clientConfig = {
    batch: {
      multicall: process.env.VITE_BATCH_MULTICALL === 'true',
    },
    chain,
    pollingInterval: 100,
    transport(args) {
      return http(`http://localhost:${port}`)(args)
    },
  } as const satisfies ClientConfig

  return {
    chain,
    clientConfig,
    getBundlerClient(config) {
      return createClient({
        ...clientConfig,
        ...config,
        chain: config?.chain === false ? undefined : chain,
        transport: clientConfig.transport,
      }) as any as never
    },
    rpcUrl: {
      http: `http://localhost:${port}`,
    },
    async start() {
      // Start Bundler node.
      return new Promise((res, rej) => {
        const process = execa('node', [
          resolve(
            import.meta.dirname,
            '../../node_modules/@wevm/alto/lib/cli/alto.js',
          ),
          'run',
          '--entrypoints',
          '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
          '--entrypoint-simulation-contract',
          '0x74Cb5e4eE81b86e70f9045036a1C5477de69eE87',
          '--executor-private-keys',
          accounts[0].privateKey,
          '--rpc-url',
          rpcUrl,
          '--port',
          port.toString(),
        ])
        process.stdout.on('data', (data) => {
          const message = data.toString()
          if (message.includes('Server listening')) res(() => process.kill())
        })
        process.stderr.on('data', (data) => {
          rej(new Error(`Failed to start bundler: ${data.toString()}`))
          process.kill()
        })
      })
    },
  } as const
}
