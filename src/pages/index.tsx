import { RoutePath } from '@/types'

import HomePage from './Home'
import LandingPage from './Landing'

import AccountPage from './Account'
import Account_BasicPage from './Account/Basic'
import Account_MnemonicPage from './Account/Mnemonic'
import Account_KeystorePage from './Account/Keystore'

import EIPPage from './EIP'
import EIP_AboutPage from './EIP/About'
import EIP_20Page from './EIP/20'
import EIP_721Page from './EIP/721'
import EIP_1155Page from './EIP/1155'
import EIP_2612Page from './EIP/2612'

import WalletPage from './Wallet'
import Wallet_MetamaskPage from './Wallet/Metamask'
import Wallet_RainbowKitPage from './Wallet/RainbowKit'
import Wallet_KaiawalletExtensionPage from './Wallet/KaiawalletExtension'
import Wallet_KaiawalletMobilePage from './Wallet/KaiawalletMobile'
import Wallet_KlipPage from './Wallet/Klip'
import { RouteObject } from 'react-router'

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
      {
        path: RoutePath.EIP,
        Component: EIPPage,
        children: [
          {
            index: true,
            Component: EIP_AboutPage,
          },
          {
            path: RoutePath.EIP_20,
            Component: EIP_20Page,
          },
          {
            path: RoutePath.EIP_721,
            Component: EIP_721Page,
          },
          {
            path: RoutePath.EIP_1155,
            Component: EIP_1155Page,
          },
          {
            path: RoutePath.EIP_2612,
            Component: EIP_2612Page,
          },
        ],
      },
      {
        path: RoutePath.Wallet,
        Component: WalletPage,
        children: [
          {
            index: true,
            Component: Wallet_MetamaskPage,
          },
          {
            path: RoutePath.Wallet_RainbowKit,
            Component: Wallet_RainbowKitPage,
          },
          {
            path: RoutePath.Wallet_KaiawalletExtension,
            Component: Wallet_KaiawalletExtensionPage,
          },
          {
            path: RoutePath.Wallet_KaiawalletMobile,
            Component: Wallet_KaiawalletMobilePage,
          },
          {
            path: RoutePath.Wallet_Klip,
            Component: Wallet_KlipPage,
          },
        ],
      },
    ],
  },
] as RouteObject[]
