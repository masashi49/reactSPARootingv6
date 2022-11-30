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
            <li><Link to="/posts">Posts</Link></li>
        </ul>
    )
}
