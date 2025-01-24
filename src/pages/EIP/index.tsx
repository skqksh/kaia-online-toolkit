import { ReactElement } from 'react'

import { PageContainer } from '@/components'
import { RoutePath } from '@/types'

const subMenuList = [
  {
    title: 'About',
    to: RoutePath.EIP,
  },
  {
    title: '20',
    to: RoutePath.EIP_20,
  },
  {
    title: '721',
    to: RoutePath.EIP_721,
  },
  {
    title: '1155',
    to: RoutePath.EIP_1155,
  },
]

const EIP_ERC = (): ReactElement => {
  return <PageContainer menuList={subMenuList} />
}

export default EIP_ERC
