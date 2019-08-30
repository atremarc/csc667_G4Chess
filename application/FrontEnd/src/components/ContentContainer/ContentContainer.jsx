import React, { Component } from "react"
import styled from "styled-components"

class ContentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    try {
      return (
        <Container style={this.props.style}>
         {this.props.children}
        </Container>
      )
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}

const Container = styled.div`
  border-radius: 3px;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: auto auto;
  min-width: 500px;

  background-color:white;
  min-height: 100px;
  border: 1px solid #e6e6e6;
  @media (max-width: 500px) {
    min-width: 90%;
  }
  /*box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);*/
`

export default ContentContainer
