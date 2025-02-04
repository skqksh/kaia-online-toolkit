import { ReactElement } from 'react'
import styled from 'styled-components'
import {
  KaText,
  KaTextInput,
  KaTextInputProps,
  useKaTheme,
} from '@kaiachain/kaia-design-system'

import { View } from '@/components'

const StyledContainer = styled(View)`
  gap: 4px;
`

export type FormInputProps = {
  label?: string
  errorMessage?: string
} & KaTextInputProps

export const FormInput = ({
  label,
  errorMessage,
  ...rest
}: FormInputProps): ReactElement => {
  const { getTheme } = useKaTheme()
  return (
    <StyledContainer>
      {label && <KaText fontType="body/lg_700">{label}</KaText>}
      <KaTextInput {...rest} isError={!!errorMessage} />
      {errorMessage && (
        <KaText fontType="body/sm_400" color={getTheme('danger', '5')}>
          {errorMessage}
        </KaText>
      )}
    </StyledContainer>
  )
}
