import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'

const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser(u)
        return
      }
      firebase.auth().signInAnonymously()
    })
  }, [])

  return user ? <>{children}</> : null
}

export default AuthWrapper
