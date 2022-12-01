import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const PostIndex = () => {
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
                    <Link to={ `${ id }` }>
                        { id }:{ title }
                    </Link>
                </li>
            ) ) }
        </ul>
    );
}
