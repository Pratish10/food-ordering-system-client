import { CategoriesBar } from '@/components/CategoriesBar'
import { Featured } from '@/components/Featured'
import { Menus } from '@/components/Menus'
import React from 'react'

export default function Home (): JSX.Element {
  return (
    <div>
      <CategoriesBar />
      <Featured />
      <Menus />
    </div>
  )
}
