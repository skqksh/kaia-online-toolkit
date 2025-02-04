import { ReactElement, useState } from 'react'
import { KaText } from '@kaiachain/kaia-design-system'
import _ from 'lodash'

import {
  Container,
  Card,
  View,
  LinkA,
  SdkSelectBox,
  FormInput,
  CodeBlock,
} from '@/components'
import { URL_MAP } from '@/consts'
import { useUnitConverterPage } from '@/hooks/page/useUnitConverterPage'
import { UTIL } from '@/common'
import { SdkObject } from '@/types'

const defaultErrMsg = {
  kei: '',
  Gkei: '',
  KAIA: '',
}
const codeForExt = `import { fromKei, formatUnits } from '@kaiachain/js-ext-core'

const kei = 1000000000000000000n
const Gkei = fromKei(kei, 'gwei')
const KAIA = fromKei(kei, 'kaia')
// or
const Gkei = formatUnits(kei, 9)
const KAIA = formatUnits(kei, 18)`

const codes: SdkObject = {
  viem: `import { formatUnits } from 'viem'
  
const kei = 1000000000000000000n
const Gkei = formatUnits(kei, 9)
const KAIA = formatUnits(kei, 18)`,
  ethers: `import { ethers } from 'ethers'

const kei = 1000000000000000000n
const Gkei = ethers.formatUnits(kei, 9)
const KAIA = ethers.formatUnits(kei, 18)`,
  web3: `import { utils } from 'web3'

const kei = 1000000000000000000n
const Gkei = utils.fromWei(kei, 'gwei')
const KAIA = utils.fromWei(kei, 'ether')`,
  ethersExt: codeForExt,
  web3Ext: codeForExt,
}

const UnitConverter = (): ReactElement => {
  const { sdk, setSdk, inputKei, setInputKei, convertedFromKei } =
    useUnitConverterPage()
  const [convertErrMsg, setConvertErrMsg] = useState<{
    kei: string
    Gkei: string
    KAIA: string
  }>(defaultErrMsg)

  const inputBoxList: {
    unit: 'kei' | 'Gkei' | 'KAIA'
    factor: number
  }[] = [
    {
      unit: 'kei',
      factor: 0,
    },
    {
      unit: 'Gkei',
      factor: 9,
    },
    {
      unit: 'KAIA',
      factor: 18,
    },
  ]

  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">Unit Converter </KaText>
        <LinkA
          link={`${URL_MAP.kaiaDocs}learn/token-economics/kaia-native-token/#units-of-kaia-`}
        >
          Units of KAIA
        </LinkA>
      </View>

      <SdkSelectBox
        sdk={sdk}
        setSdk={setSdk}
        optionsList={['viem', 'ethers', 'web3', 'ethersExt', 'web3Ext']}
      />
      <Card>
        {_.map(inputBoxList, (x, index) => {
          return (
            <View key={`inputBoxList-${index}`}>
              <FormInput
                label={x.unit}
                inputProps={{
                  value: inputKei[x.unit],
                  placeholder: '0',
                  onChangeText: (value) => {
                    setConvertErrMsg(defaultErrMsg)
                    const keiBn = UTIL.toBn(value).multipliedBy(
                      Math.pow(10, x.factor)
                    )
                    try {
                      const converted = convertedFromKei(
                        BigInt(keiBn.toString(10))
                      )
                      setInputKei({ ...converted, [x.unit]: value })
                    } catch (error) {
                      console.log('error:', error)
                      setInputKei((ori) => ({ ...ori, [x.unit]: value }))
                      setConvertErrMsg((ori) => ({
                        ...ori,
                        [x.unit]:
                          x.factor === 0
                            ? 'This unit does not support decimal places.'
                            : `This unit only supports up to ${x.factor} decimal places.`,
                      }))
                    }
                  },
                  type: 'number',
                }}
                isError={!!convertErrMsg[x.unit]}
                errorMessage={convertErrMsg[x.unit]}
              />
            </View>
          )
        })}
        <CodeBlock text={codes[sdk]} toggle={false} />
      </Card>
    </Container>
  )
}

export default UnitConverter
