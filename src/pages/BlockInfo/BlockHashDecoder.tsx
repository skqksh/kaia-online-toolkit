import { ReactElement } from 'react'

import { useQuery } from '@tanstack/react-query'
import { KaText } from '@kaiachain/kaia-design-system'

import { useNetwork, useViem } from '@/hooks'
import { View } from '@/components'

const BlockHashDecoder = (): ReactElement => {
  const { network } = useNetwork()
  const { client } = useViem({ network })
  const { data = 0n } = useQuery({
    queryKey: ['Block'],
    queryFn: async () => client.getBlockNumber(),
    refetchInterval: 1000,
  })

  return (
    <View>
      <KaText fontType="body/lg_400">{data?.toString()}</KaText>
    </View>
  )
}

export default BlockHashDecoder
