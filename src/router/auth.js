import auth from '@/pages/auth/auth'

export const routes = [{
  path: '/auth',
  component: auth,
  name: 'auth',
  meta: {
    anonymous: true
  }
}]
