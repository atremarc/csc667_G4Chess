//unused

import React from "react"
import { Router } from "@reach/router"
import Login from "../auth/LoginBox"
import InGame from './app/GamePage'
import JoinGame from './app/JoinGame'
import PrivateRoute from "../components/privateRoute"

const App = () => (
  <>
    <Router>
    <PrivateRoute path="/app/JoinGame" component={JoinGame} />
    <PrivateRoute path="/app/GamePage" component={InGame} />

      <Login path="/login" />
    </Router>
  </>
)
export default App
