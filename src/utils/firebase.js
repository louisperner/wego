import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, onSnapshot, getFirestore, getDocs, setDoc, doc } from '@firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, '3Deditor');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => {
    return {
      uid: doc.id,
      data: doc.data(),
    };
  });
  return cityList;
}

async function setCode(db, code, uid) {
  const docRef = doc(db, '3Deditor', uid);

  const data = {
    code: code,
  };

  setDoc(docRef, data)
    .then((docRef) => {
      // console.log("Entire Document has been updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  getCities,
  db,
  setCode,
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
