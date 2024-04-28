'use client'
import React, { useState } from 'react'
import { AlignLeft, Search } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Nav } from '@/components/SideBar/Nav'
import { sideBarLinks } from '@/Constants'
import { Button } from './ui/button'
import { SearchBox } from './SearchBox'

export const Header = (): React.JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [expandedDropdowns, setExpandedDropdowns] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const toggleSearchBox = (): void => {
    setOpen((open) => !open)
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => { document.removeEventListener('keydown', down) }
  }, [])

  return (
    <nav className="flex items-center bg-orange-300 h-16 w-full">
      <div className="flex justify-start items-center flex-grow space-x-4 px-3 ml-4">
        <Sheet>
          <SheetTrigger>
            <AlignLeft />
          </SheetTrigger>
          <SheetContent className="overflow-y-auto overflow-x-hidden h-full">
            <SheetHeader>
              <SheetTitle>Logo here</SheetTitle>
              <SheetDescription>
                <Nav
                  isCollapsed={isCollapsed}
                  setIsCollapsed={setIsCollapsed}
                  expandedDropdowns={expandedDropdowns}
                  setExpandedDropdowns={setExpandedDropdowns}
                  Links={sideBarLinks}
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="">logo</div>
      </div>
      <div className="flex justify-center mr-4">
        <Button className='rounded-full hover:bg-orange-400' size='icon' onClick={toggleSearchBox}>
          <Search />
        </Button>
        <SearchBox open={open} setOpen={setOpen} />
      </div>
    </nav>
  )
}
