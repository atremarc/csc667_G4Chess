/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Footer from './footer'
import Header from "./header"
import styled from 'styled-components'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <PageLayout >
      <Header siteTitle={data.site.siteMetadata.title} />
     
        <main
        style={{backgroundColor:`#fafafa`,}}
        >{children}</main>
       
     
      <Footer>
         
      </Footer>
    </PageLayout>
  )
}
const PageLayout = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
top:0;
left:0;
margin:0;
position:absolute;
background-color:#fafafa;
height:100vh;
width:100%;
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
