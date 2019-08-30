import React from "react"
import styled from 'styled-components'
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {FlagContainer} from '../components/utils/FlagNotification/index'

import ContentBox from '../components/ContentContainer/ContentContainer'

const RulesPage = () => (

  <Layout>
    <Wrapper>
    <SEO title="Home" />

      <ContentBox>
        <LayoutBox>

        <BackButton>
        <Link style={{textDecoration:`none`,color:`white`}} to="/">GO HOME</Link>
        </BackButton>

        < PageTitle >Chess Rules</ PageTitle >

        <Title>Setting up the board:</Title>
        <PARA>The board should be set up with
        the white square in the nearest row on the right, “white
        on the right”. If this isn’t done the king and queen will
        be mixed up. Shake hands across the board before the
        game starts. White always moves first.
        </PARA>
        <Title>Ranks and files:</Title>
        <PARA>Going from left to right, the vertical
        rows on the board, called files, are labeled a through h.
        The horizontal rows, called ranks, are numbered 1 to 8.
        The 1 is white’s side of the board; 8 is black’s side.
        This system can be used to show what square a piece is
        on in a way like the game Battleship. When the board
        is set up the square a1 will be on the white player’s left
        side.
        </PARA>
        <Title>Pieces and how they move:</Title>
        <PARA> In our club, once you move a piece and take your hand off it, you cannot
        change your move, unless your opponent lets you, which they do not need to do. However, you may
        touch a piece, consider a move, and put the piece back in its original position, as long as you don’t take
        your hand off of the piece during the process.
        </PARA>
        <Title>Pawn (P):</Title>
        <PARA>White pawns start on rank two, black pawns on rank 7. The first time a pawn is
        moved it can move forward either one or two ranks. It cannot jump over another piece. After it
        has moved once, whether it has moved up one or two, a pawn can only move one square
        forward at a time, and it cannot move backward. If a pawn advances to the end rank (8 for
        white, 1 for black) then it is promoted, which means it is exchanged for any other piece, with
        the exception of a king or another pawn. No pieces are moved from the chessboard itself; in
        this way a color can have two (or more!) queens at the same time. The pawn’s “value” is 1.

        </PARA>
        <Title>Knight (N):</Title>
        <PARA>Knights move in an L-shaped pattern. A knight moves one square over and two
        squares up, or two squares over and one square up, one square over and two squares back, etc.
        as long as the same shape and size of the jump is maintained. The knight is the only piece that
        can jump over other pieces; it jumps straight to a square without disturbing any of the pieces in
        between. Knights are generally brought out early, and this is good. The knight’s value is 3.
        </PARA>
        <Title>Bishop (B):</Title>
        <PARA> The Bishop moves diagonally, any distance along a diagonal, without jumping
        over any pieces. A bishop that starts on a black square will always be on a black square, so it
        can only get to half the squares on the board. The bishop’s value is 3.
        </PARA>
        <Title>Rook (R):</Title>
        <PARA>The Rook moves in a straight line in any direction, as many spaces as it likes,
        without jumping. Rooks shouldn’t usually be used until later in the game, and should almost
        never be brought out at the beginning, because they will be harassed by pawns and other pieces,
        wasting time for the player who brought out the rook. This piece might also be lost by being
        brought out early, which is bad because the rook is valued at 5.
        </PARA>
        <Title>Queen (Q):</Title>
        <PARA> The Queen is the most powerful piece, as it can either move diagonally or in a
        straight line, which makes it like a bishop and rook put together. The queen cannot move like a
        knight. When the board is set up the queen always starts on her own color, so the white queen
        always starts on a white square. The queen is worth 9 points because she can move to so many
        places on the board so quickly.
        </PARA>
        <Title>King (K):</Title>
        <PARA> The most important piece on the board is the King. The king can move one and
        only one space at a time, in any direction (left, right, forward, backward, and diagonally). The
        capture of the king is the object of the game.
        Capturing, check, and the end of the game
        </PARA>
        <Title>Capturing:</Title>
        <PARA> A piece captures an opponent’s piece by moving onto the square occupied by the
        opponent’s piece. That piece is removed from the board and replaced by the capturing piece.
        Knights, Bishops, Rooks, Queens, and Kings capture by moving in their normal way. The
        pawns capture differently, by moving one square diagonally, either to the right or left, onto the
        piece to capture. They cannot capture by moving straight forward. At no time may more than
        one piece stay in any square, and pieces cannot capture a piece of the same color.
        </PARA>
        <Title> Check and Checkmate:</Title>
        <PARA> When a piece would be able to capture the opposing king on the next
        turn, the king is said to be in check. The king in danger must get out of check on the next turn,
        either by moving out of the way, blocking the check with another piece, or by capturing the
        attacking piece, whatever removes the threat. It is illegal to move your king into check, so, for
        instance, you can’t move your king next to the opponent’s king. The goal of the game is to put
        the opposing king in checkmate, which means he is in check and cannot be saved by any of the
        ways of escaping check. At this time the game is over, with the player whose king cannot
        escape check losing. The first player to get the opponent’s king wins; if white checkmates
        black, black has lost, even if the black player could have checkmated white on the next move.
        If you see that you are going to lose, you can resign by knocking over your king, gently!. After
        checkmate or a resignation, shake hands across the board with your opponent and congratulate
        him or her on a good game.
        </PARA>
        <Title>Draws:</Title>
        <PARA> If a king is not in check, but no legal move can be played without putting the king in
        check, then the game is a stalemate, which is a tie, or draw. This usually happens when a
        player has only a king left and the other player, with many pieces left, creates a position in
        which the king cannot move but is not threatened. Another way to draw is if both players move
        50 times in a row (a total of 100 moves) without capturing a piece or promoting a pawn.
        Players may also agree on a draw when they see it coming; to do this, extend your hand over
        the board, to shake hands, and say, “I offer a draw.” If the opponent shakes your hand, it’s a
        draw. The opponent does not need to accept! They may think they can win. The last way to
        draw is through three-time repetition, where the same sequence of moves is repeated three
        times in a row. This means not only one player’s moves, but both players doing the same thing
        three times in a row.
        </PARA>
        <Title>Special moves:</Title>
        <PARA>Castling: If both the king and a rook have not been moved yet during the game, there are no
        pieces between them, and the king is not in check, then the king and rook can move in a special
        way called castling: the king moves two spaces toward the rook, and the rook moves to the
        other side of the king, right next to the king. Often, this puts the king in a more protected
        position, behind some pawns. The king cannot castle out of, through, or into check. He cannot
        move through a square threatened by an enemy piece.
        </PARA>
        <Title>Capturing en passant:</Title>
        <PARA> en passant is a special way a pawn can capture another pawn. It is
        French for “in passing,” which is helpful to know because the rule applies to a pawn which has
        just moved up two spaces, skipping over the square threatened by the opponent’s pawn. Here
        is an example: a black pawn is on b4. The white pawn on c2 has not moved yet. On white’s
        turn the pawn on c2 is moved to c4, evading capture by the pawn on b4. But the pawn on b4
        has the option, for one turn only, of capturing the white c-pawn. The black pawn moves to c3,
        and the white pawn is taken off the board. If black chooses not to capture immediately, then
        the chance is lost, and black may not capture en passant at a later time. En passant is always a
        one-turn chance for a pawn to capture a pawn which has evaded capture by moving up two
        spaces on its first turn. It does not apply to any other positions and only concerns pawns
        </PARA>
        </LayoutBox>
      </ContentBox>

    </Wrapper>
    <FlagContainer/>
  </Layout>
)

const BackButton = styled.button`
  cursor: pointer;
  outline: 0;
  flex-grow: 1;
  font-size: 28px;
  display: flex;
  max-width: 228px;
  text-align: center;

  font-weight: 300;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 6px 8px;
  margin: 20px 0px;
  -webkit-appearance: none;
  border-radius: 2px;
  background-color: #ff5a5f;
  transition-duration: 0.4s;
  color: white !important;
  :active {
    transform: scale(0.99);
    transition-duration: 0.1s;
  }
  :focus {
    transform: scale(0.99);
    transition-duration: 0.1s;
  }

`

const Title = styled.h1`

font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
font-weight:300;
border:none;

`
const PARA = styled.h2`
font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
font-weight:300;
color:red;
padding:10px;
justify-content:center;
width:50%;
border: solid;

`

const Wrapper = styled.div`

display:flex;
flex-direction:column;
justify-content:center;
padding: 20px 20px;
align-content: center;
align-items:center;
height:100%;

`
const PageTitle = styled.p`
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-weight:300;
font-size:32px;
`
const LayoutBox = styled.div`
display: flex;
  flex-direction: column;
  align-content: center;
  align-items:center;
  justify-content: center;
  padding:20px;
`
export default RulesPage
