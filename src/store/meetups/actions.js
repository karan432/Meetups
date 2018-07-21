import firebase from '@firebase/app'

export default {
  createNewMeetup: async function ({
    getters
  }, meetup) {
    console.log('called createNewMeetup: ', meetup)
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
  }
}
