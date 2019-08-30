import React from "react"
import styled from 'styled-components'
import Layout from "../components/layout"
import SEO from "../components/seo"
import {FlagContainer,FlagManager} from '../components/utils/FlagNotification/index'
import { navigate } from "gatsby"

import ContentBox from '../components/ContentContainer/ContentContainer'
import {isLoggedIn, getUser } from "../services/auth";
import axios from "axios";

const handleCreateGame = () =>
{
  let user = getUser()
  let body = {
    username: user.username,
    token : user.sessionId
  };
  axios
  .post("http://54.153.84.211:9000/createGame/", body)
  .then(
    function(response) {
      if(response.data.success===true){
       FlagManager.success("Creating a New Game...")
       redirectToGamePage()

      }else{
        FlagManager.fail("Error creating game.")


      }
    }
  )
  .catch(function(error) {
    console.log(error);
  });

}
const redirectToGamePage = () =>{
  setTimeout(()=>{
    navigate("/app/JoinGame")
}, 1500);

}

//shows either login/sign-up or create/join game
const IndexPage = () => (
  console.log("is signed in?",isLoggedIn()),
  !isLoggedIn()? (
  <Layout>
    <Wrapper>
    <SEO title="Home" />

      <ContentBox>
        <LayoutBox>
        <Title>Welcome to G4 Chess!</Title>

        <Button href={`/login`}>Login</Button>
        <Button href={`/signup`}>Sign Up</Button>

        </LayoutBox>

      </ContentBox>

    </Wrapper>
    <FlagContainer/>
  </Layout>
  ):(
    <Layout>
    <Wrapper>
    <SEO title="Home" />

      <ContentBox>
        <LayoutBox>
        <Title>Hello {getUser().username}!</Title>

        <Button href={`/app/JoinGame`}>Join Game</Button>
        <Button  onClick={handleCreateGame}>Create Game</Button>

        </LayoutBox>

      </ContentBox>
      <FlagContainer/>

    </Wrapper>
  </Layout>
  )
)
const Title = styled.h1`
font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
font-weight:300;

`
const Wrapper = styled.div`

display:flex;
flex-direction:column;
justify-content:center;

align-content: center;
align-items:center;
height:100%;

`
const LayoutBox = styled.div`
display: flex;
  flex-direction: column;
  align-content: center;
  align-items:center;
  justify-content: center;
  padding:20px;
`
const Button = styled.a`
  cursor: pointer;
  outline: 0;
  flex-grow: 1;
  font-size: 28px;
  display: flex;
  min-width: 100%;
  text-align: center;
  text-decoration:none;
  font-weight: 300;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 8px;
  margin: 5px 0px;
  -webkit-appearance: none;
  border-radius: 2px;
  border-color:#ff5a5f;
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
export default IndexPage
