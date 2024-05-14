'use client'
import { getFeaturedMenus, type MenuItem } from '@/recoil/menu/atom'
import React from 'react'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import { cart } from '@/recoil/cart/atom'
import { ClipLoader } from 'react-spinners'

export const Featured = (): React.JSX.Element => {
  const featuredMenus = useRecoilValueLoadable(getFeaturedMenus)
  const setCartValue = useSetRecoilState(cart)

  const addMenuToCart = (menu: MenuItem): void => {
    setCartValue((prevValue) => {
      const currentCart = Array.isArray(prevValue) ? prevValue : []
      const existingItem = currentCart.findIndex(item => item.id === menu.id)

      if (existingItem !== -1) {
        const updatedCart = [...prevValue]
        updatedCart[existingItem] = {
          ...updatedCart[existingItem],
          quantity: Number(updatedCart[existingItem].quantity) + 1,
          amount: (Number(menu.amount) * (Number(updatedCart[existingItem].quantity) + 1)).toFixed(2)
        }
        return updatedCart
      } else {
        return [...prevValue, { ...menu, quantity: 1 }]
      }
    })
  }

  if (featuredMenus.state === 'loading') {
    return (
      <div className="flex items-center justify-center bg-white container h-auto my-5 py-6">
        <ClipLoader color="#fa822e" />
      </div>
    )
  }

  return (
    <div className="container bg-white h-auto">
      <p className="font-semibold p-2 py-5 text-2xl">Featured</p>
      <Carousel
        opts={{
          align: 'start'
        }}
      >
        <CarouselContent className="w-full max-w-sm">
          {featuredMenus.state === 'hasValue' &&
            featuredMenus.contents.responseData.map((menu) => (
              <CarouselItem key={menu.id} className="basis-1/2">
                <div className="p-1">
                  <Card className="w-full max-w-xs rounded-xl border width">
                    <div className="grid gap-4 p-4">
                      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                        <Image
                          alt={menu.name}
                          className="aspect-[4/5] object-cover border w-full"
                          height="500"
                          src={menu.image}
                          width="400"
                        />
                      </div>
                      <div className="grid gap-1.5">
                        <h3 className="font-semibold text-sm md:text-base">
                          {menu.name}
                        </h3>
                        <p className="font-semibold text-sm md:text-base">
                          ₹{menu.amount}
                        </p>
                        <p className="hidden md:flex text-sm md:text-base text-muted">
                          {menu.description}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="w-full px-4 py-2 rounded-xl bg-orange-400 text-white text-xs font-bold hover:bg-orange-400"
                        onClick={() => {
                          addMenuToCart(menu)
                        }}
                      >
                        Add Item
                      </Button>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="bg-slate-200 hover:bg-slate-200 mx-7" />
        <CarouselNext className="bg-slate-200 hover:bg-slate-200 mx-7" />
      </Carousel>
    </div>
  )
}
