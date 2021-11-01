import * as firebase from 'firebase/app';
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALljewFZEYZH-r8PsZ8vHvOkMy7AK8RNk",
  authDomain: "auaha-ferramenta.firebaseapp.com",
  databaseURL: "https://auaha-ferramenta-default-rtdb.firebaseio.com",
  projectId: "auaha-ferramenta",
  storageBucket: "auaha-ferramenta.appspot.com",
  messagingSenderId: "521719919246",
  appId: "1:521719919246:web:b6cf5d005ba4cd36454fdf"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var storage = getStorage(app);
export default storage;