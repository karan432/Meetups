import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import meetups from './meetups'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    meetups
  },
  strict: debug
})
