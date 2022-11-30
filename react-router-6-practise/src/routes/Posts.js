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
