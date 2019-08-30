import PropTypes from "prop-types"
import styled from "styled-components"
import React from "react"

const Footer = () => (
  <Layout
  >

      < WebsiteTitle >
       <LinkText>Group 4's Project</LinkText>
      </ WebsiteTitle>

  </Layout >
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}
const Layout = styled.div`
display:flex;
flex-direction:row;
padding: 12px 8px;
margin:0;
background:white;
border: 1px solid rgba(0,0,0,0.1);
position:relative;
justify-content:center;
`
const LinkText = styled.span`
font-weight:500;
`

const WebsiteTitle = styled.span`
font-size:1em;
text-transform:uppercase;
color:#c7c7c7;;


font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;

`

export default Footer
