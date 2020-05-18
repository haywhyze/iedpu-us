const path = require("path");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const next = require("next");

admin.initializeApp();

const db = admin.firestore();

const createProfile = (userRecord, context) => {
  const { email, uid, displayName } = userRecord;

  return db
    .collection("Users")
    .doc(uid)
    .set({ email, displayName })
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
