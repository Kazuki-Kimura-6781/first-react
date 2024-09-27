import { useState } from "react"; //ReactのuserState関数をインポート

function Square({ value, onSquareClick }) {
  //onSquareClick関数をSquareコンポーネントのpropsに追加する
  return (
    <button className="square" onClick={onSquareClick}>
      {/*BoardコンポーネントからSquareコンポーネントに関数onSquareClickを渡し、マス目がクリックされたときにSquareにonSquareClickを呼び出してもらう*/}
      {value}
    </button>
  );
}

export default function Board() {
  //関数を定義し、exportにより外部からこのファイルにアクセスできるようになる、defaultにより、他のファイルはこの関数がメイン関数であると理解できる
  const [squares, setSquares] = useState(Array(9).fill(null));
  //squaresというstate変数を定義し、デフォルト値として九つのマスに対応する九個のnullを持つ配列を与える。

  function handleClick(i) {
    //handleClick関数に更新するマス目のインデックスを指定する引数iを追加
    const nextSquares = squares.slice(); //slice()配列メソッドにより、配列squaresのコピーであるnextSquaresを作成する
    nextSquares[i] = "X"; //nextSquares配列にiを追加することで、任意のマスにXを付けられるようになった
    setSquares(nextSquares); //setSquares関数によってReactはstateに変更があったことを知り、squaresというstate変数を使用しているコンポーネント及びその子コンポーネントの再レンダーが行われる
    //この状態だと左上の1マスにしかXを置けない
  }

  return (
    //()内の記述を関数の呼び出しもとに戻す
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        {/*<Square value={squares[0]} onSquareClick={handleClick(0)} />とすると、handleClick(0)がsetSquaresを呼び出し
        Boardコンポーネントのstateを更新し、Boardコンポーネント全体が再レンダーされるが、これによりhandleClick(0)が再び実行され、無限ループが発生してしまうためうまくいかなくなる.
        よってアロー関数を使い、マス目がクリックされると"=>"の後のコードが実行され、いちいち新しい関数を作って呼び出すような長いコードを書く必要がなくなる*/}
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
