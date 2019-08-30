import React, { Component } from "react"
import styled from "styled-components"

import ReactDOM from "react-dom"
import FlagManager from './FlagManager'
import FlagMap from './FlagMapper'
class FlagContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        notifications: []

    }
}
componentWillMount() {
  FlagManager.addChangeListener(this.HandleFlagChange)
}
componentWillUnmount() {
  FlagManager.clearCache()
  FlagManager.removeChangeListener(this.HandleFlagChange)

}
HandleFlagChange = (notifications) =>{
  this.setState({
    notifications
  });
}
HandleRemoveFlag = (notification) =>{
  //Let us remove the flag from the list of flags.
 // console.log("Attempting to remove(Container)...")

  FlagManager.remove(notification)
}

render() {
    try {
      return (
        ReactDOM.createPortal( 
          <InnerContainer >
            <FlagMap
        notifications={this.state.notifications}
        handleFlagClose={this.HandleRemoveFlag}
      />
          </InnerContainer>
     ,document.body)
      ) 
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
export default FlagContainer



const InnerContainer = styled.div`

background-color:rgba(0,0,0,0.2);
position:fixed;
z-index: 999;
min-width:0;
height:0;
overflow-x: visible;
  overflow-y: visible;
bottom:0;
left:0;
pointer-events: none;

padding-left:12px;
display:flex;
flex-direction:column-reverse;
align-items:flex-start;


`