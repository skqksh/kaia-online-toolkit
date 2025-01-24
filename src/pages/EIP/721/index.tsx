import { ReactElement } from 'react'
import { KaText } from '@kaiachain/kaia-design-system'

import { Container, View, LinkA } from '@/components'

const ERC721 = (): ReactElement => {
  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">
          ERC-721: Non-Fungible Token Standard
        </KaText>
        <LinkA link="https://eips.ethereum.org/EIPS/eip-721">
          A standard interface for non-fungible tokens, also known as deeds.
        </LinkA>
      </View>
    </Container>
  )
}

export default ERC721
