'use client'
import React from 'react'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { getAllCategories, getAllMenus, type MenuItem } from '@/recoil/menu/atom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Carrot, Drumstick } from 'lucide-react'
import { Button } from './ui/button'
import { cart } from '@/recoil/cart/atom'

export const Menus = (): React.JSX.Element => {
  const menus = useRecoilValueLoadable(getAllMenus)
  const categories = useRecoilValueLoadable(getAllCategories)
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

  const renderMenuItems = (category: string): React.JSX.Element[] => {
    const filteredMenus =
      menus.state === 'hasValue'
        ? menus.contents.responseData.filter(
          (menuItem) => menuItem.category === category
        )
        : []

    return filteredMenus.map((menuItem) => (
      <AccordionContent key={menuItem.id}>
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-4">
          <div className="flex">
            {menuItem.type === 'Vegeterian'
              ? (
              <Carrot color="green" className="mr-2 h-4 w-4" />
                )
              : (
              <Drumstick color="red" className="mr-2 h-4 w-4" />
                )}
            <p className="sm:text-xs md:text-base font-semibold">
              {menuItem.name}
            </p>
          </div>
          <div className="ml-auto font-semibold">₹{menuItem.amount}</div>
          <div className="text-gray-700">{menuItem.description}</div>
          <Button
            size="sm"
            className="px-4 py-2 rounded-xl bg-orange-400 text-white text-xs font-bold ml-auto hover:bg-orange-400"
            onClick={() => {
              addMenuToCart(menuItem)
            }}
          >
            Add Item
          </Button>
        </div>
      </AccordionContent>
    ))
  }

  return (
    <div className="my-3 py-3">
      <Accordion type="single" collapsible className="w-full">
        {categories.state === 'hasValue' &&
          categories.contents.responseData.map((category) => (
            <AccordionItem
              value={category.id}
              key={category.id}
              className="bg-white my-3 px-3"
            >
              <AccordionTrigger>{category.category}</AccordionTrigger>
              {renderMenuItems(category.category)}
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  )
}
