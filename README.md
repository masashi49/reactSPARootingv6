# reactSPARootingv6

https://reffect.co.jp/react/react-router-6#i-3


## react-router-dom@6 の動作を確認していく

### React Routerって何？

Reactで作成したSPAに、UIとURLを対応づけるためのものです。
http://localhost:3000/topにアクセスした時にはTopコンポーネントを、http://localhost:3000/todoならTodoコンポーネントを返すことができます。

### 今回やること

今回はルーティングを確認したいので、react-router-dom を使用します。
react-router-domはreact-routerの上位互換のようなものです、基本的にはreact-router-domを使用するでOKです。

### 環境構築

まずはReactの環境構築を行います。

```
npx create-react-app testV6
cd testV6
yarn add react-router-dom@6
```

App.jsの内容を簡単にシンプルに修正しておきます。

```jsx
// App.js
function App () {
  return (
    <div className="App">
      <h1>
        react-router-V6
      </h1>
    </div>
  );
}

export default App;
```

続いてroutesディレクトリを作成し、3つほどコンポーネントを用意しておきます。

```jsx
// src/routes/Home.js
export const Home = () =>{
    return (
        <div>
          <p>Home</p>
        <div>
    )
}
```

```jsx
// src/routes/About.js
export const About = () =>{
    return (
        <div>
          <p>About</p>
        <div>
    )
}
```

```jsx
// src/routes/Contact.js
export const Contact = () =>{
    return (
        <div>
          <p>Contact</p>
        <div>
    )
}
```

いったん表示確認をしておきます。

スクショ１

準備が整ったので、ルーティングの設定を行います。

### ルーティング

src/index.jsファイルに変更を加えていきます。
react-router-domをimportし、BrowserRouterを設定します。

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom' // 追加

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <BrowserRouter> {/*BrowserRouterで囲む*/}
    <App />
  </BrowserRouter>
);
```

App.jsファイルに戻り、`http://localhost:3000/` にアクセスがあった場合は Homeコンポーネントを表示するようにします。

```jsx
// App.js
import { Routes, Route } from "react-router-dom"; // 追加
import { Home } from "./routes/Home" // Homeだけimport

function App () {
  return (
    <div className="App">
      <h1>React-router-V6</h1>
      <Routes> {/*Routesで囲む*/}
        <Route path="/" element={ <Home /> } /> {/*RouteにHomeを設定する*/}
      </Routes>
    </div>
  );
}

export default App;
```

スクショ2

`/` のルートに対して、Homeコンポーネントを表示させることができました。
試しにまだルートの設定していない `/about` にアクセスしてみると、App.jsの内容だけが残り、Homeの内容が消えるはずです。

続いて残りのルーティングも行います。
`Routes` の中に `Route` を増やしていくだけでOKです。

```jsx
// App.js
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home"
import { About } from "./routes/About"; // 追加
import { Contact } from "./routes/Contact";  // 追加

function App () {
  return (
    <div className="App">
      <h1>React-router-V6</h1>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
      </Routes>
    </div>
  );
}

export default App;
```

先ほアクセスした `/about` に再度アクセスしてみると、正しくAboutコンポーネントの内容が表示されている事を確認できました。

スクショ3

### NotFoundを設定する

指定していないルートには、notfoundを出したいです。
それも簡単に出すことができます。

```jsx
// App.js
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="*" element={ <Notfound /> } /> // 追加
      </Routes>
```

存在しないパスでアクセスすれば、下記のようにNotfoundコンポーネントが表示されます<br>
スクショ4

### コンポーネントにpropsを渡す

`Route` に設定したコンポーネントにpropsを持たせるのはこのように実装します。  

```jsx
// App.js
  <Route path="/contact" element={ <Contact message="Hello" /> } />
```

```jsx
// Contact.js
export const Contact = ( { message } ) => { // 分割代入で受け取る
    return (
        <div>
            <p>Contactです、{ message }</p>
        </div>
    )
}
```

参考 : 
[【React】関数コンポーネントの引数（props）は分割代入で渡すとわかりやすい](https://dezanari.com/react-component-props-object/)

スクショ５

### footerにリンクを追加する

今まで実装したルートを、footerにリンクとして設置します。
footerコンポーネントを作り、listを作っていきます。ポイントは `<Link>` コンポーネントを使用する点です。

```jsx
// Footer.jsを作成
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">about</Link>
            </li>
            <li>
                <Link to="/contact">contact</Link>
            </li>
        </ul>
    )
}

```

```jsx
// App.js
function App () {
  return (
    <div className="App">
      <h1>React-router-V6</h1>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact message="Hello" /> } />
        <Route path="*" element={ <Notfound /> } />
      </Routes>
      <Footer /> // 追加
    </div>
  );
}
```

スクショ6

リンクを押すと、コンポーネントの中身が切り替わっているのが分かります。
`Link` を使わずに ` <a href="/about">about</a> ` とすると、ページがリロードしてしまうので試してみてください。

`NavLink` を使用すると、現在アクセスしているリンクだけ色を返るなどできますので、合わせて試してみてください。

```jsx
// Footer.jsに追加
<NavLink style={({ active }) => (active ? { color: 'red' } : undefined)} to="/about">
```

## useNavigate

buttonを押して他のページにジャンプしたい時は、このhookを使用してもよさそうです。

```jsx
// Contact.js
import { useNavigate } from 'react-router-dom'; //追加

export const Contact = ( { message } ) => {
    const navigate = useNavigate();
    return (
        <div>
            <p>Contactです、{ message }</p>
            <button onClick={() => navigate('/about')}>about</button>
        </div>
    )
}
```

スクショ7

## ルーティングのネスト化

`posts/1`,`posts/2` のように、投稿した記事ごとに表示を切り替えることができます。記事固有のidを割り振り、それを用いて表示を切り替えてみます。
まずは　`posts/post` を試してみます。

```jsx
// Post.jsを作成
export const Post = () => {
    return (
        <div>
            <p>Post</p>
        </div>
    )
}
```

```jsx
// App.js Routesの中だけ修正
    <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact message="Hello" /> } />
        <Route path="/posts" element={ <Posts /> } /> // 追加
        <Route path="*" element={ <Notfound /> } />
    </Routes>
```

```jsx
// Footer.js リストに1行追加
<li><Link to="/posts">Posts</Link></li> // 追加
```


### post/postページの作成

ネストされた記事ページを作成します。

```jsx
// Post.jsを作成
export const Post = () => {
    return (
        <div>
            <h2>Postのページ</h2>
        </div>
    )
}
```

postsのルーティングをしたRouteコンポーネントに、postのルーティングを追加します。

```jsx
// App.js
// 下記の形に変更
<Route path="/posts" element={<Posts />}>
  <Route path="post" element={<Post />} /> {/*`/post`ではないので注意*/}
</Route>
```

/posts/post の画面をみると、まだPostコンポーネントが表示されていないようです。

スクショ8

Postコンポーネントの内容を表示させるにはOutletコンポーネントをPostsコンポーネントで設定する必要がありますので設定します。

```jsx
// Posts.js
import { Outlet } from 'react-router-dom'; //追加

export const Posts = () => {
    return (
        <>
            <h2>Postsのページ</h2>
            <Outlet /> // 追加
        </>
    );
}

```

ネストされた `Post` が表示されているのを確認できました。
スクショ9

## idによる表示切り替え

続いて、`/posts/1`,`/posts/2` のように、記事idで表示を切り替える方法を試します。
今のままで `/posts/1` にアクセスすると `Notfound` が出てしまいます。
pathの設定値に `:` をつけることで/posts/1, /posts/2,でもpostコンポーネントの内容が表示されるようになります。

```jsx
App.js
<Route path="/posts" element={ <Posts /> }>
    <Route path=":postId" element={ <Post /> } /> {/*変更*/}
</Route>
```

数字を変更してもNptfoundが出ません。  
スクショ10

useParams Hookを使い、urlに含まれる末尾の数字部分を取得してみましょう。

```jsx
//Post.js
import { useParams } from 'react-router-dom'; //追加
export const Post = () => {
    const params = useParams(); //追加
    console.log( params ); //追加
    return (
        <div>
            <h2>Postのページ</h2>
        </div>
    )
}
```

postIdという名前で、数字が取得できるようです。  
postIdは、先ほどApp.jsで実装した `path=":postId"` の部分ですね  

スクショ11

あとはこの `postId` を使用してAPIを叩けば表示を切り替えることができそうです。
早速実装してみます。

```jsx
// Post.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export const Post = () => {
    const { postId } = useParams(); // postIdの数字取得
    const [ post, setPost ] = useState(''); // postには非同期で取得したの内容が入る

    useEffect( () => {
        // useEffect内で関数の定義
        const fetchPost = async () => {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${ postId }` // ここでpostIdを使用する
            );
            const data = await res.json();
            setPost( data ); // postで使えるようにセットする 
        };
        fetchPost(); // 関数起動
    }, [ postId ] ); // useeEffectはpostIdに依存させる

    return (
        <div>
            <h2>記事のページ</h2>
            <div>
                <p>postId:{ post.id }</p>
                <p>タイトル:{ post.title }</p>
                <p>body:{ post.body }</p>
            </div>
        </div>
    )
}
```

無事postIdによって表示を切り替えることができました。

スクショ12

## 記事の一覧ページを作る

`posts`ページの親である`post`にて、記事一覧を表示してみます。
先ほどfetchしたurlにidなしでアクセスし、受け取った内容をmapでリスト化する実装を行なってみます。

```jsx
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Posts = () => {
    const [ posts, setPosts ] = useState( [] ); // 配列を受け取る想定

    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch( 'https://jsonplaceholder.typicode.com/posts' ); // postIdなし
            const data = await res.json();
            setPosts( data ); // 受け取った配列をセット
        };
        fetchPosts();
    }, [] ); // 空にして、訪問時に1度だけ動かします

    return (
        <>
            <h2>Postsのページ</h2>
            <ul>
                { posts.map( ( { id, title } ) => ( // mapで回します
                    <li key={ id }>
                        <Link to={ `/posts/${ id }` }>
                            { id }:{ title }
                        </Link>
                    </li>
                ) ) }
            </ul>
            <Outlet />
        </>
    );
}

```

postページが出来上がりました。
スクショ13

今のままだと、記事のリストと記事内容が同時に表示されています。
postsはindex扱いにして、分離してみます。

```jsx
// PostIndex.jsを作成 Posts.jsから不要なものを取り除いただけです。
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Posts = () => {
    // カスタムhooksにして外へ逃したい処理
    const [ posts, setPosts ] = useState( [] ); 
    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch( 'https://jsonplaceholder.typicode.com/posts' ); 
            const data = await res.json();
            setPosts( data );
        };
        fetchPosts();
    }, [] );

    return (
        <ul>
            { posts.map( ( { id, title } ) => (
                <li key={ id }>
                    <Link to={ `${ id }` }> {/*idだけでOK*/}
                        { id }:{ title }
                    </Link>
                </li>
            ) ) }
        </ul>
    );
}
```

indexに処理を移動したので、スッキリしました。

```jsx
//Posts.js 
import { Outlet } from 'react-router-dom';
export const Posts = () => {
    return (
        <>
            <h2>Postsのページ</h2>
            <Outlet />
        </>
    );
}
```

```jsx
// App.js
<Route path="/posts" element={<Posts />}>
  <Route index element={<PostIndex />} /> {/*追加*/}
  <Route path=":postId" element={<Post />} />
</Route>
```

postsページとpostページで、内容を切り替えることができました。

スクショ14

## おわりに

改めて学び直してみると、Hooksを使わずに実装している箇所もありそうだなと気づきました。(見つけたらissu積んでおこう)
Hooksは、公式に掲載されているもので動作を確認しておく必要がありますので、リンク貼っておきますね！
[reactrouterの公式はこちら](https://reactrouter.com/en/main/start/tutorial)
