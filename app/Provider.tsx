'use client'
import React from 'react'
import { RecoilRoot } from 'recoil'

const RecoilProvider = ({
  children
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default RecoilProvider
