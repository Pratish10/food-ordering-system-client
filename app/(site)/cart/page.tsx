'use client'
import React, { useState } from 'react'

const Cart: React.FC = () => {
  const [shoppingCart, setShoppingCart] = useState([
    {
      id: '1',
      name: 'Pizza',
      description: 'Delicious pizza with cheese and toppings.',
      type: 'NonVegetarian',
      image: 'pizza.jpg',
      category: 'Main Course',
      amount: '$10.99',
      createdAt: '2024-05-08',
      updatedAt: '2024-05-08',
      isFeatured: true
    },
    {
      id: '2',
      name: 'Salad',
      description: 'Healthy salad with fresh vegetables.',
      type: 'Vegetarian',
      image: 'salad.jpg',
      category: 'Appetizer',
      amount: '$5.99',
      createdAt: '2024-05-08',
      updatedAt: '2024-05-08',
      isFeatured: false
    }
  ])

  const remove = (id: string): void => {
    setShoppingCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shoppingCart.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover object-center" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm">Type: {item.type}</p>
              <p className="text-sm">Amount: {item.amount}</p>
              <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => { remove(item.id) }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
