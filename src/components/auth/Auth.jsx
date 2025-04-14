import React, { useEffect } from 'react'
import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'

const FirebaseAuth = ({ onSignIn }) => {
  useEffect(() => {
    const uiConfig = {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: function () {
          onSignIn()
          return false
        },
      },
    }

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())

    ui.start('#firebaseui-auth-container', uiConfig)

    return () => {
      ui.reset()
    }
  }, [])

  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <h2 className='text-2xl font-bold mb-6'>Sign in to your account</h2>
      <div id='firebaseui-auth-container' />
    </div>
  )
}

export default FirebaseAuth
