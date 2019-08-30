import React, { Component } from "react";
import styled from "styled-components";
import { FlagContainer, FlagManager } from "../../components/utils/FlagNotification/index";

import ContentBox from "../../components/ContentContainer/ContentContainer";
import GameBoard from "../../components/Chessboard/chessboardNoSSR";
import Layout from "../../components/layout";
import axios from "axios";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import { getUser } from "../../services/auth";
import io from "socket.io-client";

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socketEndpoint: "http://54.153.84.211:9000/",
      game: "",
      gameFen: "",
      chessJSObject: null,
      dropSquareStyle: {},
      // custom square styles
      squareStyles: {},
      // square with the currently clicked piece
      pieceSquare: "",
      // currently clicked square
      square: "",
      // array of past game moves
      history: [],
      turn: "",
      color: "",
      boardSize: 500,
    };
  }

  //this function runs anytime anything on the page is updated
  componentDidUpdate(prevProps, prevState) {

    //check to see if the game changed
    if (
      prevState.gameFen !== this.state.gameFen &&
      (this.state.gameFen !== null && this.state.gameFen !== undefined)
    ) {

      //check to see if the turn changed
      if (
        prevState.turn !== this.state.chessJSObject.turn() &&
        prevState.turn !== ""
      ) {
        // That means the turn is different now.
        this.setState(
          {
            turn: this.state.chessJSObject.turn()
          },
          () => {
            if(this.state.turn === "w"){
              FlagManager.success("It is now White Piece's turn.")
            }else{
              FlagManager.success("It is now Black Piece's turn.")

            }
            console.log("Turn has been changed. ", this.state.turn);

            this.updateGameServer();
            this.socket.emit("chessMoved", this.state.game, this.state.gameFen);
          }
        );
      }
    }
  }

  updateGameServer = () => {
    let url = "http://54.153.84.211:9000/";
    let gameID = "";
    let route = "updateFen";
    let path = url.concat(gameID, route);
    console.log("Here is the url:", path);
    let whiteTurn = false;
    if (this.state.turn === "w") {
      whiteTurn = true;
    }
    let req = {
      fen: this.state.gameFen,
      gameID: this.state.game,
      whiteTurn: whiteTurn
    };
    console.log("The REQ: ", req);
    axios
      .put(path, req)
      .then(
        function(response) {
          if (response.data.success !== true) {
            console.log("Error updating the fen.");
          }
          console.log("Now updating the FEN", response);
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      }
    );

    if(this.state.chessJSObject.game_over()) {
      console.log("The Game is over!")
      FlagManager.info("The game is over! Congradulations to the winner! And, better luck next time to the loser!")

      route = "updateResult"
      path = url.concat(route)
      let req = {winner: "WIP", gameID: this.state.game}
      axios
        .put(path, req)
        .then(
          function (response) {
            console.log(response)
          }.bind(this))
        .catch(function(error) {
          console.log(error);
        }
      );
    }
  };

  //function runs immediately before the page is loaded
  componentWillMount() {
    // first lets get the game from the backend
    this.socket = io.connect(this.state.socketEndpoint);
    let url = "http://54.153.84.211:9000/";
    var gameID = "5d5499bc03ce03258f46ffb6";
    if (typeof window !== `undefined`) {
      gameID = this.props.location.state.game;
    }
    let str = "/getGame";
    let ourUsername = getUser().username;
    let path = url.concat(gameID, str);

    axios
      .get(path)
      .then(
        function(response) {
          var currentGame = new Chess(response.data.fen);
          var currentTurn = "";
          console.log("response", response);
          if (response.data.whiteTurn === true) {
            currentTurn = "w";
          } else {
            currentTurn = "b";
          }
          console.log("here is the turn determined", currentTurn);
          var currentColor = "";
          if (ourUsername === response.data.user1) {
            currentColor = "w";
          } else {
            currentColor = "b";
          }
          this.setState(
            {
              game: response.data._id, //_id is the id for the game.
              gameFen: response.data.fen,
              chessJSObject: currentGame,
              turn: currentTurn,
              username: ourUsername,
              playerColor: currentColor
            },
            () => {
              // now it is safe to join a room.
              console.log("About to try to join a room", this.state.game);
              this.socket.emit("room", this.state.game);
            }
          );
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  }

  onMouseOverSquare = square => {
    // get list of possible moves for this square
    var currentGameObject = this.state.chessJSObject;
    if(currentGameObject === null) return;
    let moves = currentGameObject.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0 || moves === undefined || moves === null) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };


  // show possible moves
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };

  onMouseOutSquare = square => this.removeHighlightSquare(square);
  // keep clicked square style and remove hint squares

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };

  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));
    var currentGameObject = this.state.chessJSObject;
    if (this.state.playerColor !== this.state.turn) {
      FlagManager.fail("It is currently not your turn.")

      return
    };

    let move = currentGameObject.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {return};
    this.setState({
      gameFen: currentGameObject.fen(),
      history: currentGameObject.history({ verbose: true }),
      pieceSquare: ""
    });
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    var currentGame = this.state.chessJSObject;
    if (this.state.playerColor !== this.state.turn) {
      FlagManager.fail("It is currently not your turn.")
      return};

    let move = currentGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {


      return
    };

    this.setState(({ history, pieceSquare }) => ({
      gameFen: currentGame.fen(),
      history: currentGame.history({ verbose: true }),
      pieceSquare: ""
    }));

  };

  //function runs immediately after the page loads
  componentDidMount() {
    this.socket.on("updateGameFen", this.updateGameFenFromSocket);
    this.socket.on("testMove", () => {
      console.log("test move works...");
    });
    let pageWidth = this.getPageWidth()
    let boardSize = this.state.boardSize
    if(pageWidth!==null && pageWidth !==undefined){
      if(pageWidth<500){
        boardSize=0.8*pageWidth
        this.setState({
          boardSize: boardSize
        })
      }
    }
  }
  updateGameFenFromSocket = gameFEN => {
    console.log("chess piece move received");
    let newGameObject = new Chess(gameFEN);
    this.setState(
      {
        gameFen: gameFEN,
        chessJSObject: newGameObject
      },
      () => {
        console.log("new turn", this.state.turn);
      }
    );
  };

  getPageWidth = () =>{
    if (document.documentElement && document.documentElement.clientWidth) {
      return document.documentElement.clientWidth;
    }
  }

  render() {
    try {
      return (
        <Layout>
          <Wrapper>
            <ContentBox>
              <LayoutBox>
                <GameBoard
                width={this.state.boardSize}
                  onDrop={this.onDrop}
                  onMouseOverSquare={this.onMouseOverSquare}
                  onMouseOutSquare={this.onMouseOutSquare}
                  squareStyles={this.state.squareStyles}
                  onSquareClick={this.onSquareClick}
                  position={this.state.gameFen}
                />
              </LayoutBox>
            </ContentBox>
          </Wrapper>
          <FlagContainer />
        </Layout>
      );
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e);
      }
      return null;
    }
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-content: center;
  align-items: center;
`;

const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;

  padding: 30px 30px;
  @media (max-width: 500px) {
    padding: 5px 5px;

  }
`;
export default GamePage;
const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  };
};
