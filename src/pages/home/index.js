import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'contexts/auth'
import firebase from 'firebase'

export default () => {
  const history = useHistory()
  const { user } = useAuth()

  const handleTicTacToe = (event) => {
    history.push('/tictactoe')
  }

  const handleCaro = (event) => {
    // TODO:
  }

  const handleLogout = async (event) => {
    const confirm = window.confirm('Are you sure you want to sign out?')
    if (confirm) await firebase.auth().signOut()
  }

  console.log('user', user)

  return (
    <div className="container mx-auto px-4 max-w-md text-center">
      <p>Hello, {user.username}!</p>
      <h1 className="text-2xl mb-8">Welcome to Caro Go</h1>

      <div className="space-y-4">
        <button
          className="w-full px-4 py-2 outline-none focus:outline-none focus:ring bg-green-400 text-white rounded-none hover:bg-green-500"
          onClick={handleTicTacToe}
        >
          Play Tic-Tac-Toe
        </button>
        <button
          className="w-full px-4 py-2 outline-none focus:outline-none focus:ring bg-gray-400 cursor-default text-white rounded-none"
          disabled
          onClick={handleCaro}
        >
          Play Caro
          <p className="text-sm text-gray-100">Coming soon!</p>
        </button>
        <button
          className="w-full px-4 py-2 outline-none focus:outline-none focus:ring bg-red-400 hover:bg-red-500 text-white rounded-none"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
