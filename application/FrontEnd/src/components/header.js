import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import React from "react"
import { logout, isLoggedIn } from "../services/auth"
import { navigate } from "gatsby"

const logoutClickHandler = () =>
{
  logout(()=>{

    navigate("/")
  })
}
const rulesButtonHandler = () =>
{
  navigate("/rules")
}
const Header = ({ siteTitle }) => (
  < Wrapper>
  < NavBarLayout
  >

      < WebsiteTitle >
        <Link
          to="/"
          style={{
            textDecoration: `none`,
            color:`rgb(85, 26, 139)`,
            
          }}
        >
          {siteTitle}
        </Link>
      </ WebsiteTitle>
      {isLoggedIn()===true?
          (<LogoutButton onClick={()=>{
             logoutClickHandler()
          }}>
            Log Out
          </LogoutButton>) :
          null }
          <RulesButton onClick={()=>{rulesButtonHandler()}}>
          Chess Rules
          </RulesButton>
  </ NavBarLayout >
  </Wrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const RulesButton = styled.button`
display: flex;
justify-content: flex-end;
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-size:1.8em;
background-color:transparent;
font-weight:200;
outline:none;
cursor: pointer;
margin:0;
padding:0;
border:none;
color:rgb(85, 26, 139);
:hover{
  color:#ff5a5f;;

}
transition: color 0.4s linear;

`

const LogoutButton = styled.button`
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-size:1.8em;
background-color:transparent;
font-weight:200;
cursor: pointer;
margin:0;
padding:0;
outline:none;
border:none;
color:rgb(85, 26, 139);
:hover{
  color:#ff5a5f;;

}
transition: color 0.4s linear;

`
const NavBarLayout = styled.div`
display:flex;
flex-direction:row;
margin:0 auto;
position:relative;
border: 1px solid rgba(0,0,0,0.1);
background:white;
width:100%;
padding:20px 20px;

justify-content:space-between;
`
const Wrapper = styled.div`
display:flex;
justify-content:center;
align-content:center;
top:0;
left:0;
width:100vw;

position:relative;
`
const WebsiteTitle = styled.span`
font-size:1.8em;
color:#000 !important;
font-weight:200;

font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;

`

export default Header
