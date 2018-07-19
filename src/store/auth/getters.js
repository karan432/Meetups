export default {
  getUser (state) {
    return Object.assign({}, state.user)
  },
  isAuthenticated (state) {
    return state.user ? !!state.user.id : false // !== null && state.user !== undefined
  }
}
