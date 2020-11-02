import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDhUUyxmahOT11VEWSSW06BHvShRSwyRfU',
  authDomain: 'instagram-clone-5a807.firebaseapp.com',
  databaseURL: 'https://instagram-clone-5a807.firebaseio.com',
  projectId: 'instagram-clone-5a807',
  storageBucket: 'instagram-clone-5a807.appspot.com',
  messagingSenderId: '705303293444',
  appId: '1:705303293444:web:206a69f790b20a199acf51',
  measurementId: 'G-J4LFMEDEWS',
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
export { db, auth, storage }
