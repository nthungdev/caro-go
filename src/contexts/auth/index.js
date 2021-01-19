import React, { useContext, createContext, useState, useEffect } from 'react'
import firebase from 'firebase'

const defaultValue = {
  user: undefined,
}

const AuthContext = createContext()

export const useAuth = () => {
  const auth = useContext(AuthContext)
  if (auth === undefined) {
    throw new Error('useAuth must be used within a AuthContext')
  }
  return auth
}

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(defaultValue)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await firebase
          .database()
          .ref('users')
          .child(user.uid)
          .once('value')
        setState((s) => ({
          ...s,
          user: {
            ...user,
            ...userData.val(),
          },
        }))
      } else {
        setState((s) => ({ ...s, user: null }))
      }
    })
  }, [])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
