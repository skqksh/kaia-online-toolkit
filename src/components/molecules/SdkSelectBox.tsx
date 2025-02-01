import { ReactElement } from 'react'
import { KaSelectBox, KaText } from '@kaiachain/kaia-design-system'

import { Row } from '@/components'

import { SdkType } from '@/types'

const AllOptions: { value: SdkType; label: string }[] = [
  { value: 'viem', label: 'Viem' },
  { value: 'ethers', label: 'Ethers' },
  { value: 'web3', label: 'Web3' },
  { value: 'ethers-ext', label: 'Ethers-ext' },
  { value: 'web3js-ext', label: 'Web3js-ext' },
]

export const SdkSelectBox = ({
  sdk,
  setSdk,
  optionsList,
}: {
  sdk: SdkType
  setSdk: (sdk: SdkType) => void
  optionsList: SdkType[]
}): ReactElement => {
  const filteredOptionList = AllOptions.filter((option) =>
    optionsList.includes(option.value)
  )
  return (
    <Row style={{ alignItems: 'center', gap: 8 }}>
      <KaText fontType="body/lg_700">SDK</KaText>
      <KaSelectBox
        optionList={filteredOptionList}
        onSelect={(value) => setSdk(value as SdkType)}
        selectedValue={sdk}
      />
    </Row>
  )
}
