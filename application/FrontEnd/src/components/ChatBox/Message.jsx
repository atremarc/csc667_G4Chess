import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
class Message extends Component {
  constructor(props) {
    super(props)
   
    this.state = {
        
      
    }

  }
  
  render() {
    try {
      return (
       <Container><TextBody>
           {this.props.text}
       </TextBody>
         
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

Message.propTypes = {
onChange: PropTypes.func,
}
Message.defaultProps = {

}
const TextBody = styled.span`
line-height:18px;
color: #262626;
font-size: 14px;
overflow-wrap:break-word;
`
const Container = styled.table`
background-color:white;
position:relative;
width:40%;

align-self:flex-start;
padding:4px;
margin:2px;

-webkit-font-smoothing: subpixel-antialiased;
font-family: system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
overflow:hidden;

border-radius:3px;
  
 
  border: 0px solid #e6e6e6;

`


export default Message
