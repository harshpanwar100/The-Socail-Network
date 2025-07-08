// firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
//import { server } from "./metro.config";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlSVoJX-VdRk1V3JdOFbTfvM8XFY0MhSo",
  authDomain: "thesocialnetwork-c579e.firebaseapp.com",
  projectId: "thesocialnetwork-c579e",
  storageBucket: "thesocialnetwork-c579e.firebasestorage.app",
  messagingSenderId: "623471145763",
  appId: "1:623471145763:web:1cc71cde69e0f6c2881296",
  measurementId: "G-69X0GYN9SB",
  databaseURL:
    "https://thesocialnetwork-c579e-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const database = getDatabase(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);

export const getCurrentUser = async () => {
  try {
    const currentAccount = auth.currentUser;

    if (!currentAccount) throw Error;

    const currentUser = await getUserData(currentAccount.uid);

    if (!currentUser) throw Error;

    return currentUser;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (userId, username, email) => {
  try {
    await setDoc(doc(db, "users", userId), { userId, username, email });
    console.log("data added to firestore");
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const userData = await getDoc(docRef);
    if (userData.exists()) {
      //console.log(userData.data());
      return userData.data();
    } else console.log("no data");
  } catch (error) {
    console.log(error);
  }
};

export const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) return await user.getIdToken();
  else return null;
};

export const addFriend = async (userId, friendId) => {
  try {
    const userRef = doc(db, "users", userId);
    const friendRef = doc(db, "users", friendId);

    // Add friend to user's friends list
    await updateDoc(userRef, {
      friends: arrayUnion(friendId),
    });

    // Optionally, add user to friend's friends list
    await updateDoc(friendRef, {
      friends: arrayUnion(userId),
    });

    console.log("Friend added successfully");
  } catch (error) {
    console.error("Error adding friend:", error);
  }
};

export const postImgData = async (userId, imageurl) => {
  try {
    await addDoc(collection(db, "posts"), {
      userId: userId,
      imageUrl: imageurl,
      timestamp: serverTimestamp(),
    });
    console.log("Image data posted successfully");
  } catch (error) {
    console.error("Error posting image data:", error);
  }
};
