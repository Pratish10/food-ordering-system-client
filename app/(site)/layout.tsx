import { Header } from '@/components/Header'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className='bg-slate-100 h-full'>
      <Header />
      {children}
    </div>
  )
}

export default layout
