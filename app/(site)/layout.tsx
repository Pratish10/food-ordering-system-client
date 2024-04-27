import { Header } from '@/components/Header'
import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'

const layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element => {
  return (
    <div>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>
          <Header />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default layout
