import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebaseui/dist/firebaseui.css'

import firebaseConfig from '../../.firebase-config.json'

const app = firebase.initializeApp(firebaseConfig)

export default app
