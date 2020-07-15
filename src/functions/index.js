const path = require('path');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const next = require('next');

admin.initializeApp();

const db = admin.firestore();

const createProfile = (user, context) => {
  const {
    email, uid, displayName, photoURL,
  } = user;
  const created = user.metadata.creationTime;

  const admins = [
    'tahirlanre@gmail.com',
    'haywhyze@hotmail.com',
    'haywhyze@gmail.com',
    'wahabson@gmail.com',
  ];

  if (user.email && admins.includes(user.email)) {
    const customClaims = {
      admin: true,
    };
    // Set custom user claims on this newly created user.
    return admin
      .auth()
      .setCustomUserClaims(user.uid, customClaims)
      .then(() => {
        // Update real-time database to notify client to force refresh.
        const metadataRef = db.ref(`metadata/${user.uid}`);
        // Set the refresh time to the current UTC timestamp.
        // This will be captured on the client to force a token refresh.
        return metadataRef.set({ refreshTime: new Date().getTime() });
      })
      .catch((error) => {
        console.log(error);
      });
  } if (user.email && user.providerData[0].providerId === 'password') {
    return admin
      .auth()
      .deleteUser(user.uid)
      .then(() => {
        console.log('Successfully deleted user');
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
  }
  return db
    .collection('Users')
    .doc(uid)
    .set({
      email, displayName, photoURL, created,
    })
    .catch(console.error);
};

const deleteProfile = (user, context) => db.collection('Users').doc(user.uid).delete().catch(console.error);

exports.authOnDelete = functions.auth.user().onDelete(deleteProfile);

exports.authOnCreate = functions.auth.user().onCreate(createProfile);

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` },
});
const handle = app.getRequestHandler();

exports.next = functions.https.onRequest((req, res) => {
  console.log(`File: ${req.originalUrl}`); // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});
