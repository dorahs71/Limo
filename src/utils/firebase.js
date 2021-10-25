import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();

export const firestore = firebase.firestore();
export const createUserDoc = async (user, userName) => {
  if (!user) return;

  const userRef = firestore.doc(`Users/${user.uid}`);
  const { email, uid } = user;
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    try {
      userRef.set({
        email,
        uid,
        birthday: new Date().toLocaleString().slice(0, 10),
        profileImg:
          'https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fbaby.png?alt=media&token=e38c438f-7632-45e2-aadc-ea2fd82f6956',
        userName,
        score: 0,
        likeList: [],
        follow: [],
      });
    } catch (error) {
      console.log(error);
    }
  }
};
