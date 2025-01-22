import { ReactElement } from 'react'
import {
  KaButton,
  KaSelectBox,
  KaText,
  useKaTheme,
} from '@kaiachain/kaia-design-system'

import {
  View,
  LinkA,
  Row,
  Container,
  ActionCard,
  FormInput,
  Card,
} from '@/components'

import { useAccountBasicPage, codes } from '@/hooks/page/useAccountBasic'
import { SdkType } from '@/types'

const Basic = (): ReactElement => {
  const {
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
  } = useAccountBasicPage()

  const isWeb3 = sdk === 'web3'
  const { getTheme } = useKaTheme()

  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">Account</KaText>
        <LinkA link="https://docs.kaia.io/docs/learn/accounts/#accountkeylegacy-">
          Kaia docs : AccountKeyLegacy
        </LinkA>
      </View>

      <Row style={{ alignItems: 'center', gap: 8 }}>
        <KaText fontType="body/lg_700">SDK</KaText>
        <KaSelectBox
          optionList={[
            { value: 'viem', label: 'Viem' },
            { value: 'ethers', label: 'Ethers' },
            { value: 'web3', label: 'Web3' },
          ]}
          onSelect={(value) => setSdk(value as SdkType)}
          selectedValue={sdk}
        />
      </Row>
      <ActionCard
        title="Account from private key"
        topComp={
          <FormInput
            inputProps={{
              placeholder: 'Enter private key',
              value: privateKey,
              onChangeText: setPrivateKey,
            }}
            rightComponent={
              <KaButton
                style={{ alignSelf: 'center' }}
                onClick={generatePrivateKey}
              >
                Generate
              </KaButton>
            }
            errorMessage={pKeyErrMsg}
          />
        }
        btnDisabled={!privateKey || !!pKeyErrMsg}
        onClickBtn={privateKeyToAccount}
        code={codes['accountFromPrivateKey'][sdk]}
        result={accountFromPrivateKey[sdk]}
      />
      {isWeb3 ? (
        <Card>
          <KaText fontType="title/xs_700">Account from mnemonic</KaText>
          <KaText fontType="body/md_700" color={getTheme('info', '5')}>
            {`Web3.js alone does not support generating mnemonics or creating accounts from mnemonics.\nyou need additional libraries like bip39 or @ethereumjs/wallet.`}
          </KaText>
        </Card>
      ) : (
        <ActionCard
          title="Account from mnemonic"
          topComp={
            <FormInput
              inputProps={{
                placeholder: 'Enter Menmonic',
                value: mnemonic,
                onChangeText: setMnemonic,
              }}
              rightComponent={
                <KaButton
                  style={{ alignSelf: 'center' }}
                  onClick={generateMnemonic}
                >
                  Generate
                </KaButton>
              }
              errorMessage={mnemonicErrMsg}
            />
          }
          btnDisabled={!mnemonic || !!mnemonicErrMsg}
          onClickBtn={mnemonicToAccount}
          code={codes['accountFromMnemonic'][sdk]}
          result={accountFromMnemonic[sdk]}
        />
      )}
    </Container>
  )
}

export default Basic
