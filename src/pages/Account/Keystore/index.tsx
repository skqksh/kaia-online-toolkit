import { ReactElement } from 'react'
import styled from 'styled-components'
import { KaText } from '@kaiachain/kaia-design-system'

import { View } from '@/components'

const StyledContainer = styled(View)``

const Keystore = (): ReactElement => {
  return (
    <StyledContainer>
      <KaText fontType="body/lg_700">Keystore</KaText>
    </StyledContainer>
  )
}

export default Keystore
