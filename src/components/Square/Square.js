import classNames from 'classnames';
import React from 'react';
import './Square.css';

// Component that renders the boxes of the board
export const Square = ({ value, onClick, turn, winner }) => {

  // clicking on the box
  const handleClick = () => {
    //if the turn belongs to one of the players and the box is still empty
    // allows the player to put his token on that box

    (turn !== null && value === null) && onClick();
  }

  // add X or O in box classname --> turns the box into an X or O
  let squareClass = classNames({
    square: true,
    [`square--${value}`] : value !== null,
    winner: winner,
  });


  return (
    <div className={squareClass} onClick={() => handleClick()}>
    </div>
  )
}
