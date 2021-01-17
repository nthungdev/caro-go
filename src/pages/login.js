import React from 'react'
import Input from 'components/input'
import { Link } from 'react-router-dom'

export default () => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
  }

  return (
    <div className="container mx-auto max-w-lg p-4 bg-gray-200 dark:bg-gray-800">
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
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
        </div>

        <button className="w-full px-4 py-2 outline-none focus:outline-none focus:ring bg-green-400 text-white rounded-none mt-8 mb-4">
          Login
        </button>
      </form>

      <p className="text-center">
        New to Caro Go?{' '}
        <Link to="/register" className="hover:text-green-500 font-semibold">
          Register
        </Link>
      </p>
    </div>
  )
}
