import React from 'react';
import { Square } from '../Square/Square';
import './Board.css';

/* component taht receives:
    squares: the board values, for example squares[0] = X or O or null
    onclick: function that modifies the state and check victory condition
    turn: if is X or O
    winningSquares: winner boxes for the animation
*/
export const Board = ({squares, onClick, turn, winningSquares}) => {


    const createSquares = values => (
        values.map( value => (
            <Square value={squares[value]} 
                    onClick={()=> onClick(value)}
                    key={`square_${value}`}
                    turn={turn}
                    winner={winningSquares.includes(value)}
            />
        ))
    );

  return (
    <div className='board'>
        <div className="row">
            {createSquares([0,1,2])}
        </div>
        <div className="row">
            {createSquares([3,4,5])}
        </div>
        <div className="row">
            {createSquares([6,7,8])}
        </div>
    </div>
  )
}
