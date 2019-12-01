import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCC2R1-VfUKacliuWIicWqajXrBhETP6zs",
    authDomain: "reactnativelessonone.firebaseapp.com",
    databaseURL: "https://reactnativelessonone.firebaseio.com",
    projectId: "reactnativelessonone",
    storageBucket: "reactnativelessonone.appspot.com",
    messagingSenderId: "445406854502",
    appId: "1:445406854502:web:b323f3cbb824a9e9ea5ca7"
  };
  // Initialize Firebase
 export default firebase.initializeApp(firebaseConfig);
