import { useEffect, useState } from 'react'
import type { PublicClient } from 'viem/clients'
import { getBalance } from 'viem/public'

export function GetBalance({
  address = '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  client,
}: {
  address?: `0x${string}`
  client: PublicClient
}) {
  const [balance, setBalance] = useState<bigint>()
  useEffect(() => {
    ;(async () => {
      setBalance(
        await getBalance(client, {
          address,
        }),
      )
    })()
  }, [address, client])
  return <div>Balance: {balance?.toString()} wei</div>
}
