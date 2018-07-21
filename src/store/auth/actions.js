import firebase from '@firebase/app'

function buildUserObject (userData) {
  let user = {}
  user.displayName = userData.displayName ? userData.displayName : ''
  user.email = userData.email ? userData.email : ''
  user.phoneNumber = userData.phoneNumber ? userData.phoneNumber : ''
  user.photoURL = userData.photoURL ? userData.photoURL : ''
  user.id = userData.uid
  return user
}

export default {
  createNewUser: async function ({
    commit,
    dispatch
  }, payload) {
    // console.log('called createNewUser: ', payload)
    try {
      const newUser = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      // console.log(newUser)
      const user = newUser.user
      await user.updateProfile({
        displayName: payload.fullName
      })
      await user.sendEmailVerification()
      dispatch('signOutUser')
      return user
    } catch (error) {
      dispatch('signOutUser')
      throw error
    }
  },
  signInUser: async function ({
    commit,
    dispatch
  }, payload) {
    // console.log('called signInUser: ', payload)
    return new Promise(function (resolve, reject) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(async user => {
        // console.log('user signed in successfully: ', user)
        if (user.user.emailVerified === false) {
          user.user.sendEmailVerification()
          dispatch('signOutUser')
          reject(new Error('A verification link has been sent to your email address. please verify your email before signing in.'))
          return
        }
        // dispatch('sendTokenToServer', {
        //   status: true,
        //   userId: user.user.uid
        // })
        commit('SET_USER', buildUserObject(user.user))
        resolve(user.user)
      }).catch(error => {
        reject(error)
      })
    })
  },
  autoSignIn: async function ({
    commit,
    dispatch
  }) {
    const user = firebase.auth().currentUser
    return new Promise(async function (resolve, reject) {
      if (user) {
        // dispatch('sendTokenToServer', {
        //   status: true,
        //   userId: user.uid
        // })
        resolve(user)
        commit('SET_USER', buildUserObject(user))
      } else {
        reject(Error('no signed in user found'))
      }
    })
  },
  signOutUser: function ({
    commit
  }) {
    // console.log('called signOutUser.')
    return new Promise(function (resolve, reject) {
      firebase.auth().signOut().then(res => {
        commit('SET_USER', null)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  sendPasswordResetLink: function ({
    commit
  }, payload) {
    return new Promise(function (resolve, reject) {
      firebase.auth().sendPasswordResetEmail(payload.email).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUserProfile: async function ({
    commit
  }, payload) {
    console.log('called updateUserProfile: ', payload)
    var user = firebase.auth().currentUser
    return user.updateProfile({
      displayName: payload.displayName,
      photoURL: payload.photoUrl
    }).then(function () {
      return user.updateEmail(payload.email)
    }).catch(function (error) {
      return error
    })
  }
}
