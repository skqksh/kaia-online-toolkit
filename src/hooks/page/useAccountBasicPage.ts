import { useEffect, useMemo, useState } from 'react'
import * as viemAccounts from 'viem/accounts'
import { ethers } from 'ethers' // https://docs.ethers.org/v6/
import { eth } from 'web3' // https://docs.web3js.org/

import { SdkObject, SdkType } from '@/types'
import { UTIL } from '@/common'

const DefaultSdkObject: SdkObject = {
  viem: '',
  ethers: '',
  web3: '',
  ethersExt: '',
  web3Ext: '',
}

export type UseAccountBasicPageReturn = {
  sdk: SdkType
  setSdk: (sdk: SdkType) => void
  privateKey: string
  setPrivateKey: (privateKey: string) => void
  accountFromPrivateKey: SdkObject
  mnemonic: string
  setMnemonic: (mnemonic: string) => void
  accountFromMnemonic: SdkObject
  pKeyErrMsg: string
  mnemonicErrMsg: string
  generatePrivateKey: () => void
  privateKeyToAccount: () => void
  generateMnemonic: () => void
  mnemonicToAccount: () => void
}
export const codes: Record<string, SdkObject> = {
  accountFromPrivateKey: {
    viem: `import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

const privateKey = generatePrivateKey()
const account = privateKeyToAccount(privateKey)`,
    ethers: `import { Wallet } from 'ethers'

const privateKey = Wallet.createRandom().privateKey
const wallet = new Wallet(privateKey)`,
    web3: `import { eth } from 'web3'

const privateKey = eth.accounts.create().privateKey
const account = eth.accounts.privateKeyToAccount(privateKey)`,
    ethersExt: '',
    web3Ext: '',
  },

  accountFromMnemonic: {
    viem: `import { english, generateMnemonic, mnemonicToAccount } from 'viem/accounts'

const mnemonic = generateMnemonic(english)
const { address, publicKey } = mnemonicToAccount(mnemonic)`,

    ethers: `import { Wallet } from 'ethers'

const mnemonic = Wallet.createRandom().mnemonic?.phrase
const wallet = HDNodeWallet.fromPhrase(mnemonic)`,
    web3: '',
    ethersExt: '',
    web3Ext: '',
  },
}

export const useAccountBasicPage = (): UseAccountBasicPageReturn => {
  const [sdk, setSdk] = useState<SdkType>('viem')
  const [privateKey, setPrivateKey] = useState('')
  const pKeyErrMsg = useMemo(() => {
    if (!privateKey) return ''
    if (!UTIL.isValidPrivateKey(privateKey)) {
      return 'Invalid private key'
    }
    return ''
  }, [privateKey])
  const [accountFromPrivateKey, setAccountFromPrivateKey] =
    useState<SdkObject>(DefaultSdkObject)
  const [mnemonic, setMnemonic] = useState('')
  const mnemonicErrMsg = useMemo(() => {
    if (!mnemonic) return ''
    if (!UTIL.isValidMnemonic(mnemonic)) {
      return 'Invalid mnemonic'
    }
    return ''
  }, [mnemonic])
  const [accountFromMnemonic, setAccountFromMnemonic] =
    useState<SdkObject>(DefaultSdkObject)

  const generatePrivateKey = () => {
    if (sdk === 'viem') {
      setPrivateKey(viemAccounts.generatePrivateKey())
    } else if (sdk === 'ethers') {
      setPrivateKey(ethers.Wallet.createRandom().privateKey)
    } else if (sdk === 'web3') {
      setPrivateKey(eth.accounts.create().privateKey)
    }
  }

  const privateKeyToAccount = () => {
    const res = { ...accountFromPrivateKey }
    if (sdk === 'viem') {
      const account = viemAccounts.privateKeyToAccount(
        privateKey as `0x${string}`
      )
      res['viem'] = JSON.stringify(account, null, 2)
    } else if (sdk === 'ethers') {
      const wallet = new ethers.Wallet(privateKey)
      res['ethers'] = JSON.stringify(wallet, null, 2)
    } else if (sdk === 'web3') {
      const account = eth.accounts.privateKeyToAccount(privateKey)
      res['web3'] = JSON.stringify(account, null, 2)
    }
    setAccountFromPrivateKey(res)
  }

  const generateMnemonic = () => {
    if (sdk === 'viem') {
      setMnemonic(viemAccounts.generateMnemonic(viemAccounts.english))
    } else if (sdk === 'ethers') {
      setMnemonic(ethers.Wallet.createRandom().mnemonic?.phrase ?? '')
    } else if (sdk === 'web3') {
      window.alert('Not supported with web3')
    }
  }

  const mnemonicToAccount = () => {
    const res = { ...accountFromMnemonic }
    if (sdk === 'viem') {
      const account = viemAccounts.mnemonicToAccount(mnemonic)
      res['viem'] = JSON.stringify(account, null, 2)
    } else if (sdk === 'ethers') {
      const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic)
      res['ethers'] = JSON.stringify(wallet, null, 2)
    } else if (sdk === 'web3') {
      window.alert('Not supported with web3')
    }
    setAccountFromMnemonic(res)
  }

  useEffect(() => {
    setAccountFromPrivateKey(DefaultSdkObject)
  }, [privateKey])

  useEffect(() => {
    setAccountFromMnemonic(DefaultSdkObject)
  }, [mnemonic])

  return {
    sdk,
    setSdk,
    privateKey,
    setPrivateKey,
    accountFromPrivateKey,
    mnemonic,
    setMnemonic,
    accountFromMnemonic,
    pKeyErrMsg,
    mnemonicErrMsg,
    generatePrivateKey,
    privateKeyToAccount,
    generateMnemonic,
    mnemonicToAccount,
  }
}
