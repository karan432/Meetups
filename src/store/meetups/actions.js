import firebase from '@firebase/app'

export default {
  createNewMeetup: async function ({
    getters
  }, meetup) {
    // console.log('called createNewMeetup: ', meetup)
    const user = getters.getUser
    let meetupsCollection = firebase.firestore().collection(`meetups`)
    let ref = meetupsCollection.doc()
    let id = ref.id
    const newMeetup = Object.assign(meetup, {
      id: id,
      user: {
        ...user
      },
      created: firebase.firestore.FieldValue.serverTimestamp()
    })
    return meetupsCollection.doc(id).set(newMeetup)
  },
  updateExistingMeetup: async function ({
    commit
  }, meetup) {
    // console.log('called updateMeetup action: ', meetup)
    let meetupsCollection = firebase.firestore().collection(`meetups`)
    return meetupsCollection.doc(meetup.id).set(meetup)
  },
  fetchMyMeetups: async function ({
    getters,
    commit
  }) {
    // console.log('called fetchMyMeetps')
    const user = getters.getUser
    const db = firebase.firestore()
    var citiesRef = db.collection('meetups')

    // Create a query against the collection.
    const query = citiesRef.where('user.id', '==', user.id)
    query.onSnapshot(function (querySnapshot) {
      var myMeetups = {}
      querySnapshot.forEach(function (doc) {
        const meetup = doc.data()
        myMeetups[meetup.id] = meetup
      })
      // console.log('myMeetups: ', myMeetups)
      commit('SET_MY_MEETUPS', myMeetups)
    })
  },
  fetchAllMeetups: async function ({
    commit
  }) {
    // console.log('called fetchAllMeetups')
    const db = firebase.firestore()
    var meetupRef = db.collection('meetups')
    meetupRef.onSnapshot(function (querySnapshot) {
      var meetups = {}
      querySnapshot.forEach(function (doc) {
        const meetup = doc.data()
        meetups[meetup.id] = meetup
      })
      // console.log('meetups: ', meetups)
      commit('SET_MEETUPS', meetups)
    })
  },
  updateGoingStatus: async function ({
    getters
  }, payload) {
    const meetup = payload.meetup
    const status = payload.status
    const user = getters.getUser
    const db = firebase.firestore()
    var docRef = db.collection(`meetups/${meetup.id}/going`).doc(`${user.id}`)
    if (status) {
      return docRef.set({going: true, ...user})
    } else {
      return docRef.delete()
    }
  },
  isGoing: function ({
    getters
  }, meetup) {
    const user = getters.getUser
    const db = firebase.firestore()
    var docRef = db.collection(`meetups/${meetup.id}/going`).doc(`${user.id}`)
    return docRef.get().then(function (doc) {
      if (doc.exists) {
        return true
      } else {
        return false
      }
    })
  },
  fetchAllGoingUsers: async function ({
    commit
  }, meetup) {
    const db = firebase.firestore()
    var goingRef = db.collection(`meetups/${meetup.id}/going`)
    return new Promise((resolve, reject) => {
      goingRef.onSnapshot(function (querySnapshot) {
        var users = {}
        querySnapshot.forEach(function (doc) {
          const user = doc.data()
          users[user.id] = user
        })
        // console.log('users: ', users)
        resolve(users)
        return users
      })
    })
  }
}
