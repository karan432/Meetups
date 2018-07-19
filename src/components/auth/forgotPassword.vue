<template>
  <v-card class="pa-1">
    <v-card-title align-center>
      <v-layout justify-center>
      <h2>RESET PASSWORD</h2>
      </v-layout>
    </v-card-title>
    <form @submit.prevent="onResetPassword">
      <v-layout row>
        <v-flex xs12>
          <v-text-field
          name="email"
          label="e-mail"
          id="emailResetPassword"
          prepend-icon="email"
          v-model="email"
          type="email"
          required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          type="submit"
          color="secondary"
          :loading="loading"
          :disabled="loading"
        >
          Reset
        </v-btn>
      </v-card-actions>
    </form>
    <pop-up
      :dialog="showPopUp"
      :body="popUpBody"
      :title="popUpTitle"
      :buttons="popUpButons"
      :color="popUpColor"
      v-on:okay="closePopUp"
    ></pop-up>
  </v-card>
</template>

<script>
import popUp from '../shared/popUp'
import {mapActions} from 'vuex'

export default {
  name: 'forgotPassword',
  data () {
    return {
      email: '',
      loading: false,
      showPopUp: false,
      popUpBody: '',
      popUpColor: 'primary',
      popUpTitle: '',
      popUpButons: [{
        icon: '',
        text: 'OK',
        action: 'okay',
        color: 'primary',
        flat: false
      }]
    }
  },
  components: {
    popUp
  },
  methods: {
    ...mapActions([
      'sendPasswordResetLink'
    ]),
    onResetPassword () {
      this.loading = true
      this.sendPasswordResetLink({email: this.email}).then(res => {
        this.popUpColor = 'primary'
        this.popUpTitle = 'signed Up'
        this.popUpButons = [{
          icon: '',
          text: 'OK',
          action: 'okay',
          color: 'primary',
          flat: false
        }]
        this.popUpBody = `A password reset link has been set to your email (${this.email}).`
      }).catch(err => {
        this.popUpColor = 'red'
        this.popUpTitle = 'error'
        this.popUpButons = [{
          icon: '',
          text: 'OK',
          action: 'okay',
          color: 'red',
          flat: false
        }]
        this.popUpBody = `${err}`
      }).then(() => {
        this.showPopUp = true
        this.loading = false
      })
    },
    closePopUp () {
      this.showPopUp = false
    }
  }
}
</script>

<style>
</style>
