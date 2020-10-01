/* eslint-disable no-unused-vars */
const path = require('path');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const next = require('next');

admin.initializeApp();
const db = admin.firestore();
const promisePool = require('es6-promise-pool');

const { PromisePool } = promisePool;

const MAX_CONCURRENT = 3;

/**
 * Deletes one deleted user from the list.
 */
function deleteDeletedUser(deletedUsers) {
  if (deletedUsers.length > 0) {
    const userToDelete = deletedUsers.pop();
    // Delete the deleted user.
    return admin
      .auth()
      .deleteUser(userToDelete)
      .then(() => console.log(
        'Deleted user account',
        userToDelete,
        'because of inactivity',
      ))
      .catch((error) => console.error(
        'Deletion of inactive user account',
        userToDelete.uid,
        'failed:',
        error,
      ));
  }
  return null;
}

/**
 * Returns the list of all deleted users.
 */
async function getDeletedUsers(users = [], nextPageToken) {
  const usersInFirestore = await db
    .collection('Users')
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.id);
      });
      data.push('xurkAGnaNxRBE4yfFiB0ZZRWjSs2', 'X1u05GOtuFgIcuAQRUWkMTMZl6j1', 'pDWaCCkh1uRV9RHiIvzEd7IUf1t2', '2myC9RwhQmaEDT4IlsJ4sTzPb842');
      return data;
    });
  const result = await admin.auth().listUsers(1000, nextPageToken);
  // Find users that have not signed in in the last 30 days.
  const deletedUsers = result.users.filter(
    (user) => !usersInFirestore.includes(user.uid),
  );

  // Concat with list of previously found inactive users if there was more than 1000 users.
  // eslint-disable-next-line no-param-reassign
  users = users.concat(deletedUsers);

  // If there are more users to fetch we fetch them.
  if (result.pageToken) {
    return getDeletedUsers(users, result.pageToken);
  }

  return users;
}

/**
 * Run once a day at midnight, to cleanup the users
 * Manually run the task here https://console.cloud.google.com/cloudscheduler
 */
exports.accountcleanup = functions.pubsub
  .schedule('every day 00:00')
  .onRun(async (context) => {
    // Fetch all user details.
    const deletedUsers = await getDeletedUsers();
    // Use a pool so that we delete maximum `MAX_CONCURRENT` users in parallel.
    // eslint-disable-next-line no-shadow
    const promisePool = new PromisePool(
      () => deleteDeletedUser(deletedUsers),
      MAX_CONCURRENT,
    );
    await promisePool.start();
    console.log('Account clean up completed', deletedUsers.length);
  });

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
    'yusuf.abdulkarim@tellerium.io',
    'iedpu.usa@yahoo.com',
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
  }
  if (user.email && user.providerData[0].providerId === 'password') {
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
      email,
      displayName,
      photoURL,
      created,
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
