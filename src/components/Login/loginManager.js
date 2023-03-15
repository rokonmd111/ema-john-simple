import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import firebaseConfig from './firebase.config';
import { GoogleAuthProvider, signOut } from "firebase/auth";

export const initializeLoginFramWork = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
}

export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
    .then((result) => {
      const { displayName, photoURL } = result.user;
      
      const signedInUsers = {
        isSignedIn: true,
        name: displayName,
        photo: photoURL,
        success: true
      }
      return signedInUsers;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
  }

export  const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth)
    .then(() => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
      }
      return signOutUser;
    }).catch((error) => {
      // An error happened.
    });
  }

  export const createUser = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    const newUserInfo = user
    newUserInfo.success = true;
    updateUserInfo(name);
    return newUserInfo;
  })
  .catch((error) => {
    const newUserInfo = {}
    newUserInfo.error = true;
    return newUserInfo;
  })
  }

  export const signInUser = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const newUserInfo = user;
      newUserInfo.success = true;
      return newUserInfo;
  })
    .catch(() => {
      const newUserInfo = {}
      newUserInfo.error = true;
      return newUserInfo;
  })
  }

  const updateUserInfo = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() => {
      console.log('name updated successfully');
    })
    .catch((error) => {
      console.log(error);
    });
  }