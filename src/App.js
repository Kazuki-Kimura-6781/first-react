import { useState } from "react"; //ReactのuserState関数をインポート

function Square({ value, onSquareClick }) {
  //onSquareClick関数をSquareコンポーネントのpropsに追加する
  return (
    <button className="square" onClick={onSquareClick}>
      {" "}
      {/*BoardコンポーネントからSquareコンポーネントに関数onSquareClickを渡し、マス目がクリックされたときにSquareにonSquareClickを呼び出してもらう*/}
      {value}
    </button>
  );
}

export default function Board() {
  //関数を定義し、exportにより外部からこのファイルにアクセスできるようになる、defaultにより、他のファイルはこの関数がメイン関数であると理解できる
  const [squares, setSquares] = useState(Array(9).fill(null));
  //squaresというstate変数を定義し、デフォルト値として九つのマスに対応する九個のnullを持つ配列を与える。

  function handleClick() {
    //handleClick関数の定義
    const nextSquares = squares.slice(); //slice()配列メソッドにより、配列squaresのコピーであるnextSquaresを作成する
    nextSquares[0] = "X"; //nextSquares配列の最初のマス目にXと書き込む
    setSquares(nextSquares); //setSquares関数によってReactはstateに変更があったことを知り、squaresというstate変数を使用しているコンポーネント及びその子コンポーネントの再レンダーが行われる
    //この状態だと左上の1マスにしかXを置けない
  }

  return (
    //()内の記述を関数の呼び出しもとに戻す
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
        {/*onSquareClickプロパティをhandleClickという新しい関数に接続*/}
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}
//コメントアウトのテスト
