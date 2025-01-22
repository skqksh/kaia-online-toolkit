export enum RoutePath {
  Home = '/',

  Account = '/account',
  //Account_Basic = '/account/basic',
  Account_Mnemonic = '/account/mnemonic',
  Account_Keystore = '/account/keystore',
  Account_AccountKeyPublic = '/account/accountKeyPublic',
  Account_AccountKeyFail = '/account/accountKeyFail',
  Account_AccountKeyWeightedMultiSig = '/account/accountKeyWeightedMultiSig',
  Account_AccountKeyRoleBased = '/account/accountKeyRoleBased',
  Account_KeystoreV4 = '/account/keystoreV4',

  ERC = '/erc',
}

export type RouteParams = {
  [RoutePath.Home]: undefined

  [RoutePath.Account]: undefined
  //[RoutePath.Account_Basic]: undefined
  [RoutePath.Account_Mnemonic]: undefined
  [RoutePath.Account_Keystore]: undefined
  [RoutePath.Account_AccountKeyPublic]: undefined
  [RoutePath.Account_AccountKeyFail]: undefined
  [RoutePath.Account_AccountKeyWeightedMultiSig]: undefined
  [RoutePath.Account_AccountKeyRoleBased]: undefined
  [RoutePath.Account_KeystoreV4]: undefined

  [RoutePath.ERC]: undefined
}
