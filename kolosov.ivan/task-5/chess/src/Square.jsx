function Square({ row, col }) {
  const isLight = (row + col) % 2 === 0;

  return (
    <div className={`square ${isLight ? 'white' : 'black'}`} />
  );
}

export default Square;