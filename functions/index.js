const functions = require('firebase-functions');
const admin = require("firebase-admin");
const sendNotificationModule = require("./sendNotification");
// const cors = require("cors")({
//   origin: true
// });

admin.initializeApp();

exports.sendNotification = functions.firestore
  .document("/Users/{userId}/Notifications/{notificationId}")
  .onWrite(sendNotificationModule.handler);
