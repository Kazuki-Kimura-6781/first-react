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
  const [currentMove, setCurrentMove] = useState(0); //このstate変数によって現在ユーザは見ているのが何番目の着手であるかを管理させる。(デフォルト値は0)
  const currentSquares = history[currentMove]; //現在の盤面をレンダーするために、historyの最後にあるマス目の配列を読み取る必要がある

  function handlePlay(nextSquares) {
    //BoardコンポーネントからhandlePlay関数が呼ばれたとき、この関数の中身を渡す
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext); //xIsNextを切り替えられるようにする。
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove); //currentMoveを更新する。
    setXIsNext(nextMove % 2 === 0); //currentMoveを更新する数値が偶数の場合は、xIsNextをtrueに設定する。
  }

  const moves = history.map((squares, move) => {
    //mapに渡される関数の内部で、historyを反復処理する部分では、squares引数がhistoryの各要素を順に受け取り、move引数が配列のインデックス(0, 1, 2...)を順に受け取る
    let description;
    if (move > 0) {
      description = "Go to move #" + move; //move引数が0より大きい場合、"Go to move #" + moveというボタンを表示する。
    } else {
      description = "Go to game start"; //move引数が0の場合、"Go to game start"というボタンを表示する。
    }
    return (
      <li key={move}>
        {/*move引数をkeyに設定*/}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />{" "}
        {/*xIsNext、currentSquares、handlePlayをそれぞれBoardコンポーネントにpropsとして渡す*/}
      </div>
      <div className="game-info">
        <ol>{moves}</ol>{" "}
        {/*"Go to move #" + move または "Go to game start"というボタンを表示させる*/}
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
