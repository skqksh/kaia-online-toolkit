import { ReactElement } from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router'
import { KaText, themeFunc, useKaTheme } from '@kaiachain/kaia-design-system'
import { useLocation } from 'react-router'

import kaiaImg from '@/images/kaia.svg'

import { Row, View } from '@/components'
import { useAppNavigate } from '@/hooks'
import { RoutePath } from '@/types'

export type SideMenuListType = {
  title: string
  to: RoutePath
  isKaiaOnly?: boolean
}[]

const StyledContainer = styled(View)`
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 100dvh;
`

const StyledBody = styled(View)`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
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

const StyledSubMenu = styled(View)`
  padding: 20px;
  align-items: flex-start;
  background-color: ${themeFunc('gray', '10')};
  border-top: 2px solid ${themeFunc('gray', '8')};
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
const SideMenu = ({
  menuList,
}: {
  menuList: {
    title: string
    to: RoutePath
    isKaiaOnly?: boolean
  }[]
}): ReactElement => {
  return (
    <StyledSubMenu>
      {menuList.map((item) => (
        <SubMenuItem
          key={item.title}
          title={item.title}
          to={item.to}
          isKaiaOnly={item.isKaiaOnly}
        />
      ))}
    </StyledSubMenu>
  )
}

export const PageContainer = ({
  menuList,
}: {
  menuList: SideMenuListType
}): ReactElement => {
  return (
    <StyledContainer>
      <SideMenu menuList={menuList} />
      <StyledBody>
        <Outlet />
      </StyledBody>
    </StyledContainer>
  )
}
