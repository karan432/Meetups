export default {
  getCoverPicProgress (state) {
    return state.coverPicProgress
  },
  getMyMeetups (state) {
    return JSON.parse(JSON.stringify(state.myMeetups))
  },
  getMeetups (state) {
    return JSON.parse(JSON.stringify(state.meetups))
  }
}
