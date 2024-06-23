/* eslint-disable @typescript-eslint/naming-convention */
import { type NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import shortid from 'shortid'

export const dynamic = 'force-dynamic'

export async function POST (req: NextRequest): Promise<NextResponse<unknown> | undefined> {
  const body = await req.json()
  const { totalAmount } = body

  const key_id = process.env.RAZOR_PAY_KEY_ID
  const key_secret = process.env.RAZOR_PAY_KEY_SECRET

  if ((key_id == null) || (key_secret == null)) {
    console.error('Razorpay key_id or key_secret is not defined')
    return new NextResponse('Server configuration error', { status: 500 })
  }

  const razorpay = new Razorpay({
    key_id,
    key_secret
  })

  // Create an order -> generate the OrderID -> Send it to the Front-end
  // Also, check the amount and currency on the backend (Security measure)
  const paymentCapture = 1
  const currency = 'INR'
  const options = {
    amount: (totalAmount * 100).toFixed(0).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture: paymentCapture
  }

  const headers = {
    'Cache-Control': 'no-store'
  }

  try {
    const response = await razorpay.orders.create(options)

    return new NextResponse(JSON.stringify(response), { status: 200, headers })
  } catch (error) {
    console.error('POST_RAZOR_PAY_ERROR:', error)
    return new NextResponse(error as string, { status: 500 })
  }
}
