import './App.css';
import { useState } from 'react';
import { Board } from './components/Board/Board';
import { ScoreBoard } from './components/ScoreBoard/ScoreBoard';
import classNames from 'classnames';


const winningPositions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

function App() {

  const [turn, setTurn] = useState('X'); // the state of player's turn
  const [squares, setSquares] = useState(Array(9).fill(null)); //the state of boxes on the board
  const [winningSquares, setWinningSquares] = useState([]); // chose a element of winningPosition for animation 
  const [score, setScore] = useState({ //sdstate of score
    X:0,
    O:0,
  });

  const reset = () => {
    setTurn('X'); // the first turn is started by player with the X token
    setSquares(Array(9).fill(null)); //th board reset of null values
    setWinningSquares([]); // to finish the animation of the boxes
  }


  const checkForWinner = (newSquares) => {
    // we check if the board meets any of the victory conditions (three in a row)
    for(let i = 0; i< winningPositions.length; i++) {
      const [a,b,c] = winningPositions[i];

      if(!!newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        // exist a winner
        // call to endgame function with the X or O tokens player and the finningPosition for animation
        endGame(newSquares[a],winningPositions[i]);
        return;
      }
    }

    //tie
    if(!newSquares.includes(null)) {
      //if there is no null and for this point the winner's if was not met: tie
      // we send null as a token and animate all board positions
      endGame(null,Array.from(Array(10).keys()));
      return
    }

    // if nobody has won and there is no tie, we change the player's turn
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  //click box function
  const handleClick = square => {
    //modifies the state with the new turn
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);

    //check win condition
    checkForWinner(newSquares);
  }

  const endGame = ( result, winningPositions ) => {
    setTurn(null); // We lock the player so that he can't click
    //if exist a winner, modifies the score for the winner
    if(result != null) {
      setScore({
        ...score,
        [result]: score[result] + 1,
      });
    }
    //modify the state of winning square for animation
    setWinningSquares(winningPositions);
    // and reset all values for a new game
    // we wait two seconds for the player to see the victory animation
    setTimeout(reset, 2000);
  }

  // we change the background color according to the player's turn
  let containerClass = classNames({
    container: true,
    'background-turn-X' : turn !== null && turn === 'X',
    'background-turn-O' : turn !== null && turn === 'O',

  });


  return (
    <div className={containerClass}>
      {/* <h1>TIC TAC TOE</h1> */}
      <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X}/>
    </div>
  );
}

export default App;
