'use client'
import React, { useState } from 'react'
import { AlignLeft, Search, ShoppingCart } from 'lucide-react'

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
import { useRouter } from 'next/navigation'
import { cart, notification } from '@/recoil/cart/atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import Link from 'next/link'

export const Header = (): React.JSX.Element => {
  const cartItems = useRecoilValue(cart)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [expandedDropdowns, setExpandedDropdowns] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [showNotification, setShowNotification] = useRecoilState(notification)

  const router = useRouter()

  const toggleSearchBox = (): void => {
    setOpen((open) => !open)
  }

  const handleCartClick = (): void => {
    router.push('/cart')
    if (cartItems.length > 0) {
      setShowNotification(true)
    }
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])

  React.useEffect(() => {
    if (cartItems.length === 0) {
      setShowNotification(false)
    }
  }, [cartItems])

  return (
    <nav className="flex items-center bg-orange-300 h-16 w-full fixed inset-x-0 mx-auto z-50">
      <div className="flex justify-start items-center flex-grow space-x-4 px-3 ml-4">
        <Sheet>
          <SheetTrigger>
            <AlignLeft />
          </SheetTrigger>
          <SheetContent className="overflow-y-auto overflow-x-hidden h-full">
            <SheetHeader>
              <SheetTitle className="pointer">
                <Link href="/">Logo here</Link>
              </SheetTitle>
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
        <div className="pointer">
          <Link href="/">logo</Link>
        </div>
      </div>
      <div className="flex justify-center mr-4">
        <Button
          className="rounded-full hover:bg-orange-400"
          size="icon"
          onClick={handleCartClick}
        >
          <ShoppingCart />
          {!showNotification && cartItems.length > 0 && (
            <span className="bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs absolute top-2 ml-5">
              {cartItems.length}
            </span>
          )}
        </Button>
        <Button
          className="rounded-full hover:bg-orange-400"
          size="icon"
          onClick={toggleSearchBox}
        >
          <Search />
        </Button>
        <SearchBox open={open} setOpen={setOpen} />
      </div>
    </nav>
  )
}
