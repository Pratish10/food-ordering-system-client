import { BreadCrumbs } from '@/components/BreadCrumb'
import { Header } from '@/components/Header'
import React from 'react'
import { Toaster } from '@/components/ui/sonner'

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="container">
      <Header />
      <div className="pt-16 ">
        <BreadCrumbs />
        {children}
        <Toaster position='top-center' richColors />
        </div>
    </div>
  )
}

export default layout
