import { useState } from "react";

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      className="square"
      style={{ color: isWinningSquare && "green" }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleSquareClick(i) {
    console.log(calculateWinner(squares) || squares[i]);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  let winningSquares;
  const result = calculateWinner(squares);
  let status;
  console.log({ result });
  if (result) {
    status = "Winner: " + result.winner;
    winningSquares = result.winningSquares;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const board = squares.map((square, index) => {
    return (
      <Square
        isWinningSquare={winningSquares?.includes(index)}
        key={index}
        value={square}
        onSquareClick={() => handleSquareClick(index)}
      />
    );
  });

  return (
    <>
      <div className="status">{status}</div>
      <div className="container">{board}</div>
    </>
  );
}

function History({ history, currentMove, jumpTo }) {
  const moves = history.map((squares, move) => {
    let descriptionOfMove;
    if (move > 0) {
      descriptionOfMove = "Go to move #" + move;
    } else {
      descriptionOfMove = "Go to game start";
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <span>{`You are at move #${move}`}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{descriptionOfMove}</button>
        )}
      </li>
    );
  });

  return <ol>{moves}</ol>;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  console.log({ history });

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    console.log(history.slice(0, currentMove + 1));
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <History
            history={history}
            currentMove={currentMove}
            jumpTo={(move) => setCurrentMove(move)}
          />
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: lines[i] };
    }
  }
  return null;
}
