<template>
  <div>
    <component :is="component">
      <slot />
    </component>
    <v-snackbar
      :timeout="snackbarTimeout"
      :color="snackbarColor"
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn dark flat @click.native="snackbar = false">Dismiss</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import defaultLayout from './layouts/defaultLayout'
import authLayout from './layouts/authLayout'
import firebase from '@firebase/app'
import '@firebase/messaging'

export default {
  name: 'App',
  components: {
    defaultLayout,
    authLayout
  },
  computed: {
    component () {
      const route = this.$route
      if (route.name === 'auth') {
        return authLayout
      }
      return defaultLayout
    }
  },
  data () {
    return {
      snackbarTimeout: 3000,
      snackbar: false,
      snackbarText: '',
      snackbarColor: ''
    }
  },
  methods: {
    _showNetworkStatus ({ type }) {
      if (type === 'online') {
        this.snackbarText = 'back ONLINE'
        this.snackbarColor = 'green'
      } else {
        this.snackbarText = 'working OFFLINE'
        this.snackbarColor = 'red'
      }
      this.snackbar = true
    },
    promptToInstall (event) {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault()
      // Show the prompt
      event.prompt()
      // Wait for the user to respond to the prompt
      event.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
      })
    }
  },
  mounted () {
    window.addEventListener('offline', this._showNetworkStatus)
    window.addEventListener('online', this._showNetworkStatus)
    window.addEventListener('beforeinstallprompt', e => {
      this.promptToInstall(e)
    })
    const messaging = firebase.messaging()
    // [START receive_message]
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.setBackgroundMessageHandler` handler.
    messaging.onMessage(function (payload) {
      console.log('Message received. ', payload)
      // [START_EXCLUDE]
      // Update the UI to include the received message.
      // appendMessage(payload);
      // [END_EXCLUDE]
    })
    // [END receive_message]
  }
}
</script>
