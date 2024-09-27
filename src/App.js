import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true); //先手がデフォルトでXとなるように、手番追跡用のstateを追加
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return; //早期リターンによって、一度入力されたXとOが上書きされないようにする。
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      //条件分岐：もしつぎの手番がXなら、
      nextSquares[i] = "X"; //配列nextSquareにXを入れる。
    } else {
      //つぎの手番がOなら、
      nextSquares[i] = "O"; //配列nextSquareにOを入れる。
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); //"Winner:X"または"Winner:Ｏ"と表示させる
  }

  return (
    <>
      <div className="status">{status}</div>{" "}
      {/*Boardコンポーネントにstatus欄を追加し、ゲーム終了時に勝者を表示させ、ゲーム続行ならつぎの手番のプレイヤーを表示させる*/}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  //calculateWinner関数をBoardの前後どちらで定義しても問題ない。
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], //配列linesにこのゲームの勝ちパターンを格納していく。
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
