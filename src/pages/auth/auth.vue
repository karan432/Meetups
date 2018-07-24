<template>
  <div>
    <v-toolbar
      color="primary"
      dark
      extended
      extension-height="100"
      flat
      class="pt-2"
    >
    <v-toolbar-title  class="mx-auto">
      <router-link
        :to="{name: 'home'}"
        tag="span" 
        style="cursor: pointer"
      >
        <v-avatar>
          <img
            src="../../../static/img/icons/meetup-icon.png"
            alt="meetup_img"
          >
        </v-avatar>
        Meetups
      </router-link>
    </v-toolbar-title>
    </v-toolbar>
    <v-container class="card--flex-toolbar">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card elevation-12>
            <v-tabs
              v-model="active"
              fixed-tabs
            >
              <v-tab
                :key="1"
                ripple
              >
                Sing In
              </v-tab>
              <v-tab-item
                :key="1"
              >
                <sign-in
                  v-on:signInSuccess="onSignInSuccess"
                ></sign-in>
              </v-tab-item>
              <v-tab
                :key="2"
                ripple
              >
                Forgot Password
              </v-tab>
              <v-tab-item
                :key="2"
              >
                <forgot-password></forgot-password>
              </v-tab-item>
              <v-tab
                :key="3"
                ripple
              >
                Sign Up
              </v-tab>
              <v-tab-item
                :key="3"
              >
                <sign-up
                  v-on:signUpSuccess="onSignUpSuccess"
                ></sign-up>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import signIn from '@/components/auth/signIn'
import signUp from '@/components/auth/signUp'
import forgotPassword from '@/components/auth/forgotPassword'
import { mapGetters } from 'vuex'

export default {
  name: 'auth',
  data () {
    return {
      active: null
    }
  },
  components: {
    signIn,
    signUp,
    forgotPassword
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ])
  },
  methods: {
    onSignUpSuccess () {
      this.active = 0
    },
    onSignInSuccess () {
      this.redirect()
    },
    redirect () {
      const redirectPath = this.$route.query.redirect
      // console.log('redirect path: ', redirectPath)
      if (redirectPath) {
        this.$router.push({ path: redirectPath })
      } else {
        this.$router.push({name: 'home'})
      }
    }
  },
  watch: {
    isAuthenticated (value) {
      if (value) {
        this.redirect()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeEnter to: ', to)
    console.log('beforeEnter from: ', from)
    next(vm => {
      console.log('auth state: ', vm.$store.getters.isAuthenticated)
      if (vm.$store.getters.isAuthenticated) {
        next({name: 'home'})
      }
    })
  }
}
</script>

<style>
.card--flex-toolbar {
  margin-top: -64px;
}
</style>
