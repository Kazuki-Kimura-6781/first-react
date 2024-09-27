function Square({ value }) {
  function handleClick() {
    console.log("clicked!");
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Board() {
  //関数を定義し、exportにより外部からこのファイルにアクセスできるようになる、defaultにより、他のファイルはこの関数がメイン関数であると理解できる
  return (
    //()内の記述を関数の呼び出しもとに戻す
    <>
      {/*JSX(jsファイルをhtmlのように書ける記法)はこの<> </>のような"フラグメント"と呼ばれるタグで囲まれる必要がある*/}
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
//コメントアウトのテスト
