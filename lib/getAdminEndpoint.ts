export const getAdminEndpoint = (): string | undefined => {
  let adminEndpoint
  if (process.env.NODE_ENV === 'development') {
    adminEndpoint = 'http://localhost:3000'
  } else if (process.env.NODE_ENV === 'production') {
    adminEndpoint = 'https://food-ordering-system-admin.vercel.app'
  }
  return adminEndpoint
}
