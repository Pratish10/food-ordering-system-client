import { type NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST (req: NextRequest): Promise<NextResponse<unknown>> {
  try {
    const body = await req.json()
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = body

    const generatedSignature = razorpayOrderId + '|' + razorpayPaymentId
    const secret = process.env.RAZOR_PAY_KEY_SECRET

    if (secret == null) {
      console.error('RAZOR_PAY_KEY_SECRET is not set')
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(generatedSignature)
      .digest('hex')

    if (expectedSignature === razorpaySignature) {
      return new NextResponse(JSON.stringify(true), { status: 200 })
    } else {
      console.error('Verification failed: Signatures do not match')
      return new NextResponse('Verification failed', { status: 400 })
    }
  } catch (error) {
    console.error('Error during verification:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
