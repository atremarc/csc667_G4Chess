import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import Message from './Message'
import CommentBox from './CommentBox'
class Chatbox extends Component {
  constructor(props) {
    super(props)
   
    this.state = {
        
      
    }

  }
  
  render() {
    try {
      return (
       <Container>
          < TitleBar>Server Chat</ TitleBar>
         <MessagesBox><Message text="wow here is the text body so cool"/>
         <Message text="Here is so much text that I couldnt believe how much this texted."/>
         </MessagesBox>
          <UserEventContainer>
          <CommentBox></CommentBox>
          </UserEventContainer>
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

Chatbox.propTypes = {
onChange: PropTypes.func,
}
Chatbox.defaultProps = {

}
const Container = styled.table`
width:300px;
background-color:white;
position:absolute;
bottom:0;
left:20;
z-index:999;
height:400px;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-content:center;
align-items:center;
-webkit-font-smoothing: subpixel-antialiased;
zoom: 1;
font-family: system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
overflow:hidden;

border-radius: 3px 3px 0 0;
  
 
  border: 1px solid #e6e6e6;

`
const MessagesBox = styled.div`
overscroll-behavior: contain contain;
min-width:100%;
outline:none;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
padding:0px 10px;
flex-grow:1;
`
const TitleBar = styled.div`
box-shadow: 0 2px 1px rgba(0, 0, 0, .1);
text-align:center;
height: 44px;
display:flex;
justify-content:center;
align-content:center;
font-weight:300;
align-items:center;
left:0;
background-color:white;
position: relative;
width:100%;

`

const UserEventContainer = styled.div`
width:100%;
position:relative;
display:flex;
padding:0;
background-color:transparent;
flex-direction:row;
justify-content:flex-start;
align-content:center;
`

export default Chatbox
