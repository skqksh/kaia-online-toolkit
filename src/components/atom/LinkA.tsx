import {
  font,
  KaIcon,
  themeFunc,
  useKaTheme,
} from '@kaiachain/kaia-design-system'
import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

const StyledA = styled.a`
  display: flex;

  ${font['body/md_400']}
  color: ${themeFunc('info', '5')};
  text-decoration: none;

  :visited {
    color: ${themeFunc('info', '5')};
  }
`

export const LinkA = ({
  link,
  children,
}: {
  link: string
  children: ReactNode
}): ReactElement => {
  const { getTheme } = useKaTheme()
  return (
    <StyledA href={link} target="_blank">
      {children}
      <KaIcon.ArrowUpRight width={20} fill={getTheme('info', '5')} />
    </StyledA>
  )
}
