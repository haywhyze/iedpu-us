const path = require("path");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const next = require("next");

admin.initializeApp();

const db = admin.firestore();

const createProfile = (user, context) => {
  const { email, uid, displayName, photoURL } = user;

  if (user.email && user.email === "haywhyze@hotmail.com") {
    const customClaims = {
      admin: true,
    };
    // Set custom user claims on this newly created user.
    return admin
      .auth()
      .setCustomUserClaims(user.uid, customClaims)
      .then(() => {
        // Update real-time database to notify client to force refresh.
        const metadataRef = db.ref("metadata/" + user.uid);
        // Set the refresh time to the current UTC timestamp.
        // This will be captured on the client to force a token refresh.
        return metadataRef.set({ refreshTime: new Date().getTime() });
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (user.email && user.providerData[0].providerId === "password") {
    return admin
      .auth()
      .deleteUser(user.uid)
      .then(function () {
        console.log("Successfully deleted user");
      })
      .catch(function (error) {
        console.log("Error deleting user:", error);
      });
  }
  return db
    .collection("Users")
    .doc(uid)
    .set({ email, displayName, photoURL })
    .catch(console.error);
};

exports.authOnCreate = functions.auth.user().onCreate(createProfile);

var dev = process.env.NODE_ENV !== "production";
var app = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` },
});
var handle = app.getRequestHandler();

exports.next = functions.https.onRequest((req, res) => {
  console.log("File: " + req.originalUrl); // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});
