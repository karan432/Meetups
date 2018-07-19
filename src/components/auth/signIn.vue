<template>
  <v-card class="pa-1">
    <v-card-title align-center>
      <v-layout justify-center>
      <h2>SIGN IN</h2>
      </v-layout>
    </v-card-title>
    <form @submit.prevent="onSignIn">
      <v-layout row>
        <v-flex xs12>
          <v-text-field
          name="email"
          label="e-mail"
          id="email"
          prepend-icon="email"
          v-model="email"
          type="email"
          required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
          name="password"
          label="password"
          id="password"
          v-model="password"
          prepend-icon="lock"
          :append-icon="passVisible ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (passVisible = !passVisible)"
          :type="passVisible ? 'text' : 'password'"
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
          Sign In
        </v-btn>
      </v-card-actions>
    </form>
    <popUp
      :dialog="showPopUp"
      :body="popUpBody"
      :title="popUpTitle"
      :buttons="popUpButons"
      :color="popUpColor"
      v-on:okay="closePopUp"
      v-on:signInError="closePopUp"
    >
    </popUp>
  </v-card>
</template>

<script>
import popUp from '@/components/shared/popUp'
import {mapActions} from 'vuex'

export default {
  name: 'singIn',
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      passVisible: false,
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
  methods: {
    ...mapActions([
      'signInUser'
    ]),
    onSignIn () {
      this.loading = true
      this.signInUser({email: this.email, password: this.password}).then(user => {
        this.$emit('signInSuccess')
      }).catch(err => {
        this.popUpColor = 'red'
        this.popUpTitle = 'error'
        this.popUpButons = [{
          icon: '',
          text: 'OK',
          action: 'signInError',
          color: 'red',
          flat: false
        }]
        this.popUpBody = `could not signIn, ${err}`
        this.showPopUp = true
      }).then(() => {
        this.loading = false
      })
    },
    closePopUp () {
      this.showPopUp = false
    }
  },
  components: {
    popUp
  }
}
</script>

<style>
</style>
