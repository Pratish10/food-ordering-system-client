'use client'
import Image from 'next/image'
import React from 'react'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { useSearchParams } from 'next/navigation'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { getAllMenus, getMenuByCategory, type MenuItem } from '@/recoil/menu/atom'
import { cart } from '@/recoil/cart/atom'
import { Carrot, Drumstick } from 'lucide-react'
import { ClipLoader } from 'react-spinners'

export default function MenuCard (): React.JSX.Element {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const setCartValue = useSetRecoilState(cart)

  let menuDataLoadable
  if (category === null) {
    menuDataLoadable = useRecoilValueLoadable(getAllMenus)
  } else {
    menuDataLoadable = useRecoilValueLoadable(getMenuByCategory(category))
  }

  const addMenuToCart = (menu: MenuItem): void => {
    setCartValue((prevValue) => {
      const currentCart = Array.isArray(prevValue) ? prevValue : []
      const existingItem = currentCart.findIndex((item) => item.id === menu.id)

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

  if (menuDataLoadable.state === 'loading') {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="#fa822e" />
      </div>
    )
  }

  const menuData = menuDataLoadable.contents.responseData

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-60">
      {menuData.map((menu: MenuItem) => (
        <CardContainer className="inter-var" key={menu.id}>
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem translateZ="50" className="w-full">
              <Image
                src={menu.image}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={menu.name}
              />
            </CardItem>
            <CardItem translateZ="20" className="flex items-center text-xl font-bold text-neutral-600 mt-2 dark:text-white">
              {menu.type === 'Vegeterian'
                ? (
                <Carrot color="green" className="mr-2 h-4 w-4" />
                  )
                : (
                <Drumstick color="red" className="mr-2 h-4 w-4" />
                  )}
              {menu.name}
            </CardItem>
            <CardItem as="p" translateZ="30" className="text-neutral-500 text-sm max-w-sm  dark:text-neutral-300">
              {menu.description}
            </CardItem>
            <CardItem as="p" translateZ="30" className="text-neutral-500 text-sm max-w-sm  dark:text-neutral-300 font-semibold">
              ₹{menu.amount}
            </CardItem>
            <CardItem as="p" translateZ="30" className="text-neutral-500 text-sm max-w-sm  dark:text-neutral-300">
              {menu.category}
            </CardItem>
            <div className="flex justify-between items-center mt-5">
              <CardItem
                translateZ={10}
                as="button"
                className="w-full px-4 py-2 rounded-xl bg-orange-400 dark:bg-white dark:text-black text-white text-xs font-bold"
                onClick={() => {
                  addMenuToCart(menu)
                }}
              >
                Add Item
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  )
}
