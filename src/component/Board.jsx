import React from "react";
import Square from "./Square";
import { useState } from "react";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      
    ];

    for(let logic of winnerLogic) {
      const [a,b,c] = logic;
      if( state[a] !== null && state[a] === state[b] && state[a] === state[c]){
        return state[a];
      }  
    }
    return false;
  };

  const isWinner = checkWinner();

  const handleClick = (index) => {
    const copyState = [...state]; //spread operator
    copyState[index] = isXTurn ? "x" : "O";
    setState(copyState)
    setIsXTurn(!isXTurn);  
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
  };

  return (
    <div className="board-container">
    
    {isWinner ? (<h1>{isWinner} won the game <button onClick={handleReset}>{/* inplace of 'handleReset' we can also use  '() =>  =>{handleReset()}'*/}Play Again</button></h1> ) : ( 
      <>
      <div className="board-row">
        {/* The comment here is correct: immediate function call 'handleClick(0)' does not work because it does not wait for user onClick, it immediately passes the value when the component renders. By using the arrow function () => handleClick(index), you ensure that handleClick is only executed when the user clicks the square, not when the component renders. */}
        <Square onClick={() => handleClick(0)} value={state[0]} />
        <Square onClick={() => handleClick(1)} value={state[1]} />
        <Square onClick={() => handleClick(2)} value={state[2]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(3)} value={state[3]} />
        <Square onClick={() => handleClick(4)} value={state[4]} />
        <Square onClick={() => handleClick(5)} value={state[5]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(6)} value={state[6]} />
        <Square onClick={() => handleClick(7)} value={state[7]} />
        <Square onClick={() => handleClick(8)} value={state[8]} />
      </div>
      </>
    )}
      
    </div>
  );
};

export default Board;
