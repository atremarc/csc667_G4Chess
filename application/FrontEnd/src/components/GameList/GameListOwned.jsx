//this list is for all games previously opened by the player
import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import axios from "axios"
import { getUser } from "../../services/auth";

class GameListOwned extends Component {
  constructor(props) {
    super(props)

    this.state = {
        //an array to hold the games list from the db
        games: [],
        selectedIndex:-1,
        userName: getUser().username,
        resumed: "",
        resumed_id: "",
    }

    this.resumeGame = this.resumeGame.bind(this);
  }



  componentDidMount() {
    //get open games list from the db
    var url = "http://54.153.84.211:9000/";
    var user = this.state.userName;
    var curr = "/currentGames";
    const path = url.concat(user,curr);
    axios
      .get(path)
      .then (function (response) {
        console.log(response);

        //store those games in the state games array
        var currentGames = response.data;
        this.setState({
          games: currentGames
        })
      }.bind(this))
      .catch (function (error) {
        console.log(error);
      });
  }

  resumeGame = (index) => {
    var gameID = index;
    var url = "http://54.153.84.211:9000/";
    var str = "/getGame";
    var path = url.concat(gameID,str);
    console.log("url: ", path)

    axios.get(path)
      .then(function (response) {
        this.setState({
          selectedIndex: index,
          resumed: response.data,
          resumed_id: response.data._id,

        }, () => this.setCallback(this.state.resumed_id))
      }.bind(this))


  }

  //set callbackFromParent
  setCallback = (object) => {
    this.props.callbackFromParent(object)
    console.log("Resumed Game:", this.state.resumed)
  }

  generateList = () => {
    const ReversedList = this.state.games.reverse();
    var currentList = [];
    for (let item of ReversedList) {
      if (!item.isDone) {
        currentList.push(item);
      }
    }
    const List = currentList.map((item, index1, index2) => {
      var isActiveText = this.state.selectedIndex===item._id? "Active" : "Set As Active"
      return (
        <>
        <TableRow>
         <TableData key={index1}>{item.user1}</TableData>
         <TableData key={index2}>{item.user2===""? `None` : item.user2}</TableData>
         <TableData><JoinButton onClick={()=>this.resumeGame(item._id)}>{isActiveText}</JoinButton></TableData>
        </TableRow>
        </>

      )
    })
    return List;
  }





  render() {
    try {
      return (
       <Wrapper>
       <ListTitle>Your Current Games</ListTitle>
       <ScrollContainer>
       <Container>

           <TableRow>
               <Item>Player1</Item>
               <Item>Player2</Item>

               <Item> Set As Active</Item>
           </TableRow>
           {this.generateList()}
       </Container>
       </ScrollContainer>
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

GameListOwned.propTypes = {
onChange: PropTypes.func,
}
GameListOwned.defaultProps = {

}

const ListTitle = styled.h3`
    color: #262626;
    font-weight:600;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
const Wrapper  = styled.div`
display:flex;
justify-content:center;
align-content:center;
flex-direction:column;
align-items:center;
width:100%;

`
const ScrollContainer = styled.div`
max-height: 250px;
overflow-y:scroll;
overflow-x:hidden;
width:100%;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-content:center;
align-items:center;
@media (max-width: 768px) {
    width: 100%;
    max-height:none;
    height:auto;
    overflow-y:visible;


  }

`

const Container = styled.table`
width:100%;
color: #262626;

table-layout: fixed;

@media (max-width: 500px) {
    width: 100%;
    margin:0;
  }

`
const TableRow = styled.tr`
@media (max-width: 500px) {

padding:0;
}

`
const Item = styled.th`
padding: 15px;
color: #262626;
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-weight:600;
@media (max-width: 500px) {

    padding:2px;
  }
`
const TableData = styled.td`
padding: 8px;
text-align:center;
color: #262626;

@media (max-width: 500px) {
    width: 70%;
    padding:4px 0px;
  }

`
const JoinButton = styled.button`
cursor: pointer;
outline:none;
font-size:16px;
text-align:center;

font-weight:600;
font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
-webkit-appearance:none;
background-color:transparent;
border: 0;
    color: #3897f0;
    display: inline;
    padding: 0;
:active{
  transform:scale(0.99);
  transition-duration:0.1s;
}
:hover{
  color:#ff5a5f;;

}
transition: color 0.1s linear;
`
export default GameListOwned
