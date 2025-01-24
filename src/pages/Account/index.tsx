import { ReactElement } from 'react'

import { PageContainer } from '@/components'
import { RoutePath } from '@/types'

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
    title: 'KeystoreV3',
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
  return <PageContainer menuList={subMenuList} />
}

export default Account
