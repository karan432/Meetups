<template>
  <v-card class="pa-1">
    <v-card-title align-center>
      <v-layout justify-center>
      <h2>SIGN UP</h2>
      </v-layout>
    </v-card-title>
    <form @submit.prevent="onSignUp">
      <v-layout row>
        <v-flex xs12>
          <v-text-field
          name="full-name"
          label="full name"
          id="fullName"
          prepend-icon="person"
          v-model="fullName"
          type="text"
          required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
          name="email"
          label="e-mail"
          id="emailSignUp"
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
          id="passwordSignUp"
          v-model="password"
          prepend-icon="lock"
          :append-icon="passVisible ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (passVisible = !passVisible)"
          :type="passVisible ? 'text' : 'password'"
          required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <!-- <v-layout row>
        <v-flex xs12>
          <v-text-field
          name="confirmPassword"
          label="confirm password"
          id="confirmPassword"
          prepend-icon="lock"
          v-model="confirmPassword"
          type="password"
          :rules="[comparePasswords]"
          required
          ></v-text-field>
        </v-flex>
      </v-layout> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          @click="onClear"
        >
          clear
        </v-btn>
        <v-btn
          type="submit"
          color="secondary"
          :loading="loading"
          :disabled="loading"
        >
          Sign Up
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
      v-on:signUpSuccess="onSignUpSuccess"
      v-on:signUpError="closePopUp"
    >
    </popUp>
  </v-card>
</template>

<script>
import popUp from '@/components/shared/popUp'
import {mapActions} from 'vuex'

export default {
  name: 'signUp',
  data () {
    return {
      fullName: '',
      email: '',
      password: '',
      passVisible: false,
      // confirmPassword: '',
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
  computed: {
    // comparePasswords () {
    //   return this.password === this.confirmPassword ? true : 'Passwords do not match'
    // }
  },
  methods: {
    ...mapActions([
      'createNewUser'
    ]),
    onSignUp () {
      this.loading = true
      this.createNewUser({email: this.email, password: this.password, fullName: this.fullName}).then(res => {
        this.popUpColor = 'primary'
        this.popUpTitle = 'signed Up'
        this.popUpButons = [{
          icon: '',
          text: 'OK',
          action: 'signUpSuccess',
          color: 'primary',
          flat: false
        }]
        this.popUpBody = `A email verification has been sent to your email address (${this.email}). Verify your email before signing in.`
      }).catch(err => {
        this.popUpColor = 'red'
        this.popUpTitle = 'error'
        this.popUpButons = [{
          icon: '',
          text: 'OK',
          action: 'signUpError',
          color: 'red',
          flat: false
        }]
        this.popUpBody = `could not signUp, ${err}`
      }).then(() => {
        this.loading = false
        this.showPopUp = true
      })
    },
    onSignUpSuccess () {
      this.$emit('signUpSuccess')
      this.closePopUp()
      this.onClear()
    },
    closePopUp () {
      this.showPopUp = false
    },
    onClear () {
      this.fullName = ''
      this.email = ''
      this.password = ''
    }
  },
  components: {
    popUp
  }
}
</script>

<style>
</style>
