import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import config from './config'

const firebaseConfig = config

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectDb = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectDb, projectAuth, timestamp }