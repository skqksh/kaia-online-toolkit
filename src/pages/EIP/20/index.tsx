import { ReactElement } from 'react'
import { KaText } from '@kaiachain/kaia-design-system'

import { Container, View, LinkA } from '@/components'

const ERC20 = (): ReactElement => {
  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">ERC-20: Token Standard</KaText>
        <LinkA link="https://eips.ethereum.org/EIPS/eip-20">
          A standard interface for tokens.
        </LinkA>
      </View>
    </Container>
  )
}

export default ERC20
