// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from '@firebase/app'
import {
  config
} from './config/firebaseConfig'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VCard,
  VTooltip,
  VMenu,
  VSubheader,
  VTextField,
  VAvatar,
  VBadge,
  VDivider,
  VTabs,
  VDialog,
  VDatePicker,
  VTimePicker,
  VSnackbar,
  VProgressCircular,
  VSelect
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'
import '@firebase/firestore'
import '@firebase/auth'
import '@firebase/messaging'

firebase.initializeApp(config)
const db = firebase.firestore()
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)
db.enablePersistence()
  .then(function () {
    console.log('persistence mode enabled.')
  })
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCard,
    VTooltip,
    VMenu,
    VSubheader,
    VTextField,
    VAvatar,
    VBadge,
    VDivider,
    VTabs,
    VDialog,
    VDatePicker,
    VTimePicker,
    VSnackbar,
    VProgressCircular,
    VSelect
  }
  // theme: {
  //   primary: '#ee44aa',
  //   secondary: '#424242',
  //   accent: '#82B1FF',
  //   error: '#FF5252',
  //   info: '#2196F3',
  //   success: '#4CAF50',
  //   warning: '#FFC107'
  // }
})

Vue.config.productionTip = false
const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  unsubscribe()
  // console.log('firebaseUser: ', firebaseUser)
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: {
      App
    },
    template: '<App/>',
    created () {
      this.$store.dispatch('autoSignIn')
      const messaging = firebase.messaging()
      messaging.usePublicVapidKey('BBGVqGt8qLXooffdQx9j9pumI9SF-0lOEyQkOyAhGO_DOdAdOJL6-ZN8arf7Vft0lChgXU3jK12kMo9O8ZKsUvI')
      messaging.requestPermission().then(function () {
        console.log('Notification permission granted.')
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
      }).catch(function (err) {
        console.log('Unable to get permission to notify.', err)
      })
      window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        event.preventDefault()
        // Show the prompt
        event.prompt()
        // Wait for the user to respond to the prompt
        event.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt')
            } else {
              console.log('User dismissed the A2HS prompt')
            }
          })
      })
    }
  })
})
