import React, { Component } from "react"
import styled from "styled-components"
import SEO from "../components/seo"
import Layout from "../components/layout"
import AnimInput from "../components/AnimatedInput/AnimatedInput"
import ContentBox from "../components/ContentContainer/ContentContainer"
import axios from "axios"
import {FlagContainer,FlagManager} from '../components/utils/FlagNotification/index'
import { navigate } from "gatsby"

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: ``,
      userPassword: ``,
      userName: ``,
    }
  }
  onChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }
  displayFlagError=(error) =>{
    FlagManager.fail(error)

  }
  displayFlagSuccess = (message) =>{
    FlagManager.success(message)
  }
  onSubmit = async(e) => {
    e.preventDefault()
    const newUser = {
      name: this.state.userName,
      email: this.state.userEmail,
      password: this.state.userPassword,
    }
    console.log(newUser)

    var body = {
        username: this.state.userName,
        email: this.state.userEmail,
        password: this.state.userPassword,
    }

    axios
      .post("http://54.153.84.211:9000/newUser", body)
      .then(function(response) {
          console.log("response",response.data.success)

          if(response.data.success===true){

           this.displayFlagSuccess("Account Created!")
           window.setTimeout(navigate,1500,'/');

          }else{
            this.displayFlagError(response.data.message)
          }

        console.log(response)
      }.bind(this))
      .catch(function(error) {
        console.log(error)
      })
  }
  componentDidMount() {}

  render() {
    try {
      return (
        <Layout>
          <Wrapper>
            <SEO title="Sign Up" />

            <ContentBox>
              <LayoutBox>
                <Title>Sign Up</Title>
                <FormBox noValidate onSubmit={this.onSubmit}>
                  <AnimInput
                    onChange={this.onChange}
                    value={this.state.email}
                    autoComplete="email"
                    activeBorderColor={"#ff5a5f"}
                    id="userEmail"
                    style={{ width: `100%`, margin: `20px 0px` }}
                    placeholderName="Email"
                  />
                  <AnimInput
                    onChange={this.onChange}
                    value={this.state.username}
                    autoComplete="username"
                    activeBorderColor={"#ff5a5f"}
                    id="userName"
                    style={{ width: `100%`, margin: `20px 0px` }}
                    placeholderName="Username"
                  />
                  <AnimInput
                    onChange={this.onChange}
                    value={this.state.password}
                    autoComplete="current-password"
                    activeBorderColor={"#ff5a5f"}
                    id="userPassword"
                    style={{ width: `100%`, margin: `20px 0px` }}
                    type="password"
                    placeholderName="Password"
                  />
                  <Button type="submit">Create Account</Button>
                </FormBox>
              </LayoutBox>
            </ContentBox>
          </Wrapper>

          <FlagContainer/>

        </Layout>
      )
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
const FormBox = styled.form`
  width: 100%;
`
const Title = styled.h1`
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-weight: 300;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-content: center;
  align-items: center;
  height: 100%;
`
const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
`
const Button = styled.button`
  cursor: pointer;
  outline: 0;
  flex-grow: 1;
  font-size: 28px;
  display: flex;
  min-width: 100%;
  text-align: center;

  font-weight: 300;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 6px 8px;
  margin: 20px 0px;
  -webkit-appearance: none;
  border-radius: 2px;
  background-color: #ff5a5f;
  transition-duration: 0.4s;
  color: white;
  :active {
    transform: scale(0.99);
    transition-duration: 0.1s;
  }
  :focus {
    transform: scale(0.99);
    transition-duration: 0.1s;
  }
`
export default SignUp
