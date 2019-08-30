import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

class AnimatedInput extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
    this.state = {
        fieldActivated:false,
      
    }

  }
  ActivateField = () =>{

    this.setState({
        fieldActivated:true,
    })
  }
  DisableField = () =>{
      if(this.inputRef.current.value===""){
        this.setState({
            fieldActivated:false,
        })
      }
   
  }
  render() {
    try {
      return (
        <Wrapper style={this.props.style}>
          <TextInput {...this.props}
           ref={this.inputRef}
           style={{}}
            onFocus={this.ActivateField}
            onBlur={this.DisableField}
           focusedColor={this.props.activeBorderColor}
          />
          <PlaceHolder className={!this.state.fieldActivated? "" : "focused"} role="label" htmlFor="main-text-input">
           {this.props.placeholderName}
          </PlaceHolder>
        </Wrapper>
      )
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}

const TextInput = styled.input`
  box-sizing: border-box;
  padding: 8px 10px;
  padding-left: 0 !important;
  margin: 0;
  border: none !important;
  border-bottom: 1px solid #e6e6e6 !important;
  :focus{
    border-bottom: 1px solid ${props => props.focusedColor ? props.focusedColor : "#e6e6e6"}  !important;
  
  }
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px !important;
  letter-spacing: 0;
  color: #262626;
  height: 40px;
  width: 100%;
  outline: none;
  line-height: 1em;
  align-items: center;
  box-shadow: 0 0 black;
`
const Wrapper = styled.div`
  display: block;
  position: relative;
  box-sizing: border-box;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`

const PlaceHolder = styled.label`
  position: absolute;
  left: 0;
  padding: 8px 10px;
  padding-left: 0 !important;
  font-size: 16px;
  height: 40px;
  width: 100%;
  top: 4px;
  pointer-events: none;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 1em;
  transition: top 0.3s, font-size 0.3s;
  transition-timing-function: cubic-bezier(0.02, 0.01, 0.47, 1);
  &.focused{
    top: -22px; 
    font-size:14px;
  }
`
AnimatedInput.propTypes = {
onChange: PropTypes.func,
}
AnimatedInput.defaultProps = {
   onChange: function(){},
   placeholder:"",
}

export default AnimatedInput
