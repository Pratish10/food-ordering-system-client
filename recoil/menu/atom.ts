import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import axios from 'axios'

export interface MenuItem {
  id: string
  name: string
  description: string
  type: 'Vegeterian' | 'nonVegeterian'
  image: string
  category: string
  amount: string
  createdAt: string
  updatedAt: string
  isFeatured: boolean
}

interface MenuResponse {
  totalRecords: number
  responseData: MenuItem[]
}

interface CategoryItem {
  id: string
  category: string
  createdAt: string
  updatedAt: string
  userId: string
}

interface CategoryResponse {
  totalRecords: number
  responseData: CategoryItem[]
}

export const getAllMenus = atom({
  key: 'allMenusAtom',
  default: selector({
    key: 'allMenus/default',
    get: async () => {
      const response = await axios.get('http://localhost:3000/api/menu')
      return response.data as MenuResponse
    }
  })
})

export const getAllCategories = atom({
  key: 'allCategoriesAtom',
  default: selector({
    key: 'allCategories/default',
    get: async () => {
      const response = await axios.get('http://localhost:3000/api/getCategories')
      return response.data as CategoryResponse
    }
  })
})

export const getMenuByCategory = atomFamily({
  key: 'menuByCategoryAtom',
  default: selectorFamily({
    key: 'menuByCategory/default',
    get: category => async () => {
      const response = await axios.get(`http://localhost:3000/api/menu?category=${category as string}`)
      return response.data as MenuResponse
    }
  })
})

export const getFeaturedMenus = atom({
  key: 'featuredMenusAtom',
  default: selector({
    key: 'featuredMenus/default',
    get: async () => {
      const response = await axios.get('http://localhost:3000/api/getFeaturedMenus')
      return response.data as MenuResponse
    }
  })
})

export const getMenuById = atomFamily({
  key: 'menuByIdAtom',
  default: selectorFamily({
    key: 'menuById/default',
    get: id => async () => {
      const response = await axios.get(`http://localhost:3000/api/menu/${id as string}`)
      return response.data as MenuItem
    }
  })
})
