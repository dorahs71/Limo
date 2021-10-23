import firebase from 'firebase/app';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAQRmXU0UXeE0xSvzCQPUy14YkigXX1B5Y',
//   authDomain: 'limo-movie.firebaseapp.com',
//   projectId: 'limo-movie',
//   storageBucket: 'limo-movie.appspot.com',
//   messagingSenderId: '153859985483',
//   appId: '1:153859985483:web:21d3bc8b9d23362a80fdce',
// };

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
