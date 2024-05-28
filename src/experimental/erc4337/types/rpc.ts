import type { Hex } from '../../../types/misc.js'
import type {
  EstimateUserOperationGasReturnType,
  GetUserOperationByHashReturnType,
  UserOperation,
  UserOperationReceipt,
  UserOperationRequest,
} from './userOperation.js'
import type { ERC4337Version } from './version.js'

export type RpcEstimateUserOperationGasReturnType<
  erc4337Version extends ERC4337Version = ERC4337Version,
> = EstimateUserOperationGasReturnType<erc4337Version, Hex>

export type RpcGetUserOperationByHashReturnType<
  erc4337Version extends ERC4337Version = ERC4337Version,
> = GetUserOperationByHashReturnType<erc4337Version, Hex>

export type RpcUserOperation<
  erc4337Version extends ERC4337Version = ERC4337Version,
> = UserOperation<erc4337Version, Hex>

export type RpcUserOperationReceipt<
  erc4337Version extends ERC4337Version = ERC4337Version,
> = UserOperationReceipt<erc4337Version, Hex, Hex>

export type RpcUserOperationRequest<
  erc4337Version extends ERC4337Version = ERC4337Version,
> = UserOperationRequest<erc4337Version, Hex>
