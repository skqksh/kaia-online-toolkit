import { ReactElement } from 'react'
import { KaButton, KaText, useKaTheme } from '@kaiachain/kaia-design-system'

import {
  View,
  LinkA,
  Container,
  ActionCard,
  FormInput,
  Card,
  SdkSelectBox,
} from '@/components'

import { useAccountBasicPage, codes } from '@/hooks/page/useAccountBasicPage'

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

      <SdkSelectBox
        sdk={sdk}
        setSdk={setSdk}
        optionsList={['viem', 'ethers', 'web3']}
      />
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
