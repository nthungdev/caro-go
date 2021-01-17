import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from 'components/navbar'
import Home from 'pages/home'
import Login from 'pages/login'
import Register from 'pages/register'

const App = () => {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
