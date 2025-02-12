import { ReactElement, useEffect, useMemo, useState } from 'react'
import Caver, { AbiItem } from 'caver-js'
import _ from 'lodash'

import { URLMAP } from '@/consts'
import {
  Card,
  CardHeader,
  CardBody,
  Label,
  Container,
  Text,
  FormTextarea,
  FormRadio,
  ResultForm,
  CardSection,
  CodeBlock,
  CardExample,
  View,
} from '@/components'
import { ResultFormType } from '@/types'

enum InputTypeEnum {
  STRING = 'STRING',
  ABI = 'ABI',
}

const EX_VALUE = {
  [InputTypeEnum.STRING]: 'myMethod(uint256,string)',
  [InputTypeEnum.ABI]:
    '{"name":"yourMethod","type":"function","inputs":[{"type":"uint256","name":"myNumber"},{"type":"string","name":"mystring"}]}',
}

const FunctionSignature = (): ReactElement => {
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState<ResultFormType>()
  const [inputType, setInputType] = useState<InputTypeEnum>(
    InputTypeEnum.STRING
  )

  const caver = useMemo(() => new Caver(URLMAP.network['mainnet']['rpc']), [])
  const exValue = useMemo(() => EX_VALUE[inputType], [inputType])

  const encode = async (): Promise<void> => {
    setResult(undefined)
    try {
      const param =
        inputType === InputTypeEnum.STRING
          ? inputValue
          : (JSON.parse(inputValue) as AbiItem)
      const res = caver.abi.encodeFunctionSignature(param)
      setResult({
        success: true,
        value: res,
      })
    } catch (err) {
      setResult({
        success: false,
        message: _.toString(err),
      })
    }
  }

  useEffect(() => {
    inputValue && encode()
  }, [inputValue])

  return (
    <Container>
      <Card>
        <CardHeader>
          <h3 className="title">Encode Function Signature</h3>
          <Text>
            Encodes the function signature to its ABI signature, which are the
            first 4 bytes of the sha3 hash of the function name including
            parameter types.
          </Text>
        </CardHeader>
        <CardBody>
          <CardSection>
            <Label>Input Type</Label>
            <View style={{ rowGap: 10 }}>
              <FormRadio
                itemList={[
                  { title: 'String', value: InputTypeEnum.STRING },
                  { title: 'ABI', value: InputTypeEnum.ABI },
                ]}
                selectedValue={inputType}
                onClick={setInputType}
              />
              <View>
                <Label>Input</Label>
                <CardExample exValue={exValue} onClickTry={setInputValue} />
                <FormTextarea
                  style={{ height: 100 }}
                  value={inputValue}
                  onChange={setInputValue}
                  placeholder="Enter the comma-separated value types."
                />
              </View>
              <CodeBlock
                title="caver-js code"
                text={`import { AbiItem } from 'caver-js'
param: string | AbiItem

const encoded = caver.abi.encodeFunctionSignature(param)`}
              />
            </View>
          </CardSection>
          <ResultForm result={result} />
        </CardBody>
      </Card>
    </Container>
  )
}

export default FunctionSignature
