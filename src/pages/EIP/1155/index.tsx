import { ReactElement } from 'react'
import { KaText } from '@kaiachain/kaia-design-system'

import { Container, View, LinkA } from '@/components'

const ERC1155 = (): ReactElement => {
  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">ERC-1155: Multi Token Standard</KaText>
        <LinkA link="https://eips.ethereum.org/EIPS/eip-1155">
          A standard interface for contracts that manage multiple token types. A
          single deployed contract may include any combination of fungible
          tokens, non-fungible tokens or other configurations (e.g.
          semi-fungible tokens).
        </LinkA>
      </View>
    </Container>
  )
}

export default ERC1155
