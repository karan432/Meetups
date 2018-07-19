import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routes as home
} from './home'
import {
  routes as auth
} from './auth'
import {
  routes as meetups
} from './meetups'

Vue.use(VueRouter)

var router = new VueRouter({
  mode: 'history',
  routes: [
    ...home, ...auth, ...meetups
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log('inside beforeEach')
//   console.log('to: ', to.name)
//   console.log('from: ', from.name)
//   const isAuthenticated = store.getters.isAuthenticated
//   console.log('isAuthenticated: ', isAuthenticated)
//   if (to.matched.some(record => record.meta.anonymous)) {
//     console.log('user is already signed in...')
//     if (isAuthenticated) {
//       console.log('user is authenticated, going to home.')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     console.log('authentication is required.')
//     if (isAuthenticated) {
//       console.log('user is authenticated, going to : ', next)
//       next()
//     } else {
//       console.log('trying to auto sign in')
//       store.dispatch('autoSignIn').then((currentUser) => {
//         // console.log('current user: ', currentUser)
//         if (currentUser) {
//           // console.log('user is present')
//           next()
//         } else {
//           // console.log('user is absent')
//           next({
//             name: 'auth',
//             query: {
//               redirect: to.fullPath
//             }
//           })
//         }
//       }).catch(() => {
//         console.log('an error occured in auto sign in.')
//         next({
//           name: 'signIn',
//           query: {
//             redirect: to.fullPath
//           }
//         })
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
