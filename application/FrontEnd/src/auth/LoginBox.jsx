import React, { Component } from "react";
import styled from "styled-components";
import SEO from "../components/seo";
import { navigate } from "gatsby"
import {FlagContainer,FlagManager} from '../components/utils/FlagNotification/index'

import Layout from "../components/layout";
import AnimInput from "../components/AnimatedInput/AnimatedInput";
import ContentBox from "../components/ContentContainer/ContentContainer";
import { handleLogin } from "../services/auth";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPassword: ``,
      userName: ``,
      isModalVisible: false
    };
  }
  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });

  }
  loginFailure  = (error) =>{
    FlagManager.alert(error)
  }
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.userName,
      password: this.state.userPassword
    };

    var body = {
      username: this.state.userName,
      password: this.state.userPassword
    };

    axios
      .post("http://54.153.84.211:9000/login/", body)
      .then(
        function(response) {
        //  console.log("response", response.data.success);
          this.setState({ message: response.data.message });
          if(response.data.success===true){
            this.loginSuccess(response , body)
          }else{
            FlagManager.fail(response.data.message)
          }
          //console.log(response);
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });

    console.log(newUser);
  };

  loginSuccess = (response, body) =>{

    if(response.data.token!==""&&body.username!==""){
      let token = response.data.token
      let userName = body.username
      handleLogin({userName,token})
      navigate("/")
    }


  }




  render() {

    try {
      return (
        <Layout>
          <Wrapper>
            <SEO title="Login" />

            <ContentBox>
              <LayoutBox>
                <Title>Login</Title>
                <FormBox noValidate onSubmit={this.onSubmit}>
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
                  <Button type="submit">Confirm</Button>
                </FormBox>
              </LayoutBox>
            </ContentBox>
          </Wrapper>
         <FlagContainer/>
        </Layout>
      );
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e);
      }
      return null;
    }
  }
}

const FormBox = styled.form`
  width: 100%;
`;
const Title = styled.h1`
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-weight: 300;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-content: center;
  align-items: center;
  height: 100%;
`;
const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
`;
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
export default Login;
