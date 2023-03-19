const Square=({ value, onSquareClick, isWinningSquare }) =>{
  return (
    <button
      className="square"
      style={{ color: isWinningSquare && "green" }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};
export default Square;