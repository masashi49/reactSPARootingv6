import { Outlet } from 'react-router-dom';

export const Posts = () => {
    return (
        <>
            <h2>Postsのページ</h2>
            <Outlet />
        </>
    );
}
