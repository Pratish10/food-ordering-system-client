'use client'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { getAllCategories, getAllMenus } from '@/recoil/menu/atom'
import { Carrot, Drumstick } from 'lucide-react'
import React from 'react'
import { useRecoilValueLoadable } from 'recoil'

interface SearchBoxProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchBox = ({
  open,
  setOpen
}: SearchBoxProps): React.JSX.Element => {
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
      <CommandItem className="cursor-pointer" key={menuItem.id}>
        {menuItem.type === 'Vegeterian'
          ? (
          <Carrot color="green" className="mr-2 h-4 w-4" />
            )
          : (
          <Drumstick color="red" className="mr-2 h-4 w-4" />
            )}
        <span>{menuItem.name}</span>
      </CommandItem>
    ))
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search any dish" />
      <CommandList>
        <CommandEmpty>No Dishes found</CommandEmpty>
        {categories.state === 'hasValue' &&
          categories.contents.responseData.map((categoryItem) => (
            <CommandGroup key={categoryItem.id} heading={categoryItem.category}>
              {renderMenuItems(categoryItem.category)}
            </CommandGroup>
          ))}
      </CommandList>
    </CommandDialog>
  )
}
