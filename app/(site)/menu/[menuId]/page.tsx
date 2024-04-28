'use client'
import { getMenuById } from '@/recoil/menu/atom'
import React from 'react'
import { useRecoilValueLoadable } from 'recoil'

interface MenuDetailProps {
  params: {
    menuId: string
  }
}

const page = ({ params }: MenuDetailProps): JSX.Element => {
  const menu = useRecoilValueLoadable(getMenuById(params.menuId))
  if (menu.state === 'loading') {
    return <React.Fragment>Loading...</React.Fragment>
  }
  return <div>{JSON.stringify(menu.contents)}</div>
}

export default page
