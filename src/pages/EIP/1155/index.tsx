import { ReactElement } from 'react'
import { KaText } from '@kaiachain/kaia-design-system'

import { Container, View, LinkA } from '@/components'
import { EIP } from '@/consts'

const ERC1155 = (): ReactElement => {
  const data = EIP.list.find((item) => item.no === '1155')

  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">ERC-1155: Multi Token Standard</KaText>
        <LinkA link="https://eips.ethereum.org/EIPS/eip-1155">
          {data?.summary}
        </LinkA>
      </View>
    </Container>
  )
}

export default ERC1155
