'use client'
import { initializeRazorpay } from '@/actions/initialize-razor-pay'
import { Button } from '@/components/ui/button'
import { generateOrderNumber } from '@/lib/generateOrderNumber'
import { getAdminEndpoint } from '@/lib/getAdminEndpoint'
import { cart } from '@/recoil/cart/atom'
import { type MenuItem } from '@/recoil/menu/atom'
import { tableNumberVerification } from '@/recoil/table/atom'
import axios from 'axios'
import { Carrot, Drumstick } from 'lucide-react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { toast } from 'sonner'

const Cart: React.FC = () => {
  const [cartValue, setCartValue] = useRecoilState(cart)
  const cartItems = useRecoilValue(cart)
  const tableNumber = useRecoilValue(tableNumberVerification)

  const remove = (menu: MenuItem): void => {
    setCartValue((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === menu.id)

      if (index !== -1) {
        const updatedCart = [...prevCart]
        const originalAmount =
          parseFloat(updatedCart[index].amount) /
          Number(updatedCart[index].quantity)

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

  const saveOrder = async (orderId: string, tableNumber: string): Promise<void> => {
    try {
      const orderNumber = generateOrderNumber()

      const adminEndpoint = getAdminEndpoint()

      await axios.post(adminEndpoint + '/api/orders', {
        orderId,
        items: cartValue,
        tableNumber,
        orderNumber
      })

      toast.success('Order Placed!')
      setCartValue([])
    } catch (error) {
      console.error('Failed to save order:', error)
      toast.error('Failed to save order')
    }
  }

  const makePayment = async (): Promise<void> => {
    const totalAmount = cartValue.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    )

    const res = await initializeRazorpay()

    if (!res) {
      toast.error('Razorpay SDK Failed to load')
      return
    }

    // Make API call to the serverless API
    const response = await axios.post('/api/razorpay', { totalAmount })

    const data = response.data

    const options = {
      key: process.env.RAZOR_PAY_KEY_ID,
      name: 'Food Ordering System',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Thankyou for ordering food',
      handler: async function (response: {
        razorpay_payment_id: string
        razorpay_order_id: string
        razorpay_signature: string
      }) {
        try {
          const verification = await axios.post('/api/razorpay/verify', {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature
          })
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (verification.data) {
            toast.success('Payment verified successfully!')
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            await saveOrder(data.id, tableNumber)
          }
        } catch (error) {
          console.error('Verification failed:', error)
          toast.error('Verification failed')
        }
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

    paymentObject.on(
      'payment.failed',
      function (response: {
        error: {
          code: string
          description: string
          source: string
          step: string
          reason: string
          metadata: { order_id: string, payment_id: string }
        }
      }) {
        alert(response.error.description)
      }
    )
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="flex items-center justify-center text-2xl font-bold mb-4">
        Cart
      </h1>
      {cartItems.length === 0 && (
        <h1 className="flex items-center justify-center h-full">
          Your Cart is Empty
        </h1>
      )}
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
        <div className="flex justify-center">
          <Button
            className="w-1/4 px-4 py-2 rounded-xl bg-blue-400 text-white text-xs font-bold hover:bg-blue-400 my-10"
            onClick={() => {
              void makePayment()
            }}
          >
            Buy Now
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cart
