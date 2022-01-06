import firebase from 'firebase'

const firebaseConfig = {
 apiKey: "AIzaSyDJcTx2BNbmUHMJWb7_iWGCY9EXWvo0u70",
  authDomain: "quiz-4e647.firebaseapp.com",
  databaseURL: "https://quiz-4e647-default-rtdb.firebaseio.com",
  projectId: "quiz-4e647",
  storageBucket: "quiz-4e647.appspot.com",
  messagingSenderId: "917251269043",
  appId: "1:917251269043:web:acca90616cf37ac8392bc6"
};
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig)
}else {
   firebase.app(); // if already initialized, use that one
}


export default firebase.database()
