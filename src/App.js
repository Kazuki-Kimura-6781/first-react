import { useState } from "react"; //ReactのuserState関数をインポート

function Square() {
  //Squareコンポーネントのvalueプロパティを削除
  const [value, setValue] = useState(null); //現在のstate(value)とそれを更新する関数(setValue)が返されるようにし、useStateを呼び出す。useStateに渡されるnullはこのstate変数の初期値を表す。

  function handleClick() {
    setValue("X"); //SquareをクリックするとXを表示する
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
      <div className="board-row">
        <Square />
        {/*Squareコンポーネントがpropsを受け取らなくなったため、Boardコンポーネントが作成した9個のSquareコンポーネントからvalueプロパティを削除する*/}
        <Square />
        {/*各Squareはそれぞれ独自のstateを保持しており、それぞれのvalueはほかのものから完全に独立しているため、コンポーネントのset関数を呼び出すとReactは自動的に内部の子コンポーネントも更新する*/}
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
//コメントアウトのテスト
