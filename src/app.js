import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from 'components/navbar'
import Home from 'pages/home'
import Login from 'pages/login'
import Register from 'pages/register'
import TicTacToe from 'pages/tictactoe'
import PrivateRoute from 'components/private-route'
import { AuthProvider } from 'contexts/auth'

export default () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <main className="flex-1">
          <Router>
            <Navbar />

            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/" exact>
                <Home />
              </PrivateRoute>
              <PrivateRoute path="/tictactoe">
                <TicTacToe />
              </PrivateRoute>
              <Redirect to="/login" />
            </Switch>
          </Router>
        </main>
      </div>
    </AuthProvider>
  )
}
