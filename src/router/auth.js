import auth from '@/pages/auth/auth'
import profile from '@/pages/auth/profile'

export const routes = [{
  path: '/auth',
  component: auth,
  name: 'auth',
  meta: {
    anonymous: true
  }
}, {
  path: '/profile',
  component: profile,
  name: 'profile',
  meta: {
    authenticated: true
  }
}]
