import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors')({ origin: true });
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const root = admin.database().ref('users');

export const getRefByCode = functions.https.onRequest((req, res) => {
    console.log(req.query);
    const code = req.query.code;

    let users, referral = null;

    cors(req, res, () => {
        root.once('value', u_snapshot => {
            users = u_snapshot.val();

            referral = Object.keys(users).reduce((ref, cur) => 
                ref = users[cur]['referral_code'] === code ? cur : ref
                , null);

            return res.status(200).json(referral);
        });
    });
});