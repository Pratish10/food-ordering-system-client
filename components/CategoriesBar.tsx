'use client'
import { getAllCategories } from '@/recoil/menu/atom'
import Link from 'next/link'
import { useRecoilValueLoadable } from 'recoil'
import { useMediaQuery } from 'usehooks-ts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export const CategoriesBar = (): JSX.Element => {
  const categories = useRecoilValueLoadable(getAllCategories)
  const isDesktop = useMediaQuery('(min-width: 1229px)')

  if (categories.state === 'loading') {
    return (
      <div className="flex items-center justify-center container h-auto bg-white mt-2 py-6">
        loading...
      </div>
    )
  }

  if (isDesktop) {
    return (
      <div className="container bg-white h-auto my-5 py-6">
        <ul className="flex items-center justify-center space-x-14">
          {categories.state === 'hasValue' &&
            categories.contents.responseData.map((category) => (
              <Link
                key={category.id}
                href={`/menus?category=${category.category}`}
                className="hover:underline"
              >
                <li className='font-semibold'>{category.category}</li>
              </Link>
            ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="container bg-white h-auto my-5 py-6">
      <div className="flex items-center justify-center">
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {categories.state === 'hasValue' &&
              categories.contents.responseData.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={`/menus?category=${category.category}`}
                    className="hover:underline ml-20"
                  >
                    {category.category}
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="bg-slate-200 hover:bg-slate-200 mx-7" />
          <CarouselNext className="bg-slate-200 hover:bg-slate-200 mx-7" />
        </Carousel>
      </div>
    </div>
  )
}
