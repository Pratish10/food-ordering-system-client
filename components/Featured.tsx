'use client'
import { getFeaturedMenus } from '@/recoil/menu/atom'
import React from 'react'
import { useRecoilValueLoadable } from 'recoil'
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

export const Featured = (): React.JSX.Element => {
  const featuredMenus = useRecoilValueLoadable(getFeaturedMenus)

  if (featuredMenus.state === 'loading') {
    return (
      <div className="flex items-center justify-center container h-auto bg-white mt-2 py-6">
        loading...
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
                      <Button size="sm" className='bg-orange-400 text-white hover:bg-orange-500'>Add Item</Button>
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
