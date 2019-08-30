import React, { Component } from "react";
import styled from "styled-components";
import GameList from "../../components/GameList/GameList";
import GameListOwned from "../../components/GameList/GameListOwned";
import SEO from "../../components/seo";
import Layout from "../../components/layout";
import { isBrowser } from "../../services/auth";
import { Link } from "gatsby";

import ContentBox from "../../components/ContentContainer/ContentContainer";
class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame: ""
    };
  }

  render() {
    return (
      <Layout>
        <Wrapper>
          <SEO title="Home" />

          <ContentBox
            style={{  margin: `30px 0px`, height: `auto` }}
          >
            <LayoutBox>
              <ListTitle>Join Game</ListTitle>

              <GameListOwned callbackFromParent={this.getActiveGame} />

              <ButtonContainer>
                <Button onClick={() => this.refresh()}>Refresh List</Button>
                <Link
                  to="/app/GamePage/"
                  style={{textDecoration:`none`,}}
                  state={{ game: this.state.activeGame }}
                >
                  <Button>Go to Active Game</Button>
                </Link>
              </ButtonContainer>
            </LayoutBox>
          </ContentBox>

          <ContentBox
            style={{ margin: `10px 0px`, height: `auto` }}
          >
            <LayoutBox>
              <GameList />
            </LayoutBox>
          </ContentBox>
        </Wrapper>
      </Layout>
    );
  }

  refresh = () => {
    if (isBrowser) {
      window.location.reload();
    }
  };

  getActiveGame = gameID => {
    this.setState(
      {
        activeGame: gameID
      },
      () => console.log("activeGame: ", this.state.activeGame)
    );
  };
}

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
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom:1.45rem;
  max-width:900px;
  @media (max-width: 900px) {
  max-width:90%;
}
@media (max-width: 768px) {
  max-width:95%;
}
  height: 100%;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
`;
const LayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 0px;
`;
const Button = styled.button`
  cursor: pointer;
  outline: none;
  font-size: 16px;
  text-align: center;

  font-weight: 600;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  -webkit-appearance: none;
  background-color: transparent;
  border: 0;
  color: #3897f0;
  display: inline;
  margin: 10px 0;
  :active {
    transform: scale(0.99);
    transition-duration: 0.1s;
  }
`;
export default JoinGame;
