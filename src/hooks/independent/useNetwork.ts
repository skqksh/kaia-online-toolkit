import { useQuery } from '@tanstack/react-query'

import { LocalStorageKey } from '@/common'
import { EvmChainIdEnum } from '@/consts'
import { QueryKeyEnum } from '@/types'

export type UseNetworkReturn = {
  chainId: EvmChainIdEnum
  changeNetwork: (chainId: EvmChainIdEnum) => void
}

export const useNetwork = (): UseNetworkReturn => {
  const { data: chainId = EvmChainIdEnum.ETHEREUM, refetch } = useQuery({
    queryKey: [QueryKeyEnum.NETWORK],
    queryFn: async () => {
      return (localStorage.getItem(LocalStorageKey.NETWORK) ??
        EvmChainIdEnum.ETHEREUM) as EvmChainIdEnum
    },
  })

  const changeNetwork = (chainId: EvmChainIdEnum) => {
    localStorage.setItem(LocalStorageKey.NETWORK, chainId.toString())
    refetch()
  }

  return {
    chainId,
    changeNetwork,
  }
}
