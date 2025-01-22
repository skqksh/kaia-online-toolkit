import { ReactElement, useState } from 'react'
import Caver, { TransactionReceipt } from 'caver-js'
import _ from 'lodash'

import { ResultFormType } from '@/types'
import {
  Label,
  FormInput,
  Button,
  CardSection,
  ResultForm,
  CodeBlock,
  View,
  CardExample,
} from '@/components'

import exBytecode from '../Common/exBytecode'

const caver = new Caver(window.klaytn)

type WalletInfoType = {
  walletProps: {
    walletAddress: string
  }
}

const SmartContractDeployLegacy = ({
  walletProps,
}: WalletInfoType): ReactElement => {
  const { walletAddress } = walletProps

  const [bytecode, setBytecode] = useState('')
  const [gas, setGas] = useState('3000000')

  const [txHash, setTxHash] = useState('')
  const [receipt, setReceipt] = useState<ResultFormType<TransactionReceipt>>()
  const [error, setError] = useState<ResultFormType>()

  const signAndSendTransaction = (): void => {
    try {
      caver.klay
        .sendTransaction({
          from: walletAddress,
          data: bytecode,
          gas: gas,
        })
        .once('transactionHash', (transactionHash) => {
          setError(undefined)
          setReceipt(undefined)
          setTxHash(transactionHash)
        })
        .once('receipt', (receipt) => {
          setReceipt({ success: true, value: receipt })
        })
        .once('error', (err) => {
          setError({
            success: false,
            message: err.message,
          })
        })
    } catch (err) {
      setError({
        success: false,
        message: _.toString(err),
      })
    }
  }

  return (
    <>
      <CardSection>
        <h4>Smart Contract Deploy (Legacy)</h4>
        <View style={{ rowGap: 10 }}>
          <View>
            <Label>From</Label>
            <FormInput
              type="text"
              placeholder="Address you logged in kaikas"
              onChange={(): void => {}}
              value={walletAddress}
            />
            <Label>
              Bytecode Example (GX Token contract). You can deploy 9999 GroundX
              Tokens.
            </Label>
            <CardExample exValue={exBytecode} onClickTry={setBytecode} />
            <Label>Data (bytecode)</Label>
            <FormInput
              type="text"
              placeholder="A bytecode of smart contract to be deployed"
              onChange={setBytecode}
              value={bytecode}
            />
            <Label>Gas</Label>
            <FormInput
              type="text"
              placeholder="Gas (Peb) you willing to pay for contract deploy"
              onChange={setGas}
              value={gas}
            />
          </View>
          <Button onClick={signAndSendTransaction}>
            Sign & Send Transaction
          </Button>
          <CodeBlock
            title="caver-js code"
            text={`const caver = new Caver(window.klaytn)

caver.klay.sendTransaction({
  from: walletAddress,
  data: bytecode,
  gas: gas,
  })
  .once('transactionHash', (transactionHash) => {
    setTxHash(transactionHash)
  })
  .once('receipt', (receipt) => {
    setReceipt({ success: true, value: receipt })
  })
  .once('error', (err) => {
    setError({ success: false, message: err.message })
  })
`}
          />
        </View>
      </CardSection>
      {!error && txHash && (
        <CardSection>
          <h4>Transaction Result</h4>
          {txHash && (
            <ResultForm
              title={'TxHash'}
              result={{ success: true, value: txHash }}
            />
          )}
          {receipt && <ResultForm title={'Receipt'} result={receipt} />}
        </CardSection>
      )}
      {error && <ResultForm title={'Error'} result={error} />}
    </>
  )
}

export default SmartContractDeployLegacy
