import { ReactElement, useEffect, useMemo, useState } from 'react'
import Caver, { AbiItem } from 'caver-js'
import _ from 'lodash'

import { URLMAP } from '@/consts'
import {
  Button,
  Card,
  CardBody,
  Label,
  Container,
  Text,
  FormTextarea,
  ResultForm,
  CardSection,
  CardExample,
  CardHeader,
  FormInput,
  FormSelect,
  View,
  CodeBlock,
} from '@/components'
import { ResultFormType } from '@/types'
import { COLOR } from '@/consts'

const SuccessMsgForm = ({ result }: { result?: string }): ReactElement => {
  return (
    <>
      {!!result && (
        <CardSection>
          <Text style={{ color: COLOR.error }}> {result}</Text>
        </CardSection>
      )}
    </>
  )
}

const delay: number = 3000
type NetworkType = 'mainnet' | 'testnet'

const FunctionCall = (): ReactElement => {
  const [network, setNetwork] = useState<NetworkType>('mainnet')
  const [abi, setABI] = useState('')
  const [abiParsed, setABIParsed] = useState<AbiItem>()
  const [parameters, setParams] = useState<string[]>([])
  const [data, setData] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const [parseResultMsg, setParseResultMsg] = useState('')
  const [encodeResultMsg, setEncodeResultMsg] = useState('')
  const [functionCallDisabled, setFunctionCallDisabled] = useState(false)
  const [result, setResult] = useState<ResultFormType<string>>()

  const caver = useMemo(
    () => new Caver(URLMAP.network[network]['rpc']),
    [network]
  )
  useEffect(() => {
    const timer = setTimeout(() => {
      setParseResultMsg('')
    }, delay)
    return (): void => {
      clearTimeout(timer)
    }
  }, [parseResultMsg])

  useEffect(() => {
    const timer = setTimeout(() => {
      setEncodeResultMsg('')
    }, delay)
    return (): void => {
      clearTimeout(timer)
    }
  }, [encodeResultMsg])

  const balanceOfABI = {
    constant: true,
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  }

  const parseABI = async (): Promise<void> => {
    try {
      const parsedABI = JSON.parse(abi) as AbiItem
      if (false === _.has(parsedABI, 'inputs')) {
        throw Error('This JSON object doesn\'t include "inputs" field.')
      }
      const params = new Array(parsedABI.inputs?.length)
      params.fill('')
      setABIParsed(parsedABI)
      setParams(params)
      setParseResultMsg('ABI is successfully parsed!')
    } catch (err) {
      setParseResultMsg(_.toString(err))
    }
  }

  const encodeFunctionCall = (): void => {
    try {
      const data = caver.abi.encodeFunctionCall(abiParsed!, parameters)
      setData(data)
      setEncodeResultMsg('Function Call is successfully encoded!')
    } catch (err) {
      setEncodeResultMsg(_.toString(err))
    }
  }

  const handleParameterChange = (val: string, index: number): void => {
    parameters[index] = val
    setParams([...parameters])
  }

  const functionCall = async (): Promise<void> => {
    try {
      setFunctionCallDisabled(true)
      const result = await caver.rpc.klay.call({
        to: contractAddress,
        input: data,
      })
      setResult({
        success: true,
        value: result,
      })
      setFunctionCallDisabled(false)
    } catch (err) {
      setResult({
        success: false,
        message: _.toString(err),
      })
      setFunctionCallDisabled(false)
    }
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <h3 className="title"> Function Call using ABI and Parameters</h3>
          <Text>
            1. Enter the JSON interface object of a function and click the
            ParseABI button. Input fields are generated according to the parsed
            ABI.
          </Text>
        </CardHeader>
        <CardBody>
          <CardSection>
            <Label>ABI(JSON interface object of function)</Label>
            <CardExample
              exValue={JSON.stringify(balanceOfABI)}
              onClickTry={setABI}
            />
            <View style={{ paddingBottom: 10 }}>
              <FormTextarea
                style={{ height: '100px' }}
                value={abi}
                onChange={setABI}
                placeholder="Enter the ABI(JSON interface object of function)"
              />
            </View>
            <Button onClick={parseABI}>Parse ABI</Button>
          </CardSection>
          <SuccessMsgForm result={parseResultMsg} />
          {!!abiParsed && parameters.length > 0 && (
            <>
              <View style={{ marginBottom: 10 }}>
                <Text>
                  2. When all parameters are entered, click the Encode button to
                  encode the function call. The encoded function call is used as
                  input data of the transaction call object.
                </Text>
              </View>
              <CardSection>
                {parameters.map((val, index: number) => (
                  <>
                    <Label>{`${abiParsed.inputs?.at(index)?.name}`}</Label>
                    <View style={{ marginBottom: 10 }}>
                      <FormInput
                        placeholder={`${abiParsed.inputs?.at(index)?.name}(${
                          abiParsed.inputs?.at(index)?.type
                        })`}
                        value={val}
                        onChange={(e): void => handleParameterChange(e, index)}
                      />
                    </View>
                  </>
                ))}
                <View style={{ marginBottom: 10 }}>
                  <Button onClick={encodeFunctionCall}>Encode</Button>
                </View>
                <CodeBlock
                  title="caver-js code"
                  text={`import { AbiItem } from 'caver-js'
parameters: string[]

const parsedABI = JSON.parse(abi) as AbiItem
const data = caver.abi.encodeFunctionCall(abiParsed, parameters)`}
                />
              </CardSection>
            </>
          )}
          <SuccessMsgForm result={encodeResultMsg} />
          {!!data && (
            <>
              <View style={{ marginBottom: 10 }}>
                <Text>
                  3. Select which network to send a message call to and enter
                  the contract address. Then click the Execute button to execute
                  a new message call. This execution does not alter the state of
                  the contract and does not consume gas.
                </Text>
              </View>
              <CardSection>
                <Label>Network</Label>
                <View style={{ marginBottom: 10 }}>
                  <FormSelect
                    defaultValue={network}
                    itemList={[
                      { value: 'mainnet', label: 'Mainnet' },
                      { value: 'testnet', label: 'Testnet' },
                    ]}
                    onChange={setNetwork}
                    containerStyle={{ width: 200 }}
                  />
                </View>
                <Label>Contract Address</Label>
                <View style={{ marginBottom: 10 }}>
                  <FormInput
                    type="text"
                    value={contractAddress}
                    placeholder="Contract Address"
                    onChange={setContractAddress}
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Button
                    disabled={functionCallDisabled}
                    onClick={functionCall}
                  >
                    Message Call
                  </Button>
                </View>
                <CodeBlock
                  title="caver-js code"
                  text={`const result = await caver.rpc.klay.call({
  to: contractAddress,
  input: data,
})`}
                />
              </CardSection>
              <ResultForm
                result={result}
                title={'The return value of the smart contract function'}
              />
            </>
          )}
        </CardBody>
      </Card>
    </Container>
  )
}

export default FunctionCall
