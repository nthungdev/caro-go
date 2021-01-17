import React from 'react'
import Input from 'components/input'
import { Link } from 'react-router-dom'

export default () => {
  const handleRegister = (event) => {
    // TODO:
    event.preventDefault()
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
            type="text"
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
            name="confirm-password"
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
