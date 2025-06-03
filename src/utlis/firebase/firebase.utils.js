import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8UWhywO3PAvbkv2AsXRmUZkj66PpnjhU",
    authDomain: "shopgen-z.firebaseapp.com",
    projectId: "shopgen-z",
    storageBucket: "shopgen-z.firebasestorage.app",
    messagingSenderId: "1017955955401",
    appId: "1:1017955955401:web:b1376853b899b85ae2d318"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig); //Even though you're not directly using firebaseApp, the initializeApp() function sets up this default app context. Without it, Firebase services like getAuth() or getFirestore() won't know which configuration to use, and they'll throw errors.

  const provider= new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth(); //When you call initializeApp(firebaseConfig), Firebase creates a "default app" instance for your application. This default app acts as the central hub for all Firebase services, and its configuration is shared across services like Authentication, Firestore, etc.
  export const signInWithGooglePopup=()=>signInWithPopup(auth, provider);


  export const db= getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectToAdd)=>{
    const collectionRef=collection(db, collectionKey);
    const batch=writeBatch(db);
    objectToAdd.forEach((obj) => {
      const documentRef=doc(collectionRef, obj.title.toLowerCase());
      batch.set(documentRef, obj);
    });
    await batch.commit();
    // console.log("done");
  };

  export const getCollectionAndDocuments= async()=>{
    const collectionRef=collection(db, 'categories');
    const q=query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((documentSnap)=> documentSnap.data());
    /*if you are wondering what is happening here:
    we are directly sending the complete data array to shopcomponent there using dispatach we set the data
    and we will process the data in categoriesSelector before using it otherwise data is stored in array format
    2nd .docs gives us an array therefore the map function is working here because simply querySnapshot is array
    */
  }
  
  export const createuserfromAuth = async (userAuth, additionalData)=>{
    const userDocRef=doc(db, 'users', userAuth.uid);
    const userSnap=await getDoc(userDocRef);
    if(!userSnap.exists()){
      const {displayName, email }=userAuth;
      const createdAt= new Date();
      try{
        await setDoc(userDocRef,{
          displayName,
          email, 
          createdAt,
          ...additionalData,
        });
      }catch(error){
        console.log(`error +${error.message}`);
      }
    }
    return userSnap;
  }

  export const createAuthUserWithEmailAndPassword=async(email, password)=>{
    if(!email || !password){
      console.log('email or password not passed to createAuth in firebase/utils');
    }
    return await createUserWithEmailAndPassword(auth, email, password);
  } 

  export const signInAuthUserWithEmailAndPassword=async(email, password)=>{
    if(!email || !password){
      console.log('email or password not passed to createAuth in firebase/utils');
    }
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser= async()=>{
    return await signOut(auth);
  }

  export const onAuthStateChangedListner= (callback)=>{
     onAuthStateChanged(auth, callback);
  }

  export const getCurrentUser=()=>{
    return new Promise((resolve,reject)=>{
      const unsuscribe=onAuthStateChanged(auth, (userAuth)=>{
      unsuscribe();
      resolve(userAuth);
    },reject);
  })
  }