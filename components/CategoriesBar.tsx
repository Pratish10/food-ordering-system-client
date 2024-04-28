'use client'
import { getAllCategories } from '@/recoil/menu/atom'
import Link from 'next/link'
import { useRecoilValueLoadable } from 'recoil'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useMediaQuery } from 'usehooks-ts'

const CategoriesBar = (): JSX.Element => {
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
      <div className="container bg-white h-auto my-2 py-6">
        <ul className="flex items-center justify-center space-x-14">
          {categories.state === 'hasValue' &&
            categories.contents.responseData.map((category) => (
              <Link
                key={category.id}
                href={`/menus?category=${category.category}`}
                className="hover:underline"
              >
                <li>{category.category}</li>
              </Link>
            ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="container bg-white h-auto my-2 py-6">
      <Swiper spaceBetween={30} slidesPerView={3}>
        <ul className="flex items-center justify-center space-x-14">
          {categories.state === 'hasValue' &&
            categories.contents.responseData.map((category) => (
              <SwiperSlide key={category.id}>
                <Link
                  href={`/menus?category=${category.category}`}
                  className="hover:underline"
                >
                  <li>{category.category}</li>
                </Link>
              </SwiperSlide>
            ))}
        </ul>
      </Swiper>
    </div>
  )
}

export default CategoriesBar
