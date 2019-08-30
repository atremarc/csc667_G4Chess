import React, { Component } from "react"
import PropTypes from "prop-types"
import Flag from './FlagNotification'
import styled from "styled-components"

class FlagMapper extends Component {
    constructor(props) {
      super(props)
      this.state = {

    }
}
componentDidMount() {}
componentWillUnmount() {}

handleFlagClose = notification => () => {
  
        this.props.handleFlagClose(notification);
   
  }

render() {
    try {
      return (
      <Container>
          {this.props.notifications.map((notification) => {
           // const key = notification.id ;
            return (
              <Flag
                key={notification.id}
                flagType={notification.type}
                message={notification.message}
                flagTime={notification.flagTime}
                onFlagEnd={this.handleFlagClose(notification)}
              />
            );
          })}
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
FlagMapper.propTypes = {
    notifications: PropTypes.array.isRequired,
    handleFlagClose:PropTypes.func,
}
FlagMapper.defaultProps = {
    handleFlagClose: function(){},
    notifications :[],
}
const Container  = styled.div`
transition-duration:2s;
  transition-property:all;
  z-index: 999;

`
export default FlagMapper