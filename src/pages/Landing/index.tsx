import { ReactElement } from 'react'
import styled from 'styled-components'
import kaiaBrandImg from '@/images/kaia_brand.svg'

import { Card, LinkA, Row, View } from '@/components'
import {
  KaButton,
  KaLogo,
  KaText,
  themeFunc,
  useKaTheme,
} from '@kaiachain/kaia-design-system'
import { useAppNavigate } from '@/hooks'
import { RoutePath } from '@/types'

const StyledContainer = styled(View)`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 60px;
  margin-bottom: 200px;
`

const StyledTop = styled(View)`
  margin-top: 120px;
  align-items: center;
  gap: 20px;
  text-align: center;
`

const StyledHeroTitle = styled.h1`
  font-size: 140px;
  line-height: 140px;
  color: ${themeFunc('gray', '0')};
  margin: 0;
`

const StyledWalletGrid = styled(View)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
`

const StyledSection = styled(View)`
  gap: 20px;
  align-items: center;
`

const Landing = (): ReactElement => {
  const { navigate } = useAppNavigate()
  const { getTheme } = useKaTheme()

  return (
    <StyledContainer>
      <StyledTop>
        <View style={{ paddingBottom: 80 }}>
          <Row style={{ alignItems: 'baseline', gap: 42, paddingBottom: 50 }}>
            <img src={kaiaBrandImg} alt="logo" style={{ height: 110 }} />
            <StyledHeroTitle>Toolkit</StyledHeroTitle>
          </Row>

          <KaText fontType="title/sm_700" color={getTheme('gray', '0')}>
            {`Explore the future of blockchain development with Kaia Toolkit.\nTools, resources, and guidance to make your Web3 journey seamless.`}
          </KaText>
        </View>
        <View>
          <KaButton size="md" onClick={() => navigate(RoutePath.Account)}>
            Start from account
          </KaButton>
        </View>
      </StyledTop>
      <StyledSection>
        <KaText fontType="title/md_700">Wallet integration</KaText>

        <StyledWalletGrid>
          <Card>
            <Row style={{ gap: 10 }}>
              <View style={{ alignItems: 'center', gap: 10 }}>
                <KaLogo.LightSymbolKaiaWallet width={50} />
                <KaText fontType="body/md_400">KaiaWallet</KaText>
              </View>
              <View style={{ gap: 10, flex: 1 }}>
                <KaButton type="secondary" fill>
                  Mobile
                </KaButton>
                <KaButton type="secondary" fill>
                  Extension
                </KaButton>
              </View>
            </Row>
          </Card>
          <Card></Card>
          <Card></Card>
        </StyledWalletGrid>
      </StyledSection>
      <StyledSection>
        <KaText fontType="title/md_700">Others</KaText>
        <Card>
          <KaText fontType="title/xs_700">SDK Extensions</KaText>
          <View>
            <KaText fontType="body/md_400" color={getTheme('gray', '2')}>
              Learn how to use SDKs and Libraries to build your own blockchain
            </KaText>
            <LinkA link="https://docs.kaia.io/references/sdk/">
              SDKs and Libraries docs
            </LinkA>
          </View>
        </Card>
        <Card>
          <KaText fontType="title/xs_700">Enhanced JSON-RPC methods</KaText>
          <View>
            <KaText fontType="body/md_400" color={getTheme('gray', '2')}>
              Fully compatible with Ethereum JSON-RPC methods.
            </KaText>
            <LinkA link="https://docs.kaia.io/references/public-en/#mainnet-public-json-rpc-endpoints">
              Public JSON-RPC Endpoints
            </LinkA>
          </View>
          <View>
            <KaText fontType="body/md_400" color={getTheme('gray', '2')}>
              Fully compatible with Ethereum JSON-RPC methods.
            </KaText>
            <LinkA link="https://docs.kaia.io/references/json-rpc/eth/accounts/">
              Ethereum JSON-RPC methods
            </LinkA>
          </View>
          <View>
            <KaText fontType="body/md_400" color={getTheme('gray', '2')}>
              Enabling support for various account types and gas fee delegation
              features.
            </KaText>
            <LinkA link="https://docs.kaia.io/references/json-rpc/kaia/get-account/">
              Kaia JSON-RPC methods
            </LinkA>
          </View>
        </Card>
      </StyledSection>
    </StyledContainer>
  )
}

export default Landing
