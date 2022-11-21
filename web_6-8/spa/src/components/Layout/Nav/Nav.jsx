import { Link } from 'react-router-dom'
import './styles.scss'

export const Nav = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/catalog" className="nav-item">Catalog</Link>
            <Link to="/cart" className="nav-item">Cart</Link>
        </nav>
    );
};