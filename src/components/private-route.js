import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'contexts/auth'

export default ({ children, ...rest }) => {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
