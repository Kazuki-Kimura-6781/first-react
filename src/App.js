import { useState } from "react"; //ReactのuserState関数をインポート

function Square({ value }) {
  return <button className="square">{value}</button>;
  //Squareコンポーネントがvalueをstateで管理していた部分、及びonClickプロパティを削除
}

export default function Board() {
  //関数を定義し、exportにより外部からこのファイルにアクセスできるようになる、defaultにより、他のファイルはこの関数がメイン関数であると理解できる
  const [squares, setSquares] = useState(Array(9).fill(null));
  //squaresというstate変数を定義し、デフォルト値として九つのマスに対応する九個のnullを持つ配列を与える。
  return (
    //()内の記述を関数の呼び出しもとに戻す
    <>
      <div className="board-row">
        <Square value={squares[0]} />
        {/*レンダーする各Squareにpropsとしてvalueを渡していく。これからstateを更新する方法を用意していく*/}
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
