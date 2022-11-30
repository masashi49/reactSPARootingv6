import { useNavigate } from 'react-router-dom'; //追加

export const Contact = ( { message } ) => {
    const navigate = useNavigate();
    return (
        <div>
            <p>Contactです、{ message }</p>
            <button onClick={ () => navigate( '/about' ) }>about</button>
        </div>
    )
}
