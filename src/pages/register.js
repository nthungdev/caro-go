import React from 'react'
import Input from 'components/input'
import { Link } from 'react-router-dom'
import firebase from 'firebase'

export default () => {
  const handleRegister = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const username = event.target.username.value
    const password = event.target.password.value
    const confirmPassword = event.target.confirmPassword.value

    if (password !== confirmPassword) {
      window.alert('Please make sure Password and Confirm Password match!')
      return
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (cred) => {
          const { uid } = cred.user
          await firebase.database().ref(`users/${uid}`).set({ username })
        })
        .catch((error) => {
          const { code, message } = error
          switch (code) {
            case 'auth/weak-password':
              alert('The password is too weak.')
              break
            case 'auth/invalid-email':
              alert('The email is not valid.')
              break
            case 'auth/email-already-in-use':
              alert('The email is already in use.')
              break
            default:
              alert(message)
          }
        })
    }
  }

  return (
    <div className="container mx-auto max-w-lg p-4 bg-gray-200 dark:bg-gray-800">
      <form onSubmit={handleRegister}>
        <div className="space-y-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            name="username"
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Enter your password"
            name="confirmPassword"
            required
          />
        </div>

        <button className="w-full px-4 py-2 outline-none focus:outline-none focus:ring bg-green-400 text-white rounded-none mt-8 mb-4">
          Register
        </button>
      </form>

      <p className="text-center">
        Already registered?{' '}
        <Link to="/login" className="hover:text-green-500 font-semibold">
          Login
        </Link>
      </p>
    </div>
  )
}
