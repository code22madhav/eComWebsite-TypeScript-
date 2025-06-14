import { Category } from "../../store/categories/category.types";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
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

  export type ObjectToAdd={
    title: string,
  }
//why we are making ObjectToAdd because our data is in this format: [{title: hats, []}, {}]
  export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectToAdd: T[]):Promise<void>=>{
    const collectionRef=collection(db, collectionKey);
    const batch=writeBatch(db);
    objectToAdd.forEach((obj) => {
      const documentRef=doc(collectionRef, obj.title.toLowerCase());
      batch.set(documentRef, obj);
    });
    await batch.commit();
    // console.log("done");
  };

  export const getCollectionAndDocuments= async():Promise<Category[]>=>{
    const collectionRef=collection(db, 'categories');
    const q=query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((documentSnap)=> documentSnap.data() as Category);//if you don't tell typescipt what the documentSnap give it will through error since the data is coming in querry therfore typescipt dont know about it
    /*if you are wondering what is happening here:
    we are directly sending the complete data array to shopcomponent there using dispatach we set the data
    and we will process the data in categoriesSelector before using it otherwise data is stored in array format
    2nd .docs gives us an array therefore the map function is working here because simply querySnapshot is array
    */
  }
  
  export type AdditionalData={
    displayName?: string,
  }
  export type UserData={
    createdAt: Date,
    displayName: string,
    email: string
  }
  //userAuth is user object, firebase/auth inbuit provides a interface for user object called User
  export const createuserfromAuth = async (userAuth: User, additionalData={} as AdditionalData):Promise< void | QueryDocumentSnapshot<UserData>>=>{
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
        console.log(`error +${error}`);
      }
    }
    return userSnap as QueryDocumentSnapshot<UserData>;
  }
//Here also userSnap is a snapshot therfore typescript is unable to determin what kind of data is coming therefore firebase/firestore automatically provides us an class for this, QuerryDocumentSnapshot<T> where T is generic we have to tell what kind of data it will be.

  export const createAuthUserWithEmailAndPassword=async(email:string, password:string)=>{
    if(!email || !password){
      console.log('email or password not passed to createAuth in firebase/utils');
    }
    return await createUserWithEmailAndPassword(auth, email, password);
  } 
//no need to typecast above function createUserWithEmailAndPassword automatically comes with typecasting it reeturn us a promise as type

  export const signInAuthUserWithEmailAndPassword=async(email: string, password:string)=>{
    if(!email || !password){
      console.log('email or password not passed to createAuth in firebase/utils');
    }
    return await signInWithEmailAndPassword(auth, email, password);
  }
//same as above no needd to typecast

  export const signOutUser= async()=>{
    return await signOut(auth);
  }
//same as above no need to typecast

  export const onAuthStateChangedListner= (callback: NextOrObserver<User>)=>{
     onAuthStateChanged(auth, callback);
  }//this function gets a callback function which is called via .next() in onAuthStateChangedListner whenever a user auth changes therfore for this callback function also we have a inbuit type provided by firestore

  export const getCurrentUser=():Promise<User | null>=>{
    return new Promise((resolve,reject)=>{
      const unsuscribe=onAuthStateChanged(auth, (userAuth)=>{
      unsuscribe();
      resolve(userAuth);
    },reject);
  })
  }