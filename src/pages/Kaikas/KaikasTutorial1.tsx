import { ReactElement, useState, useEffect } from 'react'
import Caver from 'caver-js'
import _ from 'lodash'

import {
  Card,
  CardHeader,
  CardBody,
  Label,
  Container,
  Text,
  FormSelect,
  FormInput,
  CardSection,
  LinkA,
  View,
  PrivateKeyWarning,
} from '@/components'

import ValueTransferLegacy from './TxTypes1/ValueTransferLegacy'
import SmartContractDeployLegacy from './TxTypes1/SmartContractDeployLegacy'
import SmartContractExecutionTokenTransferLegacy from './TxTypes1/SmartContractExecutionTokenTransferLegacy'
import AccountUpdate from './TxTypes1/AccountUpdate'
import AccountUpdateFeeDelegation from './TxTypes1/AccountUpdateFeeDelegation'
import AccountUpdateFeeDelegationWithRatio from './TxTypes1/AccountUpdateFeeDelegationWithRatio'

const caver = new Caver(window.klaytn)

const TransactionType = {
  valueTransferLegacy: 'Value Transfer (Legacy)',
  smartContractDeployLegacy: 'Smart Contract Deploy (Legacy)',
  smartContractExecutionTokenTransferLegacy:
    'Smart Contract Execution: Token Transfer (Legacy)',
  accountUpdate: 'Account Update',
  accountUpdateFeeDelegation: 'Account Update (Fee Delegation)',
  accountUpdateFeeDelegationWithRatio:
    'Account Update (Fee Delegation with Ratio)',
}

const NetworkName: { [key: string]: string } = {
  '1001': 'Testnet',
  '8217': 'Mainnet',
  '0': 'Not Connected',
}

enum KaikasStatus {
  'Normal',
  'InstallationRequired',
  'DeniedConnection',
}

const KaikasTutorial1 = (): ReactElement => {
  const [walletStatus, setWalletStatus] = useState<KaikasStatus>(
    KaikasStatus.Normal
  )
  const [walletAddress, setWalletAddress] = useState('')
  const [walletBalance, setWalletBalance] = useState('')
  const [network, setNetwork] = useState('0')
  const [txType, setTxType] = useState('valueTransferLegacy')

  const setNetworkInfo = (): void => {
    const { klaytn } = window
    if (klaytn) {
      setNetwork(klaytn.networkVersion)
    } else {
      setWalletStatus(KaikasStatus.InstallationRequired)
    }
  }

  const setAccountInfo = async (): Promise<void> => {
    const { klaytn } = window
    if (klaytn) {
      const account = klaytn.selectedAddress
      const balance = await caver.klay.getBalance(account)
      setWalletAddress(account)
      setWalletBalance(caver.utils.fromPeb(balance, 'KLAY'))
    } else {
      setWalletStatus(KaikasStatus.InstallationRequired)
    }
  }

  const initialized = async (): Promise<void> => {
    const { klaytn } = window
    if (klaytn) {
      try {
        await klaytn.enable()
        setNetworkInfo()
        klaytn.on('networkChanged', () => {
          setNetworkInfo()
          setAccountInfo()
        })
        setAccountInfo()
        klaytn.on('accountsChanged', () => {
          setAccountInfo()
        })
      } catch {
        setWalletStatus(KaikasStatus.DeniedConnection)
      }
    } else {
      setWalletStatus(KaikasStatus.InstallationRequired)
    }
  }

  useEffect(() => {
    initialized()
  }, [])

  return (
    <Container>
      <Card>
        <CardHeader>
          <h3 className="title">Kaikas Tutorial 1</h3>
          <Text>
            {'You can test the following transaction types on this page:\n'}
            <LinkA link="https://docs.kaia.io/docs/learn/transactions/basic/#txtypelegacytransaction-">
              - Value Transfer (Legacy)
            </LinkA>
            {'\n'}
            <LinkA link="https://docs.kaia.io/docs/learn/transactions/basic/#txtypelegacytransaction-">
              - Smart Contract Deploy (Legacy)
            </LinkA>
            {'\n'}
            <LinkA link="https://docs.kaia.io/docs/learn/transactions/basic/#txtypelegacytransaction-">
              - Smart Contract Execution: Token Transfer (Legacy)
            </LinkA>
            {'\n'}
            <LinkA link="https://docs.kaia.io/docs/learn/transactions/basic/#txtypeaccountupdate-">
              - Account Update
            </LinkA>
            {'\n'}
            <LinkA link="https://docs.kaia.io/docs/learn/transactions/basic/#txtypeaccountupdate-">
              - Account Update (Fee Delegated)
            </LinkA>
            {'\n'}
            <LinkA link="https://docs.kaia.io/docs/learn/transactions/partial-fee-delegation/#txtypefeedelegatedvaluetransferwithratio-">
              - Account Update (Fee Delegated with Ratio)
            </LinkA>
            {'\n\n'}
            {'You can get some test KAIA from the '}
            <LinkA link="https://faucet.kaia.io">faucet</LinkA>
            {" and try out the Kaikas' features on the Testnet."}
          </Text>
          <PrivateKeyWarning />
        </CardHeader>
        <CardBody>
          {walletStatus === KaikasStatus.Normal &&
            NetworkName[network] === 'Testnet' && (
              <>
                <CardSection>
                  <Text>{NetworkName[network]}</Text>
                </CardSection>
                <CardSection>
                  <h4>Connected Wallet Information</h4>
                  <View style={{ rowGap: 10 }}>
                    <View>
                      <Label>Address</Label>
                      <FormInput
                        type="text"
                        placeholder="Please connect the kaikas"
                        onChange={(): void => {}}
                        value={walletAddress}
                      />
                      <Label>Balance</Label>
                      <FormInput
                        type="text"
                        placeholder="Please connect the kaikas"
                        onChange={(): void => {}}
                        value={walletBalance}
                      />
                    </View>
                  </View>
                </CardSection>
                <CardSection>
                  <Label>Transaction Type</Label>
                  <FormSelect
                    defaultValue={txType}
                    itemList={_.map(TransactionType, (key, val) => ({
                      label: key,
                      value: val,
                    }))}
                    onChange={setTxType}
                    containerStyle={{ width: 400 }}
                  />
                </CardSection>
                {txType === 'valueTransferLegacy' && (
                  <ValueTransferLegacy walletProps={{ walletAddress }} />
                )}
                {txType === 'smartContractDeployLegacy' && (
                  <SmartContractDeployLegacy walletProps={{ walletAddress }} />
                )}
                {txType === 'smartContractExecutionTokenTransferLegacy' && (
                  <SmartContractExecutionTokenTransferLegacy
                    walletProps={{ walletAddress }}
                  />
                )}
                {txType === 'accountUpdate' && (
                  <AccountUpdate walletProps={{ walletAddress }} />
                )}
                {txType === 'accountUpdateFeeDelegation' && (
                  <AccountUpdateFeeDelegation walletProps={{ walletAddress }} />
                )}
                {txType === 'accountUpdateFeeDelegationWithRatio' && (
                  <AccountUpdateFeeDelegationWithRatio
                    walletProps={{ walletAddress }}
                  />
                )}
              </>
            )}
          {walletStatus === KaikasStatus.Normal &&
            NetworkName[network] === 'Mainnet' && (
              <CardSection>
                <Text>
                  Please change the network to Testnet in the Kaikas wallet.
                </Text>
              </CardSection>
            )}
          {walletStatus === KaikasStatus.InstallationRequired && (
            <CardSection>
              <Text>
                {
                  'You must download the Kaikas to use this page. Kaikas is a browser extension that provides secure '
                }
                {
                  'and usable means to interact with Kaia network from web sites. In particular, it handles account '
                }
                {'management and connecting the user to the blockchain. \n\n'}
                {
                  'Kaikas supports Chrome on Windows, Mac, and Linux. You can download it'
                }{' '}
                <LinkA link="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi">
                  here
                </LinkA>
                .
              </Text>
            </CardSection>
          )}
          {walletStatus === KaikasStatus.DeniedConnection && (
            <CardSection>
              <Text>
                You must connect the Kaikas to use this page. Please refresh the
                page and connect the wallet.
              </Text>
            </CardSection>
          )}
        </CardBody>
      </Card>
    </Container>
  )
}

export default KaikasTutorial1
