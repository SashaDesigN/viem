// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type BundlerClient,
  type BundlerClientConfig,
  type CreateBundlerClientErrorType,
  createBundlerClient,
} from './erc4337/clients/createBundlerClient.js'
export {
  type BundlerActions,
  bundlerActions,
} from './erc4337/clients/decorators/bundler.js'
export type { BundlerRpcSchema } from './erc4337/types/eip1193.js'
export type {
  RpcEstimateUserOperationGasReturnType,
  RpcGetUserOperationByHashReturnType,
  RpcUserOperation,
  RpcUserOperationReceipt,
} from './erc4337/types/rpc.js'
export type {
  EstimateUserOperationGasReturnType,
  GetUserOperationByHashReturnType,
  PackedUserOperation,
  UserOperation,
  UserOperationReceipt,
} from './erc4337/types/userOperation.js'

export {
  type GetCapabilitiesParameters,
  type GetCapabilitiesErrorType,
  type GetCapabilitiesReturnType,
  getCapabilities,
} from './eip5792/actions/getCapabilities.js'
export {
  type SendCallsErrorType,
  type SendCallsParameters,
  type SendCallsReturnType,
  sendCalls,
} from './eip5792/actions/sendCalls.js'
export {
  type GetCallsStatusErrorType,
  type GetCallsStatusParameters,
  type GetCallsStatusReturnType,
  getCallsStatus,
} from './eip5792/actions/getCallsStatus.js'
export {
  type ShowCallsStatusErrorType,
  type ShowCallsStatusParameters,
  type ShowCallsStatusReturnType,
  showCallsStatus,
} from './eip5792/actions/showCallsStatus.js'
export {
  type WriteContractsErrorType,
  type WriteContractsParameters,
  type WriteContractsReturnType,
  writeContracts,
} from './eip5792/actions/writeContracts.js'
export {
  type WalletActionsEip5792,
  walletActionsEip5792,
} from './eip5792/decorators/eip5792.js'

export {
  type ParseErc6492SignatureErrorType,
  type ParseErc6492SignatureParameters,
  type ParseErc6492SignatureReturnType,
  parseErc6492Signature,
} from './erc6492/parseErc6492Signature.js'
export {
  type IsErc6492SignatureErrorType,
  type IsErc6492SignatureParameters,
  type IsErc6492SignatureReturnType,
  isErc6492Signature,
} from './erc6492/isErc6492Signature.js'
export {
  type SerializeErc6492SignatureErrorType,
  type SerializeErc6492SignatureParameters,
  type SerializeErc6492SignatureReturnType,
  serializeErc6492Signature,
} from './erc6492/serializeErc6492Signature.js'

export {
  type IssuePermissionsParameters,
  type IssuePermissionsReturnType,
  issuePermissions,
} from './erc7115/actions/issuePermissions.js'
export {
  type WalletActionsErc7115,
  walletActionsErc7115,
} from './erc7115/decorators/erc7115.js'
