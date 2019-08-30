import React, { Component } from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
class PrivateRoute extends Component {
  componentDidMount() {
    const { location } = this.props
    let noOnLoginPage = location.pathname !== `/login`
    if (!isLoggedIn() && noOnLoginPage) {
      navigate("/login")
      return null
    }
  }
  render() {
    const { component: Component, ...rest } = this.props
    return <Component {...rest} />
  }
}

export default PrivateRoute