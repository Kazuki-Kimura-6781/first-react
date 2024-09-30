import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  //Boardコンポーネントが渡されるpropsによって完全に制御されるようにする。

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares); //setSquaresとsetXIsNextを呼び出しているところを、onPlay関数への単一の呼び出しに置き換え、ユーザがマス目をクリックすることでGameコンポーネントがBoardを更新できるようにする。
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

export default function Game() {
  //Gameコンポーネントを追加＆このコンポーネントをトップコンポーネントにする
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]); //この2つの記述をBoardコンポーネントからこちらに持ってくる
  const currentSquares = history[history.length - 1]; //現在の盤面をレンダーするために、historyの最後にあるマス目の配列を読み取る必要がある

  function handlePlay(nextSquares) {
    //BoardコンポーネントからhandlePlay関数が呼ばれたとき、この関数の中身を渡す
    setHistory([...history, nextSquares]); //historyの全ての要素の後にnextSquaresがつながった新しい配列を作成する。
    setXIsNext(!xIsNext); //xIsNextを切り替えられるようにする。
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />{" "}
        {/*xIsNext、currentSquares、handlePlayをそれぞれBoardコンポーネントにpropsとして渡す*/}
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
