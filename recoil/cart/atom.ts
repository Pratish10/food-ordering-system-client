import { atom } from 'recoil'
import { type MenuItem } from '../menu/atom'

export const cart = atom<MenuItem[]>({
  key: 'foodCart',
  default: []
})
export const notification = atom({
  key: 'cartNotification',
  default: false
})
