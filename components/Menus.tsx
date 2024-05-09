'use client'
import React from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { getAllCategories, getAllMenus } from '@/recoil/menu/atom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Carrot, Drumstick } from 'lucide-react'

export const Menus = (): React.JSX.Element => {
  const menus = useRecoilValueLoadable(getAllMenus)
  const categories = useRecoilValueLoadable(getAllCategories)

  const renderMenuItems = (category: string): React.JSX.Element[] => {
    const filteredMenus =
      menus.state === 'hasValue'
        ? menus.contents.responseData.filter(
          (menuItem) => menuItem.category === category
        )
        : []

    return filteredMenus.map((menuItem) => (
      <AccordionContent key={menuItem.id}>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex">
            {menuItem.type === 'Vegeterian'
              ? (
              <Carrot color="green" className="mr-2 h-4 w-4" />
                )
              : (
              <Drumstick color="red" className="mr-2 h-4 w-4" />
                )}
            <p
              className="sm:text-xs md:text-base font-semibold"
            >
              {menuItem.name}
            </p>
          </div>
          <div className="ml-auto font-semibold">₹{menuItem.amount}</div>
          <div className="text-gray-400">{menuItem.description}</div>
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
