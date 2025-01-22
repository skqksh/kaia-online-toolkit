import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { View } from '.'

type ContainerType = {
  children: ReactNode
}

const StyledContainer = styled(View)`
  padding: 20px;
  gap: 20px;
`

export const Container = ({ children }: ContainerType): ReactElement => {
  return <StyledContainer>{children}</StyledContainer>
}
