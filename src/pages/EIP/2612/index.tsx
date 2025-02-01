import { ReactElement } from 'react'
import { KaText } from '@kaiachain/kaia-design-system'

import { Container, View, LinkA } from '@/components'
import { EIP } from '@/consts'

const EIP2612 = (): ReactElement => {
  const data = EIP.list.find((item) => item.no === '2612')

  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">
          ERC-2612: Permit Extension for EIP-20 Signed Approvals
        </KaText>
        <LinkA link="https://eips.ethereum.org/EIPS/eip-2612">
          {data?.summary}
        </LinkA>
      </View>
    </Container>
  )
}

export default EIP2612
