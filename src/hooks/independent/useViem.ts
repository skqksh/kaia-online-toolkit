import { NetworkType } from '@/types'
import { createPublicClient, http } from 'viem'
import { kaia, kairos, mainnet, sepolia } from 'viem/chains'

export type UseViemReturn = {
  client: ReturnType<typeof createPublicClient>
}

const chains = {
  ethereum: mainnet,
  sepolia,
  kaia,
  kairos,
}

export const useViem = ({
  network,
}: {
  network: NetworkType
}): UseViemReturn => {
  const client = createPublicClient({
    chain: chains[network],
    transport: http(),
  })

  return { client }
}
