import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export const Post = () => {
    const { postId } = useParams(); // postIdの数字取得
    const [ post, setPost ] = useState( '' ); // postには非同期で取得したの内容が入る

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
