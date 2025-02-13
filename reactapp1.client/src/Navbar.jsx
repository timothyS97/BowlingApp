import './Navbar.css';

function Navbar()
{
    return (
        <header className="navbar">
            <div className="navbar-left">
                <ul className="nav-links">
                    <li>
                        <a href='#'>Bowling App</a>
                        <a href='#' className="house-icon">
                            <i className="fa-solid fa-house"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="navbar-center">
                <ul className="nav-links">                    
                    <li>
                        <a href='#'>Contact Us</a>
                        <a href='#' className="contact-icon">
                            <i className="fa-regular fa-envelope"></i>
                        </a>
                    </li>
                    <li>
                        <a href='#'>About Us</a>
                        <a href='#' className="about-icon">
                            <i className="fa-solid fa-info"></i>
                        </a>
                    </li>
                    <li>
                        <a href='#'>Help</a>
                        <a href='#' className="help-icon">
                            <i className="fa-regular fa-question"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    <li>
                        <a href='#'>Sign In</a>
                    </li>
                </ul>
                <a href='#' className="user-icon">
                    <i className="fas fa-user"></i>
                </a>
            </div>
        </header>
    );
}

export default Navbar;