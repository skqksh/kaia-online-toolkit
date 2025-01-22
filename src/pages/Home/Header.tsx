import { ReactElement } from 'react'
import styled from 'styled-components'
import {
  KaSelectBox,
  KaText,
  themeFunc,
  useKaTheme,
} from '@kaiachain/kaia-design-system'

import kaiaBrandImg from '@/images/kaia_brand.svg'

import { Row, View } from '@/components'
import { NetworkType, RoutePath } from '@/types'
import { useAppNavigate, useNetwork } from '@/hooks'
import { useLocation } from 'react-router'

const StyledContainer = styled(View)`
  background-color: ${themeFunc('gray', '10')};
`

const StyledMainNav = styled(Row)`
  padding: 16px 24px;
  justify-content: space-between;
`

const StyledText = styled(View)`
  color: white;
  text-align: center;
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
`

const StyledMenuItem = styled(View)`
  cursor: pointer;
  height: 40px;
  justify-content: center;
`

const StyledHeightBar = styled(View)`
  height: 2px;
  background-color: ${themeFunc('brand', '5')};
  border-radius: 360px;
`

const networkOptionList: { label: string; value: NetworkType }[] = [
  {
    label: 'Ethereum (1)',
    value: 'ethereum',
  },
  {
    label: 'Sepolia (11155111)',
    value: 'sepolia',
  },
  {
    label: 'Kaia (8217)',
    value: 'kaia',
  },
  {
    label: 'Kairos (1001)',
    value: 'kairos',
  },
]

const menuList: {
  title: string
  to: RoutePath
}[] = [
  {
    title: 'Account',
    to: RoutePath.Account,
  },
  {
    title: 'ERC',
    to: RoutePath.ERC,
  },
]

const MenuItem = ({ title, to }: { title: string; to: RoutePath }) => {
  const { pathname } = useLocation()
  const isCurrent = pathname.includes(to)
  const { getTheme } = useKaTheme()
  const { navigate } = useAppNavigate()

  return (
    <StyledMenuItem onClick={() => navigate(to)}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <KaText
          color={isCurrent ? getTheme('brand', '5') : getTheme('gray', '2')}
          fontType={isCurrent ? 'body/md_700' : 'body/md_400'}
        >
          {title}
        </KaText>
      </View>
      {isCurrent && <StyledHeightBar />}
    </StyledMenuItem>
  )
}

const Header = (): ReactElement => {
  const { network, changeNetwork } = useNetwork()

  return (
    <StyledContainer>
      <StyledMainNav>
        <View style={{ justifyContent: 'center' }}>
          <Row style={{ alignItems: 'baseline', gap: 6.2 }}>
            <img src={kaiaBrandImg} alt="logo" style={{ height: 16 }} />
            <StyledText>Toolkit</StyledText>
          </Row>
        </View>
        <Row style={{ gap: 20 }}>
          {menuList.map((menu) => (
            <MenuItem key={menu.title} title={menu.title} to={menu.to} />
          ))}
          <View>Community</View>
          <View>Kaia </View>
        </Row>
        <KaSelectBox
          containerStyle={{ maxWidth: 200 }}
          selectedValue={network}
          optionList={networkOptionList}
          onSelect={(value) => {
            changeNetwork(value as NetworkType)
          }}
        />
      </StyledMainNav>
    </StyledContainer>
  )
}

export default Header
