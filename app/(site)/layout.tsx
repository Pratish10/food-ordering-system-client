import { BreadCrumbs } from '@/components/BreadCrumb'
import { Header } from '@/components/Header'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="container">
      <Header />
      <div className="pt-16 ">
        <BreadCrumbs />
        {children}
        </div>
    </div>
  )
}

export default layout
