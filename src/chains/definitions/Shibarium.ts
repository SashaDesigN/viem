import { defineChain } from '../../utils/chain/defineChain.js'

export const shibarium = /*#__PURE__*/ defineChain({
  id: 109,
  name: 'Shibarium',
  nativeCurrency: { name: 'BONE', symbol: 'BONE', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://www.shibrpc.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'ShibariumScan',
      url: 'https://www.shibariumscan.io',
      apiUrl: 'https://www.shibariumscan.io/api/v2',
    },
  },
  contracts: {
    multicall3: {
      address: '0x5f6f2cdcc65D37FacDF5F6022ed3EF75EF4E580a',
      blockCreated: 4591103,
    },
  },
})
