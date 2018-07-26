import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  coverPicProgress: 0,
  myMeetups: {},
  meetups: {},
  categories: [
    'Sports & Fitness',
    'Health & Wellness',
    'Technology',
    'Outdoor & Adventure',
    'Music',
    'Spirituality',
    'Fashion & Beauty',
    'Arts',
    'Film',
    'Writing',
    'Other'
  ]
}

export default {
  state,
  actions,
  mutations,
  getters
}
