import type { Hex } from '../../../types/misc.js'
import type {
  EstimateUserOperationGasReturnType,
  GetUserOperationByHashReturnType,
  UserOperation,
  UserOperationReceipt,
  UserOperationRequest,
} from './userOperation.js'

export type RpcEstimateUserOperationGasReturnType =
  EstimateUserOperationGasReturnType<Hex>
export type RpcGetUserOperationByHashReturnType =
  GetUserOperationByHashReturnType<Hex>
export type RpcUserOperation = UserOperation<Hex>
export type RpcUserOperationReceipt = UserOperationReceipt<Hex, Hex>
export type RpcUserOperationRequest = UserOperationRequest<Hex>
