import type { IsUndefined } from '../../../types/utils.js'

/** @link https://github.com/eth-infinitism/account-abstraction/releases */
export type ERC4337Version = '0.0.0' | '0.7.0'

export type DeriveVersion<
  version extends ERC4337Version | undefined,
  versionOverride extends ERC4337Version | undefined,
> = versionOverride extends ERC4337Version
  ? versionOverride
  : version extends ERC4337Version
    ? version
    : ERC4337Version

export type GetVersionParameter<
  version extends ERC4337Version | undefined,
  versionOverride extends ERC4337Version | undefined =
    | ERC4337Version
    | undefined,
> = IsUndefined<version> extends true
  ? { version: versionOverride | ERC4337Version | null }
  : { version?: versionOverride | ERC4337Version | null | undefined }
