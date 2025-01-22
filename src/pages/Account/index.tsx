import { ReactElement } from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router'

import { SideMenu, View } from '@/components'
import { RoutePath } from '@/types'

const StyledContainer = styled(View)`
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 100dvh;
`

const subMenuList = [
  {
    title: 'Account',
    to: RoutePath.Account,
  },
  {
    title: 'Mnemonic',
    to: RoutePath.Account_Mnemonic,
  },
  {
    title: 'Keystore',
    to: RoutePath.Account_Keystore,
  },
  {
    title: 'AccountKeyPublic',
    isKaiaOnly: true,
    to: RoutePath.Account_AccountKeyPublic,
  },
  {
    title: 'AccountKeyFail',
    isKaiaOnly: true,
    to: RoutePath.Account_AccountKeyFail,
  },
  {
    title: 'AccountKeyWeightedMultiSig',
    isKaiaOnly: true,
    to: RoutePath.Account_AccountKeyWeightedMultiSig,
  },
  {
    title: 'AccountKeyRoleBased',
    isKaiaOnly: true,
    to: RoutePath.Account_AccountKeyRoleBased,
  },
  {
    title: 'KeystoreV4',
    isKaiaOnly: true,
    to: RoutePath.Account_KeystoreV4,
  },
]

const Account = (): ReactElement => {
  return (
    <StyledContainer>
      <SideMenu menuList={subMenuList} />
      <View style={{ width: 700, margin: '0 auto' }}>
        <Outlet />
      </View>
    </StyledContainer>
  )
}

export default Account
