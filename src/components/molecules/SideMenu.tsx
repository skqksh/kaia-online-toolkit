import { ReactElement } from 'react'
import styled from 'styled-components'
import { KaText, themeFunc, useKaTheme } from '@kaiachain/kaia-design-system'
import { useLocation } from 'react-router'

import kaiaImg from '@/images/kaia.svg'

import { Row, View } from '@/components'
import { RoutePath } from '@/types'
import { useAppNavigate } from '@/hooks'

const StyledContainer = styled(View)`
  min-width: 300px;
  padding: 20px;
  align-items: flex-start;
  background-color: ${themeFunc('gray', '10')};
  border-top: 2px solid ${themeFunc('gray', '8')};
`

const StyledSubMenuItem = styled(View)`
  cursor: pointer;
  height: 36px;
  justify-content: center;
`

const StyledSubHeightBar = styled(View)`
  height: 2px;
  background-color: ${themeFunc('gray', '2')};
  border-radius: 360px;
`

const SubMenuItem = ({
  title,
  to,
  isKaiaOnly,
}: {
  title: string
  to: RoutePath
  isKaiaOnly?: boolean
}) => {
  const { pathname } = useLocation()
  const isCurrent = pathname === to
  const { getTheme } = useKaTheme()
  const { navigate } = useAppNavigate()

  return (
    <StyledSubMenuItem onClick={() => navigate(to)}>
      <Row style={{ flex: 1, alignItems: 'center', gap: 4 }}>
        <KaText
          color={isCurrent ? getTheme('gray', '2') : getTheme('gray', '5')}
          fontType={isCurrent ? 'body/md_700' : 'body/md_400'}
        >
          {title}
        </KaText>
        {isKaiaOnly && <img src={kaiaImg} style={{ width: 20 }} />}
      </Row>
      {isCurrent && <StyledSubHeightBar />}
    </StyledSubMenuItem>
  )
}
export const SideMenu = ({
  menuList,
}: {
  menuList: {
    title: string
    to: RoutePath
    isKaiaOnly?: boolean
  }[]
}): ReactElement => {
  return (
    <StyledContainer>
      {menuList.map((item) => (
        <SubMenuItem
          key={item.title}
          title={item.title}
          to={item.to}
          isKaiaOnly={item.isKaiaOnly}
        />
      ))}
    </StyledContainer>
  )
}
