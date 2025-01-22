import { ReactElement } from 'react'
import styled from 'styled-components'

import { Card, View } from '@/components'
import { KaText, themeFunc } from '@kaiachain/kaia-design-system'

const StyledContainer = styled(View)``

const StyledItemBox = styled(View)`
  padding: '8px 16px';
  background-color: ${themeFunc('elevation', '10')};
`

const Landing = (): ReactElement => {
  return (
    <StyledContainer>
      <Card>
        <KaText fontType="body/lg_700">Kaia Toolkit</KaText>
        <StyledItemBox></StyledItemBox>
      </Card>
    </StyledContainer>
  )
}

export default Landing
