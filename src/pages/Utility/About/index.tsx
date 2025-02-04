import { ReactElement } from 'react'
import { KaText } from '@kaiachain/kaia-design-system'

import { Container, View } from '@/components'

const About = (): ReactElement => {
  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">About Utility</KaText>
      </View>
    </Container>
  )
}

export default About
