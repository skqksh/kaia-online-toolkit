import { ReactElement } from 'react'
import { KaText } from '@kaiachain/kaia-design-system'

import { Container, View, LinkA } from '@/components'
import { EIP } from '@/consts'

const ERC721 = (): ReactElement => {
  const data = EIP.list.find((item) => item.no === '721')

  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">
          ERC-721: Non-Fungible Token Standard
        </KaText>
        <LinkA link="https://eips.ethereum.org/EIPS/eip-721">
          {data?.summary}
        </LinkA>
      </View>
    </Container>
  )
}

export default ERC721
