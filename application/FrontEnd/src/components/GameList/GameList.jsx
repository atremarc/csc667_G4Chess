//this list is for all open games
import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import axios from "axios"
import { getUser,isBrowser } from "../../services/auth";
import { FlagManager } from "../utils/FlagNotification/index";

class GameList extends Component {
  constructor(props) {
    super(props)

    this.state = {
        //an array to hold the games list from the db
        games: [],
        username: getUser().username,
        token: getUser().sessionId,
        message: "",
        flag: false,
    }

    this.joinGame = this.joinGame.bind(this);

  }

  componentDidMount() {
    console.log("The State: :", this.state);
    //get open games list from the db

    var url = "http://54.153.84.211:9000/";
    var user = this.state.username;
    var curr = "/openGames";
    const path = url.concat(user,curr);
    axios
      .get(path)
      .then (function (response) {
        console.log(response);

        //store those games in the state games array
        var openGames = response.data;
        this.setState({
          games:openGames
        })
      }.bind(this))
      .catch (function (error) {
        console.log(error);
      });
  }

  joinGame = (index) => {
      var gameID = index;
      var currentUser = this.state.username;
      console.log("Game: ", gameID);
      console.log("User: ", currentUser);
      var path = "http://54.153.84.211:9000/joinGame";
      console.log(path);

      const body = {
        token: this.state.token,
        username: this.state.username,
        gameID: gameID
      };

      console.log("The Request:", body);

      axios.put(path, body)
        .then(function (response) {

            this.setState({
              message: response.data.message,
              flag: response.data.success,
            }, () => this.handleJoinGame())
            console.log("response?", response);
            console.log("Message: ", response.data.message);
            console.log("Success? ", response.data.success);
        }.bind(this))
        .catch (function (error) {
          console.log(error);
        });


  }

  //handle joinGame
  handleJoinGame = () => {
    if (this.state.flag === true) {
      FlagManager.success(this.state.message);
      console.log("navigation...");
      if (isBrowser) {
        window.location.reload();
      }

    } else {
      FlagManager.fail(this.state.message);
    }
  }

  //create the gamelist to be viewed on in the table
  generateGamesList = () =>{

      const Data = this.state.games.reverse().map((item, index)=>{
        return (
          <>
           <TableRow>
          <TableData key={index}>{item.user1}</TableData>
          <TableData>Public</TableData>
          <TableData><JoinButton onClick={()=>this.joinGame(item._id)}>Join</JoinButton></TableData>
          </TableRow>
          </>
        )
      })
      return Data

  }




  render() {
    try {
      return (
       <>
       <ListTitle>Open Games</ListTitle>
       <ScrollContainer>
       <Container>

           <TableRow>
               <Item>Opponent</Item>
               <Item>Game Type</Item>
               <Item style={{visibility:`hidden`,}}>Join</Item>
           </TableRow>

          {this.generateGamesList()}

       </Container>
       </ScrollContainer>
       </>
      )
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}

GameList.propTypes = {
onChange: PropTypes.func,
}
GameList.defaultProps = {

}
const ScrollContainer = styled.div`
max-height: 400px;

overflow-y:scroll;
overflow-x:hidden;
margin:5px 0;

width: 100%;
@media (max-width: 768px) {
    width: 100%;
    height:auto;
    overflow-y:auto;
    max-height:none;

  }

`
const ListTitle = styled.h2`
    color: #262626;
    font-weight:600;
    width:100%;
    margin:0;
    padding:10px 0;
    text-align:center;
    border-bottom: 1px solid #efefef;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
const Container = styled.table`
width:100%;
table-layout: fixed;
border-collapse: collapse ;
@media (max-width: 500px) {
    width: 100%;
    margin:0;
  }

border-collapse: collapse;

`
const TableRow = styled.tr`
@media (max-width: 500px) {

    padding:0;
  }

`
const Item = styled.th`
padding: 15px;
color: #262626;
font-weight:600;

@media (max-width: 500px) {

    padding:2px;
  }

`
const TableData = styled.td`
padding: 8px;
color: #262626;

text-align:center;
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
`
export default GameList
