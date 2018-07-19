const admin = require('firebase-admin');

// exports.handler = (event) => {
exports.handler = (change, context) => {
  const userId = context.params.userId
  var notification = change.after.exists ? change.after.data() : null
  console.log('new notification: ', notification)
  console.log('userId: ', userId)
  const db = admin.firestore()
  let notificationTokens = []
  const userDocRef = db.doc(`/Users/${userId}`)
  return userDocRef.get().then(userDoc => {
    if (userDoc.exists) {
      var tokens = userDoc.data().notificationTokens
      Object.keys(tokens).forEach(token => {
        if (tokens[token]) {
          notificationTokens.push(token)
        }
      })
    } else {
      notificationTokens = []
    }
    console.log('notificationTokens: ', notificationTokens)
    return notificationTokens
  }).then(tokens => {
    const payload = {
      "data": {
        "title": notification.title,
        "body": notification.body,
        "icon": "static/img/icons/meetup-icon.png",
        "data": `{"link": ""}`
      }
    }
    return admin.messaging().sendToDevice(tokens, payload)
  }).then((response) => {
    // For each message check if there was an error.
    console.log('notification sending completed.', response)
    const tokensToRemove = [];
    response.results.forEach((result, index) => {
      const error = result.error;
      if (error) {
        const token = notificationTokens[index]
        console.error('Failure sending notification to', token, error);
        // Cleanup the tokens who are not registered anymore.
        if (error.code === 'messaging/invalid-registration-token' ||
          error.code === 'messaging/registration-token-not-registered') {
          console.log('delete token: ', token)
          var tokenStatus = {}
          tokenStatus[token] = false
          tokensToRemove.push(userDocRef.set({
            notificationTokens: tokenStatus
          }, {
            merge: true
          }))
        }
      }
    });
    return Promise.all(tokensToRemove)
  }).catch(error => {
    console.log('error occured while sending notification, ', error)
    return error
  })
};
