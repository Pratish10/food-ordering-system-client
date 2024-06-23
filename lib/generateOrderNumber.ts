export const generateOrderNumber = (): string => {
  const currentDate = new Date()
  const todayDateString = currentDate.toISOString().slice(0, 10) // YYYY-MM-DD format

  const lastOrderInfo = localStorage.getItem('lastOrderInfo')
  const lastOrderDate = localStorage.getItem('lastOrderDate')

  let orderNumber: number

  if (lastOrderDate === todayDateString && (lastOrderInfo != null)) {
    orderNumber = parseInt(lastOrderInfo, 10) + 1
  } else {
    orderNumber = 101
  }

  localStorage.setItem('lastOrderInfo', orderNumber.toString())
  localStorage.setItem('lastOrderDate', todayDateString)

  return `${orderNumber}`
}
