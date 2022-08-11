import { getApp, getApps } from 'firebase/app'
import { initializeApp, FirebaseApp } from "firebase/app"
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

import firebaseJson from '../firebase.json'

const emulators = firebaseJson.emulators

const firebaseConfig = process.env.NODE_ENV === 'development' ? {
  apiKey: (Math.random() + 1).toString(36).substring(7),
  authDomain: 'localhost',
  projectId: 'nt-cms-local'
} : {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

export const firebaseApp: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(firebaseApp)
export const authProvider = (new GoogleAuthProvider()).addScope('email')
export const db = getFirestore(firebaseApp)

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', emulators.firestore.port)
  connectAuthEmulator(auth, `http://localhost:${emulators.auth.port}`)
}
