import { ReactElement, useState } from 'react'
import { KaText, KaTextInput } from '@kaiachain/kaia-design-system'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useSignMessage } from 'wagmi'

import {
  ActionCard,
  Card,
  CodeBlock,
  Container,
  LinkA,
  View,
} from '@/components'
import { URL_MAP } from '@/consts'

const RainbowKit = (): ReactElement => {
  const { status, address, chainId } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [signedMessageRes, setSignedMessageRes] = useState('')
  const [inputMessage, setInputMessage] = useState('')

  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">RainbowKit</KaText>
        <LinkA link={`${URL_MAP.rainbowKit}introduction`}>
          RainbowKit documentation
        </LinkA>
      </View>
      <Card>
        <KaText fontType="title/xs_700">Installation</KaText>
        <LinkA link={`${URL_MAP.rainbowKit}installation#manual-setup`}>
          Manual setup
        </LinkA>
      </Card>
      <Card>
        <ConnectButton />
        <CodeBlock text={`Status: ${status}`} toggle={false} />
        <CodeBlock
          text={`import { ConnectButton } from '@rainbow-me/rainbowkit'\nimport { useAccount } from 'wagmi'\n\n<ConnectButton />\nconst { status } = useAccount()`}
        />
      </Card>
      {address && (
        <>
          <Card>
            <KaText fontType="title/xs_700">Connected info</KaText>
            <CodeBlock
              text={JSON.stringify(
                {
                  address,
                  chainId,
                },
                null,
                2
              )}
              toggle={false}
            />
            <CodeBlock
              text={`import { useAccount } from 'wagmi'\n\nconst { address, chainId } = useAccount()`}
            />
          </Card>
          <ActionCard
            title="Sign message"
            topComp={
              <KaTextInput
                inputProps={{
                  value: inputMessage,
                  onChangeText: setInputMessage,
                  placeholder: 'Message to sign',
                }}
              />
            }
            btnDisabled={!inputMessage}
            onClickBtn={() => {
              signMessageAsync({
                message: inputMessage,
              })
                .then((res) => {
                  setSignedMessageRes(res)
                })
                .catch((err) => {
                  setSignedMessageRes(JSON.stringify(err, null, 2))
                })
            }}
            result={signedMessageRes}
            code={`import { useAccount, useSignMessage } from 'wagmi'\n\nconst { signMessageAsync } = useSignMessage()\nsignMessageAsync({ message })`}
          />
        </>
      )}
    </Container>
  )
}

export default RainbowKit
