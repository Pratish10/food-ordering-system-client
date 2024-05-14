'use client'
import { Button } from '@/components/ui/button'
import { cart } from '@/recoil/cart/atom'
import { type MenuItem } from '@/recoil/menu/atom'
import { Carrot, Drumstick } from 'lucide-react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

const Cart: React.FC = () => {
  const [cartValue, setCartValue] = useRecoilState(cart)
  const cartItems = useRecoilValue(cart)

  const remove = (menu: MenuItem): void => {
    setCartValue((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === menu.id)

      if (index !== -1) {
        const updatedCart = [...prevCart]
        const originalAmount =
          parseFloat(updatedCart[index].amount) / Number(updatedCart[index].quantity)

        updatedCart[index] = {
          ...updatedCart[index],
          quantity: Number(updatedCart[index].quantity) - 1,
          amount: (
            parseFloat(updatedCart[index].amount) - originalAmount
          ).toFixed(2)
        }

        if (updatedCart[index].quantity === 0) {
          updatedCart.splice(index, 1)
        }

        return updatedCart
      }

      return prevCart
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="flex items-center justify-center text-2xl font-bold mb-4">
        Cart
      </h1>
      {cartItems.length === 0 && <h1 className='flex items-center justify-center h-full'>Your Cart is Empty</h1>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cartValue.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-4">
              <div className="flex items-center">
                {item.type === 'Vegeterian'
                  ? (
                  <Carrot color="green" className="mr-2 h-4 w-4" />
                    )
                  : (
                  <Drumstick color="red" className="mr-2 h-4 w-4" />
                    )}
                <h3 className="text-base font-semibold">{item.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm">₹{item.amount}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <p className="text-sm">Category: {item.category}</p>
              <Button
                variant="link"
                className="text-red-500 px-0"
                onClick={() => {
                  remove(item)
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <Button className="w-full px-4 py-2 rounded-xl bg-blue-400 text-white text-xs font-bold hover:bg-blue-400 my-10">
          Buy Now
        </Button>
      )}
    </div>
  )
}

export default Cart
