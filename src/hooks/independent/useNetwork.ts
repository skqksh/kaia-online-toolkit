import { LocalStorageKey } from '@/common'
import { NetworkType, QueryKeyEnum } from '@/types'
import { useQuery } from '@tanstack/react-query'

export type UseNetworkReturn = {
  network: NetworkType
  changeNetwork: (network: NetworkType) => void
}

export const useNetwork = (): UseNetworkReturn => {
  const { data: network = 'ethereum', refetch } = useQuery({
    queryKey: [QueryKeyEnum.NETWORK],
    queryFn: async () => {
      return (localStorage.getItem(LocalStorageKey.NETWORK) ??
        'ethereum') as NetworkType
    },
  })

  const changeNetwork = (network: NetworkType) => {
    localStorage.setItem(LocalStorageKey.NETWORK, network)
    refetch()
  }

  return {
    network,
    changeNetwork,
  }
}
