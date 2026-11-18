import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <div className="navbar-logo">
                <Link to="/">TripMate</Link>
            </div>

            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/destinations">Destinations</Link>
                <Link to="/trips">My Trips</Link>
                <Link to="/calendar">Calendar</Link>
            </div>
        </nav>
    );
}

export default Navbar;