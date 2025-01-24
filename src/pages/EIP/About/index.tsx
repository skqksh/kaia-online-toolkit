import { ReactElement, useMemo, useState } from 'react'
import { KaText, KaTextInput, useKaTheme } from '@kaiachain/kaia-design-system'
import styled from 'styled-components'

import { Container, Card, View, LinkA } from '@/components'
import { URL_MAP } from '@/consts'
import { RoutePath } from '@/types'
import { useAppNavigate } from '@/hooks'

const StyledCard = styled(Card)`
  display: grid;
  grid-template-columns: 30px 60px 1fr 40px;
  grid-gap: 10px;
`

const StyledLink = styled(View)`
  cursor: pointer;
`

enum EIPTypeEnum {
  CORE = 'Core',
  NETWORKING = 'Networking',
  INTERFACE = 'Interface',
  ERC = 'ERC',
  META = 'Meta',
  INFORMATIONAL = 'Informational',
}

type ItemType = {
  no: string
  type: EIPTypeEnum
  to: RoutePath
  title: string
  doc: string
}

const list: ItemType[] = [
  {
    no: '20',
    type: EIPTypeEnum.ERC,
    title: 'Token Standard',
    to: RoutePath.EIP_20,
    doc: `${URL_MAP.eip}/EIPS/eip-20`,
  },
  {
    no: '721',
    type: EIPTypeEnum.ERC,
    title: 'Non-Fungible Token Standard',
    to: RoutePath.EIP_721,
    doc: `${URL_MAP.eip}/EIPS/eip-721`,
  },
  {
    no: '1155',
    type: EIPTypeEnum.ERC,
    title: 'Multi Token Standard',
    to: RoutePath.EIP_1155,
    doc: `${URL_MAP.eip}/EIPS/eip-1155`,
  },
]

const Item = ({
  no,
  type,
  title,
  doc,
  inputLower,
  to,
}: ItemType & {
  inputLower: string
}): ReactElement => {
  const { getTheme } = useKaTheme()
  const { navigate } = useAppNavigate()
  const noText = useMemo(() => {
    const indexOf = no.toLocaleLowerCase().indexOf(inputLower)
    return indexOf > -1 ? (
      <span>
        {no.slice(0, indexOf)}
        <span style={{ color: getTheme('brand', '5') }}>
          {no.slice(indexOf, indexOf + inputLower.length)}
        </span>
        {no.slice(indexOf + inputLower.length)}
      </span>
    ) : (
      no
    )
  }, [no, inputLower, getTheme])

  const typeText = useMemo(() => {
    const indexOf = type.toLocaleLowerCase().indexOf(inputLower)

    return indexOf > -1 ? (
      <span>
        {type.slice(0, indexOf)}
        <span style={{ color: getTheme('brand', '5') }}>
          {type.slice(indexOf, indexOf + inputLower.length)}
        </span>
        {type.slice(indexOf + inputLower.length)}
      </span>
    ) : (
      type
    )
  }, [type, inputLower, getTheme])

  const titleText = useMemo(() => {
    const indexOf = title.toLocaleLowerCase().indexOf(inputLower)
    return indexOf > -1 ? (
      <span>
        {title.slice(0, title.toLocaleLowerCase().indexOf(inputLower))}
        <span style={{ color: getTheme('brand', '5') }}>
          {title.slice(indexOf, indexOf + inputLower.length)}
        </span>
        {title.slice(
          title.toLocaleLowerCase().indexOf(inputLower) + inputLower.length
        )}
      </span>
    ) : (
      title
    )
  }, [title, inputLower, getTheme])

  return (
    <>
      <KaText fontType="body/md_400">{noText}</KaText>
      <KaText fontType="body/md_400">{typeText}</KaText>
      <StyledLink onClick={() => navigate(to)}>
        <KaText fontType="body/md_400" color={getTheme('info', '4')}>
          {titleText}
        </KaText>
      </StyledLink>
      <LinkA link={doc}>doc</LinkA>
    </>
  )
}

const About = (): ReactElement => {
  const [input, setInput] = useState('')
  const inputLower = useMemo(() => input.toLocaleLowerCase(), [input])
  const filteredList = useMemo(() => {
    return inputLower
      ? list.filter(
          (x) =>
            x.no.toLocaleLowerCase().includes(inputLower) ||
            x.type.toLocaleLowerCase().includes(inputLower) ||
            x.title.toLocaleLowerCase().includes(inputLower)
        )
      : list
  }, [inputLower])

  return (
    <Container>
      <View>
        <KaText fontType="title/md_700">About EIP</KaText>
        <LinkA link="https://eips.ethereum.org/all">
          Ethereum Improvement Proposals
        </LinkA>
      </View>

      <KaTextInput
        inputProps={{
          value: input,
          onChangeText: setInput,
          placeholder: 'Search',
        }}
      />
      <StyledCard>
        {filteredList.map((item, index) => {
          return <Item key={index} {...item} inputLower={inputLower} />
        })}
      </StyledCard>
    </Container>
  )
}

export default About
