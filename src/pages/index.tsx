import { RouteObject } from 'react-router'

import { RoutePath } from '@/types'

import HomePage from './Home'
import LandingPage from './Landing'

import AccountPage from './Account'
import Account_BasicPage from './Account/Basic'
import Account_MnemonicPage from './Account/Mnemonic'
import Account_KeystorePage from './Account/Keystore'

export default [
  {
    path: RoutePath.Home,
    Component: HomePage,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: RoutePath.Account,
        Component: AccountPage,
        children: [
          {
            index: true,
            Component: Account_BasicPage,
          },
          {
            path: RoutePath.Account_Mnemonic,
            Component: Account_MnemonicPage,
          },
          {
            path: RoutePath.Account_Keystore,
            Component: Account_KeystorePage,
          },
        ],
      },
    ],
  },
] as RouteObject[]
