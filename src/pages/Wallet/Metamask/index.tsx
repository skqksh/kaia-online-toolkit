import { ReactElement, useState } from 'react'
import { KaButton, KaText, useKaTheme } from '@kaiachain/kaia-design-system'
import styled from 'styled-components'

import {
  ActionCard,
  Card,
  CodeBlock,
  Container,
  LinkA,
  Row,
  View,
} from '@/components'
import { EvmChainIdEnum, NETWORK, URL_MAP } from '@/consts'
import { useNetwork } from '@/hooks'
import useMetamask from '@/hooks/independent/useMetamask'

const switchNetworkCode = `try {
    // Request switching network
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    })
    return { success: true }
  } catch (error: any) {
      if (
        // Extension: https://docs.metamask.io/wallet/reference/json-rpc-methods/wallet_switchethereumchain/
        error.code === 4902 ||
        // Mobile: https://docs.metamask.io/services/reference/scroll/json-rpc-methods/#json-rpc-errors
        error.code === -32603
      ) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [AddEthereumChainParameter],
        })
        return { success: true }
      } catch (addError) {
        return { success: false, error: addError }
      }
    } else {
      return { success: false, error }
    }
  }
`

const StyledConnectionRow = styled(Row)`
  gap: 4px;
  align-items: center;
`

const Metamask = (): ReactElement => {
  const { getTheme } = useKaTheme()
  const { chainId } = useNetwork()

  const {
    provider,
    chainId: providerChainId,
    connected,
    connect,
    disconnect,
    switchNetwork,
  } = useMetamask()

  const [connectErrMsg, setConnectErrMsg] = useState('')
  const [switchChainErrMsg, setSwitchChainErrMsg] = useState('')

  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">Metamask</KaText>
        <LinkA link={URL_MAP.metamaskDocs}>Metamask documentation</LinkA>
      </View>
      {!connected && (
        <ActionCard
          title="Connect Metamask"
          topComp={
            <LinkA link={`${URL_MAP.metamaskDocs}/connect/metamask-sdk`}>
              MetaMask SDK
            </LinkA>
          }
          onClickBtn={() => {
            connect().then((res) => {
              if (res.success) {
                setConnectErrMsg('')
              } else {
                setConnectErrMsg(JSON.stringify(res.error, null, 2))
              }
            })
          }}
          result={connectErrMsg}
        />
      )}
      {provider && connected && (
        <>
          <Card>
            <StyledConnectionRow>
              <KaText fontType="body/md_700">Selected Address : </KaText>
              <KaText fontType="body/md_400" color={getTheme('gray', '2')}>
                {provider.getSelectedAddress()}
              </KaText>
            </StyledConnectionRow>

            <KaButton type="redLine" onClick={disconnect}>
              Disconnect
            </KaButton>
          </Card>
          <ActionCard
            title="Switch Chain"
            onClickBtn={() => {
              switchNetwork(chainId).then((res) => {
                if (res.success) {
                  setSwitchChainErrMsg('')
                } else {
                  setSwitchChainErrMsg(JSON.stringify(res.error, null, 2))
                }
              })
            }}
            topComp={
              <View style={{ gap: 10 }}>
                <StyledConnectionRow>
                  <KaText fontType="body/md_700">Wallet chain ID : </KaText>
                  <KaText fontType="body/md_400" color={getTheme('gray', '2')}>
                    {providerChainId} ({Number(providerChainId)})
                  </KaText>
                </StyledConnectionRow>
                {chainId === providerChainId ? (
                  <KaText fontType="body/md_400" color={getTheme('brand', '5')}>
                    Wallet's network is the same as the project network
                  </KaText>
                ) : (
                  <KaText
                    fontType="body/md_400"
                    color={getTheme('danger', '5')}
                  >
                    Wallet's network is different from the project network
                  </KaText>
                )}
              </View>
            }
            btnDisabled={chainId === providerChainId}
            code={switchNetworkCode}
            result={switchChainErrMsg}
          />
          <Card>
            <View>
              <LinkA link={`${URL_MAP.eip}EIPS/eip-3085`}>
                EIP-3085: wallet_addEthereumChain RPC Method
              </LinkA>
              <LinkA
                link={`${URL_MAP.metamaskDocs}reference/json-rpc-methods/wallet_addethereumchain/`}
              >
                AddEthereumChain
              </LinkA>
              <CodeBlock
                title="Parameters"
                text={JSON.stringify(
                  {
                    Ethereum: NETWORK.evmChainParams[EvmChainIdEnum.ETHEREUM],
                    Sepolia: NETWORK.evmChainParams[EvmChainIdEnum.SEPOLIA],
                    Kaia: NETWORK.evmChainParams[EvmChainIdEnum.KAIA],
                    Kairos: NETWORK.evmChainParams[EvmChainIdEnum.KAIROS],
                  },
                  null,
                  2
                )}
              />
            </View>
          </Card>
        </>
      )}
    </Container>
  )
}

export default Metamask
